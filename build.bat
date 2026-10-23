@echo off
title Build Card Collections EXE
echo ========================================================
echo   BUILD CARD COLLECTIONS STANDALONE EXE (by maulana-kurniawan)
echo ========================================================

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python was not found in your PATH!
    pause
    exit /b
)

echo [1/2] Verifying Python dependencies and PyInstaller...
python -m pip install -r requirements.txt --quiet
python -m pip install pyinstaller --quiet

echo [2/2] Compiling CardCollections.exe with PyInstaller...
pyinstaller --clean --noconfirm CardCollections.spec

if exist dist\CardCollections.exe (
    echo.
    echo ========================================================
    echo BUILD SUCCESSFUL!
    echo Standalone executable is ready at:
    echo   dist\CardCollections.exe
    echo.
    echo (Note: data.json and images/ folder will be auto-generated
    echo  when you add your first card through the application)
    echo ========================================================
) else (
    echo [ERROR] Failed to compile executable.
)

pause
