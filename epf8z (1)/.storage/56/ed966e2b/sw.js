// Service worker for Pediatric Emergency Care app
const CACHE_NAME = 'pediatric-emergency-care-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png', 
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/maskable_icon.png'
];

// Data URLs that should be cached for offline use
const DATA_URLS = [
  '/offline-check.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request for the fetch call
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for the cache
            const responseToCache = response.clone();

            // Cache API responses and static files
            const url = new URL(event.request.url);
            const isAPIRequest = url.pathname.startsWith('/api/');
            const isDataRequest = DATA_URLS.some(dataUrl => url.pathname.endsWith(dataUrl));
            const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/);

            if (isAPIRequest || isDataRequest || isStaticAsset) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // If fetch fails (offline), try to return a cached page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            // For API requests that fail, return an offline response
            if (event.request.url.includes('/api/')) {
              return new Response(
                JSON.stringify({ 
                  error: 'You are currently offline. Please reconnect to update data.' 
                }),
                { 
                  headers: { 'Content-Type': 'application/json' } 
                }
              );
            }
          });
      })
  );
});

// Background sync for pending operations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-checklists') {
    event.waitUntil(syncCompletedChecklists());
  }
});

// Message handling (for communication between app and service worker)
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Function to sync completed checklists when back online
async function syncCompletedChecklists() {
  try {
    // This would be implemented to sync data with a backend
    // For now, just a placeholder since our app is frontend-only
    console.log('Syncing completed checklists');
    return Promise.resolve();
  } catch (error) {
    console.error('Error syncing checklists:', error);
    return Promise.reject(error);
  }
}

// Periodic background sync (if supported by browser)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

// Function to update cached content periodically
async function updateContent() {
  try {
    // This would be implemented to refresh cached data
    // For now, just a placeholder
    console.log('Periodic content update');
    return Promise.resolve();
  } catch (error) {
    console.error('Error updating content:', error);
    return Promise.reject(error);
  }
}
