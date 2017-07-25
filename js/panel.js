"use strict";
//externes Panel aufbauen
$(function() {
	$("#menu").enhanceWithin().panel();
});

//Panel per Swipe öffnen
$(function () {
    //Bei Swipe auf allen Pages wird Panel geöffnet
    $(document).on("swiperight", "#home, #scanpage, #katalog, #log-in, #verlauf, #einstellungen, #map-page, #legal", function (e) {
        if (e.type === "swiperight") {
            $("#menu").panel("open");
        }
    });
});
