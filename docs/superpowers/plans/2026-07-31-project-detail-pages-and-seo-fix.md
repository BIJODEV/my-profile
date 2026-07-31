# Project Detail Pages & SEO Metadata Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface 5 existing static HTML project-detail pages (currently sitting unused in `src/components/temp/`) as linked "Overview"/"Architecture" pages on the portfolio's project cards, add two new project entries (FlareSight Analytics, Maintenance Control Panel) to the Security Tools section, and fix incorrect GitHub/LinkedIn metadata in `SEO.js`.

**Architecture:** The 5 hand-authored HTML files are self-contained documents (own `<html>`/`<head>`/inline CSS) and must NOT be parsed into React — they move to `public/project-details/` as static assets and are linked via plain `<a target="_blank">` tags using `process.env.PUBLIC_URL` so links resolve correctly under the GitHub Pages subpath (`/my-profile/`). `SecurityToolCard` in `Projects.js` currently hardcodes exactly 3 links (GitHub/Live/Medium três always present) — it must be generalized to conditionally render whichever of `githubUrl`/`liveUrl`/`mediumUrl`/`overviewUrl`/`architectureUrl` a project object actually has, since the two new entries don't have all of them.

**Tech Stack:** React 19 (Create React App / react-scripts 5), Tailwind CSS. No router library in use — the app is a single static page, so cross-page navigation to detail docs is done with plain anchor tags, not client-side routing.

## Global Constraints

- Do not alter the content/markup of the 5 HTML files — relocate only, byte-for-byte.
- No screenshots exist in the repo yet — do not fabricate placeholder images; leave this out of scope.
- `process.env.PUBLIC_URL` must be used (not a hardcoded `/my-profile/` prefix) so links keep working both in local dev (`PUBLIC_URL` is empty string) and on GitHub Pages (`PUBLIC_URL` is `/my-profile`).
- Existing project entries' `tags`, `description`, `borderColor` etc. must be preserved unchanged except for the additions specified below.
- SEO fix values are exact: GitHub URL must read `https://github.com/BIJODEV` (matches `Header.js:30` and `package.json`'s `homepage` casing), LinkedIn URL must read `https://linkedin.com/in/bijo-dev-84a618b7` (matches `Header.js:36`).

---

### Task 1: Relocate static HTML files to `public/project-details/`

**Files:**
- Move: `src/components/temp/crs-rule-lookup-project-overview.html` → `public/project-details/crs-rule-lookup-overview.html`
- Move: `src/components/temp/Adaptive-profiling-project-overview.html` → `public/project-details/adaptive-profiling-overview.html`
- Move: `src/components/temp/flaresight-analytics-executive-briefing.html` → `public/project-details/flaresight-executive-briefing.html`
- Move: `src/components/temp/maintenance-panel-project-overview.html` → `public/project-details/maintenance-panel-overview.html`
- Move: `src/components/temp/maintenance-panel-architecture-flow.html` → `public/project-details/maintenance-panel-architecture-flow.html`
- Remove: `src/components/temp/` (delete directory once empty)

**Interfaces:**
- Produces: 5 static files reachable at build/runtime via `${process.env.PUBLIC_URL}/project-details/<filename>.html` — these exact filenames are consumed by Task 2's link URLs.

- [ ] **Step 1: Create the target directory and move the files with git, preserving history**

```bash
mkdir -p public/project-details
git mv src/components/temp/crs-rule-lookup-project-overview.html public/project-details/crs-rule-lookup-overview.html
git mv src/components/temp/Adaptive-profiling-project-overview.html public/project-details/adaptive-profiling-overview.html
git mv src/components/temp/flaresight-analytics-executive-briefing.html public/project-details/flaresight-executive-briefing.html
git mv src/components/temp/maintenance-panel-project-overview.html public/project-details/maintenance-panel-overview.html
git mv src/components/temp/maintenance-panel-architecture-flow.html public/project-details/maintenance-panel-architecture-flow.html
```

- [ ] **Step 2: Verify the temp directory is empty and remove it**

```bash
ls src/components/temp/ 2>&1
```

Expected: `ls: src/components/temp/: No such file or directory` (git mv removes the dir once empty) — if it still exists and is empty, run `rmdir src/components/temp`.

- [ ] **Step 3: Verify the 5 files exist at their new location with unchanged content**

```bash
ls -la public/project-details/
wc -l public/project-details/*.html
```

Expected: 5 files listed; line counts match the originals (647, 529, 615, 760, 636 respectively for adaptive/crs/flaresight/maintenance-overview/maintenance-arch-flow).

- [ ] **Step 4: Commit**

```bash
git add -A src/components/temp public/project-details
git commit -m "Move project detail HTML pages into public/project-details"
```

---

### Task 2: Generalize `SecurityToolCard` to render conditional links

**Files:**
- Modify: `src/components/Projects.js:148-186` (the `SecurityToolCard` component)
- Test: manual verification via `npm start` (no existing test harness covers this component; CRA's default `App.test.js` only smoke-tests `<App />` renders)

**Interfaces:**
- Consumes: a `project` object that may include any subset of `githubUrl`, `liveUrl`, `mediumUrl`, `overviewUrl`, `architectureUrl` (all optional strings), plus the existing `title`, `description`, `tags`, `borderColor` (always present).
- Produces: renders one `<a>` per URL prop that is truthy, in the fixed order GitHub → Live → Medium → Overview → Architecture. Consumed by Task 3 and Task 4's new/modified data entries.

- [ ] **Step 1: Replace the hardcoded 3-link block in `SecurityToolCard` with conditional rendering**

Current code (`src/components/Projects.js:163-183`):

```jsx
      <div className="flex space-x-3 pt-2 border-t border-gray-600">
        <a href={project.githubUrl} target="_blank"  rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
        <a href={project.liveUrl} target="_blank"  rel="noopener noreferrer" className="text-green-400 hover:text-green-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Live
        </a>
        <a href={project.mediumUrl} target="_blank"  rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Medium
        </a>
      </div>
```

Replace with:

```jsx
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-600">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Live
          </a>
        )}
        {project.mediumUrl && (
          <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Medium
          </a>
        )}
        {project.overviewUrl && (
          <a href={project.overviewUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Overview
          </a>
        )}
        {project.architectureUrl && (
          <a href={project.architectureUrl} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 1 1 0 100-2A4 4 0 002 5v10a2 2 0 002 2h1a1 1 0 100-2H4V5zm12-2a1 1 0 100 2 2 2 0 012 2v10a2 2 0 01-2 2h-1a1 1 0 100 2h1a4 4 0 004-4V5a4 4 0 00-4-4z" />
            </svg>
            Architecture
          </a>
        )}
      </div>
```

- [ ] **Step 2: Start the dev server and manually verify existing cards still render their 3 links**

```bash
npm start
```

Open the local dev URL, scroll to "Security Tools & Innovations", confirm the "Adaptive Profiling with Cloudflare Workers" and "CRS Logic Intelligence" cards each still show GitHub, Live, and Medium links (they don't have `overviewUrl` yet at this point in the plan, so no Overview link should appear yet). Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.js
git commit -m "Generalize SecurityToolCard to render only the links a project has"
```

---

### Task 3: Add `overviewUrl` to the existing Adaptive Profiling and CRS entries

**Files:**
- Modify: `src/components/Projects.js:29-49` (the `securityTools` array's first two entries)

**Interfaces:**
- Consumes: `SecurityToolCard`'s conditional `overviewUrl` rendering from Task 2.
- Produces: none (leaf data change).

- [ ] **Step 1: Add `overviewUrl` to the "Adaptive Profiling with Cloudflare Workers" entry**

Current (`src/components/Projects.js:30-39`):

```js
      {
        title: "Adaptive Profiling with Cloudflare Workers",
        // year: "2025",
        description: "An architecturally sophisticated edge engine built on Cloudflare Workers, D1, and KV. It leverages a three-tier distributed model (Data Plane, High-Speed Buffer, and Asynchronous Reconciler) to perform low-latency traffic baselining and self-healing WAF rule adjustment.",
        githubUrl: "https://github.com/BIJODEV/Cloudflare-Dynamic-Profiling",
        liveUrl: "https://github.com/BIJODEV/Adaptive-Profiler-Demo", 
        mediumUrl: "https://medium.com/@bijodev1/cloudflare-workers-kv-d1-and-a-curious-idea-that-became-adaptive-profiling-49d1dbbf0534",
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "WAF Tuning", "Behavioral Analysis"],
        borderColor: "border-purple-500"
      },
```

Replace with:

```js
      {
        title: "Adaptive Profiling with Cloudflare Workers",
        // year: "2025",
        description: "An architecturally sophisticated edge engine built on Cloudflare Workers, D1, and KV. It leverages a three-tier distributed model (Data Plane, High-Speed Buffer, and Asynchronous Reconciler) to perform low-latency traffic baselining and self-healing WAF rule adjustment.",
        githubUrl: "https://github.com/BIJODEV/Cloudflare-Dynamic-Profiling",
        liveUrl: "https://github.com/BIJODEV/Adaptive-Profiler-Demo", 
        mediumUrl: "https://medium.com/@bijodev1/cloudflare-workers-kv-d1-and-a-curious-idea-that-became-adaptive-profiling-49d1dbbf0534",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/adaptive-profiling-overview.html`,
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "WAF Tuning", "Behavioral Analysis"],
        borderColor: "border-purple-500"
      },
```

- [ ] **Step 2: Add `overviewUrl` to the "CRS Logic Intelligence" entry**

Current (`src/components/Projects.js:40-49`):

```js
      {
        title: "CRS Logic Intelligence: Signature-to-Payload Correlation",
        // year: "2025", 
        description: "High-impact diagnostic tool designed to deconstruct OWASP CRS regex logic and correlate it with blocked payloads. Significantly improves Developer Experience (DevEx) by decreasing Mean Time to Understand (MTTU) for complex WAF events",
        githubUrl: "https://github.com/BIJODEV/crs-rule-lookup-project",
        liveUrl: "https://crs-rule-lookup.onrender.com/",
        mediumUrl: "https://medium.com/@bijodev1/diagnosing-cloudflare-security-events-with-crs-rule-intelligence-a-developers-journey-e61b583b56b0",
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      }
```

Replace with:

```js
      {
        title: "CRS Logic Intelligence: Signature-to-Payload Correlation",
        // year: "2025", 
        description: "High-impact diagnostic tool designed to deconstruct OWASP CRS regex logic and correlate it with blocked payloads. Significantly improves Developer Experience (DevEx) by decreasing Mean Time to Understand (MTTU) for complex WAF events",
        githubUrl: "https://github.com/BIJODEV/crs-rule-lookup-project",
        liveUrl: "https://crs-rule-lookup.onrender.com/",
        mediumUrl: "https://medium.com/@bijodev1/diagnosing-cloudflare-security-events-with-crs-rule-intelligence-a-developers-journey-e61b583b56b0",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/crs-rule-lookup-overview.html`,
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      }
```

- [ ] **Step 3: Start the dev server and verify both cards now show a 4th "Overview" link**

```bash
npm start
```

Open the local dev URL, scroll to "Security Tools & Innovations", confirm both cards now show GitHub, Live, Medium, and Overview links, and clicking "Overview" on each opens the correct static HTML page in a new tab with its content intact. Stop the dev server once confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.js
git commit -m "Link Adaptive Profiling and CRS entries to their overview pages"
```

---

### Task 4: Add FlareSight Analytics and Maintenance Control Panel entries

**Files:**
- Modify: `src/components/Projects.js:29-50` (append two entries to the `securityTools` array, after the CRS entry)

**Interfaces:**
- Consumes: `SecurityToolCard`'s conditional rendering from Task 2 (these two entries omit `githubUrl`/`liveUrl`/`mediumUrl` entirely since both are private/internal tools).
- Produces: none (leaf data change).

- [ ] **Step 1: Append the FlareSight Analytics and Maintenance Control Panel entries to `securityTools`**

Current end of array (`src/components/Projects.js:40-50`):

```js
      {
        title: "CRS Logic Intelligence: Signature-to-Payload Correlation",
        // year: "2025", 
        description: "High-impact diagnostic tool designed to deconstruct OWASP CRS regex logic and correlate it with blocked payloads. Significantly improves Developer Experience (DevEx) by decreasing Mean Time to Understand (MTTU) for complex WAF events",
        githubUrl: "https://github.com/BIJODEV/crs-rule-lookup-project",
        liveUrl: "https://crs-rule-lookup.onrender.com/",
        mediumUrl: "https://medium.com/@bijodev1/diagnosing-cloudflare-security-events-with-crs-rule-intelligence-a-developers-journey-e61b583b56b0",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/crs-rule-lookup-overview.html`,
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      }
    ],
```

Replace with (adds a trailing comma after the CRS entry, then two new entries):

```js
      {
        title: "CRS Logic Intelligence: Signature-to-Payload Correlation",
        // year: "2025", 
        description: "High-impact diagnostic tool designed to deconstruct OWASP CRS regex logic and correlate it with blocked payloads. Significantly improves Developer Experience (DevEx) by decreasing Mean Time to Understand (MTTU) for complex WAF events",
        githubUrl: "https://github.com/BIJODEV/crs-rule-lookup-project",
        liveUrl: "https://crs-rule-lookup.onrender.com/",
        mediumUrl: "https://medium.com/@bijodev1/diagnosing-cloudflare-security-events-with-crs-rule-intelligence-a-developers-journey-e61b583b56b0",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/crs-rule-lookup-overview.html`,
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      },
      {
        title: "FlareSight Analytics",
        description: "Enterprise edge intelligence and telemetry command center giving security teams unified, real-time visibility across multi-provider WAF/CDN traffic (Cloudflare and IBM CIS) in a single executive dashboard.",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/flaresight-executive-briefing.html`,
        tags: ["React 19", "Vite", "Cloudflare", "IBM CIS", "Edge Telemetry"],
        borderColor: "border-red-500"
      },
      {
        title: "Maintenance Control Panel",
        description: "A one-click, self-scheduling, self-expiring, fully audited replacement for hand-editing Cloudflare Snippet Rules to take a storefront offline for maintenance.",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/maintenance-panel-overview.html`,
        architectureUrl: `${process.env.PUBLIC_URL}/project-details/maintenance-panel-architecture-flow.html`,
        tags: ["Cloudflare Snippet Rules", "Automation", "Audit Logging", "Self-Service Ops"],
        borderColor: "border-amber-500"
      }
    ],
```

- [ ] **Step 2: Start the dev server and verify the two new cards render correctly**

```bash
npm start
```

Open the local dev URL, scroll to "Security Tools & Innovations", confirm:
- "FlareSight Analytics" card appears with only an "Overview" link (no GitHub/Live/Medium), and it opens the correct page.
- "Maintenance Control Panel" card appears with "Overview" and "Architecture" links only, and each opens its correct respective page.
- The horizontal scroll still works smoothly across all 4 cards now in the row.

Stop the dev server once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.js
git commit -m "Add FlareSight Analytics and Maintenance Control Panel project entries"
```

---

### Task 5: Fix SEO.js metadata casing and LinkedIn URL

**Files:**
- Modify: `src/components/SEO.js:72-75`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed elsewhere (leaf fix).

- [ ] **Step 1: Fix the `sameAs` URLs in the structured data block**

Current (`src/components/SEO.js:72-75`):

```js
          "sameAs": [
            "https://github.com/bijodev",
            "https://linkedin.com/in/bijodev"
          ]
```

Replace with:

```js
          "sameAs": [
            "https://github.com/BIJODEV",
            "https://linkedin.com/in/bijo-dev-84a618b7"
          ]
```

- [ ] **Step 2: Verify no other stale references to the old URLs exist in the file**

```bash
grep -n "github.com/bijodev\b\|linkedin.com/in/bijodev\b" src/components/SEO.js
```

Expected: no output (both stale strings fully replaced).

- [ ] **Step 3: Commit**

```bash
git add src/components/SEO.js
git commit -m "Fix SEO structured-data GitHub and LinkedIn URLs to match Header links"
```

---

### Task 6: Full production build verification

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: all prior tasks' changes.
- Produces: confidence the app builds cleanly for deployment.

- [ ] **Step 1: Run a full production build**

```bash
npm run build
```

Expected: build completes with `Compiled successfully.` (warnings about bundle size are acceptable; any new error must be investigated and fixed before proceeding).

- [ ] **Step 2: Verify the 5 static HTML files were copied into the build output**

```bash
ls build/project-details/
```

Expected: all 5 files listed (`adaptive-profiling-overview.html`, `crs-rule-lookup-overview.html`, `flaresight-executive-briefing.html`, `maintenance-panel-architecture-flow.html`, `maintenance-panel-overview.html`).

- [ ] **Step 3: Serve the production build locally and click through every new/changed link**

```bash
npx serve -s build -l 5050
```

Visit `http://localhost:5050`, scroll to Security Tools, click every link on all 4 cards (Adaptive Profiling, CRS, FlareSight, Maintenance Control Panel) and confirm each opens its correct static page with correct styling. Stop the server (Ctrl+C) once confirmed.

- [ ] **Step 4: Clean up the local build artifact (not committed — already covered by `.gitignore`)**

```bash
git status
```

Expected: `build/` does not appear in `git status` output (already gitignored); no commit needed for this task.
