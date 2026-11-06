#!/usr/bin/env node
/* quran/full/tools/tanzil-convert.js
   Tanzil Uthmani text -> quran/full/surah_N.json (114 files) + surahs_meta.json

   Source text: quran-uthmani.txt (Tanzil.net v1.1, Uthmani + pause marks)
   - Ayah-per-line, no numbers. Chunked with canonical ayah counts.
   - Bismillah merge rule: surah 2..114 (except 9) line-1 starts with the
     bismillah phrase -> stripped (reader renders bismillah separately).
   - Surah 1 keeps its bismillah (it IS ayah 1). Surah 9 has none.
   - Validation: total consumed must equal 6236 exactly.
   Usage: node tools/tanzil-convert.js <path-to-quran-uthmani.txt>
*/
const fs = require('fs');
const path = require('path');

const COUNTS = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];

const NAMES_UR = ['الفاتحہ','البقرہ','آل عمران','النساء','المائدہ','الانعام','الاعراف','الانفال','التوبہ','یونس','ہود','یوسف','الرعد','ابراہیم','الحجر','النحل','بنی اسرائیل','الکہف','مریم','طٰہٰ','الانبیاء','الحج','المومنون','النور','الفرقان','الشعراء','النمل','القصص','العنکبوت','الروم','لقمان','السجدہ','الاحزاب','سبا','فاطر','یس','الصافات','ص','الزمر','غافر','حم السجدہ','الشوریٰ','الزخرف','الدخان','الجاثیۃ','الاحقاف','محمد','الفتح','الحجرات','ق','الذاریات','الطور','النجم','القمر','الرحمٰن','الواقعہ','الحدید','المجادلہ','الحشر','الممتحنہ','الصف','الجمعہ','المنافقون','التغابن','الطلاق','التہریم','الملک','القلم','الحاقہ','المعارج','نوح','الجن','المزمل','المدثر','القیامہ','الدھر','المرسلات','النباء','النازعات','عبس','التکویر','الانفطار','المطففین','الانشقاق','البروج','الطارق','الاعلیٰ','الغاشیہ','الفجر','البلد','الشمس','اللیل','الضحیٰ','الشرح','التین','العلق','القدر','البینہ','الزلزال','العادیات','القارعہ','التکاثر','العصر','الہمزہ','الفیل','قریش','الماعون','الکوثر','الکافرون','النصر','المسد','الاخلاص','الفلق','الناس'];
const NAMES_EN = ['Al-Fatihah','Al-Baqarah','Ali Imran','An-Nisa','Al-Maidah','Al-Anam','Al-Araf','Al-Anfal','At-Tawbah','Yunus','Hud','Yusuf','Ar-Rad','Ibrahim','Al-Hijr','An-Nahl','Bani Israil','Al-Kahf','Maryam','Taha','Al-Anbiya','Al-Hajj','Al-Muminun','An-Nur','Al-Furqan','Ash-Shuara','An-Naml','Al-Qasas','Al-Ankabut','Ar-Rum','Luqman','As-Sajdah','Al-Ahzab','Saba','Fatir','Yaseen','As-Saffat','Sad','Az-Zumar','Ghafir','Ham Sajdah','Ash-Shura','Az-Zukhruf','Ad-Dukhan','Al-Jathiyah','Al-Ahqaf','Muhammad','Al-Fath','Al-Hujurat','Qaf','Adh-Dhariyat','At-Tur','An-Najm','Al-Qamar','Ar-Rahman','Al-Waqiah','Al-Hadid','Al-Mujadilah','Al-Hashr','Al-Mumtahanah','As-Saff','Al-Jummah','Al-Munafiqun','At-Taghabun','At-Talaq','At-Tahrim','Al-Mulk','Al-Qalam','Al-Haqqah','Al-Maarij','Nuh','Al-Jinn','Al-Muzzammil','Al-Muddaththir','Al-Qiyamah','Ad-Dahr','Al-Mursalat','An-Naba','An-Naziat','Abasa','At-Takwir','Al-Infitar','Al-Mutaffifin','Al-Inshiqaq','Al-Buruj','At-Tariq','Al-Ala','Al-Ghashiyah','Al-Fajr','Al-Balad','Ash-Shams','Al-Layl','Ad-Duha','Ash-Sharh','At-Tin','Al-Alaq','Al-Qadr','Al-Bayyinah','Az-Zalzalah','Al-Adiyat','Al-Qariah','At-Takathur','Al-Asr','Al-Humazah','Al-Fil','Quraysh','Al-Maun','Al-Kawthar','Al-Kafirun','An-Nasr','Al-Masad','Al-Ikhlas','Al-Falaq','An-Nas'];
const NAMES_AR = ['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','بني إسرائيل','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','حم السجدة','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الدهر','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزال','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];

const bare = s => s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u2060\u200c\u200d]/g, '').replace(/[\u0671ٱ\u0622أإآ]/g, 'ا').replace(/\s+/g, ' ').trim();
const BIS_BARE = ['بِسۡمِ','ٱللَّهِ','ٱلرَّحۡمَـٰنِ','ٱلرَّحِیمِ'].map(bare);
function stripLeadingBismillah(line){
  const words = line.split(/\s+/);
  if(words.length > 4 && words.slice(0, 4).map(bare).join(' ') === BIS_BARE.join(' ')){
    return words.slice(4).join(' ');
  }
  return line;
}
function cleanForSearch(text){
  // tashkeel-free alif/ya/ta-normalized copy (search index use)
  return bare(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ىۍی]/g, 'ي')
    .replace(/ة/g, 'ه')
    .toLowerCase();
}

function main(){
  const src = process.argv[2];
  if(!src || !fs.existsSync(src)){ console.error('Usage: node tanzil-convert.js <quran-uthmani.txt>'); process.exit(1); }
  const outDir = path.join(__dirname, '..');
  fs.mkdirSync(outDir, { recursive: true });
  const lines = fs.readFileSync(src, 'utf8').split(/\r?\n/).filter(Boolean);
  if(lines.length !== 6236){ throw new Error('Expected 6236 ayah lines, got ' + lines.length); }

  const starts = [0];
  for(let i = 1; i < 114; i++) starts.push(starts[i-1] + COUNTS[i-1]);
  if(starts[113] + COUNTS[113] !== 6236){ throw new Error('Canonical chunk math does not reach 6236'); }

  const meta = [];
  let total = 0, bismillahStripped = 0;
  for(let s = 1; s <= 114; s++){
    const chunk = lines.slice(starts[s-1], starts[s-1] + COUNTS[s-1]);
    if(chunk.length !== COUNTS[s-1]) throw new Error('Surah ' + s + ' chunk mismatch');
    const ayahs = chunk.map((raw, i) => {
      let t = raw;
      if(s > 1 && s !== 9 && i === 0){ t = stripLeadingBismillah(raw); if(t !== raw) bismillahStripped++; }
      return { n: i + 1, t: t, tc: cleanForSearch(t) };
    });
    total += ayahs.length;
    const file = path.join(outDir, 'surah_' + s + '.json');
    fs.writeFileSync(file, JSON.stringify({ surah: s, ayahs: ayahs }, null, 1), 'utf8');
    meta.push({ id: s, ayahs: ayahs.length, ur: 'سورۃ ' + NAMES_UR[s-1], en: NAMES_EN[s-1], ar: NAMES_AR[s-1] });
  }
  if(total !== 6236){ throw new Error('Total ayahs ' + total + ' != 6236'); }
  // an-naml 30 internal bismillah must survive (mushaf text)
  const naml = JSON.parse(fs.readFileSync(path.join(outDir, 'surah_27.json'), 'utf8'));
  if(!bare(naml.ayahs[29].t).match('بسم الله الرحمن الرحیم')) throw new Error('An-Naml 30 internal bismillah lost');
  // surah 1 must keep its bismillah as ayah 1
  const fatihah = JSON.parse(fs.readFileSync(path.join(outDir, 'surah_1.json'), 'utf8'));
  if(bare(fatihah.ayahs[0].t).startsWith('بسم')) { /* kept */ } else throw new Error('Fatihah 1 bismillah lost');
  if(bare(fatihah.ayahs[0].t) === 'بسم الله الرحمن الرحیم' && fatihah.ayahs.length !== 7){ throw new Error('Fatihah structure wrong'); }

  fs.writeFileSync(path.join(outDir, 'surahs_meta.json'), JSON.stringify({ version: 'tanzil-1.1-uthmani', totalAyahs: 6236, surahs: meta }, null, 1), 'utf8');
  console.log('OK: 114 surah files + surahs_meta.json written. totalAyahs=' + total + ' bismillahStripped=' + bismillahStripped + '/113 (expected 112 surahs 2..114 minus Tawbah = 112, minus those where ayah-1 empty = n/a)');
}
main();
