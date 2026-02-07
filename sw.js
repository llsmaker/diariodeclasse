self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

// O fetch pode ficar vazio ou ser usado para cache de outros arquivos futuramente
self.addEventListener('fetch', (event) => {
  return; 
});
