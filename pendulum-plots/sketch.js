var p;
var x;                  //increment of x for the position graph

var x1spacing = 5;      // Distance between each horizontal location

var w;                // Width of entire position wave

var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var theta1 = 0;//Math.sqrt(.1/205);      // Start angle at PI radians

var period = 100.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x

var yvalues;          // Using an array to store height values for the position wave
var y2values;         //... to store height values for the velocity wave
var y3values;         //...to store height values for the acceleration wave
var text;             //to be used as labels for the graphs
var color;            //simply to make the text colorful
var pendLength = 205;

let amplitude;
let graphVertSpace;
let initialYOffset = 0
let noOfPoints = 100;
let pendPeriod;
let xScale = 39.5;
function setup()  {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');
  // Make a new Pendulum with an origin location and armlength
  p = new Pendulum(createVector(width/4,20),pendLength);
  //draw position graph
  w = (width);
  //dx = (TWO_PI / period) * x1spacing;
  dx = 6*PI/noOfPoints;
  yvalues = new Array(noOfPoints);
  pendPeriod = 2*PI*sqrt(pendLength/.1);
  //draw velocity graph
  w1 = (width);
  y2values = new Array(noOfPoints);
  //draw acceleration graph
  y3values = new Array(noOfPoints);

  amplitude = min(height/20,40);
  graphVertSpace  = height/5;
  //labels for the graphs
  text1=createP("Position");
  text1.parent('sketch-holder');
  text1.position(width/2,initialYOffset+graphVertSpace*1-amplitude*2.4);
  text2=createP("Velocity");
  text2.parent('sketch-holder');
  text2.position(width/2,initialYOffset+graphVertSpace*2-amplitude*2.4);
  text3=createP("Tang. Acceleration");
  text3.parent('sketch-holder');
  text3.position(width/2,initialYOffset+graphVertSpace*3-amplitude*2.4);
  //create the start/stop button
  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width/4-30,300);
  onoff.class("sim-button");


  noLoop();
  calcWave();



}

function draw() {
  background(255);
  //x-axes for the graphs
  push();
  stroke(0);
  translate(width/2,0)
  line(0,initialYOffset+graphVertSpace, width, initialYOffset+graphVertSpace);
  line(0,initialYOffset+graphVertSpace*2, width, initialYOffset+graphVertSpace*2);
  line(0,initialYOffset+graphVertSpace*3, width, initialYOffset+graphVertSpace*3);
  //y-axes for the graphs
  line(0,initialYOffset+graphVertSpace-amplitude*1.2,0,initialYOffset+graphVertSpace+amplitude*1.2);
  line(0,initialYOffset+graphVertSpace*2-amplitude*1.2,0,initialYOffset+graphVertSpace*2+amplitude*1.2);
  line(0,initialYOffset+graphVertSpace*3-amplitude*1.2,0,initialYOffset+graphVertSpace*3+amplitude*1.2);
  pop();
  renderWave();
  rect(100-30,20-5,60,10)

  p.go();

}


function calcWave() {

  var x1 = theta1;

  for (var i = 0; i < yvalues.length; i++) {

      yvalues[i] = cos(x1)*amplitude;
      y2values[i] = -sin(x1)*amplitude;
      y3values[i] = (-1)*cos(x1)*amplitude;
      x1+=dx;
  }

}


function renderWave() {
  push();
  noStroke();
  translate(width/2,0)
  fill('red')

  //xpos = x1spacing*theta1*TWO_PI;
    xpos = map(theta1,0,6*PI,0,width/2)
    ellipse(xpos, (initialYOffset+graphVertSpace*1)+cos(theta1)*amplitude, 10, 10);
    ellipse(xpos, (initialYOffset+graphVertSpace*2)-sin(theta1)*amplitude, 10, 10);
    ellipse(xpos, (initialYOffset+graphVertSpace*3)-cos(theta1)*amplitude, 10, 10);
    pop();
    if (theta1 < 6*PI){
    theta1 += sqrt(.1/pendLength);
    }
    else {
      theta1 = 0;
    }

  // }
    push();
    strokeWeight(2);
    translate(width/2,0)
    noFill();
    stroke(50,50,200);
    beginShape();

    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(map(x1+dx,0,noOfPoints,0,width/2), (initialYOffset+graphVertSpace*1)+yvalues[x1]);
    }
    endShape();
    stroke(50,200,50)
    beginShape();
    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(map(x1+dx,0,noOfPoints,0,width/2), (initialYOffset+graphVertSpace*2)+y2values[x1]);
    }
    endShape();
    stroke(200,50,200)
    beginShape();
    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(map(x1+dx,0,noOfPoints,0,width/2), (initialYOffset+graphVertSpace*3)-yvalues[x1]);
    }
    endShape();
    pop();

  noStroke();
  fill(255);

      push();
      translate(width/2,0)
      stroke(150);
      line(xpos,20,xpos,height-20);
      pop();

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
