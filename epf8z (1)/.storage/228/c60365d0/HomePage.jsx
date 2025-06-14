import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import algorithms from '../data/algorithms';

function HomePage() {
  const { 
    patientWeight, 
    patientAge, 
    setShowPatientModal,
    isOffline,
    darkMode
  } = useAppContext();

  // Group algorithms by category
  const algorithmCategories = algorithms.reduce((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  }, {});

  // Function to get icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cardiac arrest':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'bradycardia':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      case 'tachycardia':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'shock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'post resuscitation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Get category style
  const getCategoryStyle = (category) => {
    switch (category) {
      case 'cardiac arrest':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'bradycardia':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'tachycardia':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'shock':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'post resuscitation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Information Banner */}
      <div className={`p-4 rounded-lg ${patientWeight || patientAge ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'} border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Patient Information</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            {patientWeight || patientAge ? 'Edit' : 'Add'}
          </button>
        </div>

        {patientWeight || patientAge ? (
          <div className="mt-2 space-y-1">
            {patientWeight && (
              <p className="text-slate-700 dark:text-slate-300">
                Weight: <span className="font-medium">{patientWeight} kg</span> ({(patientWeight * 2.2).toFixed(1)} lb)
              </p>
            )}
            {patientAge && (
              <p className="text-slate-700 dark:text-slate-300">
                Age: <span className="font-medium">
                  {patientAge >= 24 ? `${Math.floor(patientAge / 12)} years` : `${patientAge} months`}
                </span>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Add patient information for weight-based calculations and age-appropriate guidance
          </p>
        )}
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/algorithms" className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} flex flex-col items-center justify-center text-center`}>
            <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
            <span className="font-medium">Algorithms</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">PALS guidelines</span>
          </Link>
          <Link to="/dosing" className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} flex flex-col items-center justify-center text-center`}>
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="font-medium">Dosing</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Weight-based calculations</span>
          </Link>
          <Link to="/equipment" className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} flex flex-col items-center justify-center text-center`}>
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="font-medium">Equipment</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Size selection</span>
          </Link>
          <Link to="/cpr" className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} flex flex-col items-center justify-center text-center`}>
            <div className="rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-medium">CPR</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">Resuscitation assistant</span>
          </Link>
        </div>
      </div>

      {/* PALS Algorithms Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">PALS Algorithms</h2>
        
        <div className="space-y-3">
          {Object.entries(algorithmCategories).map(([category, algos]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`rounded-full p-1.5 ${getCategoryStyle(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="font-medium capitalize">{category}</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {algos.map(algorithm => (
                  <Link 
                    key={algorithm.id} 
                    to={`/algorithm/${algorithm.id}`}
                    className={`p-3 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} hover:shadow-md transition-shadow flex justify-between items-center`}
                  >
                    <div>
                      <h4 className="font-medium">{algorithm.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{algorithm.description}</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${getCategoryStyle(category)} flex items-center justify-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offline Status */}
      {isOffline && (
        <div className="fixed bottom-20 left-0 right-0 mx-auto w-max bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          You are currently offline
        </div>
      )}
    </div>
  );
}

export default HomePage;
