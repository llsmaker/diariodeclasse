
const CACHE_NAME = 'diario-lucimeiri-v1';

// Somente arquivos reais. O navegador cuidará do ícone embutido no index/manifest.
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Estratégia de cache individual para não travar se um arquivo falhar
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Erro ao cachear:', url));
        })
      );
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de carregamento: Tenta buscar na rede, se falhar, usa o cache (offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
