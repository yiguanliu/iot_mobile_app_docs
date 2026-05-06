# Home OS — Design System Docs

Standalone documentation site for the [Home OS IoT prototype](../iot_mobile_app/) design system. Modeled after [shadcn/ui docs](https://ui.shadcn.com/docs).

## What's documented

- **Foundations** — Theming, Colors, Typography (with side-by-side per-theme comparison)
- **Components** — primitive UI pieces (Button, Slider, Pill Button, Scene Chip…)
- **Blocks** — composed/grouped patterns (Scene Strip, Zone Tile…)


## Running

```bash
npm install
npm run dev   # http://localhost:5174
```

Port `5174` is used so it can run alongside the main IoT app on `5173`.

## Deploying to Vercel

This project ships a `vercel.json` with the SPA fallback rewrite that
react-router needs. Two ways to deploy:

**1. GitHub integration (recommended):**

1. Go to [vercel.com/new](https://vercel.com/new) and import this repo.
2. Vercel auto-detects Vite — leave defaults (build = `npm run build`,
   output = `dist`, install = `npm install`).
3. Click Deploy. Every push to `main` redeploys; PRs get preview URLs.

**2. Vercel CLI:**

```bash
npm i -g vercel
vercel login    # interactive
vercel          # first run — sets up + deploys preview
vercel --prod   # promote to production
```

## Stack

- Vite + React 18 + TypeScript
- React Router v6
- Tailwind CSS (utilities + preflight)
- Radix primitives — Tabs, Slider, Slot
- `class-variance-authority` + `clsx` + `tailwind-merge` (shadcn-style class composition)
- `lucide-react` for iconography

## Project layout

```
src/
├── App.tsx                       # router, page registry
├── main.tsx                      # entry, ThemeProvider
├── index.css                     # Tailwind directives + docs-chrome tokens
├── state/theme.tsx               # 3 themes + provider (mirrors main app)
├── data/nav.ts                   # sidebar nav + ready flags
├── lib/utils.ts                  # cn() helper
├── components/
│   ├── layout/                   # TopBar, Sidebar, ThemeSwitcher, DocsLayout
│   ├── docs/                     # PageHeader, ComponentPreview, CodeBlock,
│   │                             #   PropsTable, Section
│   └── ui/                       # shadcn-pattern primitives (button, slider)
└── pages/
    ├── IntroductionPage.tsx
    ├── InstallationPage.tsx
    ├── ThemingPage.tsx
    ├── ColorsPage.tsx
    ├── TypographyPage.tsx
    ├── StubPage.tsx              # catch-all for sidebar items not yet written
    ├── components/               # primitive component pages
    └── blocks/                   # grouped/composed pages
```

## Adding a component page

1. Create `src/pages/components/MyThingPage.tsx`. Use `PageHeader`,
   `ComponentPreview`, `Section`, `CodeBlock`, `PropsTable` for layout.
2. Wrap your live demo in `<ComponentPreview code="...">{...}</ComponentPreview>`.
   The preview area auto-applies the active theme via CSS variables — your
   demo just renders normally.
3. Register the route in `src/App.tsx`.
4. Mark the entry `ready: true` in `src/data/nav.ts`.

The preview / code split, per-theme rendering, and copy button are all
free if you use the standard primitives.

## Status

| Area | State |
|---|---|
| Layout shell, theme switcher, sidebar | Ready |
| Foundations pages | Introduction, Installation, Theming, Colors, Typography |
| Components | Button, Slider, Pill Button, Scene Chip |
| Blocks | Scene Strip, Zone Tile |
| Other pages | Render the stub page until written — listed in sidebar with "Soon" badge |

## Why a separate project?

Same reasoning as shadcn's docs: keep the demonstration surface decoupled from
the application. The docs site can evolve faster, doesn't drag the production
bundle, and lets you preview the design system without booting the IoT app.

The two projects share only the **token shape** (CSS variables, theme
structure). Component code is intentionally re-exported here so the docs are
self-contained and copy-paste-friendly.
