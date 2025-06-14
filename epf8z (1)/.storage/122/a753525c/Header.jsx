import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function Header() {
  const { patientWeight, patientAge, isOffline } = useAppContext();
  const location = useLocation();
  const [title, setTitle] = useState('Pediatric Emergency Care');

  // Update title based on current route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') {
      setTitle('Pediatric Emergency Care');
      return;
    }

    // Map paths to titles
    const pathTitles = {
      '/algorithms': 'PALS Algorithms',
      '/dosing': 'Medication Dosing',
      '/equipment': 'Equipment Sizing',
      '/parameters': 'Vital Signs',
      '/checklists': 'Checklists',
      '/cpr': 'CPR Assistant',
      '/contacts': 'Emergency Contacts',
    };

    // Handle algorithm detail pages
    if (path.startsWith('/algorithm/')) {
      setTitle('Algorithm Details');
      return;
    }

    setTitle(pathTitles[path] || 'Pediatric Emergency Care');
  }, [location]);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">{title}</h1>
        
        <div className="flex items-center">
          {/* Show patient info if available */}
          {(patientWeight || patientAge) && (
            <div className="text-xs mr-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg">
              {patientWeight && <span>{patientWeight} kg</span>}
              {patientWeight && patientAge && <span> · </span>}
              {patientAge && <span>{patientAge} m</span>}
            </div>
          )}
          
          {/* Offline indicator */}
          {isOffline && (
            <div className="ml-2 px-2 py-1 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a5 5 0 010-7.072m-6.364-.404l6.364 6.364m-9.9-3.636a9 9 0 1212.728 0" />
              </svg>
              Offline
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
