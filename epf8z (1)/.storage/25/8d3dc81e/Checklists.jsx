import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

function Checklists({ checklist }) {
  const { saveCompletedChecklist } = useAppContext();
  const [checkItems, setCheckItems] = useState(
    checklist.items.map(item => ({ ...item, checked: false }))
  );
  const [isComplete, setIsComplete] = useState(false);

  // Handle item toggle
  const handleToggleItem = (index) => {
    const updatedItems = [...checkItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    setCheckItems(updatedItems);
    
    // Check if all required items are checked
    const allRequiredChecked = updatedItems
      .filter(item => item.required)
      .every(item => item.checked);
      
    setIsComplete(allRequiredChecked);
  };

  // Handle checklist completion
  const handleComplete = () => {
    const completedItems = checkItems.filter(item => item.checked).map(item => item.text);
    saveCompletedChecklist({
      id: checklist.id,
      title: checklist.title,
      completedItems,
      timestamp: new Date().toISOString(),
    });
    
    // Reset the form
    setCheckItems(checkItems.map(item => ({ ...item, checked: false })));
    setIsComplete(false);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-bold">{checklist.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{checklist.description}</p>
      </div>
      
      <div className="p-4">
        <ul className="space-y-3">
          {checkItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id={`item-${checklist.id}-${index}`}
                  type="checkbox"
                  className="w-5 h-5 rounded text-blue-600 bg-slate-100 dark:bg-slate-700"
                  checked={item.checked}
                  onChange={() => handleToggleItem(index)}
                />
              </div>
              <label 
                htmlFor={`item-${checklist.id}-${index}`}
                className={`ml-3 text-sm font-medium ${
                  item.checked 
                    ? 'line-through text-slate-500 dark:text-slate-400' 
                    : 'text-slate-900 dark:text-slate-100'
                } ${
                  item.required 
                    ? 'after:content-["*"] after:ml-0.5 after:text-red-500' 
                    : ''
                }`}
              >
                {item.text}
                {item.details && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.details}
                  </p>
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {isComplete ? "All required items checked" : "Complete all required items (*)"}
        </div>
        <button
          onClick={handleComplete}
          disabled={!isComplete}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isComplete
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
          }`}
        >
          Complete Checklist
        </button>
      </div>
    </div>
  );
}

export default Checklists;
