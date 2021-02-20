randomiseImage = function () {
  n = Math.floor((Math.random() * 8));
  sessionStorage.setItem('imageId', n);
};

randomiseColor = function () {
  c = Math.floor(Math.random() * 360);
  sessionStorage.setItem('colorHue', c);
};

applyRandomBackground = function () {

console.log("apply random background...");

  body = $("#content");
  
  for (let index = 0; index < 2; index++) {
    body.css("background-image", "url(' ../../../img/pattern/" + images[n] +"')");
    body.css("background-color", colorsys.hsv2Hex(c,100,15));
  
    //for testing purpose I want the system to also work on my local machine
    if (window.location.protocol == 'file:') {
      body.css("background-image", "url('img/pattern/" + images[n] +"')");
    }
  
    //not elegant but serves the purpose
    if (n == 4 || n == 5) {
      body.css("background-size", "4vw");
    } else {
      body.css("background-size", "1.5vw");
    }

    body = $("body");
  }
}

var images = ['patternDiagonal.png',
              'patternDiagonalInv.png',
              'patternRound.png',
              'patternRoundInv.png',
              'patternRainbow.png',
              'patternRainbowInv.png',
              'patternTessalatedHex.png',
              'patternTessalatedHexInv.png'];

var n = sessionStorage.getItem('imageId');
var c = sessionStorage.getItem('colorHue');

if (n === null) {
  randomiseImage();
}

if (c === null) {
  randomiseColor();
}

$(document).ready(function () {

    var idName = "newBackgroundTriangle";
    $('body').append($('<div>', {id: idName}));

    applyRandomBackground();

    $("#newBackgroundTriangle").click(function() {
      randomiseImage();
      randomiseColor();
      applyRandomBackground();
  });
});


//colorsys borrowed from: http://netbeast.github.io/colorsys/browser.js

const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

var colorsys = window.colorsys = {}

colorsys.hsv2Rgb = function (h, s, v) {
  if (typeof h === 'object') {
    const args = h
    h = args.h; s = args.s; v = args.v;
  }

  h = h === HUE_MAX ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
  s = s === SV_MAX ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
  v = v === SV_MAX ? 1 : (v % SV_MAX / parseFloat(SV_MAX))

  var i = Math.floor(h)
  var f = h - i
  var p = v * (1 - s)
  var q = v * (1 - f * s)
  var t = v * (1 - (1 - f) * s)
  var mod = i % 6
  var r = [v, q, p, p, t, v][mod]
  var g = [t, v, v, q, p, p][mod]
  var b = [p, p, t, v, v, q][mod]

  return { r: Math.round(r * RGB_MAX), g: Math.round(g * RGB_MAX), b: Math.round(b * RGB_MAX) }
}

colorsys.rgb2Hex = function (r, g, b) {
  if (typeof r === 'object') {
    const args = r
    r = args.r; g = args.g; b = args.b;
  }
  r = Math.round(r).toString(16)
  g = Math.round(g).toString(16)
  b = Math.round(b).toString(16)

  r = r.length === 1 ? '0' + r : r
  g = g.length === 1 ? '0' + g : g
  b = b.length === 1 ? '0' + b : b

  return '#' + r + g + b
}

colorsys.rgb_to_hex = colorsys.rgb2Hex
colorsys.rgbToHex = colorsys.rgb2Hex

colorsys.hex2Rgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

colorsys.hsv2Hex = function (h, s, v) {
  var rgb = colorsys.hsv2Rgb(h, s, v)
  return colorsys.rgb2Hex(rgb.r, rgb.g, rgb.b)
}