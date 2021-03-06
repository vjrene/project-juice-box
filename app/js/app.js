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

//mobile and desktop
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
  if(isDrawing) {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

c.onmouseup = function(e) {
  e.preventDefault();
  isDrawing = false;
} 

//timer
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

function initializeClock(id, endtime) {
  var clock = document.getElementById('timer');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
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
}
var deadline = new Date(Date.parse(new Date()) + 2 * 60 * 1000);
initializeClock('timer', deadline);
