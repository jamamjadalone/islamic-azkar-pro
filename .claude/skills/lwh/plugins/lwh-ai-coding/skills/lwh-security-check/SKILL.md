---
name: lwh-security-check
description: Attack the app that was built to find security problems, report them as high, medium and low with a recommendation for each, and fix only the ones the user chooses.
disable-model-invocation: true
---

# Security check

The project folder is `${CLAUDE_PROJECT_DIR}`. Read and write only inside it.

Read `${CLAUDE_SKILL_DIR}/house-style.md` first and follow it in every message.

The check has three parts, and `/lwh-run` does the work between them:

1. **Find.** You write the security tasks. A run sends a fresh reviewer at each one. The reviewers write down what they find and fix nothing.
2. **Report and choose.** You write the report, with every finding rated high, medium or low, and the user chooses what to fix.
3. **Close.** After a run has made the chosen fixes, you bring the report up to date.

Fixing is the user's choice. A long list of small hardening fixes costs days of building and protects little, so findings are rated against this app as it is really used, and only the high and medium ones are recommended.

## Which part

Read `docs/plan.md`, `docs/tasks/index.md`, and the first three lines of `docs/security-report.md` if it exists. Then take the first case that matches:

1. **Nothing has been built yet.** Say so, name `/lwh-run`, and stop.
2. **`security` tasks exist and some are not done.** Say how many are left, give the command that runs them, as in "Finish" under part 1, and stop.
3. **`security` tasks are all done, and there is no report, or its `Security tasks` line does not name them.** Do part 2.
4. **The report's `Waiting for fixes` line names tasks, and some are still `todo` or `in-progress`.** Say how many are left, give the command that runs them, and stop.
5. **The report's `Waiting for fixes` line names tasks, and each is `done` or `blocked`.** Do part 3.
6. **There is a report and nothing waits.** Its first line is `Covers commit: <id>`. List the commits since then with `git log <id>..HEAD --oneline`. Leave out commits whose message names a task listed in the report, and commits that change only `docs/`. If any commits are left, do part 1 for the areas they changed only. If none are left, tell the user the report is up to date.
7. **No security tasks and no report.** Do part 1 for the whole app.

Without git, ask the user which milestones were built since the last report, and check those.

## Part 1: write the security tasks

### Look before you ask

- Read `${CLAUDE_SKILL_DIR}/blocks/index.md`, then the security part files for the blocks that apply to this app.
- Send a subagent to survey the code, or only the changed areas, and report in 40 lines or fewer what the app exposes: pages and endpoints, forms and inputs, logins and roles, file uploads, payments, outside services it calls, where secrets live, and what private data it stores.

### Ask what matters most

Ask two or three questions at most, with your recommended answers taken from the plan:

- What here would hurt most if a stranger got it or changed it?
- Who might want to misuse this app?

Explain in one line why you are asking: testing effort goes where the damage would be worst, and every finding is rated against these answers.

### Write the tasks

Add `security` tasks to `docs/tasks/` and the index, in a milestone of their own. Use the security task format in [security-template.md](security-template.md). One task per area that applies to this app:

- **Logins and sessions:** guessing passwords, weak resets, sessions that never end.
- **Who can see what:** one user reaching another user's data, a normal user reaching admin actions.
- **Inputs:** every form and endpoint fed hostile input.
- **Files and uploads,** if the app has them.
- **Payments,** if the app has them: faked or repeated payment messages, changed amounts.
- **Private data:** what is stored, what appears in logs and error messages.
- **Secrets:** nothing in the code or the git history. Run the secret scan again over everything, and check what it is set to ignore (the Secret scanning block).
- **Dependencies:** known problems in the packages the app uses. Run the dependency scan again, and check what it is set to ignore (the Dependency scanning block).
- **AI features,** if the app has them: instructions hidden in user content, leaking private data through the model.

Each task says what to try to break and lists its blocks with each block's check copied in from its part file, so the task stands on its own. Each task also carries the rating rules and what to do with a finding, word for word from the template, with the user's two answers filled in. Skip an area that does not apply, and say that you skipped it. Start with the areas the user said matter most.

For the scans: T00 already put both into the check command, so they have run on every check since the first commit. The security tasks check them again: that both still run, that they cover the whole project and the full git history, and that every ignored finding has a reason in `CLAUDE.md` that still holds. If the project has no scans yet, for example a task list the user wrote themselves, that is a medium finding. Its fix adds them to the check command, with each tool installed inside the project, for example as a dev dependency, or run through the package manager. A scan result that cannot be fixed in the project, such as a problem deep in a dev tool, is a low finding with its reason.

All testing runs against the app on the user's own machine. Outside services may be used in their test or sandbox mode with test keys. Never a real account, real money, real users or a live site. When the plan says the app uses the user's own accounts or controls real devices, every task says so, as the template shows: the reviewer works with fakes or made-up keys, never with the keys in the project's env file.

### Finish

Tell the user how many tasks were created, what they cover, and which milestone they are in. Then name the next step: `/lwh-run`, which sends a fresh reviewer at each task.

- Say what comes after it: the run finds problems and fixes none of them. Once it has finished, running `/lwh-security-check` again writes the report and asks what to fix.
- If other tasks are still open, such as a milestone that is not built yet, say that a plain `/lwh-run` builds those first. Give the command that runs only this milestone, with its id, for example `/lwh-run only milestone M6`.

## Part 2: write the report and ask what to fix

Read [security-template.md](security-template.md), and the sections the reviewers filled in, in every `security` task the report does not name yet: "Findings", "Tried and held", "Noted" and "Not tested". Do not read the code.

### Settle the ratings

Each reviewer rated its findings alone. You see all of them, so make the ratings agree with the rules in the template and with each other:

- A finding that does not say what an attacker gains becomes low, or moves to "Noted".
- The same problem found by two reviewers is one finding.
- Never lower a rating to shorten the list, and never raise one to look thorough.

### Write the report

Write `docs/security-report.md` in the shape the template gives. Every finding gets a number, a level, one line on what could happen and what it takes, a recommendation and the state `open`. The recommendation follows the level:

- **high:** fix now.
- **medium:** fix before going live.
- **low:** leave.

Never say the app is "secure". Say what was tested and what was found. This check lowers risk. It does not replace a professional review for an app that handles money or sensitive data, and the report says that once, plainly.

### Ask what to fix

**Chat:** one message, then wait.

- Two lines: how many findings at each level, and where the report is. Explain the three levels in one line the first time, in the words of the rating rules.
- The high and medium findings as a numbered list, with the report's numbers. One line each: what could happen, what it takes, and the recommendation.
- The low findings after them, each as its number and short title only. The report has the rest.
- What you will do unless they say otherwise: write a fix for every high and medium finding, and for none of the low ones.
- The question: which numbers to add or to leave out. Say that "go" is a fine answer.

If nothing was found at any level, say so plainly, skip the question, and go to "Finish". If only low findings were found, say that nothing needs fixing now, and that any of them can still be picked by its number.

When the reply comes:

- For each chosen finding, write a `fix` task in the format the template gives, in the same milestone as the security tasks, with a new line in the index.
- A high or medium finding the user leaves gets the state `left by your choice`. Its test keeps the expected-failure mark, as a record of what is open. If they leave a high one, say once, in one line, what stays possible. Then it is their call.
- Update the report: the state of each finding, and the `Waiting for fixes` line.
- In a git project, commit the report and the new tasks with the message `docs: security report`.

Then name the next step:

- **Fixes were chosen:** `/lwh-run`, which makes them. If other tasks are still open, give the command that runs only this milestone. Say that running `/lwh-security-check` afterwards brings the report up to date.
- **Nothing was chosen:** go to "Finish".

## Part 3: bring the report up to date

A run has worked on the fixes the report was waiting for.

- Set each finding whose fix task is `done` to `fixed: <task id>`.
- A fix task that ended `blocked` leaves its finding `open`. Add the reason from the task's note.
- Set `Covers commit` to the current commit, and `Waiting for fixes` to `none`.
- In a git project, commit the report with the message `docs: security report`.

Show the user a summary of a few lines: fixed, still open, left by choice, and not tested.

## Finish

Name the next step.

- If build tasks are still open, name `/lwh-run`, which continues the build.
- Otherwise, if the plan lists "Before going live" blocks, say plainly that these skills do not put the app online, and list those blocks, one line each, so the user knows what is left before real users.
- Otherwise name `/lwh-plan-app`, to add the next feature.
