//Service Worker (sw) für Offline-Funktionalität (Chrome, Firefox, Opera und Edge mit flag)
'use strict';
var appcache = 'typro'; //Cache-Name
// Liste mit Objekten, die vor aktiv werden des sw zwingend gechached sein müssen
var cacheRequired = [
    '/typro/',
    '/typro/#home',
    '/typro/#home?utm_source=homescreen',
    '/typro/jquery/jquery-1.11.1.min.js',
    '/typro/jquery/jquery.mobile-1.4.5.min.js',
    '/typro/jquery/jquery.mobile-1.4.5.min.map',
    '/typro/jquery/jquery.mobile.structure-1.4.5.min.css',
    '/typro/html/detail.html',
    '/typro/html/einstellungen.html',
    '/typro/html/katalog.html',
    '/typro/html/kontakt.html',
    '/typro/html/legal.html',
    '/typro/html/logIn.html',
    '/typro/html/scan.html',
    '/typro/html/verlauf.html',
    '/typro/css/themes/typro.css',
    '/typro/css/themes/typro.min.css',
    '/typro/css/themes/jquery.mobile.icons.min.css',
    '/typro/css/themes/images/ajax-loader.gif',
    '/typro/css/themes/images/icons-png/start.png',
    '/typro/css/themes/images/icons-png/camera-white.png',
    '/typro/css/themes/images/icons-png/katalog.png',
    '/typro/css/themes/images/icons-png/verlauf.png',
    '/typro/css/themes/images/icons-png/einstellungen.png',
    '/typro/css/index.css',
    '/typro/css/einstellungen.css',
    '/typro/css/icons.css',
    '/typro/css/katalog.css',
    '/typro/css/logIn.css',
    '/typro/css/panel.css',
    '/typro/css/scan.css',
    '/typro/css/splash.css',
    '/typro/css/verlauf.css',
    '/typro/css/detail.css',
    '/typro/js/einstellungen.js',
    '/typro/js/katalog.js',
    '/typro/js/storage.js',
    '/typro/js/panel.js',
    '/typro/js/scan.js',
    '/typro/js/slider.js',
    '/typro/js/splash.js',
    '/typro/js/verlauf.js',
    '/typro/img/TP_Logo.png',
    '/typro/img/placeholder.png',
    '/typro/img/darth.png',
    '/typro/img/admin.png',
    '/typro/img/test.png',
    '/typro/img/scan.png',
    '/typro/manifest.json'
];
// Liste mit Objekten, die auch noch nach Installation gecached werden können
var cacheOptional = [
    '/typro/xml/fonts.xml',
    '/typro/img/camBG.png',
    '/typro/img/upload.png',
    '/typro/img/gallery.png',
    '/typro/img/HS_logo.png',
    '/typro/img/Avenir1.png',
    '/typro/img/Avenir2.png',
    '/typro/img/Avenir3.png',
    '/typro/img/Calibri1.jpg',
    '/typro/img/Calibri2.jpg',
    '/typro/img/Calibri3.jpg',
    '/typro/img/ComicSans1.png',
    '/typro/img/Corbel1.jpg',
    '/typro/img/Corbel2.jpg',
    '/typro/img/Corbel3.jpg',
    '/typro/img/Didot1.jpg',
    '/typro/img/Didot2.jpg',
    '/typro/img/Didot3.jpg',
    '/typro/img/Franklin1.jpg',
    '/typro/img/Franklin2.jpg',
    '/typro/img/Franklin3.jpg',
    '/typro/img/Frutiger1.jpg',
    '/typro/img/Frutiger2.jpg',
    '/typro/img/Frutiger3.jpg',
    '/typro/img/Futura1.jpg',
    '/typro/img/Futura2.jpg',
    '/typro/img/Futura3.jpg',
    '/typro/img/Garamond1.jpg',
    '/typro/img/Garamond2.jpg',
    '/typro/img/Garamond3.jpg',
    '/typro/img/GillSans1.jpg',
    '/typro/img/GillSans2.jpg',
    '/typro/img/GillSans3.jpg',
    '/typro/img/Helvetica1.jpg',
    '/typro/img/Helvetica2.jpg',
    '/typro/img/Helvetica3.jpg',
    '/typro/img/Insignia1.jpg',
    '/typro/img/Josefin1.jpg',
    '/typro/img/Josefin2.jpg',
    '/typro/img/Josefin3.jpg',
    '/typro/img/Kabel1.jpg',
    '/typro/img/Kabel2.jpg',
    '/typro/img/Kabel3.jpg',
    '/typro/img/Lato1.jpg',
    '/typro/img/Lato2.jpg',
    '/typro/img/Lato3.jpg',
    '/typro/img/Roboto1.jpg',
    '/typro/img/Roboto2.jpg',
    '/typro/img/Roboto3.jpg',
    '/typro/img/TheSans1.jpg',
    '/typro/img/TheSans2.jpg',
    '/typro/img/TheSans3.jpg',
    '/typro/img/TimesNewRoman1.jpg',
    '/typro/img/TimesNewRoman2.jpg',
    '/typro/img/TimesNewRoman3.jpg',
    '/typro/img/Univers1.jpg',
    '/typro/img/Univers2.jpg',
    '/typro/img/Univers3.jpg',
    '/typro/img/Verdana1.jpg',
    '/typro/img/Verdana2.jpg',
    '/typro/img/Verdana3.jpg'
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