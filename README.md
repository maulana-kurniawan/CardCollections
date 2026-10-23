# Card Collection (Animal Kaiser Edition)

Aplikasi manajemen dan pemindai barcode kartu fisik untuk game arcade **Animal Kaiser** yang berjalan pada **Play! PlayStation 2 / Namco System 147 Emulator**.

- **Author / Maintainer:** [maulana-kurniawan](https://github.com/maulana-kurniawan)
- **Kredit & Sumber Asli:** Proyek ini dikembangkan dan ditingkatkan dari repositori asli [Card-Collections](https://github.com/Bebeq/Card-Collections) oleh **[Bebeq](https://github.com/Bebeq)**.
- **Pengembangan:** *Vibe coded* menggunakan **Antigravity (Gemini 3.8 Flash)** ⚡

---

## Pembaruan & Perubahan dari Versi Asli Bebeq

Berikut adalah perombakan fitur, antarmuka, dan perbaikan teknis yang dilakukan:

1. **Desain Antarmuka Material 3 Dark Theme:**
   - Desain modern bernuansa gelap dengan aksen warna khas Animal Kaiser per kategori:
     - 🔴 **Animal:** Kaiser Red (`#e61919`)
     - 🟢 **Strong:** Kaiser Emerald (`#00cc44`)
     - 🔵 **Miracle:** Cosmic Blue (`#0088ff`)
   - Tipografi menggunakan Google Fonts **Public Sans** dan emoji open-source **Noto Color Emoji**.

2. **Visual Barcode 1D Asli (JsBarcode):**
   - Menggantikan tampilan teks barcode biasa/emoji dengan **garis barcode 1D visual asli (SVG)** di setiap kartu koleksi, lengkap dengan kode teks di bawahnya.

3. **Sistem Chip Rarity & Rarity Baru:**
   - Warna latar belakang chip rarity disesuaikan secara dinamis dengan nama rarity.
   - **Ultra Rare:** Efek gradien khusus perpaduan **Biru, Ungu, dan Merah** (`linear-gradient`) disertai animasi kilau lembut.
   - **Kaiser Rare (Baru):** Menambahkan tingkat rarity baru dengan gradasi mewah **Emas ke Silver / Abu metalik** dan animasi gleam.

4. **Layout Kartu TCG Vertikal Presisi:**
   - Kartu dirancang dengan proporsi vertikal arcade (~1:1.4) berbingkai bezel TCG, menggantikan layout persegi/tidak proporsional sebelumnya.

5. **Pemindai Barcode dari Berkas Gambar (Modal Input):**
   - Menambahkan tombol **`[📷 Scan Gambar]`** pada form Tambah dan Edit kartu untuk membaca barcode dari foto/screenshot tanpa perlu mengetik manual.
   - Deteksi otomatis: memilih foto kartu fisik secara cerdas akan mengecek dan mengisi kode barcode jika belum diisi.

6. **Notifikasi Material 3 Floating Toast / Snackbar:**
   - Menggantikan pesan notifikasi polos menjadi toast melayang dengan *frosted glass* di tengah bawah layar.
   - Deteksi status cerdas: menampilkan ikon dan warna peringatan amber `⚠️` saat Play! offline, hijau `✅` saat berhasil, dan merah `❌` saat gagal.

7. **Perbaikan Kompilasi PyInstaller & Dependensi Windows C-DLL:**
   - Mengatasi error crash `FileNotFoundError: Could not find module 'libiconv.dll'` pada Windows dengan membundel dependensi C-runtime `pyzbar` (`libiconv.dll`, `libzbar-64.dll`, `msvcr120.dll`) dan mengonfigurasi `os.add_dll_directory` secara tepat.

---

## Cara Menjalankan

### 1. Menjalankan Langsung (Python Source Code)
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

Anda dapat mengompilasi seluruh *source code* ini menjadi satu berkas biner mandiri `CardCollections.exe`:

1. Klik ganda berkas **`build.bat`**
2. Skrip akan otomatis memeriksa dependensi dan membangun program dengan PyInstaller
3. Berkas eksekusi mandiri akan berada di:
   ```text
   dist/
   └── CardCollections.exe
   ```

> [!NOTE]
> **Tentang `data.json` dan folder `images/`:**
> Berkas hasil build tidak memerlukan `data.json` maupun folder `images/` bawaan. Folder `images/` dan berkas `data.json` akan otomatis dibuat (*auto-generated*) oleh aplikasi saat Anda menambahkan kartu koleksi pertama kali.

---

## Unduhan Rilis Otomatis (GitHub Releases)

Setiap ada **push commit** baru ke branch `main`, GitHub Actions akan otomatis mengompilasi dan menerbitkan biner mandiri terbaru pada tab **Releases**:
- **`CardCollections.exe`**: Biner portabel mandiri siap pakai untuk Windows.

---

## Lisensi

Proyek ini dilisensikan di bawah lisensi terbuka **[MIT License](LICENSE)** &copy; 2026 [maulana-kurniawan](https://github.com/maulana-kurniawan).
