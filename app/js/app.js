//responsive canvas
$(document).ready(function() {
  //get canvas and context
  var c = $('#juice-canvas');
  var ctx = c.get(0).getContext('2d');
  var container = $(c).parent();
  //when browser resizes
  $(window).resize(responsiveCanvas);
  function responsiveCanvas() {
    c.attr('width', $(container).width()); //max width
    c.attr('height', $(container).height()); //max height
  }
  responsiveCanvas();
});

//mobile and desktop canvas functionality
var c = document.getElementById('juice-canvas');
var ctx = c.getContext('2d');
var isDrawing = false;
ctx.strokeStyle = '#333';
ctx.lineWidth = 2;
//touch
c.addEventListener('touchstart', function(e) {
  var rect = c.getBoundingClientRect();
  var x = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * c.width);
  var y = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * c.height);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  c.dispatchEvent(mouseEvent);
}, false);

c.addEventListener('touchmove', function(e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  c.dispatchEvent(mouseEvent);
}, false);

c.addEventListener('touchend', function(e) {
  var mouseEvent = new MouseEvent('mouseup', {});
  c.dispatchEvent(mouseEvent);
}, false);
//mouse
c.onmousedown = function(e) {
  e.preventDefault();
  var rect = c.getBoundingClientRect();
  var x = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * c.width);
  var y = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * c.height);
  isDrawing = true;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.moveTo(x,y);
}

c.onmousemove = function(e) {
  e.preventDefault();
  var rect = c.getBoundingClientRect();
  var x = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * c.width);
  var y = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * c.height);
  if (isDrawing) {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

c.onmouseup = function(e) {
  e.preventDefault();
  isDrawing = false;
} 

var playGame = document.getElementById('play-game');
var juiceTitle = document.getElementById('juice-head');
var prompt = document.getElementById('toprompt');
var startGame = document.getElementById('start-game');
playGame.addEventListener("click", function(e) {
  //hide title when clicked
  juiceTitle.style.display = 'none';
  playGame.style.display = 'none';
  prompt.style.display = 'none';
  startGame.style.display = 'none';

  //only start timer when play is hit
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  var deadline = new Date(Date.parse(new Date()) + 2 * 60 * 1000);

  function updateClock() {
    var t = getTimeRemaining(deadline);
    var minutesSpan = document.getElementById('minutes');
    var secondsSpan = document.getElementById('seconds');
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
  updateClock();
  var timeInterval = setInterval(updateClock, 1000);
});
