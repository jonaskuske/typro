//Service Worker (sw) für Offline-Funktionalität (Chrome, Firefox, Opera und Edge mit flag)
'use strict';
const appcache = 'typro'; //Cache-Name
// Liste mit Objekten, die vor aktiv werden des sw zwingend gechached sein müssen
const cacheRequired = [
    '/',
    '/#home',
    '/#home?utm_source=homescreen',
    '/jquery/jquery-1.11.1.min.js',
    '/jquery/jquery.mobile-1.4.5.min.js',
    '/jquery/jquery.mobile-1.4.5.min.map',
    '/jquery/jquery.mobile.structure-1.4.5.min.css',
    '/html/detail.html',
    '/html/einstellungen.html',
    '/html/katalog.html',
    '/html/kontakt.html',
    '/html/legal.html',
    '/html/logIn.html',
    '/html/scan.html',
    '/html/verlauf.html',
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
    '/css/einstellungen.css',
    '/css/icons.css',
    '/css/katalog.css',
    '/css/logIn.css',
    '/css/panel.css',
    '/css/scan.css',
    '/css/splash.css',
    '/css/verlauf.css',
    '/css/detail.css',
    '/js/einstellungen.js',
    '/js/katalog.js',
    '/js/storage.js',
    '/js/panel.js',
    '/js/scan.js',
    '/js/slider.js',
    '/js/splash.js',
    '/js/verlauf.js',
    '/img/TP_Logo.png',
    '/img/placeholder.png',
    '/img/darth.png',
    '/img/admin.png',
    '/img/test.png',
    '/img/scan.png',
    '/manifest.json'
];
// Liste mit Objekten, die auch noch nach Installation gecached werden können
const cacheOptional = [
    '/xml/fonts.xml',
    '/img/camBG.png',
    '/img/upload.png',
    '/img/gallery.png',
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
// Bei Installieren des sw warten bis Cache angelegt(geöffnet) und cacheRequired returned, sodass das .then promise aufgelöst wird
// Falls cacheRequired nicht vollständig gechached wurde, schlägt das promise fehl, sw wird dann NICHT installiert
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(appcache)
            .then(function (cache) {
                cache.addAll(cacheOptional);
                return cache.addAll(cacheRequired);
            })
    );
});
// Bei Netzwerkanfrage der Seite (fetch): Anfrage beantworten
self.addEventListener('fetch', function (event) {
    event.respondWith(respond(event));
});
// Cache öffnen, falls passendes Objekt im Cache vorhanden damit die Anfrage beantworten und Cache aktualisieren (-> bei nächstem Pageload/Fetch wird neue Version ausgespielt),
// anderenfalls auf Netzwerk zurückgreifen
function respond(event) {
    return caches.open(appcache).then(function (cache) {
        return cache.match(event.request).then(function (response) {
            if (response) {
                if (navigator.onLine) {
                    fetch(event.request)
                        .then(function (netresponse) {
                            caches.open(appcache)
                                .then(function (cache) {
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