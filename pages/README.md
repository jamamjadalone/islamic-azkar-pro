# pages/ — screens

One folder, one job: standalone screens live here.

Rules (from `AGENTS.md`, rules 8–13):

- A new screen/view goes here as its own file — never deep inside a tools folder.
- One job per file, max 300 lines.
- Before creating a new screen, search `index.html` and `components/` first — screens
  there may already do the job (the app's core screens live inside the frozen
  `index.html` monolith and cannot be moved out).

Sharable/reused building blocks (buttons, cards, services) do NOT go here — they go
in `../components/`.
