# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Soft Ivory / Cream Day Theme (`data-theme="ivory"`): Gentle, eye-friendly light parchment reading mode with deep dark Islamic emerald text, gold accents, and zero glare for sunlight readability
- Universal Completion Controls: Restart button (`#restartBtn`) verified across all 6 sections (Fajr, Jumma, Tauheed, Asr, Tasbeeh, Custom) with companion `#compHomeBtn` to instantly return to main view
- Timeless Spiritual Taglines: Fully automatic time-of-day greetings and recommendations with zero time digits or prayer hours cluttering the visible text
- Cache bumped to `azk-pro-v21`

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