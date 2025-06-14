import React, { useState, useEffect } from 'react';
import RapidDosing from '../components/RapidDosing';
import { useAppContext } from '../contexts/AppContext';
import { estimateWeight } from '../utils/calculations';

function DosingPage() {
  const { patientWeight, patientAge, setShowPatientModal } = useAppContext();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [estimatedWeight, setEstimatedWeight] = useState(null);
  
  // Load medications data
  useEffect(() => {
    const loadMedications = async () => {
      try {
        // Import medications data
        const { default: medsData } = await import('../data/medications');
        setMedications(medsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading medications data:', error);
        setLoading(false);
      }
    };
    
    loadMedications();
  }, []);
  
  // Estimate weight based on age if weight is not provided
  useEffect(() => {
    if (!patientWeight && patientAge) {
      const calculated = estimateWeight({ ageMonths: patientAge });
      setEstimatedWeight(calculated ? Math.round(calculated * 10) / 10 : null);
    } else {
      setEstimatedWeight(null);
    }
  }, [patientWeight, patientAge]);
  
  // Get unique categories for filter tabs
  const categories = ['all', ...new Set(medications.map(med => med.category))];
  
  // Filter medications based on search term and active category
  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.indication?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || med.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Medication Dosing</h1>
      
      {/* Patient weight banner */}
      {!patientWeight ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 rounded-lg p-3">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-yellow-700 dark:text-yellow-300">
                  No patient weight entered
                </span>
                <button 
                  onClick={() => setShowPatientModal(true)}
                  className="ml-3 px-2 py-1 text-xs font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                >
                  Enter Weight
                </button>
              </div>
              {estimatedWeight && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  Estimated weight based on age: {estimatedWeight} kg (this is only an estimate)
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium text-green-700 dark:text-green-300">
                Patient weight: {patientWeight} kg
              </span>
            </div>
            <button 
              onClick={() => setShowPatientModal(true)}
              className="px-2 py-1 text-xs font-medium rounded bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
            >
              Update
            </button>
          </div>
        </div>
      )}
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search medications..."
          className="pl-10 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      <div className="flex overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Medications list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredMedications.length > 0 ? (
        <div className="grid gap-4">
          {filteredMedications.map((medication) => (
            <RapidDosing key={medication.id} medication={medication} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            No medications found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default DosingPage;
