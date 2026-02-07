// Força a ativação imediata para o Chrome reconhecer o PWA no PC
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

/** 
 * O Chrome Desktop EXIGE este evento 'fetch' para liberar o botão 
 * de instalação e usar o ícone bordô do manifest.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => new Response("DCL Offline"))
  );
});
