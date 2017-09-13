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
    if ($.mobile.activePage[0].id === 'splash') {
        $(':mobile-pagecontainer').pagecontainer('change', $('#home'));
    }
}, 2000);