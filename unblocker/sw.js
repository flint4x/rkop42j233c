const ADBLOCK_PATTERNS = [
    "googlesyndication.com", "googleadservices.com", "doubleclick.net", "adnxs.com",
    "amazon-adsystem.com", "rubiconproject.com", "pubmatic.com", "criteo.com",
    "openx.net", "taboola.com", "outbrain.com", "moatads.com", "casalemedia.com",
    "adsafeprotected.com", "chartbeat.com", "scorecardresearch.com", "quantserve.com",
    "krxd.net", "demdex.net", "advertising.com", "adtechus.com", "unityads.unity3d.com",
    "facebook.com/tr", "facebook.com/ads", "graph.facebook.com/pixel", "ads-api.twitter.com",
    "analytics.twitter.com", "youtube.com/api/stats/ads", "youtube.com/pagead", "youtube.com/get_midroll",
];

function isAdBlocked(url) {
    const urlStr = url.toString();
    return ADBLOCK_PATTERNS.some(p => urlStr.includes(p));
}

const swPath = self.location.pathname;
const basePath = swPath.substring(0, swPath.lastIndexOf('/') + 1);
self.basePath = basePath;

self.$scramjet = {
    files: {
        wasm: "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.wasm.wasm",
        sync: "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.sync.js",
    }
};

importScripts("https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.all.js");
importScripts("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux/dist/index.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker({
    prefix: basePath + "scramjet/"
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

const swConfig = {
    wispurl: "wss://i-ready.math.bostoncareercounselor.com/wisp/",
    servers: [],
    autoswitch: true
};

importScripts("https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux/dist/sw.js");

self.addEventListener('message', (event) => {
    if (event.data.type === 'config') {
        if (event.data.wispurl) swConfig.wispurl = event.data.wispurl;
        if (event.data.servers) swConfig.servers = event.data.servers;
        if (typeof event.data.autoswitch === 'boolean') swConfig.autoswitch = event.data.autoswitch;
    }
});

async function pingWisp(url) {
    const start = Date.now();
    try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1500);
        await fetch(url.replace('wss://', 'https://').replace('/wisp/', '/health') || url, { method: 'HEAD', signal: controller.signal, mode: 'no-cors' });
        clearTimeout(tid);
        return Date.now() - start;
    } catch {
        return Infinity;
    }
}

async function findBestWisp() {
    if (!swConfig.servers.length) return swConfig.wispurl;
    const results = await Promise.all(swConfig.servers.map(async s => ({ url: s.url, name: s.name, ping: await pingWisp(s.url) })));
    const working = results.filter(r => r.ping !== Infinity).sort((a, b) => a.ping - b.ping);
    return working.length ? working[0] : { url: swConfig.wispurl, name: 'Default' };
}

let checkInProgress = false;
async function proactiveCheck() {
    if (!swConfig.servers?.length) return;
    checkInProgress = true;
    const best = await findBestWisp();
    if (best.url !== swConfig.wispurl) {
        swConfig.wispurl = best.url;
        const clients = await self.clients.matchAll();
        clients.forEach(c => c.postMessage({ type: 'wispChanged', url: best.url, name: best.name }));
    }
    checkInProgress = false;
}

self.addEventListener("fetch", event => {
    if (isAdBlocked(event.request.url)) {
        event.respondWith(new Response(null, { status: 204 }));
        return;
    }
    event.respondWith((async () => {
        await scramjet.loadConfig();
        if (scramjet.route(event)) return scramjet.fetch(event);
        return fetch(event.request);
    })());
});