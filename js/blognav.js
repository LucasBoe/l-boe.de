$(document).ready(function () {

    var otherText = "show other posts ↓";
    $('a#toggle').html(otherText);

    $('a#toggle').click(function(){

    var nav = $('#blognav');

    if (nav.hasClass("blognav_disabled")) {
        nav.removeClass("blognav_disabled");
        $(this).html( "show less");
    } else {
        nav.addClass("blognav_disabled");
        $(this).html(otherText);
    }
  })
});