lastPixs = false;
$('#projectPage').on('scroll', function () {
      var pixs = $('#projectPage').scrollTop()
      pixs = Math.min(pixs / 50, 10);

      if (Math.abs(pixs - lastPixs) > 2 || pixs == 0) {
      $(".blurOnScroll").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" })
      lastPixs = pixs; 
      } 
});