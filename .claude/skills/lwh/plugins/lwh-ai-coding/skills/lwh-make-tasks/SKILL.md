---
name: lwh-make-tasks
description: Split the written plan into small tasks, each with exactly what to build and how it gets tested, grouped into milestones.
disable-model-invocation: true
---

# Make the tasks

Turn `docs/plan.md` into the task files in `docs/tasks/`. The build follows these tasks exactly, so each one must say what to build and how to prove it works. You do not write code in this skill.

The project folder is `${CLAUDE_PROJECT_DIR}`. Read and write only inside it.

Read `${CLAUDE_SKILL_DIR}/house-style.md` first and follow it in every message.

## Before you start

- Read `docs/plan.md`. If there is no plan, name `/lwh-plan-app` and stop.
- If the plan's status is `draft`, tell the user it was never challenged, or was changed since, and recommend `/lwh-challenge-plan` first. Continue only if they choose to.
- If "Open questions" is not empty, ask those questions now and update the plan.
- **The design.** If `docs/design.md` exists, read it: the tasks follow it, as "Tasks that follow a design" below describes. If it does not exist, the app has screens, and no tasks have been written yet, say in two lines that `/lwh-design` plans the look first, with mockups to choose from, and that it saves building screens twice. It is recommended, not required: continuing without it is fine for a prototype or when the logic comes first. Continue if they choose to. If `docs/design/` holds mockups but there is no `docs/design.md`, the design was started and not finished: say so, and name `/lwh-design`, which picks it up where it stopped.
- Read `${CLAUDE_SKILL_DIR}/blocks/index.md`, then only the part files that hold the plan's blocks and the `setup` blocks. You need each block's "Done when" check, its proof and its scope.
- If the folder already has code, send a subagent to survey it and report in 30 lines or fewer what already exists, so you do not write tasks for finished work.
- If `docs/tasks/` already has tasks, you are adding to them. Keep every existing id and continue the numbering.

## Draft the breakdown

Read [task-template.md](task-template.md) for the formats and the rules. In short:

- **Milestones.** Group tasks into milestones. Each milestone ends with something the user can open and try.
- **T00** sets up the project. Its boxes are the "Done when" checks of every `setup` block that applies, copied as they are. For an app that already exists, see "T00 for an existing app" in the template.
- **Slices.** Each build task delivers one thing that works end to end, from the screen down to the stored data. Never a task like "build all the database tables".
- **Small.** Keep each task to one slice the user can understand, with a handful of boxes and about one commit's worth of change. Small tasks are easier to verify and review, a failure costs less, and the index shows real progress. A task may take several workers, who hand off to each other: that is normal, not a reason to split.
- **Order.** Give each task the tasks it depends on. Put the riskiest or least certain work early, when changing course is cheap.
- **Blocks become checks, by proof:**
  - `test`: the check becomes a box in each task that builds the block's feature. Copy its text. A task must stand on its own, because whoever runs it reads only the task, not the blocks files.
  - `review`: the check goes into the milestone's review task, under "Blocks to check". The worker who builds the code never ticks it.
  - `practice` and `concept` blocks never become boxes.
- **Cross-cutting blocks become project rules.** Blocks with scope `cross-cutting` that apply to this app are not copied into single tasks. Write their checks, one line each, into a section "Rules every change follows" in `CLAUDE.md`, which every worker reads first. Create `CLAUDE.md` with just that section and a link to `docs/plan.md` if it does not exist yet; T00 adds the check command. Keep the list to the blocks this app needs.
- **`you` tasks.** Every item under "Things only you can do" becomes a `you` task, and the tasks that need it depend on it. A paid service gets a step to set a spending limit in the provider's dashboard.
- **`review` tasks.** End every milestone with a review task. It checks the milestone's work against the plan, against every rule in `CLAUDE.md`, and against the milestone's `review` checks. A milestone that touches logins, money or private data also gets "try to break it" in its review. End the last milestone with a review of the whole app against the plan.

## Tasks that follow a design

Only when `docs/design.md` exists:

- **T00** gets two more boxes: the named values in `docs/design/design.css` are brought into the app's own styles, and the page layout that every screen shares is in place.
- **Shared components** from the "Components" table are built in the first task whose screen needs them, and that task says so in its "Design" section. Later tasks reuse them.
- **Every task that builds a screen** gets a "Design" section naming its mockup file, as the template shows. For a screen with no mockup of its own, the section names the mockup it follows, from the "Screens" table, and the shared components to build it from.
- **`CLAUDE.md`** gets one more line under "Rules every change follows": the Design rule in the template.
- **If screens were already built before the design existed,** add tasks that bring them to it: one for the shared styles and components, then one per screen or per milestone. Nothing else depends on them.

Whether or not there is a design, every milestone review of an app with screens gets the "Screens" box from the review task template. It checks the screens that were really built, in a browser. It does not compare them with the mockups.

## Check it with the user

Show the milestones in a chat message, as a numbered list: one line each, with what the user will be able to try at the end of it, and the number of tasks. Do not list every task. Explain in one line what a milestone is the first time you use the word.

End the same message by asking whether the order feels right and whether anything is missing, and wait for the reply. Do not ask this in a question box: the user cannot see the milestones from there. Adjust until they agree.

### What the tasks decided

Writing the tasks shows where the plan stops short of what a builder needs: who changes a setting, what a limit is, what happens in a case nobody named.

- When there is one sensible answer, decide it. List these in the same message as the milestones, as a numbered list, "What I decided that the plan does not say".
- When it is a real choice, ask it, the way an open question is asked.
- Once the user has seen the list and not objected, write each decision into `docs/plan.md`, in the part it changes, and add one line under "Technical decisions" marked "(left to Claude, while writing the tasks)". Change any the user objects to before you write the files.

A decision that lives only in a task is lost: reviews check the build against the plan.

## Write the files

Write one file per task, `docs/tasks/index.md`, and the "Rules every change follows" section in `CLAUDE.md`, as the template shows. Set the plan's status to `tasked`.

## Readiness check

Before you finish, confirm all of this, and fix whatever fails:

- Every build task has a "Done when" list and a "How to test" section.
- Every dependency points to a task that exists, and nothing depends on itself in a circle.
- Every item under "Things only you can do" has a `you` task.
- Every checkable block the plan needs now is in a task, in a review task, or in `CLAUDE.md`'s rules.
- Every milestone ends with a review task.
- "Open questions" in the plan is empty.

## Finish

Tell the user how many tasks and milestones there are, and what they need to do themselves before a build. Then name the next step: `/lwh-run`. Mention that they choose how far it goes each time: one task, a few, a milestone, or everything.
