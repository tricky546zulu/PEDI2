import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { calculateEquipmentSize } from '../utils/calculations';

function EquipmentSizing({ equipment }) {
  const { patientWeight, patientAge, patientLength } = useAppContext();
  
  // Calculate the recommended equipment size
  const recommendedSize = calculateEquipmentSize(
    equipment, 
    patientWeight,
    patientAge,
    patientLength
  );
  
  // Function to get style based on importance
  const getImportanceStyle = () => {
    if (equipment.critical) {
      return 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/30';
    }
    return 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800';
  };

  return (
    <div className={`p-4 rounded-lg border shadow-sm mb-4 ${getImportanceStyle()}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{equipment.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{equipment.description}</p>
        </div>
        
        {equipment.critical && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-red-900 dark:text-red-100">
            Critical
          </span>
        )}
      </div>
      
      {recommendedSize ? (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-xs uppercase font-medium text-blue-700 dark:text-blue-300">Recommended Size</div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{recommendedSize}</div>
          
          {equipment.sizeFormula && (
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Formula: {equipment.sizeFormula}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <p className="text-sm">
            Please enter patient details to calculate recommended size
          </p>
        </div>
      )}
      
      {/* Size range information */}
      <div className="mt-4">
        <div className="text-xs uppercase font-medium text-slate-500 dark:text-slate-400">Available Sizes</div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {equipment.sizes.map((size, index) => (
            <div 
              key={index} 
              className={`text-sm p-2 border rounded-md ${
                recommendedSize === size.value 
                  ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/50' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="font-medium">{size.value}</div>
              {size.ageRange && <div className="text-xs text-slate-500 dark:text-slate-400">{size.ageRange}</div>}
              {size.weightRange && <div className="text-xs text-slate-500 dark:text-slate-400">{size.weightRange} kg</div>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Usage notes */}
      {equipment.notes && (
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 italic">
          Note: {equipment.notes}
        </div>
      )}
    </div>
  );
}

export default EquipmentSizing;
