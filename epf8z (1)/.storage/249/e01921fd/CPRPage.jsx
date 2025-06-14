import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import useCPRTimer from '../hooks/useCPRTimer';

function CPRPage() {
  const { patientWeight, patientAge, setShowPatientModal, darkMode } = useAppContext();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('timer'); // 'timer' or 'guide'

  // CPR timer hook
  const { 
    isRunning, 
    elapsedTime, 
    compressionCount, 
    compressionRate,
    toggleTimer, 
    resetTimer, 
    recordCompression, 
    secondsToTime 
  } = useCPRTimer();

  // Get pediatric CPR guidance based on patient age
  const getCPRGuidance = () => {
    // Default adult values
    let compressionDepth = "At least 2 inches (5cm)";
    let compressionRate = "100-120 compressions per minute";
    let compressionRatio = "30:2"; // compression to ventilation ratio
    let ageGroup = "Adult/Adolescent";
    
    if (!patientAge) {
      return {
        ageGroup: "Unknown",
        compressionDepth: "Age-appropriate",
        compressionRate,
        compressionRatio,
        notes: "Add patient information for specific guidance"
      };
    }

    if (patientAge < 1) { // Infant (< 1 month)
      ageGroup = "Neonate";
      compressionDepth = "⅓ anterior-posterior chest depth (approx. 1.5 inches/4cm)";
      compressionRate = "100-120 compressions per minute";
      compressionRatio = "3:1"; // 3 compressions to 1 ventilation for neonates
    } 
    else if (patientAge < 12) { // Infant (1-12 months)
      ageGroup = "Infant";
      compressionDepth = "⅓ anterior-posterior chest depth (approx. 1.5 inches/4cm)";
      compressionRate = "100-120 compressions per minute";
      compressionRatio = "30:2"; // for single rescuer; 15:2 for two healthcare providers
    }
    else if (patientAge < 96) { // Child (1-8 years)
      ageGroup = "Child";
      compressionDepth = "⅓ anterior-posterior chest depth (approx. 2 inches/5cm)";
      compressionRate = "100-120 compressions per minute";
      compressionRatio = "30:2"; // for single rescuer; 15:2 for two healthcare providers
    }
    
    return { 
      ageGroup, 
      compressionDepth, 
      compressionRate, 
      compressionRatio,
      notes: ""
    };
  };
  
  const cprGuidance = getCPRGuidance();

  // CPR events tracking
  const [events, setEvents] = useState([]);
  const addEvent = (type) => {
    const timestamp = elapsedTime;
    const formattedTime = secondsToTime(timestamp);
    
    const newEvent = {
      id: Date.now(),
      type,
      timestamp,
      formattedTime
    };
    
    setEvents(prev => [newEvent, ...prev]);
  };
  
  // Handle key press for marking compressions
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isRunning) return;
      
      // Space bar to record compression
      if (e.code === 'Space') {
        recordCompression();
      }
      
      // Key shortcuts for events
      switch (e.code) {
        case 'KeyE': // Epinephrine
          addEvent('Epinephrine administered');
          break;
        case 'KeyA': // Airway
          addEvent('Airway checked/cleared');
          break;
        case 'KeyV': // Ventilation
          addEvent('Ventilation performed');
          break;
        case 'KeyP': // Pulse check
          addEvent('Pulse check');
          break;
        case 'KeyR': // Rhythm check
          addEvent('Rhythm check');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, recordCompression]);

  return (
    <div className="space-y-6">
      {/* Patient information banner */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} ${patientWeight || patientAge ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">CPR Assistant</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            {patientWeight || patientAge ? 'Edit' : 'Add'} Patient
          </button>
        </div>

        {patientWeight || patientAge ? (
          <div className="mt-2">
            {patientAge && (
              <p className="text-slate-700 dark:text-slate-300">
                Age: <span className="font-medium">
                  {patientAge >= 24 ? `${Math.floor(patientAge / 12)} years` : `${patientAge} months`}
                </span> - 
                <span className="ml-1 font-medium text-blue-600 dark:text-blue-400">
                  {cprGuidance.ageGroup} CPR Protocol
                </span>
              </p>
            )}
            {patientWeight && (
              <p className="text-slate-700 dark:text-slate-300">
                Weight: <span className="font-medium">{patientWeight} kg</span> ({(patientWeight * 2.2).toFixed(1)} lb)
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Add patient details for age-specific CPR guidance
          </p>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'timer'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('timer')}
        >
          CPR Timer
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'guide'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('guide')}
        >
          CPR Guide
        </button>
      </div>

      {/* Timer Tab Content */}
      {activeTab === 'timer' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 text-center">
            <div className="text-6xl font-mono font-bold mb-4">
              {secondsToTime(elapsedTime)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                <div className="text-sm text-slate-500 dark:text-slate-400">Compression Count</div>
                <div className="text-3xl font-bold">{compressionCount}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded">
                <div className="text-sm text-slate-500 dark:text-slate-400">Rate (per min)</div>
                <div className={`text-3xl font-bold ${
                  compressionRate < 100 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : compressionRate > 120 
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                }`}>
                  {compressionRate || 0}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={toggleTimer}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isRunning
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? 'Stop Timer' : 'Start Timer'}
              </button>
              <button
                onClick={resetTimer}
                className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
                disabled={isRunning}
              >
                Reset
              </button>
            </div>
            
            {isRunning && (
              <div className="mt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Press <span className="font-bold">Space Bar</span> to count each compression
                </p>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => addEvent('Epinephrine administered')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium disabled:opacity-50"
              >
                Epinephrine (E)
              </button>
              <button
                onClick={() => addEvent('Airway checked/cleared')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-medium disabled:opacity-50"
              >
                Airway (A)
              </button>
              <button
                onClick={() => addEvent('Ventilation performed')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 font-medium disabled:opacity-50"
              >
                Ventilation (V)
              </button>
              <button
                onClick={() => addEvent('Pulse check')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-medium disabled:opacity-50"
              >
                Pulse Check (P)
              </button>
              <button
                onClick={() => addEvent('Rhythm check')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 font-medium disabled:opacity-50"
              >
                Rhythm (R)
              </button>
              <button
                onClick={() => addEvent('Shock delivered')}
                disabled={!isRunning}
                className="px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 font-medium disabled:opacity-50"
              >
                Shock
              </button>
            </div>
          </div>
          
          {/* Event Log */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">Event Log</h3>
            {events.length === 0 ? (
              <p className="text-center text-sm py-4 text-slate-500 dark:text-slate-400">
                Events will appear here during CPR
              </p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {events.map(event => (
                  <div 
                    key={event.id}
                    className="p-2 border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-700 rounded flex justify-between items-center"
                  >
                    <span className="text-sm">{event.type}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {event.formattedTime}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Guide Tab Content */}
      {activeTab === 'guide' && (
        <div className="space-y-4">
          {/* CPR Guidance Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-100 dark:border-blue-900/50">
              <h3 className="font-medium text-blue-800 dark:text-blue-300">
                {cprGuidance.ageGroup || 'Pediatric'} CPR Guidance
              </h3>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Compression Depth
                  </div>
                  <div className="font-medium">{cprGuidance.compressionDepth}</div>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Compression Rate
                  </div>
                  <div className="font-medium">{cprGuidance.compressionRate}</div>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Compression:Ventilation Ratio
                  </div>
                  <div className="font-medium">{cprGuidance.compressionRatio}</div>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Hand Position
                  </div>
                  <div className="font-medium">
                    {cprGuidance.ageGroup === 'Infant' 
                      ? 'Two fingers just below nipple line' 
                      : cprGuidance.ageGroup === 'Child'
                        ? 'Heel of one hand on lower half of sternum'
                        : 'Two hands on lower half of sternum'}
                  </div>
                </div>
              </div>
              
              {cprGuidance.notes && (
                <div className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-100 dark:border-yellow-900/50">
                  {cprGuidance.notes}
                </div>
              )}
            </div>
          </div>
          
          {/* PALS Algorithms Reference */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">Key PALS Algorithms</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => window.location.href = '/algorithms/pals-cardiac-arrest'}
              >
                <h4 className="font-medium">Cardiac Arrest</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Systematized approach to pediatric cardiac arrest management
                </p>
              </div>
              
              <div 
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => window.location.href = '/algorithms/pals-bradycardia'}
              >
                <h4 className="font-medium">Bradycardia</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Management of bradycardia with pulses and poor perfusion
                </p>
              </div>
              
              <div 
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => window.location.href = '/algorithms/pals-tachycardia'}
              >
                <h4 className="font-medium">Tachycardia</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Management of tachycardia with pulses and poor perfusion
                </p>
              </div>
              
              <div 
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                onClick={() => window.location.href = '/algorithms/pals-post-cardiac-arrest'}
              >
                <h4 className="font-medium">Post-Cardiac Arrest Care</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Specialized care following return of spontaneous circulation
                </p>
              </div>
            </div>
          </div>
          
          {/* CPR Tips */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">CPR Best Practices</h3>
            
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Ensure high-quality compressions with full chest recoil between compressions</li>
              <li>Minimize interruptions to chest compressions; aim for &lt;10 seconds for pulse checks</li>
              <li>Switch compressors every 2 minutes to prevent fatigue and maintain quality</li>
              <li>Use end-tidal CO2 monitoring when available to assess CPR quality</li>
              <li>Use backboard or firm surface to optimize compression effectiveness</li>
              <li>Deliver effective ventilations with visible chest rise, avoiding excessive ventilation</li>
            </ul>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">CPR Assistant Help</h3>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p>The CPR Assistant helps you track compression rates and document key events during resuscitation.</p>
              
              <div>
                <h4 className="font-medium mb-1">Keyboard Shortcuts</h4>
                <ul className="space-y-1 text-sm">
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">Space</span> - Record compression</li>
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">E</span> - Epinephrine given</li>
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">A</span> - Airway checked</li>
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">V</span> - Ventilation</li>
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">P</span> - Pulse check</li>
                  <li><span className="font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">R</span> - Rhythm check</li>
                </ul>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This tool is designed to assist healthcare professionals during pediatric resuscitation. Always follow your local protocols and guidelines.
              </p>
              
              <button 
                onClick={() => setShowInfoModal(false)}
                className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Help button */}
      <button
        onClick={() => setShowInfoModal(true)} 
        className="fixed bottom-24 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  );
}

export default CPRPage;
