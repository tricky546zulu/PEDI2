/**
 * Utility class for offline storage functionality
 * Uses IndexedDB for storing data for offline use
 */
class OfflineStorage {
  constructor() {
    this.db = null;
    this.DB_NAME = 'pediatricEmergencyCareDB';
    this.DB_VERSION = 1;
    this.STORES = {
      algorithms: 'algorithms',
      medications: 'medications',
      equipment: 'equipmentSizes',
      vitalSigns: 'vitalSigns',
      checklists: 'checklists',
      contacts: 'contacts'
    };
  }

  /**
   * Initialize the database
   * @returns {Promise} Resolves when DB is initialized
   */
  init() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = (event) => {
        reject('Error opening database: ' + event.target.errorCode);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores for each data type
        if (!db.objectStoreNames.contains(this.STORES.algorithms)) {
          db.createObjectStore(this.STORES.algorithms, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(this.STORES.medications)) {
          db.createObjectStore(this.STORES.medications, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(this.STORES.equipment)) {
          db.createObjectStore(this.STORES.equipment, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(this.STORES.vitalSigns)) {
          db.createObjectStore(this.STORES.vitalSigns, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(this.STORES.checklists)) {
          const checklistsStore = db.createObjectStore(this.STORES.checklists, { keyPath: 'id', autoIncrement: true });
          checklistsStore.createIndex('title', 'title', { unique: false });
        }
        
        if (!db.objectStoreNames.contains(this.STORES.contacts)) {
          const contactsStore = db.createObjectStore(this.STORES.contacts, { keyPath: 'id', autoIncrement: true });
          contactsStore.createIndex('name', 'name', { unique: false });
        }
      };
    });
  }

  /**
   * Store data for offline use
   * @param {string} storeName - Name of the store
   * @param {Array|Object} data - Data to store 
   * @returns {Promise} Resolves when data is stored
   */
  storeData(storeName, data) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      transaction.onerror = (event) => {
        reject('Transaction error: ' + event.target.error);
      };
      
      transaction.oncomplete = (event) => {
        resolve();
      };
      
      // If data is an array, add each item
      if (Array.isArray(data)) {
        data.forEach(item => {
          store.put(item);
        });
      } else {
        // If data is a single object
        store.put(data);
      }
    });
  }

  /**
   * Retrieve data from storage
   * @param {string} storeName - Name of the store
   * @param {string|number} [id] - Optional ID to retrieve specific item
   * @returns {Promise} Resolves with the retrieved data
   */
  getData(storeName, id) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      let request;
      
      if (id !== undefined) {
        // Get specific item by ID
        request = store.get(id);
        
        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      } else {
        // Get all items in the store
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
        reject('Request error: ' + event.target.error);
      };
    });
  }

  /**
   * Delete an item from storage
   * @param {string} storeName - Name of the store
   * @param {string|number} id - ID of item to delete
   * @returns {Promise} Resolves when item is deleted
   */
  deleteItem(storeName, id) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = (event) => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject('Delete error: ' + event.target.error);
      };
    });
  }

  /**
   * Clear all data from a store
   * @param {string} storeName - Name of the store to clear
   * @returns {Promise} Resolves when store is cleared
   */
  clearStore(storeName) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();
      
      request.onsuccess = (event) => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject('Clear error: ' + event.target.error);
      };
    });
  }

  /**
   * Synchronize offline data with server data
   * @param {string} storeName - Name of the store
   * @param {Array} serverData - Data from server
   * @returns {Promise} Resolves when sync is complete
   */
  syncData(storeName, serverData) {
    return this.clearStore(storeName)
      .then(() => {
        return this.storeData(storeName, serverData);
      })
      .catch(error => {
        console.error(`Error syncing ${storeName}:`, error);
        throw error;
      });
  }

  /**
   * Check if the database has data in a specific store
   * @param {string} storeName - Name of the store
   * @returns {Promise<boolean>} Resolves with true if store has data
   */
  async hasData(storeName) {
    try {
      const data = await this.getData(storeName);
      return Array.isArray(data) && data.length > 0;
    } catch (error) {
      console.error(`Error checking data in ${storeName}:`, error);
      return false;
    }
  }
}

export default OfflineStorage;
