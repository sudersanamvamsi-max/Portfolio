# Site structure (context for agents)

Personal portfolio for Vamsi Sudersanam. Next.js App Router, TypeScript, Tailwind, static export to `out/`.
Fonts: Newsreader (body, headings), Public Sans (`font-sans`, UI and captions), JetBrains Mono (code).
Rules live in `claude/CLAUDE.md`; the source of truth for facts is `claude/content.md`. Never invent facts; unknown content stays a visible `TODO`.

## Global shell ([app/layout.tsx](../app/layout.tsx))
- `SiteHeader` (nav: About me, Research and publications, Projects, Contact me, CV) -> `<main max-w-5xl>` -> footer (email · GitHub · LinkedIn)
- The CV nav item is a plain link that opens `cvHref` (`/cv/vamsi-sudersanam-cv.pdf`) in a new tab. There is no `/cv` page.
- Layout exports the site-wide `metadata` (metadataBase, icons, default Open Graph and Twitter tags).

## Routes

| Route | File | Content source | Sections, top to bottom |
|---|---|---|---|
| `/` | `app/page.tsx` | `content/site.ts`, `research.ts`, `projects.ts` | Name h1, one-liner, goals, `passion`, Research and Projects links, `Photo`; `PatientRiskCurve`; Featured (NIV, RL Studio, linking to `/research/niv` and `/projects#rl-studio`); email and "Get in touch" line |
| `/about` | `app/about/page.tsx` | `content/site.ts` | h1, `aboutIntro`, bio, goals; rule; Skills (`TypedJson` from `skillsJson`, caption links `certVerifyLinks`); Off the clock (one h3 per `hobbies` entry, `id={slug}`, `HobbyPhotos`) |
| `/projects` | `app/projects/page.tsx` | `content/projects.ts` | h1, framing; per project (separated by `StepDivider`, each wrapper has `id={slug}`): `MarginRow` with dates and role in the margin; `ProjectMedia`, title, summary, built bullets, stack, `whyBuilt`, repo link or TODO. Order: RL Studio, regression pipeline, GPT from scratch, repair workflow |
| `/research` | `app/research/page.tsx` | `content/research.ts` | h1, framing; project list (title links to detail page, `indexSummary` under it, `indexMargin` in the margin); `StepDivider`; Publications (citations, DOI links) |
| `/research/niv` | `app/research/niv/page.tsx` | `content/research.ts` | `ProjectPage` |
| `/research/disc-degeneration` | `app/research/disc-degeneration/page.tsx` | `content/research.ts` | `ProjectPage` |
| `/contact` | `app/contact/page.tsx` | `content/site.ts` | h1, `openTo` line, mailto text, `ContactForm` |

Every route exports `metadata` built by `pageMetadata(title, description, path)` from [lib/meta.ts](../lib/meta.ts). Titles read "Page — Vamsi Sudersanam". Open Graph and Twitter tags use `/og.png`. The home route uses the layout's metadata.

`ProjectPage` layout: back link, h1, `whyThisWork` (omitted if neither it nor `whyThisWorkTodo` is set), `MarginRow` with a metadata `dl` (Dates, Venue, Status, Stack) in the margin and the sections in the main column. Section blocks are `p`, `h3`, `ul` or `table` (`DataTable`). Back link repeated at the bottom.

`ContactForm`: if `formspreeEndpoint` is set, posts the form to Formspree and shows sending, success and error states (the error links to the mailto address). If it is `null`, it falls back to opening the visitor's mail app and shows a visible TODO.

## Components ([components/](../components/))
- `MarginRow`: two-column row, small margin notes left, main content right (core layout pattern)
- `StepDivider`: step-shaped divider between items
- `Inline`: renders `*emphasis*` and `**strong**` markup in strings
- `DataTable`: results tables, supports `colSpan`
- `PatientRiskCurve`, `HeroCurve`: home page survival-curve visuals
- `TypedJson`: typed, syntax-colored JSON panel on About (client component; types once on scroll-into-view, click or key completes it)
- `HobbyPhotos`: cooking photo grid on About. `Photo`, `ProjectMedia`: image slots; show a visible TODO placeholder when the media is missing
- `ContactForm`, `SiteHeader`

## Content layer ([content/](../content/))
- `site.ts`: `email`, `photo`, `oneLiner`, `goals`, `passion` / `passionTodo`, `aboutIntro` / `aboutIntroTodo`, `hobbies`, `skillsJson` / `skillsJsonTodo`, `certVerifyLinks`, `openTo`, `formspreeEndpoint` (null until set), `cvHref`, `bio`
- `projects.ts`: `projectsFraming`, `projects[]` with `slug, title, dates, role, stack, summary, built, media, mediaTodo, link, linkTodo, whyBuilt, whyBuiltTodo`
- `research.ts`: `researchFraming`, `niv`, `disc` (ResearchProject: `slug, title, venue, dates, status, stack, indexMargin, indexSummary, whyThisWork, whyThisWorkTodo?, sections[]`), `publications[]`
- Pattern: a `fooTodo` string is shown as "TODO: ..." until the real `foo` value is set. To resolve one, set the real value in `content/*.ts`; page code does not change.

## Open TODOs (waiting on Part 3 of the final-phase doc)
- RL Studio and GPT repo URLs
- Formspree endpoint (`formspreeEndpoint` in `site.ts`)
- NIV rerun numbers: the RSF, DeepHit and ROX C-index cells show "—"; the other figures are still pre-rerun
- Media for all four projects
- Files in `public/` still to add: CV PDF, `favicon.ico`, `apple-touch-icon.png`, `og.png`

## Not built yet
`/demo/survival` (phase 4, synthetic data only), Lighthouse and 360 px pass, deployment.
