// Cache version — bump to invalidate old caches after a deploy.
const CACHE_NAME = 'cani-v3';
const STATIC_CACHE = 'cani-static-v3';
const RUNTIME_CACHE = 'cani-runtime-v3';
const ALLOWED_HOSTS = new Set(['www.caniuav.com', 'caniuav.com']);

// Critical above-the-fold assets — precached on install for instant 2nd-visit LCP.
const PRECACHE_URLS = [
  '/',
  '/logo.png',
  '/logo-cani-small.webp',
  '/favicon.png',
  '/hero-fc-board.webp',
  '/hero-fc-board-sm.webp',
];

// Install: precache critical assets, but never fail install if one 404s.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch(() => { /* ignore individual failures */ })
        )
      )
    )
  );
  self.skipWaiting();
});

// Activate: clean any cache that isn't in our current version set.
self.addEventListener('activate', (event) => {
  const keep = new Set([CACHE_NAME, STATIC_CACHE, RUNTIME_CACHE]);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (!ALLOWED_HOSTS.has(self.location.hostname)) return;
  if (request.method !== 'GET') return;

  // Always go to network for Supabase / API
  if (url.hostname.includes('supabase') || url.pathname.startsWith('/rest/')) return;

  // Hashed JS chunks (Vite emits filename-HASH.js) — safe to cache-first because
  // the hash invalidates on content change. This is a HUGE 2nd-visit win for
  // the main bundle (~219KB gzip), translation chunks, and route chunks.
  // We deliberately scope to /assets/ to avoid catching non-hashed scripts.
  if (url.pathname.startsWith('/assets/') && /\.(js|css)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Images / fonts / CSS — cache-first
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // HTML pages: network-first with cache fallback (so deploys ship fresh HTML
  // but offline / flaky network still serves something).
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }
});
