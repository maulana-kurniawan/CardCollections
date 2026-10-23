@echo off
title Card Collection 2.0.3
echo ===================================================
echo Starting Card Collection 2.0.3 (Animal Kaiser & Play!)
echo ===================================================

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b
)

echo Checking dependencies...
python -m pip install -r requirements.txt --quiet

echo Launching Card Collections...
python app.py
pause
