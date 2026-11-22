# Task formats and rules

Keep every heading, column, id, type and status exactly as written here, in English, whatever language the content is in. `/lwh-run` and the other skills read them.

## The index: `docs/tasks/index.md`

One line per task. Status lives only here.

```markdown
| ID  | Title                  | Milestone | Type   | Depends on | Status | Note |
|-----|------------------------|-----------|--------|------------|--------|------|
| T00 | Set up the project     | M0        | build  | none       | todo   |      |
| T01 | Visitors can sign up   | M1        | build  | T00        | todo   |      |
| T02 | Review milestone 1     | M1        | review | T01        | todo   |      |
```

- **Type:** `build`, `you`, `review`, `security` or `fix`. A `fix` task is created for a finding, by a review task or by `/lwh-security-check`. `/lwh-make-tasks` never writes one.
- **Status:** `todo`, `in-progress`, `done`, `blocked` or `skipped`. `skipped` is only for a `you` task the user chose not to do yet.
- **Note:** a short reason for `blocked` or `skipped`, or what the task waits on. Empty otherwise.
- Ids never change once written. New tasks take the next free number.

Above the table, list the milestones with one line each: what the user can try when it is finished.

## One task: `docs/tasks/T07-reset-password.md`

```markdown
# T07: Users can reset their password

Milestone: M2 · Type: build · Depends on: T05

## What to build
What works when this is done, from the user's side. Not a list of files or layers.

## Blocks
Account recovery, Brute force

## Done when
- [ ] A user who asks for a reset gets an email with a link that works once
- [ ] An expired or reused link shows a clear message
- [ ] (Brute force) Repeated reset requests for one address are slowed down

## How to test
- Code tests: what to cover
- App test: the steps to drive in the real app (for a web app, in a browser at every width the plan needs)
- By hand at the milestone: anything only a person can judge

## Design
Only when `docs/design.md` exists and the task builds a screen. The mockup file, for example `docs/design/screens/reset-password.html`, and the shared components this task builds or reuses. For a screen with no mockup of its own: the mockup it follows, and the shared components to build it from.

## Needs from you
None, or the id of the `you` task it depends on.
```

Rules for writing a task:

- Write "What to build" as behaviour the user would notice. Leave out file names and code; they go out of date as soon as the build starts.
- Every "Done when" box must be something a test can prove. "Works well" is not a check. "A wrong password shows an error and does not log in" is.
- Cover the unhappy path in the boxes, not only the case where everything goes right.
- A box that comes from a block starts with the block's name in brackets.
- Only blocks with proof `test` become boxes here. Blocks with proof `review` go into the milestone's review task, and cross-cutting blocks into `CLAUDE.md`.
- A task with a "Design" section starts from its mockup: the worker reuses the mockup's markup and styles, with real data in place of the example content. The mockup is a starting point, not a picture to match exactly. Where the mockup and `docs/design.md` disagree, `docs/design.md` wins.

## T00: set up the project

T00's boxes are the "Done when" checks of every block with scope `setup` that applies to this app, copied as they are, each with the block's name in brackets. Add stack-specific boxes if the plan needs them.

Two of those boxes put scans into the check command from the first commit: Dependency scanning and Secret scanning. Say this under "How to test":

- Each scanning tool is installed inside the project, for example as a dev dependency, or run through the package manager. If the only way is a global install, add a `you` task with the exact command, and make T00 depend on it.
- The secret scan never reads or prints the real env file.
- A finding that cannot be fixed in the project, such as a problem deep in a dev tool, is listed in `CLAUDE.md` with its reason and ignored by name, so the check still passes. Nothing else is ignored.

### T00 for an existing app

When the app already exists, T00 only puts a safety net in place. It does not restructure old code.

- Keep the `setup` boxes for git, secrets, env vars, `CLAUDE.md` and the two scans.
- What the scans find in the old code or its history does not block T00. Each finding becomes its own task, and a key found in the history becomes a `you` task to replace that key. Until those are done, the findings are listed in `CLAUDE.md` and ignored by name.
- Instead of the full browser-test box, use: "(Playwright) One smoke test starts the app and loads its main page, and the check command runs it." For an app without screens, the smoke test starts it and makes one real request.
- The check command wraps the tests the project already has, plus that smoke test.
- "Code organisation" rules apply to new code only.
- Propose any cleanup of old code as separate tasks that the user chooses. No feature task depends on them.

## `CLAUDE.md`: Rules every change follows

```markdown
## Rules every change follows
- (Authorization) Every action checks on the server that this user may do it. Hiding a button does not count as the check.
- (Input validation) Every input is checked on the server for type, size and allowed values. Bad input gets a clear error and is never saved.
- ...
```

One line per cross-cutting block that applies to this app, copied from its "Done when". Keep the section short; it is read at the start of every worker.

When `docs/design.md` exists, add this line, and a link to `docs/design.md` next to the link to the plan:

```markdown
- (Design) Every screen uses the colours, type, spacing and shared components described in docs/design.md. No one-off values. A piece that a second screen needs becomes a shared component.
```

## A `you` task

```markdown
# T03: Create a payments test account

Milestone: M2 · Type: you

## What you need to do
Numbered steps a beginner can follow, one action per step.

## What to give back
Exactly what is needed and where it goes, for example which key into which line of the env file. Never paste a secret into a task file or a chat message.
```

For a paid service, add a step: "Set a spending limit of the amount you chose in the provider's dashboard."

## A `review` task

```markdown
# T12: Review milestone 2

Milestone: M2 · Type: review · Depends on: T08, T09, T10, T11

## What to review
The area, what to try to break, and the plan sections it must match.

## Blocks to check
- [ ] (<Block name>) <its check, copied from the part file>
- ...
- [ ] Every rule in CLAUDE.md's "Rules every change follows" holds for this milestone's work
- [ ] (Screens) Each screen this milestone built was opened in a real browser at every width the plan needs: phone, desktop or both. Nothing overflows, overlaps or is cut off, the text is readable, it is clear what to do next, and its empty, loading and error states show.
```

Leave out the "Screens" box for an app without screens. It is about the screens that were really built: the reviewer looks at them as a person would, and does not compare them with the mockups.

The reviewer writes each finding as a failing test and a new task. It does not fix anything itself. A finding that only a person can see, such as two things that look misaligned, becomes a task with a clear description and a screenshot path in place of a failing test.
