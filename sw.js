const CACHE_NAME = 'dcl-v1';

// Ativação imediata
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// O Chrome exige este evento 'fetch' para liberar o ícone de instalação
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => new Response("Offline"))
  );
});
