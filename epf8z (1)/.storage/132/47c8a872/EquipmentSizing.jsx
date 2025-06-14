import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

function EquipmentSizing({ equipment }) {
  const { patientWeight, patientAge } = useAppContext();
  const [recommendedSize, setRecommendedSize] = useState(null);

  // Determine the recommended size based on patient's age or weight
  useEffect(() => {
    const determineRecommendedSize = () => {
      if (!equipment.sizing || (!patientAge && !patientWeight)) {
        setRecommendedSize(null);
        return;
      }

      let matchedSize = null;

      // Try to match by weight first
      if (patientWeight) {
        matchedSize = equipment.sizing.find(size => {
          if (!size.weightRange) return false;
          return patientWeight >= size.weightRange[0] && patientWeight <= size.weightRange[1];
        });
      }

      // If no match by weight, try age
      if (!matchedSize && patientAge) {
        matchedSize = equipment.sizing.find(size => {
          if (!size.ageRange) return false;
          return patientAge >= size.ageRange[0] && patientAge <= size.ageRange[1];
        });
      }

      setRecommendedSize(matchedSize || null);
    };

    determineRecommendedSize();
  }, [equipment, patientWeight, patientAge]);

  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-lg shadow-sm ${equipment.critical ? 'border-red-200 dark:border-red-900/50' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{equipment.name}</h3>
              {equipment.critical && (
                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs px-2 py-0.5 rounded-full font-medium">
                  Critical
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {equipment.description}
            </p>
          </div>
          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded">
            {equipment.category.charAt(0).toUpperCase() + equipment.category.slice(1)}
          </span>
        </div>

        {/* Recommended size based on patient data */}
        {recommendedSize && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 p-3 rounded">
            <p className="font-medium text-green-800 dark:text-green-300">
              Recommended size:
            </p>
            <div className="mt-1 flex justify-between items-center">
              <span className="text-lg font-bold text-green-700 dark:text-green-400">
                {recommendedSize.size}
              </span>
              {recommendedSize.notes && (
                <span className="text-xs text-green-600 dark:text-green-500">
                  {recommendedSize.notes}
                </span>
              )}
            </div>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
              {patientWeight && recommendedSize.weightRange && `For weight: ${patientWeight} kg (${recommendedSize.weightRange[0]}-${recommendedSize.weightRange[1]} kg)`}
              {patientWeight && patientAge && recommendedSize.ageRange && ', '}
              {patientAge && recommendedSize.ageRange && `Age: ${patientAge} months (${(patientAge/12).toFixed(1)} years)`}
            </p>
          </div>
        )}

        {/* Formula if available */}
        {equipment.formula && (
          <div className="mt-3 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <p className="font-medium text-blue-800 dark:text-blue-300">Formula:</p>
            <p className="text-blue-700 dark:text-blue-400">{equipment.formula}</p>
          </div>
        )}

        {equipment.depthFormula && (
          <div className="mt-2 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <p className="font-medium text-blue-800 dark:text-blue-300">Insertion Depth:</p>
            <p className="text-blue-700 dark:text-blue-400">{equipment.depthFormula}</p>
          </div>
        )}
      </div>

      {/* Sizing chart */}
      <div className="border-t border-slate-200 dark:border-slate-700 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Age Range</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Weight (kg)</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Size</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {equipment.sizing.map((sizeOption, index) => (
              <tr 
                key={index} 
                className={recommendedSize === sizeOption ? 'bg-green-50 dark:bg-green-900/20' : ''}
              >
                <td className="px-3 py-2 whitespace-nowrap text-xs">
                  {sizeOption.ageRange ? 
                    `${(sizeOption.ageRange[0]/12).toFixed(1)}-${(sizeOption.ageRange[1]/12).toFixed(1)} years` 
                    : '-'}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs">
                  {sizeOption.weightRange ? 
                    Array.isArray(sizeOption.weightRange) ? 
                      `${sizeOption.weightRange[0]}-${sizeOption.weightRange[1]}` 
                      : sizeOption.weightRange 
                    : '-'}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                  {sizeOption.size}
                </td>
                <td className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
                  {sizeOption.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {equipment.notes && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">Note:</span> {equipment.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default EquipmentSizing;
