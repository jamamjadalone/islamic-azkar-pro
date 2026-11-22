# CLAUDE.md — Islamic Azkar Pro

> **For Claude Code CLI.** Read this file first before touching any file.

---

## Project Overview

Islamic Azkar Pro is a **Progressive Web App (PWA)** — Islamic supplications counter with 6-language i18n, Quran reader, custom azkar, and streak tracking.

- **Repo**: `islamic-azkar-pro/`
- **Main file**: `index.html` (monolith, 9400+ lines — FROZEN ARCHITECTURE)
- **Service Worker**: `sw.js`
- **Architecture map**: `ARCHITECTURE_INDEX.md` ← **Read this before any file exploration**

---

## LWH AI Coding Skills

This project uses the **LWH AI Coding Skills** framework.

Skills are located in `.claude/skills/lwh/`. Use them for every new feature:

```
lwh-plan-app        → Plan the feature with structured decomposition
lwh-challenge-plan  → Challenge assumptions before implementation
lwh-make-tasks      → Break into atomic executable tasks
lwh-run             → Execute tasks one by one
lwh-stop            → Pause and review state
lwh-security-check  → Security review before shipping
lwh-whats-next      → Determine next priority after completing a feature
```

**Mandatory LWH Workflow for every new feature:**
1. `/lwh-plan-app` — plan
2. `/lwh-challenge-plan` — challenge
3. `/lwh-make-tasks` — atomize
4. Execute tasks
5. `python azkar-dev.py guard` — quality gate
6. Commit

**Docs**: https://github.com/hassancs91/lwh-ai-coding-skills

---

## Critical Rules (Non-Negotiable)

### Rule 1: Monolith Exception
`index.html` is intentionally >300 lines (9400+). **NEVER split it. NEVER restructure it.**
The entire UI architecture is PERMANENTLY LOCKED.

All other source files must stay ≤300 lines.

### Rule 2: Zero Duplicate UI
Before adding any UI element to `index.html`, **always search first**:
```bash
grep -n "element-id-or-class-name" index.html
```
If it already exists — modify it, never duplicate. Claude's past mistake: adding duplicate sections without checking.

### Rule 3: Service Worker Sync (MANDATORY)
Every change to `index.html` **must** bump the cache version in `sw.js`:
```js
const CACHE = "azk-pro-v<N>-<slug>";
```
Never commit `index.html` changes without syncing `sw.js`. Users will get stale cached version.

### Rule 4: Pre-Commit Gate
Run before every `git commit`:
```bash
python azkar-dev.py guard
```
This checks: line caps, sw.js version, i18n audit. **If it fails — fix first, commit after.**

### Rule 5: Architecture Index First
Before exploring or grepping files, read `ARCHITECTURE_INDEX.md`.
It tells you exactly which file owns what — saves token quota.

### Rule 6: Frozen UI Sections — Zero Touch
These sections in `index.html` are PERMANENTLY LOCKED (layout, structure, class names):
1. Top Bar (streak badge, sound toggle, zikr selector pill, `⋮` settings button)
2. Dynamic Greeting Tagline
3. Luxury Reading Counter (counter ring, haptic animation, dua cards)
4. 7-Card Welcome Dashboard
5. Completion Screen
6. Unified Settings Modal layout

You may ONLY: add new azkar data, add new toggles inside settings modal, fix bugs.

### Rule 7: Sacred Reference Adab
Never write direct Hadith attribution (`"The Prophet said:"`).
Always use: `"According to the contextual meaning of the narration (Hadith)..."`

Quranic quotes: `"As declared by Allah the Almighty in the Holy Quran — [Surah ...: Verse ...]"`

### Rule 8: Zero Hardcoded Paths
Never hardcode `C:\Users\AS\...` or any machine-specific path in any file.
Use `Path(__file__).resolve().parent` in Python scripts.

### Rule 9: Zero Trademark References
Never mention commercial brand/app names in code, comments, or commits.
Use generic technical terms: "Direct Transfer", "Offline Sync", etc.

### Rule 10: Six-Language i18n Parity
When adding any UI string, provide translations for all 6 languages:
`ur` (Urdu), `ar` (Arabic), `en` (English), `bn` (Bengali), `fa` (Farsi), `tr` (Turkish)

Run `python azkar-dev.py i18n` to verify.

### Rule 11: Backend Preservation
`backend/` directory (if present) must never be deleted. It contains Cloudflare Worker + Google Apps Script Mail Bridge for future passwordless auth.

### Rule 12: Surgical Changes Only
Touch only the minimum lines needed. Never rewrite working sections.
Map every changed line to the user's request — if you can't, don't change it.

---

## localStorage Keys
| Key | Purpose |
|---|---|
| `azk_pro_v1` | Main app state (section, settings, lang, zoom) |
| `azk_manual_azkar_v1` | Custom azkar (user-added) |

---

## Dev CLI Commands
```bash
python azkar-dev.py check    # Line cap check (skips index.html)
python azkar-dev.py i18n     # i18n completeness audit
python azkar-dev.py sw       # Verify sw.js cache version
python azkar-dev.py guard    # All checks (pre-commit gate)
python azkar-dev.py stats    # Project stats summary
```

---

## Commit Format
```
type(scope): description

Examples:
feat(azkar): add Rabbana duaas section with EN/UR translations
fix(sw): bump cache to azk-pro-v102-rabbana
chore(i18n): add missing Bengali keys for settings modal
```

---

## Git Remote
```
https://github.com/jamamjadalone/islamic-azkar-pro.git
```

---

## What You Must NOT Do
- Do NOT split `index.html`
- Do NOT change the frozen UI sections
- Do NOT add UI elements without searching for existing ones first
- Do NOT commit without running `python azkar-dev.py guard`
- Do NOT change `sw.js` cache version to anything that doesn't start with `azk-pro-v`
- Do NOT add direct Hadith attributions
- Do NOT hardcode local machine paths
- Do NOT add brand/trademark names in code or comments
- Do NOT load or display image files via agent tools (HTTP 400 crash risk)
