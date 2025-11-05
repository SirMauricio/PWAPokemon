self.addEventListener("install", (event) => {
console.log("Service Worker instalado");
});

self.addEventListener("activate", (event) => {
console.log("Service Worker activo");
});

self.addEventListener("push", (event) => {
const data = event.data?.json() || {};
self.registration.showNotification(data.title || "Notificación Pokémon", {
    body: data.body || "Tienes un nuevo Pokémon favorito ❤️",
    icon: data.icon || "/pokeball.png",
});
});

