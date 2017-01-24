var dataCacheName = 'mediCloud-v1';
var cacheName = 'mediCloud-final-v1';
var filesToCache = [
  '/',
  '/index.html',
  './lib/bootstrap.css',
  './src/styles/index.css',
  './lib/angular.min.js',
  './lib/angular-ui-router.min.js',
  './lib/ui-bootstrap.min.js',
  './lib/angular-animate.min.js',
  './lib/angular-touch.min.js',
  './lib/ui-bootstrap-tpls.min.js',
  './lib/firebase.js',
  './lib/angularfire.min.js',
  './src/js/app.js',
  './src/js/component/mediCloudListApp.js',
  './src/js/component/mediCloudList.controller.js',
  './src/js/component/addStorage.controller.js',
  './src/js/component/add-storage.html',
  './src/js/component/medi-cloud-list.html',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = '.firebaseio.com';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
