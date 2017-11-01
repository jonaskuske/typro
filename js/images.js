/* global currentUser */
'use strict';
var typroDB; // access to IDB database
var currentDetail; // currently displayed img
// open IDB database and create Object Store with user index
if (!('indexedDB' in window)) {
    console.warn('IndexedDB nicht verfügbar!');
} else {
    const openDB = window.indexedDB.open('typroDB', 1);
    openDB.onerror = event => {
        console.warn('IDB-Fehler.' + event.target.errorCode);
    };
    openDB.onsuccess = event => {
        typroDB = event.target.result;
    };
    openDB.onupgradeneeded = event => {
        const openDBUpgrade = event.target.result;
        if (!openDBUpgrade.objectStoreNames.contains('photos')) {
            const photos = openDBUpgrade.createObjectStore('photos', { keyPath: 'entry', autoIncrement: true });
            photos.createIndex('user', 'user', { unique: false });
        }
        typroDB = event.target.result;
    };
}
//
// retrieve and display imgs of logged-in user
$(() => {
    $(document).on('pagebeforeshow', '#verlauf', () => {
        $('#previewCollection').empty();
        let welcomeMsg;
        (currentUser !== 'noLogin') ? welcomeMsg = ` von ${currentUser}` : welcomeMsg = '';
        $('#scanUser').text(welcomeMsg);
        // get all imgs of logged in user from IDB (using cursor), save them to array
        let picArray = [];
        if (typroDB !== undefined) {
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
                    // append all imgs in array
                    $('#previewCollection').append(`<div class="verlaufBox" id="${pic.entry}"><div class="verlaufPic" style="background-image: url(${pic.photo});"></div></div>`);
                });
                picArray = [];
            };
        }
    });
});
//
// when selecting an image, retrieve and show all its information on detail page
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
            // configure detail page
            let date = currentDetail.created;
            let toGermanDate = new Intl.DateTimeFormat('de-DE');
            $('#detailImg').css('background-image', `url(${currentDetail.photo})`);
            $('#detailFont').text(currentDetail.font);
            $('#detailDate').text(`Gescannt: ${toGermanDate.format(date)}, ${date.toLocaleTimeString('de-DE')}`);
            $(':mobile-pagecontainer').pagecontainer('change', $('#detail'));
        };
    });
});
// delete img in IDB with readwrite transaction, return to overview
$(() => {
    $('#deleteBtn').click(() => {
        const transaction = typroDB.transaction('photos', 'readwrite');
        transaction.objectStore('photos').delete(currentDetail.entry);
        transaction.oncomplete = () => {
            $('#detailImg').css('background-image', '');
            $('#detailFont').text('');
            $('#detailDate').text('');
            $('#detailBack').click();
        };
    });
});
// save img: configure and trigger donwload link
$(() => {
    $('#downloadBtn').click(() => {
        let dl = $('<a>').attr('href', currentDetail.photo).attr('download', 'typro-image.png').appendTo('body');
        dl[0].click();
        dl.remove();
    });
});
// referral: navigate to catalogue and open corresponding popup
$(() => {
    $('#detailKatalog').click(e => {
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', $('#katalog'));
        $(`#${currentDetail.id}`)[0].scrollIntoView();
        $(`#${currentDetail.id}`).click();
    });
});