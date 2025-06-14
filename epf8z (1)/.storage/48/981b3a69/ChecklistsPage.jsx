import React, { useState, useEffect } from 'react';
import Checklists from '../components/Checklists';
import { useAppContext } from '../contexts/AppContext';

function ChecklistsPage() {
  const { offlineStorage } = useAppContext();
  const [checklists, setChecklists] = useState([]);
  const [completedChecklists, setCompletedChecklists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  
  // Load checklists data
  useEffect(() => {
    const loadChecklists = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const checklistsData = [
        {
          id: 'cardiac-arrest',
          title: 'Cardiac Arrest Checklist',
          description: 'High-quality CPR and resuscitation steps',
          items: [
            { text: 'Begin high-quality CPR immediately', details: '15:2 ratio (2 rescuers), 100-120 compressions/min', required: true },
            { text: 'Attach monitor/defibrillator', required: true },
            { text: 'Establish IV/IO access', required: true },
            { text: 'Give epinephrine every 3-5 minutes', details: '0.01 mg/kg (0.1 mL/kg of 1:10,000)', required: true },
            { text: 'Consider advanced airway', required: false },
            { text: 'Identify and treat reversible causes', details: 'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis', required: true }
          ]
        },
        {
          id: 'resp-distress',
          title: 'Respiratory Distress Checklist',
          description: 'Assessment and management steps',
          items: [
            { text: 'Assess airway patency', required: true },
            { text: 'Apply pulse oximetry', required: true },
            { text: 'Provide supplemental oxygen if SpO2 < 94%', required: true },
            { text: 'Assess work of breathing', details: 'Look for retractions, nasal flaring, grunting', required: true },
            { text: 'Position patient for comfort', required: false },
            { text: 'Consider bronchodilators for wheezing', required: false },
            { text: 'Reassess after interventions', required: true }
          ]
        },
        {
          id: 'seizure',
          title: 'Seizure Management Checklist',
          description: 'Steps for managing pediatric seizures',
          items: [
            { text: 'Note time seizure began', required: true },
            { text: 'Position patient to protect airway', details: 'Recovery position when possible', required: true },
            { text: 'Assess and maintain airway', required: true },
            { text: 'Administer oxygen if needed', required: false },
            { text: 'Consider medication for seizures > 5 min', details: 'Benzodiazepines per protocol', required: false },
            { text: 'Check blood glucose', required: true },
            { text: 'Document seizure characteristics', details: 'Duration, type of movement, post-ictal state', required: true }
          ]
        },
        {
          id: 'anaphylaxis',
          title: 'Anaphylaxis Checklist',
          description: 'Critical steps in managing anaphylactic reactions',
          items: [
            { text: 'Assess airway, breathing, circulation', required: true },
            { text: 'Administer epinephrine IM', details: '0.01 mg/kg (1:1,000) max 0.3 mg child, 0.5 mg adult', required: true },
            { text: 'Position patient appropriately', details: 'Supine with legs elevated if hypotensive', required: true },
            { text: 'Provide high-flow oxygen', required: true },
            { text: 'Establish IV/IO access', required: true },
            { text: 'Administer IV fluids for hypotension', details: '20 mL/kg bolus', required: false },
            { text: 'Consider secondary medications', details: 'Antihistamines, steroids, bronchodilators', required: false },
            { text: 'Reassess for response to treatment', required: true },
            { text: 'Prepare for repeat epinephrine if needed', details: 'Can repeat every 5-15 minutes if needed', required: false }
          ]
        },
        {
          id: 'trauma',
          title: 'Pediatric Trauma Assessment',
          description: 'Systematic approach to pediatric trauma',
          items: [
            { text: 'Ensure scene safety', required: true },
            { text: 'Assess airway with c-spine protection', required: true },
            { text: 'Evaluate breathing and provide support as needed', required: true },
            { text: 'Assess circulation and control bleeding', required: true },
            { text: 'Check disability (AVPU or GCS)', required: true },
            { text: 'Expose patient and check temperature', required: true },
            { text: 'Conduct secondary assessment', required: false },
            { text: 'Apply appropriate splints/immobilization', required: false },
            { text: 'Reassess vitals frequently', required: true },
            { text: 'Consider transport decision based on trauma triage criteria', required: true }
          ]
        },
        {
          id: 'handoff',
          title: 'Patient Handoff Checklist',
          description: 'Structured communication for patient transfers',
          items: [
            { text: 'Patient age and weight', required: true },
            { text: 'Chief complaint and history', required: true },
            { text: 'Vital signs and trends', required: true },
            { text: 'Interventions performed', required: true },
            { text: 'Response to interventions', required: true },
            { text: 'Medications administered', details: 'Include dose, time, route', required: false },
            { text: 'Allergies', required: true },
            { text: 'Special considerations or concerns', required: false },
            { text: 'Family information/contact', required: false }
          ]
        }
      ];
      
      // Load completed checklists from localStorage
      try {
        const savedChecklists = JSON.parse(localStorage.getItem('completedChecklists') || '[]');
        setCompletedChecklists(savedChecklists);
      } catch (error) {
        console.error('Error loading completed checklists:', error);
        setCompletedChecklists([]);
      }
      
      setChecklists(checklistsData);
      setIsLoading(false);
    };
    
    loadChecklists();
  }, []);
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'current' 
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('current')}
        >
          Checklists
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'completed' 
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>
      
      {/* Current Checklists Tab */}
      {activeTab === 'current' && (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {checklists.map(checklist => (
                <Checklists key={checklist.id} checklist={checklist} />
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Completed Checklists Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedChecklists.length > 0 ? (
            completedChecklists.map((completed, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{completed.title}</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(completed.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-2">Completed Items:</h4>
                  <ul className="space-y-1">
                    {completed.completedItems.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">No completed checklists yet.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">Clinical Checklists</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Use these checklists to ensure critical steps are completed during pediatric emergencies.
          Required items are marked with an asterisk (*). Completed checklists are saved for reference.
        </p>
      </div>
    </div>
  );
}

export default ChecklistsPage;
