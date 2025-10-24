// src/components/Hobbies.js
import React from 'react';

const Hobbies = () => {
  const hobbies = ['Chess', 'Badminton', 'Reading', 'Coding', 'Security Research'];
  
  return (
    <section className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Hobbies & Interests</h2>
      <div className="flex flex-wrap gap-3">
        {hobbies.map((hobby, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-600">
            {hobby}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;