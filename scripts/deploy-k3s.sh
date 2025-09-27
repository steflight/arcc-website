#!/bin/bash

# Script de déploiement automatisé pour K3s
# Usage: ./scripts/deploy-k3s.sh [environment] [domain]

set -e

# Variables par défaut
ENVIRONMENT=${1:-production}
DOMAIN=${2:-arcc-website.local}
IMAGE_TAG=${3:-latest}
NAMESPACE="arcc-website"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier les prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    if ! command -v k3s &> /dev/null; then
        log_error "K3s n'est pas installé ou pas dans le PATH"
        exit 1
    fi
    
    log_success "Prérequis vérifiés"
}

# Construire l'image Docker
build_image() {
    log_info "Construction de l'image Docker..."
    
    # Construire l'image
    docker build -t arcc-website:${IMAGE_TAG} .
    
    # Taguer pour le registry local si nécessaire
    if [[ "$ENVIRONMENT" == "production" ]]; then
        docker tag arcc-website:${IMAGE_TAG} localhost:5000/arcc-website:${IMAGE_TAG}
    fi
    
    log_success "Image Docker construite: arcc-website:${IMAGE_TAG}"
}

# Déployer sur K3s
deploy_to_k3s() {
    log_info "Déploiement sur K3s..."
    
    # Créer le namespace s'il n'existe pas
    k3s kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | k3s kubectl apply -f -
    
    # Appliquer les manifestes
    log_info "Application des manifestes Kubernetes..."
    
    k3s kubectl apply -f k8s/namespace.yaml
    k3s kubectl apply -f k8s/configmap.yaml
    k3s kubectl apply -f k8s/deployment.yaml
    k3s kubectl apply -f k8s/service.yaml
    
    # Mettre à jour le domaine dans l'ingress
    sed "s/arcc-website.local/${DOMAIN}/g" k8s/ingress.yaml | k3s kubectl apply -f -
    
    log_success "Manifestes appliqués"
}

# Vérifier le déploiement
check_deployment() {
    log_info "Vérification du déploiement..."
    
    # Attendre que les pods soient prêts
    k3s kubectl wait --for=condition=ready pod -l app=arcc-website -n ${NAMESPACE} --timeout=300s
    
    # Afficher le statut
    log_info "Statut des pods:"
    k3s kubectl get pods -n ${NAMESPACE}
    
    log_info "Statut des services:"
    k3s kubectl get services -n ${NAMESPACE}
    
    log_info "Statut de l'ingress:"
    k3s kubectl get ingress -n ${NAMESPACE}
    
    log_success "Déploiement vérifié"
}

# Afficher les informations d'accès
show_access_info() {
    log_success "Déploiement terminé!"
    echo ""
    log_info "Informations d'accès:"
    echo "  - NodePort: http://$(hostname -I | awk '{print $1}'):30080"
    echo "  - Ingress: http://${DOMAIN}"
    echo ""
    log_info "Pour accéder via l'ingress, ajoutez cette ligne à votre /etc/hosts:"
    echo "  $(hostname -I | awk '{print $1}') ${DOMAIN}"
    echo ""
    log_info "Commandes utiles:"
    echo "  - Voir les logs: k3s kubectl logs -f deployment/arcc-website -n ${NAMESPACE}"
    echo "  - Redémarrer: k3s kubectl rollout restart deployment/arcc-website -n ${NAMESPACE}"
    echo "  - Statut: k3s kubectl get all -n ${NAMESPACE}"
}

# Nettoyage en cas d'erreur
cleanup_on_error() {
    log_error "Erreur détectée. Nettoyage..."
    k3s kubectl delete namespace ${NAMESPACE} --ignore-not-found=true
    exit 1
}

# Fonction principale
main() {
    log_info "Début du déploiement ARCC Website sur K3s"
    log_info "Environnement: ${ENVIRONMENT}"
    log_info "Domaine: ${DOMAIN}"
    log_info "Tag d'image: ${IMAGE_TAG}"
    echo ""
    
    # Configurer le trap pour le nettoyage en cas d'erreur
    trap cleanup_on_error ERR
    
    # Exécuter les étapes
    check_prerequisites
    build_image
    deploy_to_k3s
    check_deployment
    show_access_info
    
    log_success "Déploiement terminé avec succès!"
}

# Exécuter si le script est appelé directement
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
