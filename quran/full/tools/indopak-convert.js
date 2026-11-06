/* ═══════════════════════════════════════════════════════════════
   IndoPak v9.6 Madinah Converter — Pakistani Mushaf per-surah JSONs
   Source: QuranWBW team (marwan/indopak-quran-text @739f6e7)
   Manually & digitally verified vs KFGQPC Nastaleeq Mushaf v10.0
   License: free to distribute WITH credits (see CREDITS-indopak.md)
   Output: quran/full/surah_<N>_ip.json  {surah, ayahs:[{n, t}]}
   Rules asserted:
   - exactly 6236 ayahs, 114 surahs, sequential ayah numbers
   - Tawbah (9): first ayah does NOT start with bismillah
   - Fatihah (1): ayah-1 IS the bismillah
   - An-Naml (27): internal bismillah preserved inside ayah-30
   - PUA ayah icons (U+F500+) stripped — app renders own ornate numbers
   - waqf marks PRESERVED (rule 5: never strip pause symbols)
   ═══════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const SRC = 'C:/Users/AS/AppData/Local/Temp/opencode/indopak/indopak_madinah_ayah.txt';
const DEST = 'C:/Users/AS/Documents/antigravity/radiant-darwin/quran/full';
const FONT_SRC = 'C:/Users/AS/AppData/Local/Temp/opencode/indopak/';
const FONT_DEST = 'C:/Users/AS/Documents/antigravity/radiant-darwin/fonts';

const txt = fs.readFileSync(SRC, 'utf8');
const rows = txt.split('\n')
  .filter(l => /^\d+:\d+\t/.test(l))
  .map(l => { const [ref, t] = l.split('\t'); const [s, a] = ref.split(':').map(Number); return { s, a, t: t.trim() }; });

// ── asserts:ush asal holy text integrity ──
if(rows.length !== 6236){ console.error('FAIL: rows ' + rows.length); process.exit(1); }
const EXP = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
const byS = {};
for(const r of rows){ (byS[r.s] = byS[r.s] || []).push(r); }
for(let s = 1; s <= 114; s++){
  const list = byS[s];
  if(!list || list.length !== EXP[s-1]){ console.error('FAIL: surah ' + s + ' count ' + (list ? list.length : 0) + ' expected ' + EXP[s-1]); process.exit(1); }
  if(list.some((r, i) => r.a !== i + 1)){ console.error('FAIL: surah ' + s + ' ayah seq'); process.exit(1); }
}
// bismillah mushaf rules
// bismillah mushaf rules — letters-only skeleton
const LETTER_KEEP = /[\u0621-\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647-\u064A\u066E\u066F\u0671-\u06D3]/g;
const bismLab = (t) => (t.match(LETTER_KEEP) || []).join('').slice(0, 4);
if(bismLab(byS[9][0].t) === 'بسم' || bismLab(byS[9][0].t).startsWith('بسم')){ console.error('FAIL: Tawbah starts with bismillah (' + bismLab(byS[9][0].t) + ')'); process.exit(1); }
if(bismLab(byS[1][0].t) !== 'بسم' && !bismLab(byS[1][0].t).startsWith('بسم')){ console.error('FAIL: Fatihah ayah-1 not bismillah: ' + bismLab(byS[1][0].t) + ' | ' + JSON.stringify(byS[1][0].t.slice(0, 30))); process.exit(1); }
const namlLab = (byS[27][29].t.match(LETTER_KEEP) || []).join('');
if(namlLab.indexOf('بسم') === -1){ console.error('FAIL: Naml 27:30 internal bismillah missing'); process.exit(1); }
function stripIcons(t){ return t.replace(/[\uF500-\uFFFD]/g, ''); }

// ── write per-surah files ──
let written = 0, sizeTotal = 0;
for(let s = 1; s <= 114; s++){
  const data = { surah: s, ayahs: byS[s].map(r => ({ n: r.a, t: stripIcons(r.t).replace(/\s+/g, ' ').trim() })) };
  const out = JSON.stringify(data);
  sizeTotal += out.length;
  fs.writeFileSync(path.join(DEST, 'surah_' + s + '_ip.json'), out);
  written++;
}
console.log('written ' + written + ' files, total ' + (sizeTotal / 1024 / 1024).toFixed(2) + ' MB');
console.log('sanity: surah_1 a1 = ' + JSON.stringify(byS[1][0].t.slice(0, 50)));
console.log('sanity: surah_2 a255 = ' + JSON.stringify(stripIcons(byS[2][254].t).slice(0, 50)));
console.log('sanity: surah_9 a1 = ' + JSON.stringify(stripIcons(byS[9][0].t).slice(0, 50)));

// ── fonts copy (woff2 + woff fallback, normal spacing + WL indicator) ──
const cp = (from, to) => { try{ fs.copyFileSync(FONT_SRC + from, path.join(FONT_DEST, to)); console.log('font: ' + to); }catch(e){ console.log('FONT CP FAIL ' + from + ' ' + String(e).slice(0, 60)); } };
cp('indopak-wl-normal.woff2', 'indopak-woff2.woff2');
cp('indopak-wl-normal.woff', 'indopak-woff.woff');
fs.writeFileSync(path.join(DEST, 'CREDITS-indopak.md'), `# IndoPak (Pakistani Mushaf) Text Credits

IndoPak Nastaleeq Quran text (v9.6 - Madinah edition, Ayah by Ayah):

Made by Ayman Siddiqui and R. Siddiqua for www.QuranWBW.com and
www.Quran.com for Sadaqa-e-Jaria purposes only.

- Manually and digitally verified word-to-word against King Fahad
  Glorious Quran Printing Complex (KFGQPC) Nastaleeq Mushaf v10.0
- Source repo: github.com/marwan/indopak-quran-text
- Font used in this app: AlQuran-IndoPak-by-QuranWBW v4.2.2
  ( NORMAL spacing, with Waqf-lazim indicator )

Used here with proper credits as required by the author license.
NOT manipulated, NOT sold, NOT stripped of credits.
`);
console.log('CREDITS written');
