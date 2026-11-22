# Islamic Azkar Pro — Architecture Index

> **TOKEN SAVER**: Read this file FIRST before grepping or scanning the codebase.
> This index tells you exactly which file owns what. Never read random files speculatively.

---

## Project at a Glance

| Item | Value |
|---|---|
| Type | Progressive Web App (PWA) + Android native wrapper |
| Main entry | `index.html` (monolith, 9400+ lines — intentionally frozen) |
| Service worker | `sw.js` (115 lines) — cache: `azk-pro-v*` |
| PWA manifest | `manifest.json` (57 lines) |
| Android wrapper | `android/` — excluded from all source guards |
| Deployment | GitHub Pages via `docs/` + Oracle server `daily-ship.sh` |
| Live URL | https://jamamjadalone.github.io/islamic-azkar-pro |

---

## Critical Rule: Monolith Exception

`index.html` is intentionally >300 lines (9400+). **Never split it.**
The UI architecture is PERMANENTLY LOCKED. All other source files must stay ≤300 lines.

---

## File Map

### Root Files

| File | Lines | Purpose |
|---|---|---|
| `index.html` | ~9438 | **[MONOLITH — FROZEN UI]** Full PWA app: all JS, CSS, HTML inline. Contains azkar catalog, Quran reader, custom azkar, settings, 6-language i18n. |
| `sw.js` | 115 | Service worker — offline cache. Must sync `CACHE` version on every `index.html` change. |
| `manifest.json` | 57 | PWA manifest — app name, icons, theme colors. |
| `favicon.svg` | 15 | App favicon. |
| `404.html` | 25 | GitHub Pages 404 redirect. |
| `robots.txt` | 3 | Search engine directives. |
| `sitemap.xml` | 74 | SEO sitemap. |
| `CNAME` | 1 | Custom domain config. |
| `azkar-dev.py` | ~295 | **Project quality guard CLI** — pre-commit gate. Run `python azkar-dev.py guard` before every commit. |
| `CLAUDE.md` | — | Claude Code CLI instructions — rules, LWH workflow, monolith exception. |
| `AGENTS.md` | 28 | AI agent rules for all agents (Antigravity, OpenCode Zen, Cursor, Copilot). |
| `GEMINI.md` | 11 | Antigravity-specific agent rules. |
| `.guardrc.json` | 4 | Guard config — `rule21_skip_dirs: ["android"]`. |
| `CHANGELOG.md` | 81 | Version history. |
| `CONTRIBUTING.md` | 106 | Contribution guidelines. |

---

### `components/` — Reusable UI pieces
Currently empty (README only). Future: extracted UI widgets from `index.html` go here.

| File | Lines | Purpose |
|---|---|---|
| `components/README.md` | 9 | Directory role description. |

---

### `data/` — Source data packs
Raw i18n and UI string packs before merge into `index.html`.

| File | Lines | Purpose |
|---|---|---|
| `data/README.md` | 11 | Directory role description. |
| `data/source-packs/intros-fr.json` | 113 | French intro translations. |
| `data/source-packs/intros-id.json` | 113 | Indonesian intro translations. |
| `data/source-packs/intros-tr.json` | 113 | Turkish intro translations. |
| `data/source-packs/intros-translations.json` | 221 | Full intros i18n master. |
| `data/source-packs/uipack-bn.json` | 270 | Bengali UI string pack. |
| `data/source-packs/uipack-fa.json` | 270 | Farsi UI string pack. |
| `data/source-packs/uipack-ru.json` | 270 | Russian UI string pack. |
| `data/source-packs/uipack-skeleton.json` | ~1953 | UI string pack skeleton (all keys, no values). |

---

### `pages/` — Screen-level components
Currently empty (README only). Future: multi-screen app expansion.

| File | Lines | Purpose |
|---|---|---|
| `pages/README.md` | 10 | Directory role description. |

---

### `tools/` — Dev/build scripts
Node.js scripts run via CLI. Never run from browser.

| File | Lines | Purpose |
|---|---|---|
| `tools/README.md` | 19 | Tools overview. |
| `tools/i18n-audit.js` | 192 | **I18n completeness audit** — checks all 6 lang keys present. Run: `node tools/i18n-audit.js` |
| `tools/i18n-inventory.js` | 100 | Lists all i18n keys found in `index.html`. |
| `tools/fazeelat-embed.js` | 87 | Embeds fazeelat data into azkar catalog. |
| `tools/fazeelat-merge.js` | 53 | Merges fazeelat source JSON. |
| `tools/intros-extend-latin.js` | 40 | Extends intro translations for Latin-script langs. |
| `tools/rabbana-ref-i18n.js` | 123 | Rabbana dua reference i18n helper. |
| `tools/uipack-dump.js` | 87 | Dumps UI string pack from `index.html` to JSON. |
| `tools/uipack-merge.js` | 144 | Merges UI string pack JSON back into `index.html`. |

---

### `docs/` — Documentation & deployment
GitHub Pages deployment target.

| File | Lines | Purpose |
|---|---|---|
| `docs/ARCHITECTURE.md` | 33 | High-level architecture overview. |

---

### `quran/` — Quran data
Static JSON data files. Read-only. Excluded from line-cap checks.

| Path | Description |
|---|---|
| `quran/15line/para_01.json` … `para_30.json` | 15-line Quran paras (Urdu script). |
| `quran/full/surah_*.json` | Full surah text (Arabic + IndoPak). |
| `quran/full/surahs_meta.json` | Surah metadata (names, ayat counts). |
| `quran/full/tools/` | Quran conversion scripts (tanzil, indopak). |
| `quran/manifest_15line.json` | 15-line para manifest (~5070 lines). |
| `quran/manifest_16line.json` | 16-line para manifest (~4574 lines). |
| `quran/paras_index.json` | Para index (272 lines). |
| `quran/surahs_26.json` | Surah listing (410 lines). |
| `quran/surahs_index.json` | Full surah index (1142 lines). |

---

### `android/` — Native Android wrapper
Kotlin/Gradle project. **Completely excluded from all web guards.**

---

### `.claude/` — Claude Code CLI config

| Path | Purpose |
|---|---|
| `.claude/settings.local.json` | Claude Code local settings (11 lines). |
| `.claude/skills/lwh/` | **LWH AI coding skills** — `lwh-plan-app`, `lwh-challenge-plan`, `lwh-make-tasks`, `lwh-run`, `lwh-stop`, `lwh-security-check`, `lwh-whats-next`. |

---

## Key `index.html` Internals

### localStorage Keys
| Key | Purpose |
|---|---|
| `azk_pro_v1` | Main app state: section, viewMode, zoomPct, tajMode, scriptMode, lang, all settings |
| `azk_manual_azkar_v1` | Custom azkar list (user-added) |

### Key Functions
| Function | Purpose |
|---|---|
| `tap()` | Main counter tap — increments count, haptic, dua reveal |
| `save()` | Persists app state to `localStorage.azk_pro_v1` |
| `render()` | Re-renders azkar section view |
| `renderCustom(mc)` | Renders custom azkar reading view |
| `loadCustomAzkar()` | Loads custom azkar from `localStorage.azk_manual_azkar_v1` |
| `saveCustomAzkar()` | Saves custom azkar to `localStorage.azk_manual_azkar_v1` |

### Frozen UI Sections (NEVER CHANGE LAYOUT)
1. **Top Bar**: Streak badge, sound toggle, zikr selector pill, settings `⋮` button.
2. **Dynamic Greeting Tagline**: Borderless spiritual text.
3. **Luxury Reading Counter**: Counter ring + haptic animation + dua cards.
4. **7-Card Welcome Dashboard**: Landing page with direct guidance cards.
5. **Completion Screen**: "Restart" + "Home" buttons.
6. **Unified Settings Modal**: Zoom, font, audio, themes, Kahf prefs + save/install footer.

---

## Service Worker Sync Rule

**Every change to `index.html` requires bumping the cache version in `sw.js`:**
```js
const CACHE = "azk-pro-v<N>-<slug>";
```
Never push `index.html` changes without updating `CACHE` in `sw.js`.

---

## Pre-Commit Gate

```bash
python azkar-dev.py guard   # Must show ALL PASS before git commit
```

### Full Quality Workflow (New Feature)
```
lwh-plan-app → lwh-challenge-plan → lwh-make-tasks → execute → python azkar-dev.py guard → commit
```

---

## Supported Languages (6)

| Code | Language |
|---|---|
| `ur` | Urdu (default) |
| `ar` | Arabic |
| `en` | English |
| `bn` | Bengali |
| `fa` | Farsi |
| `tr` | Turkish |
| `id` | Indonesian |
| `ru` | Russian |
| `fr` | French |

> Note: Core 6 for full i18n audit; extended langs in `data/source-packs/`.

---

*Last updated: 2026-11-22. Regenerate after major restructuring.*
