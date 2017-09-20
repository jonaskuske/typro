'use strict';
var rClick;
//Rechtsklick deaktivieren
$(() => {
    $(this).bind('contextmenu', e => {
        if (!rClick) { e.preventDefault(); }
    });
});
// Dauer Anzeige Splash Page
setTimeout(() => {
    if ($.mobile.activePage[0].id === 'splash') {
        $(':mobile-pagecontainer').pagecontainer('change', $('#home'));
    }
}, 2000);