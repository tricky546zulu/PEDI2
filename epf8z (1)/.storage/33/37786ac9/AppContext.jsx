import React, { createContext, useContext, useState, useEffect } from 'react';
import { useOfflineStorage } from '../hooks/useOfflineStorage';

// Create the context
const AppContext = createContext(null);

// Custom provider component
export function AppProvider({ children }) {
  // Patient information
  const [patientWeight, setPatientWeight] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [patientLength, setPatientLength] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? savedMode === 'true' : false;
    }
    return false;
  });

  // Initialize offline storage
  const offlineStorage = useOfflineStorage();

  // Function to save patient data
  const savePatient = (data) => {
    setPatientWeight(data.weight);
    setPatientAge(data.age);
    setPatientLength(data.length);
    
    // Save to local storage if available
    if (typeof window !== 'undefined') {
      localStorage.setItem('patientData', JSON.stringify(data));
    }
  };

  // Function to save completed checklist
  const saveCompletedChecklist = (checklistData) => {
    if (typeof window !== 'undefined') {
      const savedChecklists = JSON.parse(localStorage.getItem('completedChecklists') || '[]');
      savedChecklists.push({
        ...checklistData,
        id: checklistData.id || Date.now(),
        timestamp: checklistData.timestamp || new Date().toISOString()
      });
      localStorage.setItem('completedChecklists', JSON.stringify(savedChecklists));
    }
  };

  // Load saved patient data on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('patientData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setPatientWeight(parsedData.weight);
          setPatientAge(parsedData.age);
          setPatientLength(parsedData.length);
        } catch (error) {
          console.error("Error parsing saved patient data:", error);
        }
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', String(newMode));
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return newMode;
    });
  };

  // Apply dark mode based on saved preference
  useEffect(() => {
    if (darkMode && typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
    }
  }, [darkMode]);

  // Context value
  const contextValue = {
    // Patient data
    patientWeight,
    patientAge,
    patientLength,
    savePatient,
    showPatientModal,
    setShowPatientModal,
    
    // Theme
    darkMode,
    toggleDarkMode,
    
    // Storage
    offlineStorage,
    saveCompletedChecklist,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
