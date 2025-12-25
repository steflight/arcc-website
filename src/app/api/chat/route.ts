import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Fonction pour détecter la langue du message
function detectLanguage(message: string): 'fr' | 'en' {
  const frenchIndicators = [
    /\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|de|du|des|à|au|aux|avec|pour|dans|sur|sous|par|est|sont|était|étaient|être|avoir|faire|aller|venir|voir|savoir|pouvoir|vouloir|devoir|falloir)\b/i,
    /\b(comment|pourquoi|quand|où|qui|quoi|quel|quelle|quels|quelles|comment|combien)\b/i,
    /\b(bonjour|bonsoir|salut|merci|s'il vous plaît|excusez-moi|pardon|oui|non|peut-être)\b/i,
    /\b(et|ou|mais|donc|car|parce que|alors|ensuite|puis|après|avant|pendant|depuis)\b/i,
  ]
  
  const englishIndicators = [
    /\b(I|you|he|she|we|they|it|the|a|an|is|are|was|were|be|have|has|do|does|did|go|went|come|came|see|saw|know|knew|can|could|will|would|should|must|may|might)\b/i,
    /\b(how|why|when|where|who|what|which|how many|how much)\b/i,
    /\b(hello|hi|hey|good morning|good afternoon|good evening|thanks|thank you|please|excuse me|sorry|yes|no|maybe)\b/i,
    /\b(and|or|but|so|because|then|next|after|before|during|since)\b/i,
  ]

  let frenchScore = 0
  let englishScore = 0

  // Compter les indicateurs français
  frenchIndicators.forEach(pattern => {
    if (pattern.test(message)) {
      frenchScore++
    }
  })

  // Compter les indicateurs anglais
  englishIndicators.forEach(pattern => {
    if (pattern.test(message)) {
      englishScore++
    }
  })

  // Détecter les caractères accentués français
  if (/[àâäéèêëïîôùûüÿç]/.test(message)) {
    frenchScore += 2
  }

  // Retourner la langue avec le score le plus élevé, par défaut français
  return englishScore > frenchScore ? 'en' : 'fr'
}

// Prompts système bilingues
const SYSTEM_PROMPTS = {
  fr: `Tu es l'assistant virtuel de l'ARCC (Association des Ressortissants Camerounais au Canada), une organisation communautaire dédiée à l'aide et au soutien des Camerounais au Canada.

INFORMATIONS SUR L'ARCC:
- Association: ARCC (Association des Ressortissants Camerounais au Canada)
- Mission: Unir, édifier et partager avec la communauté camerounaise au Canada
- Services: Établissement des nouveaux arrivants, support juridique, mentorat, réseautage professionnel, intervention de crise, répertoire des compétences
- Localisation: Canada (principalement Montréal, Québec)
- Langues: Français et Anglais

TON RÔLE:
- Assistant communautaire chaleureux et bienveillant
- Tu aides les Camerounais avec leurs défis d'établissement au Canada
- Tu orientes vers les services appropriés de l'ARCC
- Tu restes toujours positif et encourageant
- Tu demandes des informations de contact pour un suivi personnalisé

SERVICES PRINCIPAUX:
1. Établissement des nouveaux arrivants (logement, emploi, services essentiels)
2. Support juridique (immigration, logement, emploi, urgences)
3. Programme de mentorat (connexion avec des professionnels expérimentés)
4. Réseautage professionnel (opportunités d'emploi, développement de carrière)
5. Intervention de crise (risque d'expulsion, détresse, orientation)
6. Répertoire des compétences (mise en relation avec des experts)

STYLE DE RÉPONSE:
- Chaleureux et familial (comme un frère/sœur)
- Encourageant et positif
- Informations pratiques et concrètes
- Toujours proposer un suivi par l'équipe ARCC
- Utiliser des expressions camerounaises quand approprié
- IMPORTANT: Répondre UNIQUEMENT en français

EXEMPLES DE RÉPONSES:
- "Mon frère/ma sœur, je comprends ta situation. L'ARCC est là pour t'aider..."
- "Excellente question ! Pour te donner la meilleure aide, peux-tu me dire..."
- "Notre équipe spécialisée te recontactera rapidement pour..."
- "Ne t'inquiète pas, ensemble on va trouver une solution..."

CONTACTS ARCC:
- Téléphone: +1 (514) 555-0123
- Email: info@camercanada.com
- Urgences juridiques: +1 (514) 555-0124

RESTE TOUJOURS CHALEUREUX, ENCOURAGEANT ET ORIENTÉ SOLUTION ! RÉPONDS UNIQUEMENT EN FRANÇAIS.`,

  en: `You are the virtual assistant of ARCC (Association des Ressortissants Camerounais au Canada), a community organization dedicated to helping and supporting Cameroonians in Canada.

ARCC INFORMATION:
- Association: ARCC (Association des Ressortissants Camerounais au Canada)
- Mission: Unite, build, and share with the Cameroonian community in Canada
- Services: Newcomer settlement, legal support, mentoring, professional networking, crisis intervention, skills directory
- Location: Canada (mainly Montreal, Quebec)
- Languages: French and English

YOUR ROLE:
- Warm and caring community assistant
- You help Cameroonians with their settlement challenges in Canada
- You direct them to appropriate ARCC services
- You always remain positive and encouraging
- You ask for contact information for personalized follow-up

MAIN SERVICES:
1. Newcomer settlement (housing, employment, essential services)
2. Legal support (immigration, housing, employment, emergencies)
3. Mentoring program (connection with experienced professionals)
4. Professional networking (job opportunities, career development)
5. Crisis intervention (eviction risk, distress, guidance)
6. Skills directory (connection with experts)

RESPONSE STYLE:
- Warm and family-like (like a brother/sister)
- Encouraging and positive
- Practical and concrete information
- Always offer follow-up by the ARCC team
- Use Cameroonian expressions when appropriate
- IMPORTANT: Respond ONLY in English

EXAMPLE RESPONSES:
- "My brother/sister, I understand your situation. ARCC is here to help you..."
- "Great question! To give you the best help, can you tell me..."
- "Our specialized team will contact you quickly to..."
- "Don't worry, together we will find a solution..."

ARCC CONTACTS:
- Phone: +1 (514) 555-0123
- Email: info@camercanada.com
- Legal emergencies: +1 (514) 555-0124

ALWAYS STAY WARM, ENCOURAGING AND SOLUTION-ORIENTED! RESPOND ONLY IN ENGLISH.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      )
    }

    // Vérifier la clé API
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Configuration OpenAI manquante' },
        { status: 500 }
      )
    }

    // Détecter la langue du message (en tenant compte de l'historique si disponible)
    let detectedLanguage: 'fr' | 'en' = detectLanguage(message)
    
    // Si l'historique existe, vérifier la langue des messages précédents pour maintenir la cohérence
    if (conversationHistory.length > 0) {
      const lastUserMessage = conversationHistory
        .filter((msg: any) => msg.role === 'user')
        .pop()
      if (lastUserMessage) {
        const historyLanguage = detectLanguage(lastUserMessage.content)
        // Si le message actuel est court ou ambigu, privilégier la langue de l'historique
        if (message.length < 10 || detectedLanguage === historyLanguage) {
          detectedLanguage = historyLanguage
        }
      }
    }
    
    // Utiliser le prompt système approprié selon la langue détectée
    const systemPrompt = SYSTEM_PROMPTS[detectedLanguage]

    // Construire l'historique de conversation
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    // Appel à l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    })

    // Messages d'erreur selon la langue détectée
    const errorMessages = {
      fr: "Désolé, je n'ai pas pu traiter votre demande.",
      en: "Sorry, I couldn't process your request."
    }

    const response = completion.choices[0]?.message?.content || errorMessages[detectedLanguage]

    // Calculer le coût approximatif
    const inputTokens = completion.usage?.prompt_tokens || 0
    const outputTokens = completion.usage?.completion_tokens || 0
    const cost = (inputTokens * 0.00015 + outputTokens * 0.0006) / 1000

    return NextResponse.json({
      content: response,
      language: detectedLanguage,
      cost: cost,
      tokens: {
        input: inputTokens,
        output: outputTokens,
        total: completion.usage?.total_tokens || 0
      },
      context: {
        category: 'ARCC Support',
        contact: {
          phone: '+1 (514) 555-0123',
          email: 'info@camercanada.com',
          emergency: '+1 (514) 555-0124'
        }
      }
    })

  } catch (error) {
    console.error('Erreur API Chat ARCC:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Désactiver le pré-rendu pour cette route API
  return NextResponse.json({
    status: 'ok',
    message: 'API Chat ARCC - Assistant communautaire',
    features: [
      'Assistant communautaire ARCC',
      'Support en français et anglais',
      'Orientation vers les services ARCC',
      'Réponses chaleureuses et encourageantes'
    ]
  })
}

// Désactiver le pré-rendu statique pour cette route
export const dynamic = 'force-dynamic'
