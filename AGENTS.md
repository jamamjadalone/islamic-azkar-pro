# AI Agent Guidelines & Architecture (Islamic Azkar Pro)

Welcome, AI Agent! This document provides instructions for any autonomous coding assistant (Antigravity, Claude Code, Gemini CLI, Aider, OpenCode, Termux agents) working on this repository.

## Project Structure
- `index.html`: The core standalone Progressive Web App (PWA). Contains application shell, UI rendering, datasets, and localized strings.
- `sw.js`: Service worker implementing network-first for navigation and stale-while-revalidate for static offline assets.
- `manifest.json`: Web App Manifest for standalone installability on Android, iOS, and Desktop.
- `fonts/`: Bundled offline Quranic TrueType fonts (Al Majeed, Hafs, Al Qalam, PDMS Saleem, Muhammadi, Al Mushaf).
- `assets/wallpapers/`: Genuine open-source offline wallpapers (Kaaba, Nabawi, Arabesque Arch).
- `quran/`: Structured Quranic metadata and 26 Mubarak Surahs JSON data.

## Cardinal Rules for All AI Assistants
1. **Communication**: Hinglish (Roman Urdu) or English only. NEVER output Arabic/Urdu script in chat reasoning or conversation messages (Roman letters only).
2. **Permanent UI Lock**: The UI architecture of Islamic Azkar Pro is 100% frozen. NEVER redesign, reorder, or alter the Top Bar, Spiritual Greeting Banner, Luxury Counter Ring, 7-Card Welcome Dashboard, or Settings Modal layout.
3. **Sacred Reference Adab (Rule 12)**: NEVER use direct/absolute claims for Hadith (e.g., "The Prophet said:"). ALWAYS use reverent, contextual phrasing: *"According to the contextual meaning of the narration (Hadith)..."* or in Urdu text *"روایت کے مفہوم کے مطابق..."*.
4. **Zero Trademark Rule (Rule 13)**: NEVER mention or hardcode any commercial third-party application or brand names anywhere in code, comments, documentation, or commits. Use generic technical terms only (e.g., "Authentic Pakistani Mushaf Standard").
5. **Waqf Marks Integrity**: Never strip or omit Arabic pause symbols (waqf marks like `ۚ`, `ۙ`, `ؕ`) when processing verses. They must precede the verse ornate bracket `﴿۱﴾`.
6. **Zero Media Inspection**: NEVER use file viewer tools on image binaries (`.png`, `.jpg`, `.webp`) to prevent API payload crashes. Use text terminal checks only.
7. **Service Worker Sync**: When updating `index.html` or assets, always update the cache version in `sw.js`.
