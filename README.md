# 🌙 Islamic Azkar Pro

**A 100% offline Islamic Azkar application** — daily adhkar, Darood Sharif counter, Surah Al-Kahf with Tajweed, and more. Built with a single self-contained `index.html`, works instantly from GitHub Pages with no build step and no external runtime dependencies.

> **Live:** https://jamamjadalone.github.io/islamic-azkar-pro/

---

## ✨ Features

- 🕌 **Darood Sharif 80x Counter** — tap-to-count with a reset and target of 80
- 🌅 **Morning & Evening Azkar** (Fajr / Maghrib)
- 📖 **Post-Prayer Azkar** with complete references
- 📿 **Tasbeeh-e-Fatima** and **Tauheed Azkar**
- 📖 **Full Surah Al-Kahf** in both **Pakistani (Indo-Pak)** and **Uthmani** scripts, organised into 12 rukus
- 🎨 **Quran Tajweed color support** — 6 bundled Pakistani Quranic fonts (`fonts/`) with a font picker
- 📱 **Responsive, mobile-first design** with a premium dark theme
- ⚡ **PWA-ready** — installable, app icon, offline service worker, manifest
- 🔍 **Full SEO** — meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots

## 🧭 Sections

| Section | Content |
| --- | --- |
| `FAJR` | Morning azkar with Arabic, Urdu translation & references |
| `JUMMA` | Friday wird — Durood, Ayat al-Kursi, Surah al-Kahf portions |
| `TAUHEED` | Tawheed azkar |
| `TSB` | Tasbeeh-e-Fatima |
| `ASR` | Durood Sharif image + 80x digital counter |
| `KAHF_UTHMANI` / `KAHF_INDOPAK` | Surah Al-Kahf, 12 rukus, Tajweed-colored |

## 📂 Project Structure

```text
.
├── index.html            # Entire application (HTML + CSS + JS + data), self-contained
├── fonts/                # 6 offline Pakistani Quranic fonts (.ttf)
├── assets/
│   └── asr-durood.png    # Durood Sharif poster (served locally)
├── icons/                # PWA icons (192, 512, apple-touch)
├── favicon.svg           # Vector favicon
├── favicon-32x32.png
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker (offline app shell)
├── robots.txt
├── sitemap.xml
├── 404.html
├── README.md
├── LICENSE               # MIT
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── CHANGELOG.md
```

## 🚀 Getting Started

The project needs no build tools or dependencies.

```bash
git clone https://github.com/jamamjadalone/islamic-azkar-pro.git
cd islamic-azkar-pro
```

Then serve it locally (a plain web server so the service worker and fonts work correctly):

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Open `http://localhost:8080` in your browser.

> ⚠️ Opening `index.html` directly via `file://` will work, but the service worker
> and `manifest.json` require an HTTP origin. Use the local server for the full
> PWA experience.

## 📦 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Your app will be live at `https://<username>.github.io/islamic-azkar-pro/`.

The service worker caches the app shell on first visit, so the site works offline afterwards.

## 🧪 Verifying Text Accuracy

The Quranic content (Pakistani and Uthmani scripts) has been audited for correctness:

- 110 verses / 12 rukus in both scripts, sequentially ordered
- Urdu translations checked for spelling and proper text
- No stray Unicode ligature or diacritic characters (scan via `scripts/` removed with the old build system)

If you find a text error, open an issue or PR per [CONTRIBUTING.md](CONTRIBUTING.md).

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📜 License

Licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for the Ummah · <a href="https://github.com/jamamjadalone">jamamjadalone</a></p>