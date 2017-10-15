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
        $('#slideshow').prepend(`<img src="../img/fonts/${bild}" class="bilder" style="display: ${display}"/>`);
    });
}
//
// cycle through imgs in slideshow
var bildIndex = 1; // default index
// change index on button push (from HTML)
function buttonPush(n) { // eslint-disable-line no-unused-vars
    slideBild(bildIndex += n);
}
// display new image according to index
function slideBild(n) {
    let bilder = $('.bilder');
    if (n > bilder.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = bilder.length;
    }
    for (let i = 0; i < bilder.length; i++) {
        bilder[i].style.display = 'none';
    }
    bilder[bildIndex - 1].style.display = 'block';
}
// run function on pageload
$('window').load(() => { (slideBild(bildIndex)); });