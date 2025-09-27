# Guide de Déploiement K3s pour ARCC Website

## Prérequis

- Un serveur VPS Debian/Ubuntu avec au moins 1GB RAM
- Docker installé
- Accès root ou sudo

## Installation de K3s

### 1. Installation rapide

```bash
# Installer K3s
curl -sfL https://get.k3s.io | sh -

# Vérifier l'installation
sudo k3s kubectl get nodes
```

### 2. Configuration pour accès externe

```bash
# Modifier la configuration K3s pour exposer les ports
sudo nano /etc/systemd/system/k3s.service

# Ajouter ces arguments :
--node-external-ip=YOUR_SERVER_IP
--bind-address=0.0.0.0
--advertise-address=YOUR_SERVER_IP

# Redémarrer K3s
sudo systemctl daemon-reload
sudo systemctl restart k3s
```

## Construction et Déploiement

### 1. Construire l'image Docker

```bash
# Construire l'image
docker build -t arcc-website:latest .

# Taguer pour K3s (optionnel)
docker tag arcc-website:latest localhost:5000/arcc-website:latest
```

### 2. Déployer sur K3s

```bash
# Appliquer les manifestes Kubernetes
sudo k3s kubectl apply -f k8s/namespace.yaml
sudo k3s kubectl apply -f k8s/configmap.yaml
sudo k3s kubectl apply -f k8s/deployment.yaml
sudo k3s kubectl apply -f k8s/service.yaml
sudo k3s kubectl apply -f k8s/ingress.yaml

# Vérifier le déploiement
sudo k3s kubectl get pods -n arcc-website
sudo k3s kubectl get services -n arcc-website
sudo k3s kubectl get ingress -n arcc-website
```

### 3. Vérifier les logs

```bash
# Logs du déploiement
sudo k3s kubectl logs -f deployment/arcc-website -n arcc-website

# Logs d'un pod spécifique
sudo k3s kubectl logs -f <pod-name> -n arcc-website
```

## Accès au Site

### Option 1 : NodePort (Simple)
- Accédez à votre site via : `http://YOUR_SERVER_IP:30080`

### Option 2 : Ingress avec Traefik (Recommandé)
- Ajoutez dans votre `/etc/hosts` : `YOUR_SERVER_IP arcc-website.local`
- Accédez via : `http://arcc-website.local`

### Option 3 : Domaine personnalisé
- Modifiez `k8s/ingress.yaml` pour utiliser votre domaine
- Configurez votre DNS pour pointer vers votre serveur

## Gestion et Maintenance

### Mise à jour du site

```bash
# 1. Reconstruire l'image
docker build -t arcc-website:latest .

# 2. Redémarrer le déploiement
sudo k3s kubectl rollout restart deployment/arcc-website -n arcc-website

# 3. Vérifier le statut
sudo k3s kubectl rollout status deployment/arcc-website -n arcc-website
```

### Monitoring

```bash
# Statut des pods
sudo k3s kubectl get pods -n arcc-website -o wide

# Utilisation des ressources
sudo k3s kubectl top pods -n arcc-website

# Événements
sudo k3s kubectl get events -n arcc-website --sort-by='.lastTimestamp'
```

### Sauvegarde

```bash
# Sauvegarder la configuration
sudo k3s kubectl get all -n arcc-website -o yaml > backup-arcc-website.yaml
```

## Configuration Avancée

### HTTPS avec Let's Encrypt

```bash
# Installer cert-manager
sudo k3s kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Créer un ClusterIssuer pour Let's Encrypt
cat <<EOF | sudo k3s kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
```

### Mise à l'échelle

```bash
# Augmenter le nombre de répliques
sudo k3s kubectl scale deployment arcc-website --replicas=3 -n arcc-website

# Auto-scaling basé sur l'utilisation CPU
cat <<EOF | sudo k3s kubectl apply -f -
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: arcc-website-hpa
  namespace: arcc-website
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: arcc-website
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
EOF
```

## Dépannage

### Problèmes courants

1. **Pod en état Pending**
   ```bash
   sudo k3s kubectl describe pod <pod-name> -n arcc-website
   ```

2. **Image non trouvée**
   ```bash
   # Vérifier que l'image existe
   docker images | grep arcc-website
   ```

3. **Port non accessible**
   ```bash
   # Vérifier les services et ingress
   sudo k3s kubectl get svc,ingress -n arcc-website
   ```

### Logs utiles

```bash
# Logs K3s
sudo journalctl -u k3s -f

# Logs Traefik
sudo k3s kubectl logs -f -n kube-system -l app.kubernetes.io/name=traefik
```

## Sécurité

### Recommandations

1. **Limiter les ressources** : Utilisez les `resource limits` dans le deployment
2. **Sécurité réseau** : Configurez des NetworkPolicies si nécessaire
3. **Mise à jour** : Maintenez K3s à jour
4. **Sauvegarde** : Automatisez les sauvegardes de configuration

### Exemple de NetworkPolicy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: arcc-website-netpol
  namespace: arcc-website
spec:
  podSelector:
    matchLabels:
      app: arcc-website
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: arcc-website
    ports:
    - protocol: TCP
      port: 80
```

## Performance

### Optimisations recommandées

1. **Cache Nginx** : Configuré dans le ConfigMap
2. **Compression** : Activée pour les fichiers statiques
3. **CDN** : Considérez Cloudflare pour les assets statiques
4. **Monitoring** : Utilisez Prometheus/Grafana pour surveiller les performances

---

Ce guide vous permet de déployer efficacement votre site ARCC sur K3s avec une configuration robuste et évolutive.
