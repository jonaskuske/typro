"use strict";
var verlaufUser;
var picArray = [];
var currentEntry;
var currentDetail;
var detailRef = false;
//VERLAUFSEITE
// Falls eingeloggter User: Angabe im Titel
$(document).on("pagebeforeshow", "#verlauf", function() {
    if (currentUser != 'noLogin') {
        $("#scanUser").text(" von " + currentUser);
    } else {
        $("#scanUser").text("");
    }
    // Zugriff auf IndexedDB: Abruf der Bilder des aktuellen Users (mit Cursor) und speichern von Bild und Key in Array
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
    };
    transaction.oncomplete = function() {
        for (var i = 0; i < picArray.length; i++) {
            // Einträge im Array darstellen (samt Link und onclick-Funktion zur Referenz für die Detailseite)
            $("#previewCollection").append('<a href="detail.html" onclick="currentEntry=' + picArray[i].entry + ';"><div class="verlaufBox"><div class="verlaufPic" style="background-image: url(' + picArray[i].photo + ');"></div></div></a>');
        }
        picArray = [];
    }
});
// DETAILSEITE
// Bei Anzeigen der Seite alle Infos des im Verlauf ausgewählten Bildes aus IndexedDB abrufen
$(document).on('pagebeforeshow', '#detail', function() {
    setRef();
    var transaction = typroDB.transaction('photos');
    transaction.objectStore('photos')
        .get(currentEntry)
        .onsuccess = function(event) {
            currentDetail = event.target.result;
        };
    transaction.oncomplete = function() {
        // Config der Detailseite basierend auf abgerufenen Bild-Infos
        var time = currentDetail.created;
        $('#detailImg').css('background-image', 'url(' + currentDetail.photo + ')');
        $('#detailFont').text(currentDetail.font);
        $('#detailDate').text("Gescannt: " + time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + ", " + time.toLocaleTimeString('de-DE'));
    };
});
// Löschen des Bildes mittels IndexedDB readwrite-Transaktion, Reset der Detailseite, zurück zum Verlauf
function detailDelete() {
    var transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').delete(currentDetail.entry);
    transaction.oncomplete = function() {
        $('#detailImg').css('background-image', '');
        $('#detailFont').text("");
        $('#detailDate').text("");
        $('#detailBack').click();
    }
}
// Speichern des Bildes: Download-Link konfigurieren und triggern
function detailDownload() {
    $('#detailDownload').attr('href', currentDetail.photo);
    $(this).attr('download', 'typro-image.png');
    $(this)[0].click();
}
// Falls User auf Link zum Katalog klickt, vor pagechange die Verknüpfung aktivieren (vgl. checkRef in katalog.js)
function setRef() {
    $('#detailKatalog').on('click', function(e) {
        if (!detailRef) {
            e.preventDefault();
            detailRef = true;
            $('#detailKatalog').click();
        }
    });
}