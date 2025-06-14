import React from 'react';

function PhysiologicalParameters({ ageGroup }) {
  if (!ageGroup) return null;
  
  // Format range function
  const formatRange = (range) => {
    if (!range || !Array.isArray(range) || range.length !== 2) return 'N/A';
    return `${range[0]}-${range[1]}`;
  };
  
  // Helper for color coding
  const getVitalColor = (vital, type) => {
    if (!vital || !Array.isArray(vital) || vital.length !== 2) {
      return 'bg-slate-50 dark:bg-slate-700';
    }
    
    switch(type) {
      case 'hr':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'rr':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'sbp':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'dbp':
        return 'bg-violet-50 dark:bg-violet-900/20';
      default:
        return 'bg-slate-50 dark:bg-slate-700';
    }
  };
  
  // Helper for vital sign icon
  const getVitalIcon = (type) => {
    switch(type) {
      case 'hr':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'rr':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m0 0l2.828-2.828m-2.828 2.828a9 9 0 01-2.12-1.1" />
          </svg>
        );
      case 'sbp':
      case 'dbp':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const isPatientSpecific = ageGroup.id === 'patient-specific';

  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-lg shadow-sm overflow-hidden ${isPatientSpecific ? 'border-blue-200 dark:border-blue-900' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className={`p-4 ${isPatientSpecific ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {ageGroup.label}
            {isPatientSpecific && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                Current Patient
              </span>
            )}
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {ageGroup.ageRange}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Heart Rate */}
          <div className={`p-3 rounded-lg ${getVitalColor(ageGroup.hrRange, 'hr')}`}>
            <div className="flex items-center">
              {getVitalIcon('hr')}
              <span className="ml-1 text-sm font-medium">Heart Rate</span>
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatRange(ageGroup.hrRange)} <span className="text-sm font-normal">bpm</span>
            </div>
          </div>
          
          {/* Respiratory Rate */}
          <div className={`p-3 rounded-lg ${getVitalColor(ageGroup.rrRange, 'rr')}`}>
            <div className="flex items-center">
              {getVitalIcon('rr')}
              <span className="ml-1 text-sm font-medium">Respiratory Rate</span>
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatRange(ageGroup.rrRange)} <span className="text-sm font-normal">/min</span>
            </div>
          </div>
          
          {/* Systolic BP */}
          <div className={`p-3 rounded-lg ${getVitalColor(ageGroup.sbpRange, 'sbp')}`}>
            <div className="flex items-center">
              {getVitalIcon('sbp')}
              <span className="ml-1 text-sm font-medium">Systolic BP</span>
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatRange(ageGroup.sbpRange)} <span className="text-sm font-normal">mmHg</span>
            </div>
          </div>
          
          {/* Diastolic BP */}
          <div className={`p-3 rounded-lg ${getVitalColor(ageGroup.dbpRange, 'dbp')}`}>
            <div className="flex items-center">
              {getVitalIcon('dbp')}
              <span className="ml-1 text-sm font-medium">Diastolic BP</span>
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatRange(ageGroup.dbpRange)} <span className="text-sm font-normal">mmHg</span>
            </div>
          </div>
        </div>
        
        {/* Weight Range */}
        {ageGroup.weightRange && ageGroup.weightRange[0] && (
          <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span className="ml-1 text-sm font-medium">Typical Weight Range</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-bold">
                {typeof ageGroup.weightRange[0] === 'string' && ageGroup.weightRange[0].startsWith('>') 
                  ? ageGroup.weightRange[0] 
                  : formatRange(ageGroup.weightRange)}
              </span> 
              <span className="text-sm">kg</span>
            </div>
          </div>
        )}
        
        {/* Notes */}
        {ageGroup.notes && (
          <div className="mt-3 text-sm flex items-start text-slate-600 dark:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{ageGroup.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhysiologicalParameters;
