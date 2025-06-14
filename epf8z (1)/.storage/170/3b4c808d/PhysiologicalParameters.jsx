import React from 'react';

function PhysiologicalParameters({ ageGroup }) {
  // Parameter sections for organization
  const sections = [
    { id: 'vital', name: 'Vital Signs' },
    { id: 'respiratory', name: 'Respiratory' },
    { id: 'cardiovascular', name: 'Cardiovascular' }
  ];

  // Helper function to get parameters by section
  const getParametersBySection = (sectionId) => {
    return ageGroup.parameters.filter(param => param.section === sectionId);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
      {/* Age Group Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4">
        <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">
          {ageGroup.label}
          <span className="block text-sm font-normal mt-1 text-blue-600 dark:text-blue-400">
            {ageGroup.ageRange}
          </span>
        </h2>
      </div>

      {/* Parameters by section */}
      <div className="p-4">
        {sections.map(section => {
          const parameters = getParametersBySection(section.id);
          if (parameters.length === 0) return null;
          
          return (
            <div key={section.id} className="mb-6 last:mb-0">
              <h3 className="font-medium text-lg mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                {section.name}
              </h3>
              
              <div className="space-y-4">
                {parameters.map(param => (
                  <div key={param.id} className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{param.name}</h4>
                      {param.unit && (
                        <span className="text-xs px-2 py-0.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded">
                          {param.unit}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2">
                      {/* Normal range */}
                      <div className="text-green-700 dark:text-green-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Normal:</span>
                        <span className="ml-1">{param.normalRange}</span>
                      </div>
                      
                      {/* If there are intervention thresholds */}
                      {param.interventionThresholds && (
                        <div className="text-amber-700 dark:text-amber-400 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span className="font-medium">Intervention:</span>
                          <span className="ml-1">{param.interventionThresholds}</span>
                        </div>
                      )}
                      
                      {/* If there are critical thresholds */}
                      {param.criticalThresholds && (
                        <div className="text-red-700 dark:text-red-400 flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Critical:</span>
                          <span className="ml-1">{param.criticalThresholds}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Notes if available */}
                    {param.notes && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 bg-white dark:bg-slate-700 p-2 rounded">
                        <span className="font-medium">Note:</span> {param.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhysiologicalParameters;
