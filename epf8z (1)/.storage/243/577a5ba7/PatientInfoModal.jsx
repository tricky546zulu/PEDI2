import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function PatientInfoModal() {
  const { 
    showPatientModal, 
    setShowPatientModal, 
    patientWeight, 
    patientAge, 
    updatePatientData 
  } = useAppContext();
  
  // Form state
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState('months'); // months or years
  
  // Set initial values when modal opens
  useEffect(() => {
    if (showPatientModal) {
      if (patientWeight) {
        setWeight(patientWeight.toString());
      } else {
        setWeight('');
      }
      
      if (patientAge !== null) {
        if (patientAge >= 24) {
          // Convert to years if age is >= 24 months
          setAge(Math.floor(patientAge / 12).toString());
          setAgeUnit('years');
        } else {
          setAge(patientAge.toString());
          setAgeUnit('months');
        }
      } else {
        setAge('');
        setAgeUnit('months');
      }
    }
  }, [showPatientModal, patientWeight, patientAge]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse weight input
    const weightValue = parseFloat(weight);
    
    // Parse and convert age based on unit
    let ageValue = parseInt(age, 10);
    if (ageUnit === 'years') {
      ageValue = ageValue * 12; // Convert years to months
    }
    
    // Update patient data in context
    updatePatientData(weightValue, ageValue);
  };
  
  // Clear patient data
  const handleClear = () => {
    updatePatientData(null, null);
  };
  
  if (!showPatientModal) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-medium">Patient Information</h2>
          <button 
            onClick={() => setShowPatientModal(false)}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Weight input */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-1">
              Weight (kg)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="weight"
                placeholder="Enter weight"
                step="0.1"
                min="0"
                className="block w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            {weight && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {(parseFloat(weight) * 2.2).toFixed(1)} lb
              </p>
            )}
          </div>
          
          {/* Age input */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">
              Age
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  id="age"
                  placeholder="Enter age"
                  min="0"
                  className="block w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <select
                value={ageUnit}
                onChange={(e) => setAgeUnit(e.target.value)}
                className="p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          
          {/* Information note */}
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-3 rounded-md text-sm">
            <p>Patient information is used for weight-based calculations and age-appropriate guidance. Data is stored locally on your device.</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center pt-2">
            {(patientWeight || patientAge) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Clear Data
              </button>
            )}
            <div className="ml-auto flex space-x-2">
              <button
                type="button"
                onClick={() => setShowPatientModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                disabled={!weight && !age}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientInfoModal;