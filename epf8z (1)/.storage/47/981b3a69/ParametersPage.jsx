import React, { useState, useEffect } from 'react';
import PhysiologicalParameters from '../components/PhysiologicalParameters';
import { useAppContext } from '../contexts/AppContext';
import { getVitalSignsForAge } from '../utils/calculations';

function ParametersPage() {
  const { patientAge } = useAppContext();
  const [ageGroups, setAgeGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('normal-values');
  
  // Load age groups data
  useEffect(() => {
    const loadParameters = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const ageGroupsData = [
        {
          id: 'newborn',
          label: 'Newborn',
          ageRange: '0-1 month',
          hrRange: [100, 160],
          rrRange: [30, 60],
          sbpRange: [60, 90],
          dbpRange: [30, 60],
          weightRange: [2, 5],
          notes: 'HR increases with crying; BP varies with state (sleep/awake)'
        },
        {
          id: 'infant',
          label: 'Infant',
          ageRange: '1-12 months',
          hrRange: [90, 150],
          rrRange: [25, 40],
          sbpRange: [70, 100],
          dbpRange: [45, 65],
          weightRange: [4, 10],
          notes: 'Weight (kg) can be estimated as age in months + 4 for first few months'
        },
        {
          id: 'toddler',
          label: 'Toddler',
          ageRange: '1-3 years',
          hrRange: [80, 140],
          rrRange: [20, 30],
          sbpRange: [80, 110],
          dbpRange: [50, 70],
          weightRange: [10, 15],
          notes: 'Normal systolic BP: ~90 + (age in years × 2)'
        },
        {
          id: 'preschooler',
          label: 'Preschooler',
          ageRange: '3-5 years',
          hrRange: [70, 120],
          rrRange: [20, 25],
          sbpRange: [90, 110],
          dbpRange: [55, 70],
          weightRange: [14, 18],
          notes: ''
        },
        {
          id: 'school-age',
          label: 'School Age',
          ageRange: '6-12 years',
          hrRange: [70, 110],
          rrRange: [15, 20],
          sbpRange: [95, 120],
          dbpRange: [55, 80],
          weightRange: [20, 42],
          notes: ''
        },
        {
          id: 'adolescent',
          label: 'Adolescent',
          ageRange: '13-18 years',
          hrRange: [60, 100],
          rrRange: [12, 20],
          sbpRange: [110, 135],
          dbpRange: [60, 85],
          weightRange: [>40, 70],
          notes: 'Adult values increasingly apply as teens approach maturity'
        }
      ];
      
      // If patient age is set, calculate their specific parameters and add to the top
      if (patientAge !== null) {
        const vitalSigns = getVitalSignsForAge(patientAge);
        const patientParameters = {
          id: 'patient-specific',
          label: 'Patient Specific Values',
          ageRange: `${patientAge} months`,
          hrRange: vitalSigns.hrRange,
          rrRange: vitalSigns.rrRange,
          sbpRange: vitalSigns.sbpRange,
          dbpRange: vitalSigns.dbpRange,
          weightRange: [null, null], // Will be filled by patient weight
          notes: 'Based on current patient age'
        };
        
        setAgeGroups([patientParameters, ...ageGroupsData]);
      } else {
        setAgeGroups(ageGroupsData);
      }
      
      setIsLoading(false);
    };
    
    loadParameters();
  }, [patientAge]);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'normal-values' 
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('normal-values')}
        >
          Normal Values
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'assessment' 
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'text-slate-600 dark:text-slate-400'
          }`}
          onClick={() => setActiveTab('assessment')}
        >
          Assessment Guides
        </button>
      </div>
      
      {/* Normal Values Tab */}
      {activeTab === 'normal-values' && (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {ageGroups.map(ageGroup => (
                <PhysiologicalParameters 
                  key={ageGroup.id} 
                  ageGroup={ageGroup}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Assessment Guides Tab */}
      {activeTab === 'assessment' && (
        <div className="space-y-4">
          {/* AVPU Scale */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold mb-2">AVPU Scale</h3>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg">
                <strong className="text-green-700 dark:text-green-400">A - Alert</strong>
                <p className="text-sm text-slate-600 dark:text-slate-300">Child is awake, responsive to voice, follows commands</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
                <strong className="text-yellow-700 dark:text-yellow-400">V - Responds to Voice</strong>
                <p className="text-sm text-slate-600 dark:text-slate-300">Responds when spoken to but may be confused</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-lg">
                <strong className="text-orange-700 dark:text-orange-400">P - Responds to Pain</strong>
                <p className="text-sm text-slate-600 dark:text-slate-300">Responds only to painful stimuli; decreased level of consciousness</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
                <strong className="text-red-700 dark:text-red-400">U - Unresponsive</strong>
                <p className="text-sm text-slate-600 dark:text-slate-300">No response to voice or pain; unconscious</p>
              </div>
            </div>
          </div>
          
          {/* Pediatric Assessment Triangle */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold mb-2">Pediatric Assessment Triangle</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400">Appearance</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  The "Pediatric TICLS": Tone, Interactivity, Consolability, Look/gaze, Speech/cry
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                  <li>Normal: Alert, interactive, good tone, consolable, makes eye contact</li>
                  <li>Abnormal: Listless, poor tone, inconsolable, avoids gaze</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400">Work of Breathing</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                  <li>Normal: Easy breathing, no retractions/grunting</li>
                  <li>Abnormal: Nasal flaring, retractions, grunting, stridor, wheezing</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400">Circulation</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                  <li>Normal: Pink skin, mucous membranes; brisk capillary refill</li>
                  <li>Abnormal: Pale, mottled, cyanotic; prolonged capillary refill (&gt;2 sec)</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Capillary Refill */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-bold mb-2">Capillary Refill Time</h3>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg">
                <strong className="text-green-700 dark:text-green-400">Normal: &lt;2 seconds</strong>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
                <strong className="text-yellow-700 dark:text-yellow-400">Borderline: 2-3 seconds</strong>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
                <strong className="text-red-700 dark:text-red-400">Abnormal: &gt;3 seconds</strong>
                <p className="text-sm text-red-600 dark:text-red-400">May indicate poor perfusion, dehydration, or shock</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">Physiological Parameters Reference</h3>
        <p className="text-slate-600 dark:text-slate-300">
          This reference guide provides normal ranges for vital signs by age group. Use these as a general guideline and always consider the complete clinical picture when assessing a patient.
        </p>
      </div>
    </div>
  );
}

export default ParametersPage;
