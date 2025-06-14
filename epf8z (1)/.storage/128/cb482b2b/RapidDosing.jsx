import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function RapidDosing({ medication }) {
  const { patientWeight } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [calculatedDoses, setCalculatedDoses] = useState([]);

  // Calculate doses when patient weight changes
  useEffect(() => {
    if (patientWeight) {
      calculateDoses();
    }
  }, [patientWeight]);

  // Calculate medication doses based on patient weight
  const calculateDoses = () => {
    const doses = [];

    // Calculate for cardiac arrest dosing
    if (medication.doseCardiacArrest) {
      const dose = medication.doseCardiacArrest;
      const doseInfo = parseDoseString(dose.dose, patientWeight);
      
      doses.push({
        indication: 'Cardiac Arrest',
        route: dose.route,
        calculated: doseInfo.calculated,
        maxDose: dose.maxDose,
        notes: dose.notes
      });
    }

    // Calculate for anaphylaxis dosing
    if (medication.doseAnaphylaxis) {
      const dose = medication.doseAnaphylaxis;
      const doseInfo = parseDoseString(dose.dose, patientWeight);
      
      doses.push({
        indication: 'Anaphylaxis',
        route: dose.route,
        calculated: doseInfo.calculated,
        maxDose: dose.maxDose,
        notes: dose.notes
      });
    }

    // Calculate for general dosing
    if (medication.doseGeneral) {
      const dose = medication.doseGeneral;
      const doseInfo = parseDoseString(dose.dose || '', patientWeight);
      const firstDoseInfo = parseDoseString(dose.firstDose || '', patientWeight);
      const secondDoseInfo = parseDoseString(dose.secondDose || '', patientWeight);
      
      doses.push({
        indication: 'General',
        route: dose.route,
        calculated: doseInfo.calculated || 
                   (firstDoseInfo.calculated ? `1st: ${firstDoseInfo.calculated}, 2nd: ${secondDoseInfo.calculated}` : ''),
        minDose: dose.minDose,
        maxDose: dose.maxDose || (dose.maxFirstDose ? `1st: ${dose.maxFirstDose}, 2nd: ${dose.maxSecondDose}` : ''),
        notes: dose.notes
      });
    }

    // Calculate for specific patient types
    ['doseInfant', 'doseChild', 'doseAdolescent', 'dosePerfusingArrhythmia', 'doseInfantChild'].forEach(doseType => {
      if (medication[doseType]) {
        const dose = medication[doseType];
        const doseInfo = parseDoseString(dose.dose || '', patientWeight);
        
        let indication = doseType.replace('dose', '');
        indication = indication.charAt(0) + indication.slice(1).replace(/([A-Z])/g, ' $1');
        
        doses.push({
          indication,
          route: dose.route,
          calculated: doseInfo.calculated,
          maxDose: dose.maxDose,
          notes: dose.notes
        });
      }
    });

    setCalculatedDoses(doses);
  };

  // Parse dose string to extract weight-based calculations
  const parseDoseString = (doseString, weight) => {
    if (!doseString || !weight) return { raw: doseString, calculated: '' };
    
    // Extract mg/kg or mcg/kg values
    const mgKgMatch = doseString.match(/(\d+(?:\.\d+)?)\s*mg\/kg/i);
    const mcgKgMatch = doseString.match(/(\d+(?:\.\d+)?)\s*(?:mcg|µg)\/kg/i);
    const mlKgMatch = doseString.match(/(\d+(?:\.\d+)?)\s*mL\/kg/i);
    
    let calculated = '';
    
    if (mgKgMatch) {
      const doseAmount = parseFloat(mgKgMatch[1]);
      const totalDose = (doseAmount * weight).toFixed(2);
      calculated = `${totalDose} mg`;
    } else if (mcgKgMatch) {
      const doseAmount = parseFloat(mcgKgMatch[1]);
      const totalDose = (doseAmount * weight).toFixed(1);
      calculated = `${totalDose} mcg`;
    } else if (mlKgMatch) {
      const doseAmount = parseFloat(mlKgMatch[1]);
      const totalDose = (doseAmount * weight).toFixed(2);
      calculated = `${totalDose} mL`;
    }
    
    return { raw: doseString, calculated };
  };

  // Get the appropriate style for the medication category
  const getCategoryStyle = () => {
    switch (medication.category) {
      case 'cardiac':
        return 'border-red-200 dark:border-red-900/50';
      case 'respiratory':
        return 'border-blue-200 dark:border-blue-900/50';
      case 'neurological':
        return 'border-purple-200 dark:border-purple-900/50';
      case 'analgesia':
        return 'border-green-200 dark:border-green-900/50';
      case 'toxicology':
        return 'border-yellow-200 dark:border-yellow-900/50';
      default:
        return 'border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div 
      className={`bg-white dark:bg-slate-800 border rounded-lg shadow-sm ${getCategoryStyle()}`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{medication.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{medication.concentration}</p>
          </div>
          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded">
            {medication.category.charAt(0).toUpperCase() + medication.category.slice(1)}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          {medication.indication}
        </p>

        {patientWeight && calculatedDoses.length > 0 && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 p-2 rounded">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Calculated for {patientWeight} kg:
            </p>
            {calculatedDoses.length > 0 && (
              <div className="space-y-1 mt-1">
                {calculatedDoses.map((dose, index) => (
                  dose.calculated && (
                    <div key={index} className="text-xs flex">
                      <span className="font-medium text-green-800 dark:text-green-300 min-w-[80px]">
                        {dose.indication}:
                      </span>
                      <span className="text-green-700 dark:text-green-400">
                        {dose.calculated}
                        {dose.maxDose && ` (max: ${dose.maxDose})`}
                      </span>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end mt-1">
          <button 
            className="text-blue-600 dark:text-blue-400 text-sm flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Show less" : "Show details"}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-sm">
          {medication.preparation && (
            <div className="mb-2">
              <span className="font-medium">Preparation:</span> {medication.preparation}
            </div>
          )}
          
          {medication.cautions && (
            <div className="mb-2">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-medium">Cautions:</span> {medication.cautions}
                </div>
              </div>
            </div>
          )}
          
          {medication.adverse && (
            <div className="mb-2">
              <span className="font-medium">Adverse Effects:</span> {medication.adverse}
            </div>
          )}
          
          <div className="mt-3">
            <h4 className="font-medium mb-1">Dosing Details:</h4>
            <div className="space-y-2">
              {Object.keys(medication)
                .filter(key => key.startsWith('dose'))
                .map((doseKey, index) => {
                  const dose = medication[doseKey];
                  let title = doseKey.replace('dose', '');
                  title = title.charAt(0) + title.slice(1).replace(/([A-Z])/g, ' $1');
                  
                  return (
                    <div key={index} className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
                      <p className="font-medium">{title}</p>
                      <p><span className="text-slate-600 dark:text-slate-400">Route:</span> {dose.route}</p>
                      {dose.dose && <p><span className="text-slate-600 dark:text-slate-400">Dose:</span> {dose.dose}</p>}
                      {dose.firstDose && <p><span className="text-slate-600 dark:text-slate-400">First Dose:</span> {dose.firstDose}</p>}
                      {dose.secondDose && <p><span className="text-slate-600 dark:text-slate-400">Second Dose:</span> {dose.secondDose}</p>}
                      {dose.minDose && <p><span className="text-slate-600 dark:text-slate-400">Min Dose:</span> {dose.minDose}</p>}
                      {dose.maxDose && <p><span className="text-slate-600 dark:text-slate-400">Max Dose:</span> {dose.maxDose}</p>}
                      {dose.maxFirstDose && <p><span className="text-slate-600 dark:text-slate-400">Max First Dose:</span> {dose.maxFirstDose}</p>}
                      {dose.maxSecondDose && <p><span className="text-slate-600 dark:text-slate-400">Max Second Dose:</span> {dose.maxSecondDose}</p>}
                      {dose.notes && <p><span className="text-slate-600 dark:text-slate-400">Notes:</span> {dose.notes}</p>}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RapidDosing;
