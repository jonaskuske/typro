// JS der Einstellungsseite+Unterseiten
"use strict";
// Löschen der Username und Passwort-Informationen aus dem Localstorage
$(document).on('click touchstart', '#l_ja', function(){
	localStorage.removeItem('username');
	localStorage.removeItem('passwort');
	logCheck();
});
// Kompletten Localstorage löschen
$(document).on('click touchstart', '#b_ja', function(){
	localStorage.clear();
	logCheck();
});

// Google Map auf Kontaktseite
$( document ).on( "pageinit", "#map-page", function() {
    var HS = new google.maps.LatLng(53.539973, 8.583219);  // Koordinaten HS Bremerhaven
    drawMap(HS);
    function drawMap(HS) {
        var myOptions = {
            zoom: 15,
            center: HS,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Marker
        var marker = new google.maps.Marker({
            position: HS,
            map: map,
            title: "Hallo!"
        });
        google.maps.event.addListenerOnce(map, 'idle', function() { //Sobald Map geladen ist: function
            google.maps.event.trigger(map, 'resize'); //Einmal Map resizen
            map.setCenter(HS); // Und center wieder auf Koordinaten HS setzen
        });

    }

});

