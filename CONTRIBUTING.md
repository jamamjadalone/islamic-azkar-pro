# Contributing to Islamic Azkar Pro

Thank you for your interest in contributing! This project serves the Ummah with accurate, authentic Islamic adhkar and Quranic text, and we take correctness seriously.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs & Text Errors](#reporting-bugs--text-errors)
- [Submitting Text/Quranic Corrections](#submitting-textquranic-corrections)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Conventions](#commit-conventions)
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

## Opening a Pull Request

- Target the `main` branch.
- Keep PRs focused on a single concern.
- Reference the related issue (e.g., `Closes #12`).
- State the verification steps you performed.

Thank you for helping improve this project for the Ummah. 🌙