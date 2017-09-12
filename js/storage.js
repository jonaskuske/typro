//Für eslint:
/* exported typroDB, store */
'use strict';
// Anlegen von Benutzern
var boldUser = 'admin', lightUser = 'test', starUser = 'darth vader';
var boldPass = 'futura', lightPass = 'comicsans', starPass = 'darkside';
var typroDB; //Zugriff auf Datenbank
var currentUser;
const accImages = {
    'placeholder': '/typro-nightly/img/placeholder.png',
    'admin': '/typro-nightly/img/admin.png',
    'test': '/typro-nightly/img/test.png',
    'darth': '/typro-nightly/img/darth.png'
};
//Automatisches Löschen von Speicher verhindern, falls möglich
if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(function (granted) {
        if (granted) {
            //Speicher wird nicht gelöscht, außer durch Eingreifen des Users
        }
    });
}
// LOCALSTORAGE
// Im Local Storage hinterlegte Nutzerdaten abrufen und prüfen
function checkLogStorage() {
    let uStored = localStorage.getItem('username');
    let pwStored = localStorage.getItem('passwort');
    logCheck(uStored, pwStored);
}
// Abfrage des eingeloggten Users bei Laden der Seite
$(checkLogStorage());
// Abfrage der neuen Login-Daten, leeren des Input-Feldes, Weitergabe an logCheck
function store() {
    let uEntered = $('#username').val();
    let pwEntered = $('#passwort').val();
    $('#username').val('');
    $('#passwort').val('');
    logCheck(uEntered, pwEntered, 'user');
}
// Login-Daten überprüfen, Panel + currentUser anpassen
function logCheck(u, pw, initiator) {
    if (u === boldUser && pw === boldPass) {
        if (saveUser(u, pw)) {
            currentUser = boldUser;
            $('#pUser').text('Hallo, ' + currentUser);
            $('#user').css('background-image', 'url(' + accImages.admin + ')');
        }
    } else if (u === lightUser && pw === lightPass) {
        if (saveUser(u, pw)) {
            currentUser = lightUser;
            $('#pUser').text('Hallo, ' + currentUser);
            $('#user').css('background-image', 'url(' + accImages.test + ')');
        }
    } else if (u === starUser && pw === starPass) {
        if (saveUser(u, pw)) {
            currentUser = starUser;
            $('#pUser').text('*heavy breathing*').css('background-color', 'black').css('border-radius', '30%');
            $('#user').css('background-image', 'url(' + accImages.darth + ')');
        }
    } else if (u === null || pw === null) {
        currentUser = 'noLogin';
        $('#pUser').text('Einloggen');
        $('#user').css('background-image', 'url(' + accImages.placeholder + ')');
    } else {
        logFeedback(u, 'failed');
        return;
    }
    if (initiator === 'user') { logFeedback(u); }
}
// Login-Daten in lStorage speichern
function saveUser(u, pw) {
    //Prüfen, ob Webstorage verfügbar ist
    if (window.localStorage) {
        localStorage.setItem('username', u);
        localStorage.setItem('passwort', pw);
        return true;
    } else {
        console.warn('Login nicht möglich, Local Storage nicht verfügbar!');
    }
}
// Ausgabe: Log-in erfolgreich / nicht erfolgreich
function logFeedback(u, check) {
    if (check !== 'failed') {
        $('#loginFeedback').html('Erfolgreich eingeloggt: ' + u);
        setTimeout(function () { $('#loginFeedback').empty(); }, 1500);
        if (u !== starUser) {
            $('#pUser').css('background-color', '');
            $('#pUser').css('border-radius', '');
        }
    } else {
        $('#loginFeedback').html('Falsche Nutzer-Passwort-Kombination!');
        setTimeout(function () { $('#loginFeedback').empty(); }, 1500);
    }
}
// INDEXEDDB
$(function () {
    'use strict';
    // Check, ob IndexedDB unterstützt/aktiviert
    if (!('indexedDB' in window)) {
        console.warn('IndexedDB nicht verfügbar!');
    } else {
        // Datenbank aufrufen/öffnen, generische Fehlermeldung einstellen
        const openDB = window.indexedDB.open('typroDB', 1);
        openDB.onerror = function (event) {
            console.warn('IDB-Fehler.' + event.target.errorCode);
        };
        openDB.onsuccess = function (event) {
            typroDB = event.target.result;
        };
        // Falls noch nicht vorhanden, Object Store erstellen
        openDB.onupgradeneeded = function (event) {
            const openDBUpgrade = event.target.result;
            if (!openDBUpgrade.objectStoreNames.contains('photos')) {
                const photos = openDBUpgrade.createObjectStore('photos', { keyPath: 'entry', autoIncrement: true });
                photos.createIndex('user', 'user', { unique: false });
            }
            typroDB = event.target.result;
        };
    }
});
