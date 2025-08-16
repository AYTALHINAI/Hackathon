@echo off
echo Starting Maren HR System Server...
echo.

REM Set the MongoDB connection string as environment variable
set MONGO_URI=mongodb+srv://Maren:MAREN81MAREN@maren.nyh3eog.mongodb.net/maren_db?retryWrites=true&w=majority&appName=Maren

echo MongoDB URI set to: %MONGO_URI%
echo.

REM Start the server
echo Starting server...
node Server.js

pause
