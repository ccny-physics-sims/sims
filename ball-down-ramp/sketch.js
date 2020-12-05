
let Trails = [];
let running = false;
let posRoller;
let velRoller;
let accel;

function setup(){
canvas = createCanvas(windowWidth*.8, windowHeight*.7);
canvas.parent('sketch-holder');

  c = 0;
  onoff = createButton("Release");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width*.02,30);
  onoff.class("sim-button")
  //onoff.size('2em','1em')

  reseter = createButton("Reset");
  reseter.parent('sketch-holder');
  reseter.mouseClicked(resetTheBalls);
  reseter.position(width*.02,80);
  reseter.class("sim-button")
  //speedRoller = 10;
  rampTheta = .1;

  gravMult=.3;
  gravity = createVector(-gravMult*cos(rampTheta),gravMult*sin(rampTheta));
  gravity = p5.Vector.mult(gravity, 2);
  distancetozero = (.85*width);
  //console.log(distancetozero)
  speedRoller = sqrt(2*gravMult*sin(rampTheta)*(distancetozero/cos(rampTheta)));
  posRoller = createVector(.9*width,.8*height-.85*width*tan(rampTheta))
  velRoller = createVector(0,0);
  accel = createVector(0,0);

  //what is gravity?



  //make the ball! It is an instance of the mover object
  ballRoller = new KineticMass(posRoller,velRoller,accel,20,'blue');
  ballRoller.tail = true;
  ballRoller.outline = 'black';
  ballRoller.tailStroke = 'blue';
  ballRoller.tailFill = 'blue';
  //ballRoller.bottomBounce = 100;
  ballRoller.tailSpacing = 10;
  ballRoller.tailLength = 50;


  //This will be the position vector

  //And this will be the velocity vector


  // velVectorDrop = new Arrow(posDrop,velDrop);
  // velVectorDrop.color = color('green');
  // velVectorDrop.width = 10;
  // velVectorDrop.showComponents = false;
  // velVectorDrop.draggable = false;
  // velVectorDrop.grab = false;
  //
  // accelVectorDrop = new Arrow(posDrop,accel);
  // accelVectorDrop.color = color('purple');
  // accelVectorDrop.width = 10;
  // accelVectorDrop.showComponents = false;
  // accelVectorDrop.draggable = false;
  // accelVectorDrop.grab = false;

//noSmooth();
//frameRate(15)
noLoop();
}

function draw(){
  background(255)
  ballRoller.applyForce(gravity);


  ballRoller.update();

  ballRoller.display();

  push();
  stroke(150);
  translate(0,20)
  rotate(-rampTheta);
  line(0,posRoller.y+distancetozero*tan(rampTheta)-7, width, posRoller.y+distancetozero*tan(rampTheta)-7)
  //line(posRoller.x,posRoller.y,width,posRoller.y-(width*tan(rampTheta)));
  pop();
  if (ballRoller.position.x < -20) {
    //resetTheBalls();
    //ballRoller.velocity = createVector(0,0)
    //ballRoller.a = createVector(0,0)
    noLoop()
    onoff.html("done")
  }
};


function windowResized() {
    // Resize necessary elements to fit new window size
    // resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function resetTheBalls(){
  //console.log('resetting');
  //loop();
  ballRoller.position = posRoller.copy();
  ballRoller.velocity = velRoller.copy();
  ballRoller.tailA = [];
  draw();

  ballRoller.update();
  ballRoller.display();

  noLoop();
  running = false;
  onoff.html("Release")
  //noLoop();
}
  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }
    }
