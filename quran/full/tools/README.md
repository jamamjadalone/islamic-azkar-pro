# tools/ — Quran text converters

Dev-time conversion scripts that generate the JSON files in `../full/`.
They read raw source text and write per-surah JSON; the app consumes the
finished JSON files and never runs these scripts.

| Script | One job |
|---|---|
| `tanzil-convert.js` | Convert raw Uthmani source text into `../full/surah_N.json` files + `surahs_meta.json`. |
| `indopak-convert.js` | Convert Pakistani Mushaf text into `../full/surah_N_ip.json` files + credits doc. |

Rules when editing here: one job per file, ≤300 lines, keep waqf marks and
ornate verse brackets intact (see `AGENTS.md` cardinal rules 5 and 7).
