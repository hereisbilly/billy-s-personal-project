// download_assets.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// ===================================================================
// ==  PASTE PAKET ASET ANDA DI SINI  ===============================
// ===================================================================

const assetsToDownload = [// Paste ini ke dalam variabel assetsToDownload di file download_assets.js

[
  // Images
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/e693156637e108bf890b0e527d983422_generated.jpeg', path: 'public/images/m3-intro.jpeg' },
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/261e05d0e2e5883d2c88d8b1e5233146_generated.jpeg', path: 'public/images/m3-quiz-watched.jpeg' },
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/b94857b24349c25f7789139854ef20f4_generated.jpeg', path: 'public/images/m3-quiz-played.jpeg' },
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/631742de87834570076269b9fc1a1795_generated.jpeg', path: 'public/images/m3-quiz-went.jpeg' },
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/f08f97e682d23c316bb497e20b601614_generated.jpeg', path: 'public/images/m3-quiz-ate.jpeg' },
  { url: 'https://storage.googleapis.com/gemini-prod-us-west1-assets/9fdc42171c66f97f744e87d159be432e_generated.jpeg', path: 'public/images/m3-finish.jpeg' },
  // Audio
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/4686411130d7b2cc8e2ac04e9c70034a_1.mp3', path: 'public/audio/m3-watched-movie.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/3c7b8d002f23b7301c2331562b325257_1.mp3', path: 'public/audio/m3-played-games.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/e60a316b8d963f2563f6305a4630a916_1.mp3', path: 'public/audio/m3-she-went.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/1990176d7f3bf6a8bb6d92f750d75f28_1.mp3', path: 'public/audio/m3-they-ate.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/a2920f01a88b50284f23b6c23a63f5d5_1.mp3', path: 'public/audio/m3-i-watched-tv.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/06182c1630132338f902640283c713b1_1.mp3', path: 'public/audio/m3-he-played-football.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/d9614c77609a6358c5c721b068305f2c_1.mp3', path: 'public/audio/m3-she-went-to-the-beach.mp3' },
  { url: 'https://storage.googleapis.com/gweb-browser-tts/en_us/5e730a08e684070a253018e698188173_1.mp3', path: 'public/audio/m3-they-ate-pizza.mp3' },
]
  // Contoh: { url: 'URL_GAMBAR_DARI_SAYA', path: 'public/images/namafile.jpeg' }
  // (Biarkan kosong untuk sekarang)
];

// ===================================================================
// ==  TIDAK PERLU MENGUBAH KODE DI BAWAH INI  ========================
// ===================================================================

async function downloadAsset(url, filepath) {
  const dir = path.dirname(filepath);
  // Buat folder jika belum ada
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Downloading ${path.basename(filepath)}...`);
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`\x1b[31mError downloading ${url}: ${error.message}\x1b[0m`);
  }
}

async function main() {
  if (assetsToDownload.length === 0) {
    console.log('\x1b[33mTidak ada aset untuk di-download. Silakan paste "Paket Aset" ke dalam variabel assetsToDownload.\x1b[0m');
    return;
  }
  console.log(`Starting download of ${assetsToDownload.length} assets...`);

  const downloadPromises = assetsToDownload.map(asset => downloadAsset(asset.url, asset.path));

  await Promise.all(downloadPromises);

  console.log('\x1b[32m\n✅ All assets downloaded successfully!\x1b[0m');
}

main();