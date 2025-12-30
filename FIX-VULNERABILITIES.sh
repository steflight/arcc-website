#!/bin/bash
#
# Script de correction des vulnérabilités du projet arcc-website
# Corrige les CVEs critiques identifiées par npm audit
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

PROJECT_DIR="/home/steflight/devspace/arcc-workspace/arcc-website"
BACKUP_DIR="/home/steflight/security-backups/arcc-website-$(date +%Y%m%d_%H%M%S)"

echo "════════════════════════════════════════════════════════"
echo "  🔧 CORRECTION DES VULNÉRABILITÉS - arcc-website"
echo "════════════════════════════════════════════════════════"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    log_error "Fichier package.json introuvable dans $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"

log "Répertoire de travail: $(pwd)"
echo ""

# Créer un backup complet
log "Création d'un backup de sécurité..."
mkdir -p "$BACKUP_DIR"
cp -r package.json package-lock.json node_modules .env "$BACKUP_DIR/" 2>/dev/null || true
log_success "Backup créé dans: $BACKUP_DIR"
echo ""

# Afficher les vulnérabilités actuelles
log "Vulnérabilités actuelles:"
npm audit --summary
echo ""

# Étape 1: Corriger les vulnérabilités non-breaking
log "═══ Étape 1: Correction des vulnérabilités simples ═══"
log "Exécution de: npm audit fix"
npm audit fix

echo ""
log_success "Correction simple terminée"
echo ""

# Étape 2: Vérifier si des vulnérabilités critiques restent
log "Vérification des vulnérabilités restantes..."
CRITICAL_COUNT=$(npm audit --json 2>/dev/null | grep -o '"critical":[0-9]*' | grep -o '[0-9]*' || echo "0")

echo ""
if [ "$CRITICAL_COUNT" -gt 0 ]; then
    log_warning "$CRITICAL_COUNT vulnérabilité(s) critique(s) restante(s)"

    # Étape 3: Mettre à jour Next.js manuellement (vulnérabilité RCE)
    log ""
    log "═══ Étape 2: Mise à jour de Next.js (CRITIQUE) ═══"
    log_warning "Next.js a une vulnérabilité RCE (Remote Code Execution)"
    log "Mise à jour vers Next.js 15.5.9 (version sécurisée)..."

    npm install next@15.5.9

    log_success "Next.js mis à jour vers la version 15.5.9"
    echo ""
else
    log_success "Aucune vulnérabilité critique restante"
fi

# Vérification finale
log "═══ Vérification finale ═══"
npm audit --summary

echo ""
echo "════════════════════════════════════════════════════════"
echo "  ✅ CORRECTION DES VULNÉRABILITÉS TERMINÉE"
echo "════════════════════════════════════════════════════════"
echo ""

REMAINING_VULNS=$(npm audit --json 2>/dev/null | grep -o '"total":[0-9]*' | head -1 | grep -o '[0-9]*' || echo "0")

if [ "$REMAINING_VULNS" -eq 0 ]; then
    log_success "🎉 Toutes les vulnérabilités ont été corrigées!"
else
    log_warning "$REMAINING_VULNS vulnérabilité(s) restante(s)"
    log "Exécutez 'npm audit' pour voir les détails"
fi

echo ""
log "📋 Prochaines étapes recommandées:"
echo "  1. Tester l'application: npm run dev"
echo "  2. Reconstruire le container Docker"
echo "  3. Vérifier que tout fonctionne correctement"
echo "  4. Commit et push les changements"
echo ""
log "💾 Backup disponible dans: $BACKUP_DIR"
echo ""
