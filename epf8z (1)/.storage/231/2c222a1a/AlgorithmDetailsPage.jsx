import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import algorithms from '../data/algorithms';

function AlgorithmDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, patientWeight } = useAppContext();
  
  const [algorithm, setAlgorithm] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Find the algorithm by ID when component mounts
  useEffect(() => {
    const foundAlgorithm = algorithms.find(alg => alg.id === id);
    if (foundAlgorithm) {
      setAlgorithm(foundAlgorithm);
    } else {
      // Redirect to algorithms page if algorithm not found
      navigate('/algorithms');
    }
  }, [id, navigate]);

  if (!algorithm) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2.5 mx-auto"></div>
          <div className="h-4 w-56 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleStepChange = (index) => {
    setCurrentStepIndex(index);
  };

  const handleDecisionClick = (nextStepIndex) => {
    if (nextStepIndex >= 0 && nextStepIndex < algorithm.steps.length) {
      setCurrentStepIndex(nextStepIndex);
      // Scroll to the top of the step when navigating
      window.scrollTo({
        top: document.getElementById('current-step').offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Get category styles for color theming
  const getCategoryStyles = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return {
          border: 'border-red-200 dark:border-red-900/50',
          bg: 'bg-red-50 dark:bg-red-900/20',
          text: 'text-red-800 dark:text-red-300',
          pill: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
          button: 'bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700',
          outline: 'border-red-500 text-red-600 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
        };
      case 'bradycardia':
        return {
          border: 'border-yellow-200 dark:border-yellow-900/50',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          text: 'text-yellow-800 dark:text-yellow-300',
          pill: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
          button: 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600',
          outline: 'border-yellow-500 text-yellow-600 dark:border-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
        };
      case 'tachycardia':
        return {
          border: 'border-orange-200 dark:border-orange-900/50',
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          text: 'text-orange-800 dark:text-orange-300',
          pill: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
          button: 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 dark:hover:bg-orange-700',
          outline: 'border-orange-500 text-orange-600 dark:border-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
        };
      case 'post resuscitation':
        return {
          border: 'border-purple-200 dark:border-purple-900/50',
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          text: 'text-purple-800 dark:text-purple-300',
          pill: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
          button: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700',
          outline: 'border-purple-500 text-purple-600 dark:border-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
        };
      case 'shock':
        return {
          border: 'border-blue-200 dark:border-blue-900/50',
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          text: 'text-blue-800 dark:text-blue-300',
          pill: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
          button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700',
          outline: 'border-blue-500 text-blue-600 dark:border-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
        };
      default:
        return {
          border: 'border-slate-200 dark:border-slate-700',
          bg: 'bg-slate-50 dark:bg-slate-800/80',
          text: 'text-slate-800 dark:text-slate-200',
          pill: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
          button: 'bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600',
          outline: 'border-slate-500 text-slate-600 dark:border-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        };
    }
  };

  const styles = getCategoryStyles();
  const currentStep = algorithm.steps[currentStepIndex];

  // Helper function for medication calculations if patient weight is available
  const calculateMedication = (dose, unit, patientWeight) => {
    if (!patientWeight || !dose) return null;
    
    const calculatedDose = dose * patientWeight;
    return `${calculatedDose.toFixed(2)} ${unit.replace('kg', '')}`;
  };

  return (
    <div className="space-y-6">
      {/* Algorithm header */}
      <div className={`p-4 rounded-lg ${styles.border} ${styles.bg}`}>
        <h1 className="text-xl font-bold mb-2">{algorithm.title}</h1>
        <div className="flex items-center mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full ${styles.pill} mr-2`}>
            {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
          </span>
          {algorithm.lastUpdated && (
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Updated: {new Date(algorithm.lastUpdated).toLocaleDateString()}
            </span>
          )}
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          {algorithm.description}
        </p>
      </div>

      {/* Steps navigation */}
      <div className={`border rounded-lg overflow-hidden ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-medium">Algorithm Steps</h2>
          <button 
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showAllSteps ? 'Show current only' : 'View all steps'}
          </button>
        </div>
        
        <div className="divide-y dark:divide-slate-700">
          {showAllSteps ? (
            // Show all steps when in "View all" mode
            algorithm.steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepChange(index)}
                className={`w-full text-left p-3 ${
                  index === currentStepIndex 
                    ? `${styles.bg} ${styles.text}` 
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${
                    index === currentStepIndex
                      ? `${styles.pill}`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span>{step.title}</span>
                </div>
              </button>
            ))
          ) : (
            // Show only the current step when in default mode
            <button
              onClick={() => setShowAllSteps(true)}
              className={`w-full text-left p-3 ${styles.bg} ${styles.text}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${styles.pill}`}>
                  {currentStepIndex + 1}
                </div>
                <span>{currentStep.title}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Current step detail */}
      <div 
        id="current-step"
        className={`border rounded-lg ${styles.border} ${styles.bg} p-4`}
      >
        <h2 className="text-lg font-semibold mb-3">Step {currentStepIndex + 1}: {currentStep.title}</h2>
        
        <div className="space-y-4">
          {/* Step content */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
            <p className="text-slate-800 dark:text-slate-200">
              {currentStep.content}
            </p>
            
            {/* Notes if available */}
            {currentStep.notes && (
              <div className="mt-3 text-sm bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                <div className="font-medium mb-1">Notes:</div>
                <p>{currentStep.notes}</p>
              </div>
            )}
          </div>
          
          {/* Medications if available */}
          {currentStep.medications && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
              <h3 className="font-medium mb-2">Medications:</h3>
              <ul className="space-y-2">
                {currentStep.medications.map((med, idx) => {
                  // Try to extract dosing information for calculation
                  const doseMatch = med.match(/(\d+(\.\d+)?)\s*mg\/kg/);
                  const dose = doseMatch ? parseFloat(doseMatch[1]) : null;
                  
                  return (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        {med}
                        {patientWeight && dose && (
                          <span className="block mt-1 text-sm text-blue-600 dark:text-blue-400">
                            For {patientWeight} kg: {calculateMedication(dose, 'mg', patientWeight)}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          
          {/* Decision point if available */}
          {currentStep.decision && currentStep.options && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
              <h3 className="font-medium mb-3">Decision Point:</h3>
              <div className="space-y-2">
                {currentStep.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDecisionClick(option.nextStep - 1)} // Convert to 0-based index
                    className={`w-full p-3 rounded-md text-left border ${styles.outline} transition-colors`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.text}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-2">
        <button
          onClick={() => handleStepChange(Math.max(0, currentStepIndex - 1))}
          disabled={currentStepIndex === 0}
          className={`px-4 py-2 rounded-md flex items-center ${
            currentStepIndex === 0 
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
              : `${styles.outline}`
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        <button
          onClick={() => handleStepChange(Math.min(algorithm.steps.length - 1, currentStepIndex + 1))}
          disabled={currentStepIndex === algorithm.steps.length - 1 || (currentStep.decision && !currentStep.options)}
          className={`px-4 py-2 rounded-md flex items-center ${
            currentStepIndex === algorithm.steps.length - 1 || (currentStep.decision && !currentStep.options)
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              : `${styles.button} text-white`
          }`}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AlgorithmDetailsPage;
