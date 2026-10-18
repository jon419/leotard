const CACHE_NAME = 'leotard-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const oldCaches = cacheNames.filter(name => name !== CACHE_NAME);
      const hadOldCache = oldCaches.length > 0;
      return Promise.all(oldCaches.map(name => caches.delete(name)))
        .then(() => self.clients.claim())
        .then(() => {
          if (hadOldCache) {
            return self.clients.matchAll({ type: 'window' }).then(clients => {
              clients.forEach(client => {
                if ('navigate' in client) {
                  client.navigate(client.url);
                }
              });
            });
          }
        });
    })
  );
});

// Network-first strategy: always try to get the freshest files when online,
// falling back to cache only when offline.
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});