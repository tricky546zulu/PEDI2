import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAppContext } from '../contexts/AppContext';

function Header() {
  const location = useLocation();
  const { setShowPatientModal } = useAppContext();
  
  // Function to get title based on current route
  const getRouteTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Pediatric Emergency Care';
      case '/algorithms':
        return 'PALS Algorithms';
      case '/dosing':
        return 'Medication Dosing';
      case '/equipment':
        return 'Equipment Sizing';
      case '/parameters':
        return 'Vital Signs Reference';
      case '/checklists':
        return 'Clinical Checklists';
      case '/cpr':
        return 'CPR Assistant';
      case '/contacts':
        return 'Emergency Contacts';
      default:
        if (location.pathname.startsWith('/algorithms/')) {
          return 'Algorithm Details';
        }
        return 'Pediatric Emergency Care';
    }
  };
  
  // Function to determine if back button should be shown
  const shouldShowBackButton = () => {
    return location.pathname !== '/' && 
           !location.pathname.match(/^\/(algorithms|dosing|equipment|parameters|checklists|cpr|contacts)$/);
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {shouldShowBackButton() && (
            <Link 
              to={location.pathname.startsWith('/algorithms/') ? '/algorithms' : '/'}
              aria-label="Go back"
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <h1 className="text-lg font-bold">{getRouteTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPatientModal(true)}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Patient Info"
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
