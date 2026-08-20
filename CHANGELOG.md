# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Full PWA support: `manifest.json`, `sw.js` service worker (offline app shell), icons (`icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png`)
- Vector favicon (`favicon.svg`) and `favicon-32x32.png`
- SEO files: `robots.txt`, `sitemap.xml`, `404.html`
- Local Durood Sharif poster `assets/asr-durood.png` (replaces external Blogger image)

### Changed

- Consolidated the app into a single self-contained `index.html` (HTML + CSS + JS + data)
- All Quranic and azkar data now loads from the bundled file (no external fetch at runtime)
- Social preview (`og:image` / `twitter:image`) now points to the bundled app icon

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