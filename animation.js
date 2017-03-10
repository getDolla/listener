var svg = document.getElementById('svg');
var move = document.getElementById("move");
var clean = document.getElementById("clear");

var rid = 0;

/* dimensions */
var w = svg.getAttribute("width")
var h = svg.getAttribute("height")

/* circle radius */
var rad = 10;

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

var circle_stuff = function(evt) {
    if(evt.target.getAttribute("fill") != "green") {
      evt.target.setAttribute("fill", "#green");
    }
    else {
      svg.removeChild(evt.target);
    }
    evt.stopPropagation();
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
    c.addEventListener("click", circle_stuff() );

  };

  if( this == evt.target ) {
    circle();
  }

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

svg.addEventListener('click', drawCircle );
move.addEventListener('click', animateCircle );

/* clear button */
clean.addEventListener('click', function(evt) {
    stopIt();
    clear();
});
