const staticCacheName = 's-app-v1'

const assetUrls = [
    'index.html',
    'str1.html',
    'str2.html',
    'app.js',
    'style.css',
    'str1.css',
    'str2.css'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

self.addEventListener('activate', event => {
    console.log('[SW]: activate')
})

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request.url)
    event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}