/* global typroDB, currentUser, ImageCapture */
'use strict';
var disableAPI; // controls which method is to take photos
(localStorage.getItem('disableAPI') === 'true') ? disableAPI = true : disableAPI = false;
var streamTrack = null; //access to camera feed
var video, feed, photo, imgCache, imgCtx, feedCtx; // access to HTML elements
var vidW, vidH, feedW, feedH, renderW, renderH, offsetX = 0, offsetY = 0; // calculating feed size relative to window size
// initial setup
$(() => {
    video = $('video');
    photo = $('#photo');
    feed = $('#feed');
    imgCache = $('#imgCache');
    feedCtx = feed.get(0).getContext('2d');
    imgCtx = imgCache.get(0).getContext('2d');
    // configure video and start playback when video is ready
    video.on('loadedmetadata', () => {
        vidW = video.get(0).videoWidth;
        vidH = video.get(0).videoHeight;
        video.attr('width', vidW).attr('height', vidH);
        imgCache.attr('width', vidW).attr('height', vidH);
        adjustPlaybackSize();
        playback();
    });
});
// adjust size and start camera playback on pageshow and window resize
$(document).on('pagebeforeshow', '#scanpage', () => {
    scaleContent();
    startCamera();
});
$(window).on('resize', () => {
    if ($.mobile.activePage[0].id === 'scanpage') {
        scaleContent();
        adjustPlaybackSize();
    }
});
// adjust page size (viewport - header)
function scaleContent() {
    $('#content_scan').attr('style', '--contentH: ' + ($(window).height() - 69));
}
// retrieve camera stream and start playback in hidden video element
function startCamera() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
    }).then(stream => {
        streamTrack = stream.getVideoTracks()[0];
        video.get(0).srcObject = stream;
        video.get(0).play();
        $('#errorText').empty();
    }).catch(err => {
        feedCtx.clearRect(0, 0, feed.attr('width'), feed.attr('height'));
        $('#errorText').html('Kein Zugriff auf Kamera m&ouml;glich.<br>' + err);
    });
}
// playback video in playback canvas
function playback() {
    let playback;
    function refreshFrame() {
        if (streamTrack !== null) {
            feedCtx.drawImage(video.get(0), offsetX, offsetY, renderW, renderH, 0, 0, feedW, feedH);
            playback = requestAnimationFrame(refreshFrame);
        } else {
            cancelAnimationFrame(playback);
        }
    }
    refreshFrame();
}
// crop camera stream to cover entire viewport
function adjustPlaybackSize() {
    feedW = parseInt(feed.css('width'), 10);
    feedH = parseInt(feed.css('height'), 10);
    feed.attr('width', feedW);
    feed.attr('height', feedH);
    if ((vidW / vidH) > (feedW / feedH)) {
        // stream wider than playback area
        renderW = feedW * (vidH / feedH);
        renderH = vidH;
        offsetY = 0;
        offsetX = (vidW - renderW) / 2;
    } else if ((vidW / vidH) < (feedW / feedH)) {
        // canvas area wider than stream
        renderW = vidW;
        renderH = feedH * (vidW / feedW);
        offsetX = 0;
        offsetY = (vidH - renderH) / 2;
    } else {
        // same proportions
        renderW = vidW;
        renderH = vidH;
    }
}
// stop camera access
function camRelease() {
    if (streamTrack !== null) {
        streamTrack.stop();
        streamTrack = null;
    }
}
// stop camera access when appropriate
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
// take picture, either using the ImageCapture API or by drawing to canvas and saving
$(() => {
    $('#shutter').click(
        function takepicture() {
            if (streamTrack !== null) {
                if ((!window.ImageCapture) || (disableAPI)) {
                    // legacy method: draw frame to canvas, save frame as png
                    imgCtx.drawImage(video.get(0), 0, 0, vidW, vidH);
                    let img = imgCache.get(0).toDataURL('image/png');
                    saveImg(img);
                    return;
                }
                // use ImageCapture API (Chrome 60+, Firefox behind flag)
                const imageCapture = new ImageCapture(streamTrack);
                imageCapture.grabFrame()
                    // promise successful: blob to png, save 
                    .then(img => {
                        const reader = new FileReader(img);
                        reader.addEventListener('load', () => {
                            saveImg(reader.result);
                        });
                        if (img) {
                            reader.readAsDataURL(img);
                        }
                    })
                    // promise failed: legacy method from now on, reconnect camera
                    .catch(err => {
                        startCamera();
                        disableAPI = true;
                        localStorage.setItem('disableAPI', 'true');
                        console.warn(`Verwendung von ImageCapture API fehlgeschlagen (${err}): ab jetzt Fallback zu Canvas-Methode.`);
                        console.warn('Webcam unterstützt evtl. ImageCapture API nicht, Fehler tritt auch in offiziellen API-Demos auf.');
                    });
            }

        });
});
// import pictures from user device
$(() => {
    // connect import button with input element
    $('#uploadDiv').click(() => {
        $('#imgInput').click();
    });
    // Convert all img files to png and save them
    $('#imgInput').on('change', evt => {
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
// save img to IndexedDB, claim it's a random font:
function saveImg(img) {
    const fonts = [
        '', 'Avenir', 'Calibri', 'Comic Sans', 'Corbel', 'Didot', 'Franklin Gothic',
        'Frutiger', 'Futura', 'Garamond Pro', 'Gill Sans', 'Helvetica', 'Insignia', 'Josefin',
        'Kabel', 'Lato', 'Roboto', 'TheSans', 'Times New Roman', 'Univers', 'Verdana'
    ];
    let randomFont = (min => Math.floor(Math.random() * (Math.floor(19) - min + 1)) + min)(Math.ceil(0));
    let store = {
        'user': currentUser,
        'photo': img,
        'font': fonts[randomFont],
        'id': 'font' + (randomFont),
        'created': new Date()
    };
    let transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').add(store);
    transaction.oncomplete = () => {
        photo.css('background-image', `url(${img})`);
        photo.css('background-size', 'cover');
    };
}
