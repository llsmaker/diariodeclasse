const CACHE_NAME = 'dcl-v4';

// No GitHub Pages, liste os arquivos sem o './' se preferir, 
// mas mantenha o '/' inicial para a raiz do projeto.
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json'
];

// 1. Instalação: Cria o cache e força a ativação imediata
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Arquivos sendo armazenados no cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Força o SW a se tornar ativo imediatamente
});

// 2. Ativação: Limpa versões antigas do cache para evitar conflitos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('PWA: Limpando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Assume o controle da página imediatamente
});

// 3. Fetch: Intercepta as requisições (Essencial para ser instalável)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna o arquivo do cache OU busca na rede
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return networkResponse;
      });
    }).catch(() => {
      // Se estiver offline e o arquivo não estiver no cache, tenta entregar o index.html
      if (event.request.mode === 'navigate') {
        return caches.match('index.html');
      }
    })
  );
});
