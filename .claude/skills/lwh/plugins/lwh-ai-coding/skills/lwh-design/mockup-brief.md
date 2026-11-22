# Mockup brief

For the subagents that build mockups, both the directions in step 3 and the screens in step 4. Fill in the parts in `<>` and send the text below as the subagent's whole prompt. Leave out a line that does not apply.

```
You are building a mockup for an app that is not built yet. It is in <project folder>. A mockup is
a real HTML page that shows one screen exactly as it should look, with realistic content. The
user will open it in a browser to decide how their app looks, and the people who build the app
will reuse your markup and styles. Nothing in it needs to work: no real data, no backend.

Read first:
1. <path to craft-rules.md>          what makes a screen look finished
2. <path to defaults-to-avoid.md>    the looks to stay away from
3. docs/plan.md, the sections "What we're building", "Who it's for" and "What people can do"
<4. docs/design/design.css           the shared styles. Use them. Do not change this file.>

The app: <two lines: what it is, who uses it, where and when>.
The screen: <its name, its one job, and the actions on it, from the plan>.
States to show: <the main state, plus empty / loading / error as the plan gives them. For a
direction: the main state and at most two others>.
Widths: <desktop only | phone only | both: it must work at 375 and at 1440 pixels wide>.
Light or dark: <light | dark | both: the named values cover both modes, and a small switch
lets the user see either one. Never build a second copy of the screen for the other mode. For
a direction, put the switch in the file. For a screen, it is in ../mockup.js already>.

<For a direction in step 3:>
The direction: <its name>.
<the direction in full: every colour with its exact value and its job, the fonts and what each is
used for, the spacing scale, the radius, how dense the screen is, how the screen is laid out and
where the navigation sits, the one signature element, and the one-line reason for each choice>
Follow it exactly. Do not blend it with another look.

Write one file: <output path>.

Rules:
- One HTML file that opens by double-clicking, with no build step and no server.
  <For a direction: put the styles inside the file, with every colour, size and space defined
  once as a named value at the top.>
  <For a screen: link to ../design.css, and to ../mockup.css and ../mockup.js for the parts that
  exist only in the mockup. Start from the shared frame in <path to _shell.html> and do not
  change the frame. Add no new shared styles. If you need a shared piece that is not there,
  put it in a <style> block marked "NEW SHARED", and say so in your reply.>
- Write the markup the way this stack writes its screens: <the stack's way of styling, from the
  plan>. Use plain HTML and CSS with the same names where that cannot run without a build.
- Real content only: the app's real names, and realistic values with units. Include one long
  value and, where the screen has a list, show how it looks empty. Never placeholder text.
- Icons are simple inline SVG. Never emoji. No images from other sites.
- Fonts: <the fonts, with fallbacks>. The page must still look right if a font fails to load.
- Show the main state as the full screen. Show every other state as a labelled piece under it
  that holds only what differs from the main state: the message, the row, the form, the empty
  list. Do not repeat the header, the navigation or the unchanged rows.
- Keep the file small. The people who build the app read it before they start, so every
  repeated block and unused style costs them. Aim for one screenful of markup per state piece.
- Keep it accessible: real headings, labels on form fields, visible keyboard focus.

Before you reply, open your file and check it against the craft rules. Fix what fails.

Reply in 6 lines or fewer: the path, what the screen shows, anything you could not do, any
"NEW SHARED" piece you added, and anything you had to assume that the plan does not say, such
as a time limit or a required field. Do not paste the HTML.
```
