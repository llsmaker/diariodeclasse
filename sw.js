self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('fetch', (event) => {
  // Apenas deixa as requisições passarem, sem buscar ícones externos
  event.respondWith(fetch(event.request).catch(() => new Response("offline")));
});
