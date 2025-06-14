import React from 'react';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAppContext } from '../contexts/AppContext';

function Header() {
  const location = useLocation();
  const { setShowPatientModal } = useAppContext();
  
  // Define route titles
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Check for paths with dynamic segments
    if (path.startsWith('/algorithm/')) {
      return 'Algorithm Details';
    }
    
    // Static routes
    switch (path) {
      case '/':
        return 'Pediatric Emergency Care';
      case '/algorithms':
        return 'PALS Algorithms';
      case '/dosing':
        return 'Medication Dosing';
      case '/equipment':
        return 'Equipment Sizing';
      case '/parameters':
        return 'Physiological Parameters';
      case '/cpr':
        return 'CPR Assistant';
      case '/checklists':
        return 'Procedure Checklists';
      case '/contacts':
        return 'Emergency Contacts';
      default:
        return 'Pediatric Emergency Care';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-800 dark:text-white">{getPageTitle()}</h1>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowPatientModal(true)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
            aria-label="Set Patient Info"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
