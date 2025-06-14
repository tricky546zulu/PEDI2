import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import useCPRTimer from '../hooks/useCPRTimer';

function CPRAssist() {
  const { patientAge, patientWeight } = useAppContext();
  const { 
    isRunning, 
    elapsedTime, 
    compressionCount,
    totalCompressions,
    timeSinceLastEpinephrine,
    timeSinceLastShock,
    startTimer, 
    pauseTimer, 
    resetTimer,
    recordCompression,
    recordEpinephrine,
    recordShock 
  } = useCPRTimer();
  
  const [isPediatric, setIsPediatric] = useState(true);
  const [compressionRateText, setCompressionRateText] = useState('');
  const [compressionGuide, setCompressionGuide] = useState('');
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  
  const audioRef = useRef(null);

  // Determine CPR parameters based on patient age
  useEffect(() => {
    if (patientAge !== null) {
      setIsPediatric(patientAge < 96); // Under 8 years old (96 months)
    } else {
      setIsPediatric(true); // Default to pediatric if no age provided
    }
  }, [patientAge]);
  
  // Update compression guide based on patient data
  useEffect(() => {
    if (isPediatric) {
      setCompressionGuide(`
        • Rate: 100-120/min
        • Depth: 1/3 chest depth (4-5 cm)
        • Allow complete chest recoil
        • Minimize interruptions
        • 15:2 compression to ventilation ratio
      `);
    } else {
      setCompressionGuide(`
        • Rate: 100-120/min
        • Depth: 5-6 cm
        • Allow complete chest recoil
        • Minimize interruptions
        • 30:2 compression to ventilation ratio
      `);
    }
  }, [isPediatric]);
  
  // Create metronome effect
  useEffect(() => {
    let interval;
    
    if (isRunning && metronomeEnabled) {
      interval = setInterval(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.error("Audio play error:", e));
        }
      }, 500); // 500ms for 120bpm (sounds every 0.5 seconds)
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, metronomeEnabled]);
  
  // Calculate and update compression rate
  useEffect(() => {
    if (compressionCount > 5 && elapsedTime > 0) {
      const rate = Math.round((compressionCount / (elapsedTime / 1000)) * 60);
      setCompressionRateText(`${rate} per minute`);
      
      // Provide feedback on compression rate
      if (rate < 100) {
        setCompressionRateText(`${rate} per minute (too slow)`);
      } else if (rate > 120) {
        setCompressionRateText(`${rate} per minute (too fast)`);
      } else {
        setCompressionRateText(`${rate} per minute (good)`);
      }
    } else {
      setCompressionRateText('');
    }
  }, [compressionCount, elapsedTime]);

  // Format time display
  const formatTimeDisplay = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format minutes display
  const formatMinutes = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col h-full">
      <audio ref={audioRef} className="hidden">
        <source src="/assets/audio/click.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Timer Display */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 flex flex-col items-center">
        <div className="text-4xl font-bold mb-2">
          {formatTimeDisplay(elapsedTime)}
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
            <div className="text-blue-700 dark:text-blue-300 text-sm">Compressions</div>
            <div className="text-2xl font-bold">{compressionCount}</div>
            {compressionRateText && (
              <div className="text-xs mt-1">{compressionRateText}</div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-amber-50 dark:bg-amber-900/30 p-2 rounded">
              <div className="text-amber-700 dark:text-amber-300 text-xs">Last Epinephrine</div>
              <div className="text-lg font-bold">
                {timeSinceLastEpinephrine ? formatMinutes(timeSinceLastEpinephrine) : "—"}
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded">
              <div className="text-red-700 dark:text-red-300 text-xs">Last Shock</div>
              <div className="text-lg font-bold">
                {timeSinceLastShock ? formatMinutes(timeSinceLastShock) : "—"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4 w-full">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold shadow"
            >
              Start CPR
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-bold shadow"
            >
              Pause
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="py-3 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md shadow"
          >
            Reset
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={recordCompression}
            className="py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md font-medium"
          >
            Record Compression
          </button>
          
          <button
            onClick={recordEpinephrine}
            className="py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md font-medium"
          >
            Epinephrine Given
          </button>
          
          <button
            onClick={recordShock}
            className="py-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md font-medium"
          >
            Shock Delivered
          </button>
          
          <button
            onClick={() => setMetronomeEnabled(!metronomeEnabled)}
            className={`py-3 ${
              metronomeEnabled 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
            } rounded-md font-medium`}
          >
            {metronomeEnabled ? 'Disable' : 'Enable'} Metronome
          </button>
        </div>
      </div>
      
      {/* CPR Guidelines */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">CPR Guidelines</h3>
        <div className="text-sm">
          <div className="mb-2">
            <span className="font-medium">Patient:</span> {isPediatric ? 'Pediatric' : 'Adult'}
            {patientAge && <span> ({Math.floor(patientAge / 12)} years)</span>}
            {patientWeight && <span>, {patientWeight} kg</span>}
          </div>
          
          <div className="whitespace-pre-line text-slate-700 dark:text-slate-300">
            {compressionGuide}
          </div>
          
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
            <h4 className="font-medium mb-1">Medication Timing:</h4>
            <ul className="list-disc list-inside text-sm">
              <li>Epinephrine: Every 3-5 minutes</li>
              <li>Rhythm check: Every 2 minutes</li>
              <li>Minimize interruptions to CPR</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* CPR Time Log */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-2">CPR Event Log</h3>
        <div className="overflow-y-auto max-h-40">
          {totalCompressions.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-sm">Events will appear here.</p>
          ) : (
            <ul className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {totalCompressions.map((event, index) => (
                <li key={index} className="py-1 flex justify-between">
                  <span>
                    {event.type === 'compression' && 'Compression'}
                    {event.type === 'epinephrine' && 'Epinephrine'}
                    {event.type === 'shock' && 'Shock'}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {formatTimeDisplay(event.time)}
                  </span>
                </li>
              )).reverse()}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CPRAssist;
