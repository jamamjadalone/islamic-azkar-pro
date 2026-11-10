# Contributor & Agent Guidelines (Islamic Azkar Pro)

This file is a pointer, not a duplicate. The canonical rules live in **`AGENTS.md`** — read that file first and follow it.

Key rules for any agent or contributor (full text in `AGENTS.md`):

1. **Communication**: Hinglish (Roman Urdu) or English only — never Arabic/Urdu script in chat.
2. **UI Lock**: The UI architecture in `index.html` is 100% frozen — see the frozen components list in `AGENTS.md` Cardinal Rule 2 and the permitted-additions list below it.
3. **Adab**: cautious, contextual Hadith attribution only ("According to the contextual meaning of the narration...").
4. **No trademarks**: never mention commercial third-party apps or brands anywhere.
5. **Quran typography**: keep ornate verse brackets `﴿…﴾` and never strip waqf marks (`ۚ`, `ۙ`, `ؕ`).
6. **Media**: never inspect image binaries with file viewers.
7. **Service worker**: bump the cache version in `sw.js` whenever `index.html` or assets change.
8. **Repo organization**: screens in `pages/`, shared pieces in `components/`, persistence in `data/`, one job per file, ≤300 lines, check-before-create — see "Repo Organization Rules" in `AGENTS.md`.
