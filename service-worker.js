//Service Worker (sw) für Offline-Funktionalität (Chrome, Firefox, Opera + Edge mit flag)
'use strict';
var appcache = 'typro'; //Cache-Name
// Liste mit Objekten, die vor aktiv werden des sw zwingend gechached sein müssen
var cacheRequired = [
    '/typro-nightly/',
    '/typro-nightly/#home',
    '/typro-nightly/#home?utm_source=homescreen',
    '/typro-nightly/jquery/jquery-1.11.1.min.js',
    '/typro-nightly/jquery/jquery.mobile-1.4.5.min.js',
    '/typro-nightly/jquery/jquery.mobile-1.4.5.min.map',
    '/typro-nightly/jquery/jquery.mobile.structure-1.4.5.min.css',
    '/typro-nightly/html/detail.html',
    '/typro-nightly/html/einstellungen.html',
    '/typro-nightly/html/katalog.html',
    '/typro-nightly/html/kontakt.html',
    '/typro-nightly/html/legal.html',
    '/typro-nightly/html/logIn.html',
    '/typro-nightly/html/scan.html',
    '/typro-nightly/html/verlauf.html',
    '/typro-nightly/css/themes/typro.css',
    '/typro-nightly/css/themes/typro.min.css',
    '/typro-nightly/css/themes/jquery.mobile.icons.min.css',
    '/typro-nightly/css/themes/images/ajax-loader.gif',
    '/typro-nightly/css/themes/images/icons-png/start.png',
    '/typro-nightly/css/themes/images/icons-png/camera-white.png',
    '/typro-nightly/css/themes/images/icons-png/katalog.png',
    '/typro-nightly/css/themes/images/icons-png/verlauf.png',
    '/typro-nightly/css/themes/images/icons-png/einstellungen.png',
    '/typro-nightly/css/index.css',
    '/typro-nightly/css/einstellungen.css',
    '/typro-nightly/css/icons.css',
    '/typro-nightly/css/katalog.css',
    '/typro-nightly/css/logIn.css',
    '/typro-nightly/css/panel.css',
    '/typro-nightly/css/scan.css',
    '/typro-nightly/css/splash.css',
    '/typro-nightly/css/verlauf.css',
    '/typro-nightly/css/detail.css',
    '/typro-nightly/js/einstellungen.js',
    '/typro-nightly/js/katalog.js',
    '/typro-nightly/js/storage.js',
    '/typro-nightly/js/panel.js',
    '/typro-nightly/js/scan.js',
    '/typro-nightly/js/slider.js',
    '/typro-nightly/js/splash.js',
    '/typro-nightly/js/verlauf.js',
    '/typro-nightly/img/TP_Logo.png',
    '/typro-nightly/img/placeholder.png',
    '/typro-nightly/img/darth.png',
    '/typro-nightly/img/admin.png',
    '/typro-nightly/img/test.png',
    '/typro-nightly/img/scan.png',
    '/typro-nightly/manifest.json'
];
// Liste mit Objekten, die später gecached werden, falls möglich
var cacheOptional = [
    '/typro-nightly/xml/fonts.xml',
    '/typro-nightly/img/camBG.png',
    '/typro-nightly/img/upload.png',
    '/typro-nightly/img/gallery.png',
    '/typro-nightly/img/HS_logo.png',
    '/typro-nightly/img/Avenir1.png',
    '/typro-nightly/img/Avenir2.png',
    '/typro-nightly/img/Avenir3.png',
    '/typro-nightly/img/Calibri1.jpg',
    '/typro-nightly/img/Calibri2.jpg',
    '/typro-nightly/img/Calibri3.jpg',
    '/typro-nightly/img/ComicSans1.png',
    '/typro-nightly/img/Corbel1.jpg',
    '/typro-nightly/img/Corbel2.jpg',
    '/typro-nightly/img/Corbel3.jpg',
    '/typro-nightly/img/Didot1.jpg',
    '/typro-nightly/img/Didot2.jpg',
    '/typro-nightly/img/Didot3.jpg',
    '/typro-nightly/img/Franklin1.jpg',
    '/typro-nightly/img/Franklin2.jpg',
    '/typro-nightly/img/Franklin3.jpg',
    '/typro-nightly/img/Frutiger1.jpg',
    '/typro-nightly/img/Frutiger2.jpg',
    '/typro-nightly/img/Frutiger3.jpg',
    '/typro-nightly/img/Futura1.jpg',
    '/typro-nightly/img/Futura2.jpg',
    '/typro-nightly/img/Futura3.jpg',
    '/typro-nightly/img/Garamond1.jpg',
    '/typro-nightly/img/Garamond2.jpg',
    '/typro-nightly/img/Garamond3.jpg',
    '/typro-nightly/img/GillSans1.jpg',
    '/typro-nightly/img/GillSans2.jpg',
    '/typro-nightly/img/GillSans3.jpg',
    '/typro-nightly/img/Helvetica1.jpg',
    '/typro-nightly/img/Helvetica2.jpg',
    '/typro-nightly/img/Helvetica3.jpg',
    '/typro-nightly/img/Insignia1.jpg',
    '/typro-nightly/img/Josefin1.jpg',
    '/typro-nightly/img/Josefin2.jpg',
    '/typro-nightly/img/Josefin3.jpg',
    '/typro-nightly/img/Kabel1.jpg',
    '/typro-nightly/img/Kabel2.jpg',
    '/typro-nightly/img/Kabel3.jpg',
    '/typro-nightly/img/Lato1.jpg',
    '/typro-nightly/img/Lato2.jpg',
    '/typro-nightly/img/Lato3.jpg',
    '/typro-nightly/img/Roboto1.jpg',
    '/typro-nightly/img/Roboto2.jpg',
    '/typro-nightly/img/Roboto3.jpg',
    '/typro-nightly/img/TheSans1.jpg',
    '/typro-nightly/img/TheSans2.jpg',
    '/typro-nightly/img/TheSans3.jpg',
    '/typro-nightly/img/TimesNewRoman1.jpg',
    '/typro-nightly/img/TimesNewRoman2.jpg',
    '/typro-nightly/img/TimesNewRoman3.jpg',
    '/typro-nightly/img/Univers1.jpg',
    '/typro-nightly/img/Univers2.jpg',
    '/typro-nightly/img/Univers3.jpg',
    '/typro-nightly/img/Verdana1.jpg',
    '/typro-nightly/img/Verdana2.jpg',
    '/typro-nightly/img/Verdana3.jpg'
];
// Bei Installieren des sw warten bis Cache angelegt(geöffnet) und cacheRequired returned, sodass das .then promise aufgelöst wird
// Falls cacheRequired nicht vollständig gechached wurde, schlägt das promise fehl, sw wird dann NICHT installiert
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(appcache)
        .then(function(cache) {
            cache.addAll(cacheOptional);
            return cache.addAll(cacheRequired);
        })
    );
});
// Bei Netzwerkanfrage der Seite (fetch): Anfrage beantworten
self.addEventListener('fetch', function(event) {
    event.respondWith(respond(event));
});
// Cache öffnen, falls passendes Objekt im Cache vorhanden damit die Anfrage beantworten und Cache aktualisieren,
// anderenfalls auf Netzwerk zurückgreifen
function respond(event) {
    return caches.open(appcache).then(function(cache) {
        return cache.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        });
    });
}