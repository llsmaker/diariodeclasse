// Ícone DCL Bordô convertido para PNG Base64
const ICON_DATA = 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS...'; // (Insira aqui sua string de ícone PNG)

function getIconBlob(base64) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([new Uint8Array(byteNumbers)], { type: 'image/png' });
}

self.addEventListener('fetch', (event) => {
  // Entrega o ícone sempre que o Chrome/Windows solicitar
  if (event.request.url.includes('icon-192.png') || event.request.url.includes('icon-512.png')) {
    event.respondWith(
      new Response(getIconBlob(ICON_DATA), {
        headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000' }
      })
    );
  }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
