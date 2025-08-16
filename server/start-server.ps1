# PowerShell script to start Maren HR System Server
Write-Host "Starting Maren HR System Server..." -ForegroundColor Green
Write-Host ""

# Set the MongoDB connection string as environment variable
$env:MONGO_URI = "mongodb+srv://Maren:MAREN81MAREN@maren.nyh3eog.mongodb.net/maren_db?retryWrites=true&w=majority&appName=Maren"

Write-Host "MongoDB URI set to: $env:MONGO_URI" -ForegroundColor Yellow
Write-Host ""

# Start the server
Write-Host "Starting server..." -ForegroundColor Cyan
node Server.js

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
