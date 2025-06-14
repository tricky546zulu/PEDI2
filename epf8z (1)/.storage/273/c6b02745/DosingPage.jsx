import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import medications from '../data/medications';

function DosingPage() {
  const { patientWeight, patientAge, setShowPatientModal, darkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeMed, setActiveMed] = useState(null);

  // Extract unique categories from medications data
  const categories = useMemo(() => {
    const cats = new Set(medications.map(med => med.category));
    return ['all', ...Array.from(cats).sort()];
  }, []);

  // Filter medications based on search query and selected category
  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const matchesSearch = searchQuery === '' || 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        med.indications.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculate dosing based on weight
  const calculateDosing = (med) => {
    if (!patientWeight || !med.dosing) return [];
    
    return med.dosing.map(dose => {
      const minCalc = dose.min * patientWeight;
      const maxCalc = dose.max * patientWeight;
      
      let calculatedDose;
      if (dose.min === dose.max) {
        calculatedDose = `${minCalc.toFixed(2)} ${dose.unit}`;
      } else {
        calculatedDose = `${minCalc.toFixed(2)} - ${maxCalc.toFixed(2)} ${dose.unit}`;
      }
      
      // Handle maximum dose cap if specified
      if (dose.maxDose && minCalc > dose.maxDose) {
        calculatedDose = `${dose.maxDose} ${dose.unit} (max)`;
      }
      
      return {
        ...dose,
        calculatedDose
      };
    });
  };

  // Handle click on a medication card
  const handleMedClick = (med) => {
    setActiveMed(prevMed => prevMed?.id === med.id ? null : med);
  };

  // Focus search input on category change
  useEffect(() => {
    const searchInput = document.getElementById('medication-search');
    if (searchInput) searchInput.focus();
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Patient information banner */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} ${patientWeight ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Weight-Based Dosing</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            {patientWeight ? 'Edit' : 'Add'} Patient
          </button>
        </div>

        {patientWeight ? (
          <div className="mt-2">
            <p className="text-slate-700 dark:text-slate-300">
              Calculations based on patient weight: <span className="font-semibold">{patientWeight} kg</span> ({(patientWeight * 2.2).toFixed(1)} lb)
            </p>
            {patientAge && (
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Age: {patientAge >= 24 ? `${Math.floor(patientAge / 12)} years` : `${patientAge} months`}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Add patient weight for accurate medication dosing calculations
          </p>
        )}
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className={`relative ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="medication-search"
            type="search"
            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search medications or indications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white dark:bg-blue-700' 
                    : darkMode 
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medication list */}
      <div className="space-y-3">
        {filteredMedications.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-slate-600 dark:text-slate-400">No medications found matching your search</p>
          </div>
        ) : (
          filteredMedications.map(med => (
            <div 
              key={med.id} 
              className={`border rounded-lg overflow-hidden transition ${darkMode ? 'border-slate-700' : 'border-slate-200'} ${activeMed?.id === med.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <button
                className={`w-full text-left p-4 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'}`}
                onClick={() => handleMedClick(med)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{med.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{med.category}</p>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform ${activeMed?.id === med.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {activeMed?.id === med.id && (
                <div className={`border-t p-4 space-y-4 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                  {/* Indications */}
                  <div>
                    <h4 className="font-medium mb-2">Indications</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {med.indications.map((indication, index) => (
                        <li key={index} className="text-slate-700 dark:text-slate-300 text-sm">{indication}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Dosing information */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Dosing</h4>
                      {!patientWeight && (
                        <button 
                          onClick={() => setShowPatientModal(true)}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Add patient weight
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {med.dosing.map((dose, idx) => {
                        const calculatedDoses = patientWeight ? calculateDosing(med) : [];
                        const calculatedDose = calculatedDoses[idx]?.calculatedDose;
                        
                        return (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-md ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}
                          >
                            {dose.indication && (
                              <div className="font-medium text-sm mb-1">{dose.indication}</div>
                            )}
                            <div className="text-sm text-slate-700 dark:text-slate-300">
                              {dose.min === dose.max 
                                ? `${dose.min} ${dose.unit}/kg` 
                                : `${dose.min}-${dose.max} ${dose.unit}/kg`
                              }
                              {dose.maxDose && ` (max: ${dose.maxDose} ${dose.unit})`}
                              {dose.route && ` ${dose.route}`}
                            </div>
                            {calculatedDose && (
                              <div className="mt-1 text-blue-600 dark:text-blue-400 font-medium">
                                Patient dose: {calculatedDose}
                              </div>
                            )}
                            {dose.notes && (
                              <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                                {dose.notes}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Contraindications */}
                  {med.contraindications && med.contraindications.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-red-600 dark:text-red-400">Contraindications</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {med.contraindications.map((contraindication, index) => (
                          <li key={index} className="text-slate-700 dark:text-slate-300 text-sm">{contraindication}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Side effects */}
                  {med.sideEffects && med.sideEffects.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-yellow-600 dark:text-yellow-400">Side Effects</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {med.sideEffects.map((effect, index) => (
                          <li key={index} className="text-slate-700 dark:text-slate-300 text-sm">{effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Notes */}
                  {med.notes && (
                    <div className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-100 dark:border-yellow-900/50 text-slate-700 dark:text-slate-300">
                      <span className="font-medium">Note: </span>{med.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DosingPage;