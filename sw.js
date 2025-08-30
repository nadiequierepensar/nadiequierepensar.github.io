// SW mínimo: NO cachea nada. Solo habilita el prompt de instalación.
self.addEventListener('install', (e) => {
  // activa de inmediato
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // limpia caches viejos por si antes usabas uno
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

// Sin 'fetch' -> no intercepta ni cachea requests
