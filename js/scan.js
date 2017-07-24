// Variablen
var width = 300;
var height;
var video, img_cache, photo, shutter; //var für Zugriff auf HTML-Elemente
var streaming = false;
var PicArray = []; //array für gespeicherte Bilder

$(document).on("pageshow", "#scanpage", function () {
    "use strict";
    // link var with HTMLElement
    video = document.getElementById("video");
    shutter = document.getElementById("shutter");
    photo = document.getElementById("photo");
    img_cache = document.getElementById("img_cache");
    // retrieve camera stream
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
        // set HTML video source to stream URL and start playback
    }).then(function (stream) {
        video.src = URL.createObjectURL(stream);
        video.play();
    })
    // Fehlermeldung
        .catch(function (err) {
            alert("Kamera-Fehler!"+err);
        });
    video.addEventListener("canplay", function () {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            img_cache.setAttribute('width', width);
            img_cache.setAttribute('height', height);
            streaming = true;
        }
    }, false);
    shutter.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);
});

function clearphoto() {
    "use strict";
    var context = img_cache.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, img_cache.width, img_cache.height);

    var data = img_cache.toDataURL('image/png');
    photo.setAttribute('src', data);
}
function takepicture() {
    "use strict";
    var context = img_cache.getContext("2d");
    if (width && height) {
        img_cache.width = width;
        img_cache.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = img_cache.toDataURL('image/png');
        photo.setAttribute('src', data);
        // Bild in Array speichern + in lStor übertragen + clear Array
        if (localStorage.getItem("PicArray") === null) {
            PicArray.push(data);
            localStorage.setItem("PicArray", JSON.stringify(PicArray));
        }
        else {
            PicArray = JSON.parse(localStorage.getItem("PicArray"));
            PicArray.push(data);
            localStorage.setItem("PicArray", JSON.stringify(PicArray));
            PicArray = [];
        }
    } else {
        clearphoto();
    }

}