// SW mínimo: sin caché y sin intercepción especial
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

// Passthrough explícito (equivale a no manejar fetch)
self.addEventListener('fetch', (event) => {
  // No respondWith -> el navegador maneja normalmente
});
