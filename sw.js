// Seu ícone DCL embutido em formato XML/SVG
const MEU_ICONE_SVG = `<svg xmlns="http://www.w3.org" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#4a041a"/><text x="50" y="65" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">DCL</text></svg>`;

self.addEventListener('fetch', (event) => {
  // Quando o PC pedir o icon.svg do manifest, o SW entrega o texto acima
  if (event.request.url.includes('icon.svg')) {
    event.respondWith(
      new Response(MEU_ICONE_SVG, { 
        headers: { 'Content-Type': 'image/svg+xml' } 
      })
    );
  }
});

// Força a ativação imediata
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
