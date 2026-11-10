# data/ — saving, loading, and source data

Two kinds of files belong here:

1. **Persistence code** — anything that saves or loads app state
   (localStorage engines, import/export, schema migration). One job per file, max 300 lines.
2. **`source-packs/`** — JSON content packs that humans/agents author and
   `../tools/` merge scripts consume (UI language packs, dua intros). These are
   dev-time inputs, not runtime assets; the app does not fetch them directly.

Rules (from `AGENTS.md`, rules 8, 11):

- Runtime-referenced folders (`../quran/`, `../fonts/`, `../assets/`, `../icons/`)
  are content packages the monolith loads at runtime — they do NOT move here.
- Before adding a new pack, check `source-packs/` for an existing file to extend.
