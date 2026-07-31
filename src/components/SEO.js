// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const title = "WAF Security Expert | Cloudflare, Akamai, F5, Imperva Specialist | Bijo Dev";
  const description = "Senior WAF Security Consultant & Cloud Security Engineer specializing in Cloudflare, Akamai, F5 ASM, and Imperva Web Application Firewall deployment, configuration, and bot mitigation. 10+ years experience in cybersecurity and full-stack development.";
  const keywords = "WAF Expert, WAF Security Consultant, Cloudflare Expert, Akamai Specialist, F5 ASM Consultant, Imperva WAF, Web Application Firewall, Cloud Security Engineer, Bot Mitigation, DDoS Protection, OWASP Top 10, WAF Tuning, Cloudflare Professional, Akamai Professional, F5 Security, Imperva Security, Cybersecurity Consultant, WAF Deployment, Security Hardening";

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
      <meta property="og:site_name" content="Bijo Dev - WAF Security Expert" />
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
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Bijo Dev",
          "url": "https://bijodev.github.io/my-profile/",
          "jobTitle": "WAF Security Consultant & Cloud Security Engineer",
          "description": "${description}",
          "knowsAbout": [
            "Web Application Firewall",
            "Cloudflare",
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

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1a202c" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default SEO;