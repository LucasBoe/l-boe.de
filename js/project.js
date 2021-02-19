$(document).ready(function () {

  var close = document.getElementById ("close");
  close.addEventListener ("click", function() {
  CloseProjectPage();
  }, false);

  var headerHeight = $("#headerImage").height()-1;
  //var headerWidth = $("#headerImage").width();
  //$("#headerOverlay").height(headerHeight);

  /*
  //alert(totalHeight);
  setTimeout(function() {
    var totalHeight = $("#projectDetailPage").height();
    console.log(totalHeight);
    window.top.postMessage({command:'resize', size : totalHeight + 'px'}, '*');
  }, 3000);*/

  window.top.postMessage({command:'resize', size : window.innerHeight + 'px'}, '*');
  window.top.postMessage({command:'headerHeight', height : headerHeight + 'px'}, '*');
  console.log("submit: " + headerHeight);

});

window.onresize = function(event) {
  var headerHeight = $("#headerImage").height();
  $("#headerOverlay").height(headerHeight); 
}

  function CloseProjectPage() {
    window.top.postMessage({command:'close'}, '*')
  }