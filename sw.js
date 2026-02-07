const cacheName = 'dcl-v1'; // Mude o v1 se quiser forçar atualização depois

self.addEventListener('install', e => {
  self.skipWaiting(); // Força a instalação imediata no PC
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.json'
    ]))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim()); // Assume o controle do site na hora
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
