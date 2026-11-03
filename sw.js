const CACHE = "nightshift-a62442bf-nf";
const ASSETS = ["./","index.html","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k!==CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return; // fonts etc. go straight to network
  const isPage = r.mode === "navigate" || (r.headers.get("accept")||"").includes("text/html");
  if (isPage) {
    // network-first: always try the live page, fall back to cache offline
    e.respondWith(
      fetch(r).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)).catch(()=>{}); return resp; })
        .catch(() => caches.match("index.html").then(h => h || caches.match("./")))
    );
  } else {
    // static assets: cache-first
    e.respondWith(
      caches.match(r).then(hit => hit || fetch(r).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(r, copy)).catch(()=>{}); return resp; }))
    );
  }
});
