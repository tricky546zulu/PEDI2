import { useState, useEffect } from 'react';

export const useOfflineStorage = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [db, setDb] = useState(null);
  
  // Initialize IndexedDB on component mount
  useEffect(() => {
    const checkAndInitializeDB = async () => {
      // Check if IndexedDB is available
      if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported. Offline storage will not be available.');
        setIsAvailable(false);
        return;
      }
      
      try {
        // Open/create database
        const request = indexedDB.open('PediatricEmergencyCareDB', 1);
        
        // Handle database creation/upgrade
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          
          // Create object stores if they don't exist
          if (!db.objectStoreNames.contains('algorithms')) {
            db.createObjectStore('algorithms', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('medications')) {
            db.createObjectStore('medications', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('equipment')) {
            db.createObjectStore('equipment', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('vitalSigns')) {
            db.createObjectStore('vitalSigns', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('checklists')) {
            db.createObjectStore('checklists', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('contacts')) {
            db.createObjectStore('contacts', { keyPath: 'id' });
          }
          
          if (!db.objectStoreNames.contains('patientData')) {
            db.createObjectStore('patientData', { keyPath: 'id' });
          }
        };
        
        // Handle success
        request.onsuccess = (event) => {
          const database = event.target.result;
          setDb(database);
          setIsAvailable(true);
          console.info('IndexedDB initialized successfully');
        };
        
        // Handle errors
        request.onerror = (event) => {
          console.error('Error initializing IndexedDB:', event.target.error);
          setIsAvailable(false);
        };
      } catch (error) {
        console.error('Error setting up IndexedDB:', error);
        setIsAvailable(false);
      }
    };
    
    checkAndInitializeDB();
    
    // Clean up function to close database connection
    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);
  
  // Function to store data
  const storeData = async (storeName, data) => {
    if (!isAvailable || !db) {
      console.warn('IndexedDB not available. Data not stored.');
      return false;
    }
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // Handle array of items or single item
        const request = Array.isArray(data) 
          ? Promise.all(data.map(item => store.put(item)))
          : store.put(data);
        
        transaction.oncomplete = () => {
          resolve(true);
        };
        
        transaction.onerror = (event) => {
          console.error('Error storing data:', event.target.error);
          reject(event.target.error);
        };
      } catch (error) {
        console.error('Transaction error:', error);
        reject(error);
      }
    });
  };
  
  // Function to retrieve data
  const getData = async (storeName, key = null) => {
    if (!isAvailable || !db) {
      console.warn('IndexedDB not available. Cannot retrieve data.');
      return null;
    }
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        
        let request;
        
        if (key) {
          // Get specific item by key
          request = store.get(key);
          request.onsuccess = () => {
            resolve(request.result);
          };
        } else {
          // Get all items in the store
          const allData = [];
          request = store.openCursor();
          
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              allData.push(cursor.value);
              cursor.continue();
            } else {
              resolve(allData);
            }
          };
        }
        
        request.onerror = (event) => {
          console.error('Error retrieving data:', event.target.error);
          reject(event.target.error);
        };
      } catch (error) {
        console.error('Transaction error:', error);
        reject(error);
      }
    });
  };
  
  // Function to delete data
  const deleteData = async (storeName, key) => {
    if (!isAvailable || !db) {
      console.warn('IndexedDB not available. Cannot delete data.');
      return false;
    }
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        
        request.onsuccess = () => {
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error('Error deleting data:', event.target.error);
          reject(event.target.error);
        };
      } catch (error) {
        console.error('Transaction error:', error);
        reject(error);
      }
    });
  };
  
  // Function to clear all data in a store
  const clearStore = async (storeName) => {
    if (!isAvailable || !db) {
      console.warn('IndexedDB not available. Cannot clear store.');
      return false;
    }
    
    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        
        request.onsuccess = () => {
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error('Error clearing store:', event.target.error);
          reject(event.target.error);
        };
      } catch (error) {
        console.error('Transaction error:', error);
        reject(error);
      }
    });
  };
  
  return {
    isAvailable,
    storeData,
    getData,
    deleteData,
    clearStore
  };
};
