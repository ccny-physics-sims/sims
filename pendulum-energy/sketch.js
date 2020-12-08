var p;



var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var theta1 = 0;//Math.sqrt(.1/205);      // Start angle at PI radians

var amplitude = -40.0; // Height of wave
var period = 198.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
         //...to store height values for the acceleration wave
var text;             //to be used as labels for the graphs
var color;            //simply to make the text colorful
var pendLength = 205;


function setup()  {
  canvas=createCanvas(windowWidth,windowHeight*.9);
  canvas.parent('sketch-holder');
  // Make a new Pendulum with an origin location and armlength
  p = new Pendulum(createVector(width*.5,height/4),pendLength, PI/6);

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


}

function draw() {
  background(255);


  p.go();
  pendVel = createVector(-cos(p.angle),sin(p.angle))
  velVector.origin = p.position;
 velVector.target = p5.Vector.add(p5.Vector.mult(pendVel,-10000*p.aVelocity),p.position);
 velVector.update();
 velVector.display();

 push()
 noStroke();
 translate(20,400)
 push()
 fill('blue')
 rect(0,0,50,-1000*(1-cos(p.angle)))

 text('Potential',0,20)
 pop()
 push()
 fill('red')
 translate(100,0)
 rect(0,00,50,-Math.pow(1000*p.aVelocity,2))
 text('Kinetic',0,20)
 pop()
 pop()
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
