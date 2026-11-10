# tools/ — developer scripts

Node scripts that prepare, audit, or embed content in the app. Dev-time only —
the PWA never loads anything here. One job per script; see the table.

Common input: `../index.html` (read-only). Source data packs live in
`../data/source-packs/`.

| Script | One job |
|---|---|
| `i18n-audit.js` | Audit localization completeness across the app's 9 languages (`node tools/i18n-audit.js`). |
| `i18n-inventory.js` | Build the unique Urdu-only string inventory (input to language-pack authoring). |
| `uipack-dump.js` | Dump all UI i18n keys to `data/source-packs/uipack-skeleton.json` (base file for new language packs). |
| `uipack-merge.js` | Merge an authored language pack (`uipack-<lang>.json`, e.g. bn/ru/fa) into `index.html`. |
| `fazeelat-merge.js` | Build intro/fazilat translation rows from `intros-translations.json`. |
| `fazeelat-embed.js` | Embed intro/fazilat translations into `index.html`'s surah rows (merge with `--force` to overwrite). |
| `intros-extend-latin.js` | Extend `intros-translations.json` with id/tr/fr intro rows from their language files. |
| `rabbana-ref-i18n.js` | Localize the Rabbana duas' reference lines. |

Related conversion scripts live with their data: `../quran/full/tools/`.

Rules that apply when editing here: one job per file, ≤300 lines, check for an
existing script before adding a new one. Temporary one-off wiring scripts
(`tools/_*.js`) are git-ignored and must be deleted after use.
