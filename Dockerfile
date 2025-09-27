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
RUN npm run build:static

# Stage 2: Serveur web optimisé pour K3s
FROM nginx:1.25-alpine AS production

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Installer les outils de monitoring
RUN apk add --no-cache curl

# Copier les fichiers statiques générés
COPY --from=builder /app/out /usr/share/nginx/html

# S'assurer que les permissions sont correctes
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# Créer les répertoires nécessaires
RUN touch /var/run/nginx.pid && \
    chown -R nextjs:nodejs /var/run/nginx.pid

# Configuration Nginx sera injectée via ConfigMap dans K3s
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Health check pour K3s
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Utiliser l'utilisateur non-root
USER nextjs

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

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
