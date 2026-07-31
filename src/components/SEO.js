// src/components/SEO.js
import React from 'react';

const SEO = () => {
  const title = "Cloudflare Security Engineer | Web Application Firewall (WAF) & Security Engineering Expert | Bijo Dev";
  const description = "Bijo Dev is a Cloud Security Engineer with 12+ years of experience in security engineering, Cloudflare, and Web Application Firewall (WAF) deployment across Cloudflare, Akamai, F5 ASM, and Imperva. Specializes in bot mitigation, DDoS protection, and full-stack development.";
  const keywords = "Cloudflare, Cloudflare Expert, Security Engineering, Security Engineer, Web Application Firewall, WAF, WAF Expert, Cloud Security Engineer, Akamai, F5 ASM, Imperva, Bot Mitigation, DDoS Protection, OWASP Top 10, WAF Tuning, Cybersecurity Consultant, WAF Deployment, Security Hardening";

  return (
    <>
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
            "12+ Years Experience"
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
                "text": "Bijo Dev is a Cloud Security Engineer with 12+ years of experience in security architecture, Web Application Firewall deployment, and full-stack development, currently working as a Senior Cloud Security Engineer at IBM in Bengaluru, India."
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
    </>
  );
};

export default SEO;
