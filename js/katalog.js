// Katalog Javascript (XML)
"use strict";
// Funktion für jedes Listitem auf Katalogseite einzeln / Immer gleiche Funktionsweise
//Beim Laden v. Katalog: Funktion starten
$(document).on("pageshow", "#katalog", function () {

//XML Dokument laden
    $.ajax({
        type: "GET",
        url: "../xml/fonts.xml",
        dataType: "xml",
        success: function (xml) {

            $(document).ready(function () {

                var arrN = [];
                var arrH = [];
                var arrT = [];
                var arrD = [];
                var arrJ = [];

                $(xml).find("name").each(function (e, f) {
                    $(f).find("item").each(function (g, h) {
                        arrN.push($(h).text());
                    });
                });
                $(xml).find("headerNo").each(function (e, f) {
                    $(f).find("item").each(function (g, h) {
                        arrH.push($(h).text());
                    });
                });
                $(xml).find("textNo").each(function (e, f) {
                    $(f).find("item").each(function (g, h) {
                        arrT.push($(h).text());
                    });
                });
                $(xml).find("designer").each(function (e, f) {
                    $(f).find("item").each(function (g, h) {
                        arrD.push($(h).text());
                    });
                });
                $(xml).find("jahr").each(function (e, f) {
                    $(f).find("item").each(function (g, h) {
                        arrJ.push($(h).text());
                    });
                });

                for (var i = 0; i < arrN.length; i++) {
                    $(arrH[i]).append(arrN[i]);
                    $(arrT[i]).append("<p><b>Designer:</b> " + arrD[i] + "</p><p><b>Jahr: </b>" + arrJ[i] + "</p>");
                }
            });
        }
    });
});