const CACHE_NAME = 'v6';

// Installation du SW
self.addEventListener('install', (event) => {
  console.log('[SW] Installed')
  self.skipWaiting()
})

// Activation du SW
self.addEventListener('activate', (event) => {
  console.log('[SW] Activated');
  self.clients.claim();

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== CACHE_NAME)
          .map((cache) => caches.delete(cache))
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})
