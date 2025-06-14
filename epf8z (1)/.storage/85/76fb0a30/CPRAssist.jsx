import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';

function CPRAssist() {
  const { patientAge } = useAppContext();
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEventInput, setShowEventInput] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [bpmRate, setBpmRate] = useState(100);
  
  const intervalRef = useRef(null);
  const metronomeRef = useRef(null);
  const beepRef = useRef(null);
  
  // Initialize audio contexts
  useEffect(() => {
    // Create beep sound for metronome
    beepRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (beepRef.current && beepRef.current.state !== 'closed') beepRef.current.close();
    };
  }, []);

  // Timer function
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);
  
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Play beep sound for metronome
  const playBeep = () => {
    if (!beepRef.current) return;
    
    // Create oscillator
    const oscillator = beepRef.current.createOscillator();
    const gainNode = beepRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(beepRef.current.destination);
    
    // Set frequency and volume
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.5;
    
    // Schedule the beep
    oscillator.start();
    oscillator.stop(beepRef.current.currentTime + 0.1);
  };

  // Toggle timer
  const handleToggleTimer = () => {
    if (!isRunning) {
      // Starting timer
      setIsRunning(true);
    } else {
      // Pausing timer
      setIsRunning(false);
    }
  };

  // Reset timer
  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setEvents([]);
    if (metronomeRef.current) {
      clearInterval(metronomeRef.current);
      setMetronomeActive(false);
    }
  };

  // Toggle metronome
  const handleToggleMetronome = () => {
    if (metronomeActive) {
      // Stop metronome
      if (metronomeRef.current) clearInterval(metronomeRef.current);
      setMetronomeActive(false);
    } else {
      // Start metronome
      const interval = Math.floor(60000 / bpmRate); // Convert BPM to milliseconds
      metronomeRef.current = setInterval(playBeep, interval);
      setMetronomeActive(true);
    }
  };

  // Add event
  const handleAddEvent = () => {
    if (newEvent.trim()) {
      const event = {
        time: timeElapsed,
        description: newEvent.trim(),
        timestamp: new Date().toISOString()
      };
      setEvents(prev => [...prev, event]);
      setNewEvent('');
      setShowEventInput(false);
    }
  };

  // Add predefined event
  const addPredefinedEvent = (description) => {
    const event = {
      time: timeElapsed,
      description,
      timestamp: new Date().toISOString()
    };
    setEvents(prev => [...prev, event]);
  };

  // Update BPM rate
  const handleBpmChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setBpmRate(value);
    
    // Update metronome interval if running
    if (metronomeActive) {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
      const interval = Math.floor(60000 / value);
      metronomeRef.current = setInterval(playBeep, interval);
    }
  };
  
  // Get age-appropriate compression depth
  const getCompressionDepth = () => {
    if (!patientAge) return "1/3 AP chest diameter";
    if (patientAge < 12) return "About 4 cm (1.5 inches)";
    if (patientAge < 144) return "About 5 cm (2 inches)";
    return "5-6 cm (2-2.4 inches)";
  };

  return (
    <div className="space-y-4">
      {/* CPR Timer */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">CPR Timer</h2>
          <div className="text-4xl font-mono font-bold my-4">
            {formatTime(timeElapsed)}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleToggleTimer}
              className={`px-6 py-3 rounded-lg font-medium ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleResetTimer}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Metronome */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">CPR Metronome</h2>
        <div className="flex items-center mb-2">
          <input
            type="range"
            min="90"
            max="120"
            value={bpmRate}
            onChange={handleBpmChange}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
          />
          <span className="ml-4 font-mono font-bold">{bpmRate} BPM</span>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleToggleMetronome}
            className={`px-6 py-3 rounded-lg font-medium ${
              metronomeActive
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {metronomeActive ? "Stop Metronome" : "Start Metronome"}
          </button>
        </div>
      </div>
      
      {/* Quick Event Buttons */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Log Events</h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addPredefinedEvent("Epinephrine given")}
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 rounded"
          >
            Epinephrine
          </button>
          <button
            onClick={() => addPredefinedEvent("Rhythm check")}
            className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200 rounded"
          >
            Rhythm Check
          </button>
          <button
            onClick={() => addPredefinedEvent("Shock delivered")}
            className="px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-200 rounded"
          >
            Shock Delivered
          </button>
          <button
            onClick={() => addPredefinedEvent("Pulse check")}
            className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800 dark:text-purple-200 rounded"
          >
            Pulse Check
          </button>
          <button
            onClick={() => setShowEventInput(!showEventInput)}
            className="col-span-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded"
          >
            Custom Event
          </button>
        </div>
        
        {/* Custom Event Input */}
        {showEventInput && (
          <div className="mt-2 flex">
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Enter event description..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-l-lg dark:border-slate-600 dark:bg-slate-700"
            />
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg"
            >
              Add
            </button>
          </div>
        )}
      </div>
      
      {/* Logged Events */}
      {events.length > 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Event Log</h2>
          <div className="overflow-y-auto max-h-40">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="py-2 px-3 text-left">Time</th>
                  <th className="py-2 px-3 text-left">Event</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className="border-t border-slate-200 dark:border-slate-700">
                    <td className="py-2 px-3 font-mono">{formatTime(event.time)}</td>
                    <td className="py-2 px-3">{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Guide */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-1">Recommended for this patient:</h3>
        <ul className="text-sm space-y-1">
          <li>• Compression depth: {getCompressionDepth()}</li>
          <li>• Compression rate: 100-120 per minute</li>
          <li>• Ratio: 15:2 (with two rescuers for pediatric patients)</li>
          <li>• Allow complete chest recoil between compressions</li>
          <li>• Minimize interruptions in compressions</li>
        </ul>
      </div>
    </div>
  );
}

export default CPRAssist;
