/* Islamic Azkar Pro — Service Worker
   100% offline app shell. Network-first for navigation, stale-while-revalidate for static assets. */
const CACHE = 'azk-pro-v16';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './favicon-32x32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './fonts/al-majeed.ttf',
  './fonts/al-mushaf.ttf',
  './fonts/al-qalam.ttf',
  './fonts/hafs.ttf',
  './fonts/muhammadi.ttf',
  './fonts/pdms-saleem.ttf',
  './assets/asr-durood.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // HTML Navigation: Network-first with offline cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const copy = networkRes.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return networkRes;
      }).catch(() => {
        return caches.match(req).then((cached) => cached || caches.match('./index.html') || caches.match('./'));
      })
    );
    return;
  }

  // Static Assets: Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        fetch(req).then((networkRes) => {
          if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
            const copy = networkRes.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
        // fixmyslop-ignore[slop/empty-catch]
        }).catch(() => {});
        return cached;
      }

      return fetch(req).then((networkRes) => {
        if (networkRes && (networkRes.status === 200 || networkRes.type === 'opaque')) {
          const copy = networkRes.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return networkRes;
      });
    })
  );
});