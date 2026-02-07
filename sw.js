const CACHE_NAME = 'dcl-v5';

// No GitHub Pages, não use a barra inicial '/' nos nomes dos arquivos
// O './' ou apenas o nome do arquivo garante que ele ache na pasta do projeto
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json'
];

// 1. Instalação: Salva arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Cache aberto e arquivos sendo armazenados');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Força o SW a assumir o controle imediatamente sem esperar o refresh
  self.skipWaiting();
});

// 2. Ativação: Limpa versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. Fetch: Responde do cache ou busca na rede
// Essencial para o selo de "Instalável" do Chrome
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se encontrar no cache, retorna. Se não, busca na rede.
      return response || fetch(event.request).catch(() => {
        // Se a rede falhar e for uma navegação, retorna a página inicial
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});
