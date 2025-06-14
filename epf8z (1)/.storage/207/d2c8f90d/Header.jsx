import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import DarkModeToggle from './DarkModeToggle';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleDarkMode, darkMode } = useAppContext();
  
  // Helper function to get the header title based on current path
  const getHeaderTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Pediatric Emergency Care';
    if (path === '/algorithms') return 'PALS Algorithms';
    if (path.startsWith('/algorithm/')) return 'Algorithm Details';
    if (path === '/dosing') return 'Medication Dosing';
    if (path === '/equipment') return 'Equipment Sizing';
    if (path === '/parameters') return 'Physiological Parameters';
    if (path === '/cpr') return 'CPR Assistant';
    if (path === '/checklists') return 'Checklists';
    if (path === '/contacts') return 'Emergency Contacts';
    
    return 'Pediatric Emergency Care';
  };
  
  // Check if the current page should show a back button
  const shouldShowBackButton = () => {
    const path = location.pathname;
    return path !== '/' && 
           !path.endsWith('/algorithms') && 
           !path.endsWith('/dosing') && 
           !path.endsWith('/equipment') && 
           !path.endsWith('/parameters') && 
           !path.endsWith('/cpr');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 ${darkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'} border-b px-4 py-3 shadow-sm`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {shouldShowBackButton() && (
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-lg font-semibold">{getHeaderTitle()}</h1>
        </div>
        
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
}

export default Header;
