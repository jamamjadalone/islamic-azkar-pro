# lwh skills for Claude Code

Claude Code skills that take you from an app idea to a built, tested app, and teach you the building blocks of a solid app along the way.

- **Planning and checking:** plan the app with you, look for holes in the plan, design its screens, split it into small tested tasks, and check its security.
- **Running:** `/lwh-run` gets any list of tasks done with a chain of workers that hand off to each other, so long runs stay reliable. It works with these skills, and on its own with any task list.

Every decision stays yours. The skills explain each choice, recommend one, and let you pick, or say "decide the rest".

**Early release, version 0.1.0.** Tested on Claude Code 2.1.319. Expect rough edges, and please [report what you find](#report-a-problem).

## Install

Pick one way. Installing both gives you every command twice.

### With one command (recommended)

Needs [Node.js](https://nodejs.org). In a terminal:

```
npx skills add hassancs91/lwh-ai-coding-skills -g -a claude-code
```

Choose all the skills when it asks. `-g` installs them for every project; leave it out to install them only in the folder you are in. Then restart Claude Code.

**Update:** run `npx skills update`. Run `npx skills check` to see whether there is an update.

### As a Claude Code plugin

In Claude Code:

```
/plugin marketplace add hassancs91/lwh-ai-coding-skills
/plugin install lwh-ai-coding@lwh
```

The second line opens the plugin's page, where you choose where to install it and confirm. It also installs `lwh-core`, the plugin that holds `/lwh-run` and `/lwh-stop`. Then run `/reload-plugins`.

Claude Code lists a plugin's commands with the plugin's name in front, such as `/lwh-ai-coding:lwh-plan-app`. Typing the short name, `/lwh-plan-app`, runs the same command.

**Get updates automatically:** run `/plugin`, open **Marketplaces**, choose **lwh**, and turn on auto-update.

**Update by hand:** run `/plugin marketplace update lwh`, then run `/plugin`, open **Installed**, choose the plugin and select **Update now**. The new version loads in your next session, or after `/reload-plugins`.

## Start

1. Make a new, empty folder for your app.
2. Open Claude Code in that folder. Not in your home folder or on the Desktop.
3. Run `/lwh-plan-app`, or `/lwh-guide` for a short tour first.

Each command ends by telling you the next one. `/lwh-whats-next` tells you where you are at any time.

| Command | What it does |
|---|---|
| `/lwh-plan-app` | An interview that turns your idea into a written plan, at the pace you choose |
| `/lwh-challenge-plan` | Looks for holes in the plan and fixes them, after `/clear` |
| `/lwh-design` | Builds real mockups of your screens to choose from, then writes the design the build follows. Recommended, not required |
| `/lwh-make-tasks` | Splits the plan into small tasks, each with its tests |
| `/lwh-run` | Gets the tasks done: one, a few, a milestone, or all of them |
| `/lwh-stop` | Stops a run cleanly. Run it from a second window |
| `/lwh-security-check` | Attacks the app to find security problems, reports them as high, medium and low, and fixes the ones you choose |
| `/lwh-whats-next` | Where the project stands, and the command to run next |
| `/lwh-guide` | A short tour, and answers to questions about the skills |

## What a run needs from you

- **Git, and your stack's tools** (such as Node or Python) installed. `/lwh-run` checks, and tells you the exact command for anything missing.
- **A few answers before it starts:** how far to go, when to pause, the accounts or keys only you can create, and a spending limit for any paid service.
- **The window open and the computer awake.** A run pauses whenever a permission prompt appears. `/lwh-run` offers a few narrow allow rules so that happens less.
- **Time and usage.** A long run can use a large share of your plan's usage. You choose how far each run goes, so start with one milestone. Mockups take time too: one app with 21 screens took 83 minutes, which is why `/lwh-design` offers to mock up only the main screens of a big app.

Work happens on a branch called `lwh/work`. Nothing is pushed or deployed. At the end, the run offers to merge the branch on your computer.

These skills do not put your app online yet. The plan lists what is needed before real users, under "Before going live".

## Report a problem

Open an issue at https://github.com/hassancs91/lwh-ai-coding-skills/issues and say:

- which command you ran, what happened, and what you expected
- how you installed: with `npx skills` or as a plugin
- your Claude Code version, from `claude --version`

Never paste a key or a password into an issue.

## Try it from a local copy

Open Claude Code in a new, empty folder with the skills loaded from this folder, for this session only:

```
claude --plugin-dir <path-to-this-folder>/plugins/lwh-ai-coding --plugin-dir <path-to-this-folder>/plugins/lwh-core
```

Then run `/lwh-plan-app`. Edits to the skills take effect after `/reload-plugins` or a restart.

## Change the skills

- [docs/file-contract.md](docs/file-contract.md) defines every file the skills read and write. If a skill and the contract disagree, the contract wins.
- Every skill is self-contained: it reads only its own folder, so it works when installed on its own with `npx skills`. Files that several skills need are copied into each one by the two scripts below.
- How the skills talk to users lives in `shared/house-style.md`. Edit it there, then run `node scripts/sync-shared.mjs` to copy it into every skill.
- The blocks live in `scripts/blocks-meta.json`. Edit it there, then run `node scripts/build-blocks.mjs`, which checks every field and rebuilds the `blocks/` folder of each skill that reads them. Never edit those folders by hand.
- Before a release, run `node scripts/sync-shared.mjs --check` and `node scripts/build-blocks.mjs --check`, then bump `version` in each plugin's `plugin.json` and tag the commit.
- `main` gets release commits only. Plugin users get a change when the version changes, but `npx skills update` takes whatever is on `main`.

## License

MIT
