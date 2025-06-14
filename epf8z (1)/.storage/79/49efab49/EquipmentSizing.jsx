import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateEquipmentSize } from '../utils/calculations';

function EquipmentSizing({ equipment }) {
  const { patientWeight, patientAge, patientLength } = useAppContext();
  const [recommendedSize, setRecommendedSize] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  // Calculate recommended size based on patient data
  useEffect(() => {
    if (equipment) {
      const patientData = {
        age: patientAge,
        weight: patientWeight,
        length: patientLength
      };
      
      const sizeInfo = calculateEquipmentSize(patientData, equipment);
      setRecommendedSize(sizeInfo);
    }
  }, [equipment, patientAge, patientWeight, patientLength]);

  const getCategoryBadgeColor = () => {
    switch (equipment.category) {
      case 'airway':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'breathing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'circulation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'iv':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-lg overflow-hidden shadow-sm ${equipment.critical ? 'border-red-200 dark:border-red-900' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-bold">{equipment.name}</h3>
              {equipment.critical && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-200">
                  Critical
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getCategoryBadgeColor()}`}>
                {equipment.category.charAt(0).toUpperCase() + equipment.category.slice(1)}
              </span>
              {equipment.sizingMethod && (
                <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-slate-700 dark:text-slate-300">
                  {equipment.sizingMethod === 'formula' ? 'Formula-based' : 
                   equipment.sizingMethod === 'weight' ? 'Weight-based' : 
                   equipment.sizingMethod === 'age' ? 'Age-based' : 'Length-based'}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowSizeChart(!showSizeChart)}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-2"
            aria-label={showSizeChart ? "Hide size chart" : "Show size chart"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showSizeChart ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          <p>{equipment.description}</p>
        </div>

        {/* Recommended Size */}
        {(patientWeight || patientAge) ? (
          <div className={`mt-3 p-3 rounded-lg ${recommendedSize?.size ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Recommended size:</span>
              {recommendedSize?.size ? (
                <span className="text-lg font-bold text-green-700 dark:text-green-400">
                  {recommendedSize.size}
                </span>
              ) : (
                <span className="text-sm text-slate-500 dark:text-slate-400">Unable to determine</span>
              )}
            </div>
            
            <div className="flex flex-wrap justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              {patientWeight && <span>Weight: {patientWeight} kg</span>}
              {patientAge && <span>Age: {patientAge} months</span>}
            </div>
            
            {recommendedSize?.notes && (
              <div className="mt-2 text-xs flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-700 dark:text-blue-400">{recommendedSize.notes}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Enter patient details for sizing recommendation
              </span>
            </div>
          </div>
        )}

        {/* Size Chart */}
        {showSizeChart && equipment.sizes && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
            <h4 className="font-medium text-sm mb-2">Size Chart</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-2">Size</th>
                    <th className="px-3 py-2">Age Range</th>
                    <th className="px-3 py-2">Weight Range (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.sizes.map((size, index) => (
                    <tr key={index} className={`border-b dark:border-slate-700 ${recommendedSize?.size === size.value ? 'bg-green-50 dark:bg-green-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                      <td className="px-3 py-2 font-medium">
                        {size.value}
                        {recommendedSize?.size === size.value && (
                          <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">
                            ✓
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">{size.ageRange}</td>
                      <td className="px-3 py-2">{size.weightRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {equipment.notes && (
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs rounded">
                <span className="font-medium">Note: </span>{equipment.notes}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EquipmentSizing;
