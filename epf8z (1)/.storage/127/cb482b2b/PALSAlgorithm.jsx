import React from 'react';

function PALSAlgorithm({ algorithm }) {
  // Get the appropriate background color based on algorithm category
  const getCategoryColor = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50';
      case 'bradycardia':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/50';
      case 'tachycardia':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50';
      case 'post resuscitation':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/50';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50';
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${getCategoryColor()}`}>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-1">{algorithm.title}</h3>
          <span className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 text-xs font-medium px-2.5 py-0.5 rounded">
            {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
          </span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{algorithm.description}</p>
        
        {algorithm.steps && (
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {algorithm.steps.length} steps
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-3 flex justify-between items-center">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {algorithm.patientType && (
            <span className="mr-2">
              <span className="font-medium">Type:</span> {algorithm.patientType}
            </span>
          )}
        </div>
        
        <button className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 py-1 px-3 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </div>
    </div>
  );
}

export default PALSAlgorithm;
