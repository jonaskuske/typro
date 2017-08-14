"use strict";
// Anlegen von Benutzern
var boldUser = "admin";
var lightUser = "test";
var boldPass = "futura";
var lightPass = "comicsans";
var starUser = "darth vader";
var starPass = "darkside";
var typroDB; //Zugriff auf Datenbank
var currentUser;
//Automatisches Löschen von Speicher verhindern, falls möglich
if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(function(granted) {
        if (granted) {
            console.log("Speicher wird nicht gelöscht, außer durch Eingreifen des Users.");
        }
    });
}
// LOCALSTORAGE
// Abfrage des eingeloggten Users bei Laden der Seite
$(function() {
    logCheck();
});
// Speichern der Login-Daten in LocalStorage
function store() {
    var user = $("#username").val();
    var pass = $("#passwort").val();
    //Prüfen, ob Webstorage verfügbar ist
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("username", user);
        localStorage.setItem("passwort", pass);
    } else {
        alert("Local Storage nicht verfügbar!");
    }
    // Update Account-Switcher
    logCheck();
}
// User-abhängiges manipulieren des Panels
function logCheck() {
    if (localStorage.getItem("username") === boldUser && localStorage.getItem("passwort") === boldPass) {
        currentUser = boldUser;
        userWelcome();
    } else if (localStorage.getItem("username") === lightUser && localStorage.getItem("passwort") === lightPass) {
        currentUser = lightUser;
        userWelcome();
    } else if (localStorage.getItem("username") === starUser && localStorage.getItem("passwort") === starPass) {
        currentUser = starUser;
        $("#pUser").text("*heavy breathing*").css("background-color", "black").css("border-radius", "30%");
        $("#user").css("background-image", "url('../img/darth.png')");
    } else {
        currentUser = 'noLogin';
        $("#pUser").text("Einloggen");
        $("#user").css("background-image", "url('../img/placeholder.png')");
    }
    if (localStorage.getItem("username") !== starUser) {
        $("#pUser").css("background-color", "");
        $("#pUser").css("border-radius", "");
    }
}

function userWelcome() {
    $("#pUser").text("Hallo, " + currentUser);
    $("#user").css("background-image", "url('../img/" + currentUser + ".png')");
}
// Alert: Log-in erfolgreich / nicht erfolgreich
function logFeedback() {
    if ((localStorage.getItem("username") === boldUser && localStorage.getItem("passwort") === boldPass) || (localStorage.getItem("username") === lightUser && localStorage.getItem("passwort") === lightPass) || (localStorage.getItem("username") === starUser && localStorage.getItem("passwort") === starPass)) {
        // erfolgreicher login, alert entfernt
    } else {
        // login fehlgeschlagen
        alert("Falsche Nutzer-Passwort-Kombination!");
    }
}
// INDEXEDDB
$(function() {
    'use strict';
    // Check, ob IndexedDB unterstützt/aktiviert
    if (!('indexedDB' in window)) {
        alert('IndexedDB nicht verfügbar!');
        return;
    } else {
        // Datenbank aufrufen/öffnen, generische Fehlermeldung einstellen
        var openDB = window.indexedDB.open("typroDB", 1);
        openDB.onerror = function(event) {
            console.log('IDB-Fehler.' + event.target.errorCode);
        }
        openDB.onsuccess = function(event) {
                typroDB = event.target.result;
            }
            // Falls noch nicht vorhanden, Object Store erstellen
        openDB.onupgradeneeded = function(event) {
            var openDBUpgrade = event.target.result;
            if (!openDBUpgrade.objectStoreNames.contains('photos')) {
                var photos = openDBUpgrade.createObjectStore('photos', { keyPath: 'entry', autoIncrement: true });
                photos.createIndex('user', 'user', { unique: false });
            }
            typroDB = event.target.result;
        }
    }
});