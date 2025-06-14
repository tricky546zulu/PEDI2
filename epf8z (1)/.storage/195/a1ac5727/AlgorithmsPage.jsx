import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import algorithms from '../data/algorithms';
import PALSAlgorithm from '../components/PALSAlgorithm';

function AlgorithmsPage() {
  const { offlineStorage, isOffline } = useAppContext();
  const [filteredAlgorithms, setFilteredAlgorithms] = useState(algorithms);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories derived from algorithm data
  const categories = ['all', ...Array.from(new Set(algorithms.map(algo => algo.category)))];

  // Store algorithms in offline storage on component mount
  useEffect(() => {
    const storeAlgorithmsOffline = async () => {
      try {
        if (offlineStorage) {
          await offlineStorage.storeData('algorithms', algorithms);
          console.log('Algorithms stored for offline use');
        }
      } catch (error) {
        console.error('Failed to store algorithms offline:', error);
      }
    };

    storeAlgorithmsOffline();
  }, [offlineStorage]);

  // Filter algorithms by category and search term
  useEffect(() => {
    let results = algorithms;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = results.filter(algo => algo.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(algo => 
        algo.title.toLowerCase().includes(term) || 
        algo.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredAlgorithms(results);
  }, [selectedCategory, searchTerm]);

  // Update recently visited items in local storage when an algorithm is clicked
  const handleAlgorithmClick = (algorithm) => {
    try {
      // Get current list or initialize new one
      const savedSections = localStorage.getItem('lastVisitedSections');
      let sections = savedSections ? JSON.parse(savedSections) : [];
      
      // Create new entry
      const newEntry = {
        title: algorithm.title,
        path: `/algorithm/${algorithm.id}`,
        subtitle: `${algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)} Algorithm`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        )
      };
      
      // Remove if already exists
      sections = sections.filter(section => section.path !== newEntry.path);
      
      // Add to start of array and limit to 5 items
      sections.unshift(newEntry);
      sections = sections.slice(0, 5);
      
      // Save back to localStorage
      localStorage.setItem('lastVisitedSections', JSON.stringify(sections));
    } catch (error) {
      console.error('Error updating recently visited:', error);
    }
  };

  return (
    <div>
      {/* Offline indicator */}
      {isOffline && (
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-3 rounded-lg flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>You're currently offline. Using cached algorithms.</span>
        </div>
      )}
      
      {/* Search and filter */}
      <div className="mb-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
        <div className="mb-3">
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Search Algorithms
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by name or description..."
              className="w-full p-2 pl-10 border rounded-md dark:bg-slate-700 dark:border-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Algorithm list */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">
          {selectedCategory === 'all'
            ? 'All Algorithms'
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Algorithms`}
          {searchTerm && ` matching "${searchTerm}"`}
        </h2>
        
        {filteredAlgorithms.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredAlgorithms.map((algorithm) => (
              <Link 
                key={algorithm.id} 
                to={`/algorithm/${algorithm.id}`}
                onClick={() => handleAlgorithmClick(algorithm)}
              >
                <PALSAlgorithm algorithm={algorithm} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-3 text-lg font-medium">No algorithms found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlgorithmsPage;
