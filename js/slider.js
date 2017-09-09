"use strict";
// Standardindex deklarieren
var bildIndex = 1;
// Funktion buttonPush und slideBild für jedes List-Item in Katalog-Seite einzeln / Immer gleiche Funktionsweise
// Änderung des Bildindexes
function buttonPush_a(n) {
    slideBild_a(bildIndex += n);
}
// Änderung des Bildes entsprechend dem Index
function slideBild_a(n) {
    var i;
    var x = $(".bilder_a");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}
//Erstmalige Ausführung der Funktion
$("window").load(function () {
    slideBild_a(bildIndex);
});


function buttonPush_b(n) {
    slideBild_b(bildIndex += n);
}

function slideBild_b(n) {
    var i;
    var x = $(".bilder_b");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_b(bildIndex);
});

function buttonPush_c(n) {
    slideBild_c(bildIndex += n);
}

function slideBild_c(n) {
    var i;
    var x = $(".bilder_c");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_c(bildIndex);
});

function buttonPush_d(n) {
    slideBild_d(bildIndex += n);
}

function slideBild_d(n) {
    var i;
    var x = $(".bilder_d");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_d(bildIndex);
});

function buttonPush_e(n) {
    slideBild_e(bildIndex += n);
}

function slideBild_e(n) {
    var i;
    var x = $(".bilder_e");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_e(bildIndex);
});

function buttonPush_f(n) {
    slideBild_f(bildIndex += n);
}

function slideBild_f(n) {
    var i;
    var x = $(".bilder_f");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_f(bildIndex);
});

function buttonPush_g(n) {
    slideBild_g(bildIndex += n);
}

function slideBild_g(n) {
    var i;
    var x = $(".bilder_g");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_g(bildIndex);
});

function buttonPush_h(n) {
    slideBild_h(bildIndex += n);
}

function slideBild_h(n) {
    var i;
    var x = $(".bilder_h");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_h(bildIndex);
});

function buttonPush_i(n) {
    slideBild_i(bildIndex += n);
}

function slideBild_i(n) {
    var i;
    var x = $(".bilder_i");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_i(bildIndex);
});

function buttonPush_j(n) {
    slideBild_j(bildIndex += n);
}

function slideBild_j(n) {
    var i;
    var x = $(".bilder_j");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_j(bildIndex);
});

function buttonPush_k(n) {
    slideBild_k(bildIndex += n);
}

function slideBild_k(n) {
    var i;
    var x = $(".bilder_k");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_k(bildIndex);
});

function buttonPush_l(n) {
    slideBild_l(bildIndex += n);
}

function slideBild_l(n) {
    var i;
    var x = $(".bilder_l");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_l(bildIndex);
});

function buttonPush_m(n) {
    slideBild_m(bildIndex += n);
}

function slideBild_m(n) {
    var i;
    var x = $(".bilder_m");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_m(bildIndex);
});

function buttonPush_n(n) {
    slideBild_n(bildIndex += n);
}

function slideBild_n(n) {
    var i;
    var x = $(".bilder_n");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_n(bildIndex);
});

function buttonPush_o(n) {
    slideBild_o(bildIndex += n);
}

function slideBild_o(n) {
    var i;
    var x = $(".bilder_o");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_o(bildIndex);
});

function buttonPush_p(n) {
    slideBild_p(bildIndex += n);
}

function slideBild_p(n) {
    var i;
    var x = $(".bilder_p");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_p(bildIndex);
});

function buttonPush_q(n) {
    slideBild_q(bildIndex += n);
}

function slideBild_q(n) {
    var i;
    var x = $(".bilder_q");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_q(bildIndex);
});

function buttonPush_r(n) {
    slideBild_r(bildIndex += n);
}

function slideBild_r(n) {
    var i;
    var x = $(".bilder_r");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_r(bildIndex);
});

function buttonPush_s(n) {
    slideBild_s(bildIndex += n);
}

function slideBild_s(n) {
    var i;
    var x = $(".bilder_s");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_s(bildIndex);
});

function buttonPush_t(n) {
    slideBild_t(bildIndex += n);
}

function slideBild_t(n) {
    var i;
    var x = $(".bilder_t");
    if (n > x.length) {
        bildIndex = 1;
    }
    if (n < 1) {
        bildIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[bildIndex - 1].style.display = "block";
}

$("window").load(function () {
    slideBild_t(bildIndex);
});