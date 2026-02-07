const CACHE_NAME = 'dcl-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação e Cache dos arquivos principais
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estratégia: Tenta a rede primeiro, se falhar (sem internet), usa o Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
