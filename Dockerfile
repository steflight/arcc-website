# Dockerfile optimisé pour K3s et Next.js
# Stage 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Installer les outils nécessaires pour les builds natifs
RUN apk add --no-cache libc6-compat

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (nécessaires pour le build)
RUN npm ci && npm cache clean --force

# Copier le code source
COPY . .

# Définir les variables d'environnement pour le build
ENV OPENAI_API_KEY=dummy_key_for_build
ENV NODE_ENV=production

# Construire l'application Next.js avec export statique
RUN npm run build

# Stage 2: Serveur Node.js optimisé pour production
FROM node:18-alpine AS production

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Installer les outils de monitoring
RUN apk add --no-cache curl

# Copier les fichiers de production générés
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Exposer le port 3000 (port interne de Next.js)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/chat || exit 1

# Utiliser l'utilisateur non-root
USER nextjs

# Démarrer l'application Next.js
CMD ["node", "server.js"]

# Stage 3: Image de développement (optionnel)
FROM node:18-alpine AS development

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port de développement
EXPOSE 3000

# Démarrer en mode développement
CMD ["npm", "run", "dev"]
