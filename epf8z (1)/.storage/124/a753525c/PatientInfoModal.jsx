import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { estimateWeight } from '../utils/calculations';

function PatientInfoModal() {
  const { 
    showPatientModal, 
    setShowPatientModal,
    patientWeight, 
    patientAge,
    patientLength, 
    updatePatientData,
    resetPatientData
  } = useAppContext();

  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [length, setLength] = useState('');
  const [ageUnit, setAgeUnit] = useState('months');
  const [useEstimatedWeight, setUseEstimatedWeight] = useState(false);
  const [estimatedWeightValue, setEstimatedWeightValue] = useState(null);

  // Load current patient data when modal opens
  useEffect(() => {
    if (showPatientModal) {
      if (patientWeight) setWeight(patientWeight.toString());
      if (patientAge) setAge(patientAge.toString());
      if (patientLength) setLength(patientLength.toString());
      setAgeUnit('months'); // Always reset to months
    }
  }, [showPatientModal, patientWeight, patientAge, patientLength]);

  // Calculate estimated weight when age changes
  useEffect(() => {
    if (age && ageUnit) {
      // Convert age to months if needed
      const ageInMonths = ageUnit === 'years' ? parseFloat(age) * 12 : parseFloat(age);
      
      if (!isNaN(ageInMonths)) {
        const calculated = estimateWeight({ ageMonths: ageInMonths });
        if (calculated) {
          setEstimatedWeightValue(Math.round(calculated * 10) / 10);
        } else {
          setEstimatedWeightValue(null);
        }
      } else {
        setEstimatedWeightValue(null);
      }
    } else {
      setEstimatedWeightValue(null);
    }
  }, [age, ageUnit]);

  // Use estimated weight when checkbox is checked
  useEffect(() => {
    if (useEstimatedWeight && estimatedWeightValue) {
      setWeight(estimatedWeightValue.toString());
    }
  }, [useEstimatedWeight, estimatedWeightValue]);

  const closeModal = () => {
    setShowPatientModal(false);
    setWeight('');
    setAge('');
    setLength('');
    setUseEstimatedWeight(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const weightValue = weight ? parseFloat(weight) : undefined;
    
    // Convert age to months if entered in years
    let ageValue;
    if (age) {
      ageValue = parseFloat(age);
      if (ageUnit === 'years') {
        ageValue = Math.round(ageValue * 12);
      }
    } else {
      ageValue = undefined;
    }

    const lengthValue = length ? parseInt(length) : undefined;
    
    updatePatientData(weightValue, ageValue, lengthValue);
    closeModal();
  };

  if (!showPatientModal) return null;

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
        
        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-white dark:bg-slate-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium">
                Patient Information
              </h3>
              <div className="mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Weight field */}
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium">
                        Weight (kg)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="weight"
                          min="0"
                          max="150"
                          step="0.1"
                          className="shadow-sm block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          disabled={useEstimatedWeight && estimatedWeightValue}
                        />
                      </div>
                    </div>
                    
                    {/* Age fields */}
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium">
                        Age
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="number"
                          id="age"
                          min="0"
                          className="shadow-sm block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-l-md"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        <select
                          className="shadow-sm p-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-r-md border-l-0 bg-gray-50 dark:bg-slate-600"
                          value={ageUnit}
                          onChange={(e) => setAgeUnit(e.target.value)}
                        >
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Estimated weight option */}
                    {estimatedWeightValue && (
                      <div className="flex items-center">
                        <input
                          id="estimated-weight"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={useEstimatedWeight}
                          onChange={(e) => setUseEstimatedWeight(e.target.checked)}
                        />
                        <label htmlFor="estimated-weight" className="ml-2 block text-sm">
                          Use estimated weight: {estimatedWeightValue} kg
                        </label>
                      </div>
                    )}
                    
                    {/* Length field */}
                    <div>
                      <label htmlFor="length" className="block text-sm font-medium">
                        Length (cm) - optional
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          id="length"
                          min="0"
                          max="250"
                          className="shadow-sm block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-slate-700 rounded-md"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-transparent rounded-md hover:bg-red-200 dark:hover:bg-red-800/50"
                      onClick={() => {
                        resetPatientData();
                        closeModal();
                      }}
                    >
                      Clear Data
                    </button>
                    <div>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md mr-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfoModal;
