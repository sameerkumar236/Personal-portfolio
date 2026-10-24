# Project Rules

## Package Manager
- Use `bun` for all package management (install, add, remove, run scripts)
- Do NOT use `npm` or `yarn` for any package operations
- Scripts are defined in `package.json` and run via `bun run <script>`

## Build
- Do NOT run `build` or `dev` scripts unless explicitly asked
- Verification of changes should be done by reading files, not by building

## Git
- NEVER commit, amend, push, or create PRs without asking the user first
- Always use `--no-commit` or ask before staging/committing
- Before any git operation, describe what will be committed and ask for confirmation

## Code Style
- Use JavaScript for application code and tooling, with `.jsx` for React components and `.js` for other modules
- Follow existing project conventions (file structure, naming, patterns)
- Do NOT add comments to code unless the logic is genuinely complex
- Use functional components with arrow functions in React
- Keep this a frontend-only React application using Vite and React Router
- Keep page components in `src/pages`, feature-specific code in `src/features`, and shared components in `src/components`

## SEO & Metadata
- Every page needs a metadata export (title, description, openGraph) and `PageSeo`
- Use JSON-LD structured data on every page
- All blog posts need proper article schema
- Sitemap must include all public pages

## Performance
- Use `font-display: swap` for custom fonts
- Add `fetchPriority="high"` to above-the-fold images
- Use `loading="eager"` for hero/LCP images
- Preconnect to third-party origins in `index.html`

## Data & Content
- Store page content and structured data in `src/data/*.js` files (e.g. `src/data/portfolio.js`, `src/data/now.js`)
- Do NOT hardcode content strings or personal info directly in page components
- Export content as plain JavaScript objects and arrays with consistent shapes

## Generate Scripts
- Generation scripts live in `scripts/` (e.g. `generate-blog.js`, `generate-cli.js`, `generate-llms.js`)
- Each script exports a single async function that writes to `public/` or `contents/`
- Add a corresponding `<name>:generate` script in `package.json`, run with `bun run <name>:generate`
- Generated output files (JSON, txt, sh) are committed to the repo — they serve as the published artifact
