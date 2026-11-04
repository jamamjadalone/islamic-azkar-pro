# Contributor & Agent Guidelines (Islamic Azkar Pro)

## 1. Communication & Language Protocol
- **Language**: Hamesha **Hinglish** (Urdu in Roman script) ya **English** mein communicate karo.
- **Strict Roman Script Directive**: Chat responses mein **Urdu/Arabic script (عربی/اردو رسم الخط) likhna strictly prohibited hai** — hamesha Roman letters mein likho (e.g. "Kaam mukammal ho gaya hai"). Arabic/Urdu script sirf code files aur app UI data ke andar use hogi.
- **Tone**: Direct, honest, concise, aur practical. Faltu ki lambi chori batein ya "trust me it works" bolna mana hai.

## 2. Memory & Repository Context First
- Kisi bhi change se pehle repository structure, existing code aur manifests check karo. Bina check kiye assume karna ya generic baatein bolna mana hai.

## 3. Execution Discipline: Plan & Verification
- Har task ko clear phases mein execute karo: Analysis -> Targeted Implementation -> Verification.
- Hamesha targeted edits karo; poori file ko bila-wajah rewrite mat karo.
- Verification hamesha empirical proof (code search, syntax validation `node -c sw.js`, browser/file integrity) ke sath karo.

## 4. Permanent UI & Interface Lock (Islamic Azkar Pro)
- **Zero Redesign Directive**: Islamic Azkar Pro ka visual design, layout aur core UI architecture 100% PERMANENTLY LOCKED hai. Koi bhi AI agent ya developer is interface ko alter, shuffle, rewrite ya redesign nahi karega.
- **Strictly Frozen Components**:
  1. Top Bar: Streak badge (`🔥 X دن`), direct sound toggle (`🔔`/`🔇`), glassmorphic zikr selector pill (`[ ☀️ ذکر منتخب کریں ▾ ]`), aur three-dot settings button (`⋮`).
  2. Borderless Dynamic Greeting Tagline: Pure spiritual text without explicit digits or prayer hours.
  3. Luxury Reading Counter: Counter ring with haptic animation, centered clean typography, and dua cards.
  4. Welcome Landing Dashboard: 7-Card welcome grid with Salam and direct guidance.
  5. Completion Screen with restart (`↺ دوبارہ شروع کریں`) and home navigation (`🏠 مرکزی صفحہ`).
  6. Unified Settings Modal with card-based sections (Zoom, Quran font, Audio, Themes, Kahf preferences) and footer (`محفوظ کریں ✓` + `📲 ایپ انسٹال کریں`).
- **Permitted Additions Only**:
  1. Adding new Azkar / Supplications into the catalog.
  2. Adding new settings options inside the existing three-dot settings modal.
  3. Bug fixes, performance optimizations, and offline PWA cache enhancements.

## 5. Sacred Reference Adab & Human Error Disclaimer Protocol
- **Cautious Hadith Attribution (Strict Lock)**: Kisi bhi Hadith ka hawala dete waqt direct/absolute daawa (jaise "رسول اللہ ﷺ نے فرمایا:" ya "نبی کریم نے فرمایا:") likhna strictly mana hai. Hamesha ehtiyat aur adab ke sath **"روایت کے مفہوم کے مطابق..."**, **"حدیث شریف کا مفہوم ہے کہ..."**, ya English mein **"According to the contextual meaning of the narration (Hadith)..."** likha jaye.
- **Noble Quranic Quotation**: Quranic ayats aur hawala ke liye hamesha ba-adab aur mohtaram alfaaz istemal hon: **"ارشادِ باری تعالیٰ ہے — [سورۃ ...: آیت ...]"**, **"فرمانِ حق تعالیٰ ہے..."**, ya English mein **"As declared by Allah the Almighty in the Holy Quran — [Surah ...: Verse ...]"**.
- **Human Error & Tas-heeh Disclaimer**: Humble disclaimer hamesha active rahay: *"تمام تراجم، اعراب اور حوالاجات میں انتہائی احتیاط برتی گئی ہے، تاہم انسان خطا کا پتلا ہے۔ اگر کسی بھی مقام پر تصحیح یا اصلاح درکار ہو تو برائے مہربانی مطلع فرمائیں۔"*

## 6. Zero Third-Party Brand & Trademark Footprint Protocol
- **Absolute Store Safety**: Kisi bhi commercial app, company ya competitor ka trademark/brand name **KABHI BHI** code, UI text, button labels, toasts, dialogs, comments, variables, documentation, guides, ya git commit messages mein hardcode/mention **NAHI** hoga.
- **Mandatory Native Terminology**: Hamesha generic, original, professional aur descriptive technical words use hon (e.g. "Authentic Pakistani Mushaf Standard", "Pakistani Waqf & Ornate Verse Bracket Standard", "Offline Tasbeeh Counter", "Masjid Mode (Silent & Haptic)").

## 7. Quranic Typography & Waqf Preservation Protocol
- **Authentic Pakistani Mushaf Format**: Har ayah ke aakhir par ornate verse bracket ` ﴿${num}﴾` use hoga.
- **Zero Waqf Discard**: Waqf alaamat (waqf jeem `ۚ`, waqf lazim `ۘ`/`ۙ`, waqf mutlaq `ؕ`, etc.) ko regex se strip ya delete nahi karna. Waqf alaamat aakhri lafz ke sath seedhi ornate bracket se pehle attach rahegi (e.g. `رَبِّ الۡعٰلَمِیۡنَ ۙ﴿۱﴾`).
- **Single Verse Marker**: Paragraph mode mein continuous text ke sath sirf ornate bracket aana chahiye; koi duplicate HTML circle badge inject nahi karna.

## 8. Zero Image Dependency & Media Payload Guardrail
- Agent kabhi bhi image files (`.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp`, `.gif`) par `view_file` call nahi karega aur na hi screencap capture karke inspect karega. Image payload se Google API mein `HTTP 400 Bad Request INVALID_MEDIA` crash trigger hota hai.
- Verification hamesha text-based commands aur file existence/size check se hogi.

## 9. PWA Offline-First & Service Worker Rules
- App 100% offline-first hai; zero external runtime APIs ya analytics add karna mana hai.
- Jab bhi static files ya assets (`index.html`, wallpapers, fonts) update hon, `sw.js` mein cache version (e.g. `azk-pro-v...`) bump karna lazmi hai taake client browsers live update detect kar sakein.
