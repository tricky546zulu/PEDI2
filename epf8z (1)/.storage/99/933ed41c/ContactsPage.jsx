import React, { useState, useEffect } from 'react';
import EmergencyContacts from '../components/EmergencyContacts';
import { useAppContext } from '../contexts/AppContext';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    category: 'hospital',
    department: '',
    email: '',
    address: '',
    notes: '',
    isMedicalControl: false
  });
  
  // Load contacts data
  useEffect(() => {
    const loadContacts = async () => {
      try {
        // Default mock contacts - in a real app, this would come from an API
        const defaultContacts = [
          {
            id: 'contact-1',
            name: 'Children\'s Hospital ED',
            phone: '555-123-4567',
            category: 'hospital',
            department: 'Emergency Department',
            address: '123 Medical Center Drive',
            email: 'childrenER@hospital.org',
            notes: 'Level 1 Pediatric Trauma Center',
            isMedicalControl: false
          },
          {
            id: 'contact-2',
            name: 'Dr. Sarah Johnson',
            phone: '555-987-6543',
            category: 'medical-control',
            department: 'Pediatric Emergency Medicine',
            email: 'sjohnson@hospital.org',
            notes: 'Available 24/7 for consultations',
            isMedicalControl: true
          },
          {
            id: 'contact-3',
            name: 'Regional Poison Control',
            phone: '800-222-1222',
            category: 'specialty',
            department: 'Toxicology',
            email: 'poison@toxcenter.org',
            notes: 'Available for toxicology consultations',
            isMedicalControl: false
          },
          {
            id: 'contact-4',
            name: 'Pediatric Burns Unit',
            phone: '555-427-8900',
            category: 'specialty',
            department: 'Burn Center',
            address: '456 Hospital Avenue',
            notes: 'Specialized in pediatric burn treatment',
            isMedicalControl: false
          },
          {
            id: 'contact-5',
            name: 'Dr. Michael Chen',
            phone: '555-345-6789',
            category: 'medical-control',
            department: 'Pediatric Critical Care',
            email: 'mchen@hospital.org',
            isMedicalControl: true
          }
        ];
        
        // Load custom contacts
        const savedContacts = JSON.parse(localStorage.getItem('customContacts') || '[]');
        const allContacts = [...defaultContacts, ...savedContacts];
        
        setContacts(allContacts);
        
        // Load favorited contacts
        const favoritedIds = JSON.parse(localStorage.getItem('favoritedContacts') || '[]');
        setFavoriteContacts(favoritedIds);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading contacts:', error);
        setLoading(false);
      }
    };
    
    loadContacts();
  }, []);
  
  // Get unique categories for filter tabs
  const categories = ['all', 'favorites', ...new Set(contacts.map(contact => contact.category))];
  
  // Filter contacts based on search term and active category
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        contact.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        contact.notes?.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesCategory = 
      activeCategory === 'all' || 
      (activeCategory === 'favorites' && favoriteContacts.includes(contact.id)) ||
      contact.category === activeCategory;
      
    return matchesSearch && matchesCategory;
  });
  
  // Sort contacts with medical control first
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.isMedicalControl && !b.isMedicalControl) return -1;
    if (!a.isMedicalControl && b.isMedicalControl) return 1;
    return a.name.localeCompare(b.name);
  });
  
  // Handle adding a new contact
  const handleAddContact = () => {
    // Validate form
    if (!newContact.name || !newContact.phone) {
      alert('Name and phone number are required');
      return;
    }
    
    const contactToSave = {
      ...newContact,
      id: `custom-${Date.now()}`
    };
    
    // Save to localStorage
    const savedContacts = JSON.parse(localStorage.getItem('customContacts') || '[]');
    const updatedContacts = [...savedContacts, contactToSave];
    localStorage.setItem('customContacts', JSON.stringify(updatedContacts));
    
    // Update state
    setContacts([...contacts, contactToSave]);
    
    // Reset form
    setNewContact({
      name: '',
      phone: '',
      category: 'hospital',
      department: '',
      email: '',
      address: '',
      notes: '',
      isMedicalControl: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Emergency Contacts</h1>
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search contacts..."
          className="pl-10 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category filters */}
      <div className="flex overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {category === 'all' 
                ? 'All' 
                : category === 'favorites' 
                  ? 'Favorites' 
                  : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
      
      {/* Add contact button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {showAddForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>
      
      {/* Add contact form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h2 className="font-bold mb-3 text-lg">Add New Contact</h2>
          <div className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name*</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Contact name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number*</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.category}
                  onChange={(e) => setNewContact({...newContact, category: e.target.value})}
                >
                  <option value="hospital">Hospital</option>
                  <option value="medical-control">Medical Control</option>
                  <option value="specialty">Specialty Service</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.department}
                  onChange={(e) => setNewContact({...newContact, department: e.target.value})}
                  placeholder="Department/Role"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                  value={newContact.address}
                  onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                  placeholder="Physical address"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                className="w-full px-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700"
                value={newContact.notes}
                onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                placeholder="Additional information"
                rows={3}
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-medical-control"
                className="mr-2"
                checked={newContact.isMedicalControl}
                onChange={(e) => setNewContact({...newContact, isMedicalControl: e.target.checked})}
              />
              <label htmlFor="is-medical-control" className="text-sm font-medium">
                Is Medical Control
              </label>
            </div>
            
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleAddContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Contacts list */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : sortedContacts.length > 0 ? (
        <div className="grid gap-4">
          {sortedContacts.map((contact) => (
            <EmergencyContacts key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            No contacts found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
