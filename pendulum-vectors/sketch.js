var p;

var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var theta1 = 0;//Math.sqrt(.1/205);      // Start angle at PI radians


var text;             //to be used as labels for the graphs
var color;            //simply to make the text colorful


let supportOrigin;
function setup()  {
  canvas=createCanvas(windowWidth,windowHeight*.9);
  canvas.parent('sketch-holder');
  pendLength = height/2.5;
  supportOrigin = createVector(width/2,height/4)
  // Make a new Pendulum with an origin location and armlength
  p = new Pendulum(supportOrigin,pendLength, PI/6);

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

  box_fbd = new FBD(p.position,2,true);
  
  box_fbd.showLabels = true;
  box_fbd.showResultant = true;

  showFBD  = createCheckbox('Show Free Body Diagram?', false);
  showFBD.parent('sketch-holder');
  showFBD.style('color','black')
  showFBD.position (20,onoff.y+60)
  showFBD.mouseClicked(redraw)

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


 pendAccel = p5.Vector.mult(createVector(-cos(p.angle),sin(p.angle)),-200000*p.aAcceleration);
 tensionDir = p5.Vector.mult(createVector(-sin(p.angle),-cos(p.angle)),200000*sq(p.aVelocity));
 totalAccel = p5.Vector.add(pendAccel,tensionDir);
 accelVector.origin = p.position;

accelVector.target = p5.Vector.add(totalAccel,p.position);
accelVector.update();


//box_fbd.mag = [100,749851.45615155*p.aVelocity**2];
box_fbd.mag = [100,100*cos(p.angle)+200000*p.aVelocity**2];
box_fbd.direction = [PI/2,-p.angle-PI/2]
box_fbd.xoffsets = [0,0,0]
box_fbd.yoffsets = [0,0,0]
box_fbd.labels = ['Gravity','Tension']
noStroke()
box_fbd.update();
if (!showFBD.checked()){
  velVector.display();
  accelVector.display();

push()
noStroke()
fill('purple')
text('acceleration', accelVector.target.x+10,accelVector.target.y+10)
pop()
push()
noStroke()
fill('green')
text('velocity', velVector.target.x+10,velVector.target.y+10)
pop()
}
if (showFBD.checked()){
box_fbd.display();
}


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
