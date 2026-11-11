# Contributing to Islamic Azkar Pro

Thank you for helping. This repo is deliberately simple; keep it that way.

## Setup

- No build step, no dependencies. The whole app is `index.html` + data.
- Serve locally and open in a browser (do not use `file:///` — the service
  worker needs http). Any static server works, for example:

  ```
  python -m http.server 8080
  ```

## Before you change anything

1. Read `AGENTS.md` — the canonical rules (frozen UI, waqf-mark integrity,
   reverent contextual attribution, no trademarks).
2. Read `docs/ARCHITECTURE.md` — where things live and why.
3. **Check before writing**: reuse/extend an existing file instead of adding
   a new one. New screens → `pages/`, shared pieces → `components/`,
   saving/loading logic → `data/`. One job per file, ≤ 300 lines
   (`index.html` is the single frozen exception).
4. Never reorganize a runtime path (`quran/`, `fonts/`, `assets/`, `icons/`,
   `index.html`, `sw.js`, `manifest.json`).

## Tests (all must pass)

- `node -c sw.js` — service worker syntax
- `node tools/i18n-audit.js` — localization completeness
- Quality guard script — full clean-up gate
- Live check: open the app, verify **0 console errors** and that the
  counter, a Quran section, and the settings modal still work

## Releases

- Any change to `index.html` or bundled assets requires a cache version bump
  in `sw.js`.
- Commits are small and single-purpose; released phases are git-tagged.

## Credits

Any third-party resource you introduce (text, font, art) must be credited
next to the resource and linked from `CREDITS.md`. Bundling without credits
will be rejected.

## Issues

Error reports on Quranic text or attributions are especially welcome —
please cite the exact location. Humans err; correction is a kindness.
