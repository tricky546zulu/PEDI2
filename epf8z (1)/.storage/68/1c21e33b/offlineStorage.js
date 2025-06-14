/**
 * offlineStorage.js
 * Utility functions for offline data storage using IndexedDB, localStorage and caching
 */

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export function saveToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error(`Error saving data to localStorage for key ${key}:`, error);
    return false;
  }
}

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key not found
 * @returns {any} - Retrieved data or default value
 */
export function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return defaultValue;
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading data from localStorage for key ${key}:`, error);
    return defaultValue;
  }
}

/**
 * Check if IndexedDB is available in the browser
 * @returns {boolean} - True if IndexedDB is available
 */
export function isIndexedDBAvailable() {
  return window && 'indexedDB' in window;
}

/**
 * Class for IndexedDB operations
 */
export class IndexedDBStorage {
  constructor(dbName = 'pediatricEmergencyDB', version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.isAvailable = isIndexedDBAvailable();
  }

  /**
   * Open the IndexedDB database
   * @returns {Promise<IDBDatabase>} - Database instance
   */
  async openDB() {
    if (!this.isAvailable) {
      throw new Error('IndexedDB is not available in this browser.');
    }

    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version);

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

        if (!db.objectStoreNames.contains('patientData')) {
          db.createObjectStore('patientData', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('userPreferences')) {
          db.createObjectStore('userPreferences', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('customChecklists')) {
          const checklistStore = db.createObjectStore('customChecklists', { keyPath: 'id', autoIncrement: true });
          checklistStore.createIndex('title', 'title', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  /**
   * Store data in the appropriate object store
   * @param {string} storeName - Name of the object store
   * @param {object|array} data - Data to store
   * @returns {Promise<boolean>} - Success status
   */
  async storeData(storeName, data) {
    try {
      if (!this.db) await this.openDB();
      const db = this.db;
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // Handle arrays of objects or single object
        if (Array.isArray(data)) {
          let completed = 0;
          let failed = 0;
          
          data.forEach(item => {
            const request = store.put(item);
            
            request.onsuccess = () => {
              completed++;
              if (completed + failed === data.length) {
                resolve(failed === 0);
              }
            };
            
            request.onerror = (event) => {
              console.error(`Error storing item in ${storeName}:`, event.target.error);
              failed++;
              if (completed + failed === data.length) {
                resolve(failed === 0);
              }
            };
          });
        } else {
          const request = store.put(data);
          
          request.onsuccess = () => {
            resolve(true);
          };
          
          request.onerror = (event) => {
            console.error(`Error storing data in ${storeName}:`, event.target.error);
            reject(event.target.error);
          };
        }
        
        transaction.oncomplete = () => {
          // console.log(`Transaction completed: ${storeName}`);
        };
        
        transaction.onerror = (event) => {
          console.error(`Transaction error: ${storeName}`, event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB store error:', error);
      return false;
    }
  }

  /**
   * Retrieve data from an object store
   * @param {string} storeName - Name of the object store
   * @param {string|number} [id] - Specific record ID (optional)
   * @returns {Promise<object|array>} - Retrieved data
   */
  async getData(storeName, id = null) {
    try {
      if (!this.db) await this.openDB();
      const db = this.db;
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        
        let request;
        
        if (id !== null) {
          // Get specific record by ID
          request = store.get(id);
          
          request.onsuccess = () => {
            resolve(request.result || null);
          };
        } else {
          // Get all records
          const results = [];
          request = store.openCursor();
          
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              resolve(results);
            }
          };
        }
        
        request.onerror = (event) => {
          console.error(`Error retrieving data from ${storeName}:`, event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB get error:', error);
      return id !== null ? null : [];
    }
  }

  /**
   * Delete data from an object store
   * @param {string} storeName - Name of the object store
   * @param {string|number} id - Record ID to delete
   * @returns {Promise<boolean>} - Success status
   */
  async deleteData(storeName, id) {
    try {
      if (!this.db) await this.openDB();
      const db = this.db;
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const request = store.delete(id);
        
        request.onsuccess = () => {
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error(`Error deleting data from ${storeName}:`, event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB delete error:', error);
      return false;
    }
  }

  /**
   * Clear all data from an object store
   * @param {string} storeName - Name of the object store
   * @returns {Promise<boolean>} - Success status
   */
  async clearStore(storeName) {
    try {
      if (!this.db) await this.openDB();
      const db = this.db;
      
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const request = store.clear();
        
        request.onsuccess = () => {
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error(`Error clearing ${storeName}:`, event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB clear store error:', error);
      return false;
    }
  }
}

/**
 * Check if the app is being run in offline mode
 * @returns {boolean} - True if app is offline
 */
export function isOffline() {
  return !navigator.onLine;
}

/**
 * Register for online/offline events
 * @param {function} onOffline - Callback for offline event
 * @param {function} onOnline - Callback for online event
 */
export function registerConnectivityListeners(onOffline, onOnline) {
  window.addEventListener('offline', onOffline);
  window.addEventListener('online', onOnline);
  
  return () => {
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('online', onOnline);
  };
}

/**
 * Register the service worker for offline capability
 */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
      return null;
    }
  } else {
    console.log('ServiceWorker is not supported in this browser');
    return null;
  }
}

/**
 * Create and export an instance of IndexedDBStorage
 */
export const indexedDBStorage = new IndexedDBStorage();

export default {
  saveToLocalStorage,
  loadFromLocalStorage,
  isIndexedDBAvailable,
  indexedDBStorage,
  isOffline,
  registerConnectivityListeners,
  registerServiceWorker
};
