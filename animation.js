var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circle = document.getElementById("circle");
var dvd = document.getElementById("dvd");
var stop = document.getElementById("stop");

var img = new Image();
img.src = "http://i1-news.softpedia-static.com/images/news2/get-your-windows-10-dvd-player-app-alternatives-488756-3.jpg";
var rid = 0;

/* start drawing */
ctx.beginPath();

/* stop current animation */
var stopIt = function() {
    window.cancelAnimationFrame( rid );
};

/* closure structure */
var animateCircle = function(evt) {
  var rad = 0;
  var increasing = true;
  stopIt();

  var drawCircle = function(evt) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffb732";

    ctx.arc(canvas.width/2, canvas.height/2, rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();

    if (rad >= 100) increasing = false;
    else if ( rad <= 0 ) increasing = true;

    if (increasing) rad++;
    else rad --;

    rid = window.requestAnimationFrame( drawCircle );
  };

  drawCircle();
};

/* closure structure */
var animateDVD = function(evt) {
  var xcor = canvas.width/2;
  var ycor = canvas.height/2;

  /* change the xval and yval = change in speed */
  var xval = 2;
  var yval = 2;

  stopIt();

  var drawDVD = function(evt) {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    /* remember that images are drawn from the upper left hand corner */
    ctx.drawImage(img, xcor, ycor, 120, 80);

    /* if image hits borders */
      /* Note: different values are used instead of 0 and canvas.width/height due to image whitespace */
    xval = ( ((xcor + xval) <= -18) || ((xcor + xval) >= (canvas.width - 102) ) ) ? -xval : xval;
    yval = ( ((ycor + yval) <= -10) || ((ycor + yval) >= (canvas.height - 70) ) ) ? -yval : yval;

    xcor += xval;
    ycor += yval;

    rid = window.requestAnimationFrame( drawDVD );
  };

  drawDVD();
};

circle.addEventListener('click', animateCircle );
dvd.addEventListener('click', animateDVD );

/* stop animation */
stop.addEventListener("click", function(evt) {
    stopIt();
    ctx.beginPath();
});
