//Für eslint:
/* global typroDB, currentUser */
/* exported imgDelete, imgDownload */
'use strict';
var picArray = [];
var currentDetail;
var detailRef = false;
//VERLAUFSEITE
// Falls eingeloggter User: Angabe im Titel
$(document).on('pagebeforeshow', '#verlauf', () => {
    $('#previewCollection').empty();
    if (currentUser !== 'noLogin') {
        $('#scanUser').text(' von ' + currentUser);
    } else {
        $('#scanUser').text('');
    }
    // Zugriff auf IndexedDB: Abruf der Bilder des aktuellen Users (mit Index+Cursor) und speichern von Bild und Key in Array
    const transaction = typroDB.transaction('photos');
    const index = transaction.objectStore('photos').index('user');
    index.openCursor(IDBKeyRange.only(currentUser)).onsuccess = event => {
        let cursor = event.target.result;
        if (cursor) {
            picArray.push({
                'photo': cursor.value.photo,
                'entry': cursor.value.entry
            });
            cursor.continue();
        }
    };
    transaction.oncomplete = () => {
        picArray.forEach(pic => {
            // Einträge im Array darstellen (samt Link und onclick-Funktion zur Referenz für die Detailseite)
            $('#previewCollection').append(`<div class="verlaufBox" id="${pic.entry}"><div class="verlaufPic" style="background-image: url(${pic.photo});"></div></div>`);
        });
        picArray = [];
    };
});
// DETAILSEITE
// Bei Anklicken eines Bilds im Verlauf alle Infos des ausgewählten Bildes aus IndexedDB abrufen, Detailseite konfigurieren und anzeigen
$(() => {
    $(document).on('click', '.verlaufBox', evt => {
        let key = parseInt(evt.currentTarget.id);
        const transaction = typroDB.transaction('photos');
        transaction.objectStore('photos')
            .get(key)
            .onsuccess = event => {
                currentDetail = event.target.result;
            };
        transaction.oncomplete = () => {
            // Config der Detailseite basierend auf abgerufenen Bild-Infos
            let time = currentDetail.created;
            $('#detailImg').css('background-image', `url(${currentDetail.photo})`);
            $('#detailFont').text(currentDetail.font);
            $('#detailDate').text(`Gescannt: ${time.getDate()}.${(time.getMonth() + 1)}.${time.getFullYear()}, ${time.toLocaleTimeString('de-DE')}`);
            $(':mobile-pagecontainer').pagecontainer('change', $('#detail'));
        };
    });
});
// Löschen des Bildes mittels IndexedDB readwrite-Transaktion, Reset der Detailseite, zurück zum Verlauf
function imgDelete() {
    const transaction = typroDB.transaction('photos', 'readwrite');
    transaction.objectStore('photos').delete(currentDetail.entry);
    transaction.oncomplete = () => {
        $('#detailImg').css('background-image', '');
        $('#detailFont').text('');
        $('#detailDate').text('');
        $('#detailBack').click();
    };
}
// Speichern des Bildes: Download-Link konfigurieren und triggern
function imgDownload(pic) {
    let dl = $('<a>').attr('href', pic).attr('download', 'typro-image.png').appendTo('body');
    dl[0].click();
    dl.remove();
}
// Falls User auf Link zum Katalog klickt, vor pagechange die Verknüpfung aktivieren (vgl. checkRef in katalog.js)
$(document).on('pageinit', '#detail', () => {
    $('#detailKatalog').on('click', e => {
        if (!detailRef) {
            e.preventDefault();
            detailRef = true;
            $('#detailKatalog').click();
        }
    });
});