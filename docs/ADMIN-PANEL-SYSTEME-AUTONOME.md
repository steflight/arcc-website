# Panel Admin ARCC — Système autonome (sans CMS externe)

Ce document décrit l’architecture d’un **panel admin intégré** au projet Next.js, sans Strapi ni autre CMS externe, sur le modèle des admins **najcosmetique** et **equipe450** de ton devspace.

---

## 1. Principe du système autonome

- **Tout vit dans le même repo Next.js** : routes `/admin`, API `/api/admin/*`, et données soit en **fichiers** (dossier `content/`), soit en **base de données** si tu en ajoutes une plus tard.
- **Aucun service externe obligatoire** : pas de Strapi, pas de Payload. Optionnel : Git (commit/push des fichiers), une DB (PostgreSQL/SQLite) si tu veux remplacer ou compléter les fichiers.
- **Auth intégrée** : NextAuth (Auth.js) protège les pages `/admin` et les routes API admin. Connexion par credentials (email/mot de passe) ou OAuth (Google, etc.).
- **Source de vérité** :
  - **Mode fichiers** : le dossier `content/` (JSON, MDX, etc.) est la base de vérité ; l’admin lit/écrit ces fichiers via des API Next.js.
  - **Mode hybride** : tu peux plus tard ajouter une DB pour les membres/publicités tout en gardant le blog en fichiers si tu veux.

Les projets **najcosmetique** et **equipe450** utilisent ce modèle : admin Next.js + `content/` en JSON (+ MDX pour le blog) + NextAuth + optionnellement Git pour versionner et déployer les changements.

---

## 2. Architecture globale

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Site public (Next.js)                                                  │
│  /, /blog, /blog/[slug], etc.                                           │
│  Lit depuis content/ ou API internes                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ revalidatePath() après écriture
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Panel Admin (même app Next.js)                                         │
│  /admin, /admin/events, /admin/blog, /admin/ads                          │
│  Protégé par NextAuth (middleware + getServerSession sur les API)       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ GET/POST/DELETE
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  API Admin                                                               │
│  /api/admin/config, /api/admin/events, /api/admin/blog, /api/admin/ads │
│  Lit/écrit content/ (ou DB) + revalidatePath + optionnel Git              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Stockage (source de vérité)                                            │
│  content/                                                               │
│  ├── config/          (site, coordonnées, etc.)                         │
│  ├── blog/            (articles .mdx ou JSON + body)                     │
│  ├── events/          (événements .json)                                 │
│  └── ads/             (publicités membres .json)                        │
│  Optionnel : Git (commit/push content/) pour déploiement / historique   │
└─────────────────────────────────────────────────────────────────────────┘
```

- Le **site public** continue d’utiliser `src/lib/blog.ts` (ou équivalent) qui lit `content/blog/`, et de nouvelles fonctions lisent `content/events/`, `content/ads/`.
- L’**admin** n’expose que des formulaires et listes ; toute la persistance passe par les **API admin** qui écrivent dans `content/` (et déclenchent `revalidatePath` pour que le site se mette à jour sans redéploiement).
- Aucun système externe : tout est dans le même dépot et le même runtime Next.js.

---

## 3. Composants du panel admin (alignés avec najcosmetique / equipe450)

### 3.1 Authentification

- **NextAuth (Auth.js)** avec provider **Credentials** (email + mot de passe stockés en hash dans un fichier ou en DB) ou **OAuth** (Google, etc.).
- **Middleware** : `withAuth` sur les routes `/admin/:path*` ; redirection vers `/auth/signin` si non connecté.
- **API admin** : chaque route vérifie `getServerSession(authOptions)` et renvoie `401` si pas de session (pas de redirection HTML pour les appels fetch).

Référence : `equipe450/src/middleware.ts` et `equipe450/src/app/api/admin/content/route.ts` (vérification de session).

### 3.2 Layout admin

- **Sidebar fixe** : logo ARCC, liens (Tableau de bord, Blog, Événements, Publicités, Configuration), lien « Retour au site », bouton Déconnexion.
- **Barre du haut** : optionnel — bouton **Publier** (commit Git + revalidation) si tu utilises le flux « fichier + Git » comme equipe450.
- **Zone principale** : `{children}` des routes `/admin/*`.

Même idée que `najcosmetique/src/app/admin/layout.tsx` et `equipe450/src/app/admin/layout.tsx`.

### 3.3 Tableau de bord (`/admin`)

- Quelques **statistiques** : nombre d’articles publiés, nombre d’événements à venir, nombre de publicités actives (appels à `/api/admin/blog`, `/api/admin/events`, `/api/admin/ads`).
- **Actions rapides** : liens vers Blog, Événements, Publicités, Configuration.

Sur le même principe que `najcosmetique/src/app/admin/page.tsx` et `equipe450/src/app/admin/page.tsx`.

### 3.4 Gestion des articles (migration MDX → gérée par l’admin)

- **Liste** : `/admin/blog` — tableau ou cartes (titre, catégorie, statut, date) en lisant `/api/admin/blog`.
- **Édition** : `/admin/blog/[id]` ou modal — formulaire avec **Titre**, **Slug**, **Contenu** (éditeur Markdown ou Rich Text), **Image de couverture**, **Catégorie**, **Statut** (Brouillon / Publié).
- **Persistance** :
  - Soit **fichiers** : un fichier par article dans `content/blog/` (ex. `slug.mdx` ou `slug.json` + body en Markdown), et `src/lib/blog.ts` adapté pour lire ces fichiers (et filtrer par statut si besoin).
  - Soit plus tard une **DB** : dans ce cas les API admin écrivent en DB et `getAllBlogPosts()` lit depuis la DB (ou un cache).
- **API** : `GET/POST /api/admin/blog`, `GET/POST/DELETE /api/admin/blog/[id]` — après chaque écriture, `revalidatePath('/blog')`, `revalidatePath('/blog/[slug]')`.

Tu peux t’inspirer de `daniaebongue` (formulaires blog + sauvegarde) et de la structure des API `equipe450` (services, content).

### 3.5 Gestion des événements

- **Liste** : `/admin/events` — tous les événements ; affichage côté admin avec indication « passé » / « à venir » (selon la date).
- **Formulaire** : **Nom**, **Date et heure**, **Lieu** (texte ou lien Zoom), **Prix** (optionnel), **Lien d’inscription** (externe ou interne), **Statut** (actif / masqué).
- **Stockage** : par ex. `content/events/events.json` (tableau) ou un fichier par événement `content/events/[id].json`.
- **API** : `GET/POST/DELETE /api/admin/events` (et si besoin `GET/POST /api/admin/events/[id]`). Après écriture : `revalidatePath('/')` et toute page qui affiche l’agenda.
- **Site public** : une section « Agenda » sur la page d’accueil (et/ou page dédiée) qui lit les événements dont la date ≥ aujourd’hui (et éventuellement tri par date).

Aucun système externe : tout est dans Next.js + `content/` (ou DB plus tard).

### 3.6 Publicités des membres

- **Liste** : `/admin/ads` — nom / entreprise, emplacement, actif ou non.
- **Formulaire** : **Nom du membre/entreprise**, **Logo/Bannière** (upload), **Lien de redirection**, **Emplacement** (sidebar blog, bannière home, popup), **Ordre/priorité** pour rotation, **Dates de validité** (optionnel).
- **Stockage** : `content/ads/ads.json` ou un fichier par annonce.
- **API** : `GET/POST/DELETE /api/admin/ads` (et upload d’image via `/api/admin/upload` comme dans equipe450/najcosmetique).
- **Site public** : composants qui lisent les publicités actives selon l’emplacement et les affichent (rotation simple ou par catégorie). Pas de CMS externe.

### 3.7 Configuration du site

- **Page** : `/admin/config` — formulaire pour coordonnées ARCC (téléphone, email, urgence), texte du site, réseaux sociaux, etc.
- **Stockage** : `content/config/site.json` (ou équivalent).
- **API** : `GET/POST /api/admin/config`. Revalidation des pages qui utilisent cette config.

Même logique que `equipe450` et `najcosmetique` (config en JSON dans `content/`).

### 3.8 Upload de médias

- **Route** : `POST /api/admin/upload` — reçoit un fichier, le sauve dans `public/uploads/` (ou `content/uploads/`) avec un nom unique, renvoie l’URL publique. Protégée par session.
- Utilisée par les formulaires blog (image de couverture), publicités (logo/bannière), config (logo association).

Comme dans `equipe450/src/app/api/admin/upload/route.ts` et najcosmetique.

---

## 4. Flux de données (résumé)

| Besoin        | Édition dans l’admin      | API admin              | Stockage        | Site public                          |
|---------------|---------------------------|------------------------|-----------------|--------------------------------------|
| Articles      | Formulaire /admin/blog    | /api/admin/blog        | content/blog/   | src/lib/blog.ts + revalidatePath     |
| Événements    | Formulaire /admin/events  | /api/admin/events      | content/events/ | Section Agenda + revalidatePath      |
| Publicités    | Formulaire /admin/ads     | /api/admin/ads + upload | content/ads/    | Composants par emplacement           |
| Config        | Formulaire /admin/config  | /api/admin/config      | content/config/ | Layout / composants + revalidatePath |

Aucun appel à un CMS externe : le site public lit soit des fichiers dans `content/`, soit (si tu ajoutes une DB) des fonctions qui interrogent la DB ; l’admin ne fait que piloter ces API.

---

## 5. Option Git (comme equipe450 / najcosmetique)

- Après chaque sauvegarde dans `content/`, tu peux appeler une fonction **auto-commit** qui fait `git add content/` + `git commit` (message généré ou fourni par l’admin).
- Optionnel : **push** automatique vers une remote (GitLab/GitHub) pour déclencher un déploiement (CI/CD).
- **Bouton « Publier »** dans l’admin : affiche le statut Git des fichiers `content/`, permet de committer et pusher en un clic, puis appelle `revalidatePath` (ou `/api/revalidate`) pour mettre à jour le site sans redéploiement si le serveur tourne déjà avec le même repo.

Ça reste **autonome** : Git est un outil de versionnement et de déploiement, pas un CMS. La source de vérité reste le repo (fichiers dans `content/`).

---

## 6. Sécurité (sans système externe)

- **NextAuth** : protéger toutes les routes `/admin` et vérifier la session dans chaque route API sous `/api/admin/*`.
- **Validation des entrées** : vérifier les corps des requêtes (schéma Zod ou équivalent) avant d’écrire en fichier ou en DB.
- **Chemins de fichiers** : pour les API qui lisent/écrivent des fichiers, toujours construire les chemins à partir de `process.cwd()` et d’une whitelist (ex. `content/config`, `content/blog`, `content/events`, `content/ads`) pour éviter les path traversal.
- **Upload** : types MIME autorisés (images), taille max, noms de fichier sanitaires.

Tout cela se fait dans le même projet Next.js, sans dépendre d’un service externe.

---

## 7. MVP suggéré pour l’ARCC

1. **Auth** : NextAuth avec Credentials (ou OAuth) + middleware sur `/admin`.
2. **Layout admin** : sidebar + zone principale, lien « Retour au site », Déconnexion.
3. **Événements** : `content/events/` + API admin + page liste + formulaire + section Agenda sur la home.
4. **Config** : `content/config/site.json` + API + page /admin/config.
5. **Blog** : adapter l’admin pour créer/éditer des articles (fichiers MDX ou JSON dans `content/blog/`) et adapter `src/lib/blog.ts` pour rester la source de lecture du site public ; revalidation après chaque sauvegarde.
6. **Publicités** : ensuite ajouter `content/ads/` + API + formulaire + affichage par emplacement.

En restant sur **fichiers + API Next.js + NextAuth**, tu obtiens un système **100 % autonome** dans le repo camercanada-arcc, aligné avec le modèle najcosmetique / equipe450, sans Strapi ni autre CMS externe.

---

## 8. Références dans ton devspace

- **Layout et navigation admin** : `najcosmetique/src/app/admin/layout.tsx`, `equipe450/src/app/admin/layout.tsx`
- **Tableau de bord** : `najcosmetique/src/app/admin/page.tsx`, `equipe450/src/app/admin/page.tsx`
- **Protection des routes** : `equipe450/src/middleware.ts` (matcher `/admin/:path*`)
- **API qui lisent/écrivent des fichiers** : `equipe450/src/app/api/admin/services/route.ts`, `equipe450/src/app/api/admin/content/route.ts`
- **Publier (Git + revalidation)** : `equipe450/src/components/admin/PublishButton.tsx`
- **Auth côté API** : `equipe450/src/app/api/admin/content/route.ts` (`getServerSession(authOptions)`)

Tu peux réutiliser ces patterns dans camercanada-arcc en adaptant les entités (blog, events, ads) et la structure de `content/`.
