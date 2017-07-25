// Variablen definieren
var width = 300;
var height;
var video, img_cache, photo; // vars für Zugriff auf HTML ELemente
var streaming = false; // zeigt ob stream zum ersten mal geöffnet wird oder nicht
var picArray = []; // Array zum speichern gemachter Fotos
//Startup Funktion zum bereitstellen des Kamera-Feeds und des Auslösers
$(document).on("pageshow", "#scanpage", function () {
	"use strict";
	// Variablen mit korrespondierenden HTML-Elemneten verknüpfen
	video = $("video");
	photo = $("#photo");
	img_cache = $("#img_cache");
	// Kamera-Feed abfragen
	navigator.mediaDevices.getUserMedia({
		video: {facingMode: "environment"},
		audio: false
	// falls Promise erfolgreich: Kamera-Feed abspielen	
	}).then(function (stream){
		video.attr('src', URL.createObjectURL(stream));
		video.get(0).play();
	})
	// Promise fehlgeschlagen: Fehlermeldung auszuspielen
	.catch(function (err) {
		alert("Kamera-Fehler!"+err);
	});
	// Falls streaming = false, also Feed wird zum ersten Mal geöffnet:
	// Größen konfigurieren + streaming = true damit keine Wiederholung bei nächstem Abruf
	video.get(0).addEventListener('canplay', function () {
		if (!streaming) {
			height = video.get(0).videoHeight / (video.get(0).videoWidth / width);
			img_cache.attr('width', width); //CHECK!!
			img_cache.attr('height', height); //CHECK!!
			streaming = true;
		}
	});	
});
// Funktion um Video-Frame in Canvas zu zeichnen und dann in png-Bild zu konvertieren
function takepicture() {
"use strict";
var context = img_cache.get(0).getContext('2d');
img_cache.get(0).width = width;
img_cache.get(0).height = height;
context.drawImage(video.get(0), 0, 0, width, height);
var data = img_cache.get(0).toDataURL('image/png');
photo.attr('src', data);
// Falls noch kein Eintrag im lStorage: Bild in Array speichern, Array in String umwandeln, String in lStorage speichern
// Falls Eintrag vorhanden: 'altes' Array abrufen, aktualisieren, wieder in lStorage schreiben
if(localStorage.getItem('picArray') === null) {
	picArray.push(data);
	localStorage.setItem('picArray', JSON.stringify(picArray));
	picArray = [];
}
else {
	picArray = JSON.parse(localStorage.getItem('picArray'));
	picArray.push(data);
	localStorage.setItem('picArray', JSON.stringify(picArray));
	picArray = [];
}
}