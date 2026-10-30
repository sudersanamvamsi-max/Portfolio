# Handoff: finishing Vamsi's portfolio site

Read in this order: `claude/CLAUDE.md` (rules, design system), `claude/STRUCTURE.md` (routes, components, content fields), `claude/content.md` (source of truth for facts), then this file (state and backlog).

## Working rules for this agent
- **Never invent or inflate.** Every number, title, date and claim must come from `claude/content.md` or from Vamsi. Missing values stay a visible `TODO` using the `fooTodo` pattern in `content/*.ts`.
- **Vamsi's wording wins.** Make the smallest change that works. Copy changes go in `content/site.ts`, `content/projects.ts`, `content/research.ts`. Touch page or component code only when needed.
- **Vamsi runs the build.** He runs `npm run build` and `npx tsc --noEmit` himself and pastes output back. Never claim something compiles; say it is untested until he reports.
- **No patient data.** No rows, samples or per-patient plots from MIMIC-IV, eICU, SICdb or AmsterdamUMCdb. Demos use synthetic data and say so on screen. No phone number on the site. No company data (Real Time Automation, MSOE systems) in any media.
- **Status language.** NIV manuscript is "in preparation for submission" (being restructured for a new journal). Disc degeneration is a medRxiv preprint. Never "under review", "submitted" or "published".
- **Style.** Sentence case, no all-caps labels, no arrows appended to link text, no emoji, no identical shadowed cards. Details in CLAUDE.md.
- **Pronouns.** Use they/them for Vamsi unless told otherwise.
- **Confirm before outward-facing actions.** Do not commit, push or deploy unless asked.

## Environment (important)
- **Real project location:** `C:\Users\sudersanamv\Code\Portfolio`. Always work here. The old OneDrive copy (`...\OneDrive - Milwaukee School of Engineering\Desktop\Code\Portfolio`) is stale and about to be renamed `Portfolio-old`; do not edit it. OneDrive caused an `EINVAL readlink` build error on `.next`; that is why the project moved.
- Windows 11, PowerShell. Stack: Next.js 15.5.x (App Router), TypeScript 5.x (do not upgrade), Tailwind, `output: "export"` (static, output in `out/`). No backend.
- Git: branch `phase-2`, tracking `origin/phase-2`, last pushed commit `72fc6b7`. The session's edits were staged but possibly not yet committed; run `git status` first. `package-lock.json` has a patch-level `npm audit fix` change.
- Known, accepted: `npm audit` reports 2 remaining vulnerabilities (`postcss` bundled inside `next`). The only fix is Next 16 (breaking). Do not run `npm audit fix --force`. Upgrading is a separate post-launch task.
- Last verified by Vamsi: `npm run build` and `npx tsc --noEmit` both passed (10 static pages) before the latest title edits. Anything after that is unverified.

## What is done
Final-phase doc Part 1 is applied:
- Accuracy fixes: NIV page now describes two experiments and four model families; landmark content removed everywhere; status wording updated in `bio`, `researchFraming`, NIV `status` and `indexMargin`, and publications entry 2; "landmark modeling" removed from skills.
- NIV manuscript title set (publications entry 2): "Predicting Failure of Non-Invasive Respiratory Support in Acute Hypoxemic Respiratory Failure Using the Salzburg Intensive Care Database". Disc preprint title is the medRxiv v2 title, "A Systematic Evaluation of MRI Normalization for Multi-Site Radiomics-Based Disc Degeneration Classification".
- Home: Research and Projects links (no arrows), Featured block (NIV, RL Studio), contact line, passion text. About: `aboutIntro`, interests list, `CodeWindow` kept. Projects: reordered (RL Studio, regression pipeline, GPT from scratch, repair workflow), `id={slug}` anchors, polished `whyBuilt` texts, Karpathy credit, "4 hours". Research: `indexSummary` under each project (NIV sentence approved; disc sentence reads "Built the radiomics pipeline and benchmarked MRI normalization strategies so features hold up across sites and scanners."). Disc page has no "why this work".
- Contact: `openTo` line; Formspree wiring with success and error states and mailto fallback (inactive until endpoint set).
- CV nav item opens `cvHref` in a new tab. Metadata, Open Graph and Twitter tags via `lib/meta.ts` on every route.
- Docs updated: CLAUDE.md (status wording, page list, phase-4 demo now uses a "time since support started" slider, synthetic only), content.md (two experiments, four model families, no landmarks, NIV title), STRUCTURE.md recreated.

## Backlog (what remains)

### Blocked on Vamsi (each is a one-line or one-file change once supplied)
| Item | What to change | Notes |
|---|---|---|
| P3: NIV rerun numbers | `content/research.ts`, NIV `approach` bullets, `results` paragraph, table, ROX paragraph, tertile bullet | Table cells for RSF, DeepHit and ROX C-index currently show "—". All other figures are still the pre-rerun values (8,489; 2,589; 30.5%; 77.1%; AUROC 0.914 (0.898–0.930); C-index 0.868; 86.5%/83.8%; ROX 0.555; ROX cutoff 3.6%; tertiles about 60% and about 1%; missingness finding). Replace only with confirmed rerun values; blank means "—". Also update the same numbers in `content.md`. Re-read the "unexpected finding" paragraph against the rerun answer to "top predictors still missingness indicators?". |
| P4: RL Studio repo or demo URL | `content/projects.ts` → RL Studio: set `link: { href, label }` | Repo is public per D4. Remove `linkTodo` rendering when `link` is set (already handled in `app/projects/page.tsx`). |
| P5: GPT from scratch repo URL | `content/projects.ts` → GPT: set `link` | Public per D4. |
| P6: Formspree endpoint | `content/site.ts` → `formspreeEndpoint = "https://formspree.io/f/..."` | Removes the TODO note and switches the form to Formspree. Vamsi must send a test message. |
| P7: media | `content/projects.ts` `media: { src, alt, still? }` per project; `public/projects/` files | RL Studio: `rl-studio.mp4` or `.gif` (10–15 s, under 5 MB, no audio). Note `ProjectMedia` currently renders an `<img>`; an `.mp4` needs a `<video>` branch (muted, loop, playsInline, poster, respects reduced motion). GPT: `gpt-loss.png` plus an about-5-line generated text sample (render as a code block; needs a small addition to `ProjectMedia` or the project page). Regression pipeline: `regression-flow.svg` (cron → test runner → Allure → Azure DevOps; no company names, hosts or test names). Repair workflow: `repair-flow.png` (dummy asset tags only). Every media item needs descriptive `alt`, and synthetic or dummy data must be labeled. |
| Files in `public/` | CV, favicon, OG image | `cv/vamsi-sudersanam-cv.pdf` (referenced by `cvHref`), `favicon.ico`, `apple-touch-icon.png` (180×180), `og.png` (1200×630). References are already in place; Vamsi adds the files before deploy. Missing files mean broken nav link and no link preview. |
| Disc figure (optional) | `public/research/disc-figure.png` plus a figure block after "My contribution" | Only if co-authors allow sharing. Needs a new `figure` block kind in `ProjectPage` with a one-line caption. |

### Not blocked, can be done now
- **Phase 4: `/demo/survival`.** Synthetic Kaplan–Meier demo: generate three synthetic risk tertiles in the browser, draw KM curves with censoring ticks over a 2-hour horizon, and a "time since support started" slider showing the at-risk cohort shrink as events are removed. Label clearly as synthetic illustration, not model output; do not reference the NIV paper's models or results. Respect `prefers-reduced-motion`. Reuse the stepped-line language of `PatientRiskCurve` and tokens in `app/globals.css`. Add to nav only if Vamsi wants it.
- **Polish pass:** 360 px width (no horizontal page scroll; tables scroll inside their own box), visible keyboard focus, light and dark contrast (WCAG AA), alt text on every image, no layout shift from fonts. Check `DataTable` on mobile.
- **Lighthouse** 90+ on Performance, Accessibility, Best Practices, SEO.
- **Home page metadata:** it inherits the layout's. Confirm the title and description look right.
- **Pre-deploy sweep:** search `out/` for "TODO" (zero or only deliberate ones), and the site for "landmark", "Eighteen", "under review" (zero stale hits).

### Open flags to raise with Vamsi
- `claude/content.md` is the declared source of truth and was updated by instruction using only facts from the final-phase doc; confirm it still matches his intent after the P3 numbers arrive.
- The `PHASE-3.md` doc (historical) still mentions "Manuscript under review" in its margin spec. It is a past-phase brief; do not treat it as current.
- `CLAUDE.md` hero spec says the two hero links are "Research" and "Engineering". The built site uses "Research" and "Projects". CLAUDE.md's page list was updated; the hero sentence was not.
- Skills section still lists "survival analysis (RSF, XGBoost AFT/Cox, DeepHit)". Fine, but re-check if the paper drops a model family after reruns.

## Launch checklist (from the final-phase doc, Part 4)
- [ ] `npm run build` passes with no errors or warnings
- [ ] Search `out/` for "TODO": zero hits, or only ones Vamsi chose to leave
- [ ] Search the site for "landmark", "Eighteen", "under review": zero stale hits
- [ ] Every NIV number matches the P3 rerun column
- [ ] Publications entry 2 shows the NIV title (done in code; confirm on the page)
- [ ] Every nav, footer, repo, DOI and CV link opens the right target
- [ ] Contact form sends a test message through Formspree
- [ ] Light and dark mode checked on every page
- [ ] 360 px width: no horizontal scroll, tables scroll inside their own box
- [ ] Lighthouse: Performance, Accessibility, Best Practices and SEO all 90+
- [ ] Link preview (paste URL into LinkedIn or Slack) shows the OG image and description
- [ ] Deployed to Vercel; `vamsi-sudersanam.com` and `www` both resolve over HTTPS

## Deploy notes
Target is Vercel (static export; GitHub Pages would also work). `lib/meta.ts` sets `siteUrl = "https://vamsi-sudersanam.com"` as `metadataBase`; change it if the domain differs. Footer links: email `sudersanamvamsi@gmail.com`, GitHub `https://github.com/Vamsichris04`, LinkedIn `https://linkedin.com/in/sudersanam`.
