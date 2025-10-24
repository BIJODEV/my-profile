// src/components/Certifications.js
import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      name: "F5 Advanced Web Application Firewall (ASM)",
      description: "Certified in advanced WAF deployment and tuning"
    },
    {
      name: "Certified Ethical Hacker (CEH)",
      description: "Credentialed in penetration testing and vulnerability assessment"
    }
  ];

  const awards = [
    {
      name: "Excellence Award at Walmart",
      description: "Recognized for bot traffic isolation and improved security metrics"
    },
    {
      name: "Automation Achievement",
      description: "Built PowerShell scripts to automate Active Directory user creation"
    }
  ];

  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Certifications & Awards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-4">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="text-white font-medium">{cert.name}</span>
                  <p className="text-gray-300 text-sm">{cert.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Awards & Recognition</h3>
          <ul className="space-y-4">
            {awards.map((award, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <span className="text-white font-medium">{award.name}</span>
                  <p className="text-gray-300 text-sm">{award.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Certifications;