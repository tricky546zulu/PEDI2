/**
 * offlineStorage.js - Utilities for managing offline data storage
 * 
 * This module provides functions for storing and retrieving data using
 * both IndexedDB and localStorage for offline functionality.
 */

/**
 * Initialize the local storage with default values if not already set
 */
export const initializeLocalStorage = () => {
  // Check if localStorage is available
  if (typeof window === 'undefined' || !window.localStorage) {
    console.warn('localStorage is not available. Offline features will be limited.');
    return false;
  }
  
  // Set up default empty arrays for various data types if they don't exist
  if (!localStorage.getItem('favoritedAlgorithms')) {
    localStorage.setItem('favoritedAlgorithms', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('favoritedContacts')) {
    localStorage.setItem('favoritedContacts', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('completedChecklists')) {
    localStorage.setItem('completedChecklists', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('patientHistory')) {
    localStorage.setItem('patientHistory', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('customMedications')) {
    localStorage.setItem('customMedications', JSON.stringify([]));
  }
  
  return true;
};

/**
 * Save data to localStorage with error handling
 * 
 * @param {string} key - Storage key
 * @param {any} data - Data to store (will be JSON stringified)
 * @returns {boolean} - Success status
 */
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Load data from localStorage with error handling
 * 
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key not found
 * @returns {any} - Parsed data or default value
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Save patient data to local storage
 * 
 * @param {Object} patientData - Patient information
 * @returns {boolean} - Success status
 */
export const savePatientData = (patientData) => {
  return saveToLocalStorage('patientData', patientData);
};

/**
 * Load patient data from local storage
 * 
 * @returns {Object|null} - Patient data or null if not found
 */
export const loadPatientData = () => {
  return loadFromLocalStorage('patientData', null);
};

/**
 * Save a completed checklist to history
 * 
 * @param {Object} checklist - Completed checklist data
 * @returns {boolean} - Success status
 */
export const saveCompletedChecklist = (checklist) => {
  try {
    const existingChecklists = loadFromLocalStorage('completedChecklists', []);
    existingChecklists.push({
      ...checklist,
      timestamp: new Date().toISOString()
    });
    return saveToLocalStorage('completedChecklists', existingChecklists);
  } catch (error) {
    console.error('Error saving completed checklist:', error);
    return false;
  }
};

/**
 * Add a contact to favorites
 * 
 * @param {string} contactId - ID of the contact to favorite
 * @returns {boolean} - Success status
 */
export const addContactToFavorites = (contactId) => {
  try {
    const favoriteContacts = loadFromLocalStorage('favoritedContacts', []);
    if (!favoriteContacts.includes(contactId)) {
      favoriteContacts.push(contactId);
      return saveToLocalStorage('favoritedContacts', favoriteContacts);
    }
    return true;
  } catch (error) {
    console.error('Error adding contact to favorites:', error);
    return false;
  }
};

/**
 * Remove a contact from favorites
 * 
 * @param {string} contactId - ID of the contact to unfavorite
 * @returns {boolean} - Success status
 */
export const removeContactFromFavorites = (contactId) => {
  try {
    const favoriteContacts = loadFromLocalStorage('favoritedContacts', []);
    const updatedFavorites = favoriteContacts.filter(id => id !== contactId);
    return saveToLocalStorage('favoritedContacts', updatedFavorites);
  } catch (error) {
    console.error('Error removing contact from favorites:', error);
    return false;
  }
};

/**
 * Add a custom medication to local storage
 * 
 * @param {Object} medication - Medication data
 * @returns {boolean} - Success status
 */
export const addCustomMedication = (medication) => {
  try {
    const customMedications = loadFromLocalStorage('customMedications', []);
    
    // Add unique ID if not present
    if (!medication.id) {
      medication.id = `custom-${Date.now()}`;
    }
    
    // Add isCustom flag
    medication.isCustom = true;
    
    customMedications.push(medication);
    return saveToLocalStorage('customMedications', customMedications);
  } catch (error) {
    console.error('Error adding custom medication:', error);
    return false;
  }
};

/**
 * Check if application is in offline mode by testing network connectivity
 * 
 * @returns {Promise<boolean>} - True if offline, false if online
 */
export const checkIfOffline = async () => {
  // First check navigator.onLine
  if (navigator.onLine === false) {
    return true;
  }
  
  // Then try to fetch a small resource as a more reliable check
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('/offline-check.json', { 
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return !response.ok;
  } catch (error) {
    console.warn('Network connectivity check failed:', error);
    return true;
  }
};

/**
 * Setup service worker for offline capabilities
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        registration => {
          console.log('ServiceWorker registration successful with scope:', registration.scope);
        },
        error => {
          console.error('ServiceWorker registration failed:', error);
        }
      );
    });
  }
};
