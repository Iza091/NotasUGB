self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('calculadora-notas-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/estilos.css',
                '/js/calcularNotas.js',
                '/img/EscudoUGBBlanco.jpg',
                '/img/icon-192.png',
                '/img/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
