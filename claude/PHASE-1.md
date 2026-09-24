# Phase 1: Scaffold, tokens, base layout

Hand this to Claude Code alongside `CLAUDE.md` and `content.md`. Do phase 1 only. Stop at the definition of done and report back.

## 0. Prerequisites (do these first, do not skip)

1. Node.js must be installed. Check with `node -v` and `npm -v`. If missing, install Node 24 (the active LTS line) with `winget install OpenJS.NodeJS.LTS`, then restart the terminal and VS Code so PATH updates. Do not hand-write configs and skip the build step: nothing is done until it compiles.
2. Run `git init` in the project root and make an initial empty commit before writing any files, so this phase can be rolled back on its own.
3. Deploy target is **Vercel**. Do not set `basePath` or `assetPrefix`; no subpath deployment.

## 1. Stack

- Next.js 15, React 19, TypeScript, App Router, `output: "export"`, `images.unoptimized: true`.
- Tailwind CSS v4, CSS-first with `@theme`. No `tailwind.config.ts`.
- Fonts through `next/font/google`, self-hosted at build time: **Newsreader** (serif; headings and body) and **Public Sans** (sans; navigation, captions, metadata, UI). Expose them as `--font-newsreader` and `--font-public-sans` and wire them into `@theme` as `font-serif` and `font-sans`.
- Use `create-next-app` if it gives a clean starting point; strip out anything the spec doesn't call for (sample pages, boilerplate CSS, default SVGs).

## 2. File tree

```
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── app/
│   ├── layout.tsx          root shell: fonts, header, footer, <main>
│   ├── globals.css         Tailwind import, color tokens, @theme
│   └── page.tsx            phase-1 placeholder only
├── components/
│   └── MarginRow.tsx       margin-note + main-column grid primitive
└── public/                 empty; favicon comes in phase 5
```

## 3. Color tokens

Define once on `:root` in `globals.css`, redefine under `@media (prefers-color-scheme: dark)`, and expose through `@theme inline` so `bg-paper`, `text-ink`, `text-muted`, `border-grid`, and `text-cohort-a` work as utilities in both themes.

| Token | Light | Use |
|---|---|---|
| `paper` | `#F5F7F8` | Page background |
| `ink` | `#1C2B36` | Body text, headings |
| `muted` | `#5B6B78` | Dates, captions, secondary text |
| `grid` | `#DCE3E8` | Rules, borders, chart gridlines |
| `cohort-a` | `#2E4BA8` | Links, focus ring, primary curve |
| `cohort-b` | `#B7862B` | Charts only; never for text |

Dark theme: pick a dark slate for `paper`, not near-black. Re-pick `cohort-a` and `cohort-b` for the dark background rather than reusing the light values. Report the dark hex values and the contrast ratios for body text and links; both must pass WCAG AA. No manual theme toggle in this phase — `prefers-color-scheme` only.

## 4. Type

- Body 18–19px, line-height roughly 1.6, prose containers capped at `68ch`.
- Sentence case is an authoring rule, not a CSS one. Just make sure nothing in the scaffold applies an uppercase transform or letter-spaced label styling.

## 5. Base layout

**`app/layout.tsx`** — semantic `header` / `main` / `footer`. Header: the site owner's name linking to `/`. Footer: the contact line (email, GitHub, LinkedIn). Take both from `content.md`. No phone number anywhere on the site.

**`components/MarginRow.tsx`** — the two-column primitive that research and engineering entries will use from phase 3 on:

```
| margin (dates/meta) | main column (≤ 68ch)                 |
|---------------------|--------------------------------------|
| Jul 2025 – present  | Early NIV failure prediction         |
| MCW                 | Summary paragraph...                 |
```

Margin column roughly 12rem, in Public Sans, `text-muted`. **Collapse to a single stacked column below the `md` breakpoint**, not `sm`: at 640–768px a 12rem margin squeezes the main column below a comfortable measure.

**`app/page.tsx`** — placeholder for this phase only. Render one or two `MarginRow` examples using real text from `content.md` (for example, the NIV project's dates and venue in the margin, its title and first line in the main column) to prove the pattern. This is **not** the hero; the hero and its survival curve are phase 2.

## 6. Quality floor

- Semantic HTML.
- Visible keyboard focus ring in `cohort-a` on every interactive element.
- No layout shift from font loading.
- Responsive down to 360px.

## 7. Definition of done

Report all of these before moving on:

1. `npm run build` succeeds. Paste the result.
2. `npx tsc --noEmit` is clean. Paste the result.
3. `npm run dev` runs; screenshot the placeholder page in light and dark.
4. Dark-theme hex values and contrast ratios reported as asked in section 3.
5. Everything committed in a single commit named `phase 1: scaffold, tokens, base layout`.

Then stop and wait for review. Do not start phase 2.

## Out of scope for phase 1

Hero and curve animation, real page content, routes beyond `/`, theme toggle UI, favicon, metadata and Open Graph tags, the survival demo, deployment.
