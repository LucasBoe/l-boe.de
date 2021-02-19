var counter = 0;
var transitionHeight = '100%';

function OpenProject (project) {

    openProject = project;
    counter +=1;

    open = true;
    SlidersPause();

    var transitionSpeed = 0.25;

    var target = project.getAttribute("target");
    var rect = project.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    var imageSource = project.children[0].getAttribute("src");

      $("#projectPage").addClass("projectPage");
      $("#projectPage").css("opacity" , 0)
      document.getElementById("projectPage").innerHTML='<object type="text/html" data="' + target + '.html" id="FrameContainer"></object>';

    //activate the projectPage Overlay
    $("#projectTransition").addClass("projectPage");
    $("#projectTransition").html("<div id='header'><img src = " + imageSource + " id='i'></img></div>");

    transitionHeight = window.innerWidth / $("#i")[0].width * $("#i")[0].height;

    $.keyframe.define([{
        name: 'imageTransition' + counter,
          '0%': {
            'width' : rect.right - rect.left +'px',
            'height' : rect.bottom - rect.top + 'px',
            'margin-top' : rect.top + 'px',
            'margin-left' : rect.left + 'px'
          },

          
          '100%': {
            'width' : '100vw',
            'height' : transitionHeight + 'px',
            'margin-top' : '0px',
            'margin-left' : '0px'
          }
      }]);

    console.log("used for transition: " + transitionHeight);

    $("#i").playKeyframe({
      name: 'imageTransition' + counter,
      duration: transitionSpeed + "s",
      timingFunction: 'ease'
    });

    $("#mainPage").fadeTo (100, 0);

    setTimeout(function(){
      $("#projectPage").fadeTo( transitionSpeed * 1000, 1 );
      //var stateObj = { index: "project" }; 
      //history.pushState(stateObj, "_project", "__project");
    },transitionSpeed*1000);


}

function CloseProjectPage() {

    counter +=1;

    $("#projectPage").removeClass("projectPage");
    $("#projectPage").html("");

    var closeSpeed = 0.25;
    var rect = openProject.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    
    $.keyframe.define([{
        name: 'imageTransition' + counter,
          '0%': {
            'width' : '100vw',
            'height' : transitionHeight + 'px',
            'margin-top' : '0px',
            'margin-left' : '0px'
          },
          '100%': {
            'width' : rect.right - rect.left +'px',
            'height' : rect.bottom - rect.top + 'px',
            'margin-top' : rect.top + 'px',
            'margin-left' : rect.left + 'px'
          }
      }]);

    $("#i").playKeyframe({
      name: 'imageTransition' + counter,
      duration: closeSpeed + "s",
      timingFunction: 'ease'
    });

    $("#mainPage").fadeTo (100, 1);

    setTimeout(function(){
      $("#projectTransition").removeClass("projectPage");
      $("#projectTransition").html("");
      SlidersResume();
      open = false;
    },closeSpeed*1000);
}

function TransformToContactPage() {

  if ($(window).width() > 1000)
  {
    var element = document.getElementById("sliderTop");
    //element.classList.add("contactPageTranslationUp");
    element.style.transform = "translate(0,-20vh)";

    var element = document.getElementById("sliderBottom");
    //element.classList.add("contactPageTranslationDown");
    if (element != null) {
    element.style.transform = "translate(0,20vh)";
    }

    SlidersPause();

    document.getElementsByClassName("middle")[0].innerHTML = "";
  }

  /*
  var overlay = document.getElementById("overlay");
  overlay.disabled = true;

  $("#overlay").children().prop('disabled',true);
  console.log(overlay.disabled);
  */
  document.getElementById("contactPage").innerHTML = '<div id="overlay"><div id="close" class="icon">+<span class="label">Back</span></div><h1>Lucas B&ouml;deker</h1><img src="me.jpg"><div id="text"><p>Game Designer.</p><p>Making games is my passion. I love interesting Concept, compelling prototypes and stunning experiences. Always interested in new Ideas to follow, things to learn and opportunities to grow.</p><p>Student at UE Berlin - BTK</p></div></div>';

  open = true;

  var close = document.getElementById ("close");
  console.log(close);
  //if (close != null) {
  close.addEventListener ("click", function() {
  TransformToMainPage();
  }, false);
  //}

  //$("#overlay").load("content.html");

  /*
  var middleL = document.getElementById("mLeft");
  //middle.style.height = "auto";
  $("#mLeft").css("width", "40vw");
  middleL.style.display= "inline-block";

  var middleR = document.getElementById("mRight");
  //middle.style.height = "auto";
  middleR.style.width = "40vw";
  middleR.style.display= "inline-block";

  var text = document.getElementById("middleText");
  //text.style.transform = "translate(0,-20vh)";
  text.firstChild.data = "Lucas Boedeker";

  var middleText = document.getElementById("mText");
  //middle.style.height = "auto";
  middleText.firstChild.data = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,"
  +" sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,"
  +" sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  +" Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
  +" At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,"
  +" no sea takimata sanctus est Lorem ipsum dolor sit amet.";
  */
};

function MobileTransformation () {
  $("#projectsBottom").children().appendTo("#projectsTop");
  $("#sliderBottom").remove();
  $(".middle").appendTo(".mainPage");
}

function SlidersPause () {
    var sliders = document.getElementsByClassName('projects');
  for(i=0; i<sliders.length; i++) {
    sliders[i].style.animationPlayState = "paused";
  };
}

function SlidersResume () {
    var sliders = document.getElementsByClassName('projects');
  for(i=0; i<sliders.length; i++) {
    sliders[i].style.animationPlayState = "running";
  };
}

function TransformToMainPage () {
  if ($(window).width() > 1000) {
    var element = document.getElementById("sliderTop");
    //element.classList.add("contactPageTranslationUp");
    element.style.transform = "translate(0,0)";

    var element = document.getElementById("sliderBottom");
    //element.classList.add("contactPageTranslationDown");
    element.style.transform = "translate(0,0)";

    var sliders = document.getElementsByClassName('projects');
    for(i=0; i<sliders.length; i++) {
      sliders[i].style.animationPlayState = "running";
    };
  }

  document.getElementsByClassName("middle")[0].innerHTML = "<h1 id ='middleText'>Lucas Bödeker</h1><h2>Contact Me!</h2>";
  document.getElementById("contactPage").innerHTML = "";

  open = false;
}
function SliderElementsDuplicate() {
  $("#projectsTop").clone(true).appendTo("#sliderTop");
  $("#projectsBottom").clone(true).appendTo("#sliderBottom");
}


function SlidersCalculate() {
  //Slider Top
  var topMaxWidth = 0;
  $("#sliderTop .projects .project").each(function(){
    console.log($(this).width());
    topMaxWidth += $(this).width();
  })

  topMaxWidth+=1;

  Topwidth = topMaxWidth/2;

  console.log("all-projects:");
  console.log(topMaxWidth);

  console.log("projects-width:");
  $("#mainPage #sliderTop .projects").css("width", Topwidth + "px");
    //console.log($("#mainPage #sliderTop .projects").width());

  console.log("slider-width:");
  $("#mainPage #sliderTop").css("width", topMaxWidth + "px");
    //console.log($("#mainPage #sliderTop").width());

      //Slider Bottom
  var BottomMaxWidth = 0;
  $("#sliderBottom .projects .project").each(function(){
    console.log($(this).width());
    BottomMaxWidth += $(this).width();
  })

  BottomMaxWidth+=1;

  Bottomwidth = BottomMaxWidth/2;

  //console.log("all-projects:");
  //console.log(BottomMaxWidth);

  console.log("projects-width:");
  $("#mainPage #sliderBottom .projects").css("width", Bottomwidth + "px");
    //console.log($("#mainPage #sliderBottom .projects").width());

  console.log("slider-width:");
  $("#mainPage #sliderBottom").css("width", BottomMaxWidth + "px");
    //console.log($("#mainPage #sliderBottom").width());

  $.keyframe.define([{
    name: 'moveRight',
    '0%': {'transform' : 'translate('+ -Topwidth +'px)'},
    '100%': {'transform' : 'translate(0)'}
  }]);

  $.keyframe.define([{
    name: 'moveLeft',
    '0%': {'transform' : 'translate(0)'},
    '100%': {'transform' : 'translate(' + -Bottomwidth + 'px)'}
  }]);
}

function SlidersPlay () {

  $("#sliderTop .projects").playKeyframe({
    name: 'moveRight',
    duration: "45s",
    timingFunction: 'linear',
    iterationCount: 'infinite'
  });

  $("#sliderBottom .projects").playKeyframe({
    name: 'moveLeft',
    duration: "45s",
    timingFunction: 'linear',
    iterationCount: 'infinite'
  });

  if (open == true) {
    $(".projects").animationPlayState = "paused";
    console.log("play the animation (but paused):");
  } else {
    $(".projects").animationPlayState = "running";
    console.log("play the animation:");
  }
}

$(function () {
  var open = false;
  var openProject = null;
})

window.onresize = function(event) {
  location.reload()
};

$('div.middle').click(function(){
      TransformToContactPage();
    });

/*
$('div.middle').hover(function() 
  {
    this.innerHTML = "<h1 id ='middleText'>Lucas Bödeker</h1><h2>Contact Me!</h2>";
    //this.text($("h1").html("Contact Me!"));
  }, function() {
     this.innerHTML = "<h1 id ='middleText'>Lucas Bödeker</h1>";
  });
*/

$(document).ready(function () {
	
	$(".slider").fadeTo (0, 0);

    if ($(window).width() > 1000) {
    SliderElementsDuplicate();
  } else {
    MobileTransformation();
  }
  
});

$(document).ready(function () {

    if ($(window).width() > 1000) {
		setTimeout(function(){
			console.log("play delayed");
			SlidersCalculate();
			SlidersPlay();
			$(".slider").fadeTo (1000, 1);
		},100);
	}

  window.onmessage = function(e){
    if (e.data.command == 'close') {
        CloseProjectPage();
    }
    if (e.data.command == 'resize') {
      //$("#FrameContainer").height(e.data.size);
    }
    if (e.data.command == 'headerHeight') {
      //transitionHeight = e.data.height;
    }
};

  $('div.project').click(function(){
  console.log("clicked on project");

  if (open == true) {
    console.log("return to original layout");
    TransformToMainPage();
  } else {
    console.log("enter a project page");
    OpenProject(this);
  }
})
});
