
var Trails = [];
var running = false;
let theta;
let v_0;

function setup(){
canvas = createCanvas(windowWidth, windowHeight*.9);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("launch");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(.75*width,30);
  onoff.class("sim-button")
  gravity = createVector(0,1);
  theta = -60*PI/180
  v_0 = sqrt(width*.04*gravity.y/sin(2*abs(theta)));
  posThrow = createVector(.05*width,.95*height)
  velThrow = createVector(v_0*cos(theta),v_0*sin(theta));
  accel = createVector(0,0);

  //what is gravity?


  //make the ball! It is an instance of the mover object


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

  accelVectorThrow = new Arrow(posThrow,accel);
  accelVectorThrow.color = color('purple');
  accelVectorThrow.width = 10;
  accelVectorThrow.showComponents = false;
  accelVectorThrow.draggable = false;
  accelVectorThrow.grab = false;

  noLoop();
//noSmooth();
//frameRate(15)
}

function draw(){
  background(255)

  ballThrow.applyForce(gravity);
  //update the position

  ballThrow.update();
  //make the ball bounce
  //ball.wrapEdgesBounceFloor();
  //display changes

  ballThrow.display();
  //update the position vector by setting its target to be equal to the balls position



  //the velocity vector will start where the ball is (i.e ball.position) and point in the direction of the velocity


  velVectorThrow.origin = ballThrow.position;
  velVectorThrow.target = p5.Vector.add(p5.Vector.mult(ballThrow.velocity,15),ballThrow.position);
  velVectorThrow.update();
  velVectorThrow.display();

  accelVectorThrow.origin = ballThrow.position;
  //the acceleration is very small, so we need to multiply it by a big number to see the arrow length
  accelVectorThrow.target = p5.Vector.add(p5.Vector.mult(ballThrow.acceleration,700),ballThrow.position);
  accelVectorThrow.update();
  accelVectorThrow.display();

  if (ballThrow.position.y > height) {
    running = false;
    onoff.html('launch')
    resetTheBalls();
    //ballThrow.velocity = createVector(0,0)
  }
  line(.05*width,0,.05*width,height)
  line(0,.95*height,width,.95*height)
};


function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function resetTheBalls(){

  ballThrow.position = posThrow.copy();
  ballThrow.velocity = velThrow.copy();
  ballThrow.tailA = [];
  noLoop();
}
  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }
      if (running && ballThrow.position.y > height){
          resetTheBalls()

      }

      else if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }
    }
