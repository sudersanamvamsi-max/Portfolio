# Phase 2: Home page — hero, curve, two paths

Hand this to Claude Code with `CLAUDE.md` and `content.md`. Do phase 2 only. Stop at the definition of done.

Phase 1 is committed as `dec0ef9`. Branch or commit before starting so this phase can be rolled back on its own.

## 1. What phase 2 delivers

The real home page, replacing the phase-1 placeholder:

1. Hero: name, one-line statement, the survival curve.
2. Two paths: plain links to `/research` and `/engineering`.
3. Two or three featured items, using the existing `MarginRow` primitive.
4. Stub routes at `/research` and `/engineering` so neither link 404s in the static export. Heading and one sentence only; real content is phase 3.

All text comes from `content.md`. Nothing invented.

## 2. The hero curve

This is the site's one signature element and its only automatic animation. Build it as `components/HeroCurve.tsx`.

**Shape.** A monotone decreasing step function, like a Kaplan-Meier curve: horizontal segments joined by vertical drops, starting at the top left, ending lower on the right. Four to seven steps. Small vertical censoring ticks sitting on the horizontal segments, three or four of them.

**Data.** Hard-code the points as a `const` array of `[x, y]` pairs in the component. Invent them for visual balance. They are decoration, not results: no real data, no data from the NIV study, nothing generated at runtime. It must render identically on every build.

**Technique.** Inline SVG with a `viewBox` and `preserveAspectRatio` so it scales with its container. Animate with CSS only — `stroke-dasharray` and `stroke-dashoffset` on the path, roughly 1.2s, ease-out — so it needs no JavaScript, no hydration, and nothing that can break under `output: "export"`. Ticks fade in after the path finishes drawing, slightly staggered.

**Accessibility.** The curve carries no information the text doesn't, so mark it `aria-hidden="true"`. Under `@media (prefers-reduced-motion: reduce)`, show it fully drawn with no animation at all — not a faster version.

**Color.** Path and ticks in `cohort-a`. If there's a baseline or axis line, `grid`. No gradient, no fill under the curve, no glow.

**Sizing.** Roughly 180–220px tall on desktop, shorter on mobile. The name and the one-line statement must both be visible without scrolling at 360px, so the curve must not push them down — shrink or crop the curve at small sizes rather than letting it dominate.

## 3. Hero layout

Order: `h1` with the name (Newsreader), the one-line statement below it, then the curve, then the two path links.

The statement is one sentence and should sit at a comfortable measure, well under 68ch. The two links are plain text links in `cohort-a`, side by side on desktop and stacked on mobile — not buttons, not cards, no arrows appended to the label.

## 4. Featured items

Two or three entries below the hero, using `MarginRow`:

- Predicting failure of non-invasive respiratory support (margin: `Jul 2025 – present`, `MCW`)
- RL Studio (margin: `May 2025 – Mar 2026`, `MSOE`)
- Optionally the disc degeneration preprint

Each is a title plus one or two sentences pulled from `content.md`. Titles link to their detail pages once those exist; for now they can be plain text or link to the section stub. Do not write new descriptions.

Separate the hero from this section with the thin stepped divider described in `CLAUDE.md`, used once. Not between every item.

## 5. Constraints carried forward

- No cards with shadows, no gradient washes, no fade-in on scroll, no numbered markers, no emoji.
- The curve animation is the only automatic motion on the site.
- Sentence case. No uppercase transforms or letter-spaced labels.
- Semantic HTML, visible `cohort-a` focus ring, responsive to 360px, no layout shift.

## 6. Definition of done

Report all of these, then stop:

1. `npm run build` succeeds; `/`, `/research`, `/engineering` all export.
2. `npx tsc --noEmit` is clean.
3. Screenshots from the built export: home at 1280px light and dark, home at 360px, and one frame mid-animation if you can capture it.
4. Confirm the reduced-motion path by forcing `prefers-reduced-motion: reduce` and reporting what renders.
5. Committed as `phase 2: home page, hero curve, path links`.

Do not start phase 3.

## Out of scope

Real research and engineering page content, project detail pages, the synthetic survival demo, theme toggle, favicon, metadata and Open Graph tags, deployment.
