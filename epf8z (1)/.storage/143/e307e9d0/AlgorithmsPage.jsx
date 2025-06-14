import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import PALSAlgorithm from '../components/PALSAlgorithm';

function AlgorithmsPage() {
  const { offlineStorage, isOffline } = useAppContext();
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'cardiac arrest', name: 'Cardiac Arrest' },
    { id: 'bradycardia', name: 'Bradycardia' },
    { id: 'tachycardia', name: 'Tachycardia' },
    { id: 'post resuscitation', name: 'Post Resuscitation' },
    { id: 'shock', name: 'Shock' }
  ];

  // Load algorithms data
  useEffect(() => {
    const fetchAlgorithms = async () => {
      setLoading(true);
      try {
        let data;
        
        // Try to get data from offline storage first
        if (offlineStorage.isAvailable) {
          data = await offlineStorage.getData('algorithms');
        }
        
        // If no offline data or it's empty, load from static file
        if (!data || data.length === 0) {
          const importedData = (await import('../data/algorithms')).default;
          data = importedData;
          
          // Save to offline storage for future use
          if (offlineStorage.isAvailable) {
            await offlineStorage.storeData('algorithms', importedData);
          }
        }
        
        setAlgorithms(data);
        setError(null);
      } catch (err) {
        console.error('Error loading algorithms:', err);
        setError('Failed to load algorithms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, [offlineStorage]);

  // Filter and search algorithms
  const filteredAlgorithms = algorithms.filter(algorithm => {
    const matchesCategory = filterCategory === 'all' || algorithm.category === filterCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      algorithm.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      algorithm.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-16">
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
              placeholder="Search algorithms..." 
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
      {!loading && !error && filteredAlgorithms.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            No algorithms found matching your criteria. Try adjusting your search or filter.
          </p>
        </div>
      )}
      
      {/* Algorithm grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredAlgorithms.map(algorithm => (
          <Link to={`/algorithm/${algorithm.id}`} key={algorithm.id}>
            <PALSAlgorithm algorithm={algorithm} />
          </Link>
        ))}
      </div>
      
      {/* Offline indicator */}
      {isOffline && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md">
          <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You're viewing offline data. Some content may not be up-to-date.
          </p>
        </div>
      )}
    </div>
  );
}

export default AlgorithmsPage;
