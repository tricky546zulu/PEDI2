import { useState, useEffect, useCallback } from 'react';

const useCPRTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [totalCompressions, setTotalCompressions] = useState([]);
  const [lastEpinephrine, setLastEpinephrine] = useState(null);
  const [lastShock, setLastShock] = useState(null);
  
  // Calculate time since last events
  const timeSinceLastEpinephrine = lastEpinephrine !== null ? elapsedTime - lastEpinephrine : null;
  const timeSinceLastShock = lastShock !== null ? elapsedTime - lastShock : null;

  // Start the timer
  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now() - elapsedTime);
    }
  }, [isRunning, elapsedTime]);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
    }
  }, [isRunning]);

  // Reset the timer and all counts
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    setCompressionCount(0);
    setTotalCompressions([]);
    setLastEpinephrine(null);
    setLastShock(null);
  }, []);

  // Record a compression
  const recordCompression = useCallback(() => {
    if (isRunning) {
      setCompressionCount(prevCount => prevCount + 1);
      setTotalCompressions(prev => [
        ...prev,
        {
          type: 'compression',
          time: elapsedTime,
          count: compressionCount + 1
        }
      ]);
    }
  }, [isRunning, elapsedTime, compressionCount]);

  // Record epinephrine administration
  const recordEpinephrine = useCallback(() => {
    if (isRunning) {
      setLastEpinephrine(elapsedTime);
      setTotalCompressions(prev => [
        ...prev,
        {
          type: 'epinephrine',
          time: elapsedTime
        }
      ]);
    }
  }, [isRunning, elapsedTime]);

  // Record defibrillation/shock
  const recordShock = useCallback(() => {
    if (isRunning) {
      setLastShock(elapsedTime);
      setTotalCompressions(prev => [
        ...prev,
        {
          type: 'shock',
          time: elapsedTime
        }
      ]);
    }
  }, [isRunning, elapsedTime]);

  // Update elapsed time when timer is running
  useEffect(() => {
    let animationFrameId;
    
    if (isRunning) {
      const updateTime = () => {
        setElapsedTime(Date.now() - startTime);
        animationFrameId = requestAnimationFrame(updateTime);
      };
      
      animationFrameId = requestAnimationFrame(updateTime);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, startTime]);

  return {
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
  };
};

export default useCPRTimer;
