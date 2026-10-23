# Card Collection

A card management, barcode generation, and real-time scanning application for the arcade game **Animal Kaiser**, running on the **Play! PlayStation 2 / Namco System 147 Emulator**.

- **Author / Maintainer:** [maulana-kurniawan](https://github.com/maulana-kurniawan)
- **Credit & Original Source:** Built and redesigned upon the original [Card-Collections](https://github.com/Bebeq/Card-Collections) repository by **[Bebeq](https://github.com/Bebeq)**.
- **Development:** *Vibe coded* with **Google Antigravity (Gemini 3.8 Flash)** ⚡

---

## What's New & Enhancements over the Original Version

1. **Streamlined Navigation & Unified Card Catalog:**
   - Simplified top navigation bar with two core destinations: **Scan Barcode** and **Card List**.
   - Default view displays **all cards unified together**, sorted by type hierarchy: **Animal > Strong > Miracle**, followed by newest entries.
   - Interactive segmented filters (**All Cards**, **🦁 Animal**, **⚡ Strong**, **🌟 Miracle**) and live search bar.

2. **Material 3 Dark Theme Design System:**
   - Sleek dark aesthetic featuring authentic Animal Kaiser category accent palettes:
     - 🔴 **Animal:** Kaiser Red (`#e61919`)
     - 🟢 **Strong:** Kaiser Emerald (`#00cc44`)
     - 🔵 **Miracle:** Cosmic Blue (`#0088ff`)
   - Premium typography using Google Fonts **Public Sans** and open-source **Noto Color Emoji**.

3. **Authentic 1D Visual Barcode Rendering (JsBarcode):**
   - Renders genuine 1D barcode stripes (SVG format) for every card alongside the printed barcode text string, replacing plain text or emojis.

4. **Dynamic Rarity Chips & Supreme Tier:**
   - Color-coded badges tailored to card rarity names (*Normal*, *Bronze Rare*, *Silver Rare*, *Gold Rare*).
   - **Ultra Rare:** Signature **Blue, Purple, and Red** gradient (`linear-gradient`) with subtle shine animation.
   - **Kaiser Rare (New Tier):** Luxurious **Gold, Silver, and Metallic Slate Gray** sheen with animated gleam.

5. **Precise Vertical TCG Card Proportions:**
   - Standard arcade card vertical ratio (~1:1.4) with TCG protective borders, adaptive to 12 cards per page (4 columns × 3 rows).

6. **Image-Based Barcode Scanner on Card Modals:**
   - Dedicated **`[📷 Scan Image]`** tool on Add and Edit Card forms to extract barcodes automatically from photos or screenshots without manual typing.
   - Smart card photo detection: uploading a card image will auto-populate the barcode field if left blank.

7. **Material 3 Floating Toast / Snackbar:**
   - Centered, frosted-glass floating notifications with intelligent status recognition (*amber warning* when Play! emulator is offline, *emerald green* upon successful dispatch, and *crimson red* on errors).

8. **C-Runtime DLL Compatibility & One-Click Executable:**
   - Fixed Windows C-library loading for `pyzbar` (`libiconv.dll`, `libzbar-64.dll`, `msvcr120.dll`) and automated PyInstaller build scripts.

---

## How to Run

### 1. Run Directly from Python Source Code
Double-click `run.bat` or run via terminal:
```bash
pip install -r requirements.txt
python app.py
```
To run purely in web browser mode without the native desktop window:
```bash
python app.py --no-gui
```

---

## Compiling to Standalone `.exe`

You can compile the entire application into a single portable binary `CardCollections.exe`:

1. Double-click **`build.bat`**
2. The script will automatically verify dependencies and compile with PyInstaller
3. The executable output will be located at:
   ```text
   dist/
   └── CardCollections.exe
   ```

> [!NOTE]
> **About `data.json` and `images/` directory:**
> The compiled binary is fully self-contained. The `data.json` database and `images/` folder will be auto-generated automatically when you add your first card through the user interface.

---

## Automated GitHub Releases (CI/CD)

Every **push commit** to the `main` branch automatically triggers GitHub Actions to compile and release the latest Windows binary under the **Releases** tab:
- **`CardCollections.exe`**: Ready-to-use standalone executable for Windows.

---

## License

This project is licensed under the **[MIT License](LICENSE)** &copy; 2026 [maulana-kurniawan](https://github.com/maulana-kurniawan).
