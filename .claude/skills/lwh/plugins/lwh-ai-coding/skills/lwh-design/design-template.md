# Design template

Write `docs/design.md` in exactly this shape. Keep it short. It says what was chosen and how to use it. The values themselves are in `docs/design/design.css`, so do not copy every value here.

Keep every heading exactly as written here, in English, whatever language the content is in. The other skills find sections by these headings.

```markdown
# Design: <App name>

## Direction
Three or four lines: how the app should feel, who it is for, and why this look fits it. End with the one thing a person should remember about how it looks.

## References
What the user brought, what was taken from it, and what was chosen without it. "None" when the user brought nothing.

## Colours
| Name | Used for |
|---|---|
| <the name used in design.css> | <its one job> |

Say which colours carry a meaning, such as a status, and must not be used for anything else.

## Typography
The fonts, what each is used for, and the fallback. The text sizes and the job of each.

## Spacing and shape
The spacing scale, the radius, borders and shadows, and how dense the screens are.

## Components
| Component | Mockup that shows it | How to use it |
|---|---|---|

The shared pieces more than one screen uses. One line each.

## Screens
| Screen | Mockup | States shown | Widths |
|---|---|---|---|

One line per screen in the plan. A screen with no mockup of its own is listed too: under "Mockup", write "none, follows" and the mockup closest to it, and name the shared components it is built from.

## Words
How the app talks: two or three lines, with the real names of the main actions.

## Do and don't
Up to six lines. What to keep doing, and the mistakes that would break this design.

## Where the values live
`docs/design/design.css` holds every colour, size and space as a named value. T00 brings them into the app's own styles, and from then on the app's styles are the source. The mockups are a starting point to reuse, not a picture to match exactly.

## Decisions
One line per decision, with the date: what was chosen, what was turned down, and the user's own words where they gave them.
```
