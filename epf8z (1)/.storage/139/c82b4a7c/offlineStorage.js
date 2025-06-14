// Utility functions for offline storage
import { v4 as uuidv4 } from 'uuid';

/**
 * Class for managing offline storage capabilities
 */
export class OfflineStorage {
  constructor() {
    this.dbName = 'PediatricEmergencyCare';
    this.dbVersion = 1;
    this.db = null;
    this.isAvailable = false;
    this.pendingSyncTasks = [];
  }

  /**
   * Initialize the database
   * @returns {Promise<boolean>} whether initialization was successful
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        this.isAvailable = false;
        reject(event.target.error);
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isAvailable = true;
        resolve(true);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for different types of data
        this._createStores(db);
      };
    });
  }

  /**
   * Create necessary object stores for the application
   * @param {IDBDatabase} db - The database instance
   * @private
   */
  _createStores(db) {
    // Create core data stores
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
    
    // Create user-specific stores
    if (!db.objectStoreNames.contains('patientData')) {
      db.createObjectStore('patientData', { keyPath: 'id' });
    }
    
    if (!db.objectStoreNames.contains('checklists')) {
      const store = db.createObjectStore('checklists', { keyPath: 'id' });
      store.createIndex('lastModified', 'lastModified', { unique: false });
    }
    
    if (!db.objectStoreNames.contains('contacts')) {
      db.createObjectStore('contacts', { keyPath: 'id' });
    }
    
    // Create sync queue for offline operations
    if (!db.objectStoreNames.contains('syncQueue')) {
      db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
    }
  }

  /**
   * Store data in IndexedDB
   * @param {string} storeName - The name of the object store
   * @param {Object|Array} data - Data to store
   * @returns {Promise<void>}
   */
  async storeData(storeName, data) {
    if (!this.isAvailable || !this.db) {
      throw new Error('IndexedDB is not available');
    }

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // Handle array or single item
        if (Array.isArray(data)) {
          const promises = data.map(item => {
            // Ensure each item has an ID
            if (!item.id) {
              item.id = uuidv4();
            }
            
            return new Promise((res, rej) => {
              const request = store.put(item);
              request.onsuccess = () => res();
              request.onerror = (e) => rej(e.target.error);
            });
          });
          
          Promise.all(promises)
            .then(() => resolve())
            .catch(e => reject(e));
        } else {
          // Ensure the item has an ID
          if (!data.id) {
            data.id = uuidv4();
          }
          
          const request = store.put(data);
          request.onsuccess = () => resolve();
          request.onerror = (e) => reject(e.target.error);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get data from IndexedDB
   * @param {string} storeName - The name of the object store
   * @param {string|null} id - Optional ID to fetch specific item
   * @returns {Promise<Object|Array>} - The requested data
   */
  async getData(storeName, id = null) {
    if (!this.isAvailable || !this.db) {
      throw new Error('IndexedDB is not available');
    }

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction(storeName, 'readonly');
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
  }

  /**
   * Delete data from IndexedDB
   * @param {string} storeName - The name of the object store
   * @param {string} id - ID of the item to delete
   * @returns {Promise<void>}
   */
  async deleteData(storeName, id) {
    if (!this.isAvailable || !this.db) {
      throw new Error('IndexedDB is not available');
    }

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Queue a task for background sync when online
   * @param {Object} data - Data to be synced
   * @returns {Promise<void>}
   */
  async queueForSync(data) {
    if (!this.isAvailable || !this.db) {
      throw new Error('IndexedDB is not available');
    }

    return this.storeData('syncQueue', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Attempt to sync pending data with server when online
   * @returns {Promise<boolean>} - Whether sync was successful
   */
  async syncData() {
    if (!navigator.onLine) {
      return false;
    }

    if ('serviceWorker' in navigator && 'sync' in window.registration) {
      try {
        await navigator.serviceWorker.ready;
        await registration.sync.register('sync-patient-data');
        return true;
      } catch (error) {
        console.error('Background sync registration failed:', error);
        return false;
      }
    } else {
      // Manual sync if background sync is not supported
      try {
        const syncQueue = await this.getData('syncQueue');
        if (syncQueue && syncQueue.length) {
          // This would normally send data to a server
          console.log('Manual sync:', syncQueue);
          
          // Clear the sync queue after successful sync
          for (const item of syncQueue) {
            await this.deleteData('syncQueue', item.id);
          }
        }
        return true;
      } catch (error) {
        console.error('Manual sync failed:', error);
        return false;
      }
    }
  }

  /**
   * Check if a data store is empty
   * @param {string} storeName - The name of the object store
   * @returns {Promise<boolean>} - Whether the store is empty
   */
  async isStoreEmpty(storeName) {
    try {
      const data = await this.getData(storeName);
      return !data || data.length === 0;
    } catch (error) {
      console.error(`Error checking if ${storeName} is empty:`, error);
      return true;
    }
  }

  /**
   * Populate initial data if store is empty (for first-time use)
   * @param {string} storeName - The name of the object store
   * @param {Array} data - Initial data to populate
   * @returns {Promise<void>}
   */
  async populateInitialData(storeName, data) {
    if (!data || !data.length) return;
    
    try {
      const isEmpty = await this.isStoreEmpty(storeName);
      if (isEmpty) {
        await this.storeData(storeName, data);
        console.log(`Initial ${storeName} data populated`);
      }
    } catch (error) {
      console.error(`Error populating initial ${storeName} data:`, error);
    }
  }
}

export default OfflineStorage;
