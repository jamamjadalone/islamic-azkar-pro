# Review decisions

The first review of the two plugins, before release. Each line is a problem the review found and what was decided. The file contract and the skills now follow these decisions.

## Running unattended

1. **Permission prompts stall a run.** Pre-flight offers narrow allow rules in `.claude/settings.local.json` (edits inside the project, the check command, git add/commit/status/diff/log, the package manager). Added only on a yes; turning checks off is never suggested.
2. **Every later run looked like a resume.** `RUN.md` starts with `state: running | paused | stopped | finished`. A finished run is archived to `.work/archive/<date-time>/`. Only `paused` and `stopped` resume.
3. **`you` tasks were sent to workers.** The orchestrator reads `you` task bodies (only those), walks the user through them in pre-flight, checks the result without reading any secret, and marks them done. Workers never get a `you` task.
4. **Skipped `you` tasks.** New status `skipped`, for `you` tasks only. Their dependents wait, and the next pre-flight asks again.
5. **Workers ran past the scope.** Each worker gets an allowed list cut off at the next pause point or scope limit, and never starts a task outside it.
6. **Unattended decisions never reached the user.** Workers tag each decision `[technical]`, `[product]` or `[plan]`. At each pause the user accepts or changes each one. Accepted ones go into `docs/plan.md`; changed ones become tasks.
7. **Fresh projects committed to main or failed on git.** Pre-flight checks git, the git identity and the runtime, and gives the exact command for anything missing. The orchestrator runs `git init` and creates the branch `lwh/work` before T00.
8. **Sessions in the home folder.** The planning skills, `/lwh-run` and the router stop in the home folder, the Desktop, Documents or Downloads, and offer a project folder.
9. **Stopping from the run's own window.** The orchestrator waits for each worker in either foreground or background mode. Stop from a second window, never with Esc. A `running` state at start asks "still going elsewhere?"; a "no" gets a recovery worker. The docs show a skill cannot force a subagent into the foreground, so the skill handles both modes.
10. **Command names and install.** Tested on Claude Code 2.1.319: bare names (`/lwh-plan-app`) work, `dependencies` installs `lwh-core`, `${CLAUDE_PLUGIN_ROOT}` resolves. A README was added and the stray `note` file removed.

## Routing and security

11. **Security re-checks.** `docs/security-report.md` records the commit it covers. Commits since then, other than its own fixes and `docs/` changes, trigger new security tasks for the changed areas only.
12. **Blockers never cleared.** `BLOCKERS.md` is gone. Anything only the user can resolve becomes a `you` task that the stuck task depends on.

## Block checks

13. **Checks a test can't prove.** Each check has a proof type: `test` (build tasks), `review` (the milestone's review task), `scan` (the security check). Dependency and secret scanning left T00.
14. **Outside services.** Test and sandbox modes with test keys are allowed, including real AI calls in tests. Pre-flight asks for a budget per paid service, and the user sets that limit in the provider's dashboard. Real accounts, real money, real users and live deployments stay off-limits.
15. **Blocks that bloated every first version.** Admin panel applies only when the plan names a staff role. Soft delete applies only when the user wants deletes to be undoable, asked as a story. Guessable IDs stays. Component library became a practice.
16. **Contradicting checks** (done without a question). Background jobs covers work the user does not watch; Streaming covers AI answers on screen. Money as cents tests 10 + 20 cents. Path & upload safety says "away from the app's source files". Data modeling no longer assumes tables.

## Learning, safety and context

17. **The pause could not name the blocks.** Each worker's report names the blocks it used, `LOG.md` keeps them, and the pause reads the plan's blocks table for the reasons.
18. **Lost work and stale servers.** Destructive git commands are forbidden. The orchestrator commits anything left uncommitted before each dispatch. Workers stop the processes they started. App tests always start their own server.
19. **What counts as a failure.** Workers report `done`, `progressing` or `stuck`. Several workers on one task is the design: unfinished at a handoff is normal and never blocks a task. Only two `stuck` reports in a row do. The index has a `Note` column.
20. **Running workers at the same time.** Not in v1. One worker at a time; a parallel mode is designed later.
21. **Task size.** Tasks stay small for clarity, review and progress, not to fit one worker.
22. **The orchestrator's own context.** It stays lean (only rows not done, the end of check output, browser walkthroughs in a subagent), re-reads its skill and `RUN.md` after a compaction, and at a long pause suggests `/clear` then `/lwh-run`. Pre-flight mentions the limit of three usage-limit resets.
23. **The planning interview had no end.** The first screen picks Quick, Thorough or At my own pace. "Decide the rest" works at any time. Routine choices go on one screen. Blocks come up only as stories when they change what gets built. "New session" became `/clear`.
24. **T00 on an existing app.** Only a safety net: git, secrets, env, `CLAUDE.md`, and a check command with one smoke test. Cleanup of old code is optional tasks that nothing depends on.
25. **T00 did not match the day-one blocks.** Blocks with scope `setup` are T00's boxes, copied as they are. Git's check was reworded for T00. Stack gained a "Code organisation" line.
26. **Cross-cutting blocks reached one task.** Blocks with scope `cross-cutting` go into "Rules every change follows" in `CLAUDE.md`, which every worker reads, and every milestone review checks them. Every milestone now ends with a review task.
27. **No path to going live.** The run offers a local merge of `lwh/work` at the end. The security report and the router list the "Before going live" blocks and say plainly the skills do not deploy. `lwh-go-live` is the next skill to design.

## Files, routing and releases

28. **Files in the user's language.** Frontmatter, headings, ids, statuses, columns and block names stay fixed. Content follows the user's language. Block names are taught in English with a translation.
29. **Changing a plan.** Plan-app edits in place, never clears Challenge notes, and lists changes under "Changed since the last challenge". The challenge reviews only those. Wording-only edits keep the status.
30. **The router took over unrelated work.** Its description names the lwh files, and its first step is a guard.
31. **Updates.** Each plugin.json has a `version`, bumped to release. The docs show `autoUpdate` is a user setting, not a `marketplace.json` key, so the README tells users how to turn it on.
32. **Blocks source.** `scripts/blocks-meta.json` is the only source. The build validates every field. The book is an optional `--from-book` comparison. Every "What" line is now a plain sentence.

## From the first test build

Found by building a real app (a smart home dashboard) with the skills, from plan to milestone 3.

33. **Questions pointed at text the user never saw.** Every question went through the question box, and the explanation written just before a box opened did not reach the screen: "Happy with these picks?" with no picks, "Have you filled in the DEYE_ lines?" with no steps, "Accept these 14 decisions?" with no decisions. Commands ended up inside question text, where they cannot be copied. The house style now has "Chat or question box": a box holds a short choice that makes sense on its own; anything to review or to do is a chat message that ends the turn. Plan-app, challenge, make-tasks and `/lwh-run` (the `you` tasks, the permission rules, the pause report and the decisions) name the channel for each step. This replaces "routine choices go on one screen" in decision 23.

34. **Status updates were lost the same way.** Text written before any tool call, not only before a box, may never reach the screen. The house style says what the user should read goes in the message that ends the turn, and `/lwh-run` puts its updates in the message it sends after dispatching a worker.
35. **The decision review was too heavy.** A pause listed 14 to 18 decisions, mostly build details, and the user accepted them all each time. Now only the ones the user would notice are shown: what the app shows or does, cost, a new service, a limit, a risk. The purely technical ones are written into the plan as `recorded`, with the count and "show the rest" on offer. Workers tag by the same rule and log choices only. This narrows decision 6.
36. **Skipped `you` tasks were asked about on every run.** They are now named in one line, with what waits on each, and walked through only when the user gives the id. This replaces "the next pre-flight asks again" in decision 4.

37. **Two skills disagreed about the scans.** Make-tasks left Dependency scanning and Secret scanning to the security check, but the plan listed both as day-one, so the first milestone review reported them as missing and they were built anyway. Both are now `setup` blocks with proof `test`: T00 puts the scans into the check command, so a leaked key is caught from the first commit. The security check runs them again and checks what they ignore. The proof type `scan` is gone. This reverses the last line of decision 13.

38. **Screens were designed by whichever worker built them.** The plan said "Tailwind" and nothing else about the look, so each task invented it. New skill `/lwh-design`, between the challenge and the tasks, recommended for apps with screens and never required.
    - It asks whether the user has a style in mind, and takes the style from a reference, never its logo, text or images.
    - The look is worked out from the app's own subject. A list of the looks AI falls into is used to check against, not as bans, because banning one default brings the next.
    - No reference: three directions that differ in structure, built as real mockups of the main screen by parallel subagents. With a reference, or "you pick": one.
    - The chosen direction becomes `docs/design/design.css` and one mockup per screen. A fresh subagent reviews them once before the user sees them.
    - It writes our own `docs/design.md`, not Google's DESIGN.md format: the values live in one place, the CSS, and no extra tool is needed.
    - A mockup shows the main state in full and every other state as only the part that changes. The first test produced 77 KB files that repeated the whole screen for each of ten states, which every worker would have had to read.
    - `docs/design.md` is written before the user's last look, not after, so the design is complete even when the user moves straight on to the tasks.
    - The build is not compared with the mockups. Reviews check the screens that were really built, and the user's feedback becomes tasks.

## From the first real project

Found by planning, designing and tasking a real app with 21 screens and 100 tasks.

39. **Decisions made after the challenge never reached the plan.** The design settled six small things the plan did not say (how long a login link lasts, that a refund needs a reason), and make-tasks settled one more. Some reached a few tasks, some reached nothing, and none reached the plan, which is what reviews check the build against. Both skills now write such decisions into the part of the plan they change, with a line under "Technical decisions", and list them for the user. This is for small details with one sensible answer; a real choice is still asked, and a missing screen or feature still goes through `/lwh-plan-app`.
40. **Mockups for every screen are costly.** 21 screens took 83 minutes and seven builders. With more than about eight screens, the design skill proposes the main ones and asks. A screen with no mockup follows the closest one and the shared components.
41. **Three things the design session invented are now standard:** a shared page frame built once, mockup-only helpers kept in files that never reach the app, and a light/dark switch in place of a second copy of a screen.

## Before the first release

Found by checking the repo and reading the skills before the first public version.

42. **Nothing sent the user back for the security report.** The security check ended by naming `/lwh-run`, and the runner, which lives in the other plugin, cannot name `/lwh-security-check`. The check now says that the report is written by running it again once the run has finished.
43. **The security check on a partly built app.** With build milestones still open, a run would build those before the security tasks. The check now names the command that runs only its milestone, and the runner picks only from the tasks, milestone or type the scope names.
44. **A second run after a merge.** Setup created `lwh/work`, which already exists once a first run was merged. A later run now switches to it and merges the main branch into it first.
45. **Fix tasks had no type.** The review brief did not give one, so reviewers wrote `fix`, which the contract did not list. `fix` is now a type: a task that a review or security task created for a finding, built like a `build` task.
46. **Command names show the plugin's name.** Claude Code lists each command as `/lwh-ai-coding:lwh-plan-app`. The short name still runs it, as decision 10 found, so the skills keep using short names and the README explains both.

## From the first security check

Found by running the security check on the smart home app, built through three milestones: six security tasks, then 30 fixes, in one run that lasted nine hours.

47. **Every finding was fixed, whatever its size.** The reviewers found 28 problems: none high, 4 medium and 24 low, such as `PUT` on the login page answering 400 instead of 405. Each became a fix task, and the same run made all of them. Finding took about two of the nine hours, on an app with one user. Now the run only finds. `/lwh-security-check` then writes the report, with every finding rated against the app as it is really used and a recommendation that follows the level: high, fix now; medium, fix before going live; low, leave. The user chooses. High and medium findings are fixed unless they say otherwise, and a low one only when they pick it.
    - Reviewers write their findings into their own task file and create no fix task, so nothing is fixed before the user has seen the report. Only high and medium findings get a failing test.
    - A finding must say what an attacker gains. A good practice that was skipped, with nothing to gain, is low at most.
    - The report starts with three lines the skills read: the commit it covers, the security tasks it covers, and the fixes it waits for.
    - This replaces "findings come back as fix tasks through the same loop" for security tasks, and "a task that a review or security task created" in decision 45. A milestone review still creates its own fix tasks.
48. **Real keys were in the project's env file.** The app under test switches real devices, and the copy's env file held the real keys. The run used fakes and made-up keys without being told to. Every security task now says so when the plan names the user's own accounts or real devices.
49. **The report was left uncommitted.** It is written after the run, when nothing commits any more. The security check now commits the report and the tasks it writes.

## Installing

50. **Plugin command names carry the plugin's name.** Claude Code lists them as `/lwh-ai-coding:lwh-plan-app`, and many users install skills with `npx skills add`, which gives short names. The skills now work both ways. Each skill reads only its own folder: the house style and the blocks are copied into every skill that needs them by the two scripts, and no skill uses `${CLAUDE_PLUGIN_ROOT}`. The README leads with `npx skills`, keeps the plugin as the second way, and tells users to pick one. Plugin users still get `lwh-core` as a dependency and updates by version. `npx skills update` takes the latest commit, so `main` gets release commits only.

## Done as defaults

- Open questions are never deleted to empty the list.
- The review brief has a handoff threshold, keeps a "Not yet reviewed" list in its own task file, and keeps the previous worker's handoff notes. Every fix task ends with removing its expected-failure mark.
- The guide no longer says workers don't judge their own work, and describes plan-app on an existing app as it works.
- Review tasks copy checks from the part files. The Magic links example is gone. Workers set `in-progress` when they start.
- `sync-shared.mjs` ignores line endings and skips subfolders.
- Every skill names the project folder as `${CLAUDE_PROJECT_DIR}`, so it never acts on another folder the session can see.
