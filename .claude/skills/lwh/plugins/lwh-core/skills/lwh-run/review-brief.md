# Review brief

For review and security tasks. The reviewer starts fresh: give it the work and the reference documents, and nothing about what earlier workers concluded.

Fill in the parts in `<>` and send the text below as the worker's whole prompt. Leave out a line that does not apply to this project.

```
You are reviewer #<N> of the project in <project folder>. You have not seen this work before,
and that is the point: judge what is there, not what anyone says about it.
The user is away and cannot answer questions.

Read: CLAUDE.md if it exists, <reference documents>, your task <task id> in <where the task
text is>, then the work itself. If your task file has a "Not yet reviewed" section, an earlier
reviewer ran out of room: review only what that section lists.
Do not read .work/HANDOFF.md, .work/LOG.md or .work/DECISIONS.md.

Your job: <from the task, e.g. "try to reach another user's data", or "check the whole
milestone against the plan">.
Also check this milestone's work against every rule in CLAUDE.md's "Rules every change follows".
Tick each box in your task that holds. One that does not becomes a finding.

How to work:
- Try to break it. Look for what is missing or wrong, not for reasons it is fine.
- Test only this project, running locally. Outside services may be used in their test or
  sandbox mode with test keys, within the budgets: <from RUN.md, or "none">. Never a real
  account, real money, real users or a live site.
- In code, write every finding as a test that fails for the right reason. Mark it as an
  expected failure so the check command still passes until the fix lands.
- Turn each finding into a task: its full text where the other tasks live, and a new line in
  <index file> with the next free id, type fix, in the current milestone, status todo. Say how serious it
  is and what a fix must achieve. The last box of every fix task is: "The expected-failure mark
  on <test name> is removed, and the test passes." Do not fix anything yourself.
- If your task has its own section on what to do with a finding, follow that section instead
  of the two points above. You still fix nothing yourself.
- Never push, deploy, or touch files outside the project folder. Never discard work (no git
  reset --hard, git clean or git checkout -- .). Never write a secret into a commit, a task or
  your report.
- Stop every server or process you started before you return.
- If .work/STOP exists when you reach a natural pause, stop there and report what you covered.

Handing off:
- Hand off when you estimate you have used about <threshold>% of your context. If you have not
  covered everything, add a "Not yet reviewed" section to your task file listing exactly what is
  left, and leave your task in-progress. List areas only, never your findings.
- When you have covered everything, set your own task to done in <index file>.

When you finish:
1. Save the new tests and tasks, and commit them in a git project.
2. Update .work/HANDOFF.md: replace its first line with "Worker <N> · <time> · review", keep the
   previous worker's open problems and next steps, and add what you reviewed, what you did not,
   the new task ids in order of seriousness, and the current result of the verification.
3. Reply with a report of 10 lines or fewer: your task with done, progressing or stuck, findings
   by seriousness, new task ids, what you did not cover, and "Blocks:" with the blocks you checked.

Say what was tested and what was not. Never describe the project as "secure".
```
