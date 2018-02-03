var xspacing = 10;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 30;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 1;
var t = 0;
var dt = .1;
function setup() {

  frameRate(30);
  canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  w = width+12;

  dx = (TWO_PI / wavelength) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  speedSlider = createSlider(-.2, .2, .05,.01);

  speedSlider.position(300,50);
  speedSlider.class("sim-slider gray");
}

function draw() {
  background(255);

  //t = millis()/1000;

  calcWave(1);
  renderWave(color(250,0,0),1);

  calcWave(-1);
  renderWave(color(0,0,250),1);

  calcSum(1);
  renderWave(color(0,0,0),2);




  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();
  dt = speedSlider.value();
  t = t+dt;
}

function calcWave(omega) {

  x = 0;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(k * x + omega * t)*amplitude;
    x+=dx;
  }
}


function calcSum(omega) {

  x = 0;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(k * x + omega * t)*amplitude + Math.sin(k * x - omega * t)*amplitude ;
    x+=dx;
  }
}

function renderWave(color_,weight_) {


  noFill();
  stroke(color_);
  strokeWeight(weight_)
  beginShape();
  for (var x = 0; x < yvalues.length; x++) {
    curveVertex(x*xspacing, height/2+yvalues[x]);
  }
  endShape();
}
