import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function HomePage() {
  const { 
    setShowPatientModal, 
    patientWeight, 
    patientAge, 
    offlineStorage, 
    isOffline 
  } = useAppContext();
  const [dataLoadStatus, setDataLoadStatus] = useState({
    algorithms: false,
    medications: false,
    equipment: false,
    vitalSigns: false
  });

  // Features of the application
  const features = [
    {
      id: 'algorithms',
      title: 'PALS Algorithms',
      description: 'Step-by-step guides for pediatric advanced life support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      link: '/algorithms',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      iconColor: 'text-red-700 dark:text-red-400'
    },
    {
      id: 'dosing',
      title: 'Medication Dosing',
      description: 'Quick weight-based medication calculations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/dosing',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      iconColor: 'text-green-700 dark:text-green-400'
    },
    {
      id: 'equipment',
      title: 'Equipment Sizing',
      description: 'Determine appropriate equipment sizes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/equipment',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      iconColor: 'text-blue-700 dark:text-blue-400'
    },
    {
      id: 'parameters',
      title: 'Vital Signs',
      description: 'Normal ranges by age group',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/parameters',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      iconColor: 'text-purple-700 dark:text-purple-400'
    },
    {
      id: 'cpr',
      title: 'CPR Assistant',
      description: 'Timer and guidance for CPR',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: '/cpr',
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
      iconColor: 'text-pink-700 dark:text-pink-400'
    },
    {
      id: 'checklists',
      title: 'Checklists',
      description: 'Custom procedure checklists',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      link: '/checklists',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      iconColor: 'text-yellow-700 dark:text-yellow-400'
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      description: 'Quick access to important numbers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      link: '/contacts',
      color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300',
      iconColor: 'text-indigo-700 dark:text-indigo-400'
    }
  ];

  // Load static data when app is initialized
  useEffect(() => {
    const initializeData = async () => {
      if (!offlineStorage.isAvailable) return;

      try {
        // Dynamic imports for static data
        const algorithms = (await import('../data/algorithms')).default;
        const medications = (await import('../data/medications')).default;
        const equipmentSizes = (await import('../data/equipmentSizes')).default;
        const vitalSigns = (await import('../data/vitalSigns')).default;
        
        // Store data in IndexedDB for offline use
        await offlineStorage.populateInitialData('algorithms', algorithms);
        setDataLoadStatus(prev => ({ ...prev, algorithms: true }));
        
        await offlineStorage.populateInitialData('medications', medications);
        setDataLoadStatus(prev => ({ ...prev, medications: true }));
        
        await offlineStorage.populateInitialData('equipment', equipmentSizes);
        setDataLoadStatus(prev => ({ ...prev, equipment: true }));
        
        await offlineStorage.populateInitialData('vitalSigns', vitalSigns);
        setDataLoadStatus(prev => ({ ...prev, vitalSigns: true }));
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, [offlineStorage]);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-slate-800 rounded-lg p-6 mb-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-2">
            Pediatric Emergency Care
          </h1>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Evidence-based guidance for pediatric emergencies
          </p>
          
          {/* Patient Information Button */}
          <button
            onClick={() => setShowPatientModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {patientWeight || patientAge ? 'Update Patient Info' : 'Set Patient Info'}
          </button>
          
          {/* Patient Info Display */}
          {(patientWeight || patientAge) && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Current Patient:</h3>
              <div className="text-slate-700 dark:text-slate-300">
                {patientWeight && <span className="mr-2">Weight: {patientWeight} kg</span>}
                {patientAge && (
                  <span>
                    Age: {patientAge} months 
                    ({(patientAge / 12).toFixed(1)} years)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Loading status for data */}
      {!Object.values(dataLoadStatus).every(Boolean) && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md">
          <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Loading reference data...
          </p>
        </div>
      )}
      
      {/* Offline Status */}
      {isOffline && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md">
          <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You are currently offline. The app will continue to work with previously loaded data.
          </p>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.link}
            className="block bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="flex items-start">
              <div className={`rounded-full p-2 mr-3 ${feature.color}`}>
                <div className={feature.iconColor}>{feature.icon}</div>
              </div>
              <div>
                <h2 className="font-bold text-lg mb-1">{feature.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Disclaimer */}
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p className="mb-1"><strong>Disclaimer:</strong> This application is intended as a reference tool only. Always defer to local protocols and medical direction.</p>
        <p>Data is stored locally on your device and can be accessed offline after initial download.</p>
      </div>
    </div>
  );
}

export default HomePage;
