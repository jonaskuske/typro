"use strict";
// Variablen definieren
var width, height; // vars für konfiguration der canvas und foto-größe
var video, img_cache, photo; // vars für Zugriff auf HTML ELemente
var streaming = false; // zeigt ob stream zum ersten mal geöffnet wird oder nicht
var picArray = []; // Array zum speichern gemachter Fotos
var camStream; //(globaler) Zugriff auf Kamera-Feed
//Startup Funktion zum bereitstellen des Kamera-Feeds und des Auslösers
function startup() {
	// Variablen mit korrespondierenden HTML-Elementen verknüpfen
	video = $("video");
	photo = $("#photo");
	img_cache = $("#img_cache");
	// Kamera-Feed abfragen
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: "environment"
			},
			audio: false
				// falls Promise erfolgreich: Kamera-Feed abspielen	
		}).then(function (stream) {
			video.get(0).srcObject = stream;
			video.attr('autoplay', '');
			video.attr('muted', '');
			video.attr('playsinline', '');
			camStream = stream;
		})
		// Promise fehlgeschlagen: Fehlermeldung auszuspielen
		.catch(function (err) {
			alert("Kamera-Fehler!" + err);
		});
	// Falls streaming = false, also Feed wird zum ersten Mal geöffnet:
	// Canvasgröße an Video angleichen + streaming = true damit keine Wiederholung bei nächstem Abruf
	video.get(0).addEventListener('canplay', function () {
		if (!streaming) {
			width = video.get(0).videoWidth;
			height = video.get(0).videoHeight;
			img_cache.attr('width', width);
			img_cache.attr('height', height);
			streaming = true;
		}
	});
}
$(document).on("pageshow", "#scanpage", startup);
// Funktion um Video-Frame in Canvas zu zeichnen und dann in png-Bild zu konvertieren
function takepicture() {
	var context = img_cache.get(0).getContext('2d');
	img_cache.get(0).width = width;
	img_cache.get(0).height = height;
	context.drawImage(video.get(0), 0, 0, width, height);
	var data = img_cache.get(0).toDataURL('image/png');
	photo.attr('style', "background-image: url(" + data + ")");
	// Falls noch kein Eintrag im lStorage: Bild in Array speichern, Array in String umwandeln, String in lStorage speichern
	// Falls Eintrag vorhanden: 'altes' Array abrufen, aktualisieren, wieder in lStorage schreiben
	if (localStorage.getItem('picArray') === null) {
		picArray.push(data);
		localStorage.setItem('picArray', JSON.stringify(picArray));
		picArray = [];
	} else {
		picArray = JSON.parse(localStorage.getItem('picArray'));
		picArray.push(data);
		localStorage.setItem('picArray', JSON.stringify(picArray));
		picArray = [];
	}
}
// Bei Verlassen der Seite Kamera-Zugriff beenden, bei Wechsel zurück Kamera wieder bereitstellen
function camRelease() {
	camStream.getVideoTracks()[0].stop();
}
$(document).on("pagehide", "#scanpage", camRelease);
$(document).on('visibilitychange', function () {
	if (document.visibilityState === 'hidden') {
		camRelease();
	} else {
		startup();
	}
});