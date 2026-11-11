# Contributing to Islamic Azkar Pro

Thank you for your interest in contributing! This project serves the Ummah with accurate, authentic Islamic adhkar and Quranic text, and we take correctness seriously.

> **Agents first**: read `AGENTS.md` (canonical rules) and `docs/ARCHITECTURE.md` (repo map) before changing anything.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs & Text Errors](#reporting-bugs--text-errors)
- [Submitting Text/Quranic Corrections](#submitting-textquranic-corrections)
- [Repo Organization](#repo-organization)
- [Development Workflow](#development-workflow)
- [Test Gates](#test-gates)
- [Code Style](#code-style)
- [Commit Conventions](#commit-conventions)
- [Credits Requirement](#credits-requirement)
- [Opening a Pull Request](#opening-a-pull-request)

## Code of Conduct

By participating you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

1. **Fork** the repository on GitHub.
2. **Clone** your fork:

   ```bash
   git clone https://github.com/<your-username>/islamic-azkar-pro.git
   cd islamic-azkar-pro
   ```

3. **Create a feature branch:**

   ```bash
   git checkout -b fix/your-fix
   ```

4. **Make your changes.**
5. **Commit** your work with a conventional message (see [Commit Conventions](#commit-conventions)).
6. **Push** to GitHub:

   ```bash
   git push origin fix/your-fix
   ```

7. **Open a Pull Request** against `main` and describe your change.

## Reporting Bugs & Text Errors

Please open a [GitHub Issue](https://github.com/jamamjadalone/islamic-azkar-pro/issues/new) and include:

- **Description** — what is wrong
- **Section** — which section is affected (Fajr, Jumma, Tauheed, Tasbeeh, Asr, Kahf)
- **Script** — Pakistani (Indo-Pak) or Uthmani
- **Steps to reproduce** — what you did
- **Expected vs actual** behavior
- **Screenshots** (if visual)

Because this app renders Arabic/Urdu, also note the **font** selected if the issue is display-related.

## Submitting Text/Quranic Corrections

Quranic and adhkar text must match authentic sources:

- **Uthmani script** must follow the Madinah Mushaf / Tanzil.net standard.
- **Pakistani (Indo-Pak) script** must follow the standard Indo-Pak Mushaf layout.
- **Translations** should be faithful to the source and verified.

In your PR, state the **source** you compared against (e.g., "compared with Tanzil.net, verse 18:76"). Do not change diacritics or wāw/alif spelling without a source.

> ⚠️ All data lives inside `index.html` as JavaScript arrays/objects
> (`FAJR`, `JUMMA`, `TAUHEED`, `TSB`, `ASR_TEXT`, `KAHF_UTHMANI`, `KAHF_INDOPAK`).
> Edit that file directly — there is no separate data file.

## Repo Organization

Per `AGENTS.md` rules 8–16:

- New **screens** → `pages/`; shared pieces → `components/`; saving/loading logic → `data/`.
- **One job per file**, max 300 lines — `index.html` (the frozen monolith) is the single exception.
- **Check before writing**: reuse or extend an existing file/pattern instead of duplicating.
- Runtime paths (`quran/`, `fonts/`, `assets/`, `icons/`, `index.html`, `sw.js`, `manifest.json`) never move.
- The app codebase is the **PWA only** — `android/` and other non-PWA WIP are the owner's separate work; contributors should not modify them.

## Development Workflow

The project has **no build step**. To test:

```bash
python -m http.server 8080   # or: npx serve .
```

Open `http://localhost:8080` and verify:

- Every section renders with no console errors
- Fonts load from `fonts/` and the font picker works
- The Asr counter works and resets correctly
- The service worker registers and caches the shell (see DevTools → Application)

## Test Gates

All of these must pass before a change is considered done:

```bash
node -c sw.js                  # service worker syntax
node tools/i18n-audit.js       # localization completeness
```

- Quality guard script (repo-wide gate) — must be fully clean for the PWA's files.
- Live check: app renders, **0 console errors**, counter/Quran/settings work.

## Code Style

- **One file:** keep the app self-contained in `index.html`.
- **Naming:** use clear, meaningful names (`const KAABA_ALIGN`, not `x`).
- **No dependencies:** avoid external libraries unless truly necessary.
- **Performance:** keep the bundle small — it is served from GitHub Pages.
- **Accessibility:** keep buttons/labels usable by keyboard and screen readers.
- **Responsive:** preserve the mobile-first design.

## Commit Conventions

Use conventional commits:

```text
fix: correct verse 18:76 spelling in Indo-Pak script
feat: add night mode toggle
perf: reduce service worker cache size
docs: update README
```

- Any change to `index.html` or bundled assets requires a cache version bump in `sw.js`.
- Released phases are git-tagged; commits are small and single-purpose.

## Credits Requirement

Any third-party resource you introduce (text, font, art, data) must be credited:

1. Add a credits note **next to the resource** (e.g. `fonts/FONT-CREDITS.md`).
2. Link it from the hub `CREDITS.md`.

Bundling third-party work without credits will be rejected.

## Opening a Pull Request

- Target the `main` branch.
- Keep PRs focused on a single concern.
- Reference the related issue (e.g., `Closes #12`).
- State the verification steps you performed.

Thank you for helping improve this project for the Ummah. 🌙
