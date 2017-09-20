'use strict';
//externes Panel aufbauen
$(() => {
    $('#menu').enhanceWithin().panel();
});

//Panel per Swipe öffnen
$(() => {
    //Bei Swipe auf allen Pages wird Panel geöffnet
    $(document).on('swiperight', '#home, #scanpage, #katalog, #log-in, #verlauf, #einstellungen, #map-page, #legal, #detail', e => {
        if (e.type === 'swiperight') {
            $('#menu').panel('open');
        }
    });
});
