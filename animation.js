var svg = document.getElementById('svg');
var move = document.getElementById("move");
var clear = document.getElementById("clear");

var rid = 0;

/* dimensions */
var w = svg.getAttribute("width")
var h = svg.getAttribute("height")

/* circle radius */
var rad = 4;

var mousex, mousey;

/* keeps track of the xcor and ycor of mouse */
svg.addEventListener("mousemove", function(evt) {
    mousex = evt.offsetX.toString();
    mousey = evt.offsetY.toString();
});

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
var drawCircle = function(evt) {

  var circle = function(evt) {

  	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  	c.setAttribute("cx", mousex);
  	c.setAttribute("cy", mousey);
  	c.setAttribute("stroke", "black");
  	c.setAttribute("stroke-width", "1");
  	c.setAttribute("fill", "#551a8b");
  	c.setAttribute("r", rad.toString());
  	svg.appendChild(c);

  };

  circle();
};


var animateCircle = function(evt) {

    /* change the xval and yval = change in speed */
    var xval = 2;
    var yval = 2;

    var animate = function(evt) {
	       var children = svg.children;

         for(var i = 0; i < children.length; i++) {

      	    var xcor = parseInt(children[i].getAttribute("x"));
      	    var ycor = parseInt(children[i].getAttribute("y"));

      	    children[i].setAttribute("href", src );
      	    children[i].setAttribute("x", xcor.toString());
      	    children[i].setAttribute("y", ycor.toString());

      	    /* if image hits borders */
      	    /* Note: different values are used instead of 0 and w/height due to image whitespace */
      	    xval = ( ((xcor + xval) <= rad) || ((xcor + xval) >= (w - rad) ) ) ? -xval : xval;
      	    yval = ( ((ycor + yval) <= rad) || ((ycor + yval) >= (h - rad) ) ) ? -yval : yval;

      	    xcor += xval;
      	    ycor += yval;
          }

	        rid = window.requestAnimationFrame( animate );
    };

    animate();
};

var changecolor = function(evt) {
  this.setAttribute("fill", "green");
  evt.stopPropagation();
};

var removeCircle = function(evt) {
  svg.removeChild(this);
  evt.stopPropagation();
};

svg.addEventListener('click', to_do() );
move.addEventListener('click', animateCircle() );

/* clear button */
clear.addEventListener("click", function(evt) {
    stopIt();
    clear()
});
