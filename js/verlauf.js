// Auslesen der Bilder aus dem Local Storage und Anzeigen auf Verlauf-Seite
$(document).on("pageshow", "#verlauf", function () {
	"use strict";
	// Falls Bilder in lStorage: Anzeigen
	if (localStorage.getItem("picArray") !== null) {
		var verlaufArray;
		var verlaufArrayL;
		// Array aus lStorage abrufen & Länge ermitteln
		verlaufArray = JSON.parse(localStorage.getItem("picArray"));
		verlaufArrayL = verlaufArray.length;
		// Daten aus Array darstellen
		for (var i = 0; i < verlaufArrayL; i++) {
			$("#content_verlauf").append('<img class="verlaufPic" src =' + verlaufArray[i] + '>');
		}
	}
});