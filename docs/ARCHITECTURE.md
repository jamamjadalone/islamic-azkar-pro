# Architecture — beginner map (Islamic Azkar Pro)

Read this first. Then read `AGENTS.md` (the rules). The app itself is deliberately simple: it is one standalone PWA file plus data.

## The app (runtime, at repo root — do not move)
| File | What it is |
|---|---|
| `index.html` | **The entire app.** UI shell, screens, dua/Quran datasets, and all 9 languages. ~1.3 MB frozen monolith — the single allowed exception to the 300-line rule. |
| `sw.js` | Service worker: offline caching. Version string (`azk-pro-v…`) bumps with every release. |
| `manifest.json` | Installability (Add to Home Screen) for Android/iOS/Desktop. |
| `404.html`, `CNAME`, `robots.txt`, `sitemap.xml` | GitHub Pages hosting bits. |

## Content packages (runtime-referenced paths — never move or rename)
| Folder | What it is |
|---|---|
| `quran/` | Quran text: `full/` per-surah JSON (standard + indopak `_ip` variants), `15line/`, `16line/` para mushafs, indexes. Fetched at runtime by `index.html`. |
| `fonts/` | Offline Quranic fonts (TTF/WOFF). |
| `assets/` | Wallpapers + share-card art. |
| `icons/` | App icons for the manifest. |

## Developer tooling (dev-time only — app never loads these)
| Location | What it is |
|---|---|
| `tools/` | Node scripts: i18n audits, content merge/embed helpers. Subfolders are semantic — see `tools/README.md`. |
| `data/source-packs/` | JSON source packs (intros, UI language packs) edited by humans/agents, consumed by `tools/` merge scripts. |
| `.github/workflows/ci.yml` | CI: syntax-validated on every push (checks `sw.js`). |

## Where new code goes (see AGENTS.md rules 8–15)
- New **screen** → `pages/`
- New **shared piece** → `components/`
- New **saving/loading** logic → `data/`
- **Check first**: search for an existing pattern before writing anything new.
- `index.html` fixes stay inside `index.html` (frozen file, additive edits only).

## Where things changed historically
- `CHANGELOG.md` — user-facing release notes per phase/commit.
- Git tags (`azkar/*`, `asma/*`, `repo/*`) — each released phase is tagged.

## Untouched-but-present
- `android/` — Android widget/session work-in-progress; git-ignored, never committed from the web sessions.
