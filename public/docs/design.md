```
```

# Lpyven Website Redesign — `design.md`

> **Status:** Design direction locked
> **Primary reference:** the approved Lyven hero screenshot shared in this project
> **Core requirement:** the website must feel **creative, elegant, modern, clean, intentional, and human-designed** — not generic SaaS, not template-like, and not “AI slop”.

---

## 1. Project Intent

Lyven is positioned as a modern digital partner / software integration studio.

The website should communicate that Lyven can:

- design digital products,
- build web and mobile experiences,
- create custom software,
- integrate existing business systems,
- automate workflows,
- connect APIs, data, tools, and platforms,
- support a product from idea through launch and growth.

The visual identity should feel closer to a refined international product studio than a conventional Indonesian “jasa pembuatan website” landing page.

The website must **not** look like:

- a cheap software-house template,
- a generic SaaS dashboard landing page,
- a page made from repeated card grids,
- an overly futuristic AI website,
- neon cyberpunk,
- heavy glassmorphism,
- random 3D objects,
- excessive glowing elements,
- stock-photo-heavy corporate design.

---

# 2. Approved Visual Direction

The approved hero reference establishes the visual language for the entire site.

## Core characteristics

1. Very light / near-white background.
2. Strong centered typography.
3. Large amount of whitespace.
4. Dark navy / near-black primary text.
5. Bright Lyven blue as the only strong accent.
6. Thin blue orbital lines used as a visual motif.
7. Small blue spheres/nodes moving along the orbital paths.
8. No hero illustration on the left or right.
9. No split-screen hero.
10. No random icons floating around the headline.
11. Decorative elements stay behind the content.
12. Large low-opacity typography at the bottom creates depth.
13. Rounded buttons, but not excessively pill-shaped everywhere.
14. UI should feel engineered and editorial at the same time.
15. Motion should be slow, subtle, deliberate, and continuous.

The hero reference should be treated as a **design lock**, not loose inspiration.

---

# 3. Design Principles

Every section must satisfy these six principles.

### 3.1 Clean

Use whitespace as an active design element.

Avoid filling every empty area with illustrations, labels, icons, or cards.

### 3.2 Elegant

Use:

- restrained color,
- controlled typography,
- subtle borders,
- careful spacing,
- minimal shadows.

Avoid dramatic glow and decorative effects with no purpose.

### 3.3 Modern

Use contemporary editorial layouts, strong typography, subtle interaction, and asymmetric details where useful.

Modern does **not** mean adding more gradients, glass, or 3D.

### 3.4 Creative

Creativity should come from:

- typography,
- composition,
- movement,
- layering,
- transitions,
- scale,
- whitespace.

Not from decorative clutter.

### 3.5 Consistent

The same spacing logic, corner radius, typography hierarchy, motion language, border color, and accent blue should appear throughout the entire website.

### 3.6 Human-designed

Each section should feel intentionally composed.

Do not generate endless repeating cards with:

`icon + title + paragraph + arrow`

unless that structure is genuinely the best solution for the content.

---

# 4. Brand Personality

Lyven should feel:

- intelligent,
- calm,
- capable,
- contemporary,
- collaborative,
- technology-driven,
- approachable,
- precise,
- premium without being luxurious.

Avoid language and visual design that feels:

- overly corporate,
- childish,
- overly futuristic,
- aggressive,
- gimmicky,
- “tech bro”,
- template-like.

---

# 5. Color System

The palette should remain intentionally small.

```css
:root {
  --background: #FFFFFF;
  --surface-soft: #F7FAFF;
  --surface-blue: #EFF6FF;

  --text-primary: #07162F;
  --text-secondary: #66758F;
  --text-muted: #96A3B7;

  --lyven-blue: #1473FF;
  --lyven-blue-hover: #0866EF;
  --lyven-blue-soft: #E7F1FF;

  --border: #E5ECF5;
  --border-blue: #D5E6FF;

  --orbit-line: rgba(20, 115, 255, 0.22);
  --orbit-line-soft: rgba(20, 115, 255, 0.10);

  --watermark: rgba(50, 120, 220, 0.10);
}
```

These values can be tuned slightly during implementation to match the reference image.

## Color rule

At least **80–90% of every viewport should remain white / very light neutral**.

Lyven blue should be an accent rather than a background used everywhere.

---

# 6. Typography

## Recommended font

Primary:

```text
Inter / Inter Tight
```

Alternative:

```text
Geist Sans
```

Use one family across the site unless there is a strong reason to add a second font.

## Hero headline

Desktop:

```css
font-size: clamp(64px, 6.1vw, 108px);
font-weight: 650–750;
line-height: 0.94–1.00;
letter-spacing: -0.045em;
```

Tablet:

```css
font-size: 56–72px;
```

Mobile:

```css
font-size: 42–54px;
line-height: 0.98;
```

The hero headline should normally occupy **2 lines** on desktop.

Example approved pattern:

```text
From idea to
digital reality.
```

Line 1: dark navy
Line 2: Lyven blue

Do not turn every headline into a blue gradient.

A solid blue is preferred.

## Section headings

```css
font-size: clamp(42px, 4vw, 72px);
font-weight: 650–720;
letter-spacing: -0.035em;
line-height: 1.0–1.05;
```

## Body text

Desktop:

```css
font-size: 17–20px;
line-height: 1.55–1.7;
```

Maximum readable paragraph width:

```text
560–680px
```

---

# 7. Global Layout

## Max content width

```css
max-width: 1320px;
```

On larger displays:

```css
max-width: 1440px;
```

## Side padding

Desktop:

```text
64–96px
```

Tablet:

```text
32–48px
```

Mobile:

```text
20–24px
```

## Section spacing

Large sections:

```text
140–190px vertical padding
```

Compact transition sections such as the logo strip:

```text
52–80px vertical padding
```

Avoid using identical height and padding for every section.

The page needs rhythm.

---

# 8. Navbar

The navbar should visually match the approved hero.

## Desktop layout

```text
[ logo placeholder ]          What We Do   Portfolio   Insights          Get a Quote ↗
```

The logo itself will be added separately by the owner.

Implementation should reserve a logo wrapper but must **not recreate or approximate the Lyven logo**.

## Behavior

At top:

- white / transparent background,
- minimal border-bottom,
- no heavy shadow.

After scrolling:

- sticky navbar,
- semi-opaque white,
- subtle `backdrop-filter: blur(14px)`,
- 1px bottom border,
- no dramatic floating-card effect unless later requested.

Suggested height:

```text
76–84px
```

## CTA

Primary nav CTA:

```text
Get a Quote ↗
```

Blue button with white text.

Do not use uppercase.

---

# 9. HERO — DESIGN LOCK

This is the most important section.

The hero should reproduce the approved reference **as closely as possible in composition, density, scale, hierarchy, and atmosphere**.

Do not redesign it into another concept.

---

## 9.1 Desktop composition

Approximate structure:

```text
NAVBAR
──────────────────────────────────────────────────

                 [ eyebrow ]

              From idea to
              digital reality.

             supporting paragraph

       [ Get a Quote ] [ Lihat Portfolio ]

        ─── IDEAS × DESIGN × TECHNOLOGY
                × REAL IMPACT ───

       Think Digital.
             Think Lyven.
```

Orbital lines pass behind all of this content.

---

## 9.2 Hero height

Desktop target:

```text
min-height: calc(100svh - navbar)
```

Recommended visual range:

```text
820–920px
```

The approved screenshot ratio is approximately:

```text
1672 × 941
```

The hero should feel expansive but should not require a user to scroll a large empty screen before reaching the next section.

---

## 9.3 Hero content alignment

The main content is centered both horizontally and visually.

Suggested max width:

```text
900–1050px
```

Headline width:

```text
760–950px
```

Paragraph width:

```text
560–650px
```

---

## 9.4 Eyebrow

Example:

```text
● Digital Partner for Forward-Thinking Brands
```

Appearance:

- small,
- centered,
- 1px border,
- very light blue background,
- subtle rounded pill,
- dark muted text,
- blue dot.

Do not add heavy shadow.

---

## 9.5 Headline

Approved direction:

```text
From idea to
digital reality.
```

The first line is dark navy.

The second line is bright Lyven blue.

Avoid gradients unless they are almost imperceptible.

---

## 9.6 Supporting copy

Approved style:

```text
Kami membantu brand dan bisnis membangun pengalaman
digital yang bermakna — dari strategi, desain, hingga teknologi
yang benar-benar bekerja.
```

Use muted blue-gray.

Keep it centered.

Do not exceed 3 lines on desktop.

---

## 9.7 Hero buttons

Primary:

```text
Get a Quote     ↗
```

Secondary:

```text
Lihat Portfolio     ↗
```

Primary:

- Lyven blue background,
- white text.

Secondary:

- white / transparent,
- fine blue-gray border,
- dark text.

Buttons should have subtle hover movement:

```text
translateY(-2px)
```

Arrow may shift:

```text
translate(2px, -2px)
```

Transition:

```text
180–240ms ease-out
```

---

# 10. Orbit Visual System

The orbital system is a **signature Lyven visual motif**.

It should not feel like a sci-fi solar system.

It should feel like a refined visual metaphor for:

```text
ideas → systems → connections → digital ecosystem
```

---

## 10.1 Orbit lines

Use approximately:

```text
4–6 giant elliptical paths
```

They should extend beyond the viewport boundaries.

Some paths should:

- enter from the left,
- arc behind the hero content,
- exit at the right,
- intersect visually without sharing the exact same center.

Line appearance:

```css
stroke: rgba(20, 115, 255, 0.15–0.28);
stroke-width: 1px;
```

A few secondary paths may use:

```css
opacity: 0.08–0.14;
```

Do not use dashed paths.

Do not animate the actual path itself spinning around the page.

The paths remain visually stable.

---

# 11. Orbit Node Animation

Small spherical blue nodes move along the orbit paths.

This motion is explicitly required.

## Motion behavior

Each node:

- follows its assigned elliptical path,
- moves continuously,
- loops infinitely,
- moves at a constant or near-constant visual speed,
- does not abruptly reset,
- does not bounce,
- does not rotate like a loading spinner,
- does not synchronize perfectly with other nodes.

Nodes should look subtly dimensional but not like shiny AI-generated 3D bubbles.

---

## 11.1 Recommended implementation

Preferred approach:

### SVG path + CSS Motion Path

Create SVG paths matching the visible orbit curves.

Use the same geometry for:

1. visible SVG orbit line,
2. CSS `offset-path`.

Example concept:

```css
.orbit-node {
  offset-path: path("M ...");
  offset-rotate: 0deg;
  animation: orbit-travel 24s linear infinite;
}

@keyframes orbit-travel {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}
```

For alternate nodes:

```css
animation-direction: reverse;
```

Use different starting offsets with:

```css
animation-delay: -8s;
```

Negative delay ensures the animation is already in progress when the page loads.

---

## 11.2 Recommended motion durations

Use variation:

```text
Node A: 20s
Node B: 26s
Node C: 31s
Node D: 23s
Node E: 34s
```

Recommended range:

```text
18–36 seconds
```

Do not animate all nodes at identical speed.

---

## 11.3 Node visual

Typical node sizes:

```text
small: 8–10px
medium: 14–18px
featured: 22–28px
```

Suggested visual:

```css
background:
  radial-gradient(
    circle at 35% 30%,
    #DCEBFF 0%,
    #71ADFF 30%,
    #1473FF 68%,
    #0D5AD8 100%
  );
```

Shadow:

```css
box-shadow:
  0 4px 12px rgba(20, 115, 255, 0.20),
  0 0 18px rgba(20, 115, 255, 0.10);
```

Keep the glow subtle.

---

# 12. Reduced Motion

Accessibility is mandatory.

```css
@media (prefers-reduced-motion: reduce) {
  .orbit-node {
    animation: none;
  }
}
```

Orbit lines stay visible.

Nodes remain positioned statically.

No content should depend on motion to be understandable.

---

# 13. Hero Background Depth

The background is not pure flat white.

Use extremely subtle radial light-blue fields around the edges.

Example:

```css
background:
  radial-gradient(
    circle at 0% 45%,
    rgba(90, 160, 255, 0.11),
    transparent 28%
  ),
  radial-gradient(
    circle at 100% 30%,
    rgba(90, 160, 255, 0.10),
    transparent 28%
  ),
  #fff;
```

Do not create a visible “gradient wallpaper”.

It should mostly be perceived as white.

---

# 14. Hero Bottom Watermark

A major visual detail from the reference:

```text
Think Digital.
Think Lyven.
```

This text sits behind / beneath the hero and is partially clipped by the viewport.

## Style

Desktop size:

```text
150–210px
```

Weight:

```text
650–750
```

Color:

```text
rgba(60, 125, 220, 0.09–0.13)
```

Line height:

```text
0.78–0.88
```

Position:

- absolute,
- near hero bottom,
- centered,
- width larger than content,
- partially clipped using `overflow: hidden`.

The text is decorative and should use:

```html
aria-hidden="true"
```

On mobile, either greatly reduce it or hide it entirely if it hurts readability.

---

# 15. Compact Client Logo Strip

Immediately after hero:

```text
[ client logo ] [ client logo ] [ client logo ] ...
```

This section should be compact.

The user explicitly prefers the client logo area to **not consume much vertical space**.

Recommended:

```text
height: 100–150px
```

or:

```text
padding: 40–56px 0
```

Use monochrome logos.

Possible behavior:

- horizontally scrolling marquee,
- very slow,
- pause on hover,
- edge fade masks.

No large heading is necessary.

Optional tiny label:

```text
TRUSTED BY FORWARD-THINKING TEAMS
```

---

# 16. Selected Work / Portfolio

The portfolio must feel more editorial than a marketplace card grid.

Use:

- large project imagery,
- 3–4 featured projects,
- strong hierarchy,
- very little metadata.

Suggested headline:

```text
Real projects.
Real impact.
```

or:

```text
Ideas shaped
into real products.
```

Possible projects:

- MySchoolMate,
- Qwibly,
- POS Haji Wong Halal,
- Muslim 101,
- other verified Lyven work.

Use only real projects and claims.

Do not invent client names, metrics, testimonials, or brands.

---

# 17. Services / What We Do

Core service groups:

```text
01 Web & Mobile Development
02 System Integration
03 AI & Automation
04 Digital Consultation
```

The preferred visual treatment is editorial / grid-based.

Avoid four giant generic cards if a simpler divided layout works.

Recommended desktop layout:

```text
large section headline

01          02          03          04
service     service     service     service
```

Use vertical dividers instead of excessive rounded containers.

---

# 18. Why Lyven / Value Proposition

Purpose:

Explain why a client should work with Lyven without turning the section into eight generic benefit cards.

Core value pillars:

```text
Business-Focused
End-to-End Expertise
Scalable & Future-Ready
Long-Term Partnership
```

Suggested headline:

```text
More than development.
A long-term digital partner.
```

Keep this section concise.

---

# 19. How We Work / Process

Recommended process:

```text
01 Discover
02 Strategy
03 Design
04 Build & Launch
```

Optional fifth stage:

```text
05 Improve & Scale
```

Preferred layout:

a horizontal journey / line-based process rather than four heavy cards.

Use minimal icons only if necessary.

---

# 20. Tech / Integration Ecosystem

This section should be modern and restrained.

The earlier “everything orbiting around Lyven” approach can easily become visual noise.

Preferred direction:

### Structured ecosystem map

Group technologies by business role:

```text
Customer Channels
Business Systems
Data & Intelligence
Infrastructure
Automation / Operations
Custom Solutions
```

Then visually show Lyven as the integration layer.

Example:

```text
Customer Channels ─┐
Business Systems ───┤
Data & Intelligence ├── LYVEN INTEGRATION LAYER
Infrastructure ─────┤
Automation ─────────┤
Custom Solutions ───┘
```

Use thin lines, not glowing cables.

No huge cluster of rounded icon boxes.

---

# 21. About / Studio

The About section should feel editorial and human.

Avoid generic mission / vision cards.

Possible headline:

```text
A small studio
with a bigger purpose.
```

or:

```text
People.
Ideas.
Real impact.
```

Use real team/studio imagery only when available.

Never use AI-generated fake employee photos on the production website.

If photography is not ready, use an intentional placeholder or typography-only layout.

---

# 22. Testimonials

If authentic testimonials are available:

- use one strong testimonial at a time,
- large quote,
- name / company / role,
- subtle pagination.

Avoid a dense grid of fake testimonial cards.

If verified testimonials are not available, omit this section for now.

Never fabricate testimonials.

---

# 23. Final CTA

The CTA should be confident and minimal.

Possible copy:

```text
Have an idea?
Let's make it work.
```

or:

```text
Ready to build
what's next?
```

CTA:

```text
Start a Project ↗
```

This is one of the few sections allowed to use a stronger Lyven-blue background if desired.

---

# 24. Footer

Simple and editorial.

Example:

```text
Lyven

What We Do
Portfolio
About
Contact

Instagram
LinkedIn
GitHub

Bandung, Indonesia
Working worldwide

© 2026 Lyven
```

Large decorative `LYVEN` typography may be used near the bottom.

---

# 25. Border Radius

Use a restrained radius system.

```css
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-pill: 999px;
```

Do not apply `24px` radius to every element.

Use radius based on purpose.

---

# 26. Shadows

Default:

```css
box-shadow:
  0 8px 30px rgba(8, 32, 70, 0.05);
```

Hover:

```css
box-shadow:
  0 14px 40px rgba(8, 32, 70, 0.08);
```

Avoid:

- large glowing blue shadows,
- overly soft “AI SaaS” cards,
- shadow on every object.

---

# 27. Borders

Default:

```css
border: 1px solid #E5ECF5;
```

Interactive subtle blue:

```css
border-color: #D5E6FF;
```

Borders should usually be almost invisible until the user pays attention.

---

# 28. Interaction Language

Animations should feel calm.

Recommended:

```text
hover: 180–260ms
section reveal: 500–800ms
orbit travel: 18–36s
marquee: 28–45s
```

Preferred easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Use:

- small translate,
- opacity,
- mask reveals,
- line progression,
- subtle scale (`1 → 1.015`).

Avoid:

- large spring animations,
- bouncing,
- exaggerated parallax,
- cursor followers,
- excessive 3D tilt,
- every element animating on scroll.

---

# 29. Scroll Reveal

Keep scroll animations limited.

Recommended:

```text
heading: fade + y 20px
body: fade + y 12px
project visual: fade + scale 0.985 → 1
```

Stagger only where needed.

The page must still look complete if JavaScript animation fails.

---

# 30. Responsive Rules

## Desktop

Hero:

- centered,
- orbit system visible in full,
- watermark visible,
- two CTA buttons inline.

## Tablet

- reduce orbit density,
- reduce watermark size,
- maintain centered hero,
- section layouts may become 2 columns.

## Mobile

Hero remains centered.

Headline:

```text
2–4 lines depending on viewport
```

Orbit system:

- show only 2–3 paths,
- use fewer nodes,
- avoid paths crossing directly behind readable text,
- reduce animation speed slightly if needed.

CTA:

- stacked or two compact buttons if they fit.

Watermark:

- reduced drastically or hidden.

Sections:

- single column,
- generous but not excessive vertical spacing.

---

# 31. Performance Requirements

The orbit visual must be lightweight.

Preferred technologies:

1. SVG
2. CSS Motion Path
3. CSS transform / opacity

Avoid using:

- WebGL,
- Three.js,
- canvas animation,

for the hero unless there is a proven requirement later.

Target:

```text
60 FPS on modern laptop / desktop
stable performance on mid-range mobile
```

Do not animate expensive properties like:

```text
width
height
top
left
filter blur continuously
```

Prefer compositor-friendly animation.

---

# 32. Accessibility

Required:

- semantic navigation,
- semantic headings,
- visible keyboard focus,
- WCAG-friendly contrast,
- button labels understandable without icons,
- decorative orbit graphics `aria-hidden`,
- reduced-motion handling,
- images with meaningful alt text,
- no essential information represented only by color.

---

# 33. Content Rules

Writing tone:

```text
clear
confident
short
human
business-oriented
```

Avoid:

```text
revolutionary
cutting-edge
next-generation
game-changing
unleash the power
transform your future
seamlessly innovate
```

unless there is specific evidence or context.

Do not write generic AI-generated marketing copy.

Prefer plain statements describing what Lyven actually does.

---

# 34. Anti-AI-Slop Rules

These are explicit project constraints.

Do **not** introduce:

- random glowing spheres,
- holographic glass cards,
- 3D cubes,
- neon purple gradients,
- abstract AI humanoids,
- glowing network brains,
- excessive floating UI chips,
- fake dashboards just for decoration,
- fake company logos,
- fake metrics,
- fake testimonials,
- icon-heavy benefit cards,
- blur everywhere,
- gradient text on every heading,
- dozens of nested rounded cards.

The hero’s orbit nodes are an approved exception because they are part of the chosen Lyven visual language.

Even there, keep them controlled and minimal.

---

# 35. Component Language

Suggested component hierarchy:

```text
SiteHeader
Hero
OrbitBackground
ClientLogoStrip
SelectedWork
Services
WhyLyven
Process
IntegrationEcosystem
AboutStudio
Testimonials
FinalCTA
SiteFooter
```

Supporting reusable components:

```text
SectionEyebrow
SectionHeading
PrimaryButton
SecondaryButton
ProjectCard
OrbitPath
OrbitNode
LogoMarquee
```

Avoid building every section from the exact same generic `Card` component.

---

# 36. Hero DOM Concept

Suggested conceptual structure:

```tsx
<section className="hero">
  <OrbitBackground aria-hidden />

  <div className="hero-content">
    <SectionEyebrow />

    <h1>
      From idea to
      <span>digital reality.</span>
    </h1>

    <p>
      ...
    </p>

    <div className="hero-actions">
      ...
    </div>

    <div className="hero-principles">
      IDEAS × DESIGN × TECHNOLOGY × REAL IMPACT
    </div>
  </div>

  <div className="hero-watermark" aria-hidden>
    <span>Think Digital.</span>
    <span>Think Lyven.</span>
  </div>
</section>
```

---

# 37. Orbit Component Concept

Suggested architecture:

```tsx
<svg className="orbit-lines" viewBox="0 0 1672 900">
  <path id="orbit-a" ... />
  <path id="orbit-b" ... />
  <path id="orbit-c" ... />
  <path id="orbit-d" ... />
</svg>

<div className="orbit-node node-a" />
<div className="orbit-node node-b" />
<div className="orbit-node node-c" />
<div className="orbit-node node-d" />
```

The visible SVG paths and CSS motion paths should use matching geometry.

If exact CSS `offset-path: path()` maintenance becomes awkward, use SVG `<animateMotion>` as a fallback.

Do not move the entire SVG.

Only the nodes travel.

---

# 38. Hero Z-Index Structure

Recommended:

```text
z-index 0 — subtle background gradients
z-index 1 — orbit lines
z-index 2 — moving orbit nodes
z-index 3 — watermark
z-index 5 — hero content
z-index 10 — navbar
```

Nodes may visually pass behind the main copy but should never make text difficult to read.

Use opacity / masking around the center if necessary.

---

# 39. Motion Mask Around Content

To preserve readability, optionally create a soft white radial mask behind the content:

```css
.hero::after {
  content: "";
  position: absolute;
  inset: 10% 18%;
  background: radial-gradient(
    ellipse at center,
    rgba(255,255,255,.88) 0%,
    rgba(255,255,255,.62) 42%,
    rgba(255,255,255,0) 76%
  );
  pointer-events: none;
}
```

This must be subtle.

The orbit lines should still remain visible.

---

# 40. Implementation Fidelity

When implementing from the approved screenshot:

Prioritize in this order:

1. Composition
2. Typography scale
3. Whitespace
4. Headline line breaks
5. Orbit geometry
6. CTA positioning
7. Watermark placement
8. Color
9. Small details

Do not sacrifice composition in order to add more decorative features.

---

# 41. Definition of Done — Hero

The hero is finished only when:

- [ ] The layout visually matches the approved reference.
- [ ] Main content is centered.
- [ ] There is no left-text/right-image layout.
- [ ] Logo area is reserved but no fake Lyven logo is generated.
- [ ] Headline has the intended dark + blue hierarchy.
- [ ] Orbit curves resemble the reference.
- [ ] Multiple nodes move smoothly along those exact curves.
- [ ] Node movement is infinite with no visible jump.
- [ ] Each node uses a different speed / phase.
- [ ] Animation remains smooth at typical desktop sizes.
- [ ] Reduced-motion is supported.
- [ ] Large `Think Digital. Think Lyven.` typography is clipped near the bottom.
- [ ] CTA buttons match the restrained aesthetic.
- [ ] Hero works correctly on desktop, tablet, and mobile.
- [ ] No unnecessary 3D / glowing / AI-style decorations have been introduced.

---

# 42. Definition of Done — Entire Site

The redesign is considered visually consistent when:

- all sections feel like part of the same system as the hero,
- Lyven blue is used consistently and sparingly,
- typography drives the visual hierarchy,
- the page does not become a sequence of generic cards,
- motion remains subtle,
- content is easy to scan,
- portfolio is visually prominent,
- integration capability is clear,
- mobile layouts retain the same premium feel,
- no fake claims or placeholder corporate logos are presented as real clients.

---

# 43. Final Design North Star

When uncertain about a design decision, use this test:

> **Would removing this element make the page clearer without losing meaning?**

If yes, remove it.

The Lyven website should communicate sophistication through **clarity, typography, spacing, and purposeful motion**, not through visual excess.

The approved hero is the benchmark for every section that follows.
