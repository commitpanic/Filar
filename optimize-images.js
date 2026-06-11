const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, 'assets', 'images');
const outputDir = path.join(__dirname, 'assets', 'images', 'optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Max width for photos – 1920px for hero/full-width, 800px for smaller ones
const imageConfigs = {
  'DSC05196.jpg':            { width: 1920 },
  'DSC05219.jpg':            { width: 1920 },
  'DSC05232.jpg':            { width: 1920 },
  'DSC05245.jpg':            { width: 1920 },
  'DSC05252.jpg':            { width: 1920 },
  'DSC05307.jpg':            { width: 1920 },
  'DSC05362.jpg':            { width: 1920 },
  'DSC05385.jpg':            { width: 1920 },
  'DSC05395.jpg':            { width: 1920 },
  'DSC05408.jpg':            { width: 1920 },
  'DSC05467.jpg':            { width: 1920 },
  'Alicja_Sienkiewicz.jpg':  { width: 800 },
  'Malwina_Migacz.jpg':      { width: 800 },
  'o_nas.jpg':               { width: 1920 },
  'zespół_filar_w_pracy.jpg':{ width: 1920 },
};

// Small service images – leave as-is (already ~50 KB)
const skipFiles = new Set([
  'service-firmy.jpg',
  'service-gotowkowe.jpg',
  'service-hipoteczne.jpg',
  'service-ubezpieczenia.jpg',
]);

async function optimize() {
  for (const file of fs.readdirSync(inputDir)) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
    if (skipFiles.has(file)) {
      fs.copyFileSync(path.join(inputDir, file), path.join(outputDir, file));
      console.log(`Copied (small): ${file}`);
      continue;
    }

    const config = imageConfigs[file] || { width: 1920 };
    const input  = path.join(inputDir, file);
    const output = path.join(outputDir, file);

    try {
      const info = await sharp(input)
        .resize({ width: config.width, withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(output);

      const origKB = Math.round(fs.statSync(input).size / 1024);
      const newKB  = Math.round(info.size / 1024);
      const pct    = Math.round((1 - newKB / origKB) * 100);
      console.log(`${file}: ${origKB} KB → ${newKB} KB  (-${pct}%)`);
    } catch (e) {
      console.error(`ERROR ${file}: ${e.message}`);
    }
  }

  console.log('\nDone! Optimized images saved to assets/images/optimized/');
}

optimize();
