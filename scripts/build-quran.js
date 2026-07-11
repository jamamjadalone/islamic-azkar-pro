#!/usr/bin/env node
// Node.js 18+ required
// Fixed: handles single verse response (json.verse)
// Run: node scripts/build-quran.js

const fs = require('fs');
const path = require('path');

const QURAN_FILE = path.join(__dirname, '..', 'data', 'quran.js');
const QURAN_KAHF_FILE = path.join(__dirname, '..', 'data', 'quran-kahf.js');

// ----------------------------------------------------------------------
// 1. List of Quran passages you need
// ----------------------------------------------------------------------
const PASSAGES = [
  "2:255",         // Ayat Al-Kursi
  "59:22-24",      // Last 3 verses of Al-Hashr
  "1",             // Surah Al-Fatihah
  "18",            // Surah Al-Kahf (lazy-loaded)
  "94",            // Surah Al-Inshirah
  "112",           // Surah Al-Ikhlas
  "113",           // Surah Al-Falaq
  "114",           // Surah An-Nas
];

// ----------------------------------------------------------------------
// 2. Helper: fetch a single verse (key = "2:255")
// ----------------------------------------------------------------------
async function fetchVerseTajweed(key) {
  const url = `https://api.quran.com/api/v4/verses/by_key/${encodeURIComponent(key)}?words=true&word_fields=code_v1`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`API error ${key} (status ${res.status})`);
  const json = await res.json();

  // The API returns either json.verses (array) or json.verse (object)
  let verse;
  if (json.verses && json.verses.length) {
    verse = json.verses[0];
  } else if (json.verse) {
    verse = json.verse;
  }

  if (!verse || !verse.words) {
    throw new Error(`No words found for ${key}. Response: ${JSON.stringify(json).slice(0, 200)}`);
  }

  // Concatenate the code_v1 of each word (these are the <span> tags)
  const html = verse.words.map(w => w.code_v1).join('');
  return html;
}

// ----------------------------------------------------------------------
// 3. Helper: fetch a whole surah (chapterNumber = 1, 18, 94...)
// ----------------------------------------------------------------------
async function fetchSurahTajweed(chapterNumber) {
  let page = 1;
  const perPage = 50;
  let allVerses = [];

  const firstUrl = `https://api.quran.com/api/v4/verses/by_chapter/${chapterNumber}?words=true&word_fields=code_v1&per_page=${perPage}&page=1`;
  let res = await fetch(firstUrl, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to fetch chapter ${chapterNumber}`);
  let json = await res.json();
  allVerses = json.verses;
  const total = json.pagination.total_records;

  while (allVerses.length < total) {
    page++;
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${chapterNumber}?words=true&word_fields=code_v1&per_page=${perPage}&page=${page}`;
    res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    json = await res.json();
    allVerses = allVerses.concat(json.verses);
  }

  allVerses.sort((a, b) => a.verse_number - b.verse_number);
  const html = allVerses.map(verse => verse.words.map(w => w.code_v1).join('')).join('');
  return html;
}

// ----------------------------------------------------------------------
// 4. Helper: fetch a range (e.g. "59:22-24")
// ----------------------------------------------------------------------
async function fetchRangeTajweed(range) {
  const [surahPart, versesPart] = range.split(':');
  const surah = surahPart;
  const [start, end] = versesPart.split('-').map(Number);
  const htmlArr = [];
  for (let v = start; v <= end; v++) {
    const key = `${surah}:${v}`;
    const html = await fetchVerseTajweed(key);
    htmlArr.push(html);
  }
  return htmlArr.join('');
}

// ----------------------------------------------------------------------
// 5. Build the QURAN object and write files
// ----------------------------------------------------------------------
async function buildQuran() {
  const quran = {};
  const kahf = {};

  for (const ref of PASSAGES) {
    console.log(`Fetching ${ref} ...`);
    let html;
    if (/^\d+$/.test(ref)) {
      html = await fetchSurahTajweed(parseInt(ref, 10));
      if (ref === '18') {
        kahf['18'] = html;
        continue;
      }
    } else if (/^\d+:\d+-\d+$/.test(ref)) {
      html = await fetchRangeTajweed(ref);
    } else if (/^\d+:\d+$/.test(ref)) {
      html = await fetchVerseTajweed(ref);
    } else {
      console.warn(`Unrecognised reference: ${ref} – skipping`);
      continue;
    }
    quran[ref] = html;
  }

  // Write data/quran.js
  const quranContent = `
// AUTO-GENERATED – DO NOT EDIT
// Offline tajweed HTML for Azkar app
(function() {
  window.QURAN = ${JSON.stringify(quran, null, 2)};
})();
`.trimStart();
  fs.mkdirSync(path.dirname(QURAN_FILE), { recursive: true });
  fs.writeFileSync(QURAN_FILE, quranContent, 'utf8');
  console.log(`✔ data/quran.js written (${Object.keys(quran).length} passages)`);

  // Write data/quran-kahf.js
  if (Object.keys(kahf).length) {
    const kahfContent = `
// AUTO-GENERATED – DO NOT EDIT
// Surah Al-Kahf – lazy-loaded
(function() {
  if (!window.QURAN) window.QURAN = {};
  window.QURAN['18'] = ${JSON.stringify(kahf['18'])};
})();
`.trimStart();
    fs.writeFileSync(QURAN_KAHF_FILE, kahfContent, 'utf8');
    console.log('✔ data/quran-kahf.js written');
  }

  console.log('✅ Build complete. Deploy the data/ folder alongside your app.');
}

// ----------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------
buildQuran().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});