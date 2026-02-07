// Armazene apenas os dados brutos (remova o prefixo 'data:image/png;base64,')
const ICON_DATA = 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS...'; 

/**
 * Converte a string Base64 em um Blob binário.
 */
function getIconBlob(base64) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'image/png' });
}

// Escuta todas as requisições de rede
self.addEventListener('fetch', (event) => {
  // Verifica se o navegador está pedindo o ícone específico
  if (event.request.url.includes('icon-192.png')) {
    const blob = getIconBlob(ICON_DATA);
    
    // Intercepta e responde com o binário gerado na hora
    event.respondWith(
      new Response(blob, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000', // Cache agressivo para performance
        }
      })
    );
  }
});

// Força a ativação imediata do SW
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
