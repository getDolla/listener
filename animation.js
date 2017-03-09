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
var drawCircle = function(evt) {
    var rad = 4;

    var circle = function(evt) {
	
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("cx", w/2);
	c.setAttribute("cy", h/2);
	c.setAttribute("stroke", "black");
	c.setAttribute("stroke-width", "1");
	c.setAttribute("fill", "#ffb732");
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
	for(var i = 0; i < children.length; i++){
	    var xcor = children[i].getAttribute("x");
	    var ycor = children[i].getAttribute("y");

	    children[i].setAttribute("href", src );
	    children[i].setAttribute("x", xcor.toString());
	    children[i].setAttribute("y", ycor.toString());
	    children[i].setAttribute("height", "80");
	    children[i].setAttribute("width", "120");

	    /* if image hits borders */
	    /* Note: different values are used instead of 0 and w/height due to image whitespace */
	    xval = ( ((xcor + xval) <= -18) || ((xcor + xval) >= (w - 102) ) ) ? -xval : xval;
	    yval = ( ((ycor + yval) <= -10) || ((ycor + yval) >= (h - 70) ) ) ? -yval : yval;

	    xcor += xval;
	    ycor += yval; 
	}

		
	/* remember that images are drawn from the upper left hand corner */
	var d = document.createElementNS("http://www.w3.org/2000/svg", "image");
	

	rid = window.requestAnimationFrame( animate );
    };

    animate();
};


svg.addEventListener('click', to_do() );

/* stop animation */
clear.addEventListener("click", function(evt) {
    stopIt();
    clear()
});
