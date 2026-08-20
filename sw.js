/* Islamic Azkar Pro — Service Worker
   100% offline app shell. Cache-first with network fallback.
   Updated automatically on each deploy via a cache version bump. */
const CACHE = 'azk-pro-v1';
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});