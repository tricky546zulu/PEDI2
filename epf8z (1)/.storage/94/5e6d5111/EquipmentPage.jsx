import React, { useState, useEffect } from 'react';
import EquipmentSizing from '../components/EquipmentSizing';
import { useAppContext } from '../contexts/AppContext';

function EquipmentPage() {
  const { patientWeight, patientAge, patientLength, setShowPatientModal } = useAppContext();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCriticalOnly, setShowCriticalOnly] = useState(false);
  
  // Load equipment data
  useEffect(() => {
    const loadEquipment = async () => {
      try {
        // Import equipment data
        const { default: equipmentData } = await import('../data/equipmentSizes');
        setEquipment(equipmentData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading equipment data:', error);
        setLoading(false);
      }
    };
    
    loadEquipment();
  }, []);
  
  // Get unique categories for filter tabs
  const categories = ['all', ...new Set(equipment.map(eq => eq.category))];
  
  // Filter equipment based on search term, category, and critical flag
  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || eq.category === activeCategory;
    const matchesCritical = showCriticalOnly ? eq.critical : true;
    return matchesSearch && matchesCategory && matchesCritical;
  });
  
  // Sort equipment with critical items first
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    if (a.critical && !b.critical) return -1;
    if (!a.critical && b.critical) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Equipment Sizing</h1>
      
      {/* Patient info banner */}
      {!patientWeight && !patientAge ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 rounded-lg p-3">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-yellow-700 dark:text-yellow-300">
                  No patient information entered
                </span>
                <button 
                  onClick={() => setShowPatientModal(true)}
                  className="ml-3 px-2 py-1 text-xs font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                >
                  Enter Patient Info
                </button>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                Enter patient age or weight to get appropriate sizing recommendations
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium text-green-700 dark:text-green-300">
                {patientWeight && `Weight: ${patientWeight} kg`}
                {patientWeight && patientAge && " · "}
                {patientAge && `Age: ${patientAge} months`}
                {(patientWeight || patientAge) && patientLength && " · "}
                {patientLength && `Length: ${patientLength} cm`}
              </span>
            </div>
            <button 
              onClick={() => setShowPatientModal(true)}
              className="px-2 py-1 text-xs font-medium rounded bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
            >
              Update
            </button>
          </div>
        </div>
      )}
      
      {/* Search and filters */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search equipment..."
            className="pl-10 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category filters */}
        <div className="flex justify-between items-center">
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
          
          {/* Critical only toggle */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showCriticalOnly}
                onChange={() => setShowCriticalOnly(!showCriticalOnly)}
              />
              <div className="relative w-10 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300">Critical only</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Equipment list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : sortedEquipment.length > 0 ? (
        <div className="grid gap-4">
          {sortedEquipment.map((eq) => (
            <EquipmentSizing key={eq.id} equipment={eq} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            No equipment found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default EquipmentPage;
