import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import DarkModeToggle from './DarkModeToggle';

function Header() {
  const location = useLocation();
  const { showPatientModal, setShowPatientModal } = useAppContext();
  
  // Map routes to page titles
  const getTitleFromPath = (path) => {
    const routes = {
      '/': 'Home',
      '/algorithms': 'PALS Algorithms',
      '/dosing': 'Medication Dosing',
      '/equipment': 'Equipment Sizing',
      '/parameters': 'Vital Signs',
      '/checklists': 'Checklists',
      '/cpr': 'CPR Assistant',
      '/contacts': 'Emergency Contacts'
    };
    
    // Handle algorithm details page
    if (path.startsWith('/algorithm/')) {
      return 'Algorithm Details';
    }
    
    return routes[path] || 'Not Found';
  };
  
  const pageTitle = getTitleFromPath(location.pathname);
  
  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">{pageTitle}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowPatientModal(true)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Patient Information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
