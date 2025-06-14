import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function ChecklistsPage() {
  const { offlineStorage } = useAppContext();
  const [checklists, setChecklists] = useState([]);
  const [activeChecklist, setActiveChecklist] = useState(null);
  const [newChecklistName, setNewChecklistName] = useState('');
  const [newItemText, setNewItemText] = useState('');
  
  // Load checklists from storage
  useEffect(() => {
    const loadChecklists = async () => {
      try {
        if (offlineStorage.isAvailable) {
          const savedChecklists = await offlineStorage.getData('checklists');
          if (savedChecklists && savedChecklists.length > 0) {
            setChecklists(savedChecklists);
          } else {
            // Initialize with some default checklists if none exist
            const defaultChecklists = [
              {
                id: 'intubation',
                name: 'Intubation Checklist',
                items: [
                  { id: '1', text: 'Verify equipment (ETT, laryngoscope, suction)', completed: false },
                  { id: '2', text: 'Pre-oxygenate patient', completed: false },
                  { id: '3', text: 'Medications prepared (sedation, paralytic)', completed: false },
                  { id: '4', text: 'Monitoring attached', completed: false },
                  { id: '5', text: 'Backup airway device available', completed: false },
                  { id: '6', text: 'Post-intubation: confirm tube placement', completed: false }
                ]
              },
              {
                id: 'trauma',
                name: 'Trauma Assessment',
                items: [
                  { id: '1', text: 'Airway assessment & management', completed: false },
                  { id: '2', text: 'Breathing assessment', completed: false },
                  { id: '3', text: 'Circulation & hemorrhage control', completed: false },
                  { id: '4', text: 'Disability (neuro status)', completed: false },
                  { id: '5', text: 'Exposure (fully examine)', completed: false },
                  { id: '6', text: 'Secondary assessment', completed: false }
                ]
              }
            ];
            
            setChecklists(defaultChecklists);
            await offlineStorage.storeData('checklists', defaultChecklists);
          }
        }
      } catch (error) {
        console.error('Error loading checklists:', error);
      }
    };
    
    loadChecklists();
  }, [offlineStorage]);
  
  // Save checklists when they change
  useEffect(() => {
    const saveChecklists = async () => {
      if (offlineStorage.isAvailable && checklists.length > 0) {
        try {
          await offlineStorage.storeData('checklists', checklists);
        } catch (error) {
          console.error('Error saving checklists:', error);
        }
      }
    };
    
    saveChecklists();
  }, [checklists, offlineStorage]);
  
  const handleToggleItem = (itemId) => {
    if (!activeChecklist) return;
    
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === activeChecklist.id) {
        const updatedItems = checklist.items.map(item => {
          if (item.id === itemId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        
        return { ...checklist, items: updatedItems };
      }
      return checklist;
    });
    
    setChecklists(updatedChecklists);
    setActiveChecklist(updatedChecklists.find(c => c.id === activeChecklist.id));
  };
  
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!activeChecklist || !newItemText.trim()) return;
    
    const newItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      completed: false
    };
    
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === activeChecklist.id) {
        return {
          ...checklist,
          items: [...checklist.items, newItem]
        };
      }
      return checklist;
    });
    
    setChecklists(updatedChecklists);
    setActiveChecklist(updatedChecklists.find(c => c.id === activeChecklist.id));
    setNewItemText('');
  };
  
  const handleDeleteItem = (itemId) => {
    if (!activeChecklist) return;
    
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === activeChecklist.id) {
        return {
          ...checklist,
          items: checklist.items.filter(item => item.id !== itemId)
        };
      }
      return checklist;
    });
    
    setChecklists(updatedChecklists);
    setActiveChecklist(updatedChecklists.find(c => c.id === activeChecklist.id));
  };
  
  const handleCreateChecklist = (e) => {
    e.preventDefault();
    if (!newChecklistName.trim()) return;
    
    const newChecklist = {
      id: Date.now().toString(),
      name: newChecklistName.trim(),
      items: []
    };
    
    const updatedChecklists = [...checklists, newChecklist];
    setChecklists(updatedChecklists);
    setActiveChecklist(newChecklist);
    setNewChecklistName('');
  };
  
  const handleDeleteChecklist = (checklistId) => {
    const updatedChecklists = checklists.filter(checklist => checklist.id !== checklistId);
    setChecklists(updatedChecklists);
    
    if (activeChecklist && activeChecklist.id === checklistId) {
      setActiveChecklist(null);
    }
  };
  
  const handleResetChecklist = () => {
    if (!activeChecklist) return;
    
    const updatedChecklists = checklists.map(checklist => {
      if (checklist.id === activeChecklist.id) {
        return {
          ...checklist,
          items: checklist.items.map(item => ({ ...item, completed: false }))
        };
      }
      return checklist;
    });
    
    setChecklists(updatedChecklists);
    setActiveChecklist(updatedChecklists.find(c => c.id === activeChecklist.id));
  };
  
  return (
    <div className="pb-16">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Procedure Checklists</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Create and manage customized checklists for procedures and tasks.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Checklist Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
            <h3 className="font-medium mb-3">My Checklists</h3>
            
            <form onSubmit={handleCreateChecklist} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="New checklist name..."
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </form>
            
            <div className="space-y-2">
              {checklists.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
                  No checklists created yet
                </p>
              ) : (
                checklists.map(checklist => (
                  <div
                    key={checklist.id}
                    className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                      activeChecklist && activeChecklist.id === checklist.id
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => setActiveChecklist(checklist)}
                  >
                    <span className="truncate">{checklist.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChecklist(checklist.id);
                      }}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Active Checklist */}
        <div className="md:col-span-2">
          {activeChecklist ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{activeChecklist.name}</h2>
                <div className="space-x-2">
                  <button
                    onClick={handleResetChecklist}
                    className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md text-sm hover:bg-amber-200 dark:hover:bg-amber-800/50"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {activeChecklist.items.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                    No items in this checklist yet. Add some below.
                  </p>
                ) : (
                  activeChecklist.items.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-start p-3 rounded ${
                        item.completed
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-slate-50 dark:bg-slate-700/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleItem(item.id)}
                        className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className={`ml-2 flex-1 ${item.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                        {item.text}
                      </span>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              <form onSubmit={handleAddItem}>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-md p-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    placeholder="Add new item..."
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-4 font-medium">No Checklist Selected</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                Select a checklist from the sidebar or create a new one to get started.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p>Checklists are saved locally on your device and will persist between sessions.</p>
      </div>
    </div>
  );
}

export default ChecklistsPage;
