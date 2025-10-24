// src/App.js
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Hobbies from './components/Hobbies';
import SEO from './components/SEO';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <SEO />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <About />
            <Experience />
            <Projects />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <Skills />
            <Certifications />
            <Education />
            <Hobbies />
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
}

export default App;