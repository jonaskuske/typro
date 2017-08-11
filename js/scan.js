"use strict";
var video, feed, photo; // vars für Zugriff auf HTML ELemente
var vidSizeDefined = false; // zeigt ob stream zum ersten mal geöffnet wird oder nicht
var picArray = []; // Array zum speichern gemachter Fotos
var camStream = null; //(globaler) Zugriff auf Kamera-Feed
var vidW, vidH, feedW, feedH, renderW, renderH, offsetX = 0, offsetY = 0; // zur Berechnung der Feed-Größe
var feedCtx; //Canvas context für Kamera-Feed
var newImg; //Zwischenspeicher für neues Bild

//Erst Seitengröße anpassen, nach geladener Seite Hauptfunktion starten
$(document).on("pagebeforeshow", "#scanpage", function() {
	scaleContent();
	$(window).on("resize", scaleContent);
});
$(document).on("pageshow", "#scanpage", function(){
	startup();
});
//Zugriff auf Kamera steuern
$(document).on("pagehide", "#scanpage", function () {
	camRelease();
});
$(document).on('visibilitychange', function () {
		if (document.visibilityState === 'hidden') {
			camRelease();
		} else if ($.mobile.activePage[0].id === "scanpage"){ 
			startup();
		}
});
//HAUPTFUNKTION
//Startup Funktion zum Bereitstellen des Kamera-Feeds und der Import-Funktion
function startup() {
	// Variablen mit korrespondierenden HTML-Elementen verknüpfen
	video = $("video");
	photo = $("#photo");
	feed = $("#feed");
	feedCtx = feed.get(0).getContext('2d');
	//Foto-Import bereitstellen
	$("#uploadA").on("click", function(e){
		e.preventDefault;
		$("#imgInput:hidden").trigger('click');
	});
	// Kamera-Feed abfragen
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.mediaDevices.getUserMedia({
			video: {facingMode: "environment"},
			audio: false
		// falls Promise erfolgreich: Kamera-Stream mit Feed verknüpfen	
		}).then(function (stream) {
			camStream = stream;
			video.get(0).srcObject = camStream;
			video.get(0).play();
		})
		// Promise fehlgeschlagen: Fehlermeldung ausspielen
		.catch(function (err) {
			$("#errorText").html("Kein Zugriff auf Kamera m&ouml;glich.<br>"+err);
		});
	// Falls vidSizeDefined = false -> Feed wird zum ersten Mal gestartet: (HTML-)Videogröße anpassen
	video.on('loadedmetadata', function () {
		if (!vidSizeDefined) {
			vidW = video.get(0).videoWidth;
        	vidH = video.get(0).videoHeight;
        	video.attr('width', vidW);
			video.attr('height', vidH);
			vidSizeDefined = true;
		}
	//Video bereit: abspielen und responsive machen
	}).on('canplay', function(){
		adjustFeedScale();
		refreshFrame();
		$(window).on("resize", adjustFeedScale);
	});
}
//ENDE HAUPTFUNKTION
// Größe des Content-Bereichs anpassen
function scaleContent() {
	var viewportH = $(window).height();
	$("#content_scan").css("height", (viewportH-headerH+1));
}
// Frame in Canvas zu png konvertieren, anzeigen und speichern
function takepicture() {
	newImg = feed.get(0).toDataURL('image/png');
	photo.css("background-image", "url(" + newImg + ")");
	photo.css("background-size", "cover");
	saveImg();
}
//Kamera-Feed in Content-Bereich einpassen
function adjustFeedScale() {
	feedW = parseInt(feed.css("width"), 10);
	feedH = parseInt(feed.css("height"), 10);
	feed.attr('width', feedW);
    feed.attr('height', feedH);
    if((vidW/vidH)>(feedW/feedH)) {
        //Video breiter als Canvas
        renderW = feedW*(vidH/feedH);
        renderH = vidH;
        offsetY = 0;
        offsetX = (vidW-renderW)/2;
    }
    else if((vidW/vidH)<(feedW/feedH)) {
        //Video schmaler als Canvas
        renderW = vidW;
    	renderH = feedH*(vidW/feedW);
        offsetX = 0;
        offsetY = (vidH-renderH)/2;
    }
    else {
        //Video und Canvas: Proportionen gleich
        renderW = vidW;
        renderH = vidH;
	}
}
//Kamera-Feed abspielen
 function refreshFrame() {
	 if (camStream !== null) {
    	feedCtx.drawImage(video.get(0), offsetX, offsetY, renderW, renderH, 0, 0, feedW, feedH);
		setTimeout(refreshFrame, 1000 / 30);
	 }
}
//Kamera-Zugriff beenden
function camRelease() {
	if(camStream !== null){
		camStream.getVideoTracks().forEach(function(track){
			track.stop();
		});
		camStream = null;
	}
}
//Bild in lStorage speichern:
// Falls kein Eintrag in lStorage: Bild -> Array -> String -> lStorage, sonst 'altes' Array abrufen -> aktualisieren -> wieder lStorage
function saveImg(){
	console.log("3");
if (localStorage.getItem('picArray') === null) {
			picArray.push(newImg);
			localStorage.setItem('picArray', JSON.stringify(picArray));
			picArray = [];
		} else {
			picArray = JSON.parse(localStorage.getItem('picArray'));
			picArray.push(newImg);
			localStorage.setItem('picArray', JSON.stringify(picArray));
			picArray = [];
		}
}
//Foto-Import
function handleFile(files){
	var file = files[0];
	var reader = new FileReader();
	reader.addEventListener("load", function () {
		newImg = reader.result;
		$("#imgInput").val("");
		photo.css("background-image", "url(" + newImg + ")");
		photo.css("background-size", "cover");
		console.log("1");
		saveImg();
		console.log("2");
  	}, false);
	if (file) {
		reader.readAsDataURL(file);
	}
}