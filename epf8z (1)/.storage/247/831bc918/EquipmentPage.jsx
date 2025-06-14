import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import equipmentSizes from '../data/equipmentSizes';

function EquipmentPage() {
  const { patientWeight, patientAge, setShowPatientModal, darkMode } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('endotrachealTubes');

  // Extract categories from equipmentSizes
  const categories = useMemo(() => {
    return Object.keys(equipmentSizes);
  }, []);

  // Format category name for display
  const formatCategoryName = (category) => {
    return category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Determine appropriate equipment size based on patient weight or age
  const getRecommendedSize = (category, items) => {
    if (!patientWeight && !patientAge) {
      return { 
        found: false, 
        message: 'Add patient information for sizing' 
      };
    }

    // Find matching item based on weight or age
    let matchedItem = null;
    
    // Try matching by weight first
    if (patientWeight) {
      matchedItem = items.find(item => {
        if (item.weight) {
          // Handle weight ranges like "10-15"
          if (typeof item.weight === 'string' && item.weight.includes('-')) {
            const [min, max] = item.weight.split('-').map(w => parseFloat(w));
            return patientWeight >= min && patientWeight <= max;
          }
          // Handle "less than" weights like "<1"
          else if (typeof item.weight === 'string' && item.weight.startsWith('<')) {
            const max = parseFloat(item.weight.substring(1));
            return patientWeight < max;
          }
          // Handle "greater than" weights like ">35"
          else if (typeof item.weight === 'string' && item.weight.startsWith('>')) {
            const min = parseFloat(item.weight.substring(1));
            return patientWeight > min;
          }
        }
        return false;
      });
    }
    
    // If no match by weight, try by age range
    if (!matchedItem && patientAge) {
      const ageInYears = patientAge / 12;
      
      matchedItem = items.find(item => {
        if (item.ageRange) {
          if (item.ageRange.includes('Premature') && patientAge < 1) {
            return true;
          }
          else if (item.ageRange.includes('Newborn') && patientAge < 1) {
            return true;
          }
          else if (item.ageRange.includes('Infant') && patientAge < 12) {
            return true;
          }
          else if (item.ageRange.includes('Toddler') && patientAge >= 12 && patientAge < 36) {
            return true;
          }
          else if (item.ageRange.includes('Preschool') && patientAge >= 36 && patientAge < 60) {
            return true;
          }
          else if (item.ageRange.includes('School Age') && patientAge >= 60 && patientAge < 144) {
            return true;
          }
          else if (item.ageRange.includes('Adolescent') && patientAge >= 144) {
            return true;
          }
          // Handle specific age ranges like "1-2 years"
          else if (item.ageRange.includes('-')) {
            // Extract numbers and units
            const rangeMatch = item.ageRange.match(/(\d+)-(\d+)\s+(month|year)s?/i);
            if (rangeMatch) {
              const min = parseInt(rangeMatch[1]);
              const max = parseInt(rangeMatch[2]);
              const unit = rangeMatch[3].toLowerCase();
              
              if (unit === 'year') {
                return ageInYears >= min && ageInYears <= max;
              } else if (unit === 'month') {
                return patientAge >= min && patientAge <= max;
              }
            }
          }
        }
        return false;
      });
    }

    if (!matchedItem) {
      return {
        found: false,
        message: 'No appropriate size found for this patient'
      };
    }

    // For endotracheal tubes, decide between cuffed and uncuffed
    let recommendedSize;
    if (category === 'endotrachealTubes') {
      recommendedSize = patientAge < 12 ? matchedItem.uncuffedETT : matchedItem.cuffedETT;
    } else {
      // Find the most appropriate field to use as size
      recommendedSize = matchedItem.size || matchedItem.ivCatheter || matchedItem.laryngoscopeBlade || matchedItem.ioNeedle;
    }

    return {
      found: true,
      item: matchedItem,
      recommendedSize: recommendedSize
    };
  };

  // Get additional info from the matched item
  const getAdditionalInfo = (category, matchedItem) => {
    switch (category) {
      case 'endotrachealTubes':
        return matchedItem.depth ? `Insertion depth: ${matchedItem.depth} cm` : '';
      case 'laryngealMaskAirways':
        return matchedItem.maxInflationVolume ? `Max inflation: ${matchedItem.maxInflationVolume}` : '';
      case 'ivCatheters':
      case 'ioNeedles':
        return matchedItem.color ? `Color: ${matchedItem.color}` : '';
      case 'ngTubes':
      case 'chestTubes':
        return 'See notes for proper placement';
      default:
        return '';
    }
  };

  // Category icons
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'endotrachealTubes':
      case 'oralAirways':
      case 'nasalAirways':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'laryngealMaskAirways':
      case 'suctionCatheters':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'bladeCuffSizes':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      case 'ivCatheters':
      case 'ioNeedles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'ngTubes':
      case 'chestTubes':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
              <span>{formatCategoryName(category)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment list */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold capitalize">{formatCategoryName(selectedCategory)}</h2>
        
        {equipmentSizes[selectedCategory]?.map((item, index) => {
          const sizeRecommendation = getRecommendedSize(selectedCategory, equipmentSizes[selectedCategory]);
          const isRecommended = sizeRecommendation.found && sizeRecommendation.item === item;
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg overflow-hidden ${isRecommended ? 'border-blue-500 dark:border-blue-400' : darkMode ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <div className={`p-4 ${isRecommended ? 'bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {item.ageRange && <span>{item.ageRange}</span>}
                    {item.weight && <span className="ml-2 text-slate-600 dark:text-slate-400">{item.weight} kg</span>}
                  </h3>
                  {isRecommended && (
                    <div className="flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-xs font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Recommended
                    </div>
                  )}
                </div>
                
                {/* Display main equipment information */}
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(item).map(([key, value]) => {
                    // Skip ageRange and weight as they're already shown, and notes which will be shown separately
                    if (key === 'ageRange' || key === 'weight' || key === 'notes') {
                      return null;
                    }
                    
                    return (
                      <div key={key} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
                        <span className="text-slate-600 dark:text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Show notes if available */}
                {item.notes && (
                  <div className="mt-3 text-xs bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded text-slate-700 dark:text-slate-300 border border-yellow-100 dark:border-yellow-900/50">
                    <span className="font-medium">Note: </span>
                    {item.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* No patient information message */}
        {!patientWeight && !patientAge && (
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            <button
              onClick={() => setShowPatientModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Patient Information
            </button>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter patient details to get personalized equipment sizing recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EquipmentPage;
