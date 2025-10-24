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
        tags: ["Data Visualization", "React", "D3.js", "Cloudflare"],
        borderColor: "border-green-500"
      }
    ],
    securityTools: [
      {
        title: "Adaptive Profiling with Cloudflare Workers",
        year: "2025",
        description: "Built a dynamic profiling system inspired by Imperva to baseline traffic using entropy and scoring. Enabled real-time WAF rule tuning based on behavioral patterns, improving anomaly detection and reducing false positives.",
        githubUrl: "#",
        liveUrl: "#", 
        mediumUrl: "#",
        tags: ["Cloudflare Workers", "D1 Database", "KV Namespaces", "WAF Tuning", "Behavioral Analysis"],
        borderColor: "border-purple-500"
      },
      {
        title: "CRS Rule Intelligence",
        year: "2025", 
        description: "Built a tool to extract regex patterns from OWASP CRS rules and correlate them with blocked request payloads. Enabled deeper analysis of triggered signatures, improving visibility to 40% into rule behavior and enhancing WAF diagnostics.",
        githubUrl: "#",
        liveUrl: "#",
        mediumUrl: "#",
        tags: ["OWASP CRS", "Regex Analysis", "WAF Diagnostics", "Cloudflare", "Security Analytics"],
        borderColor: "border-orange-500"
      }
    ],
    fullstack: [
      {
        title: "KnowYourChurch",
        description: "Comprehensive church management platform with user authentication, media gallery, payments, and admin dashboard.",
        tags: ["React", "Node.js", "Supabase", "Cloudinary", "Razorpay", "OAuth"],
        status: "In Development",
        borderColor: "border-purple-500"
      },
      {
        title: "Bible Quiz App",
        description: "Interactive quiz application for biblical knowledge testing with scoring system and progress tracking.",
        url: "https://bijodev.github.io/bible-quiz-app/",
        tags: ["React", "JavaScript", "Local Storage"],
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <a href={project.url} className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Live Demo
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
        <span className="text-blue-400 text-sm bg-blue-900 px-2 py-1 rounded">{project.year}</span>
      </div>
      <p className="text-gray-300 text-sm mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex space-x-3 pt-2 border-t border-gray-600">
        <a href={project.githubUrl} className="text-blue-400 hover:text-blue-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
        <a href={project.liveUrl} className="text-green-400 hover:text-green-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Live
        </a>
        <a href={project.mediumUrl} className="text-orange-400 hover:text-orange-300 flex items-center text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Medium
        </a>
      </div>
    </div>
  );
};

export default Projects;