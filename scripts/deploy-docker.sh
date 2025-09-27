#!/bin/bash

# ARCC Website Docker Deployment Script
# Usage: ./deploy-docker.sh [environment] [options]

set -e

# Configuration par défaut
ENVIRONMENT=${1:-"production"}
IMAGE_TAG=${2:-"latest"}
CONTAINER_NAME="arcc-website"
REGISTRY_URL=""
BUILD_ONLY=false
PUSH_TO_REGISTRY=false

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_command() {
    echo -e "${CYAN}🔧 Commande: $1${NC}"
}

# Fonction pour vérifier si Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé ou n'est pas dans le PATH"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_warning "Docker Compose n'est pas installé. Utilisation de 'docker compose' à la place."
        COMPOSE_CMD="docker compose"
    else
        COMPOSE_CMD="docker-compose"
    fi
}

# Fonction pour construire l'image Docker
build_docker_image() {
    log_info "Construction de l'image Docker..."
    
    local build_command="docker build -t ${CONTAINER_NAME}:${IMAGE_TAG} ."
    log_command "$build_command"
    
    eval $build_command
    
    log_success "Image Docker construite avec succès!"
}

# Fonction pour démarrer le conteneur
start_docker_container() {
    log_info "Démarrage du conteneur..."
    
    # Arrêter le conteneur existant s'il existe
    if docker ps -a --filter "name=${CONTAINER_NAME}" --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        log_warning "Arrêt du conteneur existant..."
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
    fi
    
    # Démarrer le nouveau conteneur
    local port
    if [ "$ENVIRONMENT" = "development" ]; then
        port="3000"
    else
        port="80"
    fi
    
    local start_command="docker run -d --name ${CONTAINER_NAME} -p ${port}:${port} ${CONTAINER_NAME}:${IMAGE_TAG}"
    log_command "$start_command"
    
    eval $start_command
    
    log_success "Conteneur démarré avec succès!"
    log_info "Site accessible sur: http://localhost:${port}"
}

# Fonction pour utiliser Docker Compose
start_docker_compose() {
    log_info "Démarrage avec Docker Compose..."
    
    local profile
    if [ "$ENVIRONMENT" = "development" ]; then
        profile="dev"
    else
        profile="prod"
    fi
    
    local compose_command="${COMPOSE_CMD} --profile ${profile} up -d"
    log_command "$compose_command"
    
    eval $compose_command
    
    log_success "Services démarrés avec succès!"
}

# Fonction pour pousser vers un registry
push_to_registry() {
    if [ -z "$REGISTRY_URL" ]; then
        log_error "URL du registry non fournie"
        return 1
    fi
    
    log_info "Poussée vers le registry..."
    
    local tag_command="docker tag ${CONTAINER_NAME}:${IMAGE_TAG} ${REGISTRY_URL}/${CONTAINER_NAME}:${IMAGE_TAG}"
    local push_command="docker push ${REGISTRY_URL}/${CONTAINER_NAME}:${IMAGE_TAG}"
    
    log_command "$tag_command"
    eval $tag_command
    
    log_command "$push_command"
    eval $push_command
    
    log_success "Image poussée vers le registry avec succès!"
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 [environment] [image_tag] [options]"
    echo ""
    echo "Arguments:"
    echo "  environment    Environnement (development|production) [défaut: production]"
    echo "  image_tag      Tag de l'image Docker [défaut: latest]"
    echo ""
    echo "Options:"
    echo "  --build-only   Construire uniquement l'image sans démarrer"
    echo "  --push         Pousser vers un registry Docker"
    echo "  --registry     URL du registry Docker"
    echo "  --help         Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 production latest"
    echo "  $0 development dev"
    echo "  $0 production latest --build-only"
    echo "  $0 production latest --push --registry your-registry.com"
}

# Traitement des arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --build-only)
            BUILD_ONLY=true
            shift
            ;;
        --push)
            PUSH_TO_REGISTRY=true
            shift
            ;;
        --registry)
            REGISTRY_URL="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            shift
            ;;
    esac
done

# Vérification de Docker
check_docker

# Construction de l'image
build_docker_image

# Si seulement la construction est demandée
if [ "$BUILD_ONLY" = true ]; then
    log_success "Construction terminée!"
    exit 0
fi

# Poussée vers le registry si demandée
if [ "$PUSH_TO_REGISTRY" = true ]; then
    push_to_registry
fi

# Démarrage du conteneur
if [ "$ENVIRONMENT" = "development" ] || [ "$ENVIRONMENT" = "production" ]; then
    start_docker_compose
else
    start_docker_container
fi

log_success "Déploiement Docker terminé avec succès!"
echo ""
log_info "Commandes utiles:"
echo "  - Voir les logs: docker logs $CONTAINER_NAME"
echo "  - Arrêter: docker stop $CONTAINER_NAME"
echo "  - Redémarrer: docker restart $CONTAINER_NAME"
echo "  - Supprimer: docker rm -f $CONTAINER_NAME"
