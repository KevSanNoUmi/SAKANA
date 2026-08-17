// Carnet Pêche JP — service worker V6.5.12 UX carte + cibles tactiles
// Démarrage : noyau léger + décisions pré-calculées. Le corpus complet est chargé à la demande.
const CACHE_PREFIX = 'carnet-peche-jp-';
const CACHE = 'carnet-peche-jp-v6-5-23-ppmori-20260817-4';

const CRITICAL = [
  './',
  './index.html',
  './app_core.json',
  './decision_cache.json',
  './tides_2026.json',
];

// Corpus détaillé : préchargé en arrière-plan à l'installation, mais jamais bloquant pour le premier rendu.
const OPTIONAL = [
  './fonts/PPMori-Regular.otf',
  './fonts/PPMori-SemiBold.otf',
  './data.json',
  './synthesis.json',
  './lure_typology.json',
  './decision_tree.json',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CRITICAL);
    await Promise.allSettled(OPTIONAL.map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

function isSameOriginData(pathname) {
  return [
    'app_core.json','decision_cache.json','tides_2026.json',
    'data.json','synthesis.json','lure_typology.json','decision_tree.json'
  ].some((name) => pathname.endsWith('/' + name) || pathname.endsWith(name));
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response && response.ok) await cache.put(request, response.clone());
  return response;
}

async function cacheFirstRefresh(request, event, fallbackKey=null) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request) || (fallbackKey ? await cache.match(fallbackKey) : null);
  const refresh = fetch(request).then(async (response) => {
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  if (hit) {
    if (event) event.waitUntil(refresh);
    return hit;
  }
  return (await refresh) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin && isSameOriginData(url.pathname)) {
    // Version du cache = version de release : réponse locale immédiate, mise à jour silencieuse ensuite.
    event.respondWith(cacheFirstRefresh(request, event));
    return;
  }

  if (request.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(cacheFirstRefresh(request, event, './index.html'));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
