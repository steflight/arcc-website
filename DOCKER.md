# Dockerisation du Site ARCC

Ce projet a été dockerisé pour faciliter le déploiement et le développement. Voici comment utiliser Docker avec ce site Next.js.

## 🐳 Fichiers Docker

- `Dockerfile` - Configuration multi-stage pour la construction et le déploiement
- `docker-compose.yml` - Configuration pour le développement et la production
- `nginx.conf` - Configuration Nginx optimisée pour servir les fichiers statiques
- `.dockerignore` - Fichiers à exclure lors de la construction Docker

## 🚀 Utilisation Rapide

### Développement
```bash
# Démarrer en mode développement avec hot-reload
docker-compose --profile dev up -d

# Le site sera accessible sur http://localhost:3000
```

### Production
```bash
# Construire et démarrer en mode production
docker-compose --profile prod up -d

# Le site sera accessible sur http://localhost:80
```

## 📋 Scripts de Déploiement

### Windows (PowerShell)
```powershell
# Déploiement en production
.\scripts\deploy-docker.ps1

# Déploiement en développement
.\scripts\deploy-docker.ps1 -Environment development

# Construction uniquement
.\scripts\deploy-docker.ps1 -BuildOnly

# Pousser vers un registry
.\scripts\deploy-docker.ps1 -PushToRegistry -RegistryUrl "your-registry.com"
```

### Linux/Unix (Bash)
```bash
# Déploiement en production
./scripts/deploy-docker.sh

# Déploiement en développement
./scripts/deploy-docker.sh development

# Construction uniquement
./scripts/deploy-docker.sh production latest --build-only

# Pousser vers un registry
./scripts/deploy-docker.sh production latest --push --registry your-registry.com
```

## 🔧 Commandes Docker Manuelles

### Construction de l'image
```bash
# Image de production (avec Nginx)
docker build -t arcc-website:latest .

# Image de développement
docker build --target development -t arcc-website:dev .
```

### Démarrage des conteneurs
```bash
# Production
docker run -d --name arcc-website -p 80:80 arcc-website:latest

# Développement
docker run -d --name arcc-website-dev -p 3000:3000 arcc-website:dev
```

### Gestion des conteneurs
```bash
# Voir les logs
docker logs arcc-website

# Arrêter le conteneur
docker stop arcc-website

# Redémarrer le conteneur
docker restart arcc-website

# Supprimer le conteneur
docker rm -f arcc-website

# Voir les images
docker images

# Supprimer une image
docker rmi arcc-website:latest
```

## 🏗️ Architecture Docker

### Stage 1: Builder
- Utilise Node.js 18 Alpine
- Installe les dépendances
- Construit l'application Next.js
- Génère les fichiers statiques dans `/app/out`

### Stage 2: Production
- Utilise Nginx Alpine (image légère)
- Copie les fichiers statiques depuis le stage builder
- Configure Nginx pour servir les fichiers statiques
- Optimise les performances avec compression gzip et cache

### Stage 3: Development (optionnel)
- Utilise Node.js 18 Alpine
- Installe toutes les dépendances (dev + prod)
- Démarre le serveur de développement Next.js
- Support du hot-reload

## ⚙️ Configuration Nginx

Le fichier `nginx.conf` inclut :
- Compression gzip pour les fichiers texte
- Cache optimisé pour les fichiers statiques
- Headers de sécurité
- Configuration SPA pour Next.js
- Logs d'accès et d'erreur

## 🌐 Déploiement sur VPS

Pour déployer sur un VPS Debian :

1. **Préparer le serveur** :
```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Installer Docker Compose
sudo apt-get install docker-compose-plugin
```

2. **Cloner le projet** :
```bash
git clone <votre-repo>
cd arcc-website
```

3. **Déployer** :
```bash
# Production
./scripts/deploy-docker.sh production

# Ou avec Docker Compose
docker-compose --profile prod up -d
```

4. **Configurer le reverse proxy** (optionnel) :
```bash
# Installer Nginx sur l'hôte
sudo apt install nginx

# Configurer le reverse proxy vers le conteneur
sudo nano /etc/nginx/sites-available/arcc-website
```

## 🔍 Monitoring et Logs

```bash
# Voir les logs en temps réel
docker logs -f arcc-website

# Voir les logs Nginx
docker exec arcc-website tail -f /var/log/nginx/access.log
docker exec arcc-website tail -f /var/log/nginx/error.log

# Vérifier le statut du conteneur
docker ps
docker stats arcc-website
```

## 🛠️ Dépannage

### Problèmes courants

1. **Port déjà utilisé** :
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :80
netstat -tulpn | grep :3000

# Arrêter le service qui utilise le port
sudo systemctl stop nginx  # si Nginx utilise le port 80
```

2. **Image ne se construit pas** :
```bash
# Nettoyer le cache Docker
docker system prune -a

# Reconstruire sans cache
docker build --no-cache -t arcc-website:latest .
```

3. **Conteneur ne démarre pas** :
```bash
# Vérifier les logs
docker logs arcc-website

# Vérifier la configuration
docker inspect arcc-website
```

## 📊 Optimisations

- **Taille de l'image** : Utilisation d'images Alpine Linux
- **Performance** : Configuration Nginx optimisée
- **Sécurité** : Headers de sécurité et masquage de la version
- **Cache** : Configuration de cache pour les fichiers statiques
- **Compression** : Activation de la compression gzip

## 🔄 CI/CD

Pour intégrer dans un pipeline CI/CD :

```yaml
# Exemple GitHub Actions
- name: Build Docker image
  run: docker build -t arcc-website:${{ github.sha }} .

- name: Push to registry
  run: docker push your-registry.com/arcc-website:${{ github.sha }}

- name: Deploy to VPS
  run: |
    ssh user@your-vps "docker pull your-registry.com/arcc-website:${{ github.sha }}"
    ssh user@your-vps "docker stop arcc-website && docker rm arcc-website"
    ssh user@your-vps "docker run -d --name arcc-website -p 80:80 your-registry.com/arcc-website:${{ github.sha }}"
```
