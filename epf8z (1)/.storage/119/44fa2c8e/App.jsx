import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

// Lazy-load components for better performance
const Header = lazy(() => import('./components/Header'));
const Navigation = lazy(() => import('./components/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AlgorithmsPage = lazy(() => import('./pages/AlgorithmsPage'));
const AlgorithmDetailsPage = lazy(() => import('./pages/AlgorithmDetailsPage'));
const DosingPage = lazy(() => import('./pages/DosingPage'));
const EquipmentPage = lazy(() => import('./pages/EquipmentPage'));
const ParametersPage = lazy(() => import('./pages/ParametersPage'));
const ChecklistsPage = lazy(() => import('./pages/ChecklistsPage'));
const CPRPage = lazy(() => import('./pages/CPRPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const DarkModeToggle = lazy(() => import('./components/DarkModeToggle'));

// Patient information modal
const PatientInfoModal = lazy(() => import('./components/PatientInfoModal'));

function App() {
  const [isServiceWorkerRegistered, setIsServiceWorkerRegistered] = useState(false);

  // Register service worker for offline functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful');
            setIsServiceWorkerRegistered(true);
          })
          .catch((error) => {
            console.error('ServiceWorker registration failed:', error);
          });
      });
    }
  }, []);

  // Render loading spinner for lazy-loaded components
  const renderLoader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
          <Suspense fallback={renderLoader()}>
            <Header />
            <main className="container mx-auto px-4 py-4 pb-20">
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
              </Routes>
            </main>
            <PatientInfoModal />
            <div className="fixed bottom-24 right-4 z-10">
              <DarkModeToggle />
            </div>
            <Navigation />
          </Suspense>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
