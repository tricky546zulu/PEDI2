import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateDose, calculateVolume } from '../utils/calculations';

function RapidDosing({ medication }) {
  const { patientWeight, patientAge } = useAppContext();
  const [customWeight, setCustomWeight] = useState("");
  const [calculatedDose, setCalculatedDose] = useState(null);
  const [calculatedVolume, setCalculatedVolume] = useState(null);

  // Handler for dose calculation
  const handleCalculate = () => {
    const weight = customWeight || patientWeight;
    if (!weight) return;

    const dose = calculateDose(medication, weight, patientAge);
    const volume = calculateVolume(medication, dose);
    
    setCalculatedDose(dose);
    setCalculatedVolume(volume);
  };

  // Color scheme based on medication category
  const getCategoryColor = () => {
    switch (medication.category) {
      case 'emergency':
        return 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800';
      case 'sedation':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800';
      case 'cardiac':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700';
    }
  };

  return (
    <div className={`p-4 border rounded-lg shadow-sm ${getCategoryColor()} mb-4`}>
      <h3 className="text-lg font-bold">{medication.name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{medication.indication}</p>
      
      <div className="mt-3">
        <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Concentration</div>
        <div className="font-medium">{medication.concentration}</div>
      </div>
      
      <div className="mt-3">
        <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Standard Dose</div>
        <div className="font-medium">{medication.standardDose}</div>
      </div>
      
      {/* Weight input for calculation */}
      <div className="mt-4">
        <label htmlFor={`weight-${medication.id}`} className="text-sm font-medium">
          Patient Weight (kg)
        </label>
        <div className="flex mt-1">
          <input
            id={`weight-${medication.id}`}
            type="number"
            min="0"
            step="0.1"
            className="rounded-l-lg flex-1 px-3 py-2 border border-r-0 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            placeholder={patientWeight || "Enter weight"}
            value={customWeight}
            onChange={(e) => setCustomWeight(e.target.value)}
          />
          <button 
            onClick={handleCalculate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Calculate
          </button>
        </div>
      </div>
      
      {/* Display calculation results */}
      {calculatedDose && calculatedVolume && (
        <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium">Recommended Dose:</span>
            <span className="text-lg font-bold">{calculatedDose.toFixed(2)} {medication.doseUnit}</span>
          </div>
          
          <div className="mt-2 flex justify-between items-baseline">
            <span className="text-sm font-medium">Volume to Administer:</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{calculatedVolume.toFixed(2)} mL</span>
          </div>
        </div>
      )}
      
      {/* Notes and warnings */}
      {medication.notes && (
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 italic">
          Note: {medication.notes}
        </div>
      )}
    </div>
  );
}

export default RapidDosing;
