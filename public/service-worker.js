const CACHE_NAME = "pokedex-cache-v1";
const urlsToCache = [
"/",
"/index.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png",
];

// Instalación y cacheo inicial
self.addEventListener("install", (event) => {
event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
);
console.log("Service Worker instalado y caché lista");
});

// Activación
self.addEventListener("activate", (event) => {
event.waitUntil(
    caches.keys().then((keys) =>
    Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
);
console.log("Service Worker activado");
});

// Interceptar solicitudes
self.addEventListener("fetch", (event) => {
event.respondWith(
    caches.match(event.request).then(
    (response) =>
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback offline
        )
    )
);
});
