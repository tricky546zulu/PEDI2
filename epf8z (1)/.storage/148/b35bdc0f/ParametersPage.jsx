import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import PhysiologicalParameters from '../components/PhysiologicalParameters';

function ParametersPage() {
  const { offlineStorage } = useAppContext();
  const [vitalSigns, setVitalSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

  // Load vital signs data
  useEffect(() => {
    const fetchVitalSigns = async () => {
      setLoading(true);
      try {
        let data;
        
        // Try to get data from offline storage first
        if (offlineStorage.isAvailable) {
          data = await offlineStorage.getData('vitalSigns');
        }
        
        // If no offline data or it's empty, load from static file
        if (!data || data.length === 0) {
          const importedData = (await import('../data/vitalSigns')).default;
          data = importedData;
          
          // Save to offline storage for future use
          if (offlineStorage.isAvailable) {
            await offlineStorage.storeData('vitalSigns', importedData);
          }
        }
        
        setVitalSigns(data);
        setError(null);
      } catch (err) {
        console.error('Error loading vital signs data:', err);
        setError('Failed to load physiological parameters data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVitalSigns();
  }, [offlineStorage]);

  // Filter vital signs data based on selected age group
  const filteredVitalSigns = selectedAgeGroup === 'all' 
    ? vitalSigns 
    : vitalSigns.filter(item => item.id === selectedAgeGroup);

  return (
    <div className="pb-16">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Physiological Parameters by Age Group</h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white"
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
          >
            <option value="all">All Age Groups</option>
            {vitalSigns.map(group => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-4">
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {/* No results */}
      {!loading && !error && filteredVitalSigns.length === 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4 text-center">
          <p className="text-slate-700 dark:text-slate-300">
            No vital signs data available for the selected age group.
          </p>
        </div>
      )}
      
      {/* Age group vital signs */}
      <div className="space-y-6">
        {filteredVitalSigns.map(ageGroup => (
          <PhysiologicalParameters
            key={ageGroup.id}
            ageGroup={ageGroup}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4">
          <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Signs of Decompensation</h3>
          <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 text-sm space-y-1">
            <li>Increased work of breathing (retractions, nasal flaring, grunting)</li>
            <li>Increased or decreased heart rate outside of normal range</li>
            <li>Poor perfusion (capillary refill &gt; 2 seconds)</li>
            <li>Altered mental status</li>
            <li>Hypotension (late sign in pediatric patients)</li>
            <li>Decreased urine output</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p><strong>Note:</strong> The normal ranges provided are general guidelines. Individual patient assessment and clinical context should guide medical decision-making.</p>
      </div>
    </div>
  );
}

export default ParametersPage;
