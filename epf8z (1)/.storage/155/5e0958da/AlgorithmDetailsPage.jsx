import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function AlgorithmDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offlineStorage, patientWeight, patientAge } = useAppContext();
  const [algorithm, setAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch the algorithm data
  useEffect(() => {
    const fetchAlgorithm = async () => {
      setLoading(true);
      try {
        let data;
        
        // Try to get data from offline storage first
        if (offlineStorage.isAvailable) {
          data = await offlineStorage.getData('algorithms', id);
        }
        
        // If no offline data, load from static file
        if (!data) {
          const importedData = (await import('../data/algorithms')).default;
          data = importedData.find(alg => alg.id === id);
          
          // Save to offline storage for future use
          if (offlineStorage.isAvailable && data) {
            await offlineStorage.storeData('algorithms', data);
          }
        }
        
        if (data) {
          setAlgorithm(data);
          setError(null);
        } else {
          setError('Algorithm not found');
        }
      } catch (err) {
        console.error('Error loading algorithm:', err);
        setError('Failed to load algorithm data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithm();
  }, [id, offlineStorage]);

  // Helper function to get the appropriate background color based on algorithm category
  const getCategoryColor = () => {
    if (!algorithm) return '';
    
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50';
      case 'bradycardia':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/50';
      case 'tachycardia':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50';
      case 'post resuscitation':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/50';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50';
    }
  };

  const goToNextStep = () => {
    if (algorithm && currentStep < algorithm.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(0);
  };

  return (
    <div className="pb-16">
      {/* Back button */}
      <button 
        onClick={() => navigate('/algorithms')}
        className="flex items-center text-blue-600 dark:text-blue-400 mb-4 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Algorithms
      </button>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-4">
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}
      
      {/* Algorithm details */}
      {!loading && algorithm && (
        <div className={`border rounded-lg overflow-hidden shadow-md ${getCategoryColor()}`}>
          {/* Algorithm header */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">{algorithm.title}</h1>
                <span className="inline-block bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 text-sm font-medium px-2.5 py-0.5 rounded mb-2">
                  {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
                </span>
                <p className="text-slate-600 dark:text-slate-300">{algorithm.description}</p>
              </div>
              
              {/* Patient info if available */}
              {(patientWeight || patientAge) && (
                <div className="text-sm bg-white dark:bg-slate-700 p-2 rounded-md shadow-sm">
                  <p className="font-medium">Patient:</p>
                  {patientWeight && <p>Weight: {patientWeight} kg</p>}
                  {patientAge && (
                    <p>Age: {patientAge} months ({(patientAge / 12).toFixed(1)} years)</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Additional information */}
            {algorithm.patientType && (
              <div className="mt-3 bg-white dark:bg-slate-700/50 p-3 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Patient Type:</span> {algorithm.patientType}
                </p>
              </div>
            )}
            
            {algorithm.references && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                <p className="mb-1 font-medium">Reference:</p>
                <p>{algorithm.references}</p>
              </div>
            )}
          </div>
          
          {/* Algorithm steps navigator */}
          <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Step {currentStep + 1} of {algorithm.steps.length}</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={resetSteps}
                  className="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  Reset
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${((currentStep + 1) / algorithm.steps.length) * 100}%` }}
              ></div>
            </div>
            
            {/* Current step content */}
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">{algorithm.steps[currentStep].title}</h3>
              <div className="text-slate-700 dark:text-slate-300">
                <p>{algorithm.steps[currentStep].content}</p>
                
                {/* Decision points/branches */}
                {algorithm.steps[currentStep].decision && (
                  <div className="mt-4 border-t border-slate-200 dark:border-slate-600 pt-3">
                    <p className="font-medium mb-2">Decision Point:</p>
                    <div className="space-y-2">
                      {algorithm.steps[currentStep].options.map((option, index) => (
                        <div key={index} className="p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                          <p>{option.text}</p>
                          {option.nextStep !== undefined && (
                            <button 
                              onClick={() => setCurrentStep(option.nextStep)}
                              className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Go to Step {option.nextStep + 1} &rarr;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Notes for this step */}
                {algorithm.steps[currentStep].notes && (
                  <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 rounded p-3 text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">Note:</p>
                    <p className="text-yellow-700 dark:text-yellow-400">{algorithm.steps[currentStep].notes}</p>
                  </div>
                )}
                
                {/* Medication recommendations for this step */}
                {algorithm.steps[currentStep].medications && (
                  <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 rounded p-3">
                    <p className="font-medium text-green-800 dark:text-green-300 mb-1">Medications:</p>
                    <ul className="list-disc list-inside text-green-700 dark:text-green-400 text-sm">
                      {algorithm.steps[currentStep].medications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Step navigation */}
            <div className="flex justify-between">
              <button
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md flex items-center ${
                  currentStep === 0
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <button
                onClick={goToNextStep}
                disabled={currentStep === algorithm.steps.length - 1}
                className={`px-4 py-2 rounded-md flex items-center ${
                  currentStep === algorithm.steps.length - 1
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Overview of all steps */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
            <h3 className="font-medium mb-3">All Steps</h3>
            <ol className="space-y-1">
              {algorithm.steps.map((step, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`text-left w-full px-3 py-2 rounded-md text-sm ${
                      currentStep === index
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="font-medium mr-2">{index + 1}.</span>
                    {step.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p><strong>Disclaimer:</strong> These algorithms are provided for educational purposes and as a quick reference. Always follow your local protocols and medical direction.</p>
      </div>
    </div>
  );
}

export default AlgorithmDetailsPage;
