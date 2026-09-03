// src/components/Projects.js
import React from 'react';

const Projects = () => {
  const projects = {
    production: [
      {
        title: "Adaptive Profiler Demo",
        description: "Real-time traffic profiling system using Cloudflare Workers, D1 & KV namespaces. Demonstrates behavioral analysis and dynamic WAF rule tuning.",
        url: "https://bijodev.github.io/Adaptive-Profiler-Demo/",
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "React"],
        borderColor: "border-blue-500"
      },
      {
        title: "Cloudflare Onboarding Visualizer",
        description: "Interactive visualization tool for application migration to Cloudflare. Shows traffic flow, security layers, and integration points.",
        url: "https://bijodev.github.io/cloudflare-onboarding-visualizer/",
        tags: ["Data Visualization", "React", "Reactflow", "Cloudflare"],
        borderColor: "border-green-500"
      },
      {
        title: "System Design Master",
        description: "Interactive platform for mastering system design interviews. Features real-time visualization labs (Load Balancing, Caching, Consistent Hashing), theory guides, and interview prep resources.",
        url: "https://sysdesignmaster.web.app",
        tags: ["React", "Firebase", "Visualization Lab", "System Design", "Education"],
        borderColor: "border-indigo-500"
      },
      {
        title: "OriginError",
        description: "Free diagnostic toolkit for Cloudflare — domain/DNS/TLS scanning, WAF rule decoding, and migration readiness checks.",
        url: "https://originerror.com",
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "Netlify Functions", "Node.js", "Tailwind CSS"],
        borderColor: "border-teal-500"
      },
    ],
    securityTools: [
      {
        title: "FlareSight Analytics",
        description: "Enterprise edge intelligence and telemetry command center giving security teams unified, real-time visibility across multi-provider WAF/CDN traffic (Cloudflare and IBM CIS) in a single executive dashboard.",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/flaresight-executive-briefing.html`,
        tags: ["React 19", "Vite", "Cloudflare", "IBM CIS", "Edge Telemetry"],
        borderColor: "border-red-500"
      },
      {
        title: "Maintenance Control Panel",
        description: "A one-click, self-scheduling, self-expiring, fully audited replacement for hand-editing Cloudflare Snippet Rules to take a storefront offline for maintenance.",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/maintenance-panel-overview.html`,
        architectureUrl: `${process.env.PUBLIC_URL}/project-details/maintenance-panel-architecture-flow.html`,
        tags: ["Cloudflare Snippet Rules", "Automation", "Audit Logging", "Self-Service Ops"],
        borderColor: "border-amber-500"
      },
      {
        title: "Adaptive Profiling with Cloudflare Workers",
        // year: "2025",
        description: "An architecturally sophisticated edge engine built on Cloudflare Workers, D1, and KV. It leverages a three-tier distributed model (Data Plane, High-Speed Buffer, and Asynchronous Reconciler) to perform low-latency traffic baselining and self-healing WAF rule adjustment.",
        githubUrl: "https://github.com/BIJODEV/Cloudflare-Dynamic-Profiling",
        liveUrl: "https://github.com/BIJODEV/Adaptive-Profiler-Demo",
        mediumUrl: "https://medium.com/@bijodev1/cloudflare-workers-kv-d1-and-a-curious-idea-that-became-adaptive-profiling-49d1dbbf0534",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/adaptive-profiling-overview.html`,
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "WAF Tuning", "Behavioral Analysis"],
        borderColor: "border-purple-500"
      },
      {
        title: "CRS Logic Intelligence: Signature-to-Payload Correlation",
        // year: "2025",
        description: "High-impact diagnostic tool designed to deconstruct OWASP CRS regex logic and correlate it with blocked payloads. Significantly improves Developer Experience (DevEx) by decreasing Mean Time to Understand (MTTU) for complex WAF events",
        githubUrl: "https://github.com/BIJODEV/crs-rule-lookup-project",
        liveUrl: "https://crs-rule-lookup.onrender.com/",
        mediumUrl: "https://medium.com/@bijodev1/diagnosing-cloudflare-security-events-with-crs-rule-intelligence-a-developers-journey-e61b583b56b0",
        overviewUrl: `${process.env.PUBLIC_URL}/project-details/crs-rule-lookup-overview.html`,
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      }
    ],
    fullstack: [
      {
        title: "KnowYourChurch",
        description: "Comprehensive church management platform with user authentication, media gallery, payments, and admin dashboard.",
        tags: ["React", "Node.js", "Supabase", "Cloudinary", "Razorpay", "OAuth"],
        url: "https://knowurchurch.com/",
        borderColor: "border-purple-500"
      },
      {
        title: "Bible Quiz App",
        description: "Interactive quiz application for biblical knowledge testing with scoring system and progress tracking.",
        url: "https://bibleqz.web.app",
        tags: ["React", "JavaScript", "Firebase"],
        borderColor: "border-yellow-500"
      }
    ]
  };

  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Projects & Applications</h2>
      
      <div className="space-y-8">
        {/* Production Applications */}
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Production Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.production.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>

        {/* Security Tools - Horizontal Scroll */}
        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Security Tools & Innovations</h3>
          <div >
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {projects.securityTools.map((project, index) => (
                <SecurityToolCard key={index} project={project} />
              ))}
            </div>
            {/* Scroll indicator */}
            {/* <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Full-Stack Applications */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-4">Full-Stack Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.fullstack.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Project Card Component for regular projects
const ProjectCard = ({ project }) => {
  return (
    <div className={`bg-gray-700 rounded-lg p-4 border-l-4 ${project.borderColor} h-full flex flex-col`}>
      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
      <p className="text-gray-300 my-2 text-sm flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex space-x-4 mt-3">
        {project.url ? (
          <a href={project.url} target="_blank" className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Live
          </a>
        ) : (
          <span className="text-yellow-400 text-sm">🚀 {project.status}</span>
        )}
      </div>
    </div>
  );
};

// Security Tool Card Component for horizontal scroll
const SecurityToolCard = ({ project }) => {
  return (
    <div className={`bg-gray-700 rounded-lg p-4 border-l-4 ${project.borderColor} min-w-[300px] max-w-md flex-shrink-0`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
        {/* <span className="text-blue-400 text-sm bg-blue-900 px-2 py-1 rounded">{project.year}</span> */}
      </div>
      <p className="text-gray-300 text-sm mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-600">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Live
          </a>
        )}
        {project.mediumUrl && (
          <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Medium
          </a>
        )}
        {project.overviewUrl && (
          <a href={project.overviewUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Overview
          </a>
        )}
        {project.architectureUrl && (
          <a href={project.architectureUrl} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 1 1 0 100-2A4 4 0 002 5v10a2 2 0 002 2h1a1 1 0 100-2H4V5zm12-2a1 1 0 100 2 2 2 0 012 2v10a2 2 0 01-2 2h-1a1 1 0 100 2h1a4 4 0 004-4V5a4 4 0 00-4-4z" />
            </svg>
            Architecture
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects;