var dataCacheName = 'mediCloud-v1';
var cacheName = 'mediCloud-final-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/mediCloud/lib/bootstrap.css',
  '/mediCloud/src/styles/index.css',
  '/mediCloud/lib/angular.min.js',
  '/mediCloud/lib/angular-ui-router.min.js',
  '/mediCloud/lib/ui-bootstrap.min.js',
  '/mediCloud/lib/angular-animate.min.js',
  '/mediCloud/lib/angular-touch.min.js',
  '/mediCloud/lib/ui-bootstrap-tpls.min.js',
  '/mediCloud/lib/firebase.js',
  '/mediCloud/lib/angularfire.min.js',
  '/mediCloud/src/js/app.js',
  '/mediCloud/src/js/component/mediCloudListApp.js',
  '/mediCloud/src/js/component/mediCloudList.controller.js',
  '/mediCloud/src/js/component/addStorage.controller.js',
  '/mediCloud/src/js/component/add-storage.html',
  '/mediCloud/src/js/component/medi-cloud-list.html',
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
