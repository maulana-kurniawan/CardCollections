# Card Collection (Animal Kaiser Edition)

Aplikasi manajemen dan pemindai barcode kartu fisik untuk game arcade **Animal Kaiser** yang berjalan pada **Play! PlayStation 2 / Namco System 147 Emulator**.

**Author:** [maulana-kurniawan](https://github.com/maulana-kurniawan)

---

## Fitur Utama

- **UI Material 3 Dark Theme:** Desain modern dengan sistem warna khas Animal Kaiser (Merah untuk Animal, Hijau untuk Strong, Biru untuk Miracle).
- **Rarity Chip Khusus:**
  - *Normal:* Surface Slate
  - *Bronze Rare:* Metallic Bronze
  - *Silver Rare:* Chrome Metallic
  - *Gold Rare:* Sparkle Gold
  - *Ultra Rare:* **Gradien Biru, Ungu, dan Merah**
- **Layout Kartu Vertikal:** Proporsi kartu TCG arcade vertikal yang presisi (rasio ~1:1.4).
- **Kamera Scanner Real-time:** Memindai barcode kartu langsung dari webcam PC atau browser smartphone via WiFi (`http://<IP_PC>:5000`).
- **Koneksi Otomatis ke Play! Emulator:** Menembakkan barcode langsung ke port HTTP `9876/sys147/barcode`.
- **Manajemen Kartu Lengkap:** Tambah, edit, hapus, dan cari kartu koleksi Anda.

---

## Cara Menjalankan

### 1. Menjalankan Langsung (Python)
Klik ganda `run.bat` atau jalankan via terminal:
```bash
pip install -r requirements.txt
python app.py
```
Untuk menjalankan dalam mode web murni tanpa jendela desktop:
```bash
python app.py --no-gui
```

---

## Cara Kompilasi Menjadi File `.exe` Mandiri

Anda dapat mengompilasi seluruh *source code* ini menjadi satu berkas `CardCollections.exe` (seperti biner aslinya):

1. Klik ganda berkas **`build_exe.bat`**
2. Skrip akan otomatis menginstal PyInstaller dan membangun aplikasi ke folder `dist/`
3. Berkas eksekusi portabel akan berada di:
   ```text
   dist/
   ├── CardCollections.exe
   ├── data.json
   └── images/
   ```
