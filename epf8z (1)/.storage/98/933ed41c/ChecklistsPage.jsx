import React, { useState, useEffect } from 'react';
import Checklists from '../components/Checklists';
import { useAppContext } from '../contexts/AppContext';

function ChecklistsPage() {
  const { isOffline, offlineStorage } = useAppContext();
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customChecklists, setCustomChecklists] = useState([]);
  const [showCustomChecklists, setShowCustomChecklists] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: '',
    description: '',
    items: [{ text: '', required: false, details: '' }]
  });

  // Load checklists data
  useEffect(() => {
    const loadChecklists = async () => {
      try {
        // First try to load from IndexedDB if available
        if (offlineStorage.isAvailable) {
          const cachedChecklists = await offlineStorage.getData('checklists');
          if (cachedChecklists && cachedChecklists.length > 0) {
            setChecklists(cachedChecklists);
          } else {
            // Default checklists - in a real app, this would come from an API or data file
            const defaultChecklists = [
              {
                id: 'initial-assessment',
                title: 'Initial Patient Assessment',
                description: 'Checklist for initial pediatric emergency assessment',
                items: [
                  { text: 'Assess scene safety', required: true },
                  { text: 'Check responsiveness', required: true },
                  { text: 'Call for help if unresponsive', required: true },
                  { text: 'Open airway', required: true },
                  { text: 'Check breathing', required: true },
                  { text: 'Check circulation (pulse)', required: true },
                  { text: 'Check for and control severe bleeding', required: true },
                  { text: 'Assess for signs of shock', required: false },
                  { text: 'Record initial vital signs', required: false, details: 'HR, RR, SpO2, BP (if appropriate)' }
                ]
              },
              {
                id: 'medication-admin',
                title: 'Medication Administration',
                description: 'Safe medication administration process',
                items: [
                  { text: 'Verify patient identity', required: true },
                  { text: 'Check medication name', required: true },
                  { text: 'Check medication dose', required: true, details: 'Verify with weight-based calculation' },
                  { text: 'Check route of administration', required: true },
                  { text: 'Check medication expiration date', required: true },
                  { text: 'Prepare medication', required: true },
                  { text: 'Verify with second provider for critical meds', required: false },
                  { text: 'Document administration time', required: true },
                  { text: 'Monitor for effects and side effects', required: true }
                ]
              },
              {
                id: 'resp-distress',
                title: 'Respiratory Distress',
                description: 'Management of pediatric respiratory distress',
                items: [
                  { text: 'Position patient for optimal airway', required: true },
                  { text: 'Apply pulse oximetry', required: true },
                  { text: 'Administer oxygen if SpO2 < 94%', required: true },
                  { text: 'Assess work of breathing', required: true },
                  { text: 'Consider bronchodilator if wheezing', required: false },
                  { text: 'Obtain IV/IO access if moderate/severe', required: false },
                  { text: 'Reassess after interventions', required: true },
                  { text: 'Prepare for potential deterioration', required: false, details: 'Have BVM and airway equipment ready' }
                ]
              }
            ];
            
            setChecklists(defaultChecklists);
            
            // Store in IndexedDB for offline use
            if (offlineStorage.isAvailable) {
              await offlineStorage.storeData('checklists', defaultChecklists);
            }
          }
        }
        
        // Load any custom checklists from localStorage
        const savedCustomChecklists = JSON.parse(localStorage.getItem('customChecklists') || '[]');
        setCustomChecklists(savedCustomChecklists);
        
      } catch (error) {
        console.error('Error loading checklists:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChecklists();
  }, [offlineStorage]);
  
  // Add new checklist item field
  const addChecklistItem = () => {
    setNewChecklist({
      ...newChecklist,
      items: [...newChecklist.items, { text: '', required: false, details: '' }]
    });
  };
  
  // Remove checklist item field
  const removeChecklistItem = (index) => {
    const updatedItems = newChecklist.items.filter((_, i) => i !== index);
    setNewChecklist({
      ...newChecklist,
      items: updatedItems
    });
  };
  
  // Update checklist item field
  const updateChecklistItem = (index, field, value) => {
    const updatedItems = [...newChecklist.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewChecklist({
      ...newChecklist,
      items: updatedItems
    });
  };
  
  // Save new custom checklist
  const saveCustomChecklist = () => {
    // Validate form
    if (!newChecklist.title || newChecklist.items.some(item => !item.text)) {
      alert('Please fill in all required fields');
      return;
    }
    
    const checklistToSave = {
      ...newChecklist,
      id: `custom-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const updatedChecklists = [...customChecklists, checklistToSave];
    localStorage.setItem('customChecklists', JSON.stringify(updatedChecklists));
    setCustomChecklists(updatedChecklists);
    
    // Reset form
    setNewChecklist({
      title: '',
      description: '',
      items: [{ text: '', required: false, details: '' }]
    });
    setShowCreateForm(false);
  };
  
  // Delete custom checklist
  const deleteCustomChecklist = (id) => {
    if (window.confirm('Are you sure you want to delete this checklist?')) {
      const updatedChecklists = customChecklists.filter(checklist => checklist.id !== id);
      localStorage.setItem('customChecklists', JSON.stringify(updatedChecklists));
      setCustomChecklists(updatedChecklists);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Emergency Checklists</h1>
      
      {/* Toggle between standard and custom checklists */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
        <button
          className={`py-2 px-4 font-medium ${!showCustomChecklists ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
          onClick={() => setShowCustomChecklists(false)}
        >
          Standard Checklists
        </button>
        <button
          className={`py-2 px-4 font-medium ${showCustomChecklists ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
          onClick={() => setShowCustomChecklists(true)}
        >
          Custom Checklists
        </button>
      </div>
      
      {/* Display appropriate checklists based on toggle */}
      {!showCustomChecklists ? (
        <>
          {/* Standard checklists */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {checklists.map(checklist => (
                <Checklists key={checklist.id} checklist={checklist} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Custom checklists section */}
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Custom Checklists</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
            >
              {showCreateForm ? 'Cancel' : 'Create New'}
            </button>
          </div>
          
          {/* Create new checklist form */}
          {showCreateForm && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 mt-4">
              <h3 className="font-bold text-lg mb-3">Create Custom Checklist</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Checklist Title*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                    value={newChecklist.title}
                    onChange={(e) => setNewChecklist({...newChecklist, title: e.target.value})}
                    placeholder="Enter checklist title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                    value={newChecklist.description}
                    onChange={(e) => setNewChecklist({...newChecklist, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Checklist Items*</label>
                  {newChecklist.items.map((item, index) => (
                    <div key={index} className="flex flex-col mb-3 p-3 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-700/50">
                      <div className="flex justify-between items-start mb-2">
                        <label className="text-xs font-medium">Item {index + 1}</label>
                        <button
                          onClick={() => removeChecklistItem(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                          disabled={newChecklist.items.length <= 1}
                        >
                          Remove
                        </button>
                      </div>
                      
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 mb-2"
                        value={item.text}
                        onChange={(e) => updateChecklistItem(index, 'text', e.target.value)}
                        placeholder="Enter item text"
                      />
                      
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`required-${index}`}
                          checked={item.required}
                          onChange={(e) => updateChecklistItem(index, 'required', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={`required-${index}`} className="text-sm">Required item</label>
                      </div>
                      
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                        value={item.details}
                        onChange={(e) => updateChecklistItem(index, 'details', e.target.value)}
                        placeholder="Additional details (optional)"
                      />
                    </div>
                  ))}
                  
                  <button
                    onClick={addChecklistItem}
                    className="w-full py-2 mt-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    + Add Item
                  </button>
                </div>
                
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={saveCustomChecklist}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Save Checklist
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Display custom checklists */}
          {customChecklists.length > 0 ? (
            <div className="space-y-4 mt-4">
              {customChecklists.map(checklist => (
                <div key={checklist.id} className="relative">
                  <Checklists checklist={checklist} />
                  <button
                    onClick={() => deleteCustomChecklist(checklist.id)}
                    className="absolute top-4 right-4 p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
                    title="Delete checklist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg mt-4">
              <p className="text-slate-500 dark:text-slate-400">
                You haven't created any custom checklists yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ChecklistsPage;
