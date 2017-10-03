//Service Worker for offline functionality (Chrome, Firefox and Opera + Edge behind flag)
'use strict';
const appcache = 'typro';
// array with elements to cache
const cacheRequired = [
    '/',
    '/#home',
    '/#home?utm_source=homescreen',
    '/manifest.json',
    '/jquery/jquery-1.11.1.min.js',
    '/jquery/jquery.mobile-1.4.5.min.js',
    '/jquery/jquery.mobile-1.4.5.min.map',
    '/jquery/jquery.mobile.structure-1.4.5.min.css',
    '/css/themes/typro.css',
    '/css/themes/typro.min.css',
    '/css/themes/jquery.mobile.icons.min.css',
    '/css/themes/images/ajax-loader.gif',
    '/css/themes/images/icons-png/start.png',
    '/css/themes/images/icons-png/camera-white.png',
    '/css/themes/images/icons-png/katalog.png',
    '/css/themes/images/icons-png/verlauf.png',
    '/css/themes/images/icons-png/einstellungen.png',
    '/css/themes/images/icons-png/carat-l-black.png',
    '/css/index.css',
    '/css/catalogue.css',
    '/css/camera.css',
    '/css/images.css',
    '/js/catalogue.js',
    '/js/camera.js',
    '/js/index.js',
    '/js/images.js',
    '/img/TP_Logo.png',
    '/img/placeholder.png',
    '/img/darth.png',
    '/img/admin.png',
    '/img/test.png',
    '/img/scan.png'
];
const cacheOptional = [
    '/xml/fonts.xml',
    '/img/camBG.png',
    '/img/upload.png',
    '/img/gallery.png',
    '/img/jonas.jpg',
    '/img/HS_logo.png',
    '/img/Avenir1.png',
    '/img/Avenir2.png',
    '/img/Avenir3.png',
    '/img/Calibri1.jpg',
    '/img/Calibri2.jpg',
    '/img/Calibri3.jpg',
    '/img/ComicSans1.png',
    '/img/Corbel1.jpg',
    '/img/Corbel2.jpg',
    '/img/Corbel3.jpg',
    '/img/Didot1.jpg',
    '/img/Didot2.jpg',
    '/img/Didot3.jpg',
    '/img/Franklin1.jpg',
    '/img/Franklin2.jpg',
    '/img/Franklin3.jpg',
    '/img/Frutiger1.jpg',
    '/img/Frutiger2.jpg',
    '/img/Frutiger3.jpg',
    '/img/Futura1.jpg',
    '/img/Futura2.jpg',
    '/img/Futura3.jpg',
    '/img/Garamond1.jpg',
    '/img/Garamond2.jpg',
    '/img/Garamond3.jpg',
    '/img/GillSans1.jpg',
    '/img/GillSans2.jpg',
    '/img/GillSans3.jpg',
    '/img/Helvetica1.jpg',
    '/img/Helvetica2.jpg',
    '/img/Helvetica3.jpg',
    '/img/Insignia1.jpg',
    '/img/Josefin1.jpg',
    '/img/Josefin2.jpg',
    '/img/Josefin3.jpg',
    '/img/Kabel1.jpg',
    '/img/Kabel2.jpg',
    '/img/Kabel3.jpg',
    '/img/Lato1.jpg',
    '/img/Lato2.jpg',
    '/img/Lato3.jpg',
    '/img/Roboto1.jpg',
    '/img/Roboto2.jpg',
    '/img/Roboto3.jpg',
    '/img/TheSans1.jpg',
    '/img/TheSans2.jpg',
    '/img/TheSans3.jpg',
    '/img/TimesNewRoman1.jpg',
    '/img/TimesNewRoman2.jpg',
    '/img/TimesNewRoman3.jpg',
    '/img/Univers1.jpg',
    '/img/Univers2.jpg',
    '/img/Univers3.jpg',
    '/img/Verdana1.jpg',
    '/img/Verdana2.jpg',
    '/img/Verdana3.jpg'
];
// open cache upon installing
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appcache)
            .then(cache => {
                cache.addAll(cacheOptional);
                return cache.addAll(cacheRequired);
            })
    );
});
// handle fetch requests with respond()
self.addEventListener('fetch', event => {
    event.respondWith(respond(event));
});
// open cache, respond with requested item if available then update it, otherwise fetch it from the server
function respond(event) {
    return caches.open(appcache).then(cache => {
        return cache.match(event.request).then(response => {
            if (response) {
                if (navigator.onLine) {
                    fetch(event.request)
                        .then(netresponse => {
                            caches.open(appcache)
                                .then(cache => {
                                    cache.put(event.request, netresponse);
                                });
                        });
                }
                return response;
            } else {
                return fetch(event.request);
            }
        });
    });
}