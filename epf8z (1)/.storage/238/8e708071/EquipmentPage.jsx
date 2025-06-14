import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import equipmentSizes from '../data/equipmentSizes';

function EquipmentPage() {
  const { patientWeight, patientAge, setShowPatientModal, darkMode } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('airway');

  // Extract unique categories from equipment data
  const categories = useMemo(() => {
    return Array.from(new Set(equipmentSizes.map(item => item.category))).sort();
  }, []);

  // Group equipment by category
  const equipmentByCategory = useMemo(() => {
    return equipmentSizes.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, []);

  // Determine equipment size based on patient weight or age
  const determineEquipmentSize = (equipment) => {
    if (!equipment.sizing || (!patientWeight && !patientAge)) return null;

    // First try to size based on weight if available
    if (patientWeight && equipment.sizing.byWeight) {
      const weightSizing = equipment.sizing.byWeight.find(
        size => patientWeight >= size.minWeight && patientWeight <= size.maxWeight
      );
      if (weightSizing) return weightSizing;
    }

    // Fall back to age-based sizing
    if (patientAge && equipment.sizing.byAge) {
      const ageSizing = equipment.sizing.byAge.find(
        size => patientAge >= size.minAgeMonths && patientAge <= size.maxAgeMonths
      );
      if (ageSizing) return ageSizing;
    }

    // If no specific sizing matches, check if there's a formula
    if (patientWeight && equipment.sizing.formula) {
      try {
        // Safely evaluate formula with patient weight
        // Formula should be in the format: "weight * 0.1 + 4" or similar
        const formula = equipment.sizing.formula.replace(/weight/g, patientWeight);
        // eslint-disable-next-line no-new-func
        const result = new Function('return ' + formula)();
        return {
          size: typeof result === 'number' ? result.toFixed(1) : result,
          notes: equipment.sizing.formulaNotes || 'Calculated using formula'
        };
      } catch (error) {
        console.error('Error calculating formula size:', error);
      }
    }

    return null;
  };

  // Get size description for display
  const getSizeDescription = (equipment) => {
    const sizeInfo = determineEquipmentSize(equipment);
    
    if (!sizeInfo) {
      return {
        size: 'Unknown',
        notes: 'Add patient information for sizing',
        isRecommended: false
      };
    }
    
    return {
      size: sizeInfo.size,
      notes: sizeInfo.notes,
      isRecommended: true
    };
  };

  // Category icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'airway':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'breathing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'circulation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'monitoring':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  useEffect(() => {
    // Scroll to the top when changing categories
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Patient information banner */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} ${patientWeight || patientAge ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Equipment Sizing</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            {patientWeight || patientAge ? 'Edit' : 'Add'} Patient
          </button>
        </div>

        {patientWeight || patientAge ? (
          <div className="mt-2">
            {patientWeight && (
              <p className="text-slate-700 dark:text-slate-300">
                Weight: <span className="font-medium">{patientWeight} kg</span> ({(patientWeight * 2.2).toFixed(1)} lb)
              </p>
            )}
            {patientAge && (
              <p className="text-slate-700 dark:text-slate-300">
                Age: <span className="font-medium">
                  {patientAge >= 24 ? `${Math.floor(patientAge / 12)} years` : `${patientAge} months`}
                </span>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Add patient information for accurate equipment sizing recommendations
          </p>
        )}
      </div>

      {/* Category tabs */}
      <div className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors flex items-center space-x-2
                ${selectedCategory === category 
                  ? 'bg-blue-600 text-white dark:bg-blue-700' 
                  : darkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <span>{getCategoryIcon(category)}</span>
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment list */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold capitalize">{selectedCategory} Equipment</h2>
        
        {equipmentByCategory[selectedCategory]?.map((equipment) => {
          const sizeInfo = getSizeDescription(equipment);
          
          return (
            <div 
              key={equipment.id} 
              className={`border rounded-lg overflow-hidden ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <div className={`p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h3 className="font-medium">{equipment.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{equipment.description}</p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Recommended Size:</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`font-semibold ${sizeInfo.isRecommended ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                        {sizeInfo.size}
                      </span>
                      {sizeInfo.isRecommended && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {sizeInfo.notes}
                    </div>
                  </div>
                  
                  {!sizeInfo.isRecommended && (
                    <button 
                      onClick={() => setShowPatientModal(true)}
                      className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                    >
                      Add Patient Info
                    </button>
                  )}
                </div>
              </div>
              
              {/* Available sizes section */}
              <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50'} p-4`}>
                <h4 className="text-sm font-medium mb-2">Available Sizes</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {equipment.availableSizes?.map((size, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded ${darkMode ? 'bg-slate-700' : 'bg-white'} text-sm flex justify-between`}
                    >
                      <span>{size.label || size.size}</span>
                      {size.reference && <span className="text-slate-500">{size.reference}</span>}
                    </div>
                  ))}
                </div>
                
                {/* Usage notes */}
                {equipment.notes && (
                  <div className="mt-3 text-xs bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-slate-700 dark:text-slate-300 border border-yellow-100 dark:border-yellow-900/50">
                    <span className="font-medium">Note: </span>
                    {equipment.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EquipmentPage;
