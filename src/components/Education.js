// src/components/Education.js
import React from 'react';

const Education = () => {
  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Education</h2>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="font-semibold text-white text-lg">Master of Computer Application (MCA)</h3>
        <p className="text-gray-400">Karunya University</p>
        <p className="text-gray-400">May 2015</p>
        <p className="text-gray-300 mt-2">CGPA: 8.6/10 | Ranked 3rd in Department</p>
        <p className="text-gray-300 mt-2">
          Focused on Data Structures and Algorithms, Operating Systems, Computer Networks, 
          Systems Programming, Network Security, Micro Processors, and Cloud Architecture.
        </p>
      </div>
    </section>
  );
};

export default Education;