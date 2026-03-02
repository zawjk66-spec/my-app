
// عند تثبيت السيرفس وركر الجديد، لا تنتظر إغلاق التبويبات القديمة
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

// عند التنشيط، سيطر على جميع الصفحات المفتوحة فوراً
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});






self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
