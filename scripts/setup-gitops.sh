#!/bin/bash

# Script d'initialisation GitOps pour ARCC Website
# Usage: ./scripts/setup-gitops.sh [github-username] [gitops-repo-name]

set -e

# Variables
GITHUB_USERNAME=${1:-}
GITOPS_REPO=${2:-arcc-website-gitops}
SOURCE_REPO="arcc-website"
DOMAIN=${3:-arcc-website.local}

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Vérifier les prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    if [ -z "$GITHUB_USERNAME" ]; then
        log_error "Nom d'utilisateur GitHub requis"
        echo "Usage: $0 <github-username> [gitops-repo-name] [domain]"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl n'est pas installé"
        exit 1
    fi
    
    if ! command -v flux &> /dev/null; then
        log_error "FluxCD CLI n'est pas installé"
        echo "Installer avec: curl -s https://fluxcd.io/install.sh | sudo bash"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        log_error "Git n'est pas installé"
        exit 1
    fi
    
    log_success "Prérequis vérifiés"
}

# Créer les repositories GitHub
setup_repositories() {
    log_info "Configuration des repositories GitHub..."
    
    # Vérifier si le repo GitOps existe
    if ! gh repo view "$GITHUB_USERNAME/$GITOPS_REPO" &> /dev/null; then
        log_info "Création du repository GitOps..."
        gh repo create "$GITHUB_USERNAME/$GITOPS_REPO" --private --clone
        
        # Copier les fichiers GitOps
        cp -r gitops/* "$GITOPS_REPO/"
        
        # Personnaliser les URLs
        find "$GITOPS_REPO" -name "*.yaml" -exec sed -i "s/votre-username/$GITHUB_USERNAME/g" {} \;
        find "$GITOPS_REPO" -name "*.yaml" -exec sed -i "s/arcc-website.local/$DOMAIN/g" {} \;
        
        # Commit initial
        cd "$GITOPS_REPO"
        git add .
        git commit -m "Initial GitOps configuration"
        git push origin main
        cd ..
        
        log_success "Repository GitOps créé: $GITHUB_USERNAME/$GITOPS_REPO"
    else
        log_warning "Repository GitOps existe déjà"
    fi
}

# Configurer les secrets
setup_secrets() {
    log_info "Configuration des secrets Kubernetes..."
    
    # Demander le token GitHub
    echo -n "Entrez votre token GitHub (ghp_...): "
    read -s GITHUB_TOKEN
    echo
    
    # Créer le secret FluxCD
    kubectl create secret generic flux-system \
        --from-literal=username="$GITHUB_USERNAME" \
        --from-literal=password="$GITHUB_TOKEN" \
        -n flux-system \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Créer le secret pour le registry Docker
    kubectl create secret docker-registry ghcr-secret \
        --docker-server=ghcr.io \
        --docker-username="$GITHUB_USERNAME" \
        --docker-password="$GITHUB_TOKEN" \
        --docker-email="$GITHUB_USERNAME@users.noreply.github.com" \
        -n arcc-website \
        --dry-run=client -o yaml | kubectl apply -f -
    
    log_success "Secrets configurés"
}

# Bootstrap FluxCD
bootstrap_flux() {
    log_info "Bootstrap FluxCD..."
    
    # Installer FluxCD si pas déjà installé
    if ! kubectl get namespace flux-system &> /dev/null; then
        flux install
    fi
    
    # Bootstrap avec le repository GitOps
    flux bootstrap github \
        --owner="$GITHUB_USERNAME" \
        --repository="$GITOPS_REPO" \
        --branch=main \
        --path=./clusters/production \
        --personal \
        --token-auth
    
    log_success "FluxCD bootstrap terminé"
}

# Configurer GitHub Actions
setup_github_actions() {
    log_info "Configuration des GitHub Actions..."
    
    # Vérifier si on est dans le bon repository
    if [ ! -f "package.json" ]; then
        log_error "Ce script doit être exécuté depuis le repository source"
        exit 1
    fi
    
    # Personnaliser les workflows
    find ".github/workflows" -name "*.yml" -exec sed -i "s/votre-username/$GITHUB_USERNAME/g" {} \;
    find ".github/workflows" -name "*.yml" -exec sed -i "s/arcc-website-gitops/$GITOPS_REPO/g" {} \;
    
    # Configurer les secrets GitHub (si gh CLI est configuré)
    if command -v gh &> /dev/null; then
        log_info "Configuration des secrets GitHub Actions..."
        gh secret set GITHUB_TOKEN --body="$GITHUB_TOKEN"
        log_success "Secrets GitHub Actions configurés"
    else
        log_warning "GitHub CLI non configuré. Configurez manuellement le secret GITHUB_TOKEN"
    fi
}

# Vérifier le déploiement
verify_deployment() {
    log_info "Vérification du déploiement..."
    
    # Attendre que FluxCD synchronise
    log_info "Attente de la synchronisation FluxCD..."
    sleep 30
    
    # Vérifier les ressources
    flux get kustomizations
    flux get sources git
    flux get images
    
    # Vérifier les pods
    kubectl get pods -n arcc-website
    
    log_success "Vérification terminée"
}

# Afficher les informations finales
show_final_info() {
    log_success "Configuration GitOps terminée!"
    echo ""
    log_info "Informations importantes:"
    echo "  - Repository source: $GITHUB_USERNAME/$SOURCE_REPO"
    echo "  - Repository GitOps: $GITHUB_USERNAME/$GITOPS_REPO"
    echo "  - Domaine: $DOMAIN"
    echo ""
    log_info "Prochaines étapes:"
    echo "  1. Commitez et poussez vos changements:"
    echo "     git add . && git commit -m 'Setup GitOps' && git push"
    echo ""
    echo "  2. Vérifiez le déploiement:"
    echo "     flux get all"
    echo "     kubectl get pods -n arcc-website"
    echo ""
    echo "  3. Accédez à votre site:"
    echo "     http://$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}'):30080"
    echo "     ou http://$DOMAIN (après configuration DNS)"
    echo ""
    log_info "Commandes utiles:"
    echo "  - Statut: flux get all"
    echo "  - Logs: kubectl logs -f -n flux-system deployment/kustomize-controller"
    echo "  - Synchronisation: flux reconcile source git --all"
}

# Fonction principale
main() {
    log_info "Initialisation GitOps pour ARCC Website"
    log_info "Utilisateur GitHub: $GITHUB_USERNAME"
    log_info "Repository GitOps: $GITOPS_REPO"
    log_info "Domaine: $DOMAIN"
    echo ""
    
    check_prerequisites
    setup_repositories
    setup_secrets
    bootstrap_flux
    setup_github_actions
    verify_deployment
    show_final_info
}

# Exécuter si appelé directement
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
