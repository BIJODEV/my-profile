// src/components/Experience.js
import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: "Sr. Cloud Security Engineer",
      company: "IBM, Bengaluru",
      period: "Jan 2023 - Present",
      achievements: [
        "Onboarded 70+ applications to Cloudflare from legacy SAG-WebMethods infrastructure, configuring WAF policies at the edge and integrating Grafana dashboards for observability across Kubernetes-hosted services. Resolved 100+ security incidents during onboarding and post-deployment phases, ensuring alignment with PCI-DSS, HIPAA, and SOC 2 compliance standards.",
        "Built a lightweight API using Cloudflare Workers to selectively bypass WAF rules for trusted traffic.",
        "Developed Adaptive Profiling using D1 and KV namespaces to baseline traffic behavior using entropy and scoring, enabling dynamic WAF rule tuning and anomaly detection.",
        "Created CRS Rule Intelligence to extract regex from triggered OWASP CRS rules and correlate them with blocked payloads, improving diagnostics and rule transparency.",
        "Led Cloudflare application configuration migration to IBM CIS, conducted RCAs, and collaborated with vendors, clients, and internal stakeholders to troubleshoot incidents, implement for custom rule creation during security escalations."
      ]
    },
    {
      title: "Cyber Security Engineer III",
      company: "Walmart, Bengaluru",
      period: "Apr 2021 - Jan 2023",
      achievements: [
        "Strengthened bot mitigation on high-traffic GraphQL endpoints during peak sale periods, reducing malicious traffic by 30% using in-house tools and PerimeterX.",
        "Investigated bot patterns and anomalies using Splunk and Akamai, improving detection accuracy and response time.",
        "Tuned F5 ASM policies to reduce false positives and improve rule precision across internal applications.",
        "Built a header-order hash–based detection strategy to isolate sophisticated bots, earning an Excellence Award for innovation in traffic filtering."
      ]
    },
    {
      title: "Sr. Security Analyst",
      company: "Tata Communications Ltd",
      period: "Jan 2020 - Apr 2021",
      achievements: [
        "Managed WAF and Load Balancers (F5 and Imperva) for multiple clients, including government and semi-government organizations, ensuring robust security posture and compliance with PCI-DSS, SOC 2, and WAF-specific standards.",
        "Collaborated with application teams to fine-tune WAF configurations, reduce vulnerabilities, and align with client-specific compliance requirements, including HIPAA and SOC 2.",
        "Led F5 BOX upgrades during the Log4j vulnerability outbreak, implementing rapid workarounds and coordinating with vendors and stakeholders to ensure minimal disruption and maximum protection.",
        "Created and managed LTM policies across diverse environments while onboarding and supporting clients with WAF and Load Balancer deployments (F5 and Imperva), ensuring secure traffic management, tailored rule sets, and promoting best practices through troubleshooting, team education, and advocacy."
      ]
    },
    {
      title: "Analyst",
      company: "Allianz Technology",
      period: "Jan 2018 - Dec 2019",
      achievements: [
        "Administered Imperva WAF across global networks, managing multiple appliances (2530, 4530, 8530) and strategically onboarding domains based on traffic analysis, signature tuning, and exception handling.",
        "Automated performance and capacity reporting using PowerShell to support procurement decisions and optimize resource allocation across WAF infrastructure.",
        "Completed onsite Imperva training in Germany, deepening expertise in WAF architecture, policy customization, and global deployment best practices."
      ]
    },
    {
      title: "Project Engineer",
      company: "Wipro Technologies",
      period: "Jun 2015 - Jan 2018",
      achievements: [
        "Managed Fortigate firewalls, QRadar SIEM, and Imperva WAF across government bank data centers, leading onboarding and troubleshooting efforts and successfully participating in the RBI Mock Drill conducted by IDRBT.",
        "Handled security operations for an insurance client, including F5 ASM, Load Balancer, and Checkpoint Firewall configurations, along with McAfee Antivirus DAT policy deployments to ensure compliance and threat mitigation.",
        "Contributed to a User Access Management (UAM) project involving Active Directory, AS400, Mainframe, and SAP systems, streamlining access controls and compliance across platforms.",
        "Automated user access provisioning and reporting using PowerShell scripting, improving operational efficiency and reducing manual overhead in the UAM environment."
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
                <p className="text-gray-400 mb-2">{exp.company}</p> {/* Reduced margin */}
                <ul className="list-disc list-inside text-gray-300 space-y-1"> {/* Reduced spacing between bullets */}
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="text-sm leading-relaxed">
                      {achievement}
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