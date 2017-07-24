$(document).on("pageshow", "#verlauf", function(){
    "use strict";
    if (localStorage.getItem("PicArray") === null) {
        PicArray=[];
        localStorage.setItem("PicArray", JSON.stringify(PicArray));
    }
    var VerlaufArray;
    var VerlaufArrayL;
    VerlaufArray = JSON.parse(localStorage.getItem("PicArray"));
    VerlaufArrayL = VerlaufArray.length;
    for ( var i=0; i<VerlaufArrayL; i++ ) {
        $("#content_verlauf").append('<img style="margin: 5px; " src ='+VerlaufArray[i]+'>');
    }
});