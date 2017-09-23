/* exported buttonPush */
'use strict';
// Standardindex deklarieren
var bildIndex = 1;
// Funktion buttonPush und slideBild
// Änderung des Bildindexes
function buttonPush(n) {
    slideBild(bildIndex += n);
}
// Änderung des Bildes entsprechend dem Index
function slideBild(n) {
    let bilder = $('.bilder');
    if (n > bilder.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = bilder.length;
    }
    for (let i in bilder) {
        bilder[i].style.display = 'none';
    }
    bilder[bildIndex - 1].style.display = 'block';
}
//Erstmalige Ausführung der Funktion
$('window').load(() => {
    slideBild(bildIndex);
});