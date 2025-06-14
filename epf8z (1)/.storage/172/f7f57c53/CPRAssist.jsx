import React, { useEffect, useState } from 'react';
import { useCPRTimer } from '../hooks/useCPRTimer';

function CPRAssist() {
  const {
    isRunning,
    elapsedTime,
    compressionCount,
    compressionRate,
    startTimer,
    stopTimer,
    resetTimer,
    addCompression,
    lastCompressionTime
  } = useCPRTimer();
  
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [metronomeAudio, setMetronomeAudio] = useState(null);
  const [alertAudio, setAlertAudio] = useState(null);
  const [lastMedicationTimes, setLastMedicationTimes] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  // Common medications used during CPR
  const medications = [
    { id: 'epi', name: 'Epinephrine', interval: 180, color: 'bg-red-100 dark:bg-red-900/30' },
    { id: 'amio', name: 'Amiodarone', interval: 300, color: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 'lido', name: 'Lidocaine', interval: 300, color: 'bg-green-100 dark:bg-green-900/30' },
    { id: 'bicarb', name: 'Sodium Bicarb', interval: 180, color: 'bg-yellow-100 dark:bg-yellow-900/30' }
  ];

  // Initialize audio elements
  useEffect(() => {
    const metronomeSound = new Audio('/assets/audio/click.mp3');
    setMetronomeAudio(metronomeSound);
    
    const alertSound = new Audio('/assets/audio/alert.mp3');
    setAlertAudio(alertSound);
    
    return () => {
      metronomeSound.pause();
      alertSound.pause();
    };
  }, []);

  // Play metronome sound at appropriate rate when timer is running
  useEffect(() => {
    if (!isRunning || !audioEnabled || !metronomeAudio) return;
    
    const metronomeInterval = setInterval(() => {
      metronomeAudio.currentTime = 0;
      metronomeAudio.play().catch(err => console.error('Error playing audio:', err));
    }, 60000 / 100); // 100 beats per minute for pediatric CPR
    
    return () => {
      clearInterval(metronomeInterval);
    };
  }, [isRunning, audioEnabled, metronomeAudio]);

  // Play alert sound at 2-minute intervals for rhythm/pulse check
  useEffect(() => {
    if (!isRunning || !alertAudio) return;
    
    // Check every second if we've hit a 2-minute mark
    const checkTimeInterval = setInterval(() => {
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      
      if (seconds === 0 && minutes > 0 && minutes % 2 === 0) {
        if (audioEnabled) {
          alertAudio.play().catch(err => console.error('Error playing alert audio:', err));
        }
      }
    }, 1000);
    
    return () => {
      clearInterval(checkTimeInterval);
    };
  }, [isRunning, elapsedTime, alertAudio, audioEnabled]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    
    // Stop any playing audio immediately if disabling
    if (audioEnabled && metronomeAudio) {
      metronomeAudio.pause();
      metronomeAudio.currentTime = 0;
    }
  };

  const recordMedication = (medicationId) => {
    const now = Date.now();
    setLastMedicationTimes(prev => ({
      ...prev,
      [medicationId]: now
    }));
    
    // Play alert sound when medication is recorded
    if (audioEnabled && alertAudio) {
      alertAudio.currentTime = 0;
      alertAudio.play().catch(err => console.error('Error playing audio:', err));
    }
  };

  // Format time as mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Calculate time since last medication dose
  const getTimeSinceLastDose = (medicationId) => {
    const lastTime = lastMedicationTimes[medicationId];
    if (!lastTime) return null;
    
    const elapsedSeconds = Math.floor((Date.now() - lastTime) / 1000);
    return formatTime(elapsedSeconds);
  };

  // Calculate if it's time for another dose
  const isDueForDose = (medicationId) => {
    const medication = medications.find(med => med.id === medicationId);
    const lastTime = lastMedicationTimes[medicationId];
    
    if (!lastTime || !medication) return false;
    
    const elapsedSeconds = Math.floor((Date.now() - lastTime) / 1000);
    return elapsedSeconds >= medication.interval;
  };

  // Render compression rate with appropriate color coding
  const renderCompressionRate = () => {
    let rateClass = 'text-green-600 dark:text-green-400';
    
    // Color code based on pediatric CPR guidelines (100-120 compressions/min)
    if (compressionRate < 100) {
      rateClass = 'text-red-600 dark:text-red-400';
    } else if (compressionRate > 120) {
      rateClass = 'text-yellow-600 dark:text-yellow-400';
    }
    
    return <span className={rateClass}>{compressionRate}</span>;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
      {/* Main CPR timer */}
      <div className="p-6 text-center">
        <div className="text-5xl font-bold mb-4">{formatTime(elapsedTime)}</div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-sm text-blue-700 dark:text-blue-400 font-medium">Compressions</div>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-300">{compressionCount}</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-sm text-purple-700 dark:text-purple-400 font-medium">Rate/min</div>
            <div className="text-3xl font-bold">{renderCompressionRate()}</div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex-1"
            >
              Start CPR
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex-1"
            >
              Pause
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="px-5 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-medium"
          >
            Reset
          </button>
          
          <button
            onClick={toggleAudio}
            className={`px-5 py-3 rounded-lg font-medium ${audioEnabled
              ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200' 
              : 'bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300'
            }`}
          >
            {audioEnabled ? 'Mute' : 'Unmute'}
          </button>
        </div>

        {isRunning && (
          <button
            onClick={addCompression}
            className="w-full mt-4 px-5 py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xl font-bold"
          >
            Record Compression
          </button>
        )}
      </div>
      
      {/* Medication tracking */}
      <div className="border-t border-slate-200 dark:border-slate-700">
        <div className="p-4 flex justify-between items-center">
          <h3 className="font-medium text-lg">Medication Tracking</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 dark:text-blue-400 text-sm flex items-center"
          >
            {showDetails ? 'Hide' : 'Show'} Details
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {medications.map(medication => (
              <div 
                key={medication.id}
                className={`${medication.color} rounded-lg p-4 relative overflow-hidden`}
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">{medication.name}</h4>
                  {isDueForDose(medication.id) && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Due
                    </span>
                  )}
                </div>
                
                {showDetails && lastMedicationTimes[medication.id] && (
                  <div className="text-sm mb-3">
                    <p>Last dose: {getTimeSinceLastDose(medication.id)} ago</p>
                    <p>Interval: {Math.floor(medication.interval / 60)} min</p>
                  </div>
                )}
                
                <button
                  onClick={() => recordMedication(medication.id)}
                  className="w-full py-2 bg-white dark:bg-slate-700 bg-opacity-70 hover:bg-opacity-100 rounded text-sm font-medium"
                >
                  {lastMedicationTimes[medication.id] ? 'Record Again' : 'Record First Dose'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CPR Guidelines */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-medium text-lg mb-2">Pediatric CPR Guidelines</h3>
        
        <div className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
          <p>• Rate: 100-120 compressions/minute</p>
          <p>• Depth: ~1/3 AP chest diameter (4-5 cm for infants, 5+ cm for children)</p>
          <p>• Rhythm check: Every 2 minutes</p>
          <p>• Compression-to-ventilation ratio: 30:2 (single rescuer), 15:2 (two rescuers)</p>
          <p>• Minimize interruptions to chest compressions</p>
        </div>
      </div>
    </div>
  );
}

export default CPRAssist;
