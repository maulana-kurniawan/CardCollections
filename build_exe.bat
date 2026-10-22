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

echo [1/3] Menginstal dependensi dan PyInstaller...
python -m pip install -r requirements.txt --quiet
python -m pip install pyinstaller --quiet

echo [2/3] Mengompilasi source code menjadi CardCollections.exe...
pyinstaller --clean CardCollections.spec

if exist dist\CardCollections.exe (
    echo [3/3] Berhasil mengompilasi!
    echo ========================================================
    echo Berkas EXE tersedia di: dist\CardCollections.exe
    echo Salin folder 'images' dan berkas 'data.json' ke folder 'dist\'
    echo agar data kartu dapat langsung dibaca oleh program.
    echo ========================================================
    xcopy /E /I /Y images dist\images >nul
    copy /Y data.json dist\data.json >nul
    echo Folder dist\ siap dijalankan secara portabel!
) else (
    echo [ERROR] Gagal mengompilasi berkas EXE.
)

pause
