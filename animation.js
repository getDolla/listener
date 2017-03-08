var svg = document.getElementById('svg');
var circle = document.getElementById("circle");
var dvd = document.getElementById("dvd");
var stop = document.getElementById("stop");

var src = "http://i1-news.softpedia-static.com/images/news2/get-your-windows-10-dvd-player-app-alternatives-488756-3.jpg";
var rid = 0;

/* dimensions */
var w = svg.getAttribute("width")
var h = svg.getAttribute("height")

/* stop current animation */
var stopIt = function() {
    window.cancelAnimationFrame( rid );
};

/* clear */
var clear = function() {
  while (svg.lastChild) {
    svg.removeChild(svg.lastChild);
  }
};

/* closure structure */
var animateCircle = function(evt) {
  var rad = 0;
  var increasing = true;
  stopIt();

  var drawCircle = function(evt) {
    clear();

    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", w/2);
    c.setAttribute("cy", h/2);
    c.setAttribute("stroke", "black");
    c.setAttribute("stroke-width", "1");
    c.setAttribute("fill", "#ffb732");
    c.setAttribute("r", rad.toString());
    svg.appendChild(c);

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
  var xcor = w/2;
  var ycor = h/2;

  /* change the xval and yval = change in speed */
  var xval = 2;
  var yval = 2;

  stopIt();

  var drawDVD = function(evt) {
    clear();

    /* remember that images are drawn from the upper left hand corner */
    var d = document.createElementNS("http://www.w3.org/2000/svg", "image");
    d.setAttribute("href", src );
    d.setAttribute("x", xcor.toString());
    d.setAttribute("y", ycor.toString());
    d.setAttribute("height", "80");
    d.setAttribute("width", "120");
    svg.appendChild(d);

    /* if image hits borders */
      /* Note: different values are used instead of 0 and w/height due to image whitespace */
    xval = ( ((xcor + xval) <= -18) || ((xcor + xval) >= (w - 102) ) ) ? -xval : xval;
    yval = ( ((ycor + yval) <= -10) || ((ycor + yval) >= (h - 70) ) ) ? -yval : yval;

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
});
