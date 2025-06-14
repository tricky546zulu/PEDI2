/**
 * OfflineStorage.js
 * Utility class for managing offline data storage using IndexedDB
 */

class OfflineStorage {
  constructor() {
    this.dbName = 'pediatricEmergencyCareDB';
    this.dbVersion = 1;
    this.db = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the database
   * @returns {Promise} Promise that resolves when DB is initialized
   */
  async init() {
    if (this.isInitialized) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      // Check if IndexedDB is supported
      if (!window.indexedDB) {
        console.error('This browser doesn\'t support IndexedDB');
        reject(new Error('IndexedDB not supported'));
        return;
      }
      
      // Open the database
      const request = window.indexedDB.open(this.dbName, this.dbVersion);
      
      // Handle database upgrade needed
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for each data type if they don't exist
        if (!db.objectStoreNames.contains('algorithms')) {
          db.createObjectStore('algorithms', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('medications')) {
          db.createObjectStore('medications', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('equipmentSizes')) {
          db.createObjectStore('equipmentSizes', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('vitalSigns')) {
          db.createObjectStore('vitalSigns', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('checklists')) {
          db.createObjectStore('checklists', { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains('contacts')) {
          db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
          historyStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
      
      // Handle success
      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isInitialized = true;
        resolve();
      };
      
      // Handle errors
      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }
  
  /**
   * Store data in the specified object store
   * @param {string} storeName - Name of the store
   * @param {Object|Array} data - Data to store
   * @returns {Promise} Promise that resolves when data is stored
   */
  async storeData(storeName, data) {
    if (!this.isInitialized) {
      await this.init();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject(event.target.error);
      
      const store = transaction.objectStore(storeName);
      
      // If data is an array, add each item
      if (Array.isArray(data)) {
        data.forEach(item => {
          store.put(item);
        });
      } else {
        // Otherwise add the single item
        store.put(data);
      }
    });
  }
  
  /**
   * Get data from the specified object store
   * @param {string} storeName - Name of the store
   * @param {string|number} [id] - Optional ID of item to retrieve
   * @returns {Promise} Promise that resolves with the data
   */
  async getData(storeName, id = null) {
    if (!this.isInitialized) {
      await this.init();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      
      // If ID is provided, get that specific item
      if (id !== null) {
        const request = store.get(id);
        
        request.onsuccess = () => {
          resolve(request.result);
        };
        
        request.onerror = (event) => {
          reject(event.target.error);
        };
      } else {
        // Otherwise get all items in the store
        const request = store.getAll();
        
        request.onsuccess = () => {
          resolve(request.result);
        };
        
        request.onerror = (event) => {
          reject(event.target.error);
        };
      }
    });
  }
  
  /**
   * Delete an item from a store
   * @param {string} storeName - Name of the store
   * @param {string|number} id - ID of item to delete
   * @returns {Promise} Promise that resolves when item is deleted
   */
  async deleteItem(storeName, id) {
    if (!this.isInitialized) {
      await this.init();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
  
  /**
   * Clear all items from a store
   * @param {string} storeName - Name of the store to clear
   * @returns {Promise} Promise that resolves when store is cleared
   */
  async clearStore(storeName) {
    if (!this.isInitialized) {
      await this.init();
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
  
  /**
   * Delete the entire database
   * @returns {Promise} Promise that resolves when DB is deleted
   */
  async deleteDatabase() {
    this.isInitialized = false;
    this.db = null;
    
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.dbName);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}

export default OfflineStorage;
