import React from 'react';
import CPRAssist from '../components/CPRAssist';
import { useAppContext } from '../contexts/AppContext';

function CPRPage() {
  const { patientAge, patientWeight, setShowPatientModal } = useAppContext();
  
  // Helper functions
  const getCompressionDepth = () => {
    if (!patientAge) return "⅓ of AP chest diameter";
    if (patientAge < 12) return "About 4 cm (1.5 inches)";
    if (patientAge < 144) return "About 5 cm (2 inches)";
    return "5-6 cm (2-2.4 inches)";
  };
  
  const getCompressionRate = () => {
    return "100-120 per minute";
  };
  
  const getCompressionRatio = () => {
    if (!patientAge || patientAge > 144) return "30:2 (single rescuer), 15:2 (two rescuers)";
    return "15:2 (two rescuers)";
  };
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">CPR Assistant</h1>
      
      {/* Patient info banner */}
      {!patientAge ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900 rounded-lg p-3">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <div className="flex items-center">
                <span className="font-medium text-yellow-700 dark:text-yellow-300">
                  No patient age entered
                </span>
                <button 
                  onClick={() => setShowPatientModal(true)}
                  className="ml-3 px-2 py-1 text-xs font-medium rounded bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                >
                  Enter Patient Info
                </button>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                Enter patient age to get age-appropriate CPR guidelines
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <div className="text-green-700 dark:text-green-300">
              <div className="font-medium">Patient age: {patientAge} months</div>
              <div className="text-sm mt-1">
                <span className="font-medium">CPR Parameters: </span>
                Depth: {getCompressionDepth()} · 
                Rate: {getCompressionRate()} · 
                Ratio: {getCompressionRatio()}
              </div>
            </div>
            <button 
              onClick={() => setShowPatientModal(true)}
              className="px-2 py-1 text-xs font-medium rounded bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
            >
              Update
            </button>
          </div>
        </div>
      )}
      
      {/* CPR Assist component */}
      <CPRAssist />
      
      {/* Guidelines section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h2 className="font-bold text-lg mb-3">PALS CPR Guidelines</h2>
        
        <div className="space-y-3 text-sm">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
            <h3 className="font-semibold mb-1">High-Quality CPR Components for Children</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Compression rate of 100-120/min</li>
              <li>Compression depth of at least ⅓ AP diameter of chest</li>
              <li>Allow complete chest recoil between compressions</li>
              <li>Minimize interruptions in compressions</li>
              <li>Avoid excessive ventilation</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Compression-to-Ventilation Ratio</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">1 rescuer:</span> 30:2 for infant and child</li>
              <li><span className="font-medium">2 rescuer:</span> 15:2 for infant and child</li>
              <li><span className="font-medium">Continuous compressions:</span> 10 breaths per minute with advanced airway</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Compression Technique</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Infant:</span> Two fingers or two thumb-encircling hands technique</li>
              <li><span className="font-medium">Child:</span> Heel of one or two hands, depending on child's size</li>
            </ul>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
            <h3 className="font-semibold mb-1">High Performance Teams</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Clear roles and responsibilities</li>
              <li>Closed-loop communication</li>
              <li>Rotate compressors every 2 minutes</li>
              <li>Monitor CPR quality with feedback devices when available</li>
              <li>Minimize interruptions during pulse checks (less than 10 seconds)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CPRPage;
