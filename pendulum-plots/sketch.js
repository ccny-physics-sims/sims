var p;
var x;                  //increment of x for the position graph

var x1spacing = 5;      // Distance between each horizontal location

var w;                // Width of entire position wave

var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var theta1 = 0;//Math.sqrt(.1/205);      // Start angle at PI radians

var amplitude = -40.0; // Height of wave
var period = 198.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x

var yvalues;          // Using an array to store height values for the position wave
var y2values;         //... to store height values for the velocity wave
var y3values;         //...to store height values for the acceleration wave
var text;             //to be used as labels for the graphs
var color;            //simply to make the text colorful
var pendLength = 205;


function setup()  {
  createCanvas(800,460);
  // Make a new Pendulum with an origin location and armlength
  p = new Pendulum(createVector(100,20),pendLength);
  //draw position graph
  w = ((width));
  dx = (TWO_PI / period) * x1spacing;
  yvalues = new Array(floor(width/x1spacing));
  //draw velocity graph
  w1 = (width);
  y2values = new Array(floor(width/x1spacing));
  //draw acceleration graph
  y3values = new Array(floor(width/x1spacing));
  //labels for the graphs
  text1=createDiv("Position of the Pendulum");
  text1.position(430,30);
  text2=createDiv("Velocity of the Pendulum");
  text2.position(430,160);
  text3=createDiv("Acceleration of the Pendulum");
  text3.position(430,295);
  //create the start/stop button
  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(50,300);
  onoff.class("sim-button gray");


  noLoop();
  calcWave();



}

function draw() {
  background(255);
  //x-axes for the graphs
  push();
  stroke(0);
  line(205,height/2, width, height/2);
  line(205,height/5, width, height/5);
  line(205,height*.8, width, height*.8);
  //y-axes for the graphs
  line(205,35,205,142);
  line(205,175,205,282);
  line(205,315,205,422);
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
  translate(205,0)
  fill('red')

  xpos = x1spacing*theta1*TWO_PI;
    ellipse(xpos, height/5+cos(theta1)*amplitude, 10, 10);
    ellipse(xpos, height/2-sin(theta1)*amplitude, 10, 10);
    ellipse(xpos, height/1.25-cos(theta1)*amplitude, 10, 10);
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
    translate(205,0)
    noFill();
    stroke(50,50,200);
    beginShape();

    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(x1*x1spacing, height/5+yvalues[x1]);
    }
    endShape();
    stroke(50,200,50)
    beginShape();
    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(x1*x1spacing, height/2+y2values[x1]);
    }
    endShape();
    stroke(200,50,200)
    beginShape();
    for (var x1 = -1; x1 < yvalues.length; x1++) {
    curveVertex(x1*x1spacing, height/1.25+y3values[x1]);
    }
    endShape();
    pop();

  noStroke();
  fill(255);

      push();
      translate(205,0)
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
