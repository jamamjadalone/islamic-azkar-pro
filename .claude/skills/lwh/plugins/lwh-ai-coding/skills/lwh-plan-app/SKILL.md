---
name: lwh-plan-app
description: Turn an app idea into a clear written plan through a guided interview that explains every choice along the way.
argument-hint: "Your idea, in a sentence or two"
disable-model-invocation: true
---

# Plan the app

Interview the user about their idea and write `docs/plan.md`. Everything built later follows this file, so a vague plan here becomes a wrong app later. You do not write code in this step.

The project folder is `${CLAUDE_PROJECT_DIR}`. Read and write only inside it.

Read `${CLAUDE_SKILL_DIR}/house-style.md` first and follow it in every message.

## Check the folder

If `${CLAUDE_PROJECT_DIR}` is the user's home folder, the Desktop, Documents or Downloads, or holds files clearly unrelated to an app, stop. Tell the user in two lines that each app needs its own folder. Offer to create one named after the idea, and ask them to open Claude Code in that folder and run `/lwh-plan-app` there.

## Before you ask anything

- **If `docs/plan.md` exists,** read it. The user is changing the plan or adding a feature. Ask what they want to add or change, and interview only about that. See "Changing a plan" below.
- **If the folder already has code,** send a subagent to survey it and report in 30 lines or fewer: what the app does, the stack, how the code is organised, what works, what is missing. Do not ask the user things the code answers. Write what already exists into the plan as it is, and interview only about what is new: the "First version" lists then describe the next version.
- **If the user gave their idea as an argument,** start from it. Otherwise ask them to describe the idea in their own words, as plain text, not a multiple-choice question.

## Choose the pace

Before the interview, ask one question with the question tool: how deep to go.

- **Quick:** about 10 questions on what matters most. You propose the rest, and they review it at the end.
- **Thorough:** every choice is discussed.
- **At my own pace:** start like Thorough. They say "decide the rest" whenever they want.

Say in one line that "decide the rest" works at any time, whichever they pick.

## The interview

The interview is finished when someone who has only the plan could build the right app without guessing. In Quick mode, the questions go to what changes the product most, and you decide the rest.

Ask in small rounds of 1 to 3 questions, and let each answer shape the next round, so a long interview never feels like a form. When the user says "decide the rest", decide, and list what you decided in the chat so they can change it.

Each step below says whether it happens in the chat or in a question box. "Chat" means: write it out as a normal message, end with the question, and wait for the reply, as "Chat or question box" in the house style describes. Never ask a box question about a list or a summary the user cannot see in the box. Two short chat steps may share one message, for example the two lists and the screens.

1. **The idea.** What it is, who it is for, and the one thing it must do well. **Chat:** say it back in two sentences and ask whether you understood it.
2. **The first version.** **Chat:** propose two lists, what is in the first version and what waits. Cut hard. A small first version that works teaches more and ships sooner than a big one that does not. The user moves items between the lists in their reply.
3. **What people can do.** **Chat:** propose the screens and the actions on each, as a short list. Ask what is wrong or missing.
4. **Features that change what must be built.** Ask only where the idea leaves it unclear: do people log in, does it take payments, do users upload files, does it send email, does it use AI, is data private to each user or shared, is there staff who manage the app's data, should deleted things be restorable. **Question box:** ask these as small stories, each one complete in itself:

   > Sara deletes her project by mistake. Should she be able to get it back? (This is called **soft delete**.)

5. **Kind of app and stack.** **Chat:** ask whether the user has a stack in mind and what they have used before, as an open question. If they know what they want, use it, and say so plainly if you see a real problem with the fit. If they do not, explain the realistic options in plain words, recommend one with the reason, and let them choose. Any stack is allowed.
6. **How we'll know it works.** **Chat:** recommend the kinds of testing that fit this app: code tests, tests that drive the real app, and for web apps the phone-width check. Explain each in one line and ask whether to use them all.

### Technical choices

The user makes the technical choices too: the database, how people log in, where files are stored, the main libraries, how the code is organised. Sort them in two groups.

- **Choices that matter for this app,** where the options differ in cost, difficulty or what the user can do later. Put each one to the user on its own, in a question box when it fits one, otherwise in chat:
  - Say in a line or two what is being chosen and why it matters for this app. In a box, that goes in the question itself.
  - Give the options, with your recommendation first and the reason.
  - Let them choose, or discuss it for as long as they want. When they ask something back, answer in chat before you ask again.
- **Choices with one sensible answer for this app.** Do not ask about them one by one. Show them together in one chat message, "Here's what I'd pick", as a numbered list with one line each and its reason. Ask which numbers to change, and wait.

A professional may already know what they want. Follow it. A beginner should come out of each choice understanding what was picked and why, which is how they learn to make the next one themselves.

Record every choice in the plan under "Technical decisions", with a one-line reason and whether the user chose it or left it to you. Record how the code will be organised in one line under "Stack".

### Blocks

Read `${CLAUDE_SKILL_DIR}/blocks/index.md`. A block is one building piece of a solid app, such as input validation or backups.

- Pick the `checkable` blocks whose "applies when" matches this app.
- Blocks at stage `day-one` and `day-one-if` go in the plan's table as needed now.
- Blocks at stage `go-live` that apply are listed under "Before going live".
- Blocks at stage `with-users` are listed as "later". Leave `at-scale` blocks out. Never plan either into a first version.
- Blocks of kind `practice` and `concept` never go in the plan. Use a practice when it helps the user decide something, and a concept to explain a term when it comes up.
- Bring a block up in the conversation only when it changes what gets built, and then as a small story with its name and one-line meaning. Do not present the list as a lecture. The table in the plan is where the full list lives.

## Write the plan

Read [plan-template.md](plan-template.md) and write `docs/plan.md` in that shape, with status `draft`. If a question is still open, put it under "Open questions" rather than guessing silently.

Then show the user a summary of 5 to 8 lines in the chat: what is being built, the first version, the stack, how many blocks it needs, and what only they can do. Ask what to change, and update the file until they are happy.

## Changing a plan

When `docs/plan.md` already exists:

- Edit only the sections the change touches. Never clear "Challenge notes", and never rewrite the plan from the template.
- Under "Changed since the last challenge", add one line per change: which section, and what changed.
- Set status to `draft`, so the change is challenged before tasks are written. If the change is only wording, with no new or different behaviour, keep the current status and tell the user why.

## Finish

Tell the user the next step: run `/clear` to start a fresh conversation, then `/lwh-challenge-plan`, which looks for holes in the plan before anything is built. The fresh start matters because the challenge should judge the written plan, not this conversation.
