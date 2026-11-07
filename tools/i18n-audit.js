/* ═══════════════════════════════════════════════════════════════
   i18n-audit.js — Islamic Azkar Pro language coverage report (p19-a)
   Reads index.html, extracts real JS objects (brace-balanced + vm sandbox),
   reports:
   - I18N flat per-language key coverage (ur/en/ar/id/tr/fr)
   - SECTION_I18N nested sub-dict completeness per language
   - Urdu-only content zones (zikr catalogs) — true item counts
   - Fazeelat (surahs_26.json intros) language status
   Usage: node tools/i18n-audit.js
   ═══════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const LANGS = ['ur', 'en', 'ar', 'id', 'tr', 'fr'];

/* Extract `const NAME = [ { ... } ]` or `{ ... }` balanced block, return inner text */
function extract(name){
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*([\\[{])');
  const m = re.exec(html);
  if(!m) return null;
  const openCh = m[1];
  const closeCh = openCh === '[' ? ']' : '}';
  let depth = 0, inS = null;
  for(let i = m.index + m[0].length - 1; i < html.length; i++){
    const c = html[i], prev = html[i - 1];
    if(inS){
      if(c === '\\') { i++; continue; }
      if(inS === c) inS = null;
      continue;
    }
    if(c === '`' || c === "'" || c === '"'){ inS = c; continue; }
    if(c === openCh) depth++;
    else if(c === closeCh){
      depth--;
      if(depth === 0) return html.slice(m.index + m[0].length - 1, i + 1);
    }
  }
  return null;
}
function evalSrc(src){
  /* own-source literal, sandboxed (no globals, no require) */
  return vm.runInNewContext('(' + src + ')', Object.create(null), { timeout: 2000 });
}

/* ── 1) I18N flat dictionary ── */
let total = 0;
const miss = Object.fromEntries(LANGS.map(l => [l, []]));
const src1 = extract('I18N');
if(src1){
  const obj = evalSrc(src1);
  const keys = Object.keys(obj);
  console.log('\n== I18N: ' + keys.length + ' keys ==');
  for(const k of keys){
    total++;
    for(const l of LANGS){
      if(!obj[k] || !obj[k][l]) miss[l].push('I18N.' + k);
    }
  }
} else console.log('!! I18N not found');

/* ── 2) SECTION_I18N nested (top-key = {badge:{ur..},name:{ur..},...}) ── */
const src2 = extract('SECTION_I18N');
if(src2){
  const obj = evalSrc(src2);
  const keys = Object.keys(obj);
  console.log('\n== SECTION_I18N: ' + keys.length + ' top keys (nested sub-dicts) ==');
  // SECTION_I18N top-keys are NOT counted as single flat keys — each top key
  // is complete iff every sub-dict carries every language
  for(const k of keys){
    const subs = obj[k];
    if(typeof subs !== 'object' || !subs) continue;
    const subNames = Object.keys(subs).filter(s => typeof subs[s] === 'object' && subs[s]);
    if(!subNames.length) continue; // plain string — skip
    const subTotal = subNames.length;
    for(const l of LANGS){
      const have = subNames.filter(s => subs[s] && subs[s][l]).length;
      if(have < subTotal) miss[l].push('SECTION_I18N.' + k + ' (' + have + '/' + subTotal + ' subs)');
    }
    total += subTotal;
  }
} else console.log('!! SECTION_I18N not found');

console.log('\n== TOTAL UI keys: ' + total + ' ==');
for(const l of LANGS){
  const have = total - miss[l].length;
  console.log('  ' + l.toUpperCase() + ': ' + have + '/' + total + ' (' + (100 * have / total).toFixed(1) + '%)' +
    (miss[l].length ?
      '\n     missing: ' + miss[l].join(', ') :
      '\n     complete: true'));
}

/* ── 3) Urdu-only content zones (zikr catalogs) ── */
const zones = ['FAJR', 'JUMMA', 'DUROOD_PAK', 'TAUHEED', 'BEDTIME', 'TAWBAH', 'POST_SALAH', 'MORNING_WAKE', 'RELIEF_DEBT', 'ISTIKHARA', 'RABBANA'];
console.log('\n== Zikr catalogs (meaning fields grp/name + vetted ref) ==');
let zTotal = 0, uTotal = 0;
for(const z of zones){
  const src = extract(z);
  if(!src){ console.log('  ' + z + ': NOT FOUND'); continue; }
  let arr;
  try{ arr = evalSrc(src); }
  catch(e){ console.log('  ' + z + ': eval failed — ' + e.message); continue; }
  const n = Array.isArray(arr) ? arr.length : 0;
  if(!n){ console.log('  ' + z + ': empty'); continue; }
  const first = arr[0] || {};
  const fields = Object.keys(first).join(',');
  const hasLoc = arr.some(it => it && (it.grp && typeof it.grp === 'object' || it.name && typeof it.name === 'object'));
  const hasRef = arr.some(it => it && it.ref);
  zTotal += n;
  if(!hasLoc) uTotal += n;
  console.log('  ' + z + ': ' + n + ' items [' + fields + ']' +
    (hasLoc ? '  (per-lang labels present)' : '  (Urdu-only meanings)') +
    (hasRef ? '  ref:yes' : ''));
}
console.log('  TOTAL zikr items: ' + zTotal + ' | Urdu-only meaning items: ' + uTotal);

/* ── 4) Fazeelat (surahs_26.json) ── */
try{
  const s26 = JSON.parse(fs.readFileSync(path.join(ROOT, 'quran', 'surahs_26.json'), 'utf8'));
  const rows = Array.isArray(s26) ? s26 : (s26.surahs || []);
  const withIntro = rows.filter(r => r && (r.intro || r.faz)).length;
  console.log('\n== Fazeelat: ' + withIntro + '/' + rows.length + ' surah rows carry intro/faz text (Urdu-only) ==');
}catch(e){ console.log('\n== Fazeelat check failed: ' + e.message + ' =='); }

/* ── 5) p19-b auto-detect wiring sanity ── */
const wired = /function p19DetectLang\(/.test(html) && /else S\.lang = p19DetectLang\(\)/.test(html);
console.log('\n== p19-b auto-detect in index.html: ' + (wired ? 'WIRED: yes' : 'WIRED: NO — not applied yet') + ' ==');
