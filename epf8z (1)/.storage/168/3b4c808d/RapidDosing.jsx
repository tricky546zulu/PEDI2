import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateDose } from '../utils/calculations';

function RapidDosing({ medication }) {
  const { patientWeight, patientAge } = useAppContext();
  
  // Function to determine if we have the required patient data
  const hasRequiredData = () => {
    return patientWeight !== null;
  };
  
  // Calculate doses if patient weight is available
  const getDoses = () => {
    if (!hasRequiredData()) return null;

    // For each dosing option, calculate the dose
    return medication.dosing.map((option, index) => {
      const result = calculateDose(option, patientWeight, patientAge);
      return {
        ...option,
        ...result,
        id: `${medication.id}-dose-${index}`
      };
    });
  };
  
  // Calculate doses
  const doses = getDoses();
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
      <div className={`p-4 ${medication.critical ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">
              {medication.name}
              {medication.critical && (
                <span className="ml-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded-full">
                  Critical
                </span>
              )}
            </h3>
            
            <div className="text-sm">
              <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded mb-1 mr-2">
                {medication.category}
              </span>
              {medication.code && (
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded mb-1">
                  {medication.code}
                </span>
              )}
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              {medication.indication}
            </p>
          </div>
        </div>
      </div>
      
      {/* Dosing information */}
      {hasRequiredData() ? (
        <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          {doses && doses.map(dose => (
            <div key={dose.id} className="p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{dose.indication}</h4>
                {dose.route && (
                  <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                    {dose.route}
                  </span>
                )}
              </div>
              
              {/* Standard dose information */}
              <div className="mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Standard: {dose.doseRange}
                </p>
              </div>
              
              {/* Calculated dose */}
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                <p className="text-green-800 dark:text-green-300 font-medium">
                  Patient Dose: {dose.calculatedDose}
                </p>
                {dose.minDose && dose.maxDose && (
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Range: {dose.minDose} - {dose.maxDose}
                  </p>
                )}
                {dose.notes && (
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                    {dose.notes}
                  </p>
                )}
              </div>
              
              {dose.caution && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-yellow-800 dark:text-yellow-300 text-sm">
                  <strong>Caution:</strong> {dose.caution}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-2">Set patient weight to see calculated doses</p>
        </div>
      )}
      
      {/* Side effects and contraindications */}
      <div className="bg-slate-50 dark:bg-slate-700/30 p-3 text-sm">
        {medication.sideEffects && (
          <div className="mb-2">
            <p className="font-medium text-slate-700 dark:text-slate-300">Side Effects:</p>
            <p className="text-slate-600 dark:text-slate-400">{medication.sideEffects}</p>
          </div>
        )}
        
        {medication.contraindications && (
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-300">Contraindications:</p>
            <p className="text-slate-600 dark:text-slate-400">{medication.contraindications}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RapidDosing;
