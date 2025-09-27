import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Prompt system optimisé pour ARCC
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de l'ARCC (Association des Ressortissants Camerounais au Canada), une organisation communautaire dédiée à l'aide et au soutien des Camerounais au Canada.

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

EXEMPLES DE RÉPONSES:
- "Mon frère/ma sœur, je comprends ta situation. L'ARCC est là pour t'aider..."
- "Excellente question ! Pour te donner la meilleure aide, peux-tu me dire..."
- "Notre équipe spécialisée te recontactera rapidement pour..."
- "Ne t'inquiète pas, ensemble on va trouver une solution..."

CONTACTS ARCC:
- Téléphone: +1 (514) 555-0123
- Email: info@arcc-canada.ca
- Urgences juridiques: +1 (514) 555-0124

RESTE TOUJOURS CHALEUREUX, ENCOURAGEANT ET ORIENTÉ SOLUTION !`

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

    // Construire l'historique de conversation
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
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

    const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu traiter votre demande."

    // Calculer le coût approximatif
    const inputTokens = completion.usage?.prompt_tokens || 0
    const outputTokens = completion.usage?.completion_tokens || 0
    const cost = (inputTokens * 0.00015 + outputTokens * 0.0006) / 1000

    return NextResponse.json({
      content: response,
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
          email: 'info@arcc-canada.ca',
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
