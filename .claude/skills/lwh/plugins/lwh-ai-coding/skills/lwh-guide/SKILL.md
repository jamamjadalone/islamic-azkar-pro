---
name: lwh-guide
description: "A short guided tour of the lwh skills: what each one does, the order to use them in, and answers to questions about them."
argument-hint: "A question about the skills, or leave empty for the tour"
disable-model-invocation: true
---

# Guide

Help the user understand these skills and get started. Answer what they ask; do not start planning or building anything here.

Read `${CLAUDE_SKILL_DIR}/house-style.md` first and follow it. That matters most here: give the tour in small pieces, not as one long message.

## If the user asked a question

Answer it in a few lines. Before you state what a skill does or how it behaves, read that skill's file. The skills are installed side by side, so it is at `${CLAUDE_SKILL_DIR}/../<skill name>/SKILL.md`, for example `${CLAUDE_SKILL_DIR}/../lwh-design/SKILL.md`. The summaries below are for orientation, and the skill files are the truth.

If a skill's file is not there, it was installed somewhere else, or not at all. That is normal for `/lwh-run` and `/lwh-stop` when the skills were installed as plugins, because those two come in a plugin of their own, `lwh-core`. Then answer from the summaries below, such as "How a run works", and say so if a question goes beyond them.

## If they asked for nothing in particular

Start by asking where they are, with the question tool:

- I have an idea and nothing built yet
- I already have an app or some code
- I already have a list of tasks I want done
- I just want to understand how this works

Then give the part of the tour that fits, and name the one command to run first.

## The idea, in three lines

- Decide before you build. Most of the work in these skills happens before any code is written, because a clear plan is what makes the build go right.
- Everything is written to files in the project, so nothing depends on one long conversation, and work can stop and continue at any time.
- An app is made of **blocks**: building pieces such as logins, input validation or backups. The skills name the blocks the app needs and explain each one when it comes up, so the user learns them by using them.

## The skills

| Command | What it does | When |
|---|---|---|
| `/lwh-plan-app` | An interview that turns an idea into a written plan, explaining every choice | First, or whenever a feature is added |
| `/lwh-challenge-plan` | Looks for holes in the plan and fixes them | After planning, after `/clear` |
| `/lwh-design` | Builds real mockups of the screens to choose from, then writes the design every task follows | After the challenge, for an app with screens. Recommended, not required |
| `/lwh-make-tasks` | Splits the plan into small tasks, each with what to build and how it is tested | When the plan is solid |
| `/lwh-run` | Gets tasks done with a chain of workers: one task, a few, a milestone, or all of them | When tasks exist |
| `/lwh-stop` | Stops a run cleanly at the nearest safe point | While a run is going, from a second window |
| `/lwh-security-check` | Has fresh reviewers attack what was built, reports what they find as high, medium and low, and fixes what the user chooses | After building |
| `/lwh-whats-next` | Says where the project is and which command comes next | Any time |

## How a run works

- Before it starts, `/lwh-run` asks how far to go and when to pause. It walks the user through anything only they can provide, names in one line what they skipped earlier, asks for a budget for any paid service, checks the tools are installed, and offers a few narrow permission rules so the run is not stopped by prompts. After that it does not interrupt.
- One worker at a time does the tasks. Before a worker's memory fills up, it writes down where things stand and a fresh worker takes over, even in the middle of a task. That is how a run stays reliable over hours or days.
- A worker proves each task by running its tests. Proof does not stop there: at each pause the run runs the full check itself, and every milestone ends with a review by a fresh worker that has not seen the earlier work.
- When a worker has to make a call on its own, it writes it down. At each pause the user sees the calls they would notice (what the app shows or does, cost, risk) and accepts or changes each one. Calls that are only about how the code is built are recorded in the plan, and the user can ask to see them.
- All state is in a `.work/` folder in the project. If the run is interrupted, running `/lwh-run` again continues from there.
- To stop, open a second Claude Code window in the same folder and run `/lwh-stop` there. It stops after the current task; `/lwh-stop now` stops sooner, at the nearest point where nothing is left half-done. Pressing Esc in the run's window cuts a worker off mid-change, so avoid it.
- In a code project the work happens on a branch, with test keys and sandbox modes. Nothing is pushed or deployed. At the end the run offers to merge the branch on the user's computer.

## Things worth telling a newcomer

Bring these up when they are relevant, not all at once:

- **The usual order** is plan, challenge, design, tasks, run, security check. `/lwh-whats-next` always knows which one is next.
- **Design can be skipped.** For a quick prototype, or to get the logic working first, go from the challenge straight to the tasks. `/lwh-design` can be run later, and `/lwh-make-tasks` then adds tasks that bring the built screens to the design.
- **A style you like is welcome.** `/lwh-design` asks whether you have a site, a screenshot or a brand in mind. It takes the style from it, never the logo, text or images.
- **`/lwh-run` is not tied to the rest.** It runs any task list, including one the user wrote themselves, and tasks that are not about code.
- **Starting from an existing app** works. `/lwh-plan-app` reads the code first, writes down what already exists, and interviews only about what is new.
- **Each app needs its own folder.** Open Claude Code in that folder, not in the home folder or on the Desktop.
- **Going live is not covered yet.** These skills plan, build and check the app on the user's computer. The plan lists what is needed before real users, under "Before going live".
- **A run can be as small as one task.** Running everything unattended is a choice, not the default. For a long run the computer has to stay awake with the window open.
- **Why `/clear` before the challenge:** a fresh conversation judges the written plan, the way a builder who was never in the planning conversation would read it.
- **"Decide the rest"** works in any interview, at any time. Claude then decides what is still open and lists it, so nothing is settled out of sight.
- **The user stays in charge.** Every decision is theirs, technical ones included. The skills explain, recommend, and ask.

## Finish

End by naming the one command that fits where the user is, and what it will do in a few words.
