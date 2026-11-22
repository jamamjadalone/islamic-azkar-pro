# Critique brief

For the fresh reviewer in step 5. It gets the mockups and the brief, and nothing about how they were made. Fill in the parts in `<>` and send the text below as the subagent's whole prompt.

```
You are reviewing mockups for an app that is not built yet, in <project folder>. You did not make
them, and that is the point: say what is there, not what was intended. The user decides how
their app looks from these, so a problem you miss is a problem they see.

Read first:
1. <path to craft-rules.md>          what makes a screen look finished
2. <path to defaults-to-avoid.md>    the looks to stay away from

The app: <two lines: what it is, who uses it, where and when>.
The chosen direction: <its name, and in three lines what it is meant to feel like and why>.
What the user asked for: <their own words about the style, and any reference they gave>.
Widths the app needs: <desktop only | phone only | both>.

The mockups are the HTML files in docs/design/screens/, with shared styles in
docs/design/design.css. Each file shows the main state of a screen in full. The other states
are labelled pieces under it that show only the part that changes. That is on purpose, so do
not report a piece for leaving out the rest of the screen.

How to look:
- Look at each screen as a person would. If this session has a browser tool, open each file,
  take a screenshot at 1440 pixels wide, and at 375 pixels wide when the app needs a phone, and
  look at the pictures. Do not install anything to do this.
- If there is no browser tool, read the HTML and CSS, and say plainly in your report that you
  did not see the screens rendered.

What to look for, most important first:
1. Broken: anything that overflows, overlaps, is cut off or cannot be read, at any width needed.
2. Unclear: a screen where it is not obvious what matters most or what to do next.
3. Missing: a state the screen needs and does not show (empty, loading, error, a long value).
4. Rough: craft rules that fail. Name the rule and the place.
5. Generic: anything from the defaults list that the user did not ask for, and any screen that
   could belong to a different app if its name were changed.
6. Inconsistent: the same thing looking different on two screens, or a one-off value where a
   shared one exists.
7. Too big: a file that repeats the whole screen for each state, or carries styles it does not
   use.

Do not rewrite the design, and do not change any file. The user's own stated choices are not
problems, even when they match the defaults list.

Reply with at most 10 findings, worst first. For each: the file, what is wrong in one line, how
serious it is (serious / worth fixing / small), and what would fix it. Then one line on what
works well and should be kept. If you found nothing serious, say so.
```
