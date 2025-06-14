import React, { useState, useEffect } from 'react';
import EmergencyContacts from '../components/EmergencyContacts';
import { useAppContext } from '../contexts/AppContext';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/offlineStorage';

function ContactsPage() {
  const { offlineStorage } = useAppContext();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Contact categories
  const categories = [
    { id: 'all', name: 'All Contacts' },
    { id: 'hospital', name: 'Hospitals' },
    { id: 'medical-control', name: 'Medical Control' },
    { id: 'specialty', name: 'Specialty Centers' }
  ];
  
  // Load contacts data
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const contactsData = [
        {
          id: 'med-control-1',
          name: 'Dr. Sarah Johnson',
          department: 'Pediatric Emergency Medicine',
          category: 'medical-control',
          isMedicalControl: true,
          phone: '555-123-4567',
          email: 'sjohnson@pediatricemergency.org',
          notes: 'Primary medical control physician for pediatric cases'
        },
        {
          id: 'med-control-2',
          name: 'Dr. Michael Chen',
          department: 'Pediatric Critical Care',
          category: 'medical-control',
          isMedicalControl: true,
          phone: '555-789-0123',
          email: 'mchen@pediatricemergency.org',
          notes: 'Backup medical control for complex cases'
        },
        {
          id: 'hospital-1',
          name: 'Children\'s Memorial Hospital',
          department: 'Emergency Department',
          category: 'hospital',
          phone: '555-111-2222',
          address: '1234 Healing Way, Metropolis, NY 10001',
          notes: 'Level 1 Pediatric Trauma Center'
        },
        {
          id: 'hospital-2',
          name: 'University Medical Center',
          department: 'Pediatric Emergency',
          category: 'hospital',
          phone: '555-333-4444',
          address: '5678 Medical Drive, Metropolis, NY 10002',
          notes: 'Specialized pediatric burn unit'
        },
        {
          id: 'specialty-1',
          name: 'Regional Poison Control Center',
          category: 'specialty',
          phone: '800-222-1222',
          email: 'poisoncontrol@health.org',
          notes: '24/7 consultation for toxic exposures'
        },
        {
          id: 'specialty-2',
          name: 'Pediatric Trauma Center',
          department: 'Trauma Services',
          category: 'specialty',
          phone: '555-999-8888',
          address: '910 Emergency Blvd, Metropolis, NY 10003',
          notes: '24/7 pediatric trauma team availability'
        },
        {
          id: 'specialty-3',
          name: 'Children\'s Burn Center',
          department: 'Burn Unit',
          category: 'specialty',
          phone: '555-777-6666',
          address: '543 Healthcare Lane, Metropolis, NY 10004',
          notes: 'Specialized pediatric burn treatment'
        }
      ];
      
      setContacts(contactsData);
      setIsLoading(false);
    };
    
    loadContacts();
  }, []);
  
  // Get favorited contacts from local storage
  const getFavoritedContacts = () => {
    return loadFromLocalStorage('favoritedContacts', []);
  };
  
  // Filter contacts based on search query, category, and favorites setting
  const filteredContacts = contacts.filter(contact => {
    // Match search query
    const matchesSearch = searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.department && contact.department.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Match selected category
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    
    // Check if favorites only is enabled
    const matchesFavorites = !showFavoritesOnly || 
      getFavoritedContacts().includes(contact.id);
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-3">
          <label htmlFor="contact-search" className="sr-only">Search Contacts</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="contact-search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-1 space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Favorites Toggle */}
          <button
            className={`flex items-center px-3 py-1 rounded-full text-sm ${
              showFavoritesOnly
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
            }`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${showFavoritesOnly ? 'text-yellow-500' : ''}`} fill={showFavoritesOnly ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favorites Only
          </button>
        </div>
      </div>
      
      {/* Contacts List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <EmergencyContacts key={contact.id} contact={contact} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">No contacts match your search.</p>
              <button 
                className="mt-4 text-blue-600 dark:text-blue-400"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowFavoritesOnly(false);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">Emergency Contacts</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Quick access to important contacts for pediatric emergencies.
          Star your frequently used contacts for faster access. Tap the call button to immediately dial the contact.
        </p>
      </div>
    </div>
  );
}

export default ContactsPage;
