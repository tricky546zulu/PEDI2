import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

// Components
import Header from './components/Header';
import Navigation from './components/Navigation';
import PatientInfoModal from './components/PatientInfoModal';

// Pages
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import DosingPage from './pages/DosingPage';
import EquipmentPage from './pages/EquipmentPage';
import ParametersPage from './pages/ParametersPage';
import CPRPage from './pages/CPRPage';
import ChecklistsPage from './pages/ChecklistsPage';
import ContactsPage from './pages/ContactsPage';
import AlgorithmDetailsPage from './pages/AlgorithmDetailsPage';

function App() {
  // Register service worker for PWA capabilities
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service worker registered: ', registration);
          })
          .catch(error => {
            console.log('Service worker registration failed: ', error);
          });
      });
    }
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-white">
          <Header />
          
          <main className="max-w-4xl mx-auto px-4 py-4 pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/algorithm/:id" element={<AlgorithmDetailsPage />} />
              <Route path="/dosing" element={<DosingPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/parameters" element={<ParametersPage />} />
              <Route path="/cpr" element={<CPRPage />} />
              <Route path="/checklists" element={<ChecklistsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </main>
          
          <Navigation />
          <PatientInfoModal />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
