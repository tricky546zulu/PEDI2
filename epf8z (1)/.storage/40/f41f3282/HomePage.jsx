import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function HomePage() {
  const { patientWeight, patientAge, setShowPatientModal } = useAppContext();
  const [recentActivity, setRecentActivity] = useState([]);

  // Load recent activity from localStorage
  useEffect(() => {
    const loadRecentActivity = () => {
      try {
        // Try to load recent activity from localStorage
        const completedChecklists = JSON.parse(localStorage.getItem('completedChecklists') || '[]');
        const patientHistory = JSON.parse(localStorage.getItem('patientHistory') || '[]');
        
        // Combine and sort by timestamp
        const allActivity = [
          ...completedChecklists.map(item => ({ 
            ...item, 
            type: 'checklist',
            displayTime: new Date(item.timestamp).toLocaleString()
          })),
          ...patientHistory.map(item => ({ 
            ...item, 
            type: 'patient',
            displayTime: new Date(item.timestamp).toLocaleString()
          }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
        
        setRecentActivity(allActivity);
      } catch (error) {
        console.error('Error loading recent activity:', error);
        setRecentActivity([]);
      }
    };
    
    loadRecentActivity();
  }, []);

  return (
    <div className="space-y-6">
      {/* Patient Info Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Patient Information</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        
        {patientWeight || patientAge ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {patientWeight && (
              <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded">
                <div className="text-xs text-slate-500 dark:text-slate-400">Weight</div>
                <div className="font-bold">{patientWeight} kg</div>
              </div>
            )}
            {patientAge && (
              <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded">
                <div className="text-xs text-slate-500 dark:text-slate-400">Age</div>
                <div className="font-bold">{patientAge} {patientAge === 1 ? 'month' : 'months'}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 text-center p-4 bg-slate-50 dark:bg-slate-700 rounded text-sm">
            <p className="text-slate-500 dark:text-slate-400">
              No patient information set.
            </p>
            <button 
              onClick={() => setShowPatientModal(true)}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Add Patient Details
            </button>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/algorithms" 
            className="p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900 flex flex-col items-center text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span className="font-medium">PALS Algorithms</span>
          </Link>
          
          <Link 
            to="/dosing" 
            className="p-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-900 flex flex-col items-center text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="font-medium">Medication Dosing</span>
          </Link>
          
          <Link 
            to="/equipment" 
            className="p-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-900 flex flex-col items-center text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Equipment Sizing</span>
          </Link>
          
          <Link 
            to="/cpr" 
            className="p-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-900 flex flex-col items-center text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">CPR Assistant</span>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentActivity.map((activity, index) => (
                <li key={index} className="p-4">
                  <div className="flex justify-between">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      activity.type === 'checklist' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {activity.type === 'checklist' ? 'Checklist' : 'Patient'}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {activity.displayTime}
                    </span>
                  </div>
                  <div className="mt-1">
                    {activity.type === 'checklist' ? activity.title : `Patient: ${activity.weight}kg, ${activity.age}mo`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center">
            <p className="text-slate-500 dark:text-slate-400">No recent activity</p>
          </div>
        )}
      </div>
      
      {/* App Info */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Pediatric Emergency Care App</p>
        <p className="mt-1">Designed for paramedic use in pediatric emergencies</p>
        <p className="mt-1">v1.0.0</p>
      </div>
    </div>
  );
}

export default HomePage;
