import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function EmergencyContacts({ contact }) {
  const { offlineStorage } = useAppContext();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Function to format phone number
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Clean the number
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else {
      return phoneNumber; // Return as-is if not a standard format
    }
  };
  
  // Handle toggling favorite status
  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    
    // Store the updated favorite status in offline storage
    if (offlineStorage) {
      const favoritedContacts = JSON.parse(localStorage.getItem('favoritedContacts') || '[]');
      
      if (isFavorited) {
        // Remove from favorites
        const updatedFavorites = favoritedContacts.filter(id => id !== contact.id);
        localStorage.setItem('favoritedContacts', JSON.stringify(updatedFavorites));
      } else {
        // Add to favorites
        favoritedContacts.push(contact.id);
        localStorage.setItem('favoritedContacts', JSON.stringify(favoritedContacts));
      }
    }
  };
  
  // Load favorited status from storage
  useEffect(() => {
    if (offlineStorage) {
      const favoritedContacts = JSON.parse(localStorage.getItem('favoritedContacts') || '[]');
      setIsFavorited(favoritedContacts.includes(contact.id));
    }
  }, [contact.id, offlineStorage]);
  
  // Handle calling the contact
  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };
  
  // Handle getting directions
  const handleDirections = () => {
    const address = encodeURIComponent(contact.address || '');
    window.open(`https://maps.google.com/maps?daddr=${address}`, '_blank');
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold flex items-center">
              {contact.name}
              {contact.isMedicalControl && (
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Medical Control
                </span>
              )}
            </h3>
            {contact.department && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {contact.department}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleToggleFavorite}
            className="text-slate-400 hover:text-yellow-500 dark:text-slate-500 dark:hover:text-yellow-400"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-yellow-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Contact Information */}
        <div className="mt-4 space-y-2">
          {contact.phone && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-slate-700 dark:text-slate-300">{formatPhoneNumber(contact.phone)}</span>
            </div>
          )}
          
          {contact.address && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-slate-700 dark:text-slate-300">{contact.address}</span>
            </div>
          )}
          
          {contact.email && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {contact.email}
              </a>
            </div>
          )}
          
          {contact.notes && (
            <div className="mt-3 text-sm text-slate-600 dark:text-slate-300 italic">
              Note: {contact.notes}
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleCall}
          className="py-3 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </button>
        
        {contact.address && (
          <button 
            onClick={handleDirections}
            className="py-3 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Directions
          </button>
        )}
      </div>
    </div>
  );
}

export default EmergencyContacts;
