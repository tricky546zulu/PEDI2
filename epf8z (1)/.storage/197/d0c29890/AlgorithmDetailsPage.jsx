import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import algorithms from '../data/algorithms';

function AlgorithmDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offlineStorage, isOffline } = useAppContext();
  const [algorithm, setAlgorithm] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Find algorithm by ID
  useEffect(() => {
    const fetchAlgorithm = async () => {
      let foundAlgorithm;
      
      // Try to get from imported data first
      foundAlgorithm = algorithms.find(algo => algo.id === id);
      
      // If not found and offline storage is available, try there
      if (!foundAlgorithm && offlineStorage) {
        try {
          foundAlgorithm = await offlineStorage.getData('algorithms', id);
        } catch (error) {
          console.error('Failed to fetch algorithm from offline storage:', error);
        }
      }
      
      if (foundAlgorithm) {
        setAlgorithm(foundAlgorithm);
        setCurrentStep(0);
      } else {
        // Algorithm not found
        console.error('Algorithm not found:', id);
      }
    };
    
    fetchAlgorithm();
  }, [id, offlineStorage]);
  
  // Navigate to the specified step
  const goToStep = useCallback((stepIndex) => {
    if (algorithm && stepIndex >= 0 && stepIndex < algorithm.steps.length) {
      setCurrentStep(stepIndex);
    }
  }, [algorithm]);
  
  // Handle decision choice
  const handleDecisionChoice = (nextStep) => {
    goToStep(nextStep - 1); // Adjust for 0-based index
  };
  
  // If algorithm not found
  if (!algorithm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white dark:bg-slate-800 rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-lg font-medium">Algorithm not found</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">The algorithm you're looking for doesn't exist or couldn't be loaded.</p>
        <button 
          onClick={() => navigate('/algorithms')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Algorithms
        </button>
      </div>
    );
  }
  
  const currentStepData = algorithm.steps[currentStep];
  
  // Get category styles for color theming
  const getCategoryStyles = () => {
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20';
      case 'bradycardia':
        return 'border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20';
      case 'tachycardia':
        return 'border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20';
      case 'post resuscitation':
        return 'border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20';
      case 'shock':
        return 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80';
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Algorithm header */}
      <div className={`border rounded-lg overflow-hidden shadow-sm ${getCategoryStyles()}`}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold mb-2">{algorithm.title}</h1>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 bg-opacity-60">
                {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
              </span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            {algorithm.description}
          </p>
        </div>
        
        {/* Step navigation */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 flex items-center justify-between bg-white dark:bg-slate-800">
          <button
            onClick={() => goToStep(currentStep - 1)}
            className="px-3 py-1 text-sm rounded disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <span className="text-sm">
            Step {currentStep + 1} of {algorithm.steps.length}
          </span>
          <button
            onClick={() => goToStep(currentStep + 1)}
            className="px-3 py-1 text-sm rounded disabled:opacity-50"
            disabled={currentStep === algorithm.steps.length - 1 || currentStepData.decision}
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Current step */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold mb-4">{currentStepData.title}</h2>
        
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <p>{currentStepData.content}</p>
        </div>
        
        {/* Medications if present */}
        {currentStepData.medications && currentStepData.medications.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Medications</h3>
            <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-400 space-y-1">
              {currentStepData.medications.map((med, i) => (
                <li key={i}>{med}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Notes if present */}
        {currentStepData.notes && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">Notes</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">{currentStepData.notes}</p>
          </div>
        )}
        
        {/* Decision point */}
        {currentStepData.decision && currentStepData.options && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Next Steps - Select One:</h3>
            <div className="space-y-3">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleDecisionChoice(option.nextStep)}
                  className="w-full p-3 text-left border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 flex justify-between items-center"
                >
                  <span>{option.text}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Step progress */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700">
        <h3 className="font-medium mb-3">All Steps</h3>
        <div className="space-y-2">
          {algorithm.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`w-full p-2 text-left text-sm rounded-md flex items-center ${
                index === currentStep 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                index === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {index + 1}
              </span>
              <span className={`truncate ${index === currentStep ? 'font-medium' : ''}`}>
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlgorithmDetailsPage;
