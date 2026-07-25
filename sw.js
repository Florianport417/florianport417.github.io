const CACHE = "ancient-tree-v8";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll([
    "/",
    "/manifest.webmanifest",
    "/assets/hero-strength-v2.avif",
    "/assets/hero-agility-v2.avif",
    "/assets/hero-intelligence-v2.avif",
    "/assets/skill-atlas-v2.avif",
    "/assets/models/kenney/tower-square-build-f.glb",
    "/assets/models/kenney/tower-round-build-e.glb",
    "/assets/models/kenney/tower-round-build-f.glb",
    "/assets/models/kenney/tower-square-build-e.glb",
    "/assets/models/kenney/weapon-ballista.glb",
    "/assets/models/kenney/Textures/colormap.png",
    "/assets/models/quaternius/hero-strength.gltf",
    "/assets/models/quaternius/hero-agility.gltf",
    "/assets/models/quaternius/hero-intelligence.gltf",
    "/assets/models/quaternius-monsters/basic.gltf",
    "/assets/models/quaternius-monsters/swarm.gltf",
    "/assets/models/quaternius-monsters/runner.gltf",
    "/assets/models/quaternius-monsters/armored.gltf",
    "/assets/models/quaternius-monsters/regen.gltf",
    "/assets/models/quaternius-monsters/elite.gltf",
    "/assets/models/quaternius-monsters/boss.gltf",
    "/assets/models/kenney-nature/tree_detailed.glb",
    "/assets/models/kenney-nature/tree_pineRoundA.glb",
    "/assets/models/kenney-nature/tree_pineRoundC.glb",
    "/assets/models/kenney-nature/rock_smallA.glb",
    "/assets/models/kenney-nature/rock_largeB.glb",
    "/assets/models/kenney-nature/grass_leafsLarge.glb",
    "/assets/models/kenney-nature/mushroom_redGroup.glb",
  ])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone(); caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/"))));
});
