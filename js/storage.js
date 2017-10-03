//Für eslint:
/* exported typroDB, logCheckInput, currentUser, logout */
'use strict';
// Anlegen von Benutzern
var typroDB; //Zugriff auf Datenbank
var currentUser;
const allUsers = [
    { 'username': 'admin', 'passwort': 'futura', 'img': '/img/admin.png', 'bg': 'bright' },
    { 'username': 'test', 'passwort': 'comicsans', 'img': '/img/test.png', 'bg': 'bright' },
    { 'username': 'darth vader', 'passwort': 'darkside', 'img': '/img/darth.png', 'bg': 'dark' },
    { 'username': 'Jonas', 'passwort': 'Serifen', 'img': '/img/jonas.jpg', 'bg': 'dark' }
];
//Automatisches Löschen von Speicher verhindern, falls möglich
if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(granted => {
        if (granted) {
            //Speicher wird nicht gelöscht, außer durch Eingreifen des Users
        }
    });
}
// LOCALSTORAGE
// Abfrage des eingeloggten Users bei Laden der Seite
$(logCheck('auto'));
// Im Nutzerdaten abfragen, überprüfen und reagieren
function logCheck(mode) {
    let userEntry, passwortEntry;
    if (mode !== 'auto') {
        userEntry = $('#username').val();
        passwortEntry = $('#passwort').val();
    } else {
        userEntry = localStorage.getItem('username');
        passwortEntry = localStorage.getItem('passwort');
    }
    // iteriert über Nutzer-Array und prüft, ob eingegebene Daten zu einem Nutzer passen
    let loginSuccess = () => {
        for (let i in allUsers) {
            if ((userEntry === allUsers[i].username && passwortEntry === allUsers[i].passwort) && storeUser(userEntry, passwortEntry)) {
                login(i, mode);
                return true;
            }
        }
    };
    if (!loginSuccess()) { if (mode !== 'auto') { loginFeedback('nosuccess'); } else { logout(); } }
}
function login(user, mode) {
    currentUser = allUsers[user].username;
    $('#pUser').text(`Hallo, ${currentUser}`);
    $('#user').css('background-image', `url(${allUsers[user].img})`);
    (allUsers[user].bg === 'dark') ? $('#pUser').addClass('darkUser') : $('#pUser').removeClass('darkUser');
    if (mode !== 'auto') { loginFeedback('success'); }
}
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('passwort');
    currentUser = 'noLogin';
    $('#pUser').text('Einloggen');
    $('#user').css('background-image', 'url(/img/placeholder.png)');
    $('#pUser').removeClass('darkUser');
}
// Login-Daten in Local Storage speichern
function storeUser(user, passwort) {
    //Prüfen, ob Webstorage verfügbar ist
    if (window.localStorage) {
        localStorage.setItem('username', user);
        localStorage.setItem('passwort', passwort);
        return true;
    } else {
        console.warn('Login nicht möglich, Local Storage nicht verfügbar!');
    }
}
// Ausgabe: Log-in erfolgreich / nicht erfolgreich
function loginFeedback(state) {
    if (state === 'success') {
        $('#loginFeedback').html('Erfolgreich eingeloggt: ' + currentUser);
        setTimeout(() => { $('#loginFeedback').empty(); }, 1500);
    } else {
        $('#loginFeedback').html('Falsche Nutzer-Passwort-Kombination!');
        setTimeout(() => { $('#loginFeedback').empty(); }, 1500);
    }
}
// INDEXEDDB
$(() => {
    'use strict';
    // Check, ob IndexedDB unterstützt/aktiviert
    if (!('indexedDB' in window)) {
        console.warn('IndexedDB nicht verfügbar!');
    } else {
        // Datenbank aufrufen/öffnen, generische Fehlermeldung einstellen
        const openDB = window.indexedDB.open('typroDB', 1);
        openDB.onerror = event => {
            console.warn('IDB-Fehler.' + event.target.errorCode);
        };
        openDB.onsuccess = event => {
            typroDB = event.target.result;
        };
        // Falls noch nicht vorhanden, Object Store erstellen
        openDB.onupgradeneeded = event => {
            const openDBUpgrade = event.target.result;
            if (!openDBUpgrade.objectStoreNames.contains('photos')) {
                const photos = openDBUpgrade.createObjectStore('photos', { keyPath: 'entry', autoIncrement: true });
                photos.createIndex('user', 'user', { unique: false });
            }
            typroDB = event.target.result;
        };
    }
});
