const CACHE = "nightshift-a62442bf17";
const ASSETS = ["./","index.html","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k!==CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return; // let fonts etc. hit network, fail gracefully
  e.respondWith(
    caches.match(r).then(hit => hit || fetch(r).then(resp => {
      const copy = resp.clone(); caches.open(CACHE).then(c => c.put(r, copy)).catch(()=>{}); return resp;
    }).catch(() => caches.match("index.html")))
  );
});
