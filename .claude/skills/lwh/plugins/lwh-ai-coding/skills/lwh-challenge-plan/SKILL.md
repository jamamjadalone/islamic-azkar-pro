---
name: lwh-challenge-plan
description: Stress-test the written plan for holes, missing pieces and oversized scope before anything is built, then fix the plan.
disable-model-invocation: true
---

# Challenge the plan

Find what is wrong with `docs/plan.md` while it is still cheap to fix, and fix it. A hole found here costs a few minutes. The same hole found after the build costs days.

The project folder is `${CLAUDE_PROJECT_DIR}`. Read and write only inside it.

Read `${CLAUDE_SKILL_DIR}/house-style.md` first and follow it in every message.

## Start fresh

You should judge the plan as written, the way a builder who was never in the planning conversation would read it. If this conversation is the one that wrote the plan, tell the user to run `/clear` and then `/lwh-challenge-plan`, and continue here only if they prefer to.

Read `docs/plan.md` and `${CLAUDE_SKILL_DIR}/blocks/index.md`. If there is no plan, say so, name `/lwh-plan-app`, and stop.

## What to review

- **If "Changed since the last challenge" lists changes,** review only those changes, plus any part of the plan they touch. Say so to the user in one line.
- **Otherwise,** review the whole plan.

## Find the weak spots first

Before asking anything, go through what you are reviewing and list every problem you can find. Look for:

- **Unclear.** A place where two builders would build two different things.
- **Unhappy paths.** What happens when something goes wrong: wrong input, an empty list, no connection, a forgotten password, a failed payment, a file that is too big.
- **Who can do what.** Can one user see or change another user's things? Is there an admin, and what can they do?
- **Missing blocks.** The app has a feature, and a block that feature needs is not in the plan.
- **Too much.** The first version is too big, or the plan builds `go-live`, `with-users` or `at-scale` blocks now. Move them to the lists for later.
- **Contradictions.** Two parts of the plan that cannot both be true.
- **Cannot be checked.** A feature described so loosely that no test could tell whether it works.
- **Missing human steps.** An account, key or purchase the build will need that is not under "Things only you can do". A paid service needs a spending limit set by the user.

## Then sort them

- **Fix it yourself** only when there is one sensible answer and no real choice: a contradiction with an obvious resolution, or a missing piece the plan clearly implies. Record the fix in "Challenge notes" so the user sees it.
- **Ask the user** about everything that involves a real choice, whether it is about the product or the technology. Explain what is at stake, recommend, and let them choose.

There is no fixed number of questions. Work through every weak spot, most serious first. If the user says "decide the rest", decide, and list what you decided.

## Ask as small stories

Ask in rounds of 1 to 3 questions, in a question box. Put each one as a concrete situation with a named person, give the options, and put your recommendation first:

> Sara typed the wrong password five times. What should happen?

The user does not have the plan open, and sees nothing but the box. So each question carries what it needs: what the plan says now, in a few words, and what goes wrong. If that takes more than two or three sentences, ask it in chat instead, as "Chat or question box" in the house style describes.

When a question is about a block, name the block and give its one-line meaning. This is where the user learns why the block exists.

Be direct about scope. If the first version is too big, say so in a chat message: list what you would move to "Not yet", one line each, and ask what the user wants to keep. A list like that does not fit in a box.

## Update the plan

Rewrite the affected sections of `docs/plan.md` so the plan reads as one clean document, not a plan with patches on top. Then:

- Add to "Challenge notes" what changed and why, one line each, including the fixes you made yourself. Keep the notes from earlier challenges.
- Empty "Changed since the last challenge".
- Go through "Open questions" with the user. Each one is answered and written into the plan, or moved to "Not yet" with the user's yes. Never delete a question just to empty the list.
- Set the status to `challenged`.

## Finish

Tell the user in a few lines, in the chat, how many things changed and the three that matter most. Then name the next step:

- **The app has screens and there is no `docs/design.md`:** `/lwh-design`, which builds mockups to choose from and settles how the app looks before it is built. Say in one line that it is recommended, and that `/lwh-make-tasks` skips it for a prototype or when the logic comes first.
- **Otherwise:** `/lwh-make-tasks`, which splits the plan into small tested tasks.
