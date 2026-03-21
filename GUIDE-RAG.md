# Guide : Comment ajouter des informations au RAG

## Méthode 1 : Modifier directement les prompts système (Simple)

### Étape 1 : Éditer le fichier de l'API

Ouvrez le fichier : `src/app/api/chat/route.ts`

### Étape 2 : Ajouter vos informations dans SYSTEM_PROMPTS

Modifiez la section `SYSTEM_PROMPTS` pour ajouter vos informations :

```typescript
const SYSTEM_PROMPTS = {
  fr: `Tu es l'assistant virtuel de l'ARCC...

INFORMATIONS SUR L'ARCC:
- Association: ARCC (Association des Ressortissants Camerounais au Canada)
- Mission: Unir, édifier et partager avec la communauté camerounaise au Canada
- Services: Établissement des nouveaux arrivants, support juridique, mentorat...

// ⬇️ AJOUTEZ VOS INFORMATIONS ICI ⬇️

INFORMATIONS SUPPLÉMENTAIRES:
- Événements à venir: [Liste des événements]
- Programmes spéciaux: [Détails des programmes]
- FAQ: [Questions fréquentes et réponses]
- Ressources: [Liens et documents utiles]
- Horaires: [Horaires d'ouverture]
- Adresse: [Adresse complète]
- Réseaux sociaux: [Liens vers les réseaux]

// ⬆️ FIN DE VOS AJOUTS ⬆️

TON RÔLE:
...`,
  
  en: `You are the virtual assistant of ARCC...
// Ajoutez les mêmes informations en anglais
`
}
```

### Exemple concret d'ajout :

```typescript
fr: `Tu es l'assistant virtuel de l'ARCC...

INFORMATIONS SUR L'ARCC:
- Association: ARCC (Association des Ressortissants Camerounais au Canada)
- Mission: Unir, édifier et partager avec la communauté camerounaise au Canada

ÉVÉNEMENTS À VENIR:
- 15 janvier 2026: Soirée de réseautage professionnel à Montréal
- 20 janvier 2026: Atelier sur l'immigration au Québec
- 25 janvier 2026: Session d'information sur les services ARCC

PROGRAMMES SPÉCIAUX:
- Programme de parrainage: Aide aux nouveaux arrivants avec un mentor dédié
- Bourse d'études: Programme de bourses pour étudiants camerounais
- Incubateur d'entreprises: Support pour entrepreneurs camerounais

FAQ:
Q: Comment devenir membre de l'ARCC?
R: Vous pouvez devenir membre en remplissant le formulaire en ligne ou en nous contactant directement.

Q: Quels sont les frais d'adhésion?
R: Les frais d'adhésion sont de 50$ CAD par an.

RESSOURCES UTILES:
- Guide d'établissement au Canada: [lien]
- Liste des services essentiels: [lien]
- Répertoire des professionnels: [lien]

HORAIRES:
- Lundi-Vendredi: 9h-17h
- Samedi: 10h-14h
- Dimanche: Fermé

ADRESSE:
1234 Rue Example, Montréal, QC H1A 1A1

RÉSEAUX SOCIAUX:
- Facebook: @ARCCCanada
- LinkedIn: ARCC Canada
- Instagram: @arcc_canada

...`
```

## Méthode 2 : Système RAG avec documents (Avancé)

### Étape 1 : Créer un dossier pour les documents

```bash
mkdir -p src/lib/rag/documents
```

### Étape 2 : Créer des fichiers Markdown avec vos informations

Créez des fichiers `.md` dans `src/lib/rag/documents/` :

**Exemple : `src/lib/rag/documents/evenements.md`**
```markdown
# Événements ARCC 2026

## Janvier 2026
- 15 janvier: Soirée de réseautage professionnel
  - Lieu: Centre communautaire de Montréal
  - Heure: 18h-21h
  - Inscription: info@camercanada.com

- 20 janvier: Atelier sur l'immigration
  - Lieu: Bureau ARCC
  - Heure: 14h-17h
  - Gratuit pour les membres
```

**Exemple : `src/lib/rag/documents/faq.md`**
```markdown
# FAQ ARCC

## Adhésion
**Q: Comment devenir membre?**
R: Remplissez le formulaire en ligne sur notre site web ou contactez-nous.

**Q: Quels sont les frais?**
R: 50$ CAD par année.

## Services
**Q: Offrez-vous de l'aide juridique?**
R: Oui, nous avons des avocats partenaires spécialisés en immigration.
```

### Étape 3 : Créer un système de chargement de documents

Créez `src/lib/rag/document-loader.ts` :

```typescript
import fs from 'fs'
import path from 'path'

export interface Document {
  title: string
  content: string
  category: string
}

export function loadDocuments(): Document[] {
  const documentsDir = path.join(process.cwd(), 'src/lib/rag/documents')
  const documents: Document[] = []

  if (!fs.existsSync(documentsDir)) {
    return documents
  }

  const files = fs.readdirSync(documentsDir)
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(documentsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const title = file.replace('.md', '')
      
      documents.push({
        title,
        content,
        category: 'ARCC Knowledge'
      })
    }
  }

  return documents
}

export function getRelevantDocuments(query: string, limit: number = 3): Document[] {
  const documents = loadDocuments()
  
  // Recherche simple par mots-clés (pour une vraie recherche, utiliser des embeddings)
  const queryLower = query.toLowerCase()
  const relevant = documents
    .map(doc => ({
      doc,
      score: (doc.content.toLowerCase().match(new RegExp(queryLower, 'g')) || []).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.doc)
  
  return relevant
}
```

### Étape 4 : Intégrer dans l'API de chat

Modifiez `src/app/api/chat/route.ts` :

```typescript
import { getRelevantDocuments } from '@/lib/rag/document-loader'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    // Charger les documents pertinents
    const relevantDocs = getRelevantDocuments(message, 3)
    
    // Construire le contexte RAG
    const ragContext = relevantDocs
      .map(doc => `\n## ${doc.title}\n${doc.content}`)
      .join('\n\n')

    // Ajouter le contexte RAG au prompt système
    const systemPrompt = `${SYSTEM_PROMPTS[detectedLanguage]}

CONTEXTE ADDITIONNEL (RAG):
${ragContext}

Utilise ces informations pour répondre de manière précise et à jour.`
    
    // ... reste du code
  }
}
```

## Méthode 3 : Base de connaissances JSON (Intermédiaire)

### Créer un fichier JSON

Créez `src/lib/rag/knowledge-base.json` :

```json
{
  "events": [
    {
      "date": "2026-01-15",
      "title": "Soirée de réseautage professionnel",
      "location": "Montréal",
      "description": "Rencontrez des professionnels camerounais..."
    }
  ],
  "faq": [
    {
      "question": "Comment devenir membre?",
      "answer": "Remplissez le formulaire en ligne..."
    }
  ],
  "services": [
    {
      "name": "Programme de mentorat",
      "description": "Connexion avec des professionnels expérimentés...",
      "contact": "mentorat@camercanada.com"
    }
  ]
}
```

### Charger dans l'API

```typescript
import knowledgeBase from '@/lib/rag/knowledge-base.json'

// Dans le prompt système
const context = `
Événements: ${JSON.stringify(knowledgeBase.events)}
FAQ: ${JSON.stringify(knowledgeBase.faq)}
Services: ${JSON.stringify(knowledgeBase.services)}
`
```

## Recommandations

1. **Pour commencer rapidement** : Utilisez la Méthode 1 (modifier les prompts)
2. **Pour plus de flexibilité** : Utilisez la Méthode 2 (documents Markdown)
3. **Pour des données structurées** : Utilisez la Méthode 3 (JSON)

## Prochaines étapes avancées

Pour un vrai système RAG avec embeddings et recherche vectorielle :
- Utiliser OpenAI Embeddings API
- Implémenter une recherche vectorielle (Pinecone, Weaviate, ou local)
- Créer un système de chunks et d'indexation
- Ajouter un système de cache pour les réponses
