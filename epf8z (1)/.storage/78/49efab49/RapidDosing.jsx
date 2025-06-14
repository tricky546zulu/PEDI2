import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateMedicationDose } from '../utils/calculations';

function RapidDosing({ medication }) {
  const { patientWeight } = useAppContext();
  const [calculatedDose, setCalculatedDose] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate the dose when weight or medication changes
  useEffect(() => {
    if (patientWeight && medication) {
      const doseInfo = calculateMedicationDose(patientWeight, medication);
      setCalculatedDose(doseInfo);
    } else {
      setCalculatedDose(null);
    }
  }, [patientWeight, medication]);

  // Color coding based on medication category
  const getCategoryBadgeColor = () => {
    switch (medication.category) {
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'resuscitation':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'sedation':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'analgesia':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'seizure':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'antibiotics':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{medication.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getCategoryBadgeColor()}`}>
                {medication.category.charAt(0).toUpperCase() + medication.category.slice(1)}
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">
                {medication.concentration}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-2"
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showDetails ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          <p>{medication.indication}</p>
        </div>

        {/* Calculated Dose */}
        {patientWeight ? (
          <div className={`mt-3 p-3 rounded-lg ${calculatedDose ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Calculated dose:</span>
              {calculatedDose ? (
                <span className="text-lg font-bold text-green-700 dark:text-green-400">
                  {calculatedDose.recommendedDose}
                </span>
              ) : (
                <span className="text-sm text-slate-500 dark:text-slate-400">Unable to calculate</span>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>Standard dose: {medication.standardDose}</span>
              <span>Patient weight: {patientWeight} kg</span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Enter patient weight for dose calculation
              </span>
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <h4 className="font-medium text-sm mb-2">Additional Information</h4>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-700 dark:text-slate-300">Max Dose:</dt>
                <dd className="text-slate-600 dark:text-slate-400">{medication.maxDose} {medication.doseUnit}</dd>
              </div>
              {medication.notes && (
                <div>
                  <dt className="font-medium text-slate-700 dark:text-slate-300">Notes:</dt>
                  <dd className="text-slate-600 dark:text-slate-400">{medication.notes}</dd>
                </div>
              )}
              <div>
                <dt className="font-medium text-slate-700 dark:text-slate-300">Dose Calculation:</dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {medication.dosePerKg} {medication.doseUnit}/kg × weight
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

export default RapidDosing;
