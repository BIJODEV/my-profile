// src/components/FAQ.js
import React, { useState } from 'react';

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
  const [sectionOpen, setSectionOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <button
        type="button"
        onClick={() => setSectionOpen(!sectionOpen)}
        aria-expanded={sectionOpen}
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-white transition-transform duration-200 ${sectionOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* The entire question list stays in the DOM at all times (for search/AI crawlers and
          structured-data parity) and is only visually collapsed via CSS, never conditionally rendered. */}
      <div className={`grid transition-all duration-200 ease-in-out ${sectionOpen ? 'grid-rows-[1fr] mt-6' : 'grid-rows-[0fr] mt-0'}`}>
        <div className="overflow-hidden">
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-3 text-left px-4 py-3 text-blue-400 font-semibold hover:text-blue-300"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="text-gray-300 text-sm px-4 pb-3">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
