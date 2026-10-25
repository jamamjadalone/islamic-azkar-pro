/* Islamic Azkar Pro — Service Worker
   100% offline app shell.
   - Network-First for HTML navigation so existing users always see new deployments immediately without clearing cache.
   - Cache-First for static assets (fonts, icons, images) for instant sub-50ms offline loading.
   - Immediate activation via skipWaiting() and clients.claim(). */
const CACHE = 'azk-pro-v6';
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

  const isNavigation = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');

  if (isNavigation) {
    // Network-First strategy for HTML: always try network first when online
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const copy = networkRes.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return networkRes;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Cache-First strategy for static assets (fonts, images, icons)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});