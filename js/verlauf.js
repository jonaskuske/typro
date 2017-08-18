"use strict";
var verlaufUser;
var picArray = [];
var currentEntry;
var currentDetail;
// Auslesen der Bilder aus dem Local Storage und Anzeigen auf Verlauf-Seite
$(document).on("pagebeforeshow", "#verlauf", function() {
    //Falls User eingeloggt: Name abfragen
    if (currentUser != 'noLogin') {
        verlaufUser = " von " + currentUser;
    } else {
        verlaufUser = "";
    };
    //Titel+User darstellen
    $("#content_verlauf").prepend("<h2>Scanverlauf" + verlaufUser + "</h2>");
    // Bilder von User abrufen und in Array speichern
    var transaction = typroDB.transaction('photos');
    var index = transaction.objectStore('photos').index('user');
    index.openCursor(IDBKeyRange.only(currentUser)).onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            picArray.push({
                'photo': cursor.value.photo,
                'entry': cursor.value.entry
            });
            cursor.continue();
        }
    }
    transaction.oncomplete = function() {
        for (var i = 0; i < picArray.length; i++) {
            $("#previewCollection").append('<a href="detail.html" onclick="currentEntry=' + picArray[i].entry + ';"><div class="verlaufBox"><div class="verlaufPic" style="background-image: url(' + picArray[i].photo + ');"></div></div></a>');
        }
        picArray = [];
    }
});
// Detail
$(document).on('pagebeforeshow', '#detail', function() {
    var transaction = typroDB.transaction('photos');
    transaction.objectStore('photos')
        .get(currentEntry)
        .onsuccess = function(event) {
            currentDetail = event.target.result;
        };
    transaction.oncomplete = function() {
        var time = currentDetail.created;
        $('#detailImg').css('background-image', 'url(' + currentDetail.photo + ')');
        $('#detailFont').text(currentDetail.font);
        $('#detailDate').text("Gescannt: " + time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + ", " + time.toLocaleTimeString('de-DE'));
    };
});

function detailDelete() {
    var transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').delete(currentDetail.entry);
    transaction.oncomplete = function() {
        console.log("Gelöscht");
        $('#detailImg').css('background-image', '');
        $('#detailFont').text("");
        $('#detailDate').text("");
        $('#kruzifix').click();
    }
}

function detailDownload() {
    $('#detailDownload').attr('href', currentDetail.photo);
    $('#detailDownload').attr('download', 'typro-image.png');
    $('#detailDownload')[0].click();
}

function openFontPopup() {
    var quicklink = true;
    $(document).on('pageshow', '#katalog', function() {
        if (quicklink) {
            $('#garamondLink').click();
            quicklink = false;
        }
    });
}