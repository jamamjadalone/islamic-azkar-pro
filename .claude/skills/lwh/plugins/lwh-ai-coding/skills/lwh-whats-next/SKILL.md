---
name: lwh-whats-next
description: Shows where an lwh project stands (plan, challenge, design, tasks, build, security) and the one command to run next. Use when the user asks what to do next, or how to start building an app, in a project that has docs/plan.md, docs/tasks/ or .work/, or when they ask about the lwh skills.
---

# What's next

Tell the user where their project is and the one command to run now. Read only the small state files; do not read code or task bodies.

The project folder is `${CLAUDE_PROJECT_DIR}`. Look only there, never in other folders this session can see.

## First, a guard

If none of `docs/plan.md`, `docs/tasks/` or `.work/` exists in the project folder, and the user did not ask about these skills or about starting an app, say nothing more than one line: "No lwh project here. `/lwh-guide` explains these skills." Then stop, and carry on with whatever the user was doing.

Otherwise read `${CLAUDE_SKILL_DIR}/house-style.md` and follow it.

If the project folder is the user's home folder, the Desktop, Documents or Downloads, say in two lines that an app needs its own folder, and that they should open Claude Code there.

## Work out where the project is

Read the first line of `.work/RUN.md` (its `state:`), the plan's frontmatter, whether `docs/design.md` exists, the rows of the task index that are not `done`, and the first three lines of `docs/security-report.md`. Check in this order and stop at the first match:

| What you find | Where they are | Next command |
|---|---|---|
| `.work/STOP` exists and `RUN.md` says `state: running` | A stop was requested and the run is winding down | Nothing. It stops by itself at the next clean point |
| `RUN.md` says `state: running` | A run is going, or it crashed | If no window is running it, `/lwh-run` recovers and continues |
| `RUN.md` says `state: paused` or `stopped` | A run stopped partway | `/lwh-run` continues it |
| `.work/INDEX.md` with tasks not done | A run over the user's own task list is partway | `/lwh-run` |
| No `docs/plan.md`, no code | Starting from an idea | `/lwh-plan-app`, or `/lwh-guide` for a tour first |
| No `docs/plan.md`, but there is code | An existing app with no plan | `/lwh-plan-app` (it reads the code first) |
| Plan with status `draft` | Planned or changed, not yet checked for holes | `/clear`, then `/lwh-challenge-plan` |
| `docs/design/` holds mockups, no `docs/design.md` | A design was started and not finished | `/lwh-design` picks it up |
| Plan with status `challenged`, the app has screens, no `docs/design.md` | Plan is solid, the look is not decided | `/lwh-design` (recommended). `/lwh-make-tasks` skips it |
| Plan with status `challenged` | Plan is solid, not yet split into tasks | `/lwh-make-tasks` |
| `security` tasks all `done`, and no report, or a report whose `Security tasks` line does not name them | The reviewers have finished, and nothing is fixed yet | `/lwh-security-check` (writes the report and asks what to fix) |
| The report's `Waiting for fixes` line names tasks, and each is `done` or `blocked` | The chosen fixes were made | `/lwh-security-check` (brings the report up to date) |
| `you` tasks with status `todo` or `skipped` | Something is waiting on the user | Name them in one line each, then `/lwh-run`, which walks through the new ones, and through a skipped one when the user names it |
| Tasks with status `todo` or `in-progress` | Ready to build, or partway through | `/lwh-run` |
| Only `blocked` tasks left | The run got stuck | Name them with their notes, then `/lwh-run`, which gives each one more try |
| All tasks `done`, no `security` tasks | Built, not security tested | `/lwh-security-check` |
| A report, and commits since the one it covers that are not its own fixes | New code since the last security check | `/lwh-security-check` |
| Everything done and reported | Finished | Say plainly that these skills do not put the app online, and list the plan's "Before going live" blocks, one line each. Then `/lwh-plan-app`, to add the next feature |

## Tell the user

In five lines or fewer:

- where the project is, in plain words
- the next command and what it does
- progress, if tasks exist: how many are done out of how many, and the current milestone

If the user asks what the commands are, give one line each:

- **`/lwh-plan-app`:** an interview that turns the idea into a written plan.
- **`/lwh-challenge-plan`:** looks for holes in the plan and fixes them before anything is built.
- **`/lwh-design`:** builds mockups to choose from and settles how the app looks, before it is built. Recommended for apps with screens.
- **`/lwh-make-tasks`:** splits the plan into small tasks, each with its tests.
- **`/lwh-run`:** gets the tasks done and verified, as many at a time as the user chooses. Works on any task list.
- **`/lwh-stop`:** stops a run cleanly at the nearest safe point. Run it from a second window.
- **`/lwh-security-check`:** has fresh reviewers attack the app, reports what they find as high, medium and low, and fixes what the user chooses.
- **`/lwh-guide`:** a short tour of these skills, and answers to questions about them.
