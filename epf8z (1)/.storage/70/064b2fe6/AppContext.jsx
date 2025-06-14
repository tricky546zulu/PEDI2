import React, { createContext, useContext, useState, useEffect } from 'react';
import { IndexedDBStorage, isOffline, registerServiceWorker } from '../utils/offlineStorage';

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Patient information state
  const [patientWeight, setPatientWeight] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [patientLength, setPatientLength] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  
  // App state
  const [darkMode, setDarkMode] = useState(false);
  const [isAppOffline, setIsAppOffline] = useState(isOffline());
  const [offlineStorage] = useState(new IndexedDBStorage());
  
  // Load saved patient data from localStorage
  useEffect(() => {
    const loadPatientData = () => {
      try {
        const savedPatientData = JSON.parse(localStorage.getItem('currentPatient') || 'null');
        if (savedPatientData) {
          setPatientWeight(savedPatientData.weight || null);
          setPatientAge(savedPatientData.age || null);
          setPatientLength(savedPatientData.length || null);
        }
      } catch (error) {
        console.error('Error loading patient data from localStorage:', error);
      }
    };
    
    loadPatientData();
  }, []);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Update patient data in localStorage when it changes
  useEffect(() => {
    const currentPatient = {
      weight: patientWeight,
      age: patientAge,
      length: patientLength,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
    
    // Save to patient history if data is valid
    if (patientWeight || patientAge) {
      const patientHistory = JSON.parse(localStorage.getItem('patientHistory') || '[]');
      patientHistory.unshift(currentPatient);
      
      // Keep only last 10 entries
      if (patientHistory.length > 10) {
        patientHistory.pop();
      }
      
      localStorage.setItem('patientHistory', JSON.stringify(patientHistory));
    }
  }, [patientWeight, patientAge, patientLength]);

  // Update dark mode in localStorage and apply class
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Register service worker for offline capabilities
  useEffect(() => {
    registerServiceWorker();
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOffline = () => {
      setIsAppOffline(true);
      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pediatric Emergency Care App', {
          body: 'You are now offline. The app will continue to function with cached data.'
        });
      }
    };
    
    const handleOnline = () => {
      setIsAppOffline(false);
      // Show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pediatric Emergency Care App', {
          body: 'You are back online. Data will now sync.'
        });
      }
    };
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Initialize IndexedDB
  useEffect(() => {
    const initializeDB = async () => {
      try {
        if (offlineStorage && offlineStorage.isAvailable) {
          await offlineStorage.openDB();
          console.log('IndexedDB initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      }
    };
    
    initializeDB();
  }, [offlineStorage]);

  // Request notification permission
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        await Notification.requestPermission();
      }
    };
    
    requestNotificationPermission();
  }, []);

  const updatePatientData = (data) => {
    if (data.weight !== undefined) setPatientWeight(data.weight);
    if (data.age !== undefined) setPatientAge(data.age);
    if (data.length !== undefined) setPatientLength(data.length);
    setShowPatientModal(false);
  };

  const clearPatientData = () => {
    setPatientWeight(null);
    setPatientAge(null);
    setPatientLength(null);
    setShowPatientModal(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      // Patient data
      patientWeight,
      patientAge,
      patientLength,
      showPatientModal,
      setShowPatientModal,
      updatePatientData,
      clearPatientData,
      
      // App state
      darkMode,
      toggleDarkMode,
      isOffline: isAppOffline,
      offlineStorage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
