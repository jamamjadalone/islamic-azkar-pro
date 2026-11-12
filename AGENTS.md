# Autonomous Agent Guidelines (Islamic Azkar Pro)

Instructions for any autonomous coding assistant (CLI, Termux, Codespaces, or IDE agents) working on this repository.

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

## Repo Organization Rules (beginner-readable standard)
8. **Monolith Exception**: `index.html` is the one oversized file (~1.3 MB). It stays whole — the UI architecture inside it is frozen; do NOT split it. All remaining rules apply to future/other files only.
9. **Screens go in `pages/`**: any NEW standalone screen/view lives in `pages/` (as a new module or page file), never added deep inside tool folders.
10. **Shared pieces go in `components/`**: reusable widgets/logic used by more than one screen live in `components/`.
11. **Saving/loading goes in `data/`**: persistence (localStorage engines, import/export, schema migration) lives in `data/`. JSON source packs used by dev scripts also live in `data/source-packs/`.
12. **One job per file**: every file does a single, clearly-named job. If a file's name needs "...and...", split it.
13. **No file over 300 lines**: keep files small except the frozen monolith exception in Rule 8.
14. **Check before writing**: before creating anything new, search the repo — reuse or extend an existing file/pattern instead of duplicating.
15. **One folder per cleanup pass**: reorganize at most one folder per commit, never changing what the app does when opened. Runtime-referenced paths (`quran/`, `fonts/`, `assets/`, `icons/`) must not move.
16. **PWA scope lock**: work ONLY on the PWA (`index.html`, `sw.js`, `manifest.json`, `quran/`, `fonts/`, `assets/`, `icons/`, docs/tools/data). NEVER touch `android/`, `windows/`, or any other non-PWA owner work-in-progress — not even to fix lint, line-caps, or organize it. If a quality gate flags files outside the PWA scope, report the finding and leave the files untouched; the owner handles those separately.
17. **Project-scoped guard config**: the shared quality guard reads this repo's `.guardrc.json` for per-project settings. For THIS project, `rule21_skip_dirs: ["android"]` means the Rule 21 line-cap audit skips the owner's separate `android/` WIP (owner decision 2026-11-12). All other engines still audit the full repo, and the PWA's own files must always stay ≤300 lines. Never widen this exception to PWA files.
