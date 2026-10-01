const CACHE_NAME = "moonlight-digital-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.png"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();

});


self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(cacheNames => {

      return Promise.all(

        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))

      );

    })

  );

  self.clients.claim();

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);

      })

  );

});
