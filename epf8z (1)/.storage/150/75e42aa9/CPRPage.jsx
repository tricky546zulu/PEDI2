import React from 'react';
import CPRAssist from '../components/CPRAssist';

function CPRPage() {
  return (
    <div className="pb-16">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">CPR Assistant</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          Use this tool to assist with timing during CPR. Follow your local protocols and guidelines.
        </p>
      </div>
      
      <CPRAssist />
      
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p className="mb-1"><strong>Important:</strong> This is a timing assistance tool only. It does not replace proper CPR training or medical judgment.</p>
        <p>For accurate CPR, ensure proper hand position, adequate depth of compression, complete chest recoil, and minimize interruptions.</p>
      </div>
    </div>
  );
}

export default CPRPage;
