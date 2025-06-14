import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import AlgorithmDetailsPage from './pages/AlgorithmDetailsPage';
import DosingPage from './pages/DosingPage';
import EquipmentPage from './pages/EquipmentPage';
import ParametersPage from './pages/ParametersPage';
import ChecklistsPage from './pages/ChecklistsPage';
import CPRPage from './pages/CPRPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  // State to track if the app is installed (PWA)
  const [isInstalled, setIsInstalled] = useState(false);
  
  // Check if the app is running as installed PWA
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }
  }, []);

  // Register service worker for PWA support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
          console.error('Service Worker registration failed:', error);
        });
      });
    }
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
          <Header />
          <main className="flex-1 overflow-y-auto pb-16 pt-2 px-2 md:px-4 max-w-5xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/algorithms/:id" element={<AlgorithmDetailsPage />} />
              <Route path="/dosing" element={<DosingPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/parameters" element={<ParametersPage />} />
              <Route path="/checklists" element={<ChecklistsPage />} />
              <Route path="/cpr" element={<CPRPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </main>
          <Navigation isInstalled={isInstalled} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
