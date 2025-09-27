# Dockerfile multi-stage pour Next.js avec export statique
# Stage 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Construire l'application Next.js
RUN npm run build

# Stage 2: Serveur web pour servir les fichiers statiques
FROM nginx:alpine AS production

# Copier les fichiers statiques générés
COPY --from=builder /app/out /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

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
