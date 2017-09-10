'use strict';
var rClick;
//Rechtsklick deaktivieren
$(function () {
    $(this).bind('contextmenu', function (e) {
        if (!rClick) { e.preventDefault(); }
    });
});
// Dauer Anzeige Splash Page
setTimeout(function () {
    $(':mobile-pagecontainer').pagecontainer('change', $('#home'));
}, 2000);