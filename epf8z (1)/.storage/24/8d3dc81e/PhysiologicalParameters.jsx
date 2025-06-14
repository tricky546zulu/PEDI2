import React from 'react';
import { useAppContext } from '../contexts/AppContext';

function PhysiologicalParameters({ ageGroup }) {
  // Determine color scheme based on parameter status
  const getStatusColor = (value, normalRange) => {
    if (!value || !normalRange) return '';
    
    const [min, max] = normalRange;
    
    if (value < min) {
      return 'text-red-600 dark:text-red-400';
    } else if (value > max) {
      return 'text-red-600 dark:text-red-400';
    } else {
      return 'text-green-600 dark:text-green-400';
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold">{ageGroup.label}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {ageGroup.ageRange}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Heart Rate */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Heart Rate</div>
          <div className={`text-xl font-bold ${getStatusColor(ageGroup.currentHR, ageGroup.hrRange)}`}>
            {ageGroup.hrRange[0]}-{ageGroup.hrRange[1]} <span className="text-sm">bpm</span>
          </div>
        </div>
        
        {/* Respiratory Rate */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Respiratory Rate</div>
          <div className={`text-xl font-bold ${getStatusColor(ageGroup.currentRR, ageGroup.rrRange)}`}>
            {ageGroup.rrRange[0]}-{ageGroup.rrRange[1]} <span className="text-sm">rpm</span>
          </div>
        </div>
        
        {/* Systolic BP */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Systolic BP</div>
          <div className={`text-xl font-bold ${getStatusColor(ageGroup.currentSBP, ageGroup.sbpRange)}`}>
            {ageGroup.sbpRange[0]}-{ageGroup.sbpRange[1]} <span className="text-sm">mmHg</span>
          </div>
        </div>
        
        {/* Diastolic BP */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Diastolic BP</div>
          <div className={`text-xl font-bold ${getStatusColor(ageGroup.currentDBP, ageGroup.dbpRange)}`}>
            {ageGroup.dbpRange[0]}-{ageGroup.dbpRange[1]} <span className="text-sm">mmHg</span>
          </div>
        </div>
      </div>
      
      {/* Weight Range */}
      <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Typical Weight Range</div>
        <div className="text-lg font-bold">
          {ageGroup.weightRange[0]}-{ageGroup.weightRange[1]} <span className="text-sm">kg</span>
        </div>
      </div>
      
      {/* Notes */}
      {ageGroup.notes && (
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 italic">
          Note: {ageGroup.notes}
        </div>
      )}
    </div>
  );
}

export default PhysiologicalParameters;
