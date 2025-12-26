# 🎄 Prompt Cursor - Composant de Célébration de Noël

## Prompt pour créer un popup de célébration de Noël

```
Crée un composant React/Next.js pour un popup de célébration de Noël qui s'affiche à l'ouverture de la page.

REQUIREMENTS:
1. Créer un composant `ChristmasCelebration.tsx` avec les caractéristiques suivantes :
   - Animation de flocons de neige (❄) qui tombent en continu
   - Design avec thème de Noël (couleurs rouge, vert, or/jaune)
   - Modal centré avec fond semi-transparent (backdrop blur)
   - Animations fluides avec Framer Motion
   - Bouton de fermeture (X) en haut à droite
   - Message personnalisable pour la célébration
   - Responsive (mobile, tablette, desktop)

2. Caractéristiques techniques :
   - Utiliser Framer Motion pour les animations
   - Flocons de neige : 100-150 flocons animés avec rotation et mouvement latéral
   - Modal : design moderne avec dégradés rouge/vert
   - Icônes : utiliser Lucide React (Snowflake, Gift, Star)
   - Props : `isVisible: boolean` et `onClose: () => void`

3. Design :
   - Couleurs principales : rouge (#DC2626, #EF4444), vert (#16A34A, #22C55E), or/jaune (#FCD34D, #FBBF24)
   - Fond modal : dégradé from-red-50 via-white to-green-50
   - Bordure : border-4 border-red-500
   - Titre : "🎄 Joyeux Noël ! 🎄" avec dégradé de texte
   - Message personnalisable pour l'organisation
   - Bouton d'action avec dégradé rouge-vert

4. Intégration :
   - Le composant doit être importé dans la page principale
   - S'afficher automatiquement 2 secondes après le chargement de la page
   - Utiliser useState et useEffect pour gérer la visibilité

5. Structure du code :
   - 'use client' pour Next.js App Router
   - Interface TypeScript pour les props
   - Animation des flocons avec motion.div
   - Modal avec AnimatePresence pour les transitions
   - Décoration avec emojis de Noël (🎅, 🦌, ⭐, ❄️)

6. Exemple de message :
   - Titre : "🎄 Joyeux Noël ! 🎄"
   - Message principal : Personnalisable selon l'organisation
   - Bouton : "Passez de Joyeuses Fêtes ! 🎁"

IMPORTANT:
- Le composant doit être réutilisable et facilement personnalisable
- Les animations doivent être performantes (pas de lag)
- Le design doit être moderne et professionnel
- Support multilingue optionnel (français par défaut)
```

## Exemple d'utilisation dans une page

```typescript
// Dans votre page principale (page.tsx ou Home.tsx)
'use client'

import { useState, useEffect } from 'react'
import ChristmasCelebration from '@/components/ChristmasCelebration'

export default function Home() {
  const [showChristmas, setShowChristmas] = useState(false)

  useEffect(() => {
    // Afficher le popup 2 secondes après le chargement
    const timer = setTimeout(() => {
      setShowChristmas(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <main>
      {/* Votre contenu */}
      <ChristmasCelebration 
        isVisible={showChristmas} 
        onClose={() => setShowChristmas(false)} 
      />
    </main>
  )
}
```

## Variantes du prompt

### Version simplifiée (sans animations complexes)

```
Crée un composant React de popup de Noël simple avec :
- Modal centré avec message de Noël
- Bouton de fermeture
- Design rouge/vert
- Animation d'apparition basique
- Responsive
```

### Version avec personnalisation avancée

```
Crée un composant de popup de Noël avec :
- Props pour personnaliser le message, les couleurs, et le logo
- Support multilingue (FR/EN)
- Animation de flocons de neige configurable
- Thème personnalisable (couleurs, images)
- Callback personnalisé pour le bouton d'action
```

### Version avec localStorage (ne s'affiche qu'une fois)

```
Crée un composant de popup de Noël qui :
- S'affiche uniquement si l'utilisateur ne l'a pas déjà vu
- Utilise localStorage pour mémoriser la fermeture
- Peut être réaffiché après X jours (configurable)
- Affiche un compteur de jours avant Noël
```

## Checklist de personnalisation

Après création du composant, personnaliser :

- [ ] Message de célébration (titre et texte)
- [ ] Couleurs du thème (rouge, vert, or)
- [ ] Logo ou image de l'organisation
- [ ] Nom de l'organisation dans le message
- [ ] Lien du bouton d'action (si nécessaire)
- [ ] Durée d'affichage automatique
- [ ] Nombre de flocons de neige
- [ ] Support multilingue (si nécessaire)

## Notes techniques

- **Framer Motion** : Nécessaire pour les animations fluides
- **Lucide React** : Pour les icônes (Snowflake, Gift, Star)
- **TypeScript** : Recommandé pour la typage
- **Tailwind CSS** : Pour le styling (recommandé)
- **Performance** : Limiter le nombre de flocons à 100-150 pour éviter les lags

## Exemple de structure de fichiers

```
src/
  components/
    ChristmasCelebration.tsx  # Composant principal
  app/
    page.tsx                 # Page d'accueil (intégration)
```

---

**Note** : Ce prompt peut être adapté pour d'autres occasions (Nouvel An, Pâques, etc.) en modifiant les couleurs, emojis et messages.







