import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PALSAlgorithm from '../components/PALSAlgorithm';
import { useAppContext } from '../contexts/AppContext';

function AlgorithmsPage() {
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isOffline, offlineStorage } = useAppContext();
  const navigate = useNavigate();
  
  // Load algorithms from data file
  useEffect(() => {
    const loadAlgorithms = async () => {
      try {
        // First try to load from IndexedDB if available and in offline mode
        if (isOffline && offlineStorage.isAvailable) {
          const cachedAlgorithms = await offlineStorage.getData('algorithms');
          if (cachedAlgorithms && cachedAlgorithms.length > 0) {
            setAlgorithms(cachedAlgorithms);
            setLoading(false);
            return;
          }
        }
        
        // Otherwise load from the local data file
        const { default: algorithmsData } = await import('../data/algorithms');
        setAlgorithms(algorithmsData);
        
        // Store in IndexedDB for offline use
        if (offlineStorage.isAvailable) {
          await offlineStorage.storeData('algorithms', algorithmsData);
        }
      } catch (error) {
        console.error('Error loading algorithms:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAlgorithms();
  }, [isOffline, offlineStorage]);
  
  // Get unique categories for filter tabs
  const categories = ['all', ...new Set(algorithms.map(algo => algo.category))];
  
  // Filter algorithms based on search term and active category
  const filteredAlgorithms = algorithms.filter(algorithm => {
    const matchesSearch = algorithm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          algorithm.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || algorithm.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithmId) => {
    navigate(`/algorithm/${algorithmId}`);
    
    // Save to recently viewed
    const selectedAlgorithm = algorithms.find(a => a.id === algorithmId);
    if (selectedAlgorithm) {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedAlgorithms') || '[]');
      
      // Remove if already in list
      const filteredList = recentlyViewed.filter(item => item.id !== algorithmId);
      
      // Add to beginning of list with timestamp
      filteredList.unshift({
        id: selectedAlgorithm.id,
        title: selectedAlgorithm.title,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 10
      const trimmedList = filteredList.slice(0, 10);
      localStorage.setItem('recentlyViewedAlgorithms', JSON.stringify(trimmedList));
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">PALS Algorithms</h1>
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search algorithms..."
          className="pl-10 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      <div className="flex overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Algorithms list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredAlgorithms.length > 0 ? (
        <div className="grid gap-4">
          {filteredAlgorithms.map((algorithm) => (
            <div key={algorithm.id} onClick={() => handleAlgorithmSelect(algorithm.id)}>
              <PALSAlgorithm algorithm={algorithm} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            No algorithms found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default AlgorithmsPage;
