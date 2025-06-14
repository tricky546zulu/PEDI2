import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Provider
import { AppProvider } from './contexts/AppContext';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import DarkModeToggle from './components/DarkModeToggle';

// Pages
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import AlgorithmDetailsPage from './pages/AlgorithmDetailsPage';
import DosingPage from './pages/DosingPage';
import EquipmentPage from './pages/EquipmentPage';
import ParametersPage from './pages/ParametersPage';
import ChecklistsPage from './pages/ChecklistsPage';
import CPRPage from './pages/CPRPage';
import ContactsPage from './pages/ContactsPage';

// Utils
import { registerServiceWorker } from './utils/offlineStorage';

// Patient Information Modal
const PatientModal = ({ isOpen, onClose, onSave, currentPatient }) => {
  const [weight, setWeight] = useState(currentPatient?.weight || '');
  const [age, setAge] = useState(currentPatient?.age || '');
  const [length, setLength] = useState(currentPatient?.length || '');
  
  useEffect(() => {
    if (isOpen) {
      setWeight(currentPatient?.weight || '');
      setAge(currentPatient?.age || '');
      setLength(currentPatient?.length || '');
    }
  }, [isOpen, currentPatient]);
  
  const handleSave = () => {
    onSave({
      weight: weight ? parseFloat(weight) : null,
      age: age ? parseFloat(age) : null,
      length: length ? parseFloat(length) : null,
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Patient Information</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter patient weight"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">
              Age (months)
            </label>
            <input
              type="number"
              id="age"
              className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter patient age in months"
            />
          </div>
          
          <div>
            <label htmlFor="length" className="block text-sm font-medium mb-1">
              Length (cm)
            </label>
            <input
              type="number"
              id="length"
              className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter patient length"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Offline Banner
const OfflineBanner = ({ isOffline }) => {
  if (!isOffline) return null;
  
  return (
    <div className="bg-yellow-500 text-white px-4 py-1 text-center text-sm">
      You are currently offline. The app will continue to work with cached data.
    </div>
  );
};

function App() {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [currentPatientData, setCurrentPatientData] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Load saved patient data
  useEffect(() => {
    try {
      const savedPatientData = JSON.parse(localStorage.getItem('currentPatient') || 'null');
      setCurrentPatientData(savedPatientData);
    } catch (error) {
      console.error('Error loading patient data:', error);
    }
  }, []);
  
  // Register service worker
  useEffect(() => {
    registerServiceWorker();
  }, []);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Handle patient data updates
  const handlePatientSave = (data) => {
    const updatedData = { ...currentPatientData, ...data, timestamp: new Date().toISOString() };
    setCurrentPatientData(updatedData);
    localStorage.setItem('currentPatient', JSON.stringify(updatedData));
    
    // Save to history
    const patientHistory = JSON.parse(localStorage.getItem('patientHistory') || '[]');
    patientHistory.unshift(updatedData);
    
    // Keep only last 10 entries
    if (patientHistory.length > 10) {
      patientHistory.pop();
    }
    
    localStorage.setItem('patientHistory', JSON.stringify(patientHistory));
    setIsPatientModalOpen(false);
  };
  
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <OfflineBanner isOffline={isOffline} />
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-4 mb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/algorithm/:id" element={<AlgorithmDetailsPage />} />
              <Route path="/dosing" element={<DosingPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/parameters" element={<ParametersPage />} />
              <Route path="/checklists" element={<ChecklistsPage />} />
              <Route path="/cpr" element={<CPRPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Navigation />
          
          <PatientModal
            isOpen={isPatientModalOpen}
            onClose={() => setIsPatientModalOpen(false)}
            onSave={handlePatientSave}
            currentPatient={currentPatientData}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
