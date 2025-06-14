import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for CPR timing and compression tracking
 */
function useCPRTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [compressionCount, setCompressionCount] = useState(0);
  const [compressionRate, setCompressionRate] = useState(0);
  
  // References for timer and compression data
  const timerRef = useRef(null);
  const lastCompressionTime = useRef(0);
  const recentCompressions = useRef([]);
  
  // Format seconds into MM:SS format
  const secondsToTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }, []);
  
  // Start/stop timer
  const toggleTimer = useCallback(() => {
    setIsRunning(prevState => !prevState);
  }, []);
  
  // Reset timer and all values
  const resetTimer = useCallback(() => {
    setElapsedTime(0);
    setCompressionCount(0);
    setCompressionRate(0);
    lastCompressionTime.current = 0;
    recentCompressions.current = [];
  }, []);
  
  // Record a compression and update rate
  const recordCompression = useCallback(() => {
    if (!isRunning) return;
    
    const now = Date.now();
    const currentTime = elapsedTime;
    
    // Add compression to recent list (keep last 30 seconds of data)
    recentCompressions.current.push({
      timestamp: now,
      time: currentTime
    });
    
    // Remove compressions older than 30 seconds
    const thirtySecondsAgo = now - 30000;
    recentCompressions.current = recentCompressions.current.filter(
      comp => comp.timestamp > thirtySecondsAgo
    );
    
    // Calculate rate based on recent compressions (rolling window)
    if (recentCompressions.current.length >= 5) {
      const timeSpan = (now - recentCompressions.current[0].timestamp) / 1000;
      if (timeSpan > 0) {
        const rate = Math.round((recentCompressions.current.length / timeSpan) * 60);
        setCompressionRate(rate);
      }
    }
    
    // Increment compression count
    setCompressionCount(prev => prev + 1);
    lastCompressionTime.current = now;
  }, [elapsedTime, isRunning]);
  
  // Effect to handle timer and elapsed time
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 0.1);
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);
  
  return {
    isRunning,
    elapsedTime,
    compressionCount,
    compressionRate,
    toggleTimer,
    resetTimer,
    recordCompression,
    secondsToTime
  };
}

export default useCPRTimer;
