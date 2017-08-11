"use strict";
var verlaufUser;

// Auslesen der Bilder aus dem Local Storage und Anzeigen auf Verlauf-Seite
$(document).on("pageshow", "#verlauf", function () {
	//Falls User eingeloggt: Name abfragen
	if (localStorage.getItem("username") !== null){
		verlaufUser = " von " + localStorage.getItem("username");
	}
	else {
		verlaufUser = "";
	};
	//Titel+User darstellen
	$("#content_verlauf").prepend("<h2>Scanverlauf"+verlaufUser+"</h2>");
	// Falls Bilder in lStorage: Abrufen und in Array speichern
	if (localStorage.getItem("picArray") !== null) {
		var verlaufArray = JSON.parse(localStorage.getItem("picArray"));
		// Daten aus Array darstellen
		for (var i = 0; i < verlaufArray.length; i++) {
			$("#previewCollection").append('<div class="verlaufBox"><div class="verlaufPic" style="background-image: url(' + verlaufArray[i] + ');"></div></div>');
		}
	}
});