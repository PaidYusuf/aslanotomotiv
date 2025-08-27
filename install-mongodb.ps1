# MongoDB Installation Script for Windows

# Check if MongoDB is already installed
if (Get-Command "mongod" -ErrorAction SilentlyContinue) {
    Write-Host "MongoDB is already installed!" -ForegroundColor Green
    Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
    net start MongoDB
    Write-Host "MongoDB is now running on localhost:27017" -ForegroundColor Green
    exit 0
}

Write-Host "MongoDB is not installed. Please install it using one of these methods:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Download MongoDB Community Edition from:" -ForegroundColor Cyan
Write-Host "   https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Or use Chocolatey:" -ForegroundColor Cyan
Write-Host "   choco install mongodb" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Or use Scoop:" -ForegroundColor Cyan
Write-Host "   scoop install mongodb" -ForegroundColor Cyan
Write-Host ""
Write-Host "After installation, run this script again or manually start MongoDB with:" -ForegroundColor Yellow
Write-Host "   net start MongoDB" -ForegroundColor Yellow
