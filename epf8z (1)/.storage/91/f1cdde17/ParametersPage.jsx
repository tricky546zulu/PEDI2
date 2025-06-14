import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import PhysiologicalParameters from '../components/PhysiologicalParameters';
import { getVitalSignsForAge } from '../utils/calculations';

function ParametersPage() {
  const { patientAge, patientWeight } = useAppContext();
  const [vitalSigns, setVitalSigns] = useState([]);
  const [patientSpecificVitals, setPatientSpecificVitals] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load vital signs data
  useEffect(() => {
    const loadVitalSigns = async () => {
      try {
        // Import vital signs data
        const { default: vitals } = await import('../data/vitalSigns');
        setVitalSigns(vitals);
        setLoading(false);
      } catch (error) {
        console.error('Error loading vital signs data:', error);
        setLoading(false);
      }
    };
    
    loadVitalSigns();
  }, []);
  
  // Calculate patient-specific vitals when patient age changes
  useEffect(() => {
    if (patientAge && vitalSigns.length > 0) {
      // Get vital signs appropriate for this patient's age
      const ageAppropriateVitals = getVitalSignsForAge(patientAge);
      
      // Create a patient-specific version of the vital signs
      if (ageAppropriateVitals) {
        setPatientSpecificVitals({
          ...ageAppropriateVitals,
          id: 'patient-specific',
          label: 'Current Patient',
          weightRange: patientWeight ? [patientWeight, patientWeight] : ageAppropriateVitals.weightRange,
          notes: `Patient age: ${patientAge} months (${(patientAge / 12).toFixed(1)} years)${
            patientWeight ? `, weight: ${patientWeight} kg` : ''
          }`
        });
      } else {
        setPatientSpecificVitals(null);
      }
    } else {
      setPatientSpecificVitals(null);
    }
  }, [patientAge, patientWeight, vitalSigns]);
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Normal Vital Signs</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          {/* Patient-specific vitals if available */}
          {patientSpecificVitals && (
            <div className="mb-6">
              <PhysiologicalParameters ageGroup={patientSpecificVitals} />
            </div>
          )}
          
          {/* Info message if no patient data */}
          {!patientSpecificVitals && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 rounded-lg">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                    No patient data entered
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Add patient information to see age-specific vital sign ranges.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Reference ranges by age group */}
          <h2 className="text-lg font-bold mt-4 mb-2">Reference Ranges by Age Group</h2>
          <div className="space-y-4">
            {vitalSigns.map(ageGroup => (
              <PhysiologicalParameters key={ageGroup.id} ageGroup={ageGroup} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ParametersPage;
