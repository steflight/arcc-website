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
# Prisma a besoin d'une valeur DATABASE_URL pour "prisma generate" (génération du client),
# même si on ne se connecte pas réellement pendant la génération.
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/arcc_build?schema=public

# Générer le client Prisma avant le build (sinon Next.js échoue pendant la compilation/import).
RUN npx prisma generate

# Construire l'application Next.js
RUN npm run build

# Stage 2: Serveur Node.js optimisé pour production
FROM node:18-alpine AS production

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs-arcc -u 1001

# Installer les outils de monitoring
RUN apk add --no-cache curl netcat-openbsd

# Copier les fichiers de production générés
COPY --from=builder --chown=nextjs-arcc:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs-arcc:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs-arcc:nodejs /app/public ./public

# Exposer le port 3000 (port interne de Next.js)
EXPOSE 3000

# Health check - Vérifie que le processus Next.js tourne
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD ps aux | grep -E "[n]ext-server" >/dev/null || exit 1

# Utiliser l'utilisateur non-root
USER nextjs-arcc

# Variables d'environnement pour forcer l'écoute sur toutes les interfaces
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Démarrer l'application Next.js
CMD ["node", "server.js"]

# Stage 3: Image de développement (optionnel)
FROM node:18-alpine AS development

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs-arcc -u 1001

WORKDIR /app

# Créer un script d'entrée pour fixer les permissions (uniquement pour .next et node_modules)
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'set -e' >> /entrypoint.sh && \
    echo '# Ne changer les permissions que pour .next et node_modules (volumes Docker)' >> /entrypoint.sh && \
    echo '# Ne PAS toucher aux fichiers source montés depuis l'\''hôte' >> /entrypoint.sh && \
    echo 'if [ -d /app/.next ]; then' >> /entrypoint.sh && \
    echo '  chown -R nextjs-arcc:nodejs /app/.next 2>/dev/null || true' >> /entrypoint.sh && \
    echo 'fi' >> /entrypoint.sh && \
    echo 'if [ -d /app/node_modules ]; then' >> /entrypoint.sh && \
    echo '  chown -R nextjs-arcc:nodejs /app/node_modules 2>/dev/null || true' >> /entrypoint.sh && \
    echo 'fi' >> /entrypoint.sh && \
    echo 'exec su-exec nextjs-arcc "$@"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Installer su-exec pour changer d'utilisateur
RUN apk add --no-cache su-exec

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source
COPY . .

# Changer le propriétaire des fichiers copiés
RUN chown -R nextjs-arcc:nodejs /app

# Exposer le port de développement
EXPOSE 3000

# Utiliser le script d'entrée
ENTRYPOINT ["/entrypoint.sh"]

# Démarrer en mode développement
CMD ["npm", "run", "dev"]
