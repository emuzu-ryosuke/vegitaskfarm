const CACHE_NAME = 'vegitask-farm-cache-v1';
const urlsToCache = [
  './index.html',
  './app.js',
  './icon-512.png',
  './apple-touch-icon.png'
];

// インストール時にキャッシュを保存
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュから返す（オフライン対応）
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});