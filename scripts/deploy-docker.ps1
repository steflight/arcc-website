# Kladriva Website Docker Deployment Script
# Usage: .\deploy-docker.ps1

param(
    [string]$Environment = "production",
    [string]$ImageTag = "latest",
    [switch]$BuildOnly,
    [switch]$PushToRegistry,
    [string]$RegistryUrl = "",
    [string]$ContainerName = "arcc-website"
)

Write-Host "🐳 Starting Kladriva Website Docker Deployment..." -ForegroundColor Green

# Fonction pour vérifier si Docker est installé
function Test-Docker {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        Write-Host "❌ Docker n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
        return $false
    }
}

# Fonction pour construire l'image Docker
function Build-DockerImage {
    Write-Host "🔨 Construction de l'image Docker..." -ForegroundColor Blue
    
    $buildCommand = "docker build -t $ContainerName`:$ImageTag ."
    Write-Host "Commande: $buildCommand" -ForegroundColor Cyan
    
    Invoke-Expression $buildCommand
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de la construction de l'image Docker!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Image Docker construite avec succès!" -ForegroundColor Green
}

# Fonction pour démarrer le conteneur
function Start-DockerContainer {
    Write-Host "🚀 Démarrage du conteneur..." -ForegroundColor Blue
    
    # Arrêter le conteneur existant s'il existe
    $existingContainer = docker ps -a --filter "name=$ContainerName" --format "{{.Names}}"
    if ($existingContainer) {
        Write-Host "🛑 Arrêt du conteneur existant..." -ForegroundColor Yellow
        docker stop $ContainerName
        docker rm $ContainerName
    }
    
    # Démarrer le nouveau conteneur
    $port = if ($Environment -eq "development") { "3000" } else { "80" }
    $startCommand = "docker run -d --name $ContainerName -p $port`:$port $ContainerName`:$ImageTag"
    
    Write-Host "Commande: $startCommand" -ForegroundColor Cyan
    Invoke-Expression $startCommand
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec du démarrage du conteneur!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Conteneur démarré avec succès!" -ForegroundColor Green
    Write-Host "🌐 Site accessible sur: http://localhost:$port" -ForegroundColor Cyan
}

# Fonction pour utiliser Docker Compose
function Start-DockerCompose {
    Write-Host "🐳 Démarrage avec Docker Compose..." -ForegroundColor Blue
    
    $profile = if ($Environment -eq "development") { "dev" } else { "prod" }
    $composeCommand = "docker-compose --profile $profile up -d"
    
    Write-Host "Commande: $composeCommand" -ForegroundColor Cyan
    Invoke-Expression $composeCommand
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec du démarrage avec Docker Compose!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Services démarrés avec succès!" -ForegroundColor Green
}

# Fonction pour pousser vers un registry
function Push-ToRegistry {
    if (-not $RegistryUrl) {
        Write-Host "❌ URL du registry non fournie" -ForegroundColor Red
        return
    }
    
    Write-Host "📤 Poussée vers le registry..." -ForegroundColor Blue
    
    $tagCommand = "docker tag $ContainerName`:$ImageTag $RegistryUrl/$ContainerName`:$ImageTag"
    $pushCommand = "docker push $RegistryUrl/$ContainerName`:$ImageTag"
    
    Write-Host "Commande: $tagCommand" -ForegroundColor Cyan
    Invoke-Expression $tagCommand
    
    Write-Host "Commande: $pushCommand" -ForegroundColor Cyan
    Invoke-Expression $pushCommand
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de la poussée vers le registry!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Image poussée vers le registry avec succès!" -ForegroundColor Green
}

# Vérification de Docker
if (-not (Test-Docker)) {
    exit 1
}

# Construction de l'image
Build-DockerImage

# Si seulement la construction est demandée
if ($BuildOnly) {
    Write-Host "✅ Construction terminée!" -ForegroundColor Green
    exit 0
}

# Poussée vers le registry si demandée
if ($PushToRegistry) {
    Push-ToRegistry
}

# Démarrage du conteneur
if ($Environment -eq "development" -or $Environment -eq "production") {
    Start-DockerCompose
} else {
    Start-DockerContainer
}

Write-Host "🎉 Déploiement Docker terminé avec succès!" -ForegroundColor Green
Write-Host "📝 Commandes utiles:" -ForegroundColor Yellow
Write-Host "  - Voir les logs: docker logs $ContainerName" -ForegroundColor White
Write-Host "  - Arrêter: docker stop $ContainerName" -ForegroundColor White
Write-Host "  - Redémarrer: docker restart $ContainerName" -ForegroundColor White
Write-Host "  - Supprimer: docker rm -f $ContainerName" -ForegroundColor White
