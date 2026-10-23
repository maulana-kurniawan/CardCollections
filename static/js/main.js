// Card Collections Main Client JS

document.addEventListener('DOMContentLoaded', () => {
    initEmulatorStatusChecker();
    initCameraScanner();
    initDropzone();
    initManualBarcodeForm();
    renderVisualBarcodes();
});

// Global Toast Notification Helper (Material 3)
let toastTimeout = null;

function showToast(message, type = 'auto') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    // Support legacy boolean argument (isError)
    if (type === true) type = 'error';
    if (type === false) type = 'auto';

    // Auto-detect message severity if type is 'auto'
    const lower = String(message).toLowerCase();
    if (type === 'auto') {
        if (lower.includes('offline') || lower.includes('tidak terdeteksi') || lower.includes('not detected') || lower.includes('tetapi i/o')) {
            type = 'warning';
        } else if (lower.includes('gagal') || lower.includes('error') || lower.includes('tidak ada') || lower.includes('failed')) {
            type = 'error';
        } else if (lower.includes('berhasil') || lower.includes('successfully') || lower.includes('selesai') || lower.includes('terkirim') || lower.includes('terdeteksi')) {
            type = 'success';
        } else {
            type = 'info';
        }
    }

    let icon = '⚡';
    if (type === 'success') icon = '✅';
    else if (type === 'warning') icon = '⚠️';
    else if (type === 'error') icon = '❌';
    else if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
        <span class="m3-toast-icon noto-emoji">${icon}</span>
        <span class="m3-toast-text">${message}</span>
        <button type="button" class="m3-toast-close" onclick="hideToast()" aria-label="Tutup">✕</button>
    `;

    toast.className = `m3-snackbar toast show ${type}`;

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        hideToast();
    }, 4500);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.remove('show');
}

// Scan Barcode from Image File (for Add/Edit Card Modal)
function scanBarcodeForInput(fileInput, targetInputId) {
    if (!fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    showToast('Memindai barcode dari gambar...', 'info');

    const formData = new FormData();
    formData.append('image', file);

    fetch('/scan-barcode-image', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.barcode) {
            const target = document.getElementById(targetInputId);
            if (target) {
                target.value = data.barcode;
                target.focus();
            }
            showToast('Barcode berhasil terdeteksi: [' + data.barcode + ']', 'success');
        } else {
            showToast(data.message || 'Tidak ada barcode yang terdeteksi pada gambar.', 'warning');
        }
    })
    .catch(err => {
        showToast('Gagal memproses gambar: ' + (err.message || err), 'error');
    })
    .finally(() => {
        fileInput.value = '';
    });
}

// Auto-scan barcode when picking card photo if barcode field is empty
function autoScanFromCardPhoto(fileInput, targetInputId) {
    if (!fileInput.files || fileInput.files.length === 0) return;
    const target = document.getElementById(targetInputId);
    if (target && target.value.trim() !== '') return; // Don't overwrite existing barcode

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/scan-barcode-image', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.barcode) {
            if (target) {
                target.value = data.barcode;
            }
            showToast('Barcode otomatis terbaca dari foto kartu: [' + data.barcode + ']', 'success');
        }
    })
    .catch(() => {});
}

// 1. Emulator Status Checker
function checkEmulatorStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusLabel = document.getElementById('statusLabel');
    if (!statusDot || !statusLabel) return;

    statusLabel.textContent = 'Mengecek...';
    fetch('/test-connect', { method: 'POST' })
        .then(res => res.text())
        .then(text => {
            if (text.includes('Active')) {
                statusDot.className = 'status-dot online';
                statusLabel.textContent = 'Play! Aktif';
            } else {
                statusDot.className = 'status-dot offline';
                statusLabel.textContent = 'Play! Offline';
            }
        })
        .catch(() => {
            statusDot.className = 'status-dot offline';
            statusLabel.textContent = 'Play! Offline';
        });
}

function initEmulatorStatusChecker() {
    checkEmulatorStatus();
    const btn = document.getElementById('btnCheckStatus');
    if (btn) btn.addEventListener('click', checkEmulatorStatus);
    // Poll every 15s
    setInterval(checkEmulatorStatus, 15000);
}

// 2. Camera Scanner
let videoStream = null;
let scanningInterval = null;

function initCameraScanner() {
    const btnStart = document.getElementById('btnStartCamera');
    const btnStop = document.getElementById('btnStopCamera');
    const video = document.getElementById('cameraVideo');
    const overlay = document.getElementById('scanOverlay');
    const placeholder = document.getElementById('cameraPlaceholder');

    if (!btnStart || !video) return;

    btnStart.addEventListener('click', async () => {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            video.srcObject = videoStream;
            video.play();
            btnStart.style.display = 'none';
            btnStop.style.display = 'inline-flex';
            if (overlay) overlay.classList.add('active');
            if (placeholder) placeholder.style.display = 'none';

            // Start capture frames & post to /barcode
            startFrameScanning(video);
        } catch (err) {
            console.error('Camera access error:', err);
            showToast('Tidak dapat mengakses kamera: ' + err.message, true);
        }
    });

    if (btnStop) {
        btnStop.addEventListener('click', () => {
            stopCamera();
        });
    }
}

function stopCamera() {
    const btnStart = document.getElementById('btnStartCamera');
    const btnStop = document.getElementById('btnStopCamera');
    const video = document.getElementById('cameraVideo');
    const overlay = document.getElementById('scanOverlay');
    const placeholder = document.getElementById('cameraPlaceholder');

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }
    if (scanningInterval) {
        clearInterval(scanningInterval);
        scanningInterval = null;
    }
    if (video) video.srcObject = null;
    if (btnStart) btnStart.style.display = 'inline-flex';
    if (btnStop) btnStop.style.display = 'none';
    if (overlay) overlay.classList.remove('active');
    if (placeholder) placeholder.style.display = 'flex';
}

function startFrameScanning(video) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let isProcessing = false;

    scanningInterval = setInterval(() => {
        if (isProcessing || !video.videoWidth) return;
        isProcessing = true;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            if (!blob) {
                isProcessing = false;
                return;
            }
            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');

            fetch('/barcode', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(barcode => {
                isProcessing = false;
                if (barcode && barcode.trim() !== '') {
                    showToast('Barcode Terdeteksi: ' + barcode);
                    sendCardBarcode(barcode.trim(), 'Kartu Kamera');
                    // Brief pause to avoid duplicate scans
                    stopCamera();
                }
            })
            .catch(() => {
                isProcessing = false;
            });
        }, 'image/jpeg', 0.85);
    }, 1200);
}

// 3. Dropzone & File Input
function initDropzone() {
    const fileInput = document.getElementById('fileInput');
    const dropzone = document.getElementById('dropzone');

    if (!fileInput || !dropzone) return;

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFileUpload(fileInput.files[0]);
        }
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
}

function handleFileUpload(file) {
    showToast('Memindai barcode dari gambar...');
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(result => {
        showToast(result);
    })
    .catch(err => {
        showToast('Gagal memproses gambar: ' + err, true);
    });
}

// 4. Manual Barcode Form
function initManualBarcodeForm() {
    const form = document.getElementById('manualBarcodeForm');
    const input = document.getElementById('barcodeInput');
    if (!form || !input) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const barcode = input.value.trim();
        if (!barcode) return;
        sendCardBarcode(barcode, 'Manual');
    });
}

// 5. Send Barcode directly to Play! Emulator
function sendCardBarcode(barcode, cardName = 'Kartu') {
    showToast('Mengirim ' + barcode + ' ke emulator...');
    const formData = new FormData();
    formData.append('barcode', barcode);

    fetch('/send-barcode', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(resText => {
        showToast(resText);
    })
    .catch(err => {
        showToast('Koneksi emulator gagal: ' + err, true);
    });
}

// 6. Modal Functions (Add / Edit / Delete)
function openAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.add('active');
}

function closeAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.classList.remove('active');
}

function openEditModal(cardId) {
    const modal = document.getElementById('editModal');
    if (!modal) return;

    fetch('/baca/' + cardId, { method: 'POST' })
        .then(res => res.json())
        .then(card => {
            document.getElementById('editId').value = card.id;
            document.getElementById('editNama').value = card.nama;
            document.getElementById('editRarity').value = card.rarity;
            document.getElementById('editBarcode').value = card.barcode;
            modal.classList.add('active');
        })
        .catch(err => {
            showToast('Gagal memuat detail kartu: ' + err, true);
        });
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('active');
}

function confirmDeleteCard(cardId, cardName) {
    if (confirm('Apakah Anda yakin ingin menghapus kartu "' + cardName + '"?')) {
        fetch('/hapus/' + cardId, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                showToast(data.message || 'Kartu berhasil dihapus');
                const cardEl = document.getElementById('card-' + cardId);
                if (cardEl) cardEl.remove();
            })
            .catch(err => {
                showToast('Gagal menghapus kartu: ' + err, true);
            });
    }
}

// 7. Render Real 1D Visual Barcodes via JsBarcode
function renderVisualBarcodes() {
    if (typeof JsBarcode === 'undefined') {
        console.warn('JsBarcode library not loaded yet.');
        return;
    }
    const elements = document.querySelectorAll('.barcode-svg');
    elements.forEach(svg => {
        const rawCode = svg.getAttribute('data-barcode');
        if (!rawCode || !rawCode.trim()) return;

        const code = rawCode.trim();
        try {
            JsBarcode(svg, code, {
                format: "CODE128",
                width: 1.3,
                height: 32,
                displayValue: false, // Text is rendered cleanly underneath
                margin: 0,
                background: "transparent",
                lineColor: "#f8fafc",
                valid: function (valid) {
                    if (!valid) {
                        fallbackBarcode(svg, code);
                    }
                }
            });
        } catch (err) {
            fallbackBarcode(svg, code);
        }
    });
}

function fallbackBarcode(svg, code) {
    try {
        // Fallback: strip any non-standard symbols and render Code 128
        const cleanCode = code.replace(/[^A-Za-z0-9\-\.\s]/g, '') || '1001-AK-001';
        JsBarcode(svg, cleanCode, {
            format: "CODE128",
            width: 1.4,
            height: 38,
            displayValue: false,
            margin: 0,
            background: "transparent",
            lineColor: "#f8fafc"
        });
    } catch (e) {
        console.error('Failed to render barcode:', e);
    }
}
