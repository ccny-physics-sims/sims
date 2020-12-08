var p;

var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var theta1 = 0;//Math.sqrt(.1/205);      // Start angle at PI radians


var text;             //to be used as labels for the graphs
var color;            //simply to make the text colorful



function setup()  {
  canvas=createCanvas(windowWidth,windowHeight*.9);
  canvas.parent('sketch-holder');
  pendLength = height/2.5;
  // Make a new Pendulum with an origin location and armlength
  p = new Pendulum(createVector(width/2,height/4),pendLength, PI/6);

  //labels for the graphs

  //create the start/stop button
  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,20);
  onoff.class("sim-button");


  noLoop();
  pos = p.position;
  vel = createVector(0,0);
  velVector = new Arrow(pos,vel);
  velVector.color = color('green');
  velVector.width = 10;
  velVector.showComponents = false;
  velVector.draggable = false;
  velVector.grab = false;

  accel = createVector(0,0);
  accelVector = new Arrow(pos,vel);
  accelVector.color = color('purple');
  accelVector.width = 10;
  accelVector.showComponents = false;
  accelVector.draggable = false;
  accelVector.grab = false;

}

function draw() {
  background(255);
  push();
  noFill();
  stroke(170)
  arc(width/2,height/4, 2*pendLength, 2*pendLength,PI/2-PI/6, PI/2+PI/6)
  pop()

  p.go();
  pendVel = createVector(-cos(p.angle),sin(p.angle))
  velVector.origin = p.position;
 velVector.target = p5.Vector.add(p5.Vector.mult(pendVel,-10000*p.aVelocity),p.position);
 velVector.update();
 velVector.display();

 pendAccel = p5.Vector.mult(createVector(-cos(p.angle),sin(p.angle)),-200000*p.aAcceleration);
 tensionDir = p5.Vector.mult(createVector(-sin(p.angle),-cos(p.angle)),200000*sq(p.aVelocity));
 totalAccel = p5.Vector.add(pendAccel,tensionDir);
 accelVector.origin = p.position;

accelVector.target = p5.Vector.add(totalAccel,p.position);
accelVector.update();
accelVector.display();

}






//turn the simulation on and off
function turnonoff() {
  if (running) {
    running = false;
    noLoop();
    onoff.html("start");
    return
  }

  if (!running){
    running = true;
    loop();
    onoff.html("stop");
    return
  }
}
