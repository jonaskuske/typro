/* global typroDB, google, logout */
// JS der Einstellungsseite+Unterseiten
'use strict';
// Löschen der Username und Passwort-Informationen aus dem Localstorage
$(document).on('click touchstart', '#l_ja', () => {
    logout();
});
// Kompletten Speicher löschen
$(document).on('click touchstart', '#b_ja', () => {
    var transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').clear();
    transaction.oncomplete = () => {
        logout();
    };
});
// Google Map auf Kontaktseite
$(document).on('pageinit', '#map-page', () => {
    var HS = new google.maps.LatLng(53.539973, 8.583219); // Koordinaten HS Bremerhaven
    drawMap(HS);

    function drawMap(HS) {
        var myOptions = {
            zoom: 15,
            center: HS,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
        // Marker
        var marker = new google.maps.Marker({ // eslint-disable-line no-unused-vars
            position: HS,
            map: map,
            title: 'Hallo!'
        });
        google.maps.event.addListenerOnce(map, 'idle', () => { //Sobald Map geladen ist: function
            google.maps.event.trigger(map, 'resize'); //Einmal Map resizen
            map.setCenter(HS); // Und center wieder auf Koordinaten HS setzen
        });

    }

});
