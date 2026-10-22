@echo off
title Build Card Collections Executable
echo =======================================================
echo Building Card Collections Standalone Executable (.exe)
echo Author: maulana-kurniawan
echo =======================================================

where pyinstaller >nul 2>nul
if %errorlevel% neq 0 (
    echo PyInstaller not found. Installing PyInstaller...
    python -m pip install pyinstaller
)

echo.
echo Compiling with PyInstaller...
pyinstaller --noconfirm --onedir --windowed ^
    --add-data "templates;templates" ^
    --add-data "static;static" ^
    --name "CardCollections" ^
    app.py

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo BUILD SUCCESSFUL!
    echo Output binary is in: dist\CardCollections\
    echo =======================================================
) else (
    echo.
    echo [ERROR] Build failed. Please inspect the error messages above.
)
pause
