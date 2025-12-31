# 🎄 Prompt Cursor Concis - Popup de Noël

## Version courte (copier-coller direct)

```
Crée un composant React/Next.js `ChristmasCelebration.tsx` pour un popup de célébration de Noël avec :

1. ANIMATIONS :
   - 100-150 flocons de neige (❄) animés qui tombent avec rotation
   - Modal avec animation d'apparition (scale + fade)
   - Utiliser Framer Motion

2. DESIGN :
   - Couleurs : rouge (#DC2626), vert (#16A34A), or (#FCD34D)
   - Fond modal : dégradé from-red-50 via-white to-green-50
   - Bordure : border-4 border-red-500
   - Icônes Lucide : Snowflake, Gift, Star (animées)

3. CONTENU :
   - Titre : "🎄 Joyeux Noël ! 🎄" (dégradé rouge-vert)
   - Message personnalisable pour l'organisation
   - Bouton : "Passez de Joyeuses Fêtes ! 🎁" (dégradé rouge-vert)
   - Décoration : emojis 🎅 🦌 ⭐ ❄️

4. PROPS :
   - isVisible: boolean
   - onClose: () => void

5. INTÉGRATION :
   - S'affiche 2 secondes après chargement de la page
   - Backdrop blur semi-transparent
   - Responsive (mobile/tablette/desktop)
   - Bouton X pour fermer

6. TECHNIQUES :
   - TypeScript
   - 'use client' pour Next.js
   - AnimatePresence pour transitions
   - Flocons avec mouvement latéral et rotation
```

## Version encore plus courte

```
Crée un popup de Noël React avec :
- Flocons de neige animés (Framer Motion)
- Modal rouge/vert/or avec message personnalisable
- Props: isVisible, onClose
- S'affiche 2s après chargement
- Responsive
```

## Pour intégrer dans page.tsx

```
Ajoute le composant ChristmasCelebration dans la page principale :
- useState pour showChristmas
- useEffect avec setTimeout 2000ms
- Import et utilisation du composant
```















