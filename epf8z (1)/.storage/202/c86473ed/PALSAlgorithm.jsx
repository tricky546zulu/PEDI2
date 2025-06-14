import React from 'react';
import PropTypes from 'prop-types';

function PALSAlgorithm({ algorithm }) {
  // Get category styles for color theming
  const getCategoryStyles = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20';
      case 'bradycardia':
        return 'border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20';
      case 'tachycardia':
        return 'border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20';
      case 'post resuscitation':
        return 'border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20';
      case 'shock':
        return 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80';
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${getCategoryStyles()}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium mb-1">{algorithm.title}</h2>
            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 bg-opacity-60">
              {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
            </span>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-full p-1.5 text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 line-clamp-2">
          {algorithm.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {algorithm.tags && algorithm.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 p-3 text-sm text-slate-600 dark:text-slate-400 flex justify-between items-center">
        <span>
          {algorithm.steps.length} steps
        </span>
        <span>
          {algorithm.lastUpdated && new Date(algorithm.lastUpdated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

PALSAlgorithm.propTypes = {
  algorithm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    steps: PropTypes.array.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    lastUpdated: PropTypes.string
  }).isRequired
};

export default PALSAlgorithm;
