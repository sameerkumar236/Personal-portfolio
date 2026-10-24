# React portfolio

A frontend-only React 19 portfolio built with JavaScript, Vite, React Router, and Tailwind CSS. The portfolio, location pages, arcade, clock, and notes run in the browser. React components use `.jsx`; data, helpers, and tooling use `.js`. Production output consists of static files.

## Getting started

Install dependencies with Bun:

```sh
bun install
```

Copy `.env.example` to `.env` and set `VITE_BASE_URL` to the public website URL. No database connection or GitHub token is needed.

Start the frontend:

```sh
bun run dev
```

The frontend runs at http://localhost:3000. Clock, audio controls, and locally saved notes run in the browser.

## Folder structure

```text
src/
  app/                 App routes, analytics, and navigation effects
  pages/               One component for each page
  features/
    home/              Portfolio sections and home effects
    playground/        Clock and saved notes
    space-invaders/    Arcade layout, game components, and game engine
  components/
    layout/            Shared page frames and decorative corners
    navigation/        Internal and external links
    seo/               Page metadata and JSON-LD
    ui/                Reusable interface components
  data/                Content, settings, and structured data
  lib/                 Shared utilities and the dither decoder
  styles/              Fonts, themes, and global Tailwind styles
scripts/               SEO generator
  lib/                 Static HTML metadata build helper
public/                Images, audio, fonts, downloads, and generated files
index.html             Frontend entry document
jsconfig.json          Editor settings and the @/ import alias
vite.config.js         Vite and React configuration
```

Page components assemble the UI. Put editable text and metadata in `src/data`, keep feature-specific components in `src/features`, and put reusable components in `src/components`. `@/` resolves to `src/`.

## Pages and content

Available routes: `/`, `/projects`, `/now`, `/uses`, `/locations`, `/locations/:city`, `/games`, `/games/pixel-space-invaders`, and `/newpage`. Unknown routes show the 404 page.

Each page exports metadata and renders `PageSeo`. During the Vite build, `scripts/lib/static-pages.js` adds route-specific titles, descriptions, canonical links, social metadata, and JSON-LD to static HTML files. React manages metadata during navigation.

After updating content in `src/data`, refresh the published artifacts with:

```sh
bun run all:generate
```

The generator updates the sitemap, robots file, and page metadata manifest in `public/`. Browser code never reads the filesystem. Add new public routes to `src/app/App.jsx`, `src/data/seo.js`, and the page metadata entries in `scripts/generate-seo.js`.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Run the Vite frontend |
| `bun run build` | Generate SEO files and build the frontend into `dist/` |
| `bun run start` | Preview the built frontend locally |
| `bun run preview` | Preview the built frontend locally |
| `bun run lint` | Run ESLint |
| `bun run seo:generate` | Update the sitemap, robots file, and page metadata |
| `bun run all:generate` | Generate all published SEO files |

## Production

```sh
bun run build
```

Deploy the contents of `dist/` to a static host. The build emits `index.html`, a directory containing `index.html` for each known page (including cities), and `404.html`. Configure the host to serve directory index files and use `404.html` with HTTP status 404 for unknown paths.

Use `bun run preview` or `bun run start` for a local preview of an existing build. Production needs static file hosting; no Bun application process, API routes, database, or secret environment variables are required. Bun is used for package management and content generation during development and builds.

Fonts use `font-display: swap`; Geist font files and their license are in `public/fonts`. DM Sans loads from Google Fonts. The original theme toggle, animation assets, analytics integrations, and local notes storage remain available.
