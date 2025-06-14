// Service Worker for offline functionality
const CACHE_NAME = 'pediatric-emergency-care-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
  // Data files
  '/src/data/algorithms.js',
  '/src/data/medications.js',
  '/src/data/equipmentSizes.js',
  '/src/data/vitalSigns.js',
  // Default icons and images
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch(error => {
        console.error('Service Worker: Precaching error:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  // Take control of all clients immediately
  event.waitUntil(clients.claim());
  
  // Clean up any old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          console.log('Service Worker: Clearing old cache', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if response is not valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response since it's a stream and can only be consumed once
            const responseToCache = response.clone();
            
            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('Service Worker: Caching error:', error);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch error:', error);
            
            // For HTML navigation requests, return the offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            
            // Otherwise, just propagate the error
            throw error;
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-patient-data') {
    event.waitUntil(syncPatientData());
  }
  
  if (event.tag === 'sync-checklists') {
    event.waitUntil(syncChecklists());
  }
});

// Helper function to sync patient data
async function syncPatientData() {
  // This would implement the logic to sync any offline patient data
  // when connection is restored. In a real implementation, this would
  // interact with the backend API.
  console.log('Service Worker: Syncing patient data...');
  
  // In this example, we're not actually implementing the backend sync
  // But in a real app, you'd fetch stored data from IndexedDB and send it
  // to your server.
}

// Helper function to sync checklists
async function syncChecklists() {
  console.log('Service Worker: Syncing checklists...');
}

// Push notification event
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const notification = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(notification.title, {
      body: notification.body,
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/badge-96x96.png',
      data: notification.data
    })
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // This handles opening the app to a specific route when a notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // If a window client already exists, focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

console.log('Service Worker: Registered');
