$(document).ready(function(){
     init();
});



    function init() {
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            canvasWidth = canvas.width = window.innerWidth,
            canvasHeight = canvas.height = window.innerHeight,
            xAxis,
            yAxis,
            mouseRadius = 50;



        //create te container that will hold the boincing balls.
        var container = {
            x: 0,
            y: 0
        };
//create the array of circles that will be animated
        var circles = [{
            x: 50,
            y: 100,
            r: 10,
            vx: 10,
            vy: 9,
            color: 125
        }, {
            x: 150,
            y: 80,
            r: 20,
            vx: 15,
            vy: 8,
            color: 205
        }, {
            x: 90,
            y: 150,
            r: 5,
            vx: 5,
            vy: 15,
            color: 25
        }, {
            x: 100,
            y: 50,
            r: 15,
            vx: 8,
            vy: 10,
            color: 100
        }];

        window.addEventListener('mousemove', function(e){

            xAxis = e.clientX;
            yAxis = e.clientY;


        });

        function drawMouseCircle(){

            context.fillStyle = 'white';
            context.beginPath();
            context.arc(xAxis, yAxis, mouseRadius, 0, Math.PI * 2, true);
            context.fill();


        };

        function animate() {
            //draw the container
            context.fillStyle = "#000000";
            context.fillRect(container.x, container.y, canvasWidth, canvasHeight);

            document.body.appendChild(canvas);

            //loop through the circles array
            for (var i = 0; i < circles.length; i++) {
                //draw the circles
                context.fillStyle = 'hsl(' + circles[i].color++ + ', 100%, 50%)';
                context.beginPath();
                context.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, true);
                context.fill();

                //time to animate our circles ladies and gentlemen.
                if (circles[i].x - circles[i].r + circles[i].vx < container.x || circles[i].x + circles[i].r + circles[i].vx > canvasWidth) {
                    console.log("before: " + circles[i].vx);
                    circles[i].vx = -circles[i].vx;//turns positive to negative then  - negative to positive if first statement before the or...
                    console.log("after: " + circles[i].vx);
                }

                if (circles[i].y + circles[i].r + circles[i].vy > canvasHeight || circles[i].y - circles[i].r + circles[i].vy < container.y) {
                    circles[i].vy = -circles[i].vy;
                }

                // if(circles[i].y + circles[i].r  > yAxis - mouseRadius &&  circles[i].y - circles[i].r + circles[i].vy < yAxis + mouseRadius
                //     ){
                //     circles[i].vy = -circles[i].vy;
                // }

                circles[i].x += circles[i].vx;
                circles[i].y += circles[i].vy;

            }

            // drawMouseCircle();

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
