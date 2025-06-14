import React, { createContext, useContext, useState, useEffect } from 'react';
import OfflineStorage from '../utils/offlineStorage';

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  // State for patient information
  const [patientWeight, setPatientWeight] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Offline state
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlineStorage] = useState(new OfflineStorage());

  // Initialize offline storage
  useEffect(() => {
    const initStorage = async () => {
      try {
        await offlineStorage.init();
      } catch (error) {
        console.error("Failed to initialize offline storage:", error);
      }
    };

    initStorage();
    
    // Check for online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Load patient data from localStorage
    const loadPatientData = () => {
      try {
        const savedWeight = localStorage.getItem('patientWeight');
        const savedAge = localStorage.getItem('patientAge');
        
        if (savedWeight) {
          setPatientWeight(parseFloat(savedWeight));
        }
        
        if (savedAge) {
          setPatientAge(parseInt(savedAge));
        }
      } catch (error) {
        console.error("Error loading patient data from localStorage:", error);
      }
    };
    
    // Load dark mode preference
    const loadDarkMode = () => {
      // Check localStorage first
      const savedDarkMode = localStorage.getItem('darkMode');
      
      if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    };
    
    loadPatientData();
    loadDarkMode();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineStorage]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Handle patient data update
  const updatePatientData = (weight, age) => {
    if (weight) {
      setPatientWeight(weight);
      localStorage.setItem('patientWeight', weight);
    } else {
      setPatientWeight(null);
      localStorage.removeItem('patientWeight');
    }
    
    if (age) {
      setPatientAge(age);
      localStorage.setItem('patientAge', age);
    } else {
      setPatientAge(null);
      localStorage.removeItem('patientAge');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Context value
  const contextValue = {
    patientWeight,
    patientAge,
    showPatientModal,
    setShowPatientModal,
    updatePatientData,
    darkMode,
    toggleDarkMode,
    offlineStorage,
    isOffline
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
