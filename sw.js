// No seu Service Worker
const iconBase64 = 'data:image/png;base64,iVBORw0...'; // Seu código aqui

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('icon-192.png')) {
    event.respondWith(
      fetch(iconBase64).then(res => res.blob()).then(blob => 
        new Response(blob, { headers: { 'Content-Type': 'image/png' } })
      )
    );
  }
});
