// src/components/Experience.js
import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Sr. Cloud Security Engineer",
      company: "IBM, Bengaluru",
      period: "Jan 2023 - Present",
      achievements: [
        "Awarded the IBM Outstanding Technical Achievement Award (OTAA) for developing CRS Rule Intelligence, a diagnostic engine that correlates OWASP signatures with blocked payloads, improving WAF transparency and decreasing MTTU for global developer teams.",
        "Recognized by the IBM Innovation Center for the research and publication of Adaptive Profiling, a distributed edge-learning system that utilizes entropy-based heuristics to reduce false-positive WAF blocks by 25%.",
        {
          text: "Architected a suite of Interactive SPAs (React/React Flow) to transform static security documentation into high-fidelity visual roadmaps:",
          subItems: [
            "FlareSight Analytics: An enterprise edge-intelligence dashboard unifying real-time WAF/CDN telemetry across Cloudflare and IBM CIS for security leadership.",
            "Adaptive Profiling Blueprint: A self-explaining architectural demo used to secure internal buy-in for custom edge-security tooling.",
            "Cloudflare Onboarding Engine: A ”Visual Journey” tool guiding stakeholders through multi-phase infrastructure migrations for 90+ applications.",
            "Global Resiliency & DR Plan: An interactive failover roadmap developed post-2025 Cloudflare outages, mapping current strategy vs. optimized DR flows to mitigate future downtime."
          ]
        },
        "Scaled edge protection for mission-critical enterprise traffic, ensuring 100% compliance with PCI-DSS, HIPAA, and SOC 2 standards through automated Cloudflare/CIS orchestrations."
      ]
    },
    {
      title: "Cyber Security Engineer III",
      company: "Walmart, Bengaluru",
      period: "Apr 2021 - Jan 2023",
      achievements: [
        "Mitigated 30% of malicious bot traffic on high-volume GraphQL endpoints during peak retail sales by deploying sophisticated header-order hash detection and PerimeterX integration.",
        "Awarded the ”Excellence Award” for innovating a custom traffic-filtering strategy that isolated advanced automated threats without impacting legitimate user conversion rates.",
        "Improved detection accuracy by correlating bot patterns across Splunk and Akamai, leading to a measurable reduction in account takeover (ATO) attempts."
      ]
    },
    {
      title: "Sr. Security Analyst",
      company: "Tata Communications Ltd",
      period: "Jan 2020 - Apr 2021",
      achievements: [
        "Architected rapid mitigation strategies for the Log4j vulnerability by leading F5 BOX upgrades and implementing custom WAF workarounds, ensuring zero exploitation.",
        "Secured government infrastructure by deploying and fine-tuning F5 and Imperva WAFs, maintaining 100% adherence to PCI-DSS, SOC 2, and HIPAA standards.",
        "Optimized traffic management efficiency by designing complex LTM policies and tailored rule sets for multi-client onboarding.",
        "Established a culture of ”team education,” leading troubleshooting workshops for application teams to promote secure coding practices and reduce security debt."
      ]
    },
    {
      title: "Analyst",
      company: "Allianz Technology",
      period: "Jan 2018 - Dec 2019",
      achievements: [
        "Orchestrated global WAF administration for Imperva appliances (2530, 4530, 8530), strategically onboarding domains through advanced traffic analysis and signature tuning.",
        "Eliminated manual overhead in procurement cycles by automating performance and capacity reporting using Power-Shell, providing data-driven insights for global resource allocation.",
        "Applied global best practices in WAF architecture following intensive on-site training in Germany, specializing in highavailability policy customization."
      ]
    },
    {
      title: "Project Engineer",
      company: "Wipro Technologies",
      period: "Jun 2015 - Jan 2018",
      achievements: [
        "Secured high-compliance government banking data centers by managing Fortigate firewalls and QRadar SIEM, and successfully leading security responses during RBI Mock Drills.",
        "Automated identity and access management (IAM) by developing PowerShell scripts for user provisioning across Active Directory and SAP, improving operational efficiency by reducing manual touchpoints.",
        "Standardized endpoint security compliance for insurance clients by automating McAfee Antivirus DAT policy deployments alongside F5 ASM and Checkpoint firewall configurations."
      ]
    }
  ];

  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Work Experience</h2>
      
      {/* Container with increased height to show IBM + Walmart */}
      <div className="relative">
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2">
          <div className="space-y-6"> {/* Reduced spacing between companies */}
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                  <span className="text-blue-400">{exp.period}</span>
                </div>
                <p className="text-blue-400 mb-2">{exp.company}</p> {/* Reduced margin */}
                <ul className="list-disc list-inside text-gray-300 space-y-1"> {/* Reduced spacing between bullets */}
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="text-sm leading-relaxed">
                      {typeof achievement === 'string' ? achievement : achievement.text}
                      {typeof achievement === 'object' && achievement.subItems && (
                        <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                          {achievement.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="text-sm leading-relaxed text-gray-400">
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient fade effect - only show when scrolled */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
      </div>

      {/* Enhanced scroll hint */}
      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
          {/* <span>{experiences.length} companies</span> */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>Scroll for more</span>
        </p>
      </div>
    </section>
  );
};

export default Experience;