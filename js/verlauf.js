"use strict";
var verlaufUser;
var picArray = [];
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
            picArray.push(cursor.value.photo);
            cursor.continue();
        }
    }
    transaction.oncomplete = function() {
        console.log(picArray);
        for (var i = 0; i < picArray.length; i++) {
            $("#previewCollection").append('<div class="verlaufBox"><div class="verlaufPic" style="background-image: url(' + picArray[i] + ');"></div></div>');
        }
        picArray = [];
    }
});