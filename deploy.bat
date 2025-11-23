@echo off
echo =============================================
echo          MRP - DEPLOY AUTOMATICO
echo =============================================

echo.
echo >> Fazendo git add...
git add .

echo.
echo >> Criando commit com timestamp...
git commit -m "Auto-update %date% %time%"

echo.
echo >> Enviando para o GitHub...
git push

echo.
echo =============================================
echo              DEPLOY FINALIZADO
echo =============================================
echo.
pause
