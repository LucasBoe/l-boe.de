$(function() {

	console.log("is loaded");

	$('#nav').onePageNav();

  $('#page').scroll(function() {

    var s =  - $(this).scrollTop() / 2 + 'px';
    console.log(s);

    $('#side').css({'margin-top': s});
  });
});