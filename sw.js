// Ícone embutido: SVG do Diário de Classe (Bordô com letras brancas)
const SVG_ICON = `<svg xmlns="http://www.w3.org" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#4a041a"/><text x="50" y="65" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">DCL</text></svg>`;

self.addEventListener('fetch', (event) => {
  // Intercepta o pedido do ícone definido no manifest.json
  if (event.request.url.includes('icon.svg')) {
    event.respondWith(
      new Response(SVG_ICON, {
        headers: { 
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000' 
        }
      })
    );
  }
});

// Força o Service Worker a assumir o controle da página imediatamente
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
