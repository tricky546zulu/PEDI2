import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AppContext
const AppContext = createContext();

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State for patient information
  const [patientWeight, setPatientWeight] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [patientLength, setPatientLength] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  
  // State for app preferences
  const [darkMode, setDarkMode] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // State for offline storage
  const [offlineStorage, setOfflineStorage] = useState({
    isAvailable: false,
    db: null,
    storeData: async () => {},
    getData: async () => {},
    deleteData: async () => {}
  });

  // Effect to initialize the app
  useEffect(() => {
    // Load patient data from localStorage
    const savedWeight = localStorage.getItem('patientWeight');
    const savedAge = localStorage.getItem('patientAge');
    const savedLength = localStorage.getItem('patientLength');
    
    if (savedWeight) setPatientWeight(parseFloat(savedWeight));
    if (savedAge) setPatientAge(parseInt(savedAge));
    if (savedLength) setPatientLength(parseInt(savedLength));
    
    // Load dark mode preference
    const darkModePref = localStorage.getItem('darkMode') === 'true';
    setDarkMode(darkModePref);
    
    if (darkModePref) {
      document.documentElement.classList.add('dark');
    }
    
    // Set up online/offline detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initialize IndexedDB for offline storage
    const initIndexedDB = () => {
      const request = indexedDB.open('PediatricEmergencyCare', 1);
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        setOfflineStorage(prev => ({
          ...prev,
          isAvailable: false
        }));
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for different types of data
        if (!db.objectStoreNames.contains('algorithms')) {
          db.createObjectStore('algorithms', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('medications')) {
          db.createObjectStore('medications', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('equipment')) {
          db.createObjectStore('equipment', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('checklists')) {
          db.createObjectStore('checklists', { keyPath: 'id' });
        }
      };
      
      request.onsuccess = (event) => {
        const db = event.target.result;
        
        // Define storage functions
        const storeData = async (storeName, data) => {
          return new Promise((resolve, reject) => {
            try {
              const transaction = db.transaction(storeName, 'readwrite');
              const store = transaction.objectStore(storeName);
              
              // Handle array or single item
              if (Array.isArray(data)) {
                const promises = data.map(item => {
                  return new Promise((res, rej) => {
                    const request = store.put(item);
                    request.onsuccess = () => res();
                    request.onerror = (e) => rej(e.target.error);
                  });
                });
                
                Promise.all(promises).then(() => resolve()).catch(e => reject(e));
              } else {
                const request = store.put(data);
                request.onsuccess = () => resolve();
                request.onerror = (e) => reject(e.target.error);
              }
            } catch (error) {
              reject(error);
            }
          });
        };
        
        const getData = async (storeName, id = null) => {
          return new Promise((resolve, reject) => {
            try {
              const transaction = db.transaction(storeName, 'readonly');
              const store = transaction.objectStore(storeName);
              
              if (id) {
                // Get specific item by ID
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(e.target.error);
              } else {
                // Get all items
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(e.target.error);
              }
            } catch (error) {
              reject(error);
            }
          });
        };
        
        const deleteData = async (storeName, id) => {
          return new Promise((resolve, reject) => {
            try {
              const transaction = db.transaction(storeName, 'readwrite');
              const store = transaction.objectStore(storeName);
              
              const request = store.delete(id);
              request.onsuccess = () => resolve();
              request.onerror = (e) => reject(e.target.error);
            } catch (error) {
              reject(error);
            }
          });
        };
        
        setOfflineStorage({
          isAvailable: true,
          db,
          storeData,
          getData,
          deleteData
        });
      };
    };
    
    initIndexedDB();
    
    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Handle patient data updates
  const updatePatientData = (weight, age, length) => {
    if (weight !== undefined) {
      setPatientWeight(weight);
      localStorage.setItem('patientWeight', weight);
    }
    
    if (age !== undefined) {
      setPatientAge(age);
      localStorage.setItem('patientAge', age);
    }
    
    if (length !== undefined) {
      setPatientLength(length);
      localStorage.setItem('patientLength', length);
    }
  };
  
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Handle resetting patient data
  const resetPatientData = () => {
    setPatientWeight(null);
    setPatientAge(null);
    setPatientLength(null);
    localStorage.removeItem('patientWeight');
    localStorage.removeItem('patientAge');
    localStorage.removeItem('patientLength');
  };

  return (
    <AppContext.Provider
      value={{
        patientWeight,
        patientAge,
        patientLength,
        showPatientModal,
        setShowPatientModal,
        updatePatientData,
        resetPatientData,
        darkMode,
        toggleDarkMode,
        isOffline,
        offlineStorage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
