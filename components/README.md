# components/ — shared pieces

Reusable pieces used by more than one screen live here.

Rules (from `AGENTS.md`, rules 8–13):

- One job per file; a component file does exactly one thing.
- Max 300 lines.
- Before writing a new component, check if a similar one already exists here or in
  `index.html` (the frozen monolith holds the current UI — never copy code out of it,
  reference the pattern instead).
- Screen-specific code belongs to the screen file in `../pages/`, not here.
