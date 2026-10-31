# Site structure (context for agents)

Personal portfolio for Vamsi Sudersanam. Next.js App Router, TypeScript, Tailwind, static export to `out/`.
Fonts: Newsreader (body, headings), Public Sans (`font-sans`, UI and captions), JetBrains Mono (code).
Rules live in `claude/CLAUDE.md`; the source of truth for facts is `claude/content.md`. Never invent facts; unknown content stays a visible `TODO`.

## Global shell ([app/layout.tsx](../app/layout.tsx))
- `SiteHeader` (left: `NameBox` home link; nav: About me, Research and publications, Projects, Contact me, CV) -> `<main max-w-5xl>` -> footer (email · GitHub · LinkedIn)
- The CV nav item goes to `/cv` in the same tab. `cvHref` (`/cv/Vamsi_Sudersanam_SWE.pdf`) is the PDF embedded and downloaded there.
- Layout exports the site-wide `metadata` (metadataBase, icons, default Open Graph and Twitter tags).

## Routes

| Route | File | Content source | Sections, top to bottom |
|---|---|---|---|
| `/` | `app/page.tsx` | `content/site.ts` | sr-only h1 "Vamsi Sudersanam", one-liner, goals, `passion`, `Photo`; `PatientRiskCurve`; `presenting` photo with `presentingText` caption under it; Skills (`TypedJson` from `skillsJson`, caption links `certVerifyUrl`) |
| `/about` | `app/about/page.tsx` | `content/site.ts` | h1, `aboutIntro` (three paragraphs), goals; rule; Off the clock (`hobbiesIntro` under the heading): one h3 per `hobbies` entry (`id={slug}`), each with `rows` of text + `HobbyMedia` in 2 columns; sides alternate across all rows (row 1 text left, row 2 photo left, ...); on mobile the photo stacks above the text |
| `/projects` | `app/projects/page.tsx` | `content/projects.ts` | h1, framing; per project (separated by `StepDivider`, each wrapper has `id={slug}`): `MarginRow` with dates and role in the margin; `ProjectMedia`, title, summary, built bullets, stack, `whyBuilt`, repo link or TODO. Order: RL Studio, regression pipeline, GPT from scratch, repair workflow |
| `/research` | `app/research/page.tsx` | `content/research.ts` | h1, framing; project list (title links to detail page, `indexSummary` under it, `indexMargin` in the margin); `StepDivider`; Publications (citations, DOI links) |
| `/research/niv` | `app/research/niv/page.tsx` | `content/research.ts` | `ProjectPage` |
| `/research/disc-degeneration` | `app/research/disc-degeneration/page.tsx` | `content/research.ts` | `ProjectPage` |
| `/contact` | `app/contact/page.tsx` | `content/site.ts` | h1, `openTo` line, mailto text, `ContactForm` |
| `/cv` | `app/cv/page.tsx` | `content/site.ts` | h1 "CV", Download PDF button (full width on mobile), `<object>` PDF embed (about 85vh, hidden below `md` with a note) with a download-link fallback |

Every route exports `metadata` built by `pageMetadata(title, description, path)` from [lib/meta.ts](../lib/meta.ts). Titles read "Page — Vamsi Sudersanam". Open Graph and Twitter tags use `/og.png`. The home route uses the layout's metadata.

`ProjectPage` layout: back link, h1, `whyThisWork` (omitted if not set), `MarginRow` with a metadata `dl` (Dates, Venue, Status, Stack) in the margin and the sections in the main column. Section blocks are `p`, `h3`, `ul` or `table` (`DataTable`). Back link repeated at the bottom.

`ContactForm`: if `formspreeEndpoint` is set (now a Jotform URL; the name is historical), it posts the form with `fetch` and `Accept: application/json`, includes a hidden `_subject` ("Portfolio contact from {name}") and a honeypot `_gotcha`, and shows sending, success and error states (the error links to the mailto address). If it is `null`, it falls back to opening the visitor's mail app and shows a visible TODO.

## Components ([components/](../components/))
- `MarginRow`: two-column row, small margin notes left, main content right (core layout pattern)
- `StepDivider`: step-shaped divider between items
- `Inline`: renders `*emphasis*` and `**strong**` markup in strings
- `DataTable`: results tables, supports `colSpan`
- `PatientRiskCurve`: home page survival-curve visual
- `TypedJson`: typed, syntax-colored JSON panel on Home (client component; types once on scroll-into-view, click or key completes it)
- `NameBox`: animated two-row name box in the header (Vamsi / Sudersanam) (client; binary → hex → letters on every full page load or refresh, not on client-side navigation; static under reduced motion)
- `LoopVideo`: muted looping video (client); plays 2x when shorter than 20 s unless `speed` is passed (RL Studio passes 2); reduced motion shows controls instead of autoplay
- `HobbyMedia`: photo or video in a 4:3 frame (server; checks `public/` at build time and shows a visible TODO if the file is missing, and a TODO caption until `alt` and `caption` are set). `Photo`, `ProjectMedia`: image slots with visible TODO placeholders
- `ContactForm`, `SiteHeader`

## Content layer ([content/](../content/))
- `site.ts`: `email`, `photo`, `oneLiner`, `goals`, `passion`, `aboutIntro` (string[]), `hobbiesIntro`, `hobbies` (`{ slug, title, rows: { text, photo: { src, alt?, caption? } }[] }[]`), `presenting` / `presentingText`, `skillsJson`, `certVerifyUrl`, `openTo`, `formspreeEndpoint`, `cvHref`
- `projects.ts`: `projectsFraming`, `projects[]` with `slug, title, dates, role, stack, summary, built, media, mediaTodo, link, linkTodo, whyBuilt`
- `research.ts`: `researchFraming`, `niv`, `disc` (ResearchProject: `slug, title, venue, dates, status, stack, indexMargin, indexSummary, whyThisWork?, sections[]`), `publications[]` (disc-degeneration preprint only; the NIV manuscript is listed on its project page)
- Pattern: for content still missing (`presentingText`, `mediaTodo`, `linkTodo`, hobby `alt`/`caption`), a `fooTodo` string or empty field is shown as "TODO: ..." until the real value is set. Fields that are filled have no TODO branch. To resolve one, set the real value in `content/*.ts`; page code does not change.

## Open TODOs (waiting on Part 3 of the final-phase doc)
- RL Studio and GPT repo URLs
- Alt text and captions for the About photos (`hobbies` in `site.ts`); text under the presenting photo (`presentingText`)
- NIV rerun numbers: the RSF, DeepHit and ROX C-index cells show "—"; the other figures are still pre-rerun
- Media for all four projects
- Files in `public/` still to add: `favicon.ico`, `apple-touch-icon.png`, `og.png`

## Not built yet
`/demo/survival` (phase 4, synthetic data only), Lighthouse and 360 px pass, deployment.
