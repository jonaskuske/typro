//Für eslint:
/* global typroDB, currentUser, ImageCapture */
/* exported imgImport, takepicture */
'use strict';

var video, feed, photo, imgCache; // für Zugriff auf HTML ELemente
var streamTrack = null; //(globaler) Zugriff auf Kamera-Feed
var vidW, vidH, feedW, feedH, renderW, renderH, offsetX = 0,
    offsetY = 0; // zur Berechnung der Feed-Größe
var imgCtx, feedCtx; //context für Full-Frame-Canvas der Fotofunktion
var disableAPI = false; // Steuert, ob ImageCapture oder Canvas für Fotos verwendet wird
//Funktion zum Bereitstellen des Kamera-Feeds
function startCamera() {
    // Kamera-Feed abfragen
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
        // falls Promise erfolgreich: Kamera-Stream mit Feed verknüpfen
    }).then(stream => {
        $('#errorText').html('');
        streamTrack = stream.getVideoTracks()[0];
        video.get(0).srcObject = stream;
        video.get(0).play();
    })
        // Promise fehlgeschlagen: Fehlermeldung ausspielen
        .catch(err => {
            feedCtx.clearRect(0, 0, feed.attr('width'), feed.attr('height'));
            $('#errorText').html('Kein Zugriff auf Kamera m&ouml;glich.<br>' + err);
        });
}
// video configuration + initial setup
$(() => {
    // link variables
    video = $('video');
    photo = $('#photo');
    feed = $('#feed');
    imgCache = $('#imgCache');
    feedCtx = feed.get(0).getContext('2d');
    imgCtx = imgCache.get(0).getContext('2d');
    // configure vid and start playback
    video.on('loadedmetadata', () => {
        vidW = video.get(0).videoWidth;
        vidH = video.get(0).videoHeight;
        video.attr('width', vidW);
        video.attr('height', vidH);
        imgCache.attr('width', vidW);
        imgCache.attr('height', vidH);
    }).on('canplay', () => {
        adjustFeedScale();
        playback(feedCtx);
    });

});
//Erst Seitengröße anpassen, nach geladener Seite Hauptfunktion starten
$(document).on('pagebeforeshow', '#scanpage', () => {
    scaleContent();
    $(window).on('resize', scaleContent);
    $(window).on('resize', adjustFeedScale);
    startCamera();
});
//Zugriff auf Kamera steuern
$(document).on('pagehide', '#scanpage', () => {
    camRelease();
});
$(document).on('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        camRelease();
    } else if ($.mobile.activePage[0].id === 'scanpage') {
        startCamera();
    }
});
// Zustand von disableAPI abfragen
$(() => {
    if (localStorage.getItem('disableAPI') === 'true') {
        disableAPI = true;
    }
});
// Größe des Content-Bereichs (viewport - header) anpassen
function scaleContent() {
    $('#content_scan').attr('style', '--contentH: ' + ($(window).height() - 69));
}
//Kamera-Feed in Content-Bereich einpassen
function adjustFeedScale() {
    feedW = parseInt(feed.css('width'), 10);
    feedH = parseInt(feed.css('height'), 10);
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
function playback(feedCtx) {
    let frameTarget = feedCtx;
    let playback;
    function refreshFrame() {
        if (streamTrack !== null) {
            frameTarget.drawImage(video.get(0), offsetX, offsetY, renderW, renderH, 0, 0, feedW, feedH);
            playback = requestAnimationFrame(refreshFrame);
        } else {
            cancelAnimationFrame(playback);
        }
    }
    refreshFrame();
}
// stop camera access
function camRelease() {
    if (streamTrack !== null) {
        streamTrack.stop();
        streamTrack = null;
    }
}
// Bild machen, entweder mittels Foto-API oder durch speichern des aktuellen Canvas
function takepicture() {
    if (streamTrack !== null) {
        if ((!window.ImageCapture) || (disableAPI)) {
            // Legacy method: draw frame to canvas, save frame as png
            imgCtx.drawImage(video.get(0), 0, 0, vidW, vidH);
            let img = imgCache.get(0).toDataURL('image/png');
            saveImg(img);
            return;
        }
        // use ImageCapture API (Chrome 60+, Firefox behind flag)
        const imageCapture = new ImageCapture(streamTrack);
        imageCapture.takePhoto()
            //Promise successful: blob to png, save 
            .then(img => {
                const reader = new FileReader(img);
                reader.addEventListener('load', () => {
                    saveImg(reader.result);
                }, false);
                if (img) {
                    reader.readAsDataURL(img);
                }
            })
            //Promise failed: legacy method from now on, reconnect camera
            .catch(err => {
                startCamera();
                disableAPI = true;
                localStorage.setItem('disableAPI', 'true');
                console.warn(`Verwendung von ImageCapture API fehlgeschlagen (${err}): ab jetzt Fallback zu Canvas-Methode.`);
                console.warn('Webcam unterstützt evtl. ImageCapture API nicht, Fehler tritt auch in offiziellen API-Demos auf.');
            });
    }

}
//Foto-Import
$(() => {
    // connect import-button with input-element
    $('#uploadDiv').click(() => {
        $('#imgInput').click();
    });
    // Convert all img files to png and save them
    $('#imgInput').on('change', (evt) => {
        let files = evt.target.files;
        let imageFile = /^image\//;
        for (let i in files) {
            let file = files[i];
            const reader = new FileReader();
            if (!imageFile.test(file.type)) {
                continue;
            }
            reader.addEventListener('load', read => {
                saveImg(read.target.result);
            });
            reader.readAsDataURL(file);
        }
    });
});
// save img to IndexedDB:
function saveImg(img) {
    const fonts = [
        'Avenir', 'Calibri', 'Comic Sans', 'Corbel', 'Didot', 'Franklin Gothic',
        'Frutiger', 'Futura', 'Garamond Pro', 'Gill Sans', 'Helvetica', 'Insignia', 'Josefin',
        'Kabel', 'Lato', 'Roboto', 'TheSans', 'Times New Roman', 'Univers', 'Verdana'
    ];
    let fontPicker = getRandomInt();
    let store = {
        'user': currentUser,
        'photo': img,
        'font': fonts[fontPicker],
        'id': 'font' + (fontPicker + 1),
        'created': new Date()
    };
    let transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').add(store);
    transaction.oncomplete = () => {
        photo.css('background-image', `url(${img})`);
        photo.css('background-size', 'cover');
    };
}
// Zufalls-Integer um in saveImg() zufälligen Font zu speichern
function getRandomInt() {
    let min = Math.ceil(0);
    let max = Math.floor(19);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}