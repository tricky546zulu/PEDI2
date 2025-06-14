import React from 'react';
import { Link } from 'react-router-dom';
import PALSAlgorithm from '../components/PALSAlgorithm';
import { useAppContext } from '../contexts/AppContext';
import algorithms from '../data/algorithms';

function AlgorithmsPage() {
  const { darkMode } = useAppContext();
  
  // Group algorithms by category
  const algorithmsByCategory = algorithms.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  }, {});

  // Get the category names and sort them
  const categories = Object.keys(algorithmsByCategory).sort();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">PALS Algorithms</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Evidence-based algorithms for pediatric emergency care based on the latest AHA guidelines.
        </p>
      </div>

      {/* Category tabs */}
      <div className="relative">
        <div className="overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <a
                key={category}
                href={`#${category.replace(' ', '-')}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
                  ${darkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Algorithm sections by category */}
      {categories.map(category => (
        <section key={category} id={category.replace(' ', '-')} className="scroll-mt-20">
          <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {algorithmsByCategory[category].map(algorithm => (
              <Link key={algorithm.id} to={`/algorithm/${algorithm.id}`}>
                <PALSAlgorithm algorithm={algorithm} />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Algorithm details information */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} mt-6`}>
        <h3 className="font-medium mb-2">About PALS Algorithms</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          These algorithms are based on the American Heart Association's Pediatric Advanced Life Support (PALS) guidelines. 
          They provide a systematic approach to pediatric assessment and treatment during emergencies.
        </p>
        <div className="mt-3 text-sm text-slate-500 dark:text-slate-500">
          Last updated: April 2023
        </div>
      </div>
    </div>
  );
}

export default AlgorithmsPage;
