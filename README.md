# 🌙 Islamic Azkar Pro

<p align="center">
  <img src="icons/icon-512.png" alt="Islamic Azkar Pro" width="120" height="120">
</p>

<p align="center">
  <a href="https://jamamjadalone.github.io/islamic-azkar-pro/"><img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/jamamjadalone/islamic-azkar-pro/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/jamamjadalone/islamic-azkar-pro?style=for-the-badge&color=blue"></a>
  <img alt="Language" src="https://img.shields.io/badge/Built%20With-HTML%20%2F%20CSS%20%2F%20JS-e34c26?style=for-the-badge&logo=javascript">
  <img alt="Offline" src="https://img.shields.io/badge/Works%20Offline-100%25-3cb371?style=for-the-badge">
  <img alt="PWA" src="https://img.shields.io/badge/PWA-Ready-5c5cff?style=for-the-badge&logo=pwa">
  <img alt="No Dependencies" src="https://img.shields.io/badge/No%20Dependencies-zero%20build-2ea44f?style=for-the-badge">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/jamamjadalone/islamic-azkar-pro?style=for-the-badge&color=6f42c1">
</p>

**Islamic Azkar Pro** is a complete Islamic dhikr application in Urdu and Arabic — daily adhkar, a Darood Sharif counter, and the full Surah Al-Kahf with Tajweed colors. It is a single self-contained HTML file, works 100% offline, and deploys straight to GitHub Pages.

---

## ✨ Features

- 🕌 **Darood Sharif 80x Counter** — tap-to-count with target and reset
- 🌅 **Morning & Evening Azkar** — Fajr and Maghrib adhkar with Arabic, Urdu translation & references
- 🌙 **Jummah Wird** — Friday afternoon Durood, Ayat al-Kursi, and more
- ☝️ **Tauheed Azkar** — Tawheed remembrances
- 📿 **Tasbeeh-e-Fatima** — 33 + 33 + 34 digital counter
- 📖 **Full Surah Al-Kahf** — 110 verses / 12 rukus in both Pakistani (Indo-Pak) and Uthmani scripts
- 🎨 **Tajweed colors** — 6 bundled Pakistani Quranic fonts with a font picker
- 📱 **Mobile-first, premium dark theme** — responsive on any device
- ⚡ **PWA-ready** — installable, offline service worker, app icons
- 🔍 **SEO optimized** — meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap

## 🚀 Try It

<a href="https://jamamjadalone.github.io/islamic-azkar-pro/"><img alt="Open Live Demo" src="https://img.shields.io/badge/OPEN%20LIVE%20DEMO-2ea44f?style=for-the-badge"></a>

## 📂 Project Structure

```text
.
├── index.html            # The entire app (HTML + CSS + JS + data) — self-contained
├── fonts/                # 6 offline Pakistani Quranic fonts
├── assets/
│   └── asr-durood.png    # Durood Sharif poster
├── icons/                # PWA icons (192px, 512px, apple-touch)
├── favicon.svg           # Vector favicon
├── manifest.json         # PWA manifest
├── sw.js                 # Offline service worker
├── robots.txt            # Search engine rules
├── sitemap.xml           # Site map
└── 404.html              # Custom not-found page
```

## 🛠 Local Development

No build tools or dependencies required.

```bash
git clone https://github.com/jamamjadalone/islamic-azkar-pro.git
cd islamic-azkar-pro
python -m http.server 8080    # or: npx serve .
```

Then open <http://localhost:8080>.

> Use a local web server (not `file://`) so the service worker and manifest work correctly.

## 🚀 Deployment

1. Push this repository to GitHub.
2. In **Settings → Pages**, set source to **Deploy from a branch** → branch `main` → folder `/ (root)`.
3. Your app goes live at `https://<username>.github.io/islamic-azkar-pro/`.

## 📝 Text Accuracy

The Quranic content (Pakistani and Uthmani scripts) has been carefully audited:

- 110 verses / 12 rukus in both scripts, sequentially ordered
- Urdu translations checked for spelling and wording
- No stray Unicode ligature or diacritic characters

Found a text error? Please open an [issue](https://github.com/jamamjadalone/islamic-azkar-pro/issues) or submit a pull request.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) first.

## 📜 License

Distributed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for the Ummah · <a href="https://github.com/jamamjadalone">@jamamjadalone</a></p>