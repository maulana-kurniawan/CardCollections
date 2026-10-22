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

echo [1/3] Memastikan dependensi dan PyInstaller terpasang...
python -m pip install -r requirements.txt --quiet
python -m pip install pyinstaller --quiet

echo [2/3] Mengompilasi CardCollections.exe dengan PyInstaller...
pyinstaller --clean --noconfirm CardCollections.spec

if exist dist\CardCollections.exe (
    echo.
    echo [3/3] Berhasil mengompilasi CardCollections.exe!
    echo ========================================================
    echo Menyalin aset awal ke folder dist\...
    xcopy /E /I /Y images dist\images >nul
    copy /Y data.json dist\data.json >nul
    echo.
    echo SIAP! Berkas aplikasi mandiri ada di:
    echo   d:\Card-Collections\dist\CardCollections.exe
    echo ========================================================
) else (
    echo [ERROR] Gagal mengompilasi berkas EXE.
)

pause
