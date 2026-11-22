# Security task, fix task and report formats

Keep every heading, label, level and state exactly as written here, in English, whatever language the content is in. The other skills read them.

## A `security` task

```markdown
# T53: Security: only the owner can switch a device

Milestone: M6 · Type: security · Depends on: T15

## What to review
The area, and what to try to break, as a list. Say what applies to this app and what does not.

## Blocks to check
- [ ] (<Block name>) <its check, copied from the part file>
- ...

## How to rate a finding
Rate each finding against this app as it is really used: <who uses it and where it runs, from the plan>.
What would hurt most: <the user's answer>. Who might try: <the user's answer>.

- **high:** someone who should not be able to can do that damage, or reach private data, money or another person's account, and needs nothing special to do it.
- **medium:** real damage, but only under a special condition: a setting left wrong, a login the attacker must already have, exact timing, or a second mistake.
- **low:** hardening. No way was found to do harm with it in this app.

Every finding says what an attacker gains. A good practice that was skipped, with nothing to gain, is low at most. If you cannot say what could go wrong, it is not a finding: put it under "Noted" in one line, or leave it out.

## What to do with a finding
- **high or medium:** write a test that fails for the right reason, and mark it as an expected failure so the check command still passes. Then add the finding under "Findings".
- **low:** add the finding under "Findings". No test.
- Create no fix task and fix nothing. The user reads the report first and chooses what gets fixed.
- A box under "Blocks to check" that does not hold is a finding. Tick the ones that hold.

## Findings
Filled in by the reviewer, worst first. "None" when nothing was found.

### F1 · medium · <a short title that states the problem>
- What could happen: one line, from the attacker's side.
- What it takes: one line on what the attacker needs first.
- Shown by: <test name>, marked as an expected failure.
- A fix must: one to three points a test can prove.

### F2 · low · <a short title that states the problem>
- What could happen: one line.
- A fix would: one line.

## Tried and held
Filled in by the reviewer: what was tried and did not break, in a few lines.

## Noted
Filled in by the reviewer: things seen that are not findings, one line each.

## Not tested
Filled in by the reviewer: what this task did not cover.
```

- "How to rate a finding" and "What to do with a finding" go into every security task word for word, with the three `<>` parts filled in. The reviewer reads only the task.
- When the plan says the app uses the user's own accounts or controls real devices, add one line to "What to review": test with fakes, or with a throwaway copy of the app that has made-up keys, and never with the keys in the project's env file.

## A `fix` task from a finding

```markdown
# T90: <what holds once the finding is fixed>

Milestone: M6 · Type: fix · Depends on: T53

## What to build
The finding in two lines: what could happen and what it takes. Then what holds once it is fixed.

## Done when
- [ ] <each point from the finding's "A fix must", or from "A fix would" for a low finding>
- [ ] The expected-failure mark on <test name> is removed, and the test passes

## How to test
- Code tests: the finding's own test, and the cases around it
```

- The task depends on the security task that found the problem. Its note in the index says where it came from and its level, for example "from T53, medium".
- A low finding has no test yet. Leave out the last box, and say under "How to test": write the test first and see it fail.

## The report: `docs/security-report.md`

```markdown
Covers commit: <commit id>
Security tasks: T53, T54, T55
Waiting for fixes: T90, T91

# Security report

Two or three lines: what was checked, when, which parts of the app, and what the user said matters most.

This check lowers risk. It does not replace a professional security review, which an app that handles money or sensitive data should have.

## Found
One line with the count at each level.

### High
1. **<title>.** What could happen. What it takes. Recommended: fix now. State: <state>.

### Medium
2. **<title>.** What could happen. What it takes. Recommended: fix before going live. State: <state>.

### Low
3. **<title>.** What could happen. Recommended: leave. State: <state>.

## Noted
Things seen that are not findings, one line each.

## Tested
Each area, and what was tried.

## Not tested
What this check did not cover, such as the hosting setup, the live site, and anything that needs a person to try.
```

- The first three lines keep exactly this form. `Waiting for fixes` is `none` when no chosen fix is open.
- Findings are numbered once, across the three levels, and keep their numbers.
- A state is one of: `open`, `to fix: <task id>`, `fixed: <task id>`, `left by your choice`.
- A level with no findings says "None found."
- A later check adds its tasks to the `Security tasks` line, adds its findings with the next numbers, and moves `Covers commit` forward. Earlier findings stay.
