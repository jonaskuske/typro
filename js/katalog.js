/* global currentDetail, detailRef:true */
/* exported openPopup */
'use strict';
var configured;
//Beim öffnen von Popup: Daten aus XML abrufen und in Popup schreiben
$(document).on('click', '.fontPopup', evt => {
    if (!configured) {
        evt.preventDefault();
        $.ajax({
            type: 'GET',
            url: '../xml/fonts.xml',
            dataType: 'xml',
            success: xml => {
                let name, designer, jahr;
                let images = [];
                $(xml).find(evt.target.id).each((a, font) => {
                    $(font).find('name').each((b, N) => {
                        name = $(N).text();
                    });
                    $(font).find('designer').each((c, D) => {
                        designer = $(D).text();
                    });
                    $(font).find('jahr').each((d, J) => {
                        jahr = $(J).text();
                    });
                    $(font).find('images').each((e, I) => {
                        $(I).find('img').each((f, img) => {
                            images.push($(img).text());
                        });
                    });
                });
                $('.bilder').remove();
                $('.h1_popup').html(name);
                $('#designer').html(designer);
                $('#jahr').html(jahr);
                if (images.length === 1) { $('.sliderButton').addClass('disabled'); } else { $('.sliderButton').removeClass('disabled'); }
                images.forEach((image, index) => {
                    let displayType;
                    index === 0 ? displayType = 'block' : displayType = 'none';
                    $('#banner_popup').prepend(`<img src="${image}" class="bilder" style="display: ${displayType}"/>`);
                });
                configured = true;
                $(`#${evt.target.id}`).click();
            },
            error: err => {
                console.warn('Ajax/XML Error:' + err);
            }
        });
    } else {
        configured = false;
    }
});
// Prüfen, ob Verlinkung von Scan-Detailseite, falls ja entsprechende Schrift anzeigen
function checkRef() {
    if (detailRef) {
        $(`#${currentDetail.id}`)[0].scrollIntoView();
        $(`#${currentDetail.id}`).click();
        detailRef = false;
    }
}
$(document).on('pageshow', '#katalog', () => {
    checkRef();
});