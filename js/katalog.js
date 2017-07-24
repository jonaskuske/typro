// Katalog Javascript (XML)
"use strict";
// Funktion für jedes Listitem auf Katalogseite einzeln / Immer gleiche Funktionsweise
//Beim Laden v. Katalog: Funktion starten
$(document).on("pageshow", "#katalog", function (){

//XML Dokument laden
$.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

           //Überkategorie "font" für Index 0 finden und hierfür Funktion starten
            $(xml).find( "font:eq(0)").each(function () {
                var font = $(this);
                // Kategorie "name", "designer" & "jahr" in XML finden und speichern
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                // gespeicherte Infos in HTML einbinden: Überschrift + Text-Infos
                $(".h1_a").append(name);
                $(".text_a").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

});
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(1)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_b").append(name);
                $(".text_b").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(2)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_c").append(name);
                $(".text_c").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(3)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_d").append(name);
                $(".text_d").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(4)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_e").append(name);
                $(".text_e").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(5)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_f").append(name);
                $(".text_f").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(6)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_g").append(name);
                $(".text_g").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(7)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_h").append(name);
                $(".text_h").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(8)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_i").append(name);
                $(".text_i").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(9)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_j").append(name);
                $(".text_j").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(10)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_k").append(name);
                $(".text_k").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(11)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_l").append(name);
                $(".text_l").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(12)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_m").append(name);
                $(".text_m").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(13)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_n").append(name);
                $(".text_n").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(14)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_o").append(name);
                $(".text_o").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(15)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_p").append(name);
                $(".text_p").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(16)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_q").append(name);
                $(".text_q").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(17)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_r").append(name);
                $(".text_r").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");

            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(18)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_s").append(name);
                $(".text_s").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});


$(document).on("pageshow", "#katalog", function (){


    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function(xml) {

            $(xml).find( "font:eq(19)").each(function () {

                var font = $(this);
                var name = $(font).find("name").text();
                var designer = $(font).find("designer").text();
                var jahr = $(font).find("jahr").text();
                $(".h1_t").append(name);
                $(".text_t").append("<p><b>Designer:</b> "+designer+"</p><p><b>Jahr: </b>"+jahr+"</p>");
            })


        }

    });
});