import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function HomePage() {
  const { patientWeight, patientAge, setShowPatientModal, isOffline } = useAppContext();
  const [recentAlgorithms, setRecentAlgorithms] = useState([]);
  
  // Load recent algorithms from localStorage
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedAlgorithms') || '[]');
    setRecentAlgorithms(recentlyViewed.slice(0, 3)); // Show only last 3 viewed
  }, []);

  // Feature cards for the homepage
  const features = [
    {
      title: 'PALS Algorithms',
      description: 'Step-by-step pediatric advanced life support protocols',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      link: '/algorithms',
      color: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'Medication Dosing',
      description: 'Weight-based dosing calculator for emergency medications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/dosing',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Equipment Sizing',
      description: 'Age and weight-based equipment sizing recommendations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/equipment',
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Vital Signs',
      description: 'Normal parameters by age group for quick reference',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/parameters',
      color: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'CPR Assistant',
      description: 'Timer, metronome and event logging for resuscitation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: '/cpr',
      color: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      title: 'Checklists',
      description: 'Procedure checklists to ensure all steps are followed',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      link: '/checklists',
      color: 'bg-yellow-50 dark:bg-yellow-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* App title and description */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Pediatric Emergency Care</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Evidence-based guidance for pediatric emergencies
        </p>
      </div>

      {/* Patient info card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Patient Information</h2>
          <button 
            onClick={() => setShowPatientModal(true)} 
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 dark:text-blue-300 py-1 px-3 rounded text-sm font-medium"
          >
            {patientWeight || patientAge ? 'Edit' : 'Add'}
          </button>
        </div>

        {patientWeight || patientAge ? (
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            {patientWeight && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Weight</div>
                <div className="text-xl font-bold">{patientWeight} kg</div>
              </div>
            )}
            {patientAge && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Age</div>
                <div className="text-xl font-bold">
                  {patientAge} {patientAge === 1 ? 'month' : 'months'}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 rounded-lg text-center text-sm">
            <p className="text-yellow-700 dark:text-yellow-300">
              No patient data entered yet. Add patient information to enable personalized dosing and equipment sizing.
            </p>
          </div>
        )}
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <Link 
            key={feature.title} 
            to={feature.link} 
            className={`${feature.color} border border-slate-200 dark:border-slate-700/60 rounded-lg p-4 flex flex-col items-center text-center transition-transform active:scale-95`}
          >
            <div className="mb-2">
              {feature.icon}
            </div>
            <h3 className="font-bold mb-1">{feature.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent algorithms section */}
      {recentAlgorithms.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Recently Viewed Algorithms</h2>
          <div className="space-y-2">
            {recentAlgorithms.map(algo => (
              <Link
                key={algo.id}
                to={`/algorithm/${algo.id}`}
                className="block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-700/70"
              >
                <div className="font-medium">{algo.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(algo.timestamp).toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Offline mode indicator */}
      {isOffline && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Offline Mode Active
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Using cached data. Some features may be limited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
