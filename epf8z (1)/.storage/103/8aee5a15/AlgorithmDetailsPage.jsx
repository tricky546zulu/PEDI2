import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function AlgorithmDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOffline, offlineStorage } = useAppContext();
  const [algorithm, setAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);

  // Load algorithm data
  useEffect(() => {
    const loadAlgorithm = async () => {
      try {
        // First try to load from IndexedDB if available and in offline mode
        if (isOffline && offlineStorage.isAvailable) {
          const cachedAlgorithm = await offlineStorage.getData('algorithms', id);
          if (cachedAlgorithm) {
            setAlgorithm(cachedAlgorithm);
            setLoading(false);
            return;
          }
        }
        
        // Otherwise load from the local data file
        const { default: algorithmsData } = await import('../data/algorithms');
        const foundAlgorithm = algorithmsData.find(algo => algo.id === id);
        
        if (foundAlgorithm) {
          setAlgorithm(foundAlgorithm);
          
          // Save to recently viewed
          const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedAlgorithms') || '[]');
          
          // Remove if already in list
          const filteredList = recentlyViewed.filter(item => item.id !== id);
          
          // Add to beginning of list with timestamp
          filteredList.unshift({
            id: foundAlgorithm.id,
            title: foundAlgorithm.title,
            timestamp: new Date().toISOString()
          });
          
          // Keep only last 10
          const trimmedList = filteredList.slice(0, 10);
          localStorage.setItem('recentlyViewedAlgorithms', JSON.stringify(trimmedList));
        } else {
          console.error(`Algorithm with ID ${id} not found`);
        }
      } catch (error) {
        console.error('Error loading algorithm:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAlgorithm();
  }, [id, isOffline, offlineStorage]);
  
  // Get the category color for styling
  const getCategoryColor = () => {
    if (!algorithm) return '';
    
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900';
      case 'bradycardia':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900';
      case 'tachycardia':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900';
      case 'post resuscitation':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900';
    }
  };
  
  const handleNextStep = () => {
    if (algorithm && currentStepIndex < algorithm.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleGoBack = () => {
    navigate('/algorithms');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  if (!algorithm) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400">Algorithm not found.</p>
        <button 
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Back to Algorithms
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <button
          onClick={handleGoBack}
          className="mr-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold flex-1">{algorithm.title}</h1>
      </div>
      
      <div className={`border rounded-lg overflow-hidden shadow-sm p-4 ${getCategoryColor()}`}>
        {/* Algorithm Info */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 text-xs font-medium px-2.5 py-0.5 rounded">
              {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
            </span>
            {algorithm.patientType && (
              <span className="bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 text-xs font-medium px-2.5 py-0.5 rounded">
                {algorithm.patientType}
              </span>
            )}
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{algorithm.description}</p>
        </div>
        
        {/* View mode toggle */}
        <div className="mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
          <div className="flex">
            <button
              className={`py-2 px-4 font-medium ${!showFullContent ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setShowFullContent(false)}
            >
              Step-by-Step
            </button>
            <button
              className={`py-2 px-4 font-medium ${showFullContent ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setShowFullContent(true)}
            >
              Full Algorithm
            </button>
          </div>
        </div>
        
        {/* Step-by-Step View */}
        {!showFullContent && algorithm.steps && algorithm.steps.length > 0 && (
          <div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-4">
              <div className="mb-2 text-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold dark:bg-blue-900 dark:text-blue-200">
                  {currentStepIndex + 1}
                </span>
              </div>
              <p className="text-center font-medium mb-2">{algorithm.steps[currentStepIndex].text}</p>
              
              {algorithm.steps[currentStepIndex].details && (
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                  {algorithm.steps[currentStepIndex].details}
                </div>
              )}
              
              {algorithm.steps[currentStepIndex].note && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 rounded text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-medium">Note: </span>
                  {algorithm.steps[currentStepIndex].note}
                </div>
              )}
              
              {algorithm.steps[currentStepIndex].substeps && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Sub-steps:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {algorithm.steps[currentStepIndex].substeps.map((substep, index) => (
                      <li key={index}>{substep}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {algorithm.steps[currentStepIndex].critical && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded text-sm text-red-800 dark:text-red-200 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Critical Step: {algorithm.steps[currentStepIndex].critical}</span>
                </div>
              )}
            </div>
            
            {/* Step Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`px-4 py-2 flex items-center rounded-lg ${
                  currentStepIndex === 0
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous
              </button>
              <span className="text-slate-500 dark:text-slate-400">
                Step {currentStepIndex + 1} of {algorithm.steps.length}
              </span>
              <button
                onClick={handleNextStep}
                disabled={currentStepIndex === algorithm.steps.length - 1}
                className={`px-4 py-2 flex items-center rounded-lg ${
                  currentStepIndex === algorithm.steps.length - 1
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Full Algorithm View */}
        {showFullContent && algorithm.steps && algorithm.steps.length > 0 && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <ol className="space-y-4">
              {algorithm.steps.map((step, index) => (
                <li key={index} className="pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold dark:bg-blue-900 dark:text-blue-200">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{step.text}</p>
                      
                      {step.details && (
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {step.details}
                        </p>
                      )}
                      
                      {step.substeps && (
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                          {step.substeps.map((substep, subindex) => (
                            <li key={subindex}>{substep}</li>
                          ))}
                        </ul>
                      )}
                      
                      {step.note && (
                        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 rounded text-sm text-yellow-800 dark:text-yellow-200">
                          <span className="font-medium">Note: </span>
                          {step.note}
                        </div>
                      )}
                      
                      {step.critical && (
                        <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded text-sm text-red-800 dark:text-red-200 flex">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Critical: {step.critical}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      
      {/* Additional Information */}
      {algorithm.notes && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h2 className="font-bold mb-2">Notes</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{algorithm.notes}</p>
        </div>
      )}
      
      {algorithm.references && algorithm.references.length > 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h2 className="font-bold mb-2">References</h2>
          <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
            {algorithm.references.map((ref, index) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlgorithmDetailsPage;
