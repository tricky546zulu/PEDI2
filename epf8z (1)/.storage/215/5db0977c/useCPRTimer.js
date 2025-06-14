import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for CPR timer functionality
 * @param {Object} options - Configuration options
 * @param {number} options.initialCycles - Initial number of CPR cycles (default 0)
 * @param {number} options.initialTime - Initial time in seconds (default 0)
 * @returns {Object} CPR timer controls and state
 */
function useCPRTimer({ initialCycles = 0, initialTime = 0 } = {}) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [cycles, setCycles] = useState(initialCycles);
  const [lastEpinephrine, setLastEpinephrine] = useState(null);
  const [medications, setMedications] = useState([]);
  const [compressionRate, setCompressionRate] = useState(null);
  const [compressionFeedback, setCompressionFeedback] = useState('');
  const [lastShock, setLastShock] = useState(null);

  // Start CPR timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Stop CPR timer
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset timer but keep medications
  const resetTimer = useCallback(() => {
    setTime(0);
    setCycles(0);
    setCompressionRate(null);
    setCompressionFeedback('');
    setIsRunning(false);
  }, []);

  // Complete reset including medications
  const completeReset = useCallback(() => {
    resetTimer();
    setMedications([]);
    setLastEpinephrine(null);
    setLastShock(null);
  }, [resetTimer]);

  // Record a completed cycle
  const recordCycle = useCallback(() => {
    setCycles(prevCycles => prevCycles + 1);
  }, []);

  // Record when epinephrine is administered
  const recordEpinephrineAdministration = useCallback(() => {
    const now = Date.now();
    setLastEpinephrine(now);
    setMedications(prev => [
      ...prev,
      {
        id: `epi-${now}`,
        name: 'Epinephrine',
        timestamp: now,
        timeElapsed: time,
        cycleNumber: cycles
      }
    ]);
  }, [time, cycles]);

  // Record a defibrillation shock
  const recordShock = useCallback((energy) => {
    const now = Date.now();
    setLastShock(now);
    setMedications(prev => [
      ...prev,
      {
        id: `shock-${now}`,
        name: 'Defibrillation',
        energy: `${energy} J`,
        timestamp: now,
        timeElapsed: time,
        cycleNumber: cycles
      }
    ]);
  }, [time, cycles]);

  // Record when a medication is administered
  const recordMedication = useCallback((medicationName, dose = null) => {
    const now = Date.now();
    setMedications(prev => [
      ...prev,
      {
        id: `med-${now}`,
        name: medicationName,
        dose,
        timestamp: now,
        timeElapsed: time,
        cycleNumber: cycles
      }
    ]);
  }, [time, cycles]);

  // Update compression rate feedback
  const updateCompressionRate = useCallback((rate) => {
    setCompressionRate(rate);
    
    // Provide feedback based on PALS guidelines
    if (rate < 100) {
      setCompressionFeedback('Push faster (100-120/min)');
    } else if (rate > 120) {
      setCompressionFeedback('Push slower (100-120/min)');
    } else {
      setCompressionFeedback('Good rate');
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Calculate epinephrine due status
  const epinephrineDueStatus = useCallback(() => {
    if (!lastEpinephrine) return { isDue: false, timeRemaining: null, isOverdue: false };
    
    const timeSinceLastEpi = Math.floor((Date.now() - lastEpinephrine) / 1000);
    const dueThreshold = 180; // 3 minutes (180 seconds)
    const overdueThreshold = 300; // 5 minutes (300 seconds)
    
    const timeRemaining = dueThreshold - timeSinceLastEpi;
    const isOverdue = timeSinceLastEpi >= overdueThreshold;
    const isDue = timeSinceLastEpi >= dueThreshold;
    
    return { isDue, timeRemaining, isOverdue };
  }, [lastEpinephrine]);

  // Format time as MM:SS
  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    isRunning,
    time,
    cycles,
    medications,
    compressionRate,
    compressionFeedback,
    lastEpinephrine,
    lastShock,
    epinephrineDueStatus,
    formatTime,
    startTimer,
    stopTimer,
    resetTimer,
    completeReset,
    recordCycle,
    recordEpinephrineAdministration,
    recordShock,
    recordMedication,
    updateCompressionRate
  };
}

export default useCPRTimer;
