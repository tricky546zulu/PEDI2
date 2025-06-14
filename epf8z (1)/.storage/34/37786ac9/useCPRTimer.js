import { useState, useEffect, useRef } from 'react';

export const useCPRTimer = (initialRate = 110) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [compressionRate, setCompressionRate] = useState(initialRate);
  
  // Audio context for metronome
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);
  const metronomeIntervalRef = useRef(null);
  
  // Set up timer
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);
  
  // Set up metronome
  useEffect(() => {
    const setupMetronome = async () => {
      if (isMetronomeActive) {
        // Initialize audio context if not already done
        if (!audioContextRef.current) {
          try {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          } catch (error) {
            console.error("Web Audio API is not supported in this browser:", error);
            return;
          }
        }
        
        // Calculate interval based on rate
        const interval = (60 / compressionRate) * 1000;
        
        // Create metronome pulse
        const createPulse = () => {
          const oscillator = audioContextRef.current.createOscillator();
          const gainNode = audioContextRef.current.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          oscillator.frequency.value = 800;
          gainNode.gain.value = 1;
          
          oscillator.start();
          
          // Short duration for click sound
          setTimeout(() => {
            gainNode.gain.exponentialRampToValueAtTime(
              0.001, audioContextRef.current.currentTime + 0.1
            );
            setTimeout(() => oscillator.stop(), 100);
          }, 30);
        };
        
        // Start metronome
        createPulse();
        metronomeIntervalRef.current = setInterval(createPulse, interval);
      } else if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      
      return () => {
        if (metronomeIntervalRef.current) {
          clearInterval(metronomeIntervalRef.current);
        }
      };
    };
    
    setupMetronome();
  }, [isMetronomeActive, compressionRate]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Start the timer
  const startTimer = () => {
    setIsActive(true);
  };
  
  // Pause the timer
  const pauseTimer = () => {
    setIsActive(false);
  };
  
  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };
  
  // Toggle metronome
  const toggleMetronome = () => {
    setIsMetronomeActive(prev => !prev);
  };
  
  // Change compression rate
  const changeCompressionRate = (newRate) => {
    setCompressionRate(newRate);
    // Restart metronome if active to apply new rate
    if (isMetronomeActive) {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      setIsMetronomeActive(false);
      setTimeout(() => setIsMetronomeActive(true), 50);
    }
  };
  
  return {
    seconds,
    isActive,
    startTimer,
    pauseTimer,
    resetTimer,
    isMetronomeActive,
    toggleMetronome,
    compressionRate,
    changeCompressionRate
  };
};
