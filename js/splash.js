'use strict';
$(document).bind('mobileinit', () => {
    $.mobile.defaultPageTransition = 'none';
});
// Dauer Anzeige Splash Page
setTimeout(() => {
    if ($.mobile.activePage[0].id === 'splash') {
        $(':mobile-pagecontainer').pagecontainer('change', $('#home'));
    }
}, 1500);
//Rechtsklick deaktivieren
var rClick;
$(() => {
    $(this).bind('contextmenu', e => {
        if (!rClick) { e.preventDefault(); }
    });
});