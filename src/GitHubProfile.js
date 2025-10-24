import React from 'react';

const GitHubProfile = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header Section */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Bijo Dev</h1>
              <p className="text-lg text-gray-400 mt-1">Cloud Security Engineer</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <a href="mailto:bijodev1@gmail.com" className="flex items-center text-blue-400 hover:text-blue-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                bijodev1@gmail.com
              </a>
              <a href="tel:+918921873715" className="flex items-center text-blue-400 hover:text-blue-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 8921873715
              </a>
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <a href="https://github.com/BIJODEV" className="flex items-center text-blue-400 hover:text-blue-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              github.com/BIJODEV
            </a>
            <a href="https://linkedin.com/in/bijo-dev-84a618b7" className="flex items-center text-blue-400 hover:text-blue-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
              linkedin.com/in/bijo-dev-84a618b7
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Professional Summary</h2>
              <p className="text-gray-300">
                Cloud Security Engineer with 10+ years of experience in WAF deployment, bot mitigation, and web application security
                across enterprise environments. Specialized in edge protection using Cloudflare, Akamai, F5 ASM, and Imperva. Known
                for applying logical, user-focused thinking to build tools like Adaptive Profiling and CRS Rule Intelligence, enhancing threat
                visibility and diagnostics. Skilled in automation with Python, PowerShell, and JavaScript, with a proven track record of
                reducing vulnerabilities and improving incident response.
              </p>
            </section>

            {/* Work Experience */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Work Experience</h2>
              
              <div className="space-y-6">
                {/* IBM */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h3 className="text-lg font-semibold text-white">Sr. Cloud Security Engineer</h3>
                    <span className="text-blue-400">Jan 2023 - Present</span>
                  </div>
                  <p className="text-blue-400 mb-2">IBM, Bengaluru</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Onboarded 70+ applications to Cloudflare from legacy SAG-WebMethods infrastructure, configuring WAF policies at the edge and integrating Grafana dashboards for observability across Kubernetes-hosted services.</li>
                    <li>Built a lightweight API using Cloudflare Workers to selectively bypass WAF rules for trusted traffic.</li>
                    <li>Resolved 100+ security incidents during onboarding and post-deployment phases, ensuring alignment with PCI-DSS, HIPAA, and
                     SOC 2 compliance standards</li>
                    <li>Developed Adaptive Profiling using D1 and KV namespaces to baseline traffic behavior using entropy and scoring, enabling dynamic WAF rule tuning and anomaly detection.</li>
                    <li>Created CRS Rule Intelligence to extract regex from triggered OWASP CRS rules and correlate them with blocked payloads, improving diagnostics and rule transparency.</li>
                    <li>Led Cloudflare application configuration migration to IBM CIS, conducted RCAs, and collaborated with vendors, clients,
                      and internal stakeholders to troubleshoot incidents, implement for custom rule creation during security escalations.</li>
                  </ul>
                </div>

                {/* Walmart */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h3 className="text-lg font-semibold text-white">Cyber Security Engineer III</h3>
                    <span className="text-blue-400">Apr 2021 - Jan 2023</span>
                  </div>
                  <p className="text-blue-400 mb-2">Walmart, Bengaluru</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Strengthened bot mitigation on high-traffic GraphQL endpoints during peak sale periods, reducing malicious traffic by 30% using in-house tools and PerimeterX.</li>
                    <li>Investigated bot patterns and anomalies using Splunk and Akamai, improving detection accuracy and response time.</li>
                    <li>Tuned F5 ASM policies to reduce false positives and improve rule precision across internal applications.</li>
                    <li>Built a header-order hash–based detection strategy to isolate sophisticated bots, earning an Excellence Award for innovation in traffic filtering.</li>
                  </ul>
                </div>

                {/* Tata Communications */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h3 className="text-lg font-semibold text-white">Sr. Security Analyst</h3>
                    <span className="text-blue-400">Jan 2020 - Apr 2021</span>
                  </div>
                  <p className="text-blue-400 mb-2">Tata Communications Ltd</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Managed WAF and Load Balancers (F5 and Imperva) for multiple clients, including government and semi-government organizations.</li>
                    <li>Led F5 BOX upgrades during the Log4j vulnerability outbreak, implementing rapid workarounds and coordinating with vendors.</li>
                    <li>Created and managed LTM policies across diverse environments while onboarding and supporting clients with WAF and Load Balancer deployments.</li>
                  </ul>
                </div>

                {/* Allianz Technology */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h3 className="text-lg font-semibold text-white">Analyst</h3>
                    <span className="text-blue-400">Jan 2018 - Dec 2019</span>
                  </div>
                  <p className="text-blue-400 mb-2">Allianz Technology</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Administered Imperva WAF across global networks, managing multiple appliances (2530, 4530, 8530).</li>
                    <li>Automated performance and capacity reporting using PowerShell to support procurement decisions.</li>
                    <li>Completed onsite Imperva training in Germany, deepening expertise in WAF architecture and policy customization.</li>
                  </ul>
                </div>

                {/* Wipro Technologies */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h3 className="text-lg font-semibold text-white">Project Engineer</h3>
                    <span className="text-blue-400">Jun 2015 - Jan 2018</span>
                  </div>
                  <p className="text-blue-400 mb-2">Wipro Technologies</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Managed Fortigate firewalls, QRadar SIEM, and Imperva WAF across government bank data centers.</li>
                    <li>Handled security operations for an insurance client, including F5 ASM, Load Balancer, and Checkpoint Firewall configurations.</li>
                    <li>Automated user access provisioning and reporting using PowerShell scripting, improving operational efficiency.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Work */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Project Work</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-700 rounded p-4">
                  <h3 className="text-lg font-semibold text-white">Adaptive Profiling with Cloudflare Workers, D1 & KV Namespaces (2025)</h3>
                  <p className="text-gray-300 my-2">
                    Built a dynamic profiling system inspired by Imperva to baseline traffic using entropy and scoring. Enabled real-time WAF rule tuning based on behavioral patterns, improving anomaly detection and reducing false positives.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://bijodev.github.io/Adaptive-Profiler-Demo/" className="text-blue-400 hover:text-blue-300 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Medium
                    </a>
                  </div>
                </div>

                <div className="border border-gray-700 rounded p-4">
                  <h3 className="text-lg font-semibold text-white">CRS Rule Intelligence for Diagnosing Cloudflare Security Events (2025)</h3>
                  <p className="text-gray-300 my-2">
                    Built a tool to extract regex patterns from OWASP CRS rules and correlate them with blocked request payloads. Enabled deeper analysis of triggered signatures, improving visibility to 40% into rule behavior and enhancing WAF diagnostics.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://crs-rule-lookup.onrender.com/" className="text-blue-400 hover:text-blue-300 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      GitHub
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Medium
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-300 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'Python', 'PowerShell', 'SQL'].map(skill => (
                      <span key={skill} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-300 mb-2">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Cloudflare', 'Workers', 'KV Namespaces', 'D1 Databases', 'Serverless Architecture', 
                      'F5 ASM', 'Imperva', 'Akamai', 'Kubernetes', 'Grafana', 'Splunk', 'QRadar', 
                      'Checkpoint', 'Fortigate', 'Active Directory'
                    ].map(tech => (
                      <span key={tech} className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Certifications</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">F5 Advanced WAF</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Certified Ethical Hacker (CEH)</span>
                </li>
              </ul>
            </section>

            {/* Awards */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Awards</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-300">Excellence Award at Walmart: Recognized for bot traffic isolation and improved security metrics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-300">Automation Achievement: Built PowerShell scripts to automate Active Directory user creation</span>
                </li>
              </ul>
            </section>

            {/* Education */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Education</h2>
              <div>
                <h3 className="font-semibold text-white">Master of Computer Application (MCA)</h3>
                <p className="text-gray-400">Karunya University</p>
                <p className="text-gray-400">May 2015</p>
                <p className="text-gray-300 mt-2">CGPA: 8.6/10 | Ranked 3rd in Department</p>
                <p className="text-gray-300 mt-2">
                  Focused on Data Structures and Algorithms, Operating Systems, Computer Networks, 
                  Systems Programming, Network Security, Micro Processors, and Cloud Architecture.
                </p>
              </div>
            </section>

            {/* Hobbies */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Hobbies</h2>
              <div className="flex flex-wrap gap-2">
                {['Chess', 'Badminton', 'Reading'].map(hobby => (
                  <span key={hobby} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Bijo Dev. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GitHubProfile;