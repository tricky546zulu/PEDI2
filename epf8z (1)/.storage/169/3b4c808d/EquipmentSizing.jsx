import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateEquipmentSize } from '../utils/calculations';

function EquipmentSizing({ equipment }) {
  const { patientWeight, patientAge } = useAppContext();
  
  // Function to determine if we have the required patient data
  const hasRequiredData = () => {
    if (equipment.sizeBy === 'weight') {
      return patientWeight !== null;
    }
    if (equipment.sizeBy === 'age') {
      return patientAge !== null;
    }
    return patientWeight !== null || patientAge !== null;
  };
  
  // Calculate recommended size if patient data is available
  const getRecommendedSize = () => {
    if (!hasRequiredData()) return null;
    
    return calculateEquipmentSize(equipment, patientWeight, patientAge);
  };
  
  const recommendedSize = getRecommendedSize();
  
  return (
    <div className={`border ${equipment.critical ? 'border-red-200 dark:border-red-900/50' : 'border-slate-200 dark:border-slate-700'} rounded-lg overflow-hidden shadow-sm`}>
      <div className={`p-4 ${equipment.critical ? 'bg-red-50 dark:bg-red-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">
              {equipment.name}
              {equipment.critical && (
                <span className="ml-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded-full">
                  Critical
                </span>
              )}
            </h3>
            
            <div className="text-sm">
              <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded mb-1">
                {equipment.category}
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
              {equipment.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Display sizing information */}
      {hasRequiredData() ? (
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-start">
            {/* Primary sizing information */}
            <div className="flex-1">
              <h4 className="font-medium text-sm text-slate-500 dark:text-slate-400 mb-1">
                Recommended Size
              </h4>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                <p className="font-bold text-blue-800 dark:text-blue-300 text-lg">
                  {recommendedSize?.size}
                </p>
                
                {recommendedSize?.sizeDetails && (
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    {recommendedSize.sizeDetails}
                  </p>
                )}
                
                {recommendedSize?.formula && (
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-2">
                    Formula: {recommendedSize.formula}
                  </p>
                )}
              </div>
            </div>
            
            {/* Alternative sizes if available */}
            {recommendedSize?.alternativeSizes && recommendedSize.alternativeSizes.length > 0 && (
              <div className="ml-4 flex-1">
                <h4 className="font-medium text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Alternative Options
                </h4>
                
                <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-md">
                  <ul className="text-sm space-y-1.5">
                    {recommendedSize.alternativeSizes.map((alt, index) => (
                      <li key={index} className="text-slate-700 dark:text-slate-300">
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Notes or cautions */}
          {recommendedSize?.notes && (
            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-yellow-800 dark:text-yellow-300 text-sm">
              <strong>Note:</strong> {recommendedSize.notes}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-2">
            Set patient {equipment.sizeBy === 'weight' ? 'weight' : equipment.sizeBy === 'age' ? 'age' : 'weight or age'} to see recommended size
          </p>
        </div>
      )}
      
      {/* Reference table for sizes across age/weight if available */}
      {equipment.sizeChart && equipment.sizeChart.length > 0 && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700">
          <h4 className="font-medium mb-2">Size Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-3 py-2 rounded-tl-md">
                    {equipment.sizeBy === 'age' ? 'Age' : 'Weight (kg)'}
                  </th>
                  <th className="px-3 py-2 rounded-tr-md">Recommended Size</th>
                </tr>
              </thead>
              <tbody>
                {equipment.sizeChart.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-700/30'
                    } ${
                      (patientWeight && item.weightRange?.includes(patientWeight)) || 
                      (patientAge && item.ageRange?.includes(patientAge))
                        ? 'bg-blue-50 dark:bg-blue-900/30' 
                        : ''
                    }`}
                  >
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                      {equipment.sizeBy === 'age' ? item.ageRange : item.weightRange}
                    </td>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                      {item.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipmentSizing;
