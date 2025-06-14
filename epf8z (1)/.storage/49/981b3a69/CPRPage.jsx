import React from 'react';
import CPRAssist from '../components/CPRAssist';

function CPRPage() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-lg font-bold mb-2">CPR Assistant</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          This tool helps track CPR time, log interventions, and maintain a consistent compression rhythm.
          Activate the metronome for a steady compression rate of 100-120 per minute.
        </p>
      </div>
      
      <CPRAssist />
      
      {/* Reference Guidelines */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-md font-bold mb-2">Pediatric CPR Guidelines</h3>
        
        <div className="space-y-3">
          {/* Compression Depth */}
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Compression Depth</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>Infants: At least 1/3 AP diameter of chest (approx. 4 cm / 1.5 inches)</li>
              <li>Children: At least 1/3 AP diameter of chest (approx. 5 cm / 2 inches)</li>
              <li>Adolescents: At least 5 cm / 2 inches, not exceeding 6 cm / 2.4 inches</li>
            </ul>
          </div>
          
          {/* Compression Rate */}
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Compression Rate</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              100-120 compressions per minute for all age groups
            </p>
          </div>
          
          {/* Compression to Ventilation Ratio */}
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Compression to Ventilation Ratio</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>One Rescuer: 30:2 for all age groups</li>
              <li>Two Rescuers: 15:2 for infants and children, 30:2 for adolescents</li>
              <li>Advanced Airway: Continuous compressions with ventilation every 6 seconds (10 breaths/min)</li>
            </ul>
          </div>
          
          {/* Key Medications */}
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Key Medications</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes</li>
              <li>Amiodarone: 5 mg/kg IV/IO for VF/pulseless VT</li>
              <li>Lidocaine: 1 mg/kg IV/IO for VF/pulseless VT</li>
            </ul>
          </div>
          
          {/* Defibrillation */}
          <div>
            <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Defibrillation (VF/pulseless VT)</h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              <li>First shock: 2 J/kg</li>
              <li>Second and subsequent shocks: 4 J/kg (maximum 10 J/kg or adult dose)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Instructions/Disclaimer */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <p className="text-red-600 dark:text-red-400 font-medium mb-2">
          IMPORTANT: This tool is designed to assist trained medical professionals. 
          It does not replace proper training or clinical judgment.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          Always follow your local protocols and guidelines for pediatric resuscitation.
        </p>
      </div>
    </div>
  );
}

export default CPRPage;
