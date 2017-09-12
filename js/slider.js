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
    let i;
    let x = $('.bilder');
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    x[bildIndex - 1].style.display = 'block';
}
//Erstmalige Ausführung der Funktion
$('window').load(function () {
    slideBild(bildIndex);
});