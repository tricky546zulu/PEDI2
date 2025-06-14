import React from 'react';
import { Link } from 'react-router-dom';

function PALSAlgorithm({ algorithm }) {
  // Function to get styling based on algorithm category
  const getCategoryStyles = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return {
          container: 'border-red-200 dark:border-red-900/50',
          header: 'bg-red-50 dark:bg-red-900/20',
          title: 'text-red-800 dark:text-red-300',
          badge: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
        };
      case 'bradycardia':
        return {
          container: 'border-yellow-200 dark:border-yellow-900/50',
          header: 'bg-yellow-50 dark:bg-yellow-900/20',
          title: 'text-yellow-800 dark:text-yellow-300',
          badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
        };
      case 'tachycardia':
        return {
          container: 'border-orange-200 dark:border-orange-900/50',
          header: 'bg-orange-50 dark:bg-orange-900/20',
          title: 'text-orange-800 dark:text-orange-300',
          badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300'
        };
      case 'post resuscitation':
        return {
          container: 'border-purple-200 dark:border-purple-900/50',
          header: 'bg-purple-50 dark:bg-purple-900/20',
          title: 'text-purple-800 dark:text-purple-300',
          badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'
        };
      case 'shock':
        return {
          container: 'border-blue-200 dark:border-blue-900/50',
          header: 'bg-blue-50 dark:bg-blue-900/20',
          title: 'text-blue-800 dark:text-blue-300',
          badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
        };
      default:
        return {
          container: 'border-slate-200 dark:border-slate-700',
          header: 'bg-slate-50 dark:bg-slate-800',
          title: 'text-slate-800 dark:text-slate-200',
          badge: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
        };
    }
  };

  const styles = getCategoryStyles();

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-4 ${styles.container}`}>
      <div className={`p-4 ${styles.header}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-bold text-lg mb-1 ${styles.title}`}>{algorithm.title}</h3>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
              {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
            </span>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 line-clamp-2">
          {algorithm.description}
        </p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-3 flex justify-between items-center border-t border-slate-100 dark:border-slate-700">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {algorithm.steps?.length || 0} steps
        </span>
        <span className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default PALSAlgorithm;
