/* exported openPopup */
'use strict';
//Beim öffnen von Popup: Daten aus XML abrufen und in Popup schreiben
$(() => {
    let configured;
    $('#content_katalog ul li a').click(evt => {
        if (!configured) {
            evt.preventDefault();
            $.ajax({
                url: '../xml/fonts.xml',
                success: xml => {
                    let font = $(xml).find(evt.target.id);
                    let name, designer, jahr, bilder = [];
                    name = font.find('name').text();
                    designer = font.find('designer').text();
                    jahr = font.find('jahr').text();
                    font.find('images').find('img').each((_, img) => {
                        bilder.push($(img).text());
                    });
                    configurePopup(name, designer, jahr, bilder);
                    configured = true;
                    $(`#${evt.target.id}`).click();
                }
            });
        } else {
            configured = false;
        }
    });
});
function configurePopup(n, d, j, b) {
    $('#fontName').html(n);
    $('#designer').html(d);
    $('#jahr').html(j);
    $('.bilder').remove();
    (b.length === 1) ? $('.sliderButton').addClass('disabled') : $('.sliderButton').removeClass('disabled');
    b.forEach((bild, index) => {
        let display;
        index === 0 ? display = 'block' : display = 'none';
        $('#slideshow').prepend(`<img src="${bild}" class="bilder" style="display: ${display}"/>`);
    });
}