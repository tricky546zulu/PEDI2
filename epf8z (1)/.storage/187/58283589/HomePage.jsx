import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function HomePage() {
  const { patientWeight, patientAge, setShowPatientModal, isOffline } = useAppContext();
  const [lastVisitedSections, setLastVisitedSections] = useState([]);
  
  // Load last visited sections from localStorage
  useEffect(() => {
    try {
      const savedSections = localStorage.getItem('lastVisitedSections');
      if (savedSections) {
        setLastVisitedSections(JSON.parse(savedSections));
      }
    } catch (error) {
      console.error('Error loading last visited sections:', error);
    }
  }, []);

  // Quick action cards data
  const quickActions = [
    {
      title: 'PALS Algorithms',
      description: 'Step-by-step emergency algorithms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      ),
      path: '/algorithms',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    },
    {
      title: 'Medication Dosing',
      description: 'Weight-based medication calculations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      path: '/dosing',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      needsWeight: true
    },
    {
      title: 'Equipment Sizing',
      description: 'Age and weight-based equipment guidance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      path: '/equipment',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      needsPatientData: true
    },
    {
      title: 'CPR Assistant',
      description: 'Timer and medication tracking for resuscitation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      path: '/cpr',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Offline indicator */}
      {isOffline && (
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-3 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>You're currently offline. Using cached data.</span>
        </div>
      )}

      {/* Patient Information */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium">Patient Information</h2>
            {patientWeight || patientAge ? (
              <div className="mt-2 space-y-1">
                {patientWeight && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Weight: <span className="font-medium">{patientWeight} kg</span> 
                    <span className="text-xs ml-1">({(patientWeight * 2.2).toFixed(1)} lb)</span>
                  </p>
                )}
                {patientAge && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Age: <span className="font-medium">
                      {patientAge >= 24 
                        ? `${Math.floor(patientAge / 12)} years` 
                        : `${patientAge} months`}
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">No patient information set</p>
            )}
          </div>

          <button
            onClick={() => setShowPatientModal(true)}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {patientWeight || patientAge ? 'Edit' : 'Set Patient Info'}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link 
              key={action.path}
              to={action.path}
              className={`p-4 rounded-lg shadow-sm flex flex-col ${action.color}`}
            >
              <div className="mb-2">
                {action.icon}
              </div>
              <h3 className="font-medium mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
              
              {/* Show indicator if weight is needed */}
              {action.needsWeight && !patientWeight && (
                <div className="mt-2 flex items-center text-xs bg-white bg-opacity-50 dark:bg-slate-900 dark:bg-opacity-50 px-2 py-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Set weight for dosing
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Visited */}
      {lastVisitedSections.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Recently Visited</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
            {lastVisitedSections.map((section, index) => (
              <Link
                key={index}
                to={section.path}
                className="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="mr-3 p-2 rounded-full bg-slate-100 dark:bg-slate-700">
                  {section.icon || (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{section.title}</h3>
                  {section.subtitle && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{section.subtitle}</p>
                  )}
                </div>
                <div className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Resources */}
      <div>
        <h2 className="text-lg font-medium mb-3">Emergency Resources</h2>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Emergency Contacts</h3>
            <Link to="/contacts" className="text-sm text-blue-600 dark:text-blue-400">
              View All
            </Link>
          </div>
          <Link to="/contacts" className="flex items-center p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg mb-3">
            <div className="mr-3 p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Poison Control</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">1-800-222-1222</p>
            </div>
          </Link>

          <div className="flex justify-between items-center mb-4 mt-6">
            <h3 className="font-medium">Reference Tools</h3>
            <Link to="/parameters" className="text-sm text-blue-600 dark:text-blue-400">
              View More
            </Link>
          </div>
          <div className="flex space-x-3">
            <Link to="/parameters" className="flex-1 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-center">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mx-auto w-10 h-10 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium">Vital Signs</h4>
            </Link>

            <Link to="/checklists" className="flex-1 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-center">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 mx-auto w-10 h-10 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-sm font-medium">Checklists</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
