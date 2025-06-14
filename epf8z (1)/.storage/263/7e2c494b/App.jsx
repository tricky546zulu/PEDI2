import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import AlgorithmDetailsPage from './pages/AlgorithmDetailsPage';
import DosingPage from './pages/DosingPage';
import EquipmentPage from './pages/EquipmentPage';
import CPRPage from './pages/CPRPage';
import PatientInfoModal from './components/PatientInfoModal';

function App() {
  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-white pb-20">
          <Header />

          <main className="container mx-auto p-4 pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/algorithm/:id" element={<AlgorithmDetailsPage />} />
              <Route path="/dosing" element={<DosingPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/parameters" element={<ParametersPage />} />
              <Route path="/cpr" element={<CPRPage />} />
              <Route path="/checklists" element={<div className="p-4 bg-white dark:bg-slate-800 rounded-lg">Checklists - Coming Soon</div>} />
              <Route path="/contacts" element={<div className="p-4 bg-white dark:bg-slate-800 rounded-lg">Emergency Contacts - Coming Soon</div>} />
              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <PatientInfoModal />
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;