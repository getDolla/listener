var svg = document.getElementById('svg');
var move = document.getElementById("move");
var clear = document.getElementById("clear");

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
  var rad = 1;
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

    rid = window.requestAnimationFrame( drawCircle );
  };

  drawCircle();
};

circle.addEventListener('click', animateCircle );

/* stop animation */
stop.addEventListener("click", function(evt) {
    stopIt();
});
