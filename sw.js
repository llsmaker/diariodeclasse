// Força a instalação e atualização imediata do Service Worker
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

/**
 * O Chrome exige um evento 'fetch' funcional para habilitar o botão de instalação.
 * Este código apenas deixa a requisição passar normalmente (modo pass-through).
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Retorna uma resposta básica caso o usuário esteja offline
      return new Response("Você está offline, mas o app está instalado.");
    })
  );
});
