---
name: Yaqi Hou
description: A personal field study in complex systems, with clear introductions and generous reading space.
colors:
  bg: "#f8f7fb"
  surface: "#eee9f5"
  ink: "#2e2639"
  muted: "#665b73"
  accent: "#654583"
  line: "#d7cedf"
  highlight: "#d9eca6"
  highlight-ink: "#304215"
  footer-bg: "#30263d"
  footer-ink: "#f5f0fc"
  field-line: "#725090"
  field-accent: "#a19b3f"
  dark-bg: "#211b28"
  dark-surface: "#2c2435"
  dark-ink: "#f2eaf9"
  dark-muted: "#bfb0cd"
  dark-accent: "#cab0e6"
  dark-line: "#51425f"
  dark-footer-bg: "#17131d"
  dark-field-line: "#b395d0"
  dark-field-accent: "#c3d59a"
typography:
  display:
    fontFamily: "Afacad, 'Trebuchet MS', sans-serif"
    fontSize: "clamp(3rem, 6.8vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Afacad, 'Trebuchet MS', sans-serif"
    fontSize: "clamp(2.2rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  title:
    fontFamily: "Afacad, 'Trebuchet MS', sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  body:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  navigation:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Public Sans', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.75
  disclosure-title:
    fontFamily: "Afacad, 'Trebuchet MS', sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  control: "5px"
  action: "6px"
  pill: "24px"
spacing:
  compact: "8px"
  small: "12px"
  text-gap: "20px"
  mobile-gutter: "24px"
  section-gap: "40px"
  tablet-gutter: "48px"
  wide-column-gap: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.action}"
    padding: "13px 21px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
  text-link:
    textColor: "{colors.ink}"
    padding: "10px 0"
  theme-control:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  disclosure-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    typography: "{typography.label}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  disclosure:
    textColor: "{colors.ink}"
    padding: "23px 4px"
---

# Design System: Yaqi Hou

## Overview

**Creative North Star: "A personal field study"**

The site pairs a cursor-reactive field drawing with the directness of a personal introduction. Pale lilac grounds, plum lettering, open sections, and humanist display type give technical work a thoughtful, approachable setting. Reading pages carry the same materials into long-form content.

The presentation is spacious at the page level and compact within lists. Headings establish hierarchy; thin rules separate related entries; native disclosures let readers choose their depth. This records the finished plain HTML, CSS, and JavaScript implementation, with no approved visual comp. The source of truth is `assets/css/style.css`, with interaction behavior in `assets/js/theme.js`, `assets/js/navigation.js`, and the homepage-only `assets/js/field.js`.

**Key Characteristics:**

- Plum and pale lilac, with chartreuse reserved for selection and optical accents.
- Afacad display lettering paired with Public Sans reading text.
- Continuous sections, open rows, and fine dividing lines.
- A gently evolving field drawing with local spring-based thread interaction.
- Light by default, with a persistent dark option and native disclosures.

## Colors

The palette combines a cool, near-white ground with warm plum text and quiet lilac surfaces.

### Primary

- **Plum accent** (`accent`): emphasized role text, inline article links, interactive hover states, active navigation, and focus outlines.
- **Light plum accent** (`dark-accent`): the equivalent emphasis in dark mode.

### Secondary

- **Chartreuse highlight** (`highlight`, `highlight-ink`): text selection and hover emphasis inside the dark connection section.
- **Optical plum and olive** (`field-line`, `field-accent`): the canvas line families. Their dark variants keep the artwork distinct against the dark surface; they are drawing colors, not reading-text colors.

### Neutral

- **Chalk ground** (`bg`) and **pale lilac surface** (`surface`): the page and continuous supporting bands, code blocks, and disclosure controls.
- **Plum ink** (`ink`), **muted plum** (`muted`), and **lilac rule** (`line`): primary text, supporting text, and separators.
- **Deep plum ground** (`footer-bg`) and **pale footer ink** (`footer-ink`): the connection section's reverse-color treatment.
- **Dark counterparts** (`dark-bg`, `dark-surface`, `dark-ink`, `dark-muted`, `dark-line`, `dark-footer-bg`): replacements applied through the same CSS variables when `data-theme="dark"`. Highlight colors and footer ink remain shared.

The frontmatter preserves the source hex values. Dark-prefixed entries document overrides rather than additional accents. The declared but unused `surface-deep` variable is intentionally excluded from the normative palette.

**The Paired Theme Rule.** Apply colors through semantic CSS variables so text, boundaries, surfaces, and the drawing change together when the visitor switches themes.

## Typography

**Display Font:** Afacad, with Trebuchet MS and sans-serif fallbacks.

**Body Font:** Public Sans, with system-ui and sans-serif fallbacks.

Both families are self-hosted WOFF2 files under `assets/fonts/`, with normal weights (400–700) and swap loading. Afacad supplies open, rounded character; Public Sans keeps dense professional and academic text legible. The hierarchy uses fluid headings and contextual sizes, not a strict modular ratio.

### Hierarchy

- **Display:** the frontmatter display role is the global heading base. The home name becomes `clamp(4rem, 17vw, 5.5rem)` on small screens. Detail-page titles use `clamp(3rem, 5.2vw, 4.6rem)`, then (48px) on mobile.
- **Headline:** the global section-heading role is fluid. Article section headings use (2.5rem), then (34px) on mobile.
- **Title:** global tertiary headings use the title role. Article subheadings use (1.9rem), then (28px) on mobile. Disclosure titles use their distinct frontmatter role, reducing to (23px) on mobile.
- **Body:** the main reading role reduces to (16px) on mobile, and article prose does so at the intermediate breakpoint. Introductory article paragraphs use (19px / 1.8), reducing to (18px). Reading text is limited to (72ch).
- **Navigation and label:** Public Sans supports navigation, captions, dates, and controls. Supporting labels stay in normal sentence or title case; compact skill metadata sometimes uses (11px).
- **Wordmark:** the `yh.` identity uses Afacad (600, 42px / 1, −.04em), reducing to (38px) on mobile.

**The Two Voices Rule.** Use Afacad for identity and reading hierarchy, and Public Sans for body text, navigation, and supporting information.

## Layout

The main container caps at (1200px). Below (1320px), it uses side margins of (48px); at (720px) and below, margins become (24px). Shared breakpoint adjustments also occur at (900px). The fixed values in the spacing frontmatter are recurring measurements, not a claim that every gap belongs to a uniform scale.

Wide home sections use paired columns with varied proportions. The home introduction pairs a narrow heading with wider prose; work sections use equal columns. The work section uses a large section title above two smaller editorial titles. At the mobile breakpoint, paired columns become single-column flows. The redundant homepage exploration list has been removed. Section spacing typically ranges from (60px) to (100px) on large screens and becomes more compact on mobile.

Detail pages pair a sticky contents column (230px) with a flexible article and a (72px) gap. The intermediate layouts reduce the contents width to (200px), then (170px), with gaps of (48px), then (35px). On mobile the contents block moves above the article and becomes static. The article retains its readable line length.

The sticky header has an (88px) minimum inner height, becoming (76px) on mobile. Anchor scroll clearance is (112px), then (100px) on mobile. Print removes navigation and artwork, opens the reading layout, and exposes disclosure content.

## Elevation & Depth

The site uses no box shadows. Depth comes from pale tonal bands, fine borders, and the dark connection section. The header is opaque and sticky, separated by a single rule. The interference drawing gains depth through overlapping translucent lines, not through floating card surfaces.

**The Open Surface Rule.** Separate reading groups with spacing, tonal bands, or fine rules; preserve the flat surfaces used by the finished site.

## Shapes

Primary actions and code blocks have small corners; disclosure controls use a slightly smaller radius. Theme and menu controls use pill silhouettes. Content rows remain square and open. Borders are generally a single pixel; keyboard focus is a separate accent outline (3px) offset by (5px).

The artwork floats directly on the page background, without a frame or colored backdrop. The artwork is hidden at 900px and below, and on touch-only/coarse-pointer devices. Directional icons are inline stroked SVG; disclosure chevrons are drawn with CSS borders.

## Components

### Primary actions and text links

Primary links use ink fill and ground-colored text, compact rounded corners, and a minimum height of (48px). Hover changes the fill to accent. The home action uses the surrounding (14px) type, with tighter mobile padding and (13px) type. Text links pair a label with an inline arrow, acquire an underline on hover, and share the global focus outline. These are real links with native destinations.

### Theme and menu controls

Outlined pills are transparent at rest, with a minimum height of (44px). Hover adds the pale surface and strengthens the border. On mobile the theme label hides while the SVG icon and accessible action label remain. Dark mode is explicitly chosen; light remains the default. The preference persists across pages and synchronizes across tabs.

Theme changes use a view-transition fade when available: old content exits over (420ms), new content enters over (520ms) with a small vertical movement. The fallback transitions background, text, borders, and fill over (380ms). Reduced motion suppresses these transitions. The theme control is disabled while a view transition finishes.

### Navigation

Desktop navigation is an open horizontal row with an accent underline for the current page. On mobile, JavaScript exposes a Menu control and an expandable vertical list with fine row dividers; the current page uses accent text and stronger weight. Escape closes the menu and restores focus to its control. Outside clicks and selecting a link also close it. Without JavaScript, links remain visible.

### Reading disclosures

Native `details` and `summary` retain their browser interaction model. A fine top border separates each item; the final item also has a bottom border. The summary has generous vertical padding, an Afacad title where appropriate, and a CSS chevron that turns over (220ms) when open. Hover changes summary text to accent; keyboard focus uses the global outline. Narrow summaries wrap metadata below titles.

The pale, compact expansion control toggles all article disclosures. Following a fragment opens ancestor disclosures before scrolling. Printing temporarily opens all details and restores the previous state afterward. No additional hover or active treatment is currently defined for the bulk expansion control.

### Interference field

The home artwork contains 46 closed paths in plum and olive. Cached harmonics
keep the threads moving gently on their own, with a slow phase drift. Each strand
has 210 spring-connected points: restoring stiffness 55/s², neighboring tension
450/s², and damping 10/s. Integration uses substeps no longer than 1/120 second. Settled spring offsets
sleep below 0.001px displacement and 0.01px/s velocity while ambient drift
continues. Cursor contact rejects distant points before calculating distances.
The cursor contacts a compact region (6.5% of the shorter canvas dimension),
pushing across each strand's tangent and transferring some stroke momentum.
Swept contact catches fast strokes; tension propagates each bend, and damping
settles the release. This is a stylized spring model, not a scientific simulation.
The canvas and its container stay fixed. There is no caption or pause label.
Focus loss releases cursor contact without stopping ambient motion. Browsers can
throttle hidden tabs; elapsed time preserves the ambient phase on return. Drawing
stops offscreen. Reduced motion keeps the drawing static. Widths of 900px and
below, touch-only devices, and coarse pointers hide it and release the canvas.

The concept is abstract, inspired by overlapping curves and interference. It is not
a physical simulation or data plot. The canvas is decorative and hidden from the
accessibility tree; no factual information or action depends on it.

### Fine details

The current Work timeline dot emits one thin plum ring every 5.5 seconds, with
most of each cycle spent at rest. The dot stays solid and the ring uses only
transform and opacity. An intersection observer pauses it offscreen; hidden tabs
pause it too. Reduced motion and print remove the ring, preserving the dot and
Current role text. No other timeline milestone pulses.

Theme icons turn 12 degrees on pointer hover or keyboard focus (240ms), and the
Back to top arrow moves upward by 3px (200ms). Touch devices do not inherit sticky
hover effects. Reduced motion preserves colors and focus outlines without these
spatial movements. Timeline milestone headings and nodes also take the accent color on hover or
focus within their existing links; the current-role ripple remains the sole loop.

### Navigation and small motion

Supporting browsers use native same-origin document transitions with a 160ms exit
and a 220ms entry cross-fade. Theme changes retain their separate 420/520ms fade and
slight vertical movement. Reduced motion disables navigation transitions.

Navigation underlines extend over 180ms; link arrows move 3px toward their destination
on hover or keyboard focus. Buttons transition their existing colors over 160ms.
Detail-page headings retain normal heading semantics and gain a short plum rule
accent (40px wide, inset 16px from the heading bottom), with a 420ms entrance and a
small extension on hover. The accent is separated from the Research panel by
28px of open space. The former full-width heading border is removed.

Above 720px, the main heading gently scales down and fades as it passes under
the sticky navigation. The sidebar title's opacity, 24px translation, and scale
(1.18 to 1) follow the final 180px of the contents column's approach to its sticky
position. This is continuous scroll progress, not a timed transition triggered
at a threshold; stopping or reversing scroll stops or reverses the presentation.
The compact title links to the original heading. A reserved grid cell prevents
layout jumps. A passive scroll listener coalesces updates into one animation
frame, reads layout before writes, and schedules no idle loop. Resize, font load,
and disclosure changes refresh the positions. On mobile, the ordinary On this
page label remains. Reduced motion changes the sidebar label without movement
and leaves the main heading untransformed. Article content always remains visible.

### Career timeline and explanatory diagrams

The Work page starts with five career milestones in a semantic ordered list. A fine
plum rule connects hollow nodes; the current role uses a filled node and a small
chartreuse label. Dates and full role names remain readable text. Milestones are
ordered by start date and evenly spaced, rather than plotted on a duration axis.
At 720px and below, the rule becomes vertical and entries stack in reading order.

The technology map uses six open, border-separated lanes. A small stroked icon,
purpose, and visible tool names connect to a business application. The former
Technology Stack and Technical Skills Deep Dive sections are consolidated into
Tools, skills & applications. Each lane preserves its example disclosure and
adds its matching full-width skill disclosure. Expanded skill groups align a
subcategory label with rows of names, proficiency levels, and application context;
at 900px and below, groups and descriptions stack. All original skill entries,
proficiency labels, counts, and contexts remain, as does the old deep-dive anchor. Desktop lanes read left to right;
mobile lanes place the application below the tools with a thin connecting rule.
Work contribution disclosures similarly keep a one-line summary visible.

The Research page's pale-lilac methods diagram connects few-body physics, automated
algebra, and many-body matter. Its SVGs illustrate particles, algebra, and waves;
they carry no numerical data. The figure caption, diagrams, and ordinary HTML labels
are center-aligned. Each diagram is an anchor to a related reading section and keeps
its native keyboard focus. Hover or keyboard focus keeps the diagrams moving: particles wander independently
between bounded random waypoints (1.2–2.6 seconds each) while their bonds follow;
algebra dashes flow continuously in 900ms cycles; three sine-wave paths travel
with 1.1-radian phase offsets. Particle and wave motion eases back to rest on exit.
Offscreen diagrams and hidden tabs stop their loops. The research-only script
handles the two geometry animations; algebra uses CSS.
Reduced motion retains color, underline, and focus feedback with static diagrams.
On mobile, the entries stack vertically. Directional arrows have been removed.

These additions reuse the existing palette, fonts, native disclosures, and focus
styles. The homepage retains the interference artwork as its main visual moment.

## Do's and Don'ts

### Do:

- **Do** use semantic palette variables and verify both themes when adding a surface.
- **Do** use the self-hosted Afacad and Public Sans roles for a consistent hierarchy.
- **Do** preserve open reading rows, readable line lengths, and the mobile single-column flow.
- **Do** retain native links, disclosures, visible focus, and reduced-motion alternatives.

### Don't:

- **Don't** turn the personal homepage into metric tiles or a dashboard.
- **Don't** make decorative artwork carry factual claims or reading instructions.
- **Don't** replace working disclosure and navigation semantics with decorative interactions.
- **Don't** force motion or a dark default over the visitor's accessible reading experience.
