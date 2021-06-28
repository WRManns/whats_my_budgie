const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/db.js",
    "/style.css",
  ];

  const CACHE_NAME = budget-cache-v1;
  const DATA_CACHE_NAME = data-cache-v1;

  self.addEventListener("install", (evt) => {
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Your files were pre-cached successfully");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
    self.skipWaiting();
  });

  self.addEventListener("activate", (evt) => {
    evt.waitUntil(
      cache.keys().then((keyList) => {
        return Promise.all (
          keyList.map((key) => {
            if (key !==CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return chaces.delete(key);
            }
          })
        );
      })
    );
    self.ClientRectList.claim();
  })

  


