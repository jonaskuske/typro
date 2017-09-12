/* global currentDetail, detailRef:true */
/* exported openPopup */
'use strict';
//Beim öffnen von Popup: Daten aus XML abrufen und in Popup schreiben
function openPopup(selection) {
    $.ajax({
        type: 'GET',
        url: '../xml/fonts.xml',
        dataType: 'xml',
        success: function (xml) {
            let name, designer, jahr;
            let images = [];
            $(xml).find(selection).each(function (a, font) {
                $(font).find('name').each(function (b, N) {
                    name = $(N).text();
                });
                $(font).find('designer').each(function (c, D) {
                    designer = $(D).text();
                });
                $(font).find('jahr').each(function (d, J) {
                    jahr = $(J).text();
                });
                $(font).find('images').each(function (e, I) {
                    $(I).find('img').each(function (f, img) {
                        images.push($(img).text());
                    });
                });
            });
            $('.bilder').remove();
            $('.h1_popup').html(name);
            $('#designer').html(designer);
            $('#jahr').html(jahr);
            if (images.length === 1) { $('.sliderButton').addClass('disabled'); } else { $('.sliderButton').removeClass('disabled'); }
            for (let i = 0; i < images.length; i++) {
                let displayType;
                if (i === 0) { displayType = 'block'; } else { displayType = 'none'; }
                $('#banner_popup').append('<img src="' + images[i] + '" class="bilder" style="display: ' + displayType + '"/>');
            }
        },
        error: function (err) {
            console.warn('Ajax/XML Error:' + err);
        }
    });
}
// Prüfen, ob Verlinkung von Scan-Detailseite, falls ja entsprechende Schrift anzeigen
function checkRef() {
    if (detailRef) {
        $(currentDetail.id)[0].scrollIntoView();
        $(currentDetail.id).click();
        detailRef = false;
    }
}
$(checkRef());