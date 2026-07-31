# SEO/AEO/GEO Overhaul Design

## Context

The my-profile portfolio (Create React App, client-side rendered, deployed to GitHub Pages at `bijodev.github.io/my-profile`, not yet added to Google Search Console) needs a comprehensive discoverability pass so it has the best chance of ranking for searches like "Cloudflare," "security engineering," and "web application firewall," and of being cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews).

Current state audit:
- `public/index.html` references `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`, and `og-image.png` — **none of these files exist** in `public/`. Only `favicon.ico`, `logo192.png`, `logo512.png`, `manifest.json` exist.
- `public/sitemap.xml` has an incorrect namespace (`http://www.sitemap.org/schemas/sitemap/0.9` instead of `http://www.sitemaps.org/schemas/sitemap/0.9`) and lists only the homepage — not the 5 project-detail pages added in the prior work session.
- `public/robots.txt` allows all crawlers via wildcard but doesn't explicitly document AI crawler support.
- `src/components/SEO.js` (react-helmet) has reasonable meta tags and a `Person` JSON-LD block, but no `FAQPage` schema, no `worksFor`/`address` fields, and the app is 100% client-side rendered — a crawler that does not execute JavaScript (many AI crawlers, including some that ignore JS entirely) sees only an empty `<div id="root">`.
- No `llms.txt` exists.

## Goals

1. Make the site's real content visible to crawlers that don't execute JavaScript, via build-time prerendering.
2. Fix all broken icon/OG-image references so favicons and social link previews actually work.
3. Strengthen meta tags and structured data to target the stated keywords and support AI-answer-engine citation.
4. Add a visible FAQ section (with matching structured data) as concise, quotable Q&A content.
5. Add `llms.txt`, fix `sitemap.xml`, extend `robots.txt` — all low-risk, high-value additions.
6. Document (not perform) the Google Search Console submission step, since it requires the user's Google account.

## Non-Goals

- No migration to Next.js or any SSR framework — prerendering via Puppeteer is a scoped, in-place solution for this single-route CRA app.
- No changes to visual design/layout beyond adding one new FAQ section, styled consistently with existing sections (`bg-gray-800 rounded-lg p-6` card pattern already used by `About`, `Skills`, etc.).
- No fabricated content — the FAQ answers must only restate facts already present elsewhere on the site (bio, skills, experience, project descriptions).
- Not adding a Google Search Console verification meta tag with a real verification code (the user hasn't created the property yet) — a placeholder/instructions only.

## Design

### 1. Build-time prerendering

**File:** `scripts/prerender.js` (new)

Since this is a single-route SPA (no react-router, one URL: `/`), a full crawler tool like `react-snap` (unmaintained, uncertain React 19 compatibility) is unnecessary complexity. A ~40-line custom script does the same job with fewer moving parts:

1. Serve the `build/` directory locally on a fixed port (using the `serve` package, already a devDependency via earlier work... actually not currently a devDependency — will use the `http-server`-equivalent already available: `serve` is used ad hoc via `npx serve` in this project's manual verification steps, but is not a devDependency. Add `serve` as a devDependency so the script doesn't rely on `npx` fetching it fresh in CI-like environments.)
2. Launch Puppeteer (new devDependency), navigate to `http://localhost:<port>/my-profile/` (respecting the `homepage` subpath), wait for `networkidle0` (ensures react-helmet's async head mutations and all client-rendered sections have settled).
3. Capture `page.content()` (the full post-render `<html>` outerHTML, including react-helmet's injected `<title>`/meta tags and the fully-rendered `#root` subtree).
4. Write that content back to `build/index.html`, overwriting the pre-render shell.
5. Shut down the local server and the browser.

**Wiring:** add `"postbuild": "node scripts/prerender.js"` to `package.json` scripts. npm's lifecycle convention runs `postbuild` automatically after `npm run build` — no change needed to `predeploy`/`deploy`, which already call `npm run build`.

**Verification approach:** after building, `curl` the built `index.html` directly (no JS execution) and grep for known body text (e.g., "Cloud Security Engineer with 10+ years") to confirm the content is now present in raw HTML, not just in the JS bundle.

### 2. Icon and manifest fixes

Using macOS's built-in `sips` (no new npm dependency), generated from `public/logo512.png` (the existing square logo mark, not the headshot — favicons/app icons conventionally use a logo/mark, not a photo):
  - `public/apple-touch-icon.png` (180×180) from `logo512.png`
  - `public/favicon-32x32.png` (32×32) from `logo512.png`
  - `public/favicon-16x16.png` (16×16) from `logo512.png`
- `public/site.webmanifest` (new file, standard Web App Manifest format, referencing the above icons plus `logo192.png`/`logo512.png`) — replaces the informal `manifest.json` as the one `index.html` actually links to (`manifest.json` stays as-is since CRA's own tooling references it elsewhere; both can coexist, `site.webmanifest` is the one in the `<link rel="manifest">` tag today).
- `public/og-image.png` (1200×630, the standard Open Graph size) generated from `src/components/profilePic/profilePic.png` via `sips` crop/resize — used for social link previews (LinkedIn, Twitter/X, Slack, etc.).

### 3. Meta tags and structured data (`src/components/SEO.js`)

- Sharpen `title`/`description`/`keywords` to read naturally with the target phrases ("Cloudflare," "security engineering," "Web Application Firewall") without keyword-stuffing — these already exist in the current copy and mostly need reordering/emphasis, not wholesale rewriting.
- Extend the `Person` JSON-LD block:
  - `worksFor`: `{"@type": "Organization", "name": "IBM"}`
  - `address`: `{"@type": "PostalAddress", "addressLocality": "Bengaluru", "addressRegion": "Karnataka", "addressCountry": "IN"}`
  - Broaden `knowsAbout` to explicitly include "Security Engineering" and "Web Application Firewall" as standalone phrases (currently phrased slightly differently)
- Add a new `FAQPage` JSON-LD block (see section 4) whose `mainEntity` array exactly mirrors the visible FAQ component's questions/answers — required for Google FAQ rich-snippet eligibility (structured data must match visible content).

### 4. Visible FAQ section

**File:** `src/components/FAQ.js` (new), added to `App.js`'s left column (after `Projects`, before the right column continues) or right column — placement: append to the left column under `Projects`, since FAQ is substantial text content best given full-width space, matching the existing `lg:col-span-2` container.

Styled as a `<section className="bg-gray-800 rounded-lg p-6">` matching every other section (About, Experience, Projects), using a simple expandable-or-flat Q&A list (flat list — no accordion JS needed, keeps it maximally crawlable) with `<h3>` questions and `<p>` answers.

Six Q&A pairs, each restating facts already present elsewhere on the site:

1. **Who is Bijo Dev?** — Cloud Security Engineer, 10+ years experience, security architecture + full-stack development, currently Senior Cloud Security Engineer at IBM, Bengaluru.
2. **What is Bijo Dev's experience with Cloudflare and Web Application Firewalls (WAF)?** — Deploying/tuning WAFs across Cloudflare, Akamai, F5 ASM, Imperva; WAF policy development, bot mitigation, DDoS protection, edge security architecture.
3. **What kind of security engineering work does Bijo Dev do?** — WAF policy tuning, edge protection architecture, bot mitigation/threat intelligence, compliance (PCI DSS, HIPAA, SOC 2), Splunk/QRadar SIEM, vulnerability management.
4. **Does Bijo Dev also build software, or only security engineering?** — Both; full-stack development (React, Node.js, Python) alongside security tooling, e.g. the Cloudflare Workers adaptive-profiling system and the CRS Logic Intelligence WAF-diagnostics tool.
5. **What are some of Bijo Dev's notable Cloudflare projects?** — Adaptive Profiling with Cloudflare Workers, CRS Logic Intelligence, FlareSight Analytics, Maintenance Control Panel (all four, name-checked with a one-clause description each).
6. **How can I contact Bijo Dev?** — Email and LinkedIn/GitHub, referencing the header links.

### 5. `llms.txt`, `sitemap.xml`, `robots.txt`

- **`public/llms.txt`** (new): plain Markdown per the emerging `llms.txt` convention — H1 with name/role, a short summary paragraph, a bullet list of core expertise areas, a bullet list of notable projects with one-line descriptions and links, and contact info.
- **`public/sitemap.xml`**: fix `xmlns` to `http://www.sitemaps.org/schemas/sitemap/0.9`, update `lastmod` to current date, add 5 `<url>` entries for the project-detail pages under `/my-profile/project-details/*.html` with `changefreq: yearly` and `priority: 0.6` (lower than the homepage's `1.0`).
- **`public/robots.txt`**: keep the existing wildcard `Allow: /`, and add explicit named entries for `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, and `CCBot`, each with `Allow: /` — redundant with the wildcard but documents explicit intent, which some crawler operators' documentation recommends checking for by name regardless of wildcard rules.

### 6. Google Search Console (user action, documented only)

No code change. Final summary to the user will include: (1) go to Google Search Console, add `https://bijodev.github.io/my-profile/` as a URL-prefix property, (2) verify via the HTML-file method (upload a token file to `public/`, which is the simplest method for a static GitHub Pages site — no DNS access needed), (3) submit `sitemap.xml` once verified.

## Testing

- No existing test suite covers markup/SEO content; verification is manual:
  - `npm run build` succeeds and the `postbuild` prerender step completes without error.
  - `curl` the built `index.html` (no JS) and confirm real body text is present (proves prerendering worked).
  - Validate the `Person` and `FAQPage` JSON-LD blocks with a JSON parser (catches malformed template-literal JSON, a real risk given `SEO.js` already builds JSON-LD via a template string).
  - Serve the build locally and visually confirm: favicon shows correctly, FAQ section renders and matches the copy in this spec, no console errors.
  - `xmllint --noout public/sitemap.xml` (or equivalent) to confirm well-formed XML after edits.

## Risks / Trade-offs

- Puppeteer adds a devDependency with a bundled Chromium download (~200-300MB) — one-time `npm install` cost, no effect on deployed bundle size, but worth flagging since CI/first-time clone will be slower.
- Prerendering only helps for the single root route; if the site ever adds client-side routing, the prerender script would need to visit each route — out of scope today since there is exactly one route.
- `react-helmet` is a known-unmaintained package (noted in an earlier review pass, deferred at the time) — it still functions today and remains compatible with the prerender approach since Puppeteer waits for it to run before capturing `page.content()`. Not being replaced in this pass; still a candidate for a future pass.
