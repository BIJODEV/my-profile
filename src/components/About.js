// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Professional Profile</h2>
      <div className="space-y-4 text-gray-300">
        <p>
          <strong className="text-white">Cloud Security Engineer & Full-Stack Developer</strong> with 10+ years of comprehensive experience spanning security architecture, application development, and infrastructure management.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold text-blue-400 mb-2">Security Specialization</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Edge protection with Cloudflare, Akamai, F5 ASM</li>
              <li>Bot mitigation & threat intelligence</li>
              <li>WAF policy development & tuning</li>
              <li>Security compliance (PCI DSS, HIPAA, SOC 2)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Development Expertise</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Full-stack application development</li>
              <li>React-based frontend solutions</li>
              <li>Backend APIs & database design</li>
              <li>Cloud-native architecture</li>
            </ul>
          </div>
        </div>
        
        <p className="pt-2">
          Proven ability to bridge security and development domains, creating robust, secure applications while maintaining optimal user experience and compliance standards.
        </p>
      </div>
    </section>
  );
};

export default About;