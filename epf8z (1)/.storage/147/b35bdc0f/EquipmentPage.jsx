import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import EquipmentSizing from '../components/EquipmentSizing';

function EquipmentPage() {
  const { offlineStorage, setShowPatientModal, patientWeight, patientAge } = useAppContext();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'airway', name: 'Airway' },
    { id: 'ventilation', name: 'Ventilation' },
    { id: 'vascular access', name: 'Vascular Access' },
    { id: 'gastrointestinal', name: 'Gastrointestinal' },
    { id: 'genitourinary', name: 'Genitourinary' },
    { id: 'thoracic', name: 'Thoracic' }
  ];

  // Load equipment data
  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        let data;
        
        // Try to get data from offline storage first
        if (offlineStorage.isAvailable) {
          data = await offlineStorage.getData('equipment');
        }
        
        // If no offline data or it's empty, load from static file
        if (!data || data.length === 0) {
          const importedData = (await import('../data/equipmentSizes')).default;
          data = importedData;
          
          // Save to offline storage for future use
          if (offlineStorage.isAvailable) {
            await offlineStorage.storeData('equipment', importedData);
          }
        }
        
        setEquipment(data);
        setError(null);
      } catch (err) {
        console.error('Error loading equipment data:', err);
        setError('Failed to load equipment data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [offlineStorage]);

  // Filter and search equipment
  const filteredEquipment = equipment.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort to show critical items first
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    if (a.critical === b.critical) {
      return a.name.localeCompare(b.name);
    }
    return a.critical ? -1 : 1;
  });

  return (
    <div className="pb-16">
      {/* Patient Information Alert */}
      {!patientWeight && !patientAge && (
        <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 mb-4 flex items-start">
          <div className="text-amber-700 dark:text-amber-300 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-amber-800 dark:text-amber-300 font-medium">No patient information set</p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
              To see recommended equipment sizes, please set patient weight and/or age.
            </p>
            <button 
              onClick={() => setShowPatientModal(true)}
              className="mt-2 px-3 py-1 text-sm bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-md hover:bg-amber-300 dark:hover:bg-amber-700 transition-colors"
            >
              Set Patient Data
            </button>
          </div>
        </div>
      )}

      {/* Patient Information Display */}
      {(patientWeight || patientAge) && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="text-blue-800 dark:text-blue-300 font-medium">Current Patient</p>
            <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
              {patientWeight && <span className="mr-2">Weight: {patientWeight} kg</span>}
              {patientAge && (
                <span>
                  Age: {patientAge} months 
                  ({(patientAge / 12).toFixed(1)} years)
                </span>
              )}
            </p>
          </div>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="px-3 py-1 text-sm bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
          >
            Update
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" 
              placeholder="Search equipment..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category filter */}
          <div className="flex-shrink-0">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-4">
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {/* No results */}
      {!loading && !error && filteredEquipment.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            No equipment found matching your criteria. Try adjusting your search or filter.
          </p>
        </div>
      )}
      
      {/* Equipment items grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedEquipment.map(item => (
          <EquipmentSizing
            key={item.id}
            equipment={item}
          />
        ))}
      </div>
      
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p><strong>Note:</strong> Equipment sizes are guidelines based on patient age and weight. Clinical judgment should prevail when selecting appropriate sizes.</p>
      </div>
    </div>
  );
}

export default EquipmentPage;
