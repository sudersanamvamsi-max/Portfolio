# Phase 3: Research index and project pages

Hand this to Claude Code with `CLAUDE.md` and `content.md`. Do phase 3 only. Stop at the definition of done.

Commit the phase 2 work first so the cleanup below lands on a clean tree.

## Part A: Home page cleanup

Three fixes before any new pages.

1. **The name appears twice on `/`.** The header wordmark and the hero `h1` both render "Vamsi Sudersanam" in the first 150px. Hide the header wordmark on the home route only; keep it on every other route, where it's the way back home. Keep the `h1`.
2. **The stepped divider doesn't read as a divider.** At full column width with small steps it looks like a rendering artifact. Make it roughly a quarter of the column width, left-aligned, with three or four clearly visible steps.
3. **Inconsistent measure.** The hero statement wraps around 60 characters while the featured paragraphs run wider. Use the same `max-width` token for both.

## Part B: Content data layer

`content.md` stays the human source of truth, but pages should not parse Markdown at build time. Introduce a small typed module — `content/research.ts` or similar — exporting typed objects for the research entries, transcribed from `content.md` by hand.

Rules:

- Types live next to the data. A project has a slug, title, venue, date range, status, stack, and body sections.
- Every string is transcribed exactly from `content.md`. No rewording, no summarizing, no new sentences.
- Any `TODO` marker in `content.md` stays a visible `TODO` in the rendered page. Do not fill one in, and do not silently drop the field.

## Part C: `/research` index

Replace the phase 2 stub. Structure:

1. A short heading and one or two sentences of framing. Take the framing from the bio in `content.md`; do not write new claims.
2. Two entries using `MarginRow`:
   - Predicting failure of non-invasive respiratory support — margin: `Jul 2025 – present`, `MCW`, `Manuscript under review`
   - Disc degeneration grading from MRI — margin: `Jan 2025 – May 2025`, `MCW`, `medRxiv preprint`
   Each title links to its detail page.
3. A publications list at the bottom, both entries, formatted as citations. Link the DOI. The `TODO` on the preprint title stays visible.

## Part D: Project pages

`/research/niv` and `/research/disc-degeneration`.

**Shared structure** (build one layout or shared component, use it for both):

- Title, then a metadata block in the margin column: dates, venue, status, stack.
- Body sections in this order: the problem, the approach, results, and for the NIV page, the unexpected finding and what's in progress.
- A back link to `/research`.

**NIV page specifics.** This is the most important page on the site; give it room.

- Prose sections come straight from `content.md`.
- Render the results as a small table: model, AUROC with confidence interval, C-index, sensitivity, specificity. Only the numbers in `content.md`.
- The ROX comparison belongs immediately next to the results, not in a footnote. A reader needs the baseline to know what 0.914 means.
- The informative-missingness section gets a visible heading of its own. Do not compress it into a caveat line at the end.
- No charts on this page in phase 3. Tables and prose only; visualization is phase 6.

**Table styling.** Tables need a style that fits the design: `grid`-colored horizontal rules only, no vertical borders, no zebra striping, Public Sans for headers, numbers aligned consistently. Wide tables sit in an `overflow-x: auto` container so the page body never scrolls sideways.

## Part E: Constraints carried forward

- No patient data, no data from the study, no figures reproduced from the manuscript. Text and hand-entered summary numbers only.
- No new cards, shadows, gradients, scroll animations, or emoji. The hero curve remains the only automatic motion.
- Sentence case. Semantic HTML. Visible `cohort-a` focus ring. Responsive to 360px.
- Every number on the site must match `content.md` exactly. If something in `content.md` looks wrong, flag it rather than correcting it.

## Definition of done

Report all of these, then stop:

1. `npm run build` succeeds and all four research routes export.
2. `npx tsc --noEmit` is clean.
3. Screenshots from the built export: `/` after the cleanup at 1280px, `/research` at 1280px, `/research/niv` at 1280px light and dark, and `/research/niv` at 360px including the results table.
4. A list of every `TODO` that renders visibly on the site, with the page it appears on.
5. Committed as `phase 3: research index and project pages`.

Do not start phase 4.

## Out of scope

Engineering pages, `/about`, `/cv`, the survival demo, charts of any kind, metadata and Open Graph tags, favicon, deployment.
