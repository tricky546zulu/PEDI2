// Service worker for offline functionality
const CACHE_NAME = 'pediatric-emergency-care-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/audio/click.mp3'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }

          return fetch(event.request).then(
            response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response as it's a stream and can only be consumed once
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          ).catch(error => {
            // Check if the request is for an HTML page
            if (event.request.headers.get('accept').includes('text/html')) {
              // Return the offline page
              return caches.match(OFFLINE_URL);
            }
          });
        })
    );
  }
});

// Handle offline data sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-patient-data') {
    event.waitUntil(syncPatientData());
  }
});

// Function to sync data when online
async function syncPatientData() {
  try {
    const db = await getIndexedDB();
    const syncQueue = await db.getAll('syncQueue');
    
    if (syncQueue && syncQueue.length) {
      // Process each item in the sync queue
      for (const item of syncQueue) {
        // This would normally send data to a server
        console.log('Syncing data:', item);
      }
      
      // Clear the sync queue after successful sync
      await clearSyncQueue(db);
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Helper function to clear sync queue
async function clearSyncQueue(db) {
  const tx = db.transaction('syncQueue', 'readwrite');
  const store = tx.objectStore('syncQueue');
  await store.clear();
  await tx.complete;
}

// Helper function to get IndexedDB
function getIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PediatricEmergencyCare', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', { keyPath: 'id' });
      }
    };
  });
}
