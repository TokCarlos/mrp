@echo off
title MRP - Deploy Avançado

:MENU
cls
echo =============================================
echo       SISTEMA MRP - DEPLOY AVANCADO
echo =============================================
echo.
echo [1] Commit automatico (timestamp)
echo [2] Commit personalizado
echo [3] Escolher branch
echo [4] Git Pull (atualizar antes de modificar)
echo [5] Mostrar git status
echo [6] Limpar arquivos não rastreados (git clean)
echo [7] Deploy completo (Pull + Commit + Push)
echo [0] Sair
echo.

set /p opcao=Escolha uma opcao: 

if "%opcao%"=="1" goto AUTO
if "%opcao%"=="2" goto CUSTOM
if "%opcao%"=="3" goto BRANCH
if "%opcao%"=="4" goto PULL
if "%opcao%"=="5" goto STATUS
if "%opcao%"=="6" goto CLEAN
if "%opcao%"=="7" goto FULL
if "%opcao%"=="0" goto END

echo Opcao invalida.
pause
goto MENU


:AUTO
cls
echo =============================================
echo         COMMIT AUTOMATICO (timestamp)
echo =============================================
echo.

git add .
git commit -m "Auto-update %date% %time%"
git push

echo.
echo Concluido.
pause
goto MENU


:CUSTOM
cls
echo =============================================
echo         COMMIT PERSONALIZADO
echo =============================================
echo.

set /p msg=Digite a mensagem do commit: 

git add .
git commit -m "%msg%"
git push

echo.
echo Concluido.
pause
goto MENU


:BRANCH
cls
echo =============================================
echo           MUDAR DE BRANCH
echo =============================================
echo.

echo Branches disponiveis:
git branch
echo.

set /p br=Digite o nome do branch desejado: 
git checkout %br%

echo.
echo Branch alterado para %br%.
pause
goto MENU


:PULL
cls
echo =============================================
echo            GIT PULL (ATUALIZAR)
echo =============================================
echo.

git pull

echo.
echo Concluido.
pause
goto MENU


:STATUS
cls
echo =============================================
echo           STATUS DO REPOSITORIO
echo =============================================
echo.

git status

echo.
pause
goto MENU


:CLEAN
cls
echo =============================================
echo     LIMPAR ARQUIVOS NAO RASTREADOS
echo =============================================
echo.

echo Atenção: Isso remove arquivos que o git não conhece.
echo.
set /p conf=Tem certeza? (s/n): 

if /I "%conf%"=="s" (
    git clean -fd
    echo Limpeza concluída.
) else (
    echo Cancelado.
)

echo.
pause
goto MENU


:FULL
cls
echo =============================================
echo   DEPLOY COMPLETO (PULL + COMMIT + PUSH)
echo =============================================
echo.

git pull

echo.
echo ===== Commit =====
set /p msg=Mensagem do commit: 

git add .
git commit -m "%msg%"
git push

echo.
echo Deploy completo finalizado.
pause
goto MENU


:END
echo.
echo =============================================
echo           PROCESSO ENCERRADO
echo =============================================
pause
exit
