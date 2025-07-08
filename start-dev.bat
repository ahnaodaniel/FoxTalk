@echo off
echo ========================================
echo    Iniciando FoxTalk Frontend
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar
echo.

cd frontend

REM Tenta usar npx serve com build
echo Construindo o projeto...
call npm run build

echo.
echo Iniciando servidor...
npx serve -s build -l 3000

pause 