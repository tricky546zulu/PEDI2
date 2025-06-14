import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OfflineStorage from '../utils/offlineStorage';

// Create Context
const AppContext = createContext();

// Context Provider Component
export function AppProvider({ children }) {
  // Patient data state
  const [patientWeight, setPatientWeight] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user preference is stored
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // Otherwise use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Offline state
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineStorage] = useState(new OfflineStorage());

  // Initialize offline storage
  useEffect(() => {
    const initStorage = async () => {
      try {
        await offlineStorage.init();
        console.log('Offline storage initialized');
      } catch (error) {
        console.error('Failed to initialize offline storage:', error);
      }
    };

    initStorage();
  }, [offlineStorage]);

  // Load patient data from localStorage
  useEffect(() => {
    try {
      const savedWeight = localStorage.getItem('patientWeight');
      if (savedWeight) setPatientWeight(parseFloat(savedWeight));
      
      const savedAge = localStorage.getItem('patientAge');
      if (savedAge) setPatientAge(parseInt(savedAge, 10));
    } catch (error) {
      console.error('Error loading patient data from localStorage:', error);
    }
  }, []);

  // Update darkMode in localStorage and body classes
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Update body class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update patient data in localStorage when changed
  useEffect(() => {
    if (patientWeight !== null) {
      localStorage.setItem('patientWeight', patientWeight.toString());
    }
    if (patientAge !== null) {
      localStorage.setItem('patientAge', patientAge.toString());
    }
  }, [patientWeight, patientAge]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Function to update patient data
  const updatePatientData = (weight, age) => {
    setPatientWeight(weight);
    setPatientAge(age);
    setShowPatientModal(false);
  };

  // Provider value
  const contextValue = {
    patientWeight,
    patientAge,
    showPatientModal,
    setShowPatientModal,
    updatePatientData,
    darkMode,
    toggleDarkMode,
    isOffline,
    offlineStorage
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Type checking for props
AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
