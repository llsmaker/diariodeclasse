// Nome do cache para controle do navegador
const CACHE_NAME = 'dcl-v1';

self.addEventListener('install', (event) => {
  // Força o SW a se tornar ativo imediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Faz o SW assumir o controle da página na hora
  event.waitUntil(clients.claim());
});

/**
 * O Chrome EXIGE este evento 'fetch' para mostrar o botão de instalação.
 * Ele tenta buscar os arquivos e, se falhar, o SW responde algo.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Se estiver offline, retorna uma resposta básica para não dar erro
      return new Response("App DCL Offline");
    })
  );
});
