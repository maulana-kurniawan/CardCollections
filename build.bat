@echo off
title Build Card Collections EXE
echo ========================================================
echo   BUILD CARD COLLECTIONS STANDALONE EXE (by maulana-kurniawan)
echo ========================================================

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python tidak terdeteksi di PATH!
    pause
    exit /b
)

echo [1/2] Memastikan dependensi dan PyInstaller terpasang...
python -m pip install -r requirements.txt --quiet
python -m pip install pyinstaller --quiet

echo [2/2] Mengompilasi CardCollections.exe dengan PyInstaller...
pyinstaller --clean --noconfirm CardCollections.spec

if exist dist\CardCollections.exe (
    echo.
    echo ========================================================
    echo BUILD BERHASIL!
    echo Berkas eksekusi mandiri siap di:
    echo   dist\CardCollections.exe
    echo.
    echo (Catatan: data.json dan folder images/ akan dibuat
    echo  otomatis saat Anda menambahkan kartu pertama kali)
    echo ========================================================
) else (
    echo [ERROR] Gagal mengompilasi berkas EXE.
)

pause
