import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PALSAlgorithm from '../components/PALSAlgorithm';
import { useAppContext } from '../contexts/AppContext';

function AlgorithmsPage() {
  const { offlineStorage } = useAppContext();
  const [algorithms, setAlgorithms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Algorithm categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'cardiac arrest', name: 'Cardiac Arrest' },
    { id: 'bradycardia', name: 'Bradycardia' },
    { id: 'tachycardia', name: 'Tachycardia' },
    { id: 'post resuscitation', name: 'Post-Resuscitation' }
  ];
  
  // Load algorithms from offline storage or mock data
  useEffect(() => {
    const loadAlgorithms = async () => {
      setIsLoading(true);
      
      try {
        let algorithmsData = [];
        
        // Try to load from IndexedDB first if available
        if (offlineStorage && offlineStorage.isAvailable) {
          const storedAlgorithms = await offlineStorage.getData('algorithms');
          if (storedAlgorithms && storedAlgorithms.length > 0) {
            algorithmsData = storedAlgorithms;
          }
        }
        
        // If no algorithms in IndexedDB, load from mock data
        if (algorithmsData.length === 0) {
          // Mock data for demonstration
          algorithmsData = [
            {
              id: 'cardiac-arrest',
              title: 'Pediatric Cardiac Arrest',
              category: 'cardiac arrest',
              patientType: 'All Pediatric Patients',
              steps: [
                { text: 'Start high-quality CPR', details: '100-120 compressions per minute, 1/3 AP chest diameter' },
                { text: 'Attach monitor/defibrillator', details: 'Check rhythm' },
                { text: 'Assess rhythm: Shockable or Non-shockable?' }
              ],
              notes: 'Prioritize high-quality CPR with minimal interruptions',
              imageUrl: '/assets/images/pals_cardiac_arrest.png'
            },
            {
              id: 'vfib-pulseless-vtach',
              title: 'VF/Pulseless VT',
              category: 'cardiac arrest',
              patientType: 'Pediatric Shockable Rhythms',
              steps: [
                { text: 'Shock: 2 J/kg', details: 'Immediately resume CPR after shock' },
                { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)' },
                { text: 'Consider advanced airway and capnography' }
              ],
              notes: 'Maximum epinephrine dose: 1 mg',
              imageUrl: '/assets/images/pals_vf_vt.png'
            },
            {
              id: 'pea-asystole',
              title: 'PEA/Asystole',
              category: 'cardiac arrest',
              patientType: 'Pediatric Non-shockable Rhythms',
              steps: [
                { text: 'Continue CPR', details: '2 minutes of uninterrupted compressions' },
                { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)' },
                { text: 'Consider advanced airway and capnography' }
              ],
              notes: 'Identify and treat possible causes: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis (pulmonary/coronary)',
              imageUrl: '/assets/images/pals_pea_asystole.png'
            },
            {
              id: 'bradycardia',
              title: 'Bradycardia with Pulse',
              category: 'bradycardia',
              patientType: 'Symptomatic Pediatric Patients',
              steps: [
                { text: 'Support ABCs', details: 'Give oxygen if needed' },
                { text: 'If HR < 60/min with poor perfusion despite oxygenation/ventilation, start CPR' },
                { text: 'Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO, or 0.1 mg/kg (0.1 mL/kg of 1:1,000) ET' }
              ],
              notes: 'Consider atropine for increased vagal tone or primary AV block',
              imageUrl: '/assets/images/pals_bradycardia.png'
            },
            {
              id: 'tachycardia-stable',
              title: 'Tachycardia with Pulse (Stable)',
              category: 'tachycardia',
              patientType: 'Stable Pediatric Patients',
              steps: [
                { text: 'Identify and treat underlying causes', details: 'Fever, pain, dehydration, etc.' },
                { text: 'Evaluate 12-lead ECG', details: 'QRS duration < 0.09s (narrow) or ≥ 0.09s (wide)' },
                { text: 'Consider vagal maneuvers for narrow QRS' }
              ],
              notes: 'Consult pediatric cardiology or emergency medicine for further management',
              imageUrl: '/assets/images/pals_tach_stable.png'
            },
            {
              id: 'tachycardia-unstable',
              title: 'Tachycardia with Pulse (Unstable)',
              category: 'tachycardia',
              patientType: 'Unstable Pediatric Patients',
              steps: [
                { text: 'Immediate synchronized cardioversion: 0.5-1 J/kg', details: 'Sedate if possible without delaying cardioversion' },
                { text: 'If ineffective, increase to 2 J/kg' },
                { text: 'Consider adenosine for suspected SVT: 0.1 mg/kg (max 6mg) rapid IV push' }
              ],
              notes: 'Unstable signs include altered mental status, poor perfusion, hypotension',
              imageUrl: '/assets/images/pals_tach_unstable.png'
            },
            {
              id: 'post-resuscitation',
              title: 'Post-Resuscitation Care',
              category: 'post resuscitation',
              patientType: 'Post-Cardiac Arrest Patients',
              steps: [
                { text: 'Support oxygenation and ventilation', details: 'Avoid excessive ventilation' },
                { text: 'Maintain BP with fluids and vasoactive drugs if needed' },
                { text: 'Monitor temperature', details: 'Prevent/treat fever' }
              ],
              notes: 'Consider targeted temperature management for patients who remain comatose',
              imageUrl: '/assets/images/pals_post_resuscitation.png'
            }
          ];
          
          // Store to IndexedDB if available
          if (offlineStorage && offlineStorage.isAvailable) {
            await offlineStorage.storeData('algorithms', algorithmsData);
          }
        }
        
        setAlgorithms(algorithmsData);
      } catch (error) {
        console.error("Error loading algorithms:", error);
        // Fallback to empty array in case of error
        setAlgorithms([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAlgorithms();
  }, [offlineStorage]);
  
  // Filter algorithms based on search query and selected category
  const filteredAlgorithms = algorithms.filter(algorithm => {
    const matchesSearch = searchQuery === '' || 
      algorithm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (algorithm.patientType && algorithm.patientType.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || algorithm.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-3">
          <label htmlFor="search" className="sr-only">Search Algorithms</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-1 space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Algorithms List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlgorithms.length > 0 ? (
            filteredAlgorithms.map(algorithm => (
              <PALSAlgorithm key={algorithm.id} algorithm={algorithm} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">No algorithms match your search.</p>
              <button 
                className="mt-4 text-blue-600 dark:text-blue-400"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">PALS Algorithms</h3>
        <p className="text-slate-600 dark:text-slate-300">
          These algorithms provide a structured approach to managing pediatric emergencies. 
          Tap on any algorithm to view detailed steps and guidance.
        </p>
      </div>
    </div>
  );
}

export default AlgorithmsPage;
