'use strict';
//externes Panel aufbauen
//Panel per Swipe öffnen
$(() => {
    //externes Panel aufbauen
    $('#menu').enhanceWithin().panel();
    //Bei Swipe auf allen Pages wird Panel geöffnet
    $(document).on('swiperight', e => {
        if (e.type === 'swiperight') {
            $('#menu').panel('open');
        }
    });
});
