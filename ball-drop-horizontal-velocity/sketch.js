
var Trails = [];
var running = false;
let onoff;

function setup(){
canvas = createCanvas(windowWidth*.8, windowHeight*.7);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("Release");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(50,30);
  onoff.class("sim-button")

  posDrop = createVector(.1*width,.2*height)
  posThrow = createVector(.2*width,.2*height)
  velDrop = createVector(random(0,0),random(0,0));
  velThrow = createVector(width*.003,random(0,0));
  accel = createVector(0,0);

  //what is gravity?
  gravity = createVector(0,.5);

  //make the ball! It is an instance of the mover object
  ballDrop = new KineticMass(posDrop,velDrop,accel,20,'blue');
  ballDrop.tail = true;
  ballDrop.outline = 'black';
  ballDrop.tailStroke = 'blue';
  ballDrop.tailFill = 'blue';
  ballDrop.bottomBounce = 100;

  ballThrow = new KineticMass(posThrow,velThrow,accel,20,'red');
  ballThrow.tail = true;
  ballThrow.outline = 'black';
  ballThrow.tailStroke = 'red';
  ballThrow.tailFill = 'red';
  ballThrow.bottomBounce = 100;
  //This will be the position vector

  //And this will be the velocity vector
  velVectorThrow = new Arrow(posThrow,velThrow);
  velVectorThrow.color = color('green');
  velVectorThrow.width = 10;
  velVectorThrow.showComponents = false;
  velVectorThrow.draggable = false;
  velVectorThrow.grab = false;

  accelVectorThrow = new Arrow(posDrop,accel);
  accelVectorThrow.color = color('purple');
  accelVectorThrow.width = 10;
  accelVectorThrow.showComponents = false;
  accelVectorThrow.draggable = false;
  accelVectorThrow.grab = false;

  velVectorDrop = new Arrow(posDrop,velDrop);
  velVectorDrop.color = color('green');
  velVectorDrop.width = 10;
  velVectorDrop.showComponents = false;
  velVectorDrop.draggable = false;
  velVectorDrop.grab = false;

  accelVectorDrop = new Arrow(posDrop,accel);
  accelVectorDrop.color = color('purple');
  accelVectorDrop.width = 10;
  accelVectorDrop.showComponents = false;
  accelVectorDrop.draggable = false;
  accelVectorDrop.grab = false;

//noSmooth();
//frameRate(15)
noLoop();
}

function draw(){
  background(255)
  ballDrop.applyForce(gravity);
  ballThrow.applyForce(gravity);
  //update the position
  ballDrop.update();
  ballThrow.update();
  //make the ball bounce
  //ball.wrapEdgesBounceFloor();
  //display changes
  ballDrop.display();
  ballThrow.display();
  //update the position vector by setting its target to be equal to the balls position



  //the velocity vector will start where the ball is (i.e ball.position) and point in the direction of the velocity
  velVectorDrop.origin = ballDrop.position;
  velVectorDrop.target = p5.Vector.add(p5.Vector.mult(ballDrop.velocity,15),ballDrop.position);
  velVectorDrop.update();
  velVectorDrop.display();

  accelVectorDrop.origin = ballDrop.position;
  //the acceleration is very small, so we need to multiply it by a big number to see the arrow length
  accelVectorDrop.target = p5.Vector.add(p5.Vector.mult(ballDrop.acceleration,1200),ballDrop.position);
  accelVectorDrop.update();
  accelVectorDrop.display();

  velVectorThrow.origin = ballThrow.position;
  velVectorThrow.target = p5.Vector.add(p5.Vector.mult(ballThrow.velocity,15),ballThrow.position);
  velVectorThrow.update();
  velVectorThrow.display();

  accelVectorThrow.origin = ballThrow.position;
  //the acceleration is very small, so we need to multiply it by a big number to see the arrow length
  accelVectorThrow.target = p5.Vector.add(p5.Vector.mult(ballThrow.acceleration,1200),ballThrow.position);
  accelVectorThrow.update();
  accelVectorThrow.display();
  push();
  stroke(150);
  line(0,ballDrop.position.y,width,ballDrop.position.y);
  pop();
  if (ballDrop.position.y > height+40) {
    //resetTheBalls();
    onoff.html('Reset')
    ballDrop.velocity = createVector(0,0)
    ballDrop.acceleration = createVector(0,0)
    line(0,mouseY,width,mouseY)
  }
};


function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function resetTheBalls(){
  //console.log('resetting');
  ballDrop.position = posDrop.copy();
  ballThrow.position = posThrow.copy();
  ballDrop.velocity = velDrop.copy();
  ballThrow.velocity = velThrow.copy();
  ballDrop.tailA = [];
  ballThrow.tailA = [];
}
  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }
      if (running && ballDrop.position.y > height+20){
          resetTheBalls()

      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }


    }
