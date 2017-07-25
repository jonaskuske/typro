// Auslesen der Bilder aus dem Local Storage und Anzeigen auf Verlauf-Seite
$(document).on("pageshow", "#verlauf", function(){
    "use strict";
	// Prüfen ob Eintrag in lStorage vorhanden, wenn nicht: Erstellen
    if (localStorage.getItem("picArray") === null) {
        picArray=[];
        localStorage.setItem("picArray", JSON.stringify(picArray));
    }
    var verlaufArray;
    var verlaufArrayL;
	// Array aus lStorage abrufen & Länge ermitteln
    verlaufArray = JSON.parse(localStorage.getItem("picArray"));
    verlaufArrayL = verlaufArray.length;
	// Daten aus Array darstellen
    for ( var i=0; i<verlaufArrayL; i++ ) {
        $("#content_verlauf").append('<img class="verlaufPic" src ='+verlaufArray[i]+'>');
    }
});
