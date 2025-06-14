import React from 'react';
import { Link } from 'react-router-dom';

function PALSAlgorithm({ algorithm }) {
  // Destructure the algorithm data
  const { id, title, patientType, steps, notes, imageUrl } = algorithm;

  // Function to determine color scheme based on algorithm type
  const getColorScheme = (type) => {
    switch (type) {
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
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <Link to={`/algorithms/${id}`}>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {patientType && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${getColorScheme(algorithm.category)}`}>
              {patientType}
            </span>
          )}
          {/* Preview of first steps */}
          {steps && steps.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {steps[0].text}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default PALSAlgorithm;
