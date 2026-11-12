# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Content Series (2026-11-12) — per-language meanings wiring

- `content/asma-mas-i18n-wiring-v1`: meaning resolvers for both name lists now check per-language packs (id/tr/fr/bn/ru/fa) before the EN fallback — groundwork for completing the remaining 9 meaning dicts (Allah's 99: bn/ru/fa; Prophet's 99: id/tr/fr/bn/ru/fa)
- First language pack merged: Indonesian meanings for Asma-e-Muhammadiyah names 1–10 (`ASMA_MAS_ID`); more languages to follow

### Content Series (2026-11-12) — Asma-e-Muhammadiyah expanded 27 → 99

- `asma/names-saw-99-v1`: the Names of the Prophet ﷺ section now carries the full 99-name devotional compilation — existing 27 verified entries preserved verbatim, 72 curated additions in three reference tiers: Quranic citations (e.g. 9:128, 35:23, 5:15, 22:75), contextual narration phrasing (Rule 12: روایت کے مفہوم کے مطابق), and the well-known Asma-e-Muhammadiyah compilation
- English meanings extended to all 99 names (`ASMA_MAS_EN`); dashboard tile counts updated to 99 in all 9 languages; JSON-LD featureList updated
- sw.js cache bump: `azk-pro-v95-icons` → `azk-pro-v96-asma-saw-99` (Rule 7)
- README minis (7 languages) + main README feature list updated to the 99-name phrasing

### SEO Series (2026-11-10) — repo reach & multi-language discoverability

- `seo/sitemap-hreflang-v1`: sitemap.xml expanded to 10 URLs with xhtml:link hreflang alternates (9 languages + x-default), fresh lastmod
- `seo/readmes-multilingual-v1`: 7 native-language README minis (ar/bn/fa/fr/id/ru/tr) + main README language switcher
- `seo/head-metadata-v1`: JSON-LD inLanguage all 9 languages, featureList + 9 p21 pack entries, og:locale:alternate x8, og:image dims/alt, twitter:image:alt (head-only; SW v94)
- GitHub polish: About description, 20 topics (misleading qibla-compass topic removed), 9 GitHub Releases for p21 content tags
- `repo/r1-rules-v1` … `repo/i18n-inventory-v1`: repo organization (rules 8–15, tools/ + data/source-packs/ cleaner layout, beginner docs map)

### Repo Hygiene Series (2026-11-11/12) — organization, credits, contributor docs

- `repo/credits-contribution-v1`: full third-party attribution — `CREDITS.md` hub, `fonts/FONT-CREDITS.md` (6 TTFs + 2 woff, embedded name-table facts), `quran/full/CREDITS-tanzil.md`; README Credits section; CONTRIBUTING with test gates
- `repo/r16-scope-lock-v1`: AGENTS.md Rule 16 — agent works on the PWA only; android/ and other owner WIP never touched
- `repo/i1-icons-dedup-v1`: 3 byte-identical duplicate icon PNGs removed, sw.js precache synced + cache `azk-pro-v95-icons`, README icon refs updated (behavior unchanged, cache ~97 KB lighter)
- CONTRIBUTING.md: pre-existing guide restored after accidental overwrite and merged with new sections
- Save points: `chk/pre-reorg-2026-11-10`, `chk/pre-reorg-2026-11-11`

### Added

- Permanent UI & Layout Architecture Lock: Visual hierarchy, navigation bar, pill selector, welcome cards, and modal components permanently frozen against future agent modifications
- Modernized Glassmorphic Settings Modal: Sleek card containers for settings sections, icon badges for category titles, and refined spacing
- Settings Modal PWA Install Action: Added "📲 ایپ انسٹال کریں" (`#modalInstallAppBtn`) in the modal footer opposite to "محفوظ کریں ✓" with standalone app detection
- Universal Completion Controls: Restart button (`#restartBtn`) verified across all 6 sections (Fajr, Jumma, Tauheed, Asr, Tasbeeh, Custom) with companion `#compHomeBtn` to instantly return to main view
- Timeless Spiritual Taglines: Fully automatic time-of-day greetings and recommendations with zero time digits or prayer hours cluttering the visible text
- SEO Description Scoped to Welcome Landing: Moved the bottom SEO summary text (`.seo-summary`) exclusively inside the Welcome screen (`renderWelcome`), removing it from all active zikr and reading screens (Fajr, Surah Kahf, Jumma, Tauheed, Asr, Tasbeeh) for a 100% clean, distraction-free recitation interface
- Cache bumped to `azk-pro-v23`

### Removed

- Soft Ivory / White Theme: Removed white mode per user directive to eliminate eye strain in dark / mosque environments, preserving the authentic 3 themes (Emerald, OLED Pure Black, Sepia Paper)

### Fixed

- Authentic Indo-Pak Orthography: Normalized high madda in Ayat-ul-Kursi and Durood Ibrahim to authentic standard Pakistani Quranic fonts
- Custom Azkar Safety: Guarded `item.ar` rendering against null/undefined in manual zikr editor

- Network-First Service Worker Strategy: HTML document navigation now uses Network-First with offline cache fallback, guaranteeing existing users always get the latest deployment immediately without clearing cache
- Instant Live Update Banner: Automatic `updatefound` detection with 1-click reload toast ("✨ نئی اپڈیٹ دستیاب ہے! [ابھی ریفریش کریں ↻]")
- Safe-Area Inset Ergonomics: Added `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for iPhone notches, Dynamic Island, and Android gesture navigation bars
- Responsive Fluid Typography: Dynamic `--qs: clamp(1.35rem, 4.2vw, 1.68rem)` and optimized UI scaling across 320px small screens up to tablets
- Service Worker Cache bumped to `azk-pro-v6`
- Google Search SEO Enhancements: Enriched Urdu & English meta tags, updated `sitemap.xml` to 2026-10-25, and `<noscript>` semantic search engine fallback
- Schema.org Rich Snippets: Expanded `WebApplication` feature list and `FAQPage` schema for Qibla compass, Masjid mode, and Darood counter Google Search accordions
- Chrome & Mobile 1-Click PWA Install Prompt: Non-intrusive bottom install banner + drawer install button with `beforeinstallprompt` handler and standalone detection
- Masjid Mode (🔕 Silent / Haptic only / Mute) with 1-tap quick toggle and sound preferences
- Auto Daily Midnight Reset and daily Streak habit tracker (🔥 تسلسل)
- Offline Qibla Compass (🧭 قبلہ نما) with live orientation gyro sensor and offline Pakistani city presets
- Eye-Comfort Reading Themes (Emerald Night, OLED Pure Black, Warm Sepia)
- Manual Azkar JSON Backup & Restore with 1-click text sharing
- Time-Aware smart greeting banner with auto morning/evening/Jummah context suggestions
- Persistent Manual/Custom Azkar feature with custom counts and catalog import
- Sequential Next/Back navigation system for manual azkar matching regular sections
- Drag-and-drop and up/down numbering adjustment in manual azkar fehrist list
- Full PWA support: `manifest.json`, `sw.js` service worker (offline app shell), icons (`icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png`)
- Vector favicon (`favicon.svg`) and `favicon-32x32.png`
- SEO files: `robots.txt`, `sitemap.xml`, `404.html`
- Local Durood Sharif poster `assets/asr-durood.png` (replaces external Blogger image)

### Changed

- Consolidated the app into a single self-contained `index.html` (HTML + CSS + JS + data)
- All Quranic and azkar data now loads from the bundled file (no external fetch at runtime)
- Social preview (`og:image` / `twitter:image`) now points to the bundled app icon
- Pakistani (Indo-Pak) Surah Al-Kahf verses now end with the standard ﴿N﴾ verse markers (matching the Fajr/Maghrib style)

### Fixed

- Corrected 17 corrupted characters in the Pakistani (Indo-Pak) Surah Al-Kahf text — stray presentation-form ligatures and Arabic-Indic digits in verses 5, 15, 19, 22, 28, 48, 55, 74, 76, 77, 88, 101
- Removed a double space in Surah Al-Kahf verse 19 (`مِّنْهُ وَلَا`)

### Removed

- Dead files no longer referenced by the app: `main.css`, `tajweed.css`, `data.js`, `data/quran.js`, `data/quran-kahf.js`, `scripts/build-quran.js`, `scripts/quran-loader.js`

## [1.0.0] - 2024-12-01

### Added

- Daily Azkar (Fajr / Maghrib)
- Morning & Evening Adhkar
- Post-Prayer Azkar
- Surah Al-Kahf (Uthmani + Pakistani scripts, 12 rukus)
- Tasbeeh-e-Fatima counter
- Tauheed Azkar
- Durood Sharif 80x counter
- Tajweed color support with 6 bundled Pakistani fonts
- Responsive, mobile-first dark UI
- MIT License
