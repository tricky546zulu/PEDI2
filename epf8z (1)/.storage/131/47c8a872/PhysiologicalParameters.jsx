import React from 'react';

function PhysiologicalParameters({ ageGroup }) {
  const formatRange = (value) => {
    if (!value) return '-';
    return value;
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg">{ageGroup.label}</h3>
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs">
            Age: {(ageGroup.ageRange[0]/12).toFixed(1)}-{(ageGroup.ageRange[1]/12).toFixed(1)} years
          </span>
          <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs">
            Weight: {ageGroup.weightRange[0]}-{ageGroup.weightRange[1]} kg
          </span>
        </div>
        {ageGroup.notes && (
          <div className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
            {ageGroup.notes}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Parameter</th>
              <th className="px-4 py-2 text-center text-sm font-medium">Low</th>
              <th className="px-4 py-2 text-center text-sm font-medium">Normal Range</th>
              <th className="px-4 py-2 text-center text-sm font-medium">High</th>
              <th className="px-4 py-2 text-center text-sm font-medium">Units</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            <tr>
              <td className="px-4 py-3">Heart Rate</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.heartRate?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.heartRate?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.heartRate?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.heartRate?.units}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Respiratory Rate</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.respiratoryRate?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.respiratoryRate?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.respiratoryRate?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.respiratoryRate?.units}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Systolic BP</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.systolicBP?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.systolicBP?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.systolicBP?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.systolicBP?.units}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Diastolic BP</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.diastolicBP?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.diastolicBP?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.diastolicBP?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.diastolicBP?.units}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Oxygen Saturation</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.oxygenSaturation?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.oxygenSaturation?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.oxygenSaturation?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.oxygenSaturation?.units}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Temperature</td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.temperature?.low)}
              </td>
              <td className="px-4 py-3 text-center font-medium">
                {formatRange(ageGroup.temperature?.normal)}
              </td>
              <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                {formatRange(ageGroup.temperature?.high)}
              </td>
              <td className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                {ageGroup.temperature?.units}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {ageGroup.temperature?.notes && (
        <div className="p-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
          <strong>Note:</strong> {ageGroup.temperature.notes}
        </div>
      )}
    </div>
  );
}

export default PhysiologicalParameters;
