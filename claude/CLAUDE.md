# Portfolio: Vamsi Sudersanam

Personal site for a clinical ML researcher who also ships software. Read this file and `content.md` before any task.

## Who it's for

- **Primary:** PhD admissions committees and faculty in biomedical informatics (Fall 2027 cycle).
- **Secondary:** PIs and hiring managers at academic medical centers hiring research engineers or research assistants.
- **Job of the site:** in under a minute, a reader should know that Vamsi does rigorous clinical ML research on ICU data *and* builds real, working software.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS, static export (`output: "export"`).
- Keep TypeScript on 5.x for compatibility with the current Next.js and Tailwind toolchain; do not upgrade it without explicit approval.
- Content lives in `content.md` for now. Move it into typed data files or MDX under `/content` as you build; `content.md` stays the source of truth until Vamsi says otherwise.
- Deploy target: Vercel or GitHub Pages (decide at deploy time; keep the build static so either works).
- No backend. No analytics or trackers unless asked.

## Content rules (non-negotiable)

1. **Never invent or inflate.** Every number, title, date, and claim must come from `content.md`. If something isn't there, leave a visible `TODO` rather than guessing.
2. **Honest status language.** The NIV manuscript is *in preparation for submission* (being restructured for a new journal), not submitted, published or peer-reviewed. The disc degeneration paper is a *medRxiv preprint*.
3. **No patient data, ever.** MIMIC-IV, eICU, SICdb, and AmsterdamUMCdb are under data use agreements. No rows, samples, screenshots of tables, or per-patient plots. Any demo uses synthetic data generated in code, and says so on screen.
4. **No phone number on the site.** Email, GitHub, and LinkedIn only.
5. Vamsi prefers refining his own wording. When editing copy, make the smallest change that works and keep his phrasing.

## Design system

**Concept:** the Kaplan-Meier curve. Survival curves are step functions with small censoring ticks; that stepped line is the site's one signature element. Everything else stays quiet and academic.

**Color**

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F5F7F8` | Page background (cool, not cream) |
| `ink` | `#1C2B36` | Body text, headings |
| `muted` | `#5B6B78` | Dates, captions, secondary text |
| `grid` | `#DCE3E8` | Rules, borders, chart gridlines |
| `cohort-a` | `#2E4BA8` | Primary curve, links, focus rings |
| `cohort-b` | `#B7862B` | Second curve in charts/demo only; never for text |

Provide a dark theme by redefining the same tokens (dark slate background, not near-black; keep cobalt and ochre legible). Check contrast: body text and links must pass WCAG AA on both themes.

**Type**

- Headings and body: **Newsreader** (serif, academic feel). Body 18–19px, line-height ~1.6, measure ≤ 68ch.
- Navigation, captions, metadata, UI: **Public Sans**.
- Sentence case everywhere. No all-caps labels, no eyebrow text above headings, no accenting a single word in a headline.

**Layout**

Left-aligned single column with a narrow left margin column for metadata (dates, venue, stack), like margin notes in a paper.

```
| margin (dates/meta) | main column (≤ 68ch)                 |
|---------------------|--------------------------------------|
| Jul 2025 – present  | Early NIV failure prediction         |
| MCW                 | Summary paragraph...                 |
|                     | [Read more]                          |
```

On mobile, the margin column collapses above each entry.

**Hero:** name, one sentence about what he does, and a single stepped survival curve with a few censoring ticks that draws once on page load (the site's only automatic animation). Respect `prefers-reduced-motion` by showing it fully drawn. Below it, two plain links: "Research" and "Engineering".

**Section dividers:** a thin stepped line in `grid` color, used sparingly.

**Avoid:** identical rounded cards with drop shadows, gradient washes, fade-in on every section, numbered markers (01/02/03) on non-sequential content, arrows appended to link text, emoji.

## Pages

1. `/`: hero, Research and Projects links, featured items (NIV, RL Studio), contact line.
2. `/research`: NIV project, disc degeneration project (each with a one-sentence summary), publications list.
3. `/projects`: RL Studio, regression pipeline, GPT from scratch, repair workflow. One page, no per-project pages; each project has an anchor (`/projects#rl-studio`).
4. `/research/niv`, `/research/disc-degeneration`: project pages written as problem → approach → results → what I learned.
5. `/about`: intro, bio, code window, skills, certifications, interests.
6. `/contact`: what I'm open to, Formspree form with mailto fallback.
7. CV: a nav item opening `/public/cv/vamsi-sudersanam-cv.pdf` in a new tab (no `/cv` page).
8. Later: `/demo/survival`: interactive survival demo on synthetic data (see phase 4).

## Build order

Work one phase per session. Show Vamsi the diff and a screenshot before moving on.

1. Scaffold Next.js + Tailwind, set up tokens (CSS variables), fonts, light/dark theme, base layout with margin column.
2. Home page with the hero curve animation.
3. Research and Engineering index pages and project pages from `content.md`.
4. Synthetic survival demo. Mirror the structure of the NIV study without using any of its data: generate three synthetic risk tertiles in the browser, draw their Kaplan-Meier curves with censoring ticks over a 2-hour horizon, and let the user move a "time since support started" slider across the 2-hour horizon to see the at-risk cohort shrink as events are removed. Keep it generic and synthetic; do not reference the models or results of the NIV paper. Label it clearly as synthetic illustration, not model output.
5. Polish: responsive checks down to 360px, keyboard focus states, metadata/Open Graph tags, favicon, Lighthouse pass, deploy.

## Quality floor

Responsive to mobile, visible keyboard focus, reduced motion respected, semantic HTML, alt text on every image, no layout shift from fonts.
