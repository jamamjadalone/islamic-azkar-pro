# File contract

Every skill name starts with `lwh-`.

The skills never rely on an earlier conversation. Each one reads files, does its job, writes files, and ends by telling the user which command comes next. This page defines those files. If a skill and this page disagree, this page wins.

Every skill works only inside the project folder, `${CLAUDE_PROJECT_DIR}`, and never looks in other folders the session can see. The planning skills, `/lwh-run` and the router refuse to work in the user's home folder, the Desktop, Documents or Downloads, and ask the user to open Claude Code in a folder of the app's own.

## The flow

| Step | Working name | Reads | Writes |
|---|---|---|---|
| 1 | lwh-plan-app | the user's answers, existing code if any | `docs/plan.md` |
| 2 | lwh-challenge-plan | `docs/plan.md`, blocks index | `docs/plan.md` (updated) |
| 3, optional | lwh-design | `docs/plan.md`, a reference from the user, existing styles if any | `docs/design.md`, `docs/design/`, small decisions into `docs/plan.md` |
| 4 | lwh-make-tasks | `docs/plan.md`, `docs/design.md` if it exists, blocks index | `docs/tasks/`, the rules in `CLAUDE.md`, small decisions into `docs/plan.md` |
| 5 | lwh-run | the task index, `you` task bodies, `.work/` | the work, commits, `.work/`, accepted decisions into `docs/plan.md` |
| 6 | lwh-security-check | code, `docs/plan.md`, blocks index, git log | `security` tasks in `docs/tasks/`, then `docs/security-report.md` and the `fix` tasks the user chose |
| during a run | lwh-stop | `.work/RUN.md` | `.work/STOP` |
| any time | lwh-whats-next (router) | plan status, task index, `.work/RUN.md`, report | nothing |
| any time | lwh-guide | the other skills' files | nothing |

Every skill except the router has `disable-model-invocation: true`, so it adds nothing to Claude's context until the user runs it. The router stays visible so Claude can point a beginner to the right command. Its description names the lwh files, and its first step is a guard, so it stays quiet in projects that have none of them.

`lwh-run` is not tied to the rest of the flow. It runs any task list, including one the user wrote and tasks that are not about code. When the tasks did not come from `lwh-make-tasks`, it builds its own index at `.work/INDEX.md` and leaves the user's task files in their own format.

The plan and challenge skills run in the main session, because they ask the user questions and workers cannot. The challenge runs after `/clear`, so it judges the written plan, not the conversation that produced it.

## Language

Files keep a fixed shape in every language: frontmatter keys and values, section headings, task ids, types, statuses, index columns and block names stay exactly as in the templates. Everything a person reads as content is written in the user's language. Block names are taught as the English term with a translation the first time.

## Files in the user's project

```
docs/
  plan.md              the plan (committed)
  design.md            the chosen design, only when /lwh-design was run (committed)
  design/              the mockups (committed)
    design.css         every colour, size and space as a named value, and the shared components
    mockup.css, mockup.js   for the mockups only (state labels, a light/dark switch); never brought into the app
    index.html         links to every screen mockup
    screens/           one mockup per screen, and _shell.html, the frame they share
    directions/        the directions the user chose from, with their own index.html
  security-report.md   what the security check found, how it rated it, and what was fixed (committed)
  tasks/
    index.md           one line per task: the only place status lives
    T00-setup.md       one file per task
    T01-...md
.work/                 run state (gitignored)
  RUN.md               state line, then the user's pre-flight answers
  HANDOFF.md           overwritten by each worker; first line names the worker
  LOG.md               one line per worker
  DECISIONS.md         one line per judgment call, with its outcome once the user saw it
  REPORT.md            written at each pause and at the end
  INDEX.md             the task index, only when the tasks are not in docs/tasks/
  STOP                 a stop request: "after-task" or "now"; deleted once the run has stopped
  archive/<date-time>/ the files of each finished run
.claude/settings.local.json   the narrow allow rules, if the user accepted them
CLAUDE.md              names the check command, links to docs/plan.md, lists the rules every change follows
```

## `docs/plan.md`

Frontmatter:

```yaml
status: draft | challenged | tasked
app_type: web, mobile, desktop, or anything else (free text)
stack: whatever the plan chose (free text)
```

The skills work with any stack. Plan recommends one that fits the app and the user, explains why in one line, and the user can choose something else.

Sections, in this order. Every section is short and in plain language.

1. **What we're building.** Two or three sentences, in the user's own words.
2. **Who it's for.**
3. **First version.** Two lists: in, and not yet.
4. **What people can do.** The screens, and the actions on each.
5. **What the app remembers.** The data, described as things and how they relate. No schema.
6. **Stack.** The choice and one line on why, then one line on how the code is organised.
7. **Blocks this app needs.** A table: block, why this app needs it, stage. Then the "Before going live" and "Later" lists. Only checkable blocks: practices and concepts are never listed.
8. **Technical decisions.** Each technical choice with a one-line reason, and who made it: the user, Claude, or Claude during the build (accepted by the user at a pause, or recorded there when it is only about how the code is built). Small decisions made later are added here too, marked "during the design" or "while writing the tasks", and written into the part of the plan they change. The user is shown each one. The plan's status does not change for them.
9. **Things only you can do.** Accounts to open, keys to get, purchases, spending limits for paid services.
10. **How we'll know it works.** Which kinds of testing apply: code tests, browser tests, phone width, and so on.
11. **Changed since the last challenge.** One line per change made after the plan was challenged. The next challenge reviews only these, then empties the list.
12. **Challenge notes.** What each challenge changed and why. Never cleared.
13. **Open questions.** Must be empty before tasks are written. A question leaves this list only by being answered or moved to "Not yet" with the user's yes.

Changing a plan edits only the affected sections, lists the change under "Changed since the last challenge", and sets status to `draft`. A change to wording only keeps the status.

### Interview pace

Plan starts by asking how deep to go: Quick (about 10 questions, Claude proposes the rest), Thorough, or At my own pace. "Decide the rest" works at any time in any interview. Choices with one sensible answer are shown together in one chat message to change, not asked one by one.

### Chat or question box

Every skill picks the channel by what the user has to do, as `shared/house-style.md` sets out. A question box holds a short choice that makes sense on its own. Anything the user has to read and react to (a summary, a list, picks, milestones, build decisions) or do (the steps of a `you` task, a command) is a chat message that ends the turn, and the user replies in their own words.

## `docs/design.md`

Optional. It exists only when the user ran `/lwh-design`, which is recommended for an app with screens and never required. It has no frontmatter and no status. The design skill writes it once the direction is chosen and every screen is mocked up, before the user's last look, and updates it with each change they ask for. Mockups in `docs/design/` with no `docs/design.md` mean a design that was started and not finished.

Sections, in this order: **Direction**, **References**, **Colours**, **Typography**, **Spacing and shape**, **Components**, **Screens**, **Words**, **Do and don't**, **Where the values live**, **Decisions**.

- The file says what was chosen and how to use it. The values live in `docs/design/design.css`. T00 brings them into the app's own styles, and from then on the app's styles are the source.
- The mockups are real HTML pages that open without a build step, written the way the stack writes its screens, so workers reuse the markup and styles. They are a starting point, not a picture to match exactly. Each mockup shows the main state of its screen in full, and every other state as only the part that changes, so the files stay small enough for a worker to read before building. Where a mockup and `docs/design.md` disagree, `docs/design.md` wins.
- With more than about eight screens, the user chooses between mockups of the main screens and mockups of all of them. A screen with no mockup is listed in "Screens" with the mockup it follows, and its task names that mockup.
- A reference the user brings gives the style only: colours, type, spacing, feel. Never its logo, name, text, images or icons.
- When it exists, make-tasks adds the shared styles to T00, a "Design" section to every task that builds a screen, and one Design rule to `CLAUDE.md`.
- Nothing compares the built screens with the mockups automatically. Each milestone review opens the screens that were really built, at the widths the plan needs, and reports what a person would see as wrong. What the user reports after trying the app becomes a task.

## Tasks

### `docs/tasks/index.md`

```
| ID  | Title                          | Milestone | Type   | Depends on | Status | Note |
|-----|--------------------------------|-----------|--------|------------|--------|------|
| T00 | Set up the project             | M0        | build  | none       | done   |      |
| T01 | Visitors can sign up           | M1        | build  | T00        | todo   |      |
| T02 | Review milestone 1             | M1        | review | T01        | todo   |      |
```

- Status is one of `todo`, `in-progress`, `done`, `blocked`, `skipped`. `skipped` is only for a `you` task the user chose not to do yet; tasks that depend on it wait.
- `Note` holds a short reason for `blocked` or `skipped`, or what the task waits on.
- Status lives only here. The orchestrator reads this file and never reads task bodies, except `you` tasks.
- New tasks from reviews, from workers and from pauses are added as new files and new lines. Existing IDs never change.

### One task file

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

## Needs from you
None, or the id of the `you` task it depends on.
```

Rules:

- **Types:** `build` (a worker builds it), `you` (only the user can do it), `review` (a fresh worker inspects, with no access to earlier conclusions), `security`, `fix` (created for a finding, by a review task or by `/lwh-security-check`, and built like a `build` task).
- **Self-contained:** each task carries the full text of its block checks, because the runner reads only the task. Cross-cutting checks live in `CLAUDE.md`, which every worker reads first.
- **Slices:** each build task delivers something that works end to end. No "all the database first" tasks.
- **Size:** one slice the user can understand, with a handful of boxes and about one commit's worth of change. A task may span several workers, who hand off to each other: unfinished at a handoff is normal.
- **Done:** a task is done only when every box is proven: by a run of the tests, or by an independent reviewer. Never by the builder reading its own code.
- **Milestones:** each ends with something the user can try, a review task, a full check run by the orchestrator, and a pause.
- **T00** always sets up the project. See "Project setup" below.
- All `you` tasks are walked through before a run starts. Anything a worker finds that only the user can resolve becomes a new `you` task, and the stuck task depends on it.

## The check command

Every project has one command that runs everything: lint, types, code tests, browser tests. T00 creates it and `CLAUDE.md` names it. The orchestrator runs it itself at each milestone, in the background, reads only its last lines, and does not accept a worker's word for the result. Tests that drive the app start their own copy of it and never reuse one that is already running.

## Outside services and money

Tests and trials may use outside services in their test or sandbox mode, with test keys: a payment provider's test mode, a webhook forwarder, a real AI model. A run never touches a real account, real money, real users or a live deployment, and never pushes or deploys.

For each paid service, pre-flight asks the user for a budget, and adds a step for the user to set that limit in the provider's own dashboard, because no worker can see the bill. Workers make only the paid calls a task's own checks need.

## `.work/` state files

| File | Rule |
|---|---|
| `RUN.md` | First line `state: running`, `paused`, `stopped` or `finished`. Then how far to go, when to pause, skipped items, budgets, handoff threshold (default 30%), where the index is, the reference documents, how work is verified |
| `HANDOFF.md` | Overwritten each time. First line `Worker <N> · <time>`. Then done, in progress, exact next steps, open problems, check command result |
| `LOG.md` | One line per worker: time, worker number, each task with done / progressing / stuck, verification result, blocks used |
| `DECISIONS.md` | One line per decision: `[technical]`, `[product]` or `[plan]`, what, why, worker and task. The outcome is added at the next pause: `accepted` or `changed: <task id>` for a decision the user saw, `recorded` for a purely technical one written into the plan without asking, `noted` for a line that was not a decision |
| `REPORT.md` | What exists now, how to try it, which blocks were used and why, what's next, which `you` tasks wait |

One line means one line. These files are read on every dispatch, so they must stay small.

### Run states

- `/lwh-run` with no `RUN.md`, or `state: finished`, is a fresh run with a full pre-flight.
- `paused` or `stopped` resumes. It still walks through any new `you` tasks.
- A `skipped` `you` task is named in one line at the start of a run, with what waits on it, and walked through only when the user gives its id.
- `running` at start means another window is running it, or it crashed. The orchestrator asks; a crash gets a recovery worker first.
- A finished run moves its files into `.work/archive/<date-time>/` and leaves a `RUN.md` with `state: finished`.
- A later run in a project where `lwh/work` already exists switches to it and merges the main branch into it first.
- `/lwh-stop` writes `STOP` only when the state is `running`.

### How a run keeps going

- One worker at a time. The orchestrator waits for each worker to finish before it does anything else, whether the worker runs in the foreground or the background.
- Each worker gets an allowed list of tasks, cut off at the next pause point or the scope limit, and never starts a task outside it.
- A scope that names particular tasks, one milestone or one type of task limits the run to those, even when an earlier milestone is unfinished.
- Before each dispatch the orchestrator commits anything left uncommitted as `wip: left by worker <N>`. No one runs `git reset --hard`, `git clean`, `git checkout -- .`, a force push or a branch delete.
- A worker reports each task as `done`, `progressing` or `stuck`. Only two `stuck` reports in a row block a task. A blocked task gets one last try at the end with its full text and the failure notes.
- A milestone counts as finished for pauses when every task in it is `done`, `blocked` or `skipped`.
- The orchestrator keeps its own context small (only rows not done, only the end of check output, browser walkthroughs in a subagent), and after any compaction re-reads its skill and `RUN.md`. At a pause after a long stretch it suggests `/clear` then `/lwh-run`.
- To stop, the user runs `/lwh-stop` in a second window. Esc in the run's window cuts a worker off mid-change.
- At the end, the orchestrator offers to merge the work branch `lwh/work` into the main branch on the user's computer.

## Blocks index (ships inside the skills)

```
blocks/
  index.md        every block: name, applies when, stage, kind, proof, scope
  <part>.md       one file per part, with the full entries
```

Each skill that picks or checks blocks has its own copy, in its own folder: `lwh-plan-app`, `lwh-challenge-plan`, `lwh-make-tasks` and `lwh-security-check`. Skills read `index.md` to pick blocks, then load only the part files they need.

One entry:

```markdown
### Brute force
- What: Stop attackers from guessing passwords by trying again and again.
- Applies when: users log in with a password.
- Stage: day-one-if
- Kind: checkable
- Proof: test
- Done when: Repeated wrong passwords for one account, or from one source, are slowed down or locked out.
```

- **What** is one plain sentence that says what the block does.
- **Stage:** `day-one` (every app), `day-one-if` (from the start when the feature exists), `go-live` (before real users reach it), `with-users`, `at-scale`, `any` (a concept, explained when the term comes up).
- **Kind:** `checkable` (a test or a reviewer can prove it), `practice` (a way of working, such as Plan first; never a box), `concept` (something to understand, such as JSON; never put in a plan or turned into a check).
- **Proof**, for every block with a check: `test` (a box in the build tasks for its feature), `review` (a box in the milestone's review task, judged by a fresh reviewer). Dependency scanning and Secret scanning are `setup` blocks with proof `test`: T00 puts both scans into the check command, and `/lwh-security-check` runs them again and checks what they ignore.
- **Scope:** `setup` (a box in T00), `cross-cutting` (a line in `CLAUDE.md`'s "Rules every change follows", checked by every milestone review), or blank (the tasks that build its feature).
- **Done when** is written at behaviour level so it holds on every stack. Version 1 has it only for `day-one` and `day-one-if` blocks.
- `scripts/blocks-meta.json` is the only source, written by hand. The folders are generated from it, so never edit them by hand. `node scripts/build-blocks.mjs` builds every copy, checks every field, and fails on a bad value. `--check` reports whether every copy is up to date. `--from-book <book.html>` compares the blocks with the book and changes nothing.
- First use of a block in front of the user shows the one-liner.
- No links to the book, courses or website anywhere in the skills or their output.

## Project setup (T00)

The skills ship no starter and assume no stack. Before T00 runs, `/lwh-run` checks that git, the git identity and the stack's runtime are installed, and in a new project runs `git init`, writes a first `.gitignore`, and creates the work branch `lwh/work`.

T00 then sets the project up with the stack's own official tooling. Its boxes are the "Done when" checks of every `setup` block that applies, copied as they are: Git, Branches, Env vars, Secrets, CLAUDE.md, and venv or Playwright where they apply. Together they cover a check command that passes, one code test, one test that drives the real app, and a `CLAUDE.md` that names the check command, links to the plan and lists the rules.

If the user already has an app, T00 only puts a safety net in place: git, secrets, env vars, `CLAUDE.md`, and a check command that wraps the existing tests plus one smoke test that the app starts. Code organisation rules apply to new code. Cleanup of old code is offered as separate, optional tasks that nothing depends on.

## Security check

The check has three parts, with a run between them.

1. **Find.** `/lwh-security-check` writes `security` tasks in a milestone of their own, and names the command that runs only that milestone. A run sends a fresh reviewer at each task. A reviewer writes its findings into its own task file, with a failing test for each high or medium one. It creates no fix task and fixes nothing.
2. **Report and choose.** `/lwh-security-check` writes `docs/security-report.md` and asks the user what to fix. High and medium findings are fixed unless the user says otherwise. A low finding is fixed only when the user picks it. Each chosen finding becomes a `fix` task.
3. **Close.** After a run has made the fixes, `/lwh-security-check` brings the report up to date.

Findings are rated against the app as it is really used, and the recommendation follows the level:

| Level | Meaning | Recommendation |
|---|---|---|
| high | Someone who should not be able to can do the damage the user named, or reach private data, money or another person's account, with nothing special needed | fix now |
| medium | Real damage, but only under a special condition | fix before going live |
| low | Hardening, with no known way to do harm in this app | leave |

A finding must say what an attacker gains. A good practice that was skipped, with nothing to gain, is low at most.

The report starts with three lines that the skills read:

```
Covers commit: <id>
Security tasks: T53, T54, T55
Waiting for fixes: T90, T91
```

- `Waiting for fixes` is `none` when no chosen fix is open.
- A finding's state is `open`, `to fix: <task id>`, `fixed: <task id>` or `left by your choice`.
- When there are commits since `Covers commit`, other than the report's own fixes and changes to `docs/`, a new check is due, for the changed areas only. The router uses the same test.
- The formats of a security task, of a fix task made from a finding, and of the report are in the skill's `security-template.md`.

## Going live

These skills plan, build and check an app on the user's computer. They do not put it online. The plan's "Before going live" list is shown to the user at the end, so they know what is left. A go-live skill is the planned next step.

## This repo

```
.claude-plugin/marketplace.json     one marketplace, several plugins
plugins/
  lwh-core/                         lwh-run and lwh-stop: usable with any task list, by any skill family
    .claude-plugin/plugin.json
    skills/<skill>/
      SKILL.md
      house-style.md                copied from shared/
  lwh-ai-coding/                    the planning flow for apps; depends on lwh-core
    .claude-plugin/plugin.json
    skills/<skill>/
      SKILL.md
      house-style.md                copied from shared/
      blocks/                       generated by scripts/build-blocks.mjs, in the skills that read blocks
shared/
  house-style.md                    how every skill talks to the user; the one place to edit it
scripts/
  blocks-meta.json                  the blocks, written by hand: the only source
  build-blocks.mjs                  builds each skill's blocks/ from blocks-meta.json
  sync-shared.mjs                   copies shared/ into every skill
docs/
  file-contract.md                  this page
  review-decisions.md               the decisions behind this version
```

- **Two ways to install.** As plugins, from this repo's marketplace, or as plain skills with `npx skills add`, which copies each skill folder into the user's skills folder. The README gives both, and tells users to pick one.
- **Versions.** Each plugin.json has a `version`. Bump it to release: plugin users who turned on auto-update for this marketplace get it, and commits in between reach none of them. Auto-update for a marketplace that is not official is turned on by the user, under `/plugin` > Marketplaces, so the README says how. `npx skills update` ignores the version and takes the latest commit, so `main` gets release commits only.
- **Each skill is self-contained.** A skill reads only its own folder, through `${CLAUDE_SKILL_DIR}`, and never `${CLAUDE_PLUGIN_ROOT}`, which does not exist when it is installed with `npx skills`. Anything several skills need is kept once in `shared/` or `scripts/` and copied into each skill by the two scripts. The one exception is `lwh-guide`, which reads the other skills' files as its neighbours and answers from its own summaries when one is missing.
- **Dependencies.** `lwh-ai-coding` lists `lwh-core` under `dependencies`, so installing it installs and enables `lwh-core` too. A new skill family does the same.
- **Tasks stand on their own.** `lwh-run` cannot read the blocks files, so every task carries the text of its block checks, and the cross-cutting ones are in `CLAUDE.md`. The same rule lets it run task lists it has never seen.
