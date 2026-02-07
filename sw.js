// Imagem PNG bordô embutida (Base64 mais longo para o Chrome aceitar)
const ICON_DATA = 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlS4LpAAAAG1BMVEUAAABKBBpKBBoYBBofBBoYBBoeBBoYBBofBBoY7NImAAAACHRSTlMAECBAQEBAQH6S0YIAAABRSURBVHic7cEBDQAAAMKg909tDwcUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4NcAK4AAAe7U6nkAAAAASUVORK5CYII=';

function getIconBlob(base64) {
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: 'image/png' });
}

self.addEventListener('fetch', (event) => {
  // Se o navegador pedir o ícone do manifest, o SW entrega a imagem embutida
  if (event.request.url.includes('icon-192.png')) {
    event.respondWith(
      new Response(getIconBlob(ICON_DATA), {
        headers: { 'Content-Type': 'image/png' }
      })
    );
  } else {
    // Mantém o app funcionando online normalmente
    event.respondWith(fetch(event.request).catch(() => new Response("offline")));
  }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
