var svg = document.getElementById("svg");
var move_button = document.getElementById("move");
var clear_button = document.getElementById("clear");

var rid = 0;

var width = svg.getAttribute("width");
var height = svg.getAttribute("height");

var master_radius = 24;
var master_speed = 2;

var mousex, mousey;

var stop = function(){
    window.cancelAnimationFrame(rid);
};

var clear = function(){
    while (svg.lastChild){
        svg.removeChild(svg.lastChild);
    }
};

var makeCircle = function(xcor, ycor, radius, dx, dy){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", xcor);
    circle.setAttribute("cy", ycor);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", "1");
    circle.setAttribute("fill", "purple");
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("dx", dx.toString());
    circle.setAttribute("dy", dy.toString());
    circle.setAttribute("clicked", false);
    return circle;
};

var drawCircle = function(xcor, ycor, radius, dx, dy){
    var circle = makeCircle(xcor, ycor, radius, dx, dy);

    circle.addEventListener("click", function(evt){
        if (evt.target == this){
            if (circle.getAttribute("clicked") == "true"){
                drawCircle(Math.floor(Math.random() * width), Math.floor(Math.random() * height),
                  parseInt(this.getAttribute("r")),
                  parseInt(-this.getAttribute("dx")),
                  parseInt(-this.getAttribute("dy")));
                svg.removeChild(this);
            }else{
                this.setAttribute("fill", "green");
                this.setAttribute("clicked", true);
            }
        }
    });

    svg.appendChild(circle);
};

var animate_circle = function(){
    var i = 0;
    while(i < svg.children.length){
        var circle = svg.children[i];

        if (parseInt(circle.getAttribute("r")) <= 1){
            svg.removeChild(circle);
        } else{
            var circleX = parseInt(circle.getAttribute("cx"));
            var circleY = parseInt(circle.getAttribute("cy"));
            var circleRadius = parseInt(circle.getAttribute("r"));

            if (circleX < circleRadius || circleX >= width - circleRadius){
		              circle.setAttribute("dx", -parseInt(circle.getAttribute("dx")));
	           }

            if (circleY < circleRadius || circleY >= height - circleRadius){
		              circle.setAttribute("dy", -parseInt(circle.getAttribute("dy")));
	           }


	            circle.setAttribute("cx", circleX + parseInt(circle.getAttribute("dx")));
              circle.setAttribute("cy", circleY + parseInt(circle.getAttribute("dy")));

        if (circle.getAttribute("cx") == width / 2){
            circle.setAttribute("r", parseInt(circle.getAttribute("r")) / 2);
            drawCircle(parseInt(circle.getAttribute("cx")),
                       parseInt(circle.getAttribute("cy")),
                       parseInt(circle.getAttribute("r")),
                       parseInt(-circle.getAttribute("dx")),
                       parseInt(-circle.getAttribute("dy")));
        }

        i++;
      }
    }

    rid = window.requestAnimationFrame(animate_circle);
};

svg.addEventListener("click", function(evt){
    if (evt.target == this){
        drawCircle(evt.offsetX, evt.offsetY, master_radius, 1, 1);
    }
});

move_button.addEventListener("click", function(evt){
    animate_circle();
});

clear_button.addEventListener('click', function(evt) {
     stop();
     clear();
 });
