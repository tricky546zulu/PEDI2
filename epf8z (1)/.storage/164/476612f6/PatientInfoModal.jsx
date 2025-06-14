import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

function PatientInfoModal() {
  const { showPatientModal, setShowPatientModal, updatePatientData, patientWeight, patientAge } = useAppContext();
  
  const [weight, setWeight] = useState(patientWeight || '');
  const [age, setAge] = useState(patientAge || '');
  const [ageType, setAgeType] = useState('months'); // 'months' or 'years'
  const [errors, setErrors] = useState({});
  
  // Reset form when modal is opened
  React.useEffect(() => {
    if (showPatientModal) {
      setWeight(patientWeight || '');
      setAge(patientAge || '');
      setAgeType('months');
      setErrors({});
    }
  }, [showPatientModal, patientWeight, patientAge]);
  
  const handleClose = () => {
    setShowPatientModal(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate weight
    if (weight && (isNaN(weight) || weight <= 0 || weight > 150)) {
      newErrors.weight = 'Please enter a valid weight between 0 and 150 kg';
    }
    
    // Validate age
    if (age) {
      if (isNaN(age) || age < 0) {
        newErrors.age = 'Please enter a valid age';
      } else if (ageType === 'years' && age > 18) {
        newErrors.age = 'Age must be 18 years or less for pediatric patients';
      } else if (ageType === 'months' && age > 216) {
        newErrors.age = 'Age must be 216 months (18 years) or less';
      }
    }
    
    setErrors(newErrors);
    
    // If no errors, update patient data
    if (Object.keys(newErrors).length === 0) {
      // Convert years to months if needed
      const ageInMonths = age ? (ageType === 'years' ? Math.round(age * 12) : parseInt(age)) : null;
      const weightInKg = weight ? parseFloat(weight) : null;
      
      updatePatientData(weightInKg, ageInMonths);
      setShowPatientModal(false);
    }
  };
  
  const handleClear = () => {
    updatePatientData(null, null);
    setShowPatientModal(false);
  };
  
  if (!showPatientModal) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-medium">Patient Information</h2>
          <button 
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.1"
                min="0"
                max="150"
                className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                placeholder="Enter patient weight"
              />
              {errors.weight && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.weight}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Age
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  className="flex-1 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                  placeholder="Enter patient age"
                />
                <select
                  value={ageType}
                  onChange={(e) => setAgeType(e.target.value)}
                  className="p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                >
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
              {errors.age && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.age}</p>
              )}
            </div>
            
            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
              <p>Weight and age are used to calculate medication doses and equipment sizes. You can provide one or both values.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear Data
            </button>
            
            <div className="space-x-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
