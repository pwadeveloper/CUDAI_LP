# CUDAI — Creative UI Development with AI

Marketing landing page for the **CUDAI** course. Built to be an Awwwards-level
showcase of the exact stack the course teaches.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **GSAP** + ScrollTrigger — scroll-timeline animation
- **Lenis** — smooth scroll (driven by the GSAP ticker)
- **Framer Motion** (`motion`) — enter animations + microinteractions
- **@carbon/icons-react** — IBM Carbon icons
- Self-hosted **Switzer** font (`src/fonts/`)

## Getting started

This repo uses **pnpm** (pinned via `packageManager` / corepack) and **Node ≥ 22**
(see `.nvmrc`). Using a different package manager will desync the lockfile.

```bash
corepack enable      # one-time: makes `pnpm` match the pinned version
pnpm install
pnpm dev             # http://localhost:3000
```

Other scripts:

```bash
pnpm build           # production build (also runs full type-check)
pnpm start           # serve the production build
pnpm lint            # eslint
```

**Before pushing:** run `pnpm build` and make sure it passes — the build does the
TypeScript check, so a green build means the page compiles and prerenders.

## Project structure

```
src/
  app/
    layout.tsx        # fonts + SmoothScroll provider + Grain + globals
    page.tsx          # composes the sections, in order (see below)
    globals.css       # Tailwind v4 @theme design tokens + base + helpers
  components/
    providers/        # SmoothScroll (Lenis + GSAP ticker wiring)
    layout/           # Nav
    sections/         # one file per page section
    ui/               # Reveal, MagneticButton, Marquee, Grain
  lib/
    content.ts        # ALL copy/data, typed — sections read from here
    constants.ts      # nav links, site meta
    gsap.ts           # single GSAP plugin registration
  fonts/              # Switzer woff2
```

## Section order

The page is assembled in [`src/app/page.tsx`](src/app/page.tsx). Current order:

1. `Hero`
2. tech `Marquee` strip
3. `Practice` — Design / Code / Ship card stack
4. `Outcomes` — scroll-fill statement (`id="outcomes"`)

**Adding a section:** create `src/components/sections/YourSection.tsx`, put its copy
in `lib/content.ts`, then add it to `page.tsx` in the right position. Keep each
section self-contained so insertions don't conflict.

## Conventions (so changes don't break the build)

- Anything using GSAP/Lenis/Framer hooks must be a client component (`"use client"`).
- Import the configured GSAP from `@/lib/gsap` — don't call `registerPlugin` elsewhere.
- Never read `window`/`matchMedia` during render (hydration mismatch) — only in effects.
- Respect `prefers-reduced-motion`: animations should degrade to a readable static state.
- Put copy in `lib/content.ts`, not hardcoded in JSX.
