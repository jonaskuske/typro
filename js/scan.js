"use strict";
var video, feed, photo, imgCache; // für Zugriff auf HTML ELemente
var vidSizeDefined = false; // zeigt ob stream zum ersten mal geöffnet wird oder nicht
var camStream = null,
    streamTrack; //(globaler) Zugriff auf Kamera-Feed
var vidW, vidH, feedW, feedH, renderW, renderH, offsetX = 0,
    offsetY = 0; // zur Berechnung der Feed-Größe
var feedCtx; //context für gecroppten Canvas des Kamera-Feeds
var imgCtx; //context für Full-Frame-Canvas der Fotofunktion
var newImg; //Zwischenspeicher für neues Bild

//Erst Seitengröße anpassen, nach geladener Seite Hauptfunktion starten
$(document).on("pagebeforeshow", "#scanpage", function() {
    scaleContent();
    $(window).on("resize", scaleContent);
});
$(document).on("pageshow", "#scanpage", function() {
    startup();
});
//Zugriff auf Kamera steuern
$(document).on("pagehide", "#scanpage", function() {
    camRelease();
});
$(document).on('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        camRelease();
    } else if ($.mobile.activePage[0].id === "scanpage") {
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
    imgCache = $('#imgCache');
    imgCtx = imgCache.get(0).getContext('2d');
    //Foto-Import bereitstellen
    $("#uploadA").click(function(e) {
        e.preventDefault;
        $("#imgInput:hidden").trigger('click');
    });
    // Kamera-Feed abfragen
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
                // falls Promise erfolgreich: Kamera-Stream mit Feed verknüpfen	
        }).then(function(stream) {
            camStream = stream;
            streamTrack = camStream.getVideoTracks()[0];
            $("#errorText").html("");
            video.get(0).srcObject = camStream;
            video.get(0).play();
        })
        // Promise fehlgeschlagen: Fehlermeldung ausspielen
        .catch(function(err) {
            feedCtx.clearRect(0, 0, feed.attr('width'), feed.attr('height'));
            $("#errorText").html("Kein Zugriff auf Kamera m&ouml;glich.<br>" + err);
        });
    // Falls vidSizeDefined = false -> Feed wird zum ersten Mal gestartet: (HTML-)Videogröße anpassen
    video.on('loadedmetadata', function() {
        if (!vidSizeDefined) {
            vidW = video.get(0).videoWidth;
            vidH = video.get(0).videoHeight;
            video.attr('width', vidW);
            video.attr('height', vidH);
            imgCache.attr('width', vidW);
            imgCache.attr('height', vidH);
            vidSizeDefined = true;
        }
        //Video bereit: abspielen und responsive machen
    }).on('canplay', function() {
        adjustFeedScale();
        refreshFrame();
        $(window).on("resize", adjustFeedScale);
    });
}
//ENDE HAUPTFUNKTION
// Größe des Content-Bereichs anpassen
function scaleContent() {
    var viewportH = $(window).height();
    $("#content_scan").css("height", (viewportH - headerH + 1));
}
// Bild machen, entweder mittels Foto-API oder durch speichern des aktuellen Canvas
function legacyCam() {
    //Frame in Canvas zeichnen, als Bild speichern, in den Offline-Speicher laden und in der Vorschau zeigen
    imgCtx.drawImage(video.get(0), 0, 0, vidW, vidH);
    newImg = imgCache.get(0).toDataURL('image/png');
    saveImg();
    photo.css("background-image", "url(" + newImg + ")");
    photo.css("background-size", "cover");
}
//Foto-Funktion, die durch User getriggert werden kann
function takepicture() {
    //API nicht verfügbar: Canvas speichern
    if (camStream !== null) {
        if (!window.ImageCapture) {
            legacyCam();
        } else {
            //ImageCapture-API aufrufen (Chrome 60+, Firefox hinter flag), liefert blob
            var imageCapture = new ImageCapture(streamTrack);
            imageCapture.takePhoto()
                //Promise erfolgreich: blob zu Bild, speichern, vorschauen 
                .then(function(img) {
                    var reader = new FileReader(img);
                    reader.addEventListener('load', function() {
                        newImg = reader.result;
                        saveImg();
                        photo.css("background-image", "url(" + newImg + ")");
                        photo.css("background-size", "cover");
                    }, false);
                    if (img) {
                        reader.readAsDataURL(img);
                    }
                })
                //Promise fehlgeschlagen: Warnen, auf andere Methode zurückfallen, Kamera-Verbindung neu herstellen
                .catch(function(err) {
                    console.log('ImageCapture API failed (' + err + '): fallback to legacy method.');
                    legacyCam();
                    startup();
                });
        }
    }
}
//Kamera-Feed in Content-Bereich einpassen
function adjustFeedScale() {
    feedW = parseInt(feed.css("width"), 10);
    feedH = parseInt(feed.css("height"), 10);
    feed.attr('width', feedW);
    feed.attr('height', feedH);
    if ((vidW / vidH) > (feedW / feedH)) {
        //Video breiter als Canvas
        renderW = feedW * (vidH / feedH);
        renderH = vidH;
        offsetY = 0;
        offsetX = (vidW - renderW) / 2;
    } else if ((vidW / vidH) < (feedW / feedH)) {
        //Video schmaler als Canvas
        renderW = vidW;
        renderH = feedH * (vidW / feedW);
        offsetX = 0;
        offsetY = (vidH - renderH) / 2;
    } else {
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
    if (camStream !== null) {
        streamTrack.stop();
        camStream = null;
    }
}
//Bild in IndexedDB speichern:
function saveImg() {
    var store = {
        'user': currentUser,
        'photo': newImg,
        'font': randomFont(),
        'created': new Date()
    };
    var transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').add(store);
    transaction.oncomplete = function() {
        console.log("Gespeichert.");
    };
}
//Foto-Import
function imgImport(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.addEventListener('load', function(e) {
            newImg = e.target.result;
            photo.css("background-image", "url(" + newImg + ")");
            photo.css("background-size", "cover");
            saveImg();
        });
        reader.readAsDataURL(file);
    }
    $("#imgInput").val("");
}

function randomFont() {
    var fonts = [
        'Avenir', 'Calibri', 'Comic Sans', 'Corbel', 'Didot', 'Franklin Gothic',
        'Frutiger', 'Futura', 'Garamond Pro', 'Gill Sans', 'Helvetica', 'Insignia', 'Josefin',
        'Kabel', 'Lato', 'Roboto', 'TheSans', 'Times New Roman', 'Univers', 'Verdana'
    ]
    var randomInt = getRandomInt();
    return fonts[randomInt];
}

function getRandomInt() {
    var min = Math.ceil(0);
    var max = Math.floor(19);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}