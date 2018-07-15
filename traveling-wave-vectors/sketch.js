var xspacing = 10;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 400;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 1;
var velVector;
var xpositions = [];
var aVector = [];
var t = 0;
var dt=1;

function setup() {

  //frameRate(30);
  canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  w = width+12;

  dx = (TWO_PI / wavelength) * xspacing;
  //yvalues = new Array(floor(w/xspacing));
    y = new Array(windowWidth);
    for (i=0;i<10;i++){
    xpositions[i]=wavelength*(i+3)/8;
    }
    for (i=0;i<xpositions.length;i++){
      addAVector()
    }

    omegaSlider = createSlider(-5,5,1,.1)
    omegaSlider.parent('sketch-holder');
    omegaSlider.class("sim-slider gray");
    omegaSlider.position(50,50);

    omegaSliderLabel = createP();
    omegaSliderLabel.parent('sketch-holder');
    omegaSliderLabel.html('Change Wave Speed');
    omegaSliderLabel.position(50,20);



}

function draw() {
  background(255);

  // t = millis()/1000;
  t = t+dt*.01
  calcWave();
  push()
  translate(0,height/2);
  renderPoints();
  pop()
  dt = omegaSlider.value();
  for(i=0;i<xpositions.length;i++){
  updateVectors(i);
  }

}

function addAVector(){
  aVector[i] = new Arrow(createVector(0,0),createVector(0,0));
  aVector[i].color = color('green');
  aVector[i].width = 10;
  aVector[i].showComponents = false;
  aVector[i].draggable = false;
  aVector[i].grab = false;
}

function updateVectors(i){
  x = 3.0*Math.round(xpositions[i]/3.0);
  xVec = x
  yVec = -amplitude * Math.sin(k*x - omega*t);
  aVector[i].origin = createVector(xVec,yVec);
  aVector[i].target = p5.Vector.add(aVector[i].origin,createVector(0,Math.sign(dt)*amplitude*Math.cos(k*x-omega*t)));
  push();
  translate(0,height/2);
  aVector[i].update();
  aVector[i].display();
  pop();
}

function calcWave() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * Math.sin(k*x - t);
  }

}




function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  //stroke(color("hsb(0,100,100)"))

      noStroke();
      fill(100)
      for (var x = 0; x < y.length; x += 4) {
      ellipse(x, -y[x], 4);
    }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(0);

  beginShape();
  for (var x = 0; x < y.length; x += 3) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}
