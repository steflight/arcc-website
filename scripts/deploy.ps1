# Kladriva Website Deployment Script
# Usage: .\deploy.ps1

param(
    [string]$FtpServer,
    [string]$FtpUsername,
    [string]$FtpPassword,
    [string]$RemotePath = "/public_html/"
)

Write-Host "🚀 Starting Kladriva Website Deployment..." -ForegroundColor Green

# Check if required parameters are provided
if (-not $FtpServer -or -not $FtpUsername -or -not $FtpPassword) {
    Write-Host "❌ Error: Please provide FTP credentials" -ForegroundColor Red
    Write-Host "Usage: .\deploy.ps1 -FtpServer 'yourdomain.com' -FtpUsername 'username' -FtpPassword 'password'" -ForegroundColor Yellow
    exit 1
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Check if out directory exists
if (-not (Test-Path "out")) {
    Write-Host "❌ Build output directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Deploying to Web Hosting Canada..." -ForegroundColor Blue
Write-Host "Server: $FtpServer" -ForegroundColor Cyan
Write-Host "Username: $FtpUsername" -ForegroundColor Cyan
Write-Host "Remote Path: $RemotePath" -ForegroundColor Cyan

# You can use WinSCP or other FTP tools here
# For now, we'll just show what would be uploaded
Write-Host "📁 Files ready for upload:" -ForegroundColor Blue
Get-ChildItem -Path "out" -Recurse | ForEach-Object {
    Write-Host "  $($_.FullName)" -ForegroundColor Gray
}

Write-Host "✅ Deployment script completed!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Upload the 'out' folder contents to your hosting" -ForegroundColor White
Write-Host "  2. Test your website at your domain" -ForegroundColor White
Write-Host "  3. Verify blog functionality" -ForegroundColor White
