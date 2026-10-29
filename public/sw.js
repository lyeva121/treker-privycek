// Service worker: офлайн-режим для PWA.
// Меняйте VERSION при каждом релизе, чтобы старый кэш очистился.
const VERSION = 'v1';
const CACHE = `habit-tracker-21-${VERSION}`;
const BASE = new URL('./', self.location).pathname;
const PRECACHE = ['', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'].map(p => BASE + p);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('habit-tracker-21-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Страницы: сначала сеть (свежая версия), при отсутствии сети — кэш.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone(); // клонировать нужно сразу, до отдачи ответа странице
          if (res.ok) caches.open(CACHE).then(c => c.put(BASE + 'index.html', copy));
          return res;
        })
        .catch(() => caches.match(BASE + 'index.html'))
    );
    return;
  }

  // Остальное (JS, CSS, иконки): кэш, при промахе — сеть и сохранение.
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      if (res.ok) caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }))
  );
});
