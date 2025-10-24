// src/components/Skills.js
import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Security & WAF",
      color: "blue",
      skills: ['Cloudflare', 'Akamai', 'F5 ASM', 'Imperva', 'WAF Architecture', 'Bot Mitigation', 'Edge Security', 'DDoS Protection']
    },
    {
      title: "Full-Stack Development",
      color: "teal",
      skills: ['React', 'JavaScript', 'Python', 'Node.js', 'REST APIs', 'Supabase', 'Cloudinary', 'Razorpay']
    },
    {
      title: "Network & Infrastructure",
      color: "purple",
      skills: ['F5 Load Balancers', 'Fortigate Firewalls', 'Checkpoint', 'Network Protocols', 'Kubernetes', 'Docker', 'CI/CD']
    },
    {
      title: "Security Operations",
      color: "rose",
      skills: ['Splunk', 'QRadar SIEM', 'SOC Analysis', 'Incident Response', 'Threat Hunting', 'Vulnerability Management']
    },
    {
      title: "Identity & Access Management",
      color: "orange",
      skills: ['Active Directory', 'AS400', 'SAP Systems', 'User Provisioning', 'Role-Based Access', 'Privileged Access']
    },
    {
      title: "Compliance & Governance",
      color: "indigo",
      skills: ['PCI DSS', 'SOC 2', 'HIPAA', 'Security Audits', 'Risk Assessment', 'Policy Development']
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-900 text-blue-200',
      teal: 'bg-teal-900 text-teal-200',
      purple: 'bg-purple-900 text-purple-200',
      rose: 'bg-rose-900 text-rose-200',
      orange: 'bg-orange-900 text-orange-200',
      indigo: 'bg-indigo-900 text-indigo-200'
    };
    return colors[color] || 'bg-gray-700 text-gray-200';
  };

  const getTitleColor = (color) => {
    const colors = {
      blue: 'text-blue-400',
      teal: 'text-teal-400',
      purple: 'text-purple-400',
      rose: 'text-rose-400',
      orange: 'text-orange-400',
      indigo: 'text-indigo-400'
    };
    return colors[color] || 'text-gray-400';
  };

  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Technical Expertise</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className={`font-semibold ${getTitleColor(category.color)} mb-3`}>
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex} 
                  className={`${getColorClasses(category.color)} px-3 py-1 rounded-full text-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;