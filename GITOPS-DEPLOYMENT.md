# Guide de Déploiement GitOps avec FluxCD et K3s

## Architecture GitOps

Ce guide implémente une architecture GitOps complète pour déployer votre site ARCC sur K3s avec FluxCD.

### Structure des Repositories

```
arcc-website (Code source)
├── src/                    # Code Next.js
├── k8s/                    # Manifests Kubernetes
├── .github/workflows/      # CI/CD GitHub Actions
└── Dockerfile

arcc-website-gitops (Configuration GitOps)
├── clusters/
│   └── production/         # Configuration production
├── apps/
│   └── arcc-website/       # Application manifests
└── flux-system/           # Configuration FluxCD
```

## Prérequis

1. **Serveur VPS** avec K3s installé
2. **Deux repositories GitHub** :
   - `arcc-website` : Code source
   - `arcc-website-gitops` : Configuration GitOps
3. **Token GitHub** avec permissions appropriées

## Installation et Configuration

### 1. Installation de FluxCD sur K3s

```bash
# Installer FluxCD CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Vérifier la pré-installation
flux check --pre

# Installer FluxCD sur K3s
flux install

# Vérifier l'installation
flux check
```

### 2. Configuration des Repositories

#### Repository GitOps (arcc-website-gitops)

```bash
# Cloner et configurer le repository GitOps
git clone https://github.com/votre-username/arcc-website-gitops.git
cd arcc-website-gitops

# Copier les fichiers de configuration depuis ce projet
cp -r gitops/* .

# Personnaliser les URLs et tokens
# Modifier dans gitops/clusters/production/arcc-website-source.yaml :
# - url: https://github.com/votre-username/arcc-website
# - image: ghcr.io/votre-username/arcc-website

# Modifier dans gitops/flux-system/install.yaml :
# - url: https://github.com/votre-username/arcc-website-gitops

# Commiter et pousser
git add .
git commit -m "Initial GitOps configuration"
git push origin main
```

#### Token GitHub

1. Créer un **Personal Access Token** sur GitHub avec ces permissions :
   - `repo` (accès complet aux repositories)
   - `packages:write` (pour pousser les images Docker)

2. Ajouter le token dans K3s :

```bash
# Créer le secret pour FluxCD
kubectl create secret generic flux-system \
  --from-literal=username=votre-username \
  --from-literal=password=votre-token-github \
  -n flux-system
```

### 3. Bootstrap FluxCD

```bash
# Bootstrap FluxCD avec votre repository GitOps
flux bootstrap github \
  --owner=votre-username \
  --repository=arcc-website-gitops \
  --branch=main \
  --path=./clusters/production \
  --personal
```

### 4. Configuration du Registry Docker

```bash
# Créer le secret pour GitHub Container Registry
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=votre-username \
  --docker-password=votre-token-github \
  --docker-email=votre-email@example.com \
  -n arcc-website

# Patch le serviceaccount pour utiliser le secret
kubectl patch serviceaccount default \
  -p '{"imagePullSecrets": [{"name": "ghcr-secret"}]}' \
  -n arcc-website
```

## Workflow GitOps

### 1. Développement

```bash
# 1. Développement local
git checkout -b feature/nouvelle-fonctionnalite
# ... développement ...
git commit -m "Add nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# 2. Pull Request
# Créer une PR sur GitHub
# Les tests et scans de sécurité s'exécutent automatiquement

# 3. Merge vers main
# Le CI/CD se déclenche automatiquement
```

### 2. Déploiement Automatique

1. **Build et Push** : GitHub Actions construit l'image Docker
2. **Image Update** : FluxCD détecte la nouvelle image
3. **Deployment** : FluxCD met à jour le déploiement
4. **Verification** : Health checks et monitoring

### 3. Monitoring et Notifications

```bash
# Vérifier le statut des déploiements
flux get kustomizations

# Vérifier les images
flux get images

# Vérifier les sources Git
flux get sources git

# Logs des composants FluxCD
kubectl logs -n flux-system deployment/source-controller
kubectl logs -n flux-system deployment/kustomize-controller
kubectl logs -n flux-system deployment/image-reflector-controller
kubectl logs -n flux-system deployment/image-automation-controller
```

## Configuration Avancée

### 1. Multi-Environnements

```bash
# Structure pour plusieurs environnements
gitops/
├── clusters/
│   ├── staging/
│   ├── production/
│   └── development/
└── apps/
    └── arcc-website/
        ├── base/
        ├── staging/
        └── production/
```

### 2. Rollback Automatique

```bash
# Configuration du rollback automatique
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: arcc-website
spec:
  # ... autres configurations ...
  healthChecks:
  - apiVersion: apps/v1
    kind: Deployment
    name: arcc-website
    namespace: arcc-website
  timeout: 5m
  retryInterval: 2m
  prune: true
  wait: true
```

### 3. Secrets Management

```bash
# Utiliser Sealed Secrets ou External Secrets
# Exemple avec Sealed Secrets
kubectl create secret generic arcc-website-secrets \
  --from-literal=api-key=your-api-key \
  --dry-run=client -o yaml | kubeseal -o yaml > sealed-secret.yaml
```

### 4. Monitoring avec Prometheus

```bash
# Installer Prometheus sur K3s
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# Les ServiceMonitors sont déjà configurés dans monitoring.yaml
```

## Maintenance et Opérations

### 1. Mise à jour de FluxCD

```bash
# Vérifier les nouvelles versions
flux version

# Mettre à jour
flux install --version=v2.0.0

# Vérifier la compatibilité
flux check
```

### 2. Sauvegarde de la Configuration

```bash
# Sauvegarder la configuration FluxCD
kubectl get all -n flux-system -o yaml > flux-backup.yaml

# Sauvegarder les secrets
kubectl get secrets -n flux-system -o yaml > flux-secrets-backup.yaml
```

### 3. Dépannage

```bash
# Problèmes de synchronisation
flux reconcile source git arcc-website-source -n arcc-website
flux reconcile kustomization arcc-website -n arcc-website

# Problèmes d'images
flux reconcile image repository arcc-website -n arcc-website
flux reconcile image policy arcc-website -n arcc-website

# Logs détaillés
kubectl logs -n flux-system deployment/kustomize-controller --tail=100
```

## Avantages de cette Architecture

### 1. **GitOps Benefits**
- ✅ **Audit Trail** : Tous les changements sont trackés dans Git
- ✅ **Rollback Facile** : Revenir à n'importe quel commit
- ✅ **Collaboration** : Reviews via Pull Requests
- ✅ **Consistency** : Même processus pour tous les environnements

### 2. **FluxCD Benefits**
- ✅ **Déclaratif** : Configuration as Code
- ✅ **Automatique** : Synchronisation continue
- ✅ **Sécurisé** : Validation et tests avant déploiement
- ✅ **Observable** : Monitoring et alerting intégrés

### 3. **K3s Benefits**
- ✅ **Léger** : Parfait pour un site web
- ✅ **Rapide** : Démarrage et déploiements rapides
- ✅ **Économique** : Peut tourner sur un VPS simple
- ✅ **Maintenable** : Moins de complexité qu'un cluster K8s complet

## Commandes Utiles

```bash
# Statut général
flux get all

# Forcer la synchronisation
flux reconcile source git --all
flux reconcile kustomization --all

# Vérifier les images disponibles
flux get images --all

# Logs en temps réel
kubectl logs -f -n flux-system deployment/kustomize-controller

# Événements
kubectl get events -n arcc-website --sort-by='.lastTimestamp'
```

---

Cette architecture GitOps vous permet de déployer et maintenir votre site ARCC de manière professionnelle, avec une approche moderne et scalable.
