const CACHE_NAME = 'leotard-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// UPDATED FETCH LISTENER
self.addEventListener('fetch', event => {
  // If the request is NOT for our own website (e.g., Unsplash images), 
  // do not intercept it. Let the browser handle it normally.
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Otherwise, serve from cache if available, or fetch from network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});