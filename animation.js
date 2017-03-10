var svg = document.getElementById('svg');
var move = document.getElementById("move");
var clean = document.getElementById("clear");

var rid = 0;

/* dimensions */
var w = svg.getAttribute("width")
var h = svg.getAttribute("height")

/* circle radius */
var rad = 16;

/* speed of circle */
var speed = 2;

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
    if( this.getAttribute("fill") == "purple") {
      this.setAttribute("fill", "green");
    }
    else if ( this.getAttribute("fill") == "green") {
      svg.removeChild(this);
      circle( Math.random() * w, Math.random() * h );
    }
    evt.stopPropagation();
};

var circle = function(x,y) {

  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("stroke", "black");
  c.setAttribute("stroke-width", "1");
  c.setAttribute("fill", "purple");
  c.setAttribute("r", rad.toString());
  c.setAttribute("xval", speed.toString());
  c.setAttribute("yval", speed.toString());
  svg.appendChild(c);
  c.addEventListener("click", circle_stuff, true );

};

/* closure structure */
var drawCircle = function(evt) {

  if( this == evt.target ) {
    circle(mousex, mousey);
  }

};


var animateCircle = function(evt) {

    /* change the xval and yval = change in speed */

    var animate = function(evt) {
	       var children = svg.children;

         for(var i = 0; i < children.length; i++) {

      	    var xcor = parseInt(children[i].getAttribute("cx"));
      	    var ycor = parseInt(children[i].getAttribute("cy"));


            var xval = parseInt(children[i].getAttribute("xval"));
            var yval = parseInt(children[i].getAttribute("yval"));

      	    /* if image hits borders */
      	    /* Note: different values are used instead of 0 and w/height due to image whitespace */
      	    xval = ( ((xcor + xval) <= rad) || ((xcor + xval) >= (w - rad) ) ) ? -xval : xval;
      	    yval = ( ((ycor + yval) <= rad) || ((ycor + yval) >= (h - rad) ) ) ? -yval : yval;

      	    xcor += xval;
      	    ycor += yval;

      	    children[i].setAttribute("cx", xcor.toString());
      	    children[i].setAttribute("cy", ycor.toString());
            children[i].setAttribute("xval", xval.toString());
      	    children[i].setAttribute("yval", yval.toString());

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
