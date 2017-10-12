//Service Worker for offline functionality (Chrome, Firefox and Opera + Edge behind flag)
'use strict';
const appcache = 'typro';
// array with elements to cache
const fileList = [
    '/',
    '/#home',
    '/#home?utm_source=homescreen',
    '/manifest.json',
    '/jquery/jquery-1.11.1.min.js',
    '/jquery/jquery.mobile-1.4.5.min.js',
    '/jquery/jquery.mobile-1.4.5.min.map',
    '/jquery/jquery.mobile.structure-1.4.5.min.css',
    '/js/catalogue.js',
    '/js/camera.js',
    '/js/index.js',
    '/js/images.js',
    '/xml/fonts.xml',
    '/css/index.css',
    '/css/catalogue.css',
    '/css/camera.css',
    '/css/images.css',
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
    '/img/TP_Logo.png',
    '/img/HS_logo.png',
    '/img/user/placeholder.png',
    '/img/user/darth.png',
    '/img/user/admin.png',
    '/img/user/test.png',
    '/img/user/jonas.jpg',
    '/img/ui/scan.png',
    '/img/ui/camBG.png',
    '/img/ui/upload.png',
    '/img/ui/gallery.png',
    '/img/fonts/Avenir1.png',
    '/img/fonts/Avenir2.png',
    '/img/fonts/Avenir3.png',
    '/img/fonts/Calibri1.jpg',
    '/img/fonts/Calibri2.jpg',
    '/img/fonts/Calibri3.jpg',
    '/img/fonts/ComicSans1.png',
    '/img/fonts/Corbel1.jpg',
    '/img/fonts/Corbel2.jpg',
    '/img/fonts/Corbel3.jpg',
    '/img/fonts/Didot1.jpg',
    '/img/fonts/Didot2.jpg',
    '/img/fonts/Didot3.jpg',
    '/img/fonts/Franklin1.jpg',
    '/img/fonts/Franklin2.jpg',
    '/img/fonts/Franklin3.jpg',
    '/img/fonts/Frutiger1.jpg',
    '/img/fonts/Frutiger2.jpg',
    '/img/fonts/Frutiger3.jpg',
    '/img/fonts/Futura1.jpg',
    '/img/fonts/Futura2.jpg',
    '/img/fonts/Futura3.jpg',
    '/img/fonts/Garamond1.jpg',
    '/img/fonts/Garamond2.jpg',
    '/img/fonts/Garamond3.jpg',
    '/img/fonts/GillSans1.jpg',
    '/img/fonts/GillSans2.jpg',
    '/img/fonts/GillSans3.jpg',
    '/img/fonts/Helvetica1.jpg',
    '/img/fonts/Helvetica2.jpg',
    '/img/fonts/Helvetica3.jpg',
    '/img/fonts/Insignia1.jpg',
    '/img/fonts/Josefin1.jpg',
    '/img/fonts/Josefin2.jpg',
    '/img/fonts/Josefin3.jpg',
    '/img/fonts/Kabel1.jpg',
    '/img/fonts/Kabel2.jpg',
    '/img/fonts/Kabel3.jpg',
    '/img/fonts/Lato1.jpg',
    '/img/fonts/Lato2.jpg',
    '/img/fonts/Lato3.jpg',
    '/img/fonts/Roboto1.jpg',
    '/img/fonts/Roboto2.jpg',
    '/img/fonts/Roboto3.jpg',
    '/img/fonts/TheSans1.jpg',
    '/img/fonts/TheSans2.jpg',
    '/img/fonts/TheSans3.jpg',
    '/img/fonts/TimesNewRoman1.jpg',
    '/img/fonts/TimesNewRoman2.jpg',
    '/img/fonts/TimesNewRoman3.jpg',
    '/img/fonts/Univers1.jpg',
    '/img/fonts/Univers2.jpg',
    '/img/fonts/Univers3.jpg',
    '/img/fonts/Verdana1.jpg',
    '/img/fonts/Verdana2.jpg',
    '/img/fonts/Verdana3.jpg'
];
// open cache upon installing
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appcache)
            .then(cache => {
                cache.addAll(fileList);
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