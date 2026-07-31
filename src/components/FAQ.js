// src/components/FAQ.js
import React from 'react';

const faqs = [
  {
    question: "Who is Bijo Dev?",
    answer: "Bijo Dev is a Cloud Security Engineer with 12+ years of experience in security architecture, Web Application Firewall deployment, and full-stack development, currently working as a Senior Cloud Security Engineer at IBM in Bengaluru, India."
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
