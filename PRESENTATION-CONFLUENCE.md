# 🚀 ARCC Website - Présentation Technique pour l'Équipe de Développement

## 📋 Table des Matières

1. [Vue d'ensemble du Projet](#vue-densemble)
2. [Architecture Technique](#architecture-technique)
3. [Stack Technologique](#stack-technologique)
4. [Structure du Projet](#structure-du-projet)
5. [Fonctionnalités Principales](#fonctionnalités-principales)
6. [Infrastructure et Déploiement](#infrastructure-et-déploiement)
7. [Guide de Développement](#guide-de-développement)
8. [CI/CD et Workflow](#cicd-et-workflow)
9. [Sécurité et Bonnes Pratiques](#sécurité-et-bonnes-pratiques)

---

## 🎯 Vue d'ensemble du Projet {#vue-densemble}

### Qu'est-ce que l'ARCC ?

**ARCC** (Association des Ressortissants Camerounais au Canada) est une organisation communautaire dédiée à l'aide et au soutien des Camerounais au Canada.

### Mission du Site Web

Le site web ARCC est une plateforme moderne et interactive conçue pour :
- **Informer** la communauté sur les services disponibles
- **Connecter** les membres de la communauté camerounaise au Canada
- **Faciliter** l'accès aux services d'établissement, de mentorat et de support
- **Promouvoir** les événements et activités communautaires
- **Offrir** un chatbot intelligent pour répondre aux questions courantes

### Objectifs Techniques

- ✅ Site web performant et responsive
- ✅ Support multilingue (Français/Anglais)
- ✅ Chatbot IA intégré avec OpenAI
- ✅ Blog dynamique avec contenu MDX
- ✅ Déploiement automatisé avec GitOps
- ✅ Architecture scalable et maintenable

---

## 🏗️ Architecture Technique {#architecture-technique}

### Architecture Générale

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Pages   │  │ Components│  │  Context │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              API Routes (Next.js API)                   │
│  ┌──────────────────────────────────────────┐         │
│  │         /api/chat (OpenAI Integration)   │         │
│  └──────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Services Externes                           │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │   OpenAI     │  │  Google Tag  │                    │
│  │   (Chatbot)  │  │   Manager    │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### Modes de Déploiement

Le projet supporte deux modes de déploiement :

1. **Mode Standalone (Production avec API)**
   - Serveur Node.js avec API Routes
   - Support du chatbot OpenAI
   - Déploiement Docker/Kubernetes

2. **Mode Static Export (Hébergement statique)**
   - Export statique pour hébergement simple
   - Pas d'API Routes
   - Optimisé pour CDN

### Configuration Conditionnelle

La configuration Next.js s'adapte automatiquement selon les variables d'environnement :

```javascript
// next.config.js
output: process.env.DISABLE_API_ROUTES === 'true' 
  ? 'export'  // Mode statique
  : 'standalone'  // Mode serveur avec API
```

---

## 💻 Stack Technologique {#stack-technologique}

### Framework et Runtime

| Technologie | Version | Usage |
|------------|---------|-------|
| **Next.js** | 15.4.6 | Framework React avec SSR/SSG |
| **React** | 18.3.1 | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **Node.js** | 18+ | Runtime serveur |

### Styling et UI

| Technologie | Version | Usage |
|------------|---------|-------|
| **Tailwind CSS** | 3.4.17 | Framework CSS utility-first |
| **Framer Motion** | 11.0.0 | Animations et transitions |
| **Lucide React** | 0.400.0 | Bibliothèque d'icônes |

### Contenu et Markdown

| Technologie | Version | Usage |
|------------|---------|-------|
| **next-mdx-remote** | 4.4.1 | Rendu MDX pour le blog |
| **gray-matter** | 4.0.3 | Parsing des métadonnées frontmatter |
| **date-fns** | 3.6.0 | Manipulation des dates |

### IA et Services Externes

| Technologie | Version | Usage |
|------------|---------|-------|
| **OpenAI** | 5.23.1 | API pour le chatbot intelligent |
| **Google Tag Manager** | - | Analytics et tracking |

### DevOps et Infrastructure

| Technologie | Usage |
|------------|-------|
| **Docker** | Containerisation |
| **Docker Compose** | Orchestration locale |
| **K3s** | Orchestration Kubernetes légère |
| **FluxCD** | GitOps et déploiement continu |
| **GitHub Actions** | CI/CD automatisé |

---

## 📁 Structure du Projet {#structure-du-projet}

```
arcc-website/
├── 📂 src/
│   ├── 📂 app/                    # App Router Next.js
│   │   ├── 📂 api/
│   │   │   └── 📂 chat/
│   │   │       └── route.ts       # API Route pour le chatbot
│   │   ├── 📂 blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx       # Page dynamique pour articles
│   │   │   └── page.tsx           # Liste des articles
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Page d'accueil
│   │   └── globals.css            # Styles globaux
│   │
│   ├── 📂 components/              # Composants React réutilisables
│   │   ├── Header.tsx             # En-tête avec navigation
│   │   ├── Hero.tsx               # Section hero
│   │   ├── Services.tsx           # Section services
│   │   ├── Chatbot.tsx            # Interface du chatbot
│   │   ├── Contact.tsx            # Formulaire de contact
│   │   ├── Footer.tsx             # Pied de page
│   │   ├── BlogList.tsx           # Liste des articles
│   │   └── ...                    # Autres composants
│   │
│   ├── 📂 contexts/
│   │   └── LanguageContext.tsx    # Contexte multilingue
│   │
│   ├── 📂 hooks/
│   │   └── useGoogleTagManager.ts # Hook pour GTM
│   │
│   └── 📂 lib/
│       └── blog.ts                 # Utilitaires pour le blog
│
├── 📂 content/
│   └── 📂 blog/                    # Articles de blog en MDX
│       ├── defis-juridiques-camerounais-canada.mdx
│       ├── guide-etablissement-nouveaux-arrivants.mdx
│       └── pouvoir-mentorat-camerounais.mdx
│
├── 📂 public/                       # Assets statiques
│   ├── logo.png
│   ├── favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
│
├── 📂 gitops/                       # Configuration GitOps
│   ├── 📂 apps/
│   │   └── 📂 arcc-website/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       └── ingress.yaml
│   └── 📂 clusters/
│       └── 📂 production/
│
├── 📂 k8s/                          # Manifests Kubernetes
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
│
├── 📂 scripts/                      # Scripts de déploiement
│   ├── deploy-docker.sh
│   ├── deploy-k3s.sh
│   └── setup-gitops.sh
│
├── Dockerfile                       # Image Docker multi-stage
├── docker-compose.yml               # Configuration Docker Compose
├── next.config.js                   # Configuration Next.js
├── tailwind.config.js               # Configuration Tailwind
├── package.json                     # Dépendances npm
└── tsconfig.json                    # Configuration TypeScript
```

### Points Clés de l'Architecture

- **App Router** : Utilisation du nouveau système de routing de Next.js 13+
- **Server Components** : Composants serveur par défaut pour de meilleures performances
- **API Routes** : Routes API intégrées pour le chatbot
- **MDX** : Contenu de blog en Markdown avec composants React
- **Context API** : Gestion de l'état multilingue

---

## ⚡ Fonctionnalités Principales {#fonctionnalités-principales}

### 1. 🏠 Page d'Accueil

**Composants principaux :**
- **Hero** : Section d'accueil avec message principal
- **Services** : Présentation des 6 services principaux
- **FirstMeeting** : Information sur la première rencontre
- **FounderMessage** : Message du fondateur
- **SkillsDirectory** : Répertoire des compétences
- **Contact** : Formulaire de contact
- **AnniversaryCelebration** : Célébration d'anniversaire (modal)

**Services proposés :**
1. 🏡 Établissement des nouveaux arrivants
2. ⚖️ Support juridique
3. 👥 Programme de mentorat
4. 🌐 Réseautage professionnel
5. ❤️ Intervention de crise
6. 💼 Répertoire des compétences

### 2. 🤖 Chatbot Intelligent

**Fonctionnalités :**
- Détection automatique de la langue (FR/EN)
- Réponses contextuelles basées sur OpenAI
- Interface utilisateur moderne et intuitive
- Historique de conversation
- Support bilingue complet

**Architecture du Chatbot :**

```typescript
// src/app/api/chat/route.ts
- Détection de langue automatique
- Prompts système bilingues
- Intégration OpenAI GPT
- Gestion des erreurs
- Rate limiting
```

**Prompts système :**
- Assistant communautaire chaleureux
- Connaissance des services ARCC
- Orientation vers les services appropriés
- Style de réponse familial et encourageant

### 3. 📝 Blog Dynamique

**Fonctionnalités :**
- Articles en format MDX
- Métadonnées frontmatter (titre, date, auteur, tags)
- Recherche et filtrage par catégories
- Navigation entre articles
- SEO optimisé

**Structure d'un article :**

```markdown
---
title: "Titre de l'article"
date: "2024-01-15"
author: "Nom de l'auteur"
tags: ["tag1", "tag2"]
category: "Immigration"
---

Contenu de l'article en Markdown...
```

### 4. 🌍 Support Multilingue

**Langues supportées :**
- Français (par défaut)
- Anglais

**Implémentation :**
- Context API pour la gestion de la langue
- Traductions centralisées
- Détection automatique de la langue du navigateur
- Switch de langue dans le header

### 5. 📱 Design Responsive

**Breakpoints Tailwind :**
- Mobile : `< 640px`
- Tablet : `640px - 1024px`
- Desktop : `> 1024px`

**Optimisations :**
- Images optimisées avec Next.js Image
- Lazy loading des composants
- Animations performantes avec Framer Motion

### 6. 🔍 SEO et Analytics

**Optimisations SEO :**
- Meta tags dynamiques
- Sitemap.xml généré
- Robots.txt configuré
- Structured data (JSON-LD)
- Open Graph tags

**Analytics :**
- Google Tag Manager intégré
- Tracking des événements
- Analytics des conversions

---

## 🚀 Infrastructure et Déploiement {#infrastructure-et-déploiement}

### Options de Déploiement

#### 1. Docker (Recommandé pour Production)

**Dockerfile multi-stage :**
- **Stage Builder** : Build de l'application Next.js
- **Stage Production** : Image optimisée avec Node.js
- **Stage Development** : Image pour développement

**Commandes principales :**

```bash
# Build de l'image
docker build -t arcc-website .

# Exécution en production
docker-compose --profile prod up -d

# Exécution en développement
docker-compose --profile dev up -d
```

**Health Check :**
- Vérification du processus Next.js
- Intervalle : 30 secondes
- Timeout : 3 secondes
- Retries : 3

#### 2. Kubernetes (K3s)

**Manifests Kubernetes :**
- Deployment avec réplicas
- Service ClusterIP
- Ingress pour le routage
- ConfigMap pour la configuration
- Namespace dédié

**Déploiement :**

```bash
# Appliquer les manifests
kubectl apply -f k8s/

# Vérifier le déploiement
kubectl get pods -n arcc-website
```

#### 3. GitOps avec FluxCD

**Architecture GitOps :**
- Repository séparé pour la configuration
- FluxCD pour la synchronisation automatique
- Déploiement continu depuis Git
- Rollback automatique en cas d'erreur

**Workflow :**
1. Push du code → Build de l'image Docker
2. Push de la configuration GitOps
3. FluxCD détecte les changements
4. Déploiement automatique sur K3s

### Variables d'Environnement

**Variables requises :**

```env
# OpenAI (pour le chatbot)
OPENAI_API_KEY=sk-...

# Next.js
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=3000

# Optionnel
DISABLE_API_ROUTES=false  # true pour export statique
```

### Réseaux Docker

**Configuration :**
- Réseau par défaut : `arcc-website-network`
- Réseau externe : `nginx-proxy-manager_default` (pour reverse proxy)

---

## 👨‍💻 Guide de Développement {#guide-de-développement}

### Prérequis

```bash
# Node.js 18+
node --version

# npm ou yarn
npm --version

# Docker (optionnel)
docker --version
```

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd arcc-website

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables d'environnement
# Éditer .env et ajouter OPENAI_API_KEY
```

### Développement Local

```bash
# Démarrer le serveur de développement
npm run dev

# Le site sera accessible sur http://localhost:3000
```

**Fonctionnalités du mode dev :**
- Hot reload automatique
- Turbopack pour des builds rapides
- Erreurs détaillées dans le navigateur
- Source maps pour le debugging

### Scripts Disponibles

```bash
# Développement
npm run dev              # Serveur de développement

# Build
npm run build            # Build de production
npm run start            # Démarrer le serveur de production

# Qualité de code
npm run lint             # Linter ESLint

# Déploiement
npm run deploy:build     # Build uniquement
npm run deploy:prepare   # Build + instructions
npm run deploy:test      # Build + test local
npm run deploy:docker    # Build et run Docker
```

### Ajout d'un Nouveau Composant

1. **Créer le fichier :**
```typescript
// src/components/NewComponent.tsx
'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function NewComponent() {
  const { t } = useLanguage()
  
  return (
    <section className="py-12">
      <h2>{t('newComponent.title')}</h2>
      {/* Contenu */}
    </section>
  )
}
```

2. **Ajouter les traductions :**
```typescript
// Dans LanguageContext.tsx
const translations = {
  fr: {
    newComponent: {
      title: "Titre en français"
    }
  },
  en: {
    newComponent: {
      title: "Title in English"
    }
  }
}
```

3. **Utiliser dans une page :**
```typescript
import NewComponent from '@/components/NewComponent'

export default function Page() {
  return (
    <main>
      <NewComponent />
    </main>
  )
}
```

### Ajout d'un Article de Blog

1. **Créer le fichier MDX :**
```markdown
// content/blog/nouvel-article.mdx
---
title: "Titre de l'article"
date: "2024-01-15"
author: "Nom de l'auteur"
tags: ["immigration", "conseils"]
category: "Immigration"
---

Contenu de l'article en Markdown...
```

2. **Le système détecte automatiquement le nouvel article**

### Structure d'un Composant TypeScript

```typescript
'use client'  // Si utilisation de hooks React

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface ComponentProps {
  // Props du composant
}

export default function Component({ }: ComponentProps) {
  const { t, language } = useLanguage()
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12"
    >
      {/* Contenu */}
    </motion.section>
  )
}
```

---

## 🔄 CI/CD et Workflow {#cicd-et-workflow}

### Workflow Git

**Branches :**
- `main` / `stable` : Production
- `develop` : Développement
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs

**Gitflow :**
- Utilisation de la stratégie Gitflow
- Tags pour les versions
- Releases pour le versioning

### GitHub Actions (CI/CD)

**Workflows disponibles :**

1. **Build et Test**
   - Vérification du code
   - Build de l'application
   - Tests (si disponibles)

2. **Déploiement Docker**
   - Build de l'image Docker
   - Push vers le registry
   - Déploiement automatique

3. **Déploiement GitOps**
   - Synchronisation avec FluxCD
   - Déploiement sur K3s

### Processus de Déploiement

1. **Développement**
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   # Développement...
   git commit -m "feat: nouvelle fonctionnalité"
   git push origin feature/nouvelle-fonctionnalite
   ```

2. **Merge vers develop**
   - Pull Request
   - Review du code
   - Merge automatique

3. **Déploiement en staging**
   - Automatique après merge sur develop
   - Tests de validation

4. **Production**
   - Merge vers stable/main
   - Build et déploiement automatique
   - Tag de version

---

## 🔒 Sécurité et Bonnes Pratiques {#sécurité-et-bonnes-pratiques}

### Sécurité

**Bonnes pratiques implémentées :**
- ✅ Utilisateur non-root dans Docker
- ✅ Variables d'environnement pour les secrets
- ✅ CORS configuré pour les API
- ✅ Validation des entrées utilisateur
- ✅ Rate limiting sur l'API chat
- ✅ Headers de sécurité Next.js

**Recommandations :**
- Ne jamais commiter les fichiers `.env`
- Utiliser des secrets dans les CI/CD
- Rotation régulière des clés API
- Monitoring des erreurs

### Performance

**Optimisations :**
- Images optimisées avec Next.js Image
- Code splitting automatique
- Lazy loading des composants
- Cache des assets statiques
- Compression gzip/brotli

**Métriques cibles :**
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Lighthouse Score : > 90

### Accessibilité

**Standards :**
- HTML sémantique
- ARIA labels où nécessaire
- Contraste des couleurs (WCAG AA)
- Navigation au clavier
- Support des lecteurs d'écran

### Maintenance

**Checklist régulière :**
- [ ] Mise à jour des dépendances
- [ ] Review du code
- [ ] Tests de performance
- [ ] Vérification de sécurité
- [ ] Backup de la base de données (si applicable)
- [ ] Monitoring des logs

---

## 📊 Monitoring et Logs

### Logs

**Sources de logs :**
- Logs Docker : `docker logs arcc-website-app-prod-1`
- Logs Kubernetes : `kubectl logs -n arcc-website`
- Logs Next.js : Console et fichiers

### Monitoring

**Métriques à surveiller :**
- Temps de réponse de l'API
- Taux d'erreur
- Utilisation des ressources
- Trafic du site
- Performance du chatbot

---

## 🐛 Troubleshooting

### Problèmes Courants

**1. Build échoue**
```bash
# Nettoyer le cache
rm -rf .next node_modules
npm install
npm run build
```

**2. Chatbot ne répond pas**
- Vérifier `OPENAI_API_KEY` dans `.env`
- Vérifier les logs de l'API : `docker logs arcc-website-app-prod-1`
- Tester l'endpoint : `curl http://localhost:3000/api/chat`

**3. Images ne se chargent pas**
- Vérifier le chemin dans `public/`
- Vérifier la configuration Next.js Image
- Vérifier les permissions des fichiers

**4. Déploiement Docker échoue**
```bash
# Rebuild sans cache
docker build --no-cache -t arcc-website .
```

---

## 📚 Ressources et Documentation

### Documentation Externe

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)

### Documentation Interne

- `README.md` : Guide de démarrage
- `DEPLOYMENT.md` : Guide de déploiement
- `DOCKER.md` : Documentation Docker
- `GITOPS-DEPLOYMENT.md` : Guide GitOps
- `K3S-DEPLOYMENT.md` : Guide K3s

---

## 👥 Contribution

### Comment Contribuer

1. **Fork le repository**
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Développer** en suivant les conventions
4. **Tester** localement
5. **Commit** avec des messages clairs
6. **Push** et créer une Pull Request
7. **Review** et merge

### Conventions de Code

- **TypeScript** : Typage strict
- **ESLint** : Respect des règles
- **Prettier** : Formatage automatique
- **Commits** : Format conventionnel (feat, fix, chore, etc.)

---

## 📞 Support et Contact

### Pour les Questions Techniques

- **Issues GitHub** : Pour les bugs et demandes de fonctionnalités
- **Documentation** : Consulter les fichiers `.md` du projet
- **Équipe** : Contacter l'équipe de développement

### Informations ARCC

- **Site web** : [URL du site]
- **Email** : info@camercanada.com
- **Téléphone** : +1 (514) 555-0123

---

## 🎉 Conclusion

Le site web ARCC est une plateforme moderne, performante et scalable construite avec les meilleures technologies du marché. L'architecture modulaire permet une maintenance facile et l'ajout de nouvelles fonctionnalités.

**Points forts :**
- ✅ Architecture moderne et maintenable
- ✅ Performance optimisée
- ✅ Déploiement automatisé
- ✅ Support multilingue
- ✅ Chatbot intelligent
- ✅ Blog dynamique

**Prochaines étapes possibles :**
- Authentification utilisateur
- Dashboard membre
- Système de paiement
- Intégration avec d'autres services
- Application mobile

---

**Dernière mise à jour :** Janvier 2024  
**Version du projet :** 0.2.0  
**Maintenu par :** Équipe de développement ARCC

