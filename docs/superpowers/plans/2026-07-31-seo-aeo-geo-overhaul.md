# SEO/AEO/GEO Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the my-profile portfolio site fully discoverable by search engines and AI answer engines by fixing broken assets, adding build-time prerendering, expanding structured data and FAQ content, and adding the emerging `llms.txt`/sitemap/robots conventions.

**Architecture:** No routing or SSR framework is introduced. A custom ~50-line Puppeteer script runs as an npm `postbuild` hook to capture the fully client-rendered page as static HTML (the single biggest lever, since this is a 100%-CSR Create React App). All other changes are additive: new static files in `public/`, one new React component (`FAQ.js`), and edits to existing meta/structured-data code in `SEO.js`.

**Tech Stack:** React 19 (Create React App/react-scripts 5), Tailwind CSS, react-helmet, Puppeteer (new devDependency), macOS `sips` (no new dependency) for image generation.

## Global Constraints

- FAQ content must restate facts already present elsewhere on the site (bio, skills, experience, project descriptions) — no fabricated claims.
- The FAQ question/answer text must be byte-identical between the visible `FAQ.js` component and the `FAQPage` JSON-LD block in `SEO.js` (Google's FAQ rich-snippet eligibility requires structured data to match visible content).
- Icon/manifest filenames must exactly match what `public/index.html` already references: `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`, `og-image.png`.
- Image generation uses macOS's built-in `sips` only — no new image-processing npm dependency.
- The `postbuild` prerender step must not break the existing `predeploy`/`deploy` flow (`predeploy: npm run build`, `deploy: gh-pages -d build`) — it must run automatically as part of `npm run build`, requiring no changes to those two scripts.
- Puppeteer is a devDependency only — it must not appear in `dependencies` or affect the deployed bundle.
- Deployed base path is `/my-profile` (from `package.json`'s `"homepage": "https://BIJODEV.github.io/my-profile"`) — the prerender script must serve and navigate using this exact path prefix, or the captured HTML will reference broken asset URLs.

---

### Task 1: Generate icon, manifest, and OG-image assets

**Files:**
- Create: `public/apple-touch-icon.png` (180×180)
- Create: `public/favicon-32x32.png` (32×32)
- Create: `public/favicon-16x16.png` (16×16)
- Create: `public/og-image.png` (1200×630)
- Create: `public/site.webmanifest`

**Interfaces:**
- Produces: 5 static files under `public/` that `public/index.html` (existing `<link>` tags) and `src/components/SEO.js` (existing `og:image`/`twitter:image` meta content) already reference by these exact filenames — no code changes needed in this task, only the missing files.

- [ ] **Step 1: Generate the three favicon sizes from the existing logo mark**

```bash
cd /Volumes/MyProjects/my-profile
sips -z 180 180 public/logo512.png --out public/apple-touch-icon.png
sips -z 32 32 public/logo512.png --out public/favicon-32x32.png
sips -z 16 16 public/logo512.png --out public/favicon-16x16.png
```

- [ ] **Step 2: Verify the three files were created at the correct dimensions**

```bash
sips -g pixelWidth -g pixelHeight public/apple-touch-icon.png
sips -g pixelWidth -g pixelHeight public/favicon-32x32.png
sips -g pixelWidth -g pixelHeight public/favicon-16x16.png
```

Expected: `pixelWidth: 180` / `pixelHeight: 180` for the first, `32`/`32` for the second, `16`/`16` for the third.

- [ ] **Step 3: Generate the OG/social-preview image from the profile photo**

The source photo (`src/components/profilePic/profilePic.png`, 2064×2048) is near-square; the standard Open Graph image size is 1200×630 (landscape). Resize so the largest dimension becomes 1200, then center-crop to exactly 1200×630:

```bash
cd /Volumes/MyProjects/my-profile
mkdir -p /tmp/og-build
sips -Z 1200 src/components/profilePic/profilePic.png --out /tmp/og-build/og-resized.png
sips -c 630 1200 /tmp/og-build/og-resized.png --out public/og-image.png
rm -rf /tmp/og-build
```

- [ ] **Step 4: Verify the OG image is exactly 1200×630**

```bash
sips -g pixelWidth -g pixelHeight public/og-image.png
```

Expected: `pixelWidth: 1200` and `pixelHeight: 630`.

- [ ] **Step 5: Create `public/site.webmanifest`**

```json
{
  "short_name": "Bijo Dev",
  "name": "Bijo Dev - Cloud Security Engineer",
  "icons": [
    {
      "src": "favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "logo192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "logo512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

- [ ] **Step 6: Validate the manifest is well-formed JSON**

```bash
python3 -m json.tool public/site.webmanifest > /dev/null && echo "valid JSON"
```

Expected: `valid JSON`

- [ ] **Step 7: Commit**

```bash
git add public/apple-touch-icon.png public/favicon-32x32.png public/favicon-16x16.png public/og-image.png public/site.webmanifest
git commit -m "Add missing favicon, OG-image, and web manifest assets"
```

---

### Task 2: Fix sitemap.xml and extend robots.txt

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/robots.txt`

**Interfaces:**
- Consumes: the 5 project-detail page filenames already deployed under `public/project-details/` (from prior work): `adaptive-profiling-overview.html`, `crs-rule-lookup-overview.html`, `flaresight-executive-briefing.html`, `maintenance-panel-overview.html`, `maintenance-panel-architecture-flow.html`.
- Produces: none (leaf files, not imported by any code).

- [ ] **Step 1: Replace `public/sitemap.xml`**

Current file has an incorrect namespace (`sitemap.org` instead of `sitemaps.org`) and lists only the homepage. Replace entirely with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bijodev.github.io/my-profile/</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bijodev.github.io/my-profile/project-details/adaptive-profiling-overview.html</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://bijodev.github.io/my-profile/project-details/crs-rule-lookup-overview.html</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://bijodev.github.io/my-profile/project-details/flaresight-executive-briefing.html</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://bijodev.github.io/my-profile/project-details/maintenance-panel-overview.html</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://bijodev.github.io/my-profile/project-details/maintenance-panel-architecture-flow.html</loc>
    <lastmod>2026-07-31</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Validate the sitemap is well-formed XML**

```bash
xmllint --noout public/sitemap.xml && echo "valid XML"
```

Expected: `valid XML`. If `xmllint` is not installed, instead run `python3 -c "import xml.etree.ElementTree as ET; ET.parse('public/sitemap.xml'); print('valid XML')"`.

- [ ] **Step 3: Replace `public/robots.txt`**

```
# public/robots.txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://bijodev.github.io/my-profile/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add public/sitemap.xml public/robots.txt
git commit -m "Fix sitemap.xml namespace, add project pages, extend robots.txt for AI crawlers"
```

---

### Task 3: Add `llms.txt`

**Files:**
- Create: `public/llms.txt`

**Interfaces:**
- Consumes: project names/descriptions and contact info already established on the site (Header.js, Projects.js).
- Produces: none (leaf file).

- [ ] **Step 1: Create `public/llms.txt`**

```markdown
# Bijo Dev

> Cloud Security Engineer with 10+ years of experience in security engineering, Web Application Firewall (WAF) deployment, and full-stack development.

Bijo Dev is a Senior Cloud Security Engineer at IBM (Bengaluru, India), specializing in Cloudflare, Akamai, F5 ASM, and Imperva Web Application Firewall deployment, bot mitigation, DDoS protection, and security compliance (PCI DSS, HIPAA, SOC 2). Also builds full-stack applications in React, Node.js, and Python, bridging security and software development.

## Expertise

- Cloud Security & WAF: Cloudflare, Akamai, F5 ASM, Imperva, Bot Mitigation, Edge Security, DDoS Protection
- Full-Stack Development: React, JavaScript, Python, Node.js, REST APIs
- Network & Infrastructure: F5 Load Balancers, Fortigate Firewalls, Checkpoint, Kubernetes, Docker, CI/CD
- Security Operations: Splunk, QRadar SIEM, SOC Analysis, Incident Response, Threat Hunting, Vulnerability Management
- Compliance & Governance: PCI DSS, SOC 2, HIPAA, Security Audits, Risk Assessment

## Notable Projects

- [Adaptive Profiling with Cloudflare Workers](https://bijodev.github.io/my-profile/project-details/adaptive-profiling-overview.html): Edge traffic-profiling engine built on Cloudflare Workers, D1, and KV, performing low-latency traffic baselining and self-healing WAF rule adjustment.
- [CRS Logic Intelligence](https://bijodev.github.io/my-profile/project-details/crs-rule-lookup-overview.html): Diagnostic tool that deconstructs OWASP CRS regex logic and correlates it with blocked payloads.
- [FlareSight Analytics](https://bijodev.github.io/my-profile/project-details/flaresight-executive-briefing.html): Enterprise edge intelligence and telemetry command center across Cloudflare and IBM CIS.
- [Maintenance Control Panel](https://bijodev.github.io/my-profile/project-details/maintenance-panel-overview.html): Self-scheduling, self-expiring, fully audited replacement for hand-editing Cloudflare Snippet Rules.

## Contact

- Email: bijodev1@gmail.com
- GitHub: https://github.com/BIJODEV
- LinkedIn: https://linkedin.com/in/bijo-dev-84a618b7
- Portfolio: https://bijodev.github.io/my-profile/
```

- [ ] **Step 2: Commit**

```bash
git add public/llms.txt
git commit -m "Add llms.txt for AI crawler discoverability"
```

---

### Task 4: Add visible FAQ section

**Files:**
- Create: `src/components/FAQ.js`
- Modify: `src/App.js:1-27`

**Interfaces:**
- Produces: a default-exported `FAQ` React component with no props, rendering a `<section>` matching the existing card style (`bg-gray-800 rounded-lg p-6`) used by `About`/`Experience`/`Projects`. The exact question/answer text below is the canonical source Task 5 must copy verbatim into `SEO.js`'s `FAQPage` JSON-LD.

- [ ] **Step 1: Create `src/components/FAQ.js`**

```jsx
// src/components/FAQ.js
import React from 'react';

const faqs = [
  {
    question: "Who is Bijo Dev?",
    answer: "Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security architecture, Web Application Firewall deployment, and full-stack development, currently working as a Senior Cloud Security Engineer at IBM in Bengaluru, India."
  },
  {
    question: "What is Bijo Dev's experience with Cloudflare and Web Application Firewalls (WAF)?",
    answer: "Bijo Dev specializes in deploying and tuning Web Application Firewalls across Cloudflare, Akamai, F5 ASM, and Imperva, including WAF policy development, bot mitigation, DDoS protection, and edge security architecture for high-traffic production systems."
  },
  {
    question: "What kind of security engineering work does Bijo Dev do?",
    answer: "Bijo Dev's security engineering work spans WAF policy tuning, edge protection architecture, bot mitigation and threat intelligence, and security compliance including PCI DSS, HIPAA, and SOC 2, alongside hands-on tools like Splunk, QRadar SIEM, and vulnerability management."
  },
  {
    question: "Does Bijo Dev also build software, or only security engineering?",
    answer: "Both. Bijo Dev bridges security and development, building full-stack applications with React, Node.js, and Python alongside security tooling, including an adaptive Cloudflare Workers traffic-profiling system and a WAF rule-diagnostics tool called CRS Logic Intelligence."
  },
  {
    question: "What are some of Bijo Dev's notable Cloudflare projects?",
    answer: "Notable Cloudflare-focused projects include Adaptive Profiling with Cloudflare Workers (D1 and KV-based traffic baselining), CRS Logic Intelligence for WAF rule diagnostics, FlareSight Analytics (a multi-provider edge telemetry dashboard), and a Maintenance Control Panel built on Cloudflare Snippet Rules."
  },
  {
    question: "How can I contact Bijo Dev?",
    answer: "You can reach Bijo Dev at bijodev1@gmail.com, or connect via the LinkedIn and GitHub links in the site header."
  }
];

const FAQ = () => {
  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{faq.question}</h3>
            <p className="text-gray-300 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
```

- [ ] **Step 2: Add the FAQ section to `App.js`**

Current (`src/App.js`):

```jsx
// src/App.js
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import SEO from './components/SEO';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <SEO />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <About />
            <Experience />
            <Projects />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <Skills />
            <Certifications />
            <Education />
            <Hobbies />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Bijo Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
```

Replace with:

```jsx
// src/App.js
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import FAQ from './components/FAQ';
import SEO from './components/SEO';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <SEO />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <About />
            <Experience />
            <Projects />
            <FAQ />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <Skills />
            <Certifications />
            <Education />
            <Hobbies />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Bijo Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Start the dev server and verify the FAQ section renders**

```bash
BROWSER=none npm start
```

Open the local dev URL, scroll to the bottom of the left column (below Projects), and confirm a "Frequently Asked Questions" section renders with all 6 questions and answers, styled consistently with the other cards. Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/components/FAQ.js src/App.js
git commit -m "Add visible FAQ section with AEO-oriented Q&A content"
```

---

### Task 5: Expand SEO meta tags and structured data

**Files:**
- Modify: `src/components/SEO.js`
- Modify: `public/index.html:1-35`

**Interfaces:**
- Consumes: the exact 6 question/answer pairs from Task 4's `src/components/FAQ.js` (must be copied byte-for-byte into the `FAQPage` JSON-LD block below).
- Produces: none (leaf task; the final Task 6 build-verification step reads the resulting rendered/prerendered HTML).

- [ ] **Step 1: Replace `src/components/SEO.js`**

```jsx
// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const title = "Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev";
  const description = "Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security engineering, Cloudflare, and Web Application Firewall (WAF) deployment across Cloudflare, Akamai, F5 ASM, and Imperva. Specializes in bot mitigation, DDoS protection, and full-stack development.";
  const keywords = "Cloudflare, Cloudflare Expert, Security Engineering, Security Engineer, Web Application Firewall, WAF, WAF Expert, Cloud Security Engineer, Akamai, F5 ASM, Imperva, Bot Mitigation, DDoS Protection, OWASP Top 10, WAF Tuning, Cybersecurity Consultant, WAF Deployment, Security Hardening";

  return (
    <Helmet>
      <html lang="en" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Bijo Dev" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content="https://bijodev.github.io/my-profile/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://bijodev.github.io/my-profile/og-image.png" />
      <meta property="og:site_name" content="Bijo Dev - Cloud Security Engineer" />
      <meta property="profile:first_name" content="Bijo" />
      <meta property="profile:last_name" content="Dev" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://bijodev.github.io/my-profile/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://bijodev.github.io/my-profile/og-image.png" />
      <meta property="twitter:creator" content="@bijodev" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://bijodev.github.io/my-profile/" />
      
      {/* Structured Data: Person */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Bijo Dev",
          "url": "https://bijodev.github.io/my-profile/",
          "jobTitle": "Cloud Security Engineer",
          "description": "${description}",
          "worksFor": {
            "@type": "Organization",
            "name": "IBM"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "knowsAbout": [
            "Cloudflare",
            "Security Engineering",
            "Web Application Firewall",
            "Akamai",
            "F5 ASM",
            "Imperva",
            "Bot Mitigation",
            "DDoS Protection",
            "OWASP Top 10",
            "Cloud Security",
            "React Development",
            "Full-Stack Development"
          ],
          "hasCredential": [
            "Cloudflare Certified",
            "Akamai Certified",
            "10+ Years Experience"
          ],
          "sameAs": [
            "https://github.com/BIJODEV",
            "https://linkedin.com/in/bijo-dev-84a618b7"
          ]
        }
        `}
      </script>

      {/* Structured Data: FAQPage (must match the visible FAQ.js content exactly) */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Who is Bijo Dev?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security architecture, Web Application Firewall deployment, and full-stack development, currently working as a Senior Cloud Security Engineer at IBM in Bengaluru, India."
              }
            },
            {
              "@type": "Question",
              "name": "What is Bijo Dev's experience with Cloudflare and Web Application Firewalls (WAF)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bijo Dev specializes in deploying and tuning Web Application Firewalls across Cloudflare, Akamai, F5 ASM, and Imperva, including WAF policy development, bot mitigation, DDoS protection, and edge security architecture for high-traffic production systems."
              }
            },
            {
              "@type": "Question",
              "name": "What kind of security engineering work does Bijo Dev do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bijo Dev's security engineering work spans WAF policy tuning, edge protection architecture, bot mitigation and threat intelligence, and security compliance including PCI DSS, HIPAA, and SOC 2, alongside hands-on tools like Splunk, QRadar SIEM, and vulnerability management."
              }
            },
            {
              "@type": "Question",
              "name": "Does Bijo Dev also build software, or only security engineering?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Both. Bijo Dev bridges security and development, building full-stack applications with React, Node.js, and Python alongside security tooling, including an adaptive Cloudflare Workers traffic-profiling system and a WAF rule-diagnostics tool called CRS Logic Intelligence."
              }
            },
            {
              "@type": "Question",
              "name": "What are some of Bijo Dev's notable Cloudflare projects?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Notable Cloudflare-focused projects include Adaptive Profiling with Cloudflare Workers (D1 and KV-based traffic baselining), CRS Logic Intelligence for WAF rule diagnostics, FlareSight Analytics (a multi-provider edge telemetry dashboard), and a Maintenance Control Panel built on Cloudflare Snippet Rules."
              }
            },
            {
              "@type": "Question",
              "name": "How can I contact Bijo Dev?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can reach Bijo Dev at bijodev1@gmail.com, or connect via the LinkedIn and GitHub links in the site header."
              }
            }
          ]
        }
        `}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1a202c" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default SEO;
```

- [ ] **Step 2: Update the static meta tags in `public/index.html` to match**

This keeps the pre-JS baseline (before react-helmet or the prerender step runs) consistent with the React-rendered version. Current file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    
    <!-- SEO Meta Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="Bijo Dev - Cloud Security Engineer" />
    <meta name="description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development. Specialized in Cloudflare, Akamai, F5 ASM, and React applications." />
    <meta name="keywords" content="cloud security, WAF, cloudflare, react developer, full-stack, web application firewall, bot mitigation, cybersecurity" />
    <meta name="author" content="Bijo Dev" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bijodev.github.io/my-profile/" />
    <meta property="og:title" content="Bijo Dev - Cloud Security Engineer" />
    <meta property="og:description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development. Specialized in Cloudflare, Akamai, F5 ASM, and React applications." />
    <meta property="og:image" content="https://bijodev.github.io/my-profile/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bijodev.github.io/my-profile/" />
    <meta property="twitter:title" content="Bijo Dev - Cloud Security Engineer" />
    <meta property="twitter:description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development." />
    <meta property="twitter:image" content="https://bijodev.github.io/my-profile/og-image.png" />
    
    <!-- Favicon Links -->
    <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
    <link rel="manifest" href="%PUBLIC_URL%/site.webmanifest">
    
    <!-- Preload critical resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Page Title -->
    <title>Bijo Dev - Cloud Security Engineer</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Replace the `<!-- Primary Meta Tags -->` through `<!-- Twitter -->` blocks (title/description/keywords/og/twitter content only — favicon links, preconnects, and everything else stay unchanged) with:

```html
    <!-- Primary Meta Tags -->
    <meta name="title" content="Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev" />
    <meta name="description" content="Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security engineering, Cloudflare, and Web Application Firewall (WAF) deployment across Cloudflare, Akamai, F5 ASM, and Imperva. Specializes in bot mitigation, DDoS protection, and full-stack development." />
    <meta name="keywords" content="Cloudflare, Cloudflare Expert, Security Engineering, Security Engineer, Web Application Firewall, WAF, WAF Expert, Cloud Security Engineer, Akamai, F5 ASM, Imperva, Bot Mitigation, DDoS Protection, OWASP Top 10, WAF Tuning, Cybersecurity Consultant, WAF Deployment, Security Hardening" />
    <meta name="author" content="Bijo Dev" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bijodev.github.io/my-profile/" />
    <meta property="og:title" content="Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev" />
    <meta property="og:description" content="Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security engineering, Cloudflare, and Web Application Firewall (WAF) deployment across Cloudflare, Akamai, F5 ASM, and Imperva. Specializes in bot mitigation, DDoS protection, and full-stack development." />
    <meta property="og:image" content="https://bijodev.github.io/my-profile/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bijodev.github.io/my-profile/" />
    <meta property="twitter:title" content="Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev" />
    <meta property="twitter:description" content="Bijo Dev is a Cloud Security Engineer with 10+ years of experience in security engineering, Cloudflare, and Web Application Firewall (WAF) deployment across Cloudflare, Akamai, F5 ASM, and Imperva." />
    <meta property="twitter:image" content="https://bijodev.github.io/my-profile/og-image.png" />
```

Also update the `<title>` tag at the bottom of `<head>` from `<title>Bijo Dev - Cloud Security Engineer</title>` to `<title>Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev</title>`.

- [ ] **Step 3: Validate both new JSON-LD blocks are well-formed JSON**

The JSON-LD is embedded in template literals inside JSX, so extract and validate each manually:

```bash
cd /Volumes/MyProjects/my-profile
node -e "
const fs = require('fs');
const content = fs.readFileSync('src/components/SEO.js', 'utf8');
const matches = [...content.matchAll(/<script type=\"application\/ld\+json\">\s*\{\`([\s\S]*?)\`\}\s*<\/script>/g)];
if (matches.length !== 2) { console.error('Expected 2 JSON-LD blocks, found ' + matches.length); process.exit(1); }
matches.forEach((m, i) => {
  JSON.parse(m[1]);
  console.log('Block ' + (i + 1) + ' is valid JSON');
});
"
```

Expected: `Block 1 is valid JSON` and `Block 2 is valid JSON`.

- [ ] **Step 4: Start the dev server and verify the meta tags and structured data render**

```bash
BROWSER=none npm start
```

Open the local dev URL, view page source (or inspect `document.title` and `document.querySelectorAll('script[type="application/ld+json"]')` in the browser console), and confirm the new title, description, and two JSON-LD blocks (Person and FAQPage) are present. Stop the dev server once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/components/SEO.js public/index.html
git commit -m "Expand meta tags and structured data (Person + FAQPage) for SEO/AEO"
```

---

### Task 6: Add build-time prerendering and verify the full build

**Files:**
- Create: `scripts/prerender.js`
- Modify: `package.json` (add `puppeteer` devDependency and `postbuild` script)

**Interfaces:**
- Consumes: the built `build/` directory produced by `react-scripts build` (via `npm run build`), and the `homepage` field in `package.json` (`https://BIJODEV.github.io/my-profile`, giving base path `/my-profile`).
- Produces: an overwritten `build/index.html` containing the fully client-rendered HTML (all sections, including the Task 4 FAQ content and Task 5 structured data, baked in as static markup) instead of the pre-render CSR shell.

- [ ] **Step 1: Install Puppeteer as a devDependency**

```bash
cd /Volumes/MyProjects/my-profile
npm install --save-dev puppeteer
```

- [ ] **Step 2: Verify it landed in `devDependencies`, not `dependencies`**

```bash
node -e "const p = require('./package.json'); console.log('dependencies has puppeteer:', 'puppeteer' in p.dependencies); console.log('devDependencies has puppeteer:', 'puppeteer' in p.devDependencies);"
```

Expected: `dependencies has puppeteer: false` and `devDependencies has puppeteer: true`.

- [ ] **Step 3: Create `scripts/prerender.js`**

```javascript
// scripts/prerender.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_PATH = '/my-profile';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 45678;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json'
};

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.startsWith(BASE_PATH)) {
    urlPath = urlPath.slice(BASE_PATH.length);
  }
  if (urlPath === '' || urlPath === '/') {
    urlPath = '/index.html';
  }
  const filePath = path.join(BUILD_DIR, urlPath);
  if (!filePath.startsWith(BUILD_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function main() {
  const server = http.createServer(serveStatic);
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${BASE_PATH}/`, { waitUntil: 'networkidle0' });

  const html = await page.content();
  const outputPath = path.join(BUILD_DIR, 'index.html');
  fs.writeFileSync(outputPath, html);

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  console.log(`Prerendered ${outputPath} (${html.length} bytes).`);
}

main().catch((error) => {
  console.error('Prerendering failed:', error);
  process.exit(1);
});
```

- [ ] **Step 4: Add the `postbuild` script to `package.json`**

Current `scripts` block:

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```

Replace with:

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "postbuild": "node scripts/prerender.js",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```

- [ ] **Step 5: Run a full build and confirm the prerender step executes automatically**

```bash
cd /Volumes/MyProjects/my-profile
npm run build
```

Expected: normal `react-scripts build` output (file sizes, "The build folder is ready to be deployed"), followed by `Prerendered /Volumes/MyProjects/my-profile/build/index.html (N bytes).` from the `postbuild` step. `N` should be substantially larger than the pre-prerender shell (the original CSR `index.html` is roughly 2.3KB; the prerendered version should be well over 20KB given the full page content).

- [ ] **Step 6: Verify the prerendered HTML contains real body content, not just the CSR shell**

```bash
grep -o "Cloud Security Engineer with 10+ years" build/index.html
grep -o "Frequently Asked Questions" build/index.html
grep -o "FlareSight Analytics" build/index.html
```

Expected: each command prints the matched string (confirms About/SEO copy, the new FAQ section, and Projects content are all present in the raw, pre-JS HTML).

- [ ] **Step 7: Serve the build locally (matching the real `/my-profile` subpath) and visually verify**

```bash
mkdir -p /tmp/serve-root/my-profile
rm -rf /tmp/serve-root/my-profile/*
cp -r build/* /tmp/serve-root/my-profile/
npx serve -s /tmp/serve-root -l 5053
```

Open `http://localhost:5053/my-profile/` in a browser and confirm: the favicon shows correctly in the browser tab, the page renders normally (JS hydrates, no console errors), and scrolling down shows the FAQ section. Also open `view-source:http://localhost:5053/my-profile/` (or use `curl http://localhost:5053/my-profile/`) and confirm the raw HTML (not the DevTools-rendered DOM) contains the visible page text. Stop the server (Ctrl+C) and clean up:

```bash
rm -rf /tmp/serve-root
rm -rf build
```

- [ ] **Step 8: Commit**

```bash
git add scripts/prerender.js package.json package-lock.json
git commit -m "Add Puppeteer-based prerendering as a postbuild step"
```
