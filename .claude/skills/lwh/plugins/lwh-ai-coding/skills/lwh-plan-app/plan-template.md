# Plan template

Write `docs/plan.md` in exactly this shape. Keep every section short and in plain language. A new builder who reads only this file should be able to build the right app.

Keep the frontmatter and every heading exactly as written here, in English, whatever language the content is in. The other skills find sections by these headings.

```markdown
---
status: draft
app_type: <web, mobile, desktop, or other>
stack: <the chosen stack>
---

# <App name>

## What we're building
Two or three sentences, in the user's own words.

## Who it's for

## First version
**In:**
- ...

**Not yet:**
- ...

## What people can do
One heading per screen, with the actions on it.

## What the app remembers
The things it stores and how they relate, in plain words. Say who can see and change each thing. No schema.

## Stack
The choice, and one line on why.

Code organisation: one line on how the code is split, for example "screens, business rules and data access in separate folders, one folder per feature".

## Blocks this app needs
| Block | Why this app needs it | Stage |
|---|---|---|

**Before going live:** a short list of block names.

**Later, when the app has users:** a short list of block names.

## Technical decisions
- <choice>: <one-line reason> (chosen by the user / left to Claude / left to Claude, during the design / left to Claude, while writing the tasks / left to Claude, during the build)

## Things only you can do
- <account to open, key to get, purchase to make>, and what exactly is needed from it

## How we'll know it works
The kinds of testing that apply, one line each.

## Changed since the last challenge
Empty unless the plan was changed after it was challenged. One line per change.

## Challenge notes
Empty until the plan is challenged.

## Open questions
Must be empty before tasks are written.
```
