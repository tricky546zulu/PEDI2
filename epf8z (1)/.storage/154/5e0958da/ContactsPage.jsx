import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function ContactsPage() {
  const { offlineStorage } = useAppContext();
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', number: '', notes: '', category: 'hospital' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Categories for contacts
  const categories = [
    { id: 'hospital', name: 'Hospital' },
    { id: 'ems', name: 'EMS' },
    { id: 'poison-control', name: 'Poison Control' },
    { id: 'specialist', name: 'Specialist' },
    { id: 'other', name: 'Other' }
  ];

  // Load contacts from offline storage
  useEffect(() => {
    const loadContacts = async () => {
      try {
        if (offlineStorage.isAvailable) {
          const savedContacts = await offlineStorage.getData('contacts');
          if (savedContacts && savedContacts.length > 0) {
            setContacts(savedContacts);
          } else {
            // Initialize with some default contacts
            const defaultContacts = [
              {
                id: '1',
                name: 'Pediatric Emergency Department',
                number: '555-123-4567',
                category: 'hospital',
                notes: 'Main pediatric ED line'
              },
              {
                id: '2',
                name: 'Poison Control Center',
                number: '1-800-222-1222',
                category: 'poison-control',
                notes: 'National poison control hotline'
              },
              {
                id: '3',
                name: 'Pediatric Transport Team',
                number: '555-987-6543',
                category: 'ems',
                notes: 'For critical pediatric transfers'
              }
            ];
            
            setContacts(defaultContacts);
            await offlineStorage.storeData('contacts', defaultContacts);
          }
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    
    loadContacts();
  }, [offlineStorage]);

  // Save contacts when they change
  useEffect(() => {
    const saveContacts = async () => {
      if (offlineStorage.isAvailable && contacts.length > 0) {
        try {
          await offlineStorage.storeData('contacts', contacts);
        } catch (error) {
          console.error('Error saving contacts:', error);
        }
      }
    };
    
    saveContacts();
  }, [contacts, offlineStorage]);

  // Handle form submission for adding or editing a contact
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing contact
      const updatedContacts = contacts.map(contact => {
        if (contact.id === editingId) {
          return { ...newContact, id: editingId };
        }
        return contact;
      });
      
      setContacts(updatedContacts);
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Add new contact
      const newId = Date.now().toString();
      setContacts([...contacts, { ...newContact, id: newId }]);
    }
    
    // Reset form
    setNewContact({ name: '', number: '', notes: '', category: 'hospital' });
    setShowForm(false);
  };

  // Start editing a contact
  const handleEdit = (contact) => {
    setNewContact({ ...contact });
    setIsEditing(true);
    setEditingId(contact.id);
    setShowForm(true);
  };

  // Delete a contact
  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    
    // If deleting the contact being edited, reset the form
    if (editingId === id) {
      setNewContact({ name: '', number: '', notes: '', category: 'hospital' });
      setIsEditing(false);
      setEditingId(null);
      setShowForm(false);
    }
  };

  // Call a phone number
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  // Filter contacts by category
  const filteredContacts = filterCategory === 'all'
    ? contacts
    : contacts.filter(contact => contact.category === filterCategory);

  return (
    <div className="pb-16">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Emergency Contacts</h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setIsEditing(false);
                setNewContact({ name: '', number: '', notes: '', category: 'hospital' });
              }
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 flex items-center"
          >
            {showForm ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Contact
              </>
            )}
          </button>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Store important emergency contacts for quick access.
        </p>
      </div>
      
      {/* Contact Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-3">{isEditing ? 'Edit Contact' : 'Add New Contact'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="number" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="number"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  value={newContact.number}
                  onChange={(e) => setNewContact({...newContact, number: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  value={newContact.category}
                  onChange={(e) => setNewContact({...newContact, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes (Optional)</label>
                <textarea
                  id="notes"
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  value={newContact.notes}
                  onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Save'} Contact
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      {/* Category Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filterCategory === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-md ${
                filterCategory === category.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Contacts List */}
      <div className="space-y-3">
        {filteredContacts.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg text-center">
            <p className="text-slate-600 dark:text-slate-400">
              No contacts found in this category. Add a new contact to get started.
            </p>
          </div>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-lg mt-1">
                    {contact.number}
                  </p>
                  {contact.notes && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                      {contact.notes}
                    </p>
                  )}
                </div>
                <div>
                  <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-md">
                    {categories.find(c => c.id === contact.category)?.name || 'Other'}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => handleCall(contact.number)}
                  className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </button>
                <button
                  onClick={() => handleEdit(contact)}
                  className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md text-sm hover:bg-red-200 dark:hover:bg-red-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p>Contacts are stored locally on your device and can be accessed offline.</p>
      </div>
    </div>
  );
}

export default ContactsPage;
