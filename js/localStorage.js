"use strict";
//Automatisches Löschen von lStorage und sw-Cache verhindern, falls möglich
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then(function(granted) {
    if (granted) {
      console.log("Speicher wird nicht gel&ouml;scht, außer durch Eingreifen des Users.");
	}
  });
}
//Anlegen von Benutzern
var boldUser = "admin";
var lightUser = "test";
var boldPass = "futura";
var lightPass = "comicsans";
var starUser = "darth vader";
var starPass = "darkside";

//Abfrage des eingeloggten Users bei Neuladen
$(function() {
	logCheckStart();
});

//Speichern der Login-Daten in LocalStorage
function store() {
	var user = $("#username").val();
	var pass = $("#passwort").val();
	
	//Prüfen, ob Webstorage verfügbar ist
	if (typeof (Storage) !== "undefined") {
		
		localStorage.setItem("username", user);
		localStorage.setItem("passwort", pass);
		
	} else {
		alert("Web Storage not available!");
	}
	// Update Account-Switcher
	logCheck();
}
// User-abhängiges manipulieren des Panels
function logCheck() {
	if (localStorage.getItem("username") === boldUser && localStorage.getItem("passwort") === boldPass) {
		$("#pUser").text("Hallo, " + boldUser);
		$("#user").css("background-image", "url('../img/admin.png')");
	} else if (localStorage.getItem("username") === lightUser && localStorage.getItem("passwort") === lightPass) {
		$("#pUser").text("Hallo, " + lightUser);
        $("#user").css("background-image", "url('../img/test.png')");
	} else if (localStorage.getItem("username") === starUser && localStorage.getItem("passwort") === starPass) {
		$("#pUser").text("*heavy breathing*").css("background-color", "black").css("border-radius", "30%");
        $("#user").css("background-image", "url('../img/darth.png')");
	} else {
		$("#pUser").text("Einloggen");
        $("#user").css("background-image", "url('../img/placeholder.png')");
	}
	if (localStorage.getItem("username") !== starUser){
		$("#pUser").css("background-color", "");
		$("#pUser").css("border-radius", "");
	}
}
// User-abhängiges manipulieren des Panels
function logCheckStart() {
    if (localStorage.getItem("username") === boldUser && localStorage.getItem("passwort") === boldPass) {
        $("#pUser").text("Hallo, " + boldUser);
        $("#user").css("background-image", "url('img/admin.png')");
    } else if (localStorage.getItem("username") === lightUser && localStorage.getItem("passwort") === lightPass) {
        $("#pUser").text("Hallo, " + lightUser);
        $("#user").css("background-image", "url('img/test.png')");
    } else if (localStorage.getItem("username") === starUser && localStorage.getItem("passwort") === starPass) {
        $("#pUser").text("*heavy breathing*").css("background-color", "black").css("border-radius", "30%");
        $("#user").css("background-image", "url('img/darth.png')");
    } else {
        $("#pUser").text("Einloggen");
        $("#user").css("background-image", "url('img/placeholder.png')");
    }
} 
// Alert: Log-in erfolgreich / nicht erfolgreich
function logFeedback() {
	//Erfolgreicher Log-In
    if ((localStorage.getItem("username") === boldUser && localStorage.getItem("passwort") === boldPass) || (localStorage.getItem("username") === lightUser && localStorage.getItem("passwort") === lightPass) || (localStorage.getItem("username") === starUser && localStorage.getItem("passwort") === starPass)) {  
		alert("Erfolgreich eingeloggt!");		
	} else {
        alert("Falsche Username-Passwort-Kombination!");
	}
}