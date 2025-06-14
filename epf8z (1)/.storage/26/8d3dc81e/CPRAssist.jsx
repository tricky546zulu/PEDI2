import React, { useState, useEffect, useRef } from 'react';
import { useCPRTimer } from '../hooks/useCPRTimer';

function CPRAssist() {
  const audioRef = useRef(null);
  const {
    isActive,
    seconds,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleMetronome,
    isMetronomeActive,
    compressionRate
  } = useCPRTimer();

  const [events, setEvents] = useState([]);

  // Add event to log
  const logEvent = (type, detail = '') => {
    const newEvent = {
      id: Date.now(),
      type,
      detail,
      timestamp: new Date().toISOString(),
      elapsedSeconds: seconds
    };
    
    setEvents(prev => [newEvent, ...prev]);
  };

  // Handle timer start
  const handleStart = () => {
    if (!isActive) {
      startTimer();
      logEvent('start', 'CPR started');
    } else {
      pauseTimer();
      logEvent('pause', 'CPR paused');
    }
  };

  // Handle timer reset
  const handleReset = () => {
    resetTimer();
    setEvents([]);
    logEvent('reset', 'CPR timer reset');
  };

  // Log medication administered
  const handleMedication = (medication) => {
    logEvent('medication', `${medication} administered`);
  };

  // Log rhythm check
  const handleRhythmCheck = () => {
    logEvent('rhythm', 'Rhythm check performed');
  };

  // Log shock delivered
  const handleShock = () => {
    logEvent('shock', 'Shock delivered');
  };

  // Format time display (MM:SS)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get event color by type
  const getEventColor = (type) => {
    switch (type) {
      case 'start': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pause': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reset': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medication': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'rhythm': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'shock': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* CPR Timer Display */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-md p-4 bg-slate-50 dark:bg-slate-800">
        <div className="text-center">
          <div className="text-4xl font-bold font-mono mb-4">
            {formatTime(seconds)}
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={handleStart}
              className={`px-4 py-2 rounded-lg font-medium ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200"
            >
              Reset
            </button>
            
            <button
              onClick={toggleMetronome}
              className={`px-4 py-2 rounded-lg font-medium ${
                isMetronomeActive 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200'
              }`}
            >
              {isMetronomeActive ? 'Metronome On' : 'Metronome Off'}
            </button>
          </div>
          
          {isMetronomeActive && (
            <div className="text-center mb-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">Compression Rate</div>
              <div className="font-bold">{compressionRate} compressions/min</div>
              <audio ref={audioRef} loop />
            </div>
          )}
        </div>
        
        {/* Quick Action Buttons */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Quick Actions:</div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleRhythmCheck}
              className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium"
            >
              Rhythm Check
            </button>
            <button 
              onClick={handleShock}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium"
            >
              Shock Delivered
            </button>
          </div>
        </div>
        
        {/* Medication Buttons */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Log Medication:</div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => handleMedication('Epinephrine')}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Epinephrine
            </button>
            <button 
              onClick={() => handleMedication('Amiodarone')}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              Amiodarone
            </button>
          </div>
        </div>
      </div>
      
      {/* Event Log */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-md overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-bold">Event Log</h3>
        </div>
        
        <div className="overflow-y-auto max-h-60">
          {events.length > 0 ? (
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {events.map(event => (
                <li key={event.id} className="p-3">
                  <div className="flex justify-between">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getEventColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatTime(event.elapsedSeconds)}
                    </span>
                  </div>
                  <div className="mt-1 text-sm">{event.detail}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400">
              No events logged yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CPRAssist;
