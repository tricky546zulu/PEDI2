import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/offlineStorage';

function Checklists({ checklist }) {
  const [completedItems, setCompletedItems] = useState([]);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [checklistComplete, setChecklistComplete] = useState(false);
  
  // Initialize completed items when checklist changes
  useEffect(() => {
    if (checklist) {
      setCompletedItems(Array(checklist.items.length).fill(false));
    }
  }, [checklist]);
  
  // Update show complete button state when items are checked
  useEffect(() => {
    if (completedItems.length > 0) {
      // Check if all required items are completed
      const requiredItems = checklist.items.filter(item => item.required);
      const requiredIndices = checklist.items
        .map((item, index) => item.required ? index : -1)
        .filter(index => index !== -1);
      
      const allRequiredComplete = requiredIndices.every(index => completedItems[index]);
      
      setShowCompleteButton(allRequiredComplete && !checklistComplete);
    }
  }, [completedItems, checklist, checklistComplete]);

  if (!checklist) return null;

  const handleToggleItem = (index) => {
    const newCompletedItems = [...completedItems];
    newCompletedItems[index] = !newCompletedItems[index];
    setCompletedItems(newCompletedItems);
  };

  const handleCompleteChecklist = () => {
    // Get completed items text for saving
    const completedItemsText = checklist.items
      .filter((_, index) => completedItems[index])
      .map(item => item.text);
    
    // Create record of completed checklist
    const completedChecklist = {
      id: checklist.id,
      title: checklist.title,
      completedItems: completedItemsText,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const savedChecklists = loadFromLocalStorage('completedChecklists', []);
    savedChecklists.unshift(completedChecklist);
    saveToLocalStorage('completedChecklists', savedChecklists);
    
    // Mark as complete
    setChecklistComplete(true);
    setShowCompleteButton(false);
    
    // Optional: Show a confirmation message or toast notification
  };

  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-lg overflow-hidden shadow-sm ${
      checklistComplete 
        ? 'border-green-200 dark:border-green-900' 
        : 'border-slate-200 dark:border-slate-700'
    }`}>
      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{checklist.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {checklist.description}
            </p>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-2"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <ul className="space-y-3">
            {checklist.items.map((item, index) => (
              <li key={index} className={`flex items-start ${
                completedItems[index] ? 'opacity-70' : ''
              }`}>
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={completedItems[index]}
                    onChange={() => handleToggleItem(index)}
                    className="w-4 h-4 rounded border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:border-slate-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className={`font-medium ${
                    completedItems[index] ? 'line-through' : ''
                  }`}>
                    {item.text}
                    {item.required && (
                      <span className="ml-2 text-red-500 dark:text-red-400">*</span>
                    )}
                  </label>
                  {item.details && (
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                      {item.details}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          {/* Legend for required items */}
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="text-red-500 dark:text-red-400">*</span> Required item
          </div>
          
          {/* Complete button */}
          {showCompleteButton && (
            <div className="mt-4">
              <button 
                onClick={handleCompleteChecklist}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Complete Checklist
              </button>
            </div>
          )}
          
          {/* Completion message */}
          {checklistComplete && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 dark:text-green-300">
                  Checklist completed and saved!
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Checklists;
