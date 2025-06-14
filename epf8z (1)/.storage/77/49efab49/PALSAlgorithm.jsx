import React from 'react';
import { Link } from 'react-router-dom';

function PALSAlgorithm({ algorithm }) {
  if (!algorithm) return null;

  // Color scheme based on algorithm category
  const getCategoryColor = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900';
      case 'bradycardia':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900';
      case 'tachycardia':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900';
      case 'post resuscitation':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900';
    }
  };

  // Badge color for category
  const getCategoryBadgeColor = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'bradycardia':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'tachycardia':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'post resuscitation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm ${getCategoryColor()}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{algorithm.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getCategoryBadgeColor()}`}>
                {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
              </span>
              {algorithm.patientType && (
                <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-slate-700 dark:text-slate-300">
                  {algorithm.patientType}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/algorithm/${algorithm.id}`}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full dark:text-blue-400 dark:hover:bg-blue-900/30"
            aria-label="View algorithm details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Preview of first 3 steps */}
        {algorithm.steps && algorithm.steps.length > 0 && (
          <div className="mt-3">
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              {algorithm.steps.slice(0, 3).map((step, index) => (
                <li key={index} className="flex items-baseline">
                  <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs mr-2 dark:bg-blue-900 dark:text-blue-300">
                    {index + 1}
                  </div>
                  <span>{step.text}</span>
                </li>
              ))}
              {algorithm.steps.length > 3 && (
                <li className="text-blue-600 dark:text-blue-400 text-sm mt-1 pl-6">
                  + {algorithm.steps.length - 3} more steps
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Algorithm notes preview */}
        {algorithm.notes && (
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{algorithm.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PALSAlgorithm;
