import { useState, useEffect } from 'react';
import OfflineStorage from '../utils/offlineStorage';

/**
 * Custom hook for managing offline storage
 * @param {string} storeName - Name of the IndexedDB store
 * @returns {Object} Functions and state for managing offline data
 */
function useOfflineStorage(storeName) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storage] = useState(() => new OfflineStorage());

  // Initialize offline storage and load data
  useEffect(() => {
    async function initializeAndLoadData() {
      try {
        // Initialize storage
        await storage.init();
        
        // Load data from storage
        const storedData = await storage.getData(storeName);
        setData(storedData || []);
        setIsLoading(false);
      } catch (err) {
        console.error(`Error initializing or loading data from ${storeName}:`, err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    initializeAndLoadData();
  }, [storeName, storage]);

  /**
   * Save data to offline storage
   * @param {Array|Object} newData - Data to save
   * @param {boolean} replace - Whether to replace all data or append
   */
  const saveData = async (newData, replace = true) => {
    try {
      setIsLoading(true);
      
      if (replace) {
        // Replace all data
        await storage.clearStore(storeName);
        await storage.storeData(storeName, newData);
        setData(newData);
      } else {
        // Append data (if array) or add/update single item
        if (Array.isArray(newData)) {
          await storage.storeData(storeName, newData);
          setData(prevData => [...prevData, ...newData]);
        } else {
          await storage.storeData(storeName, newData);
          setData(prevData => {
            // If item with same ID exists, replace it, otherwise add new item
            if (newData.id && Array.isArray(prevData)) {
              const itemIndex = prevData.findIndex(item => item.id === newData.id);
              if (itemIndex >= 0) {
                const updatedData = [...prevData];
                updatedData[itemIndex] = newData;
                return updatedData;
              }
            }
            return [...prevData, newData];
          });
        }
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error(`Error saving data to ${storeName}:`, err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  /**
   * Get a single item by ID
   * @param {string|number} id - Item ID
   * @returns {Promise<Object>} The requested item
   */
  const getItem = async (id) => {
    try {
      return await storage.getData(storeName, id);
    } catch (err) {
      console.error(`Error getting item from ${storeName}:`, err);
      setError(err.message);
      return null;
    }
  };

  /**
   * Delete an item by ID
   * @param {string|number} id - ID of item to delete
   */
  const deleteItem = async (id) => {
    try {
      setIsLoading(true);
      await storage.deleteItem(storeName, id);
      setData(prevData => prevData.filter(item => item.id !== id));
      setIsLoading(false);
    } catch (err) {
      console.error(`Error deleting item from ${storeName}:`, err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  /**
   * Clear all data from the store
   */
  const clearAllData = async () => {
    try {
      setIsLoading(true);
      await storage.clearStore(storeName);
      setData([]);
      setIsLoading(false);
    } catch (err) {
      console.error(`Error clearing data from ${storeName}:`, err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  /**
   * Refresh data from storage
   */
  const refreshData = async () => {
    try {
      setIsLoading(true);
      const refreshedData = await storage.getData(storeName);
      setData(refreshedData || []);
      setIsLoading(false);
    } catch (err) {
      console.error(`Error refreshing data from ${storeName}:`, err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    saveData,
    getItem,
    deleteItem,
    clearAllData,
    refreshData,
    storage
  };
}

export default useOfflineStorage;
