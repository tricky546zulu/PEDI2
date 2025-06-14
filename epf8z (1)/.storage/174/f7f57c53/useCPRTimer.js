import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for CPR timer functionality
 */
export const useCPRTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [compressionRate, setCompressionRate] = useState(0);
  const [lastCompressionTime, setLastCompressionTime] = useState(null);
  const [compressionTimes, setCompressionTimes] = useState([]);
  
  // Start the timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  // Stop the timer
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  // Reset the timer and all values
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    setCompressionCount(0);
    setCompressionRate(0);
    setLastCompressionTime(null);
    setCompressionTimes([]);
  }, []);
  
  // Record a compression
  const addCompression = useCallback(() => {
    const now = Date.now();
    setLastCompressionTime(now);
    setCompressionCount(prev => prev + 1);
    
    // Store the last 10 compression times to calculate the rate
    setCompressionTimes(prev => {
      const newTimes = [...prev, now];
      // Keep only the last 10 compressions for rate calculation
      if (newTimes.length > 10) {
        return newTimes.slice(newTimes.length - 10);
      }
      return newTimes;
    });
  }, []);
  
  // Update the timer every second
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
  
  // Calculate compression rate
  useEffect(() => {
    // Need at least 2 compression times to calculate rate
    if (compressionTimes.length < 2) {
      return;
    }
    
    const calculateRate = () => {
      // Calculate the average time between compressions
      let totalTime = 0;
      for (let i = 1; i < compressionTimes.length; i++) {
        totalTime += compressionTimes[i] - compressionTimes[i-1];
      }
      const avgTimeBetween = totalTime / (compressionTimes.length - 1);
      
      // Convert to rate per minute
      const rate = Math.round(60000 / avgTimeBetween);
      setCompressionRate(rate);
    };
    
    calculateRate();
  }, [compressionTimes]);
  
  return {
    isRunning,
    elapsedTime,
    compressionCount,
    compressionRate,
    lastCompressionTime,
    startTimer,
    stopTimer,
    resetTimer,
    addCompression
  };
};
