# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Personal academic homepage/blog built with [Astro](https://astro.build/) using the [astro-theme-pure](https://github.com/cworld1/astro-theme-pure) theme. Deployed to GitHub Pages. Site: https://iaohr9.github.io

## Key Commands

```shell
bun dev          # Start dev server
bun dev:check    # Dev server with type checking
bun run build    # Lint + type check + build (runs astro-pure check && astro check && astro build)
bun preview      # Preview production build
bun new          # Create a new blog post (interactive scaffolding)
bun format       # Format all JS/TS/MD/Astro files with Prettier
bun lint         # Run ESLint on src/
bun clean        # Remove .astro, .vercel, dist directories
```

## Architecture

### Configuration

- [astro.config.ts](astro.config.ts) — Main Astro config: Markdown/MDX plugins (KaTeX, rehype autolink headings), Shiki syntax highlighting with custom transformers, UnoCSS via `astro-pure` integration, image processing with Sharp, fonts via Fontshare (Satoshi).
- [src/site.config.ts](src/site.config.ts) — **Primary site configuration file.** Contains three exports:
  - `theme` — Title, author, description, locale, logo, header menu, footer, social links, blog pagination, share buttons.
  - `integ` — Integration config: links/logbook, pagefind search, quote widget, UnoCSS typography, medium zoom, Waline comments.
  - `terms` — Card list data for policy pages.
- [uno.config.ts](uno.config.ts) — UnoCSS config with presetMini + presetTypography, custom CSS rules, HSL-based theme colors.
- [tsconfig.json](tsconfig.json) — Strict Astro config with `@/` path aliases.

### Content

- `src/content/blog/` — Blog posts (Markdown/MDX). Schema requires `title`, `description`, `publishDate`; supports `heroImage`, `tags`, `updatedDate`, `draft`, `comment`.
- `src/content/docs/` — Documentation pages. Schema supports `order` for sorting.
- [src/content.config.ts](src/content.config.ts) — Collection definitions using `glob` loader.

### Structure

- `src/pages/` — File-based routing. Key pages: `index.astro` (homepage), `blog/`, `about/`, `publications/`, `projects/`, `archives/`, `tags/`, `search/`, `life/`.
- `src/components/` — Astro components (custom UI components).
- `src/layouts/` — Page layout components.
- `src/plugins/` — Custom rehype/shiki plugins (autolink headings, Shiki transformers).
- `src/assets/` — Static image assets.
- `public/` — Static files served as-is (favicon, images, etc.).
- `packages/pure/` — The `astro-pure` theme package (local workspace). Contains shared components, schemas, plugins, and types.

### Deployment

- Deployed via GitHub Actions (`.github/workflows/deploy.yml`) using `withastro/action` on push to `main`.
- Static output (not SSR). Site URL configured as `https://iaohr9.github.io` in `astro.config.ts`.
- No `base` path configured (deploys to root of GitHub Pages repo).

### Third-Party Integrations

- **Waline** — Comment system (configured in `site.config.ts` under `integ.waline`)
- **Pagefind** — Full-site search (enabled via `integ.pagefind`)
- **KaTeX** — Math rendering (remark-math + rehype-katex)
- **Waline client** — `@waline/client` for comment rendering in `src/components/waline/`
