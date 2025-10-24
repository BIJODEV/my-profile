// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  return (
    <Helmet>
      <html lang="en" />
      
      {/* Primary Meta Tags */}
      <title>Bijo Dev - Cloud Security Engineer & Full-Stack Developer</title>
      <meta name="title" content="Bijo Dev - Cloud Security Engineer & Full-Stack Developer" />
      <meta name="description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development. Specialized in Cloudflare, Akamai, F5 ASM, and React applications." />
      <meta name="keywords" content="cloud security, WAF, cloudflare, react developer, full-stack, web application firewall, bot mitigation, cybersecurity" />
      <meta name="author" content="Bijo Dev" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bijodev.github.io/my-profile/" />
      <meta property="og:title" content="Bijo Dev - Cloud Security Engineer & Full-Stack Developer" />
      <meta property="og:description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development. Specialized in Cloudflare, Akamai, F5 ASM, and React applications." />
      <meta property="og:image" content="https://bijodev.github.io/my-profile/og-image.png" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://bijodev.github.io/my-profile/" />
      <meta property="twitter:title" content="Bijo Dev - Cloud Security Engineer & Full-Stack Developer" />
      <meta property="twitter:description" content="10+ years experience in cloud security, WAF deployment, bot mitigation, and full-stack development." />
      <meta property="twitter:image" content="https://bijodev.github.io/my-profile/og-image.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://bijodev.github.io/my-profile/" />
    </Helmet>
  );
};

export default SEO;