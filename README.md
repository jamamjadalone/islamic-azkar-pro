# Islamic Azkar Pro

<p align="center">
  <img src="icons/icon-512.png" alt="Islamic Azkar Pro Logo" width="128" height="128">
</p>

<p align="center">
  <strong>اسلامک اذکار پرو — درود شریف کاؤنٹر، قبلہ نما، مسنون اذکار اور مکمل سورۃ الکہف مع تجوید</strong><br>
  <em>A modern, privacy-focused, 100% offline Islamic Progressive Web Application (PWA).</em>
</p>

<p align="center">
  <a href="https://jamamjadalone.github.io/islamic-azkar-pro/"><img alt="Live Demo" src="https://img.shields.io/badge/Live%20App-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/jamamjadalone/islamic-azkar-pro/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/jamamjadalone/islamic-azkar-pro?style=for-the-badge&color=blue"></a>
  <img alt="PWA" src="https://img.shields.io/badge/PWA-Installable-5c5cff?style=for-the-badge&logo=pwa">
  <img alt="Offline" src="https://img.shields.io/badge/Offline-100%25-3cb371?style=for-the-badge">
  <img alt="Code Quality" src="https://img.shields.io/badge/Code%20Quality-Grade%20A-brightgreen?style=for-the-badge">
  <img alt="Zero Build" src="https://img.shields.io/badge/Dependencies-Zero%20Build-orange?style=for-the-badge">
</p>

---

## Overview

**Islamic Azkar Pro** is a high-performance, single-bundle Islamic web application built specifically for Muslims seeking an authentic, distraction-free, and fully offline tool for daily worship. 

It requires **zero external API calls**, has **no telemetry or user tracking**, stores all custom prayer targets locally in browser storage, and operates seamlessly on Android, iOS, Windows, macOS, and Linux.

---

## Key Features

### 1. Authentic Azkar & Digital Counter
- **80x Darood Sharif Counter**: Built for Friday afternoon (Asr to Maghrib) recitation with target progress indicators.
- **Morning & Evening Azkar**: Complete authentic Fajr and Maghrib supplications with Arabic vocalization, Urdu translations, and Hadith source references.
- **Jummah Wird & Tauheed**: Specialized Friday supplications and Tawheed declarations.
- **Tasbeeh-e-Fatima (33-33-34)**: Automatic 3-phase counter advancing from SubhanAllah to Alhamdulillah to Allahu Akbar with completion chimes.

### 2. Full Surah Al-Kahf with Tajweed
- **110 Verses / 12 Rukus**: Bundled locally in both **Pakistani (Indo-Pak)** and **Madani (Uthmani)** scripts.
- **4-Rule Pakistani Tajweed Color Coding**: Real-time visual pronunciation guidance (Ghunnah, Ikhfa, Madda, Qalqalah).
- **6 Bundled Quranic Fonts**: Al Majeed, Hafs, Al Qalam, PDMS Saleem, Muhammadi, and Al Mushaf.
- **Auto-Scroll Engine**: Adjustable smooth reading scroll bar for hands-free recitation.

### 3. Offline Qibla Compass
- **Sensor-Driven Gyro Compass**: Live heading detection pointing directly towards the Holy Kaaba.
- **Offline City Presets (No GPS Required)**: Pre-calibrated degrees for Karachi (265°), Lahore (259°), Islamabad (256°), Faisalabad (258°), Multan (260°), Peshawar (254°), Quetta (261°), London, Dubai, and more.

### 4. Custom Azkar Builder
- **Personalized Fehrist**: Add custom duas or wird with custom repetition targets (33, 70, 100, 313, 1000).
- **Sequential Flow**: Step-by-step Next/Back navigation matching regular azkar sections.
- **Drag-and-Drop Organization**: Reorder custom supplications dynamically with automatic badge renumbering.
- **JSON Backup & Restore**: Export your custom prayers to a `.json` backup file or copy formatted text for WhatsApp/Notes sharing.

### 5. Ergonomics & Comfort
- **Masjid Mode (Silent & Haptic)**: Mutes audio beeps and relies strictly on subtle vibrations so fellow worshipers in congregations are never disturbed.
- **Auto Daily Reset & Streak Tracker**: Counters reset at midnight while tracking your consecutive daily prayer habit streak (`🔥 تسلسل`).
- **Eye-Comfort Themes**: Default Emerald Night, pure AMOLED Black (`#000000`) for battery savings, and Warm Sepia for nighttime reading comfort.
- **Safe-Area Inset Support**: Pixel-perfect rendering across iPhone Dynamic Island, camera punch-holes, and Android gesture navigation bars.

### 6. PWA & Instant Update Engine
- **Network-First HTML Delivery**: Existing users receive live updates immediately when visiting without ever having to manually clear their browser cache.
- **Live Update Toast Notification**: Automatic background update detection offering a 1-click reload toast.
- **1-Click Chrome Install Prompt**: Smart banner and drawer button for desktop and mobile home screen installation.

---

## Keyboard Shortcuts

For desktop users, the app offers complete keyboard navigation:

| Key | Action |
| :--- | :--- |
| `Space` or `Enter` | Increment counter (Tap) |
| `Backspace` | Undo last count |
| `Arrow Right` (`→`) | Next supplication (اگلا ذکر) |
| `Arrow Left` (`←`) | Previous supplication (پچھلا ذکر) |
| `+` / `Numpad +` | Zoom in Quranic / Arabic font |
| `-` / `Numpad -` | Zoom out Quranic / Arabic font |

---

## Project Structure

```text
islamic-azkar-pro/
├── index.html            # Bundled application shell (HTML5, CSS3, Vanilla JS, and data)
├── sw.js                 # Service Worker (Network-First HTML, Cache-First static assets)
├── manifest.json         # PWA Web App Manifest (standalone, RTL, theme colors)
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # XML sitemap with weekly change frequency
├── 404.html              # Custom offline-ready 404 page
├── favicon.svg           # Scalable vector favicon
├── favicon-32x32.png     # Fallback 32px favicon
├── fonts/                # 6 offline Pakistani & Uthmani TrueType fonts (.ttf)
├── assets/               # Local posters and imagery
├── icons/                # PWA icons (192px, 512px, maskable, apple-touch)
├── CHANGELOG.md          # Version history adhering to Keep a Changelog
└── LICENSE               # MIT License
---

## 🔒 UI Architecture Lock (Strict Directive)

The visual design, component layout, and user experience of **Islamic Azkar Pro** are **permanently frozen and locked**. All AI agents and human contributors must preserve the existing interface layout:

- **Locked Elements**:
  - **Top Bar**: Streak badge (`🔥 X دن`), direct 1-tap sound toggle (`🔔`/`🔇`), glassmorphic zikr selector pill (`[ ☀️ ذکر منتخب کریں ▾ ]`), and three-dot settings trigger (`⋮`).
  - **Spiritual Greeting Banner**: Pure timeless text with zero numbers or prayer hours.
  - **Reading Counter**: Luxury emerald counter ring with haptic animation, centered clean typography, and dua cards.
  - **Welcome Dashboard**: 7-card grid with Islamic greeting and direct guidance.
  - **Completion Screen**: Seamless restart (`↺ دوبارہ شروع کریں`) and home navigation (`🏠 مرکزی صفحہ`).
  - **Unified Settings Modal**: Glassmorphic card sections (Zoom, Quran font, Audio, Themes, Kahf preferences) and footer (`محفوظ کریں ✓` + `📲 ایپ انسٹال کریں`).

- **Permitted Additions**:
  1. Adding new Azkar / Supplications into the catalog.
  2. Adding new settings options inside the existing three-dot settings modal.
  3. Performance, offline service worker, and bug fix enhancements.


## Local Development

No build tools, bundlers, or package installations are required.

```bash
# Clone the repository
git clone https://github.com/jamamjadalone/islamic-azkar-pro.git

# Navigate into directory
cd islamic-azkar-pro

# Start a local static server
python -m http.server 8080
# Or using Node:
# npx serve .
```

Open `http://localhost:8080` in your browser.

> [!NOTE]
> Run using a local web server rather than opening `file:///` directly so that Service Worker registration and PWA features initialize properly.

---

## License

This project is licensed under the [MIT License](LICENSE) — free for personal, community, and educational use.

<p align="center">
  Made with sincerity for the global Ummah · <a href="https://github.com/jamamjadalone">@jamamjadalone</a>
</p>