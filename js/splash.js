"use strict";
var headerH; //Höhe des Headers für späteren Zugriff
//Rechtsklick deaktivieren
 $(function() {
        $(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    });
//Höhe des Headers abfragen
$(document).on("pageshow", "#home", function(){
headerH =  $("#header").outerHeight();
});
// Dauer Anzeige Splash Page
setTimeout(function () {
$(":mobile-pagecontainer").pagecontainer("change", $("#home"));
}, 2000);