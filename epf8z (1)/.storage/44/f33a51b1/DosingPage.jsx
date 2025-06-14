import React, { useState, useEffect } from 'react';
import RapidDosing from '../components/RapidDosing';
import { useAppContext } from '../contexts/AppContext';

function DosingPage() {
  const { patientWeight, setShowPatientModal } = useAppContext();
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Medication categories
  const categories = [
    { id: 'all', name: 'All Medications' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'resuscitation', name: 'Resuscitation' },
    { id: 'sedation', name: 'Sedation' },
    { id: 'seizure', name: 'Seizure' },
    { id: 'analgesia', name: 'Pain Management' },
    { id: 'antibiotics', name: 'Antibiotics' }
  ];
  
  // Load medications data
  useEffect(() => {
    const loadMedications = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const medicationsData = [
        {
          id: 'epinephrine',
          name: 'Epinephrine',
          category: 'emergency',
          indication: 'Cardiac arrest, severe allergic reaction',
          concentration: '1 mg/10 mL (0.1 mg/mL)',
          standardDose: '0.01 mg/kg (0.1 mL/kg)',
          dosePerKg: 0.01,
          maxDose: 1,
          doseUnit: 'mg',
          notes: 'Maximum single dose: 1 mg. Repeat every 3-5 min as needed.'
        },
        {
          id: 'amiodarone',
          name: 'Amiodarone',
          category: 'resuscitation',
          indication: 'VF/pulseless VT refractory to defibrillation',
          concentration: '50 mg/mL',
          standardDose: '5 mg/kg',
          dosePerKg: 5,
          maxDose: 300,
          doseUnit: 'mg',
          notes: 'Maximum single dose: 300 mg'
        },
        {
          id: 'adenosine',
          name: 'Adenosine',
          category: 'emergency',
          indication: 'SVT',
          concentration: '3 mg/mL',
          standardDose: '0.1 mg/kg (first dose), 0.2 mg/kg (subsequent)',
          dosePerKg: 0.1,
          maxDose: 6,
          doseUnit: 'mg',
          notes: 'First dose: 0.1 mg/kg (max 6 mg). Second dose: 0.2 mg/kg (max 12 mg). Rapid IV push with saline flush.'
        },
        {
          id: 'midazolam',
          name: 'Midazolam',
          category: 'sedation',
          indication: 'Sedation, seizures',
          concentration: '5 mg/mL',
          standardDose: '0.1 mg/kg',
          dosePerKg: 0.1,
          maxDose: 5,
          doseUnit: 'mg',
          notes: 'May repeat every 5-10 minutes as needed. Maximum single dose: 5 mg.'
        },
        {
          id: 'fentanyl',
          name: 'Fentanyl',
          category: 'analgesia',
          indication: 'Pain management',
          concentration: '50 mcg/mL',
          standardDose: '1 mcg/kg',
          dosePerKg: 1,
          maxDose: 50,
          doseUnit: 'mcg',
          notes: 'Slow IV push. May cause respiratory depression and hypotension.'
        },
        {
          id: 'diazepam',
          name: 'Diazepam',
          category: 'seizure',
          indication: 'Status epilepticus',
          concentration: '5 mg/mL',
          standardDose: '0.2-0.5 mg/kg',
          dosePerKg: 0.3,
          maxDose: 10,
          doseUnit: 'mg',
          notes: 'May repeat in 5-10 minutes if needed. Maximum dose: 10 mg.'
        },
        {
          id: 'ceftriaxone',
          name: 'Ceftriaxone',
          category: 'antibiotics',
          indication: 'Bacterial infection, meningitis',
          concentration: '100 mg/mL after reconstitution',
          standardDose: '50-100 mg/kg',
          dosePerKg: 75,
          maxDose: 2000,
          doseUnit: 'mg',
          notes: 'Meningitis: 100 mg/kg. Other infections: 50-75 mg/kg.'
        },
        {
          id: 'dextrose',
          name: 'Dextrose 10%',
          category: 'emergency',
          indication: 'Hypoglycemia',
          concentration: '100 mg/mL',
          standardDose: '5 mL/kg',
          dosePerKg: 0.5, // 0.5 g/kg or 5 mL/kg of D10W
          maxDose: 25,
          doseUnit: 'g',
          notes: 'For neonates: use D10W (2-4 mL/kg)'
        }
      ];
      
      setMedications(medicationsData);
      setIsLoading(false);
    };
    
    loadMedications();
  }, []);
  
  // Filter medications based on search query and selected category
  const filteredMedications = medications.filter(med => {
    const matchesSearch = searchQuery === '' || 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indication.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Patient Weight Banner */}
      {!patientWeight && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg shadow-sm text-center">
          <p className="text-yellow-800 dark:text-yellow-200">
            Enter patient weight for accurate dose calculations
          </p>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="mt-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium"
          >
            Add Patient Weight
          </button>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-3">
          <label htmlFor="search" className="sr-only">Search Medications</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-1 space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Medications List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMedications.length > 0 ? (
            filteredMedications.map(med => (
              <RapidDosing key={med.id} medication={med} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">No medications match your search.</p>
              <button 
                className="mt-4 text-blue-600 dark:text-blue-400"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">Medication Dosing Calculator</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Enter patient weight to calculate recommended medication doses. All dosing is based on standard 
          pediatric emergency care guidelines. Always verify dosages before administration.
        </p>
      </div>
    </div>
  );
}

export default DosingPage;
