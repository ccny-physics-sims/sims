
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 50;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 1;
var t = 0;
var dt = .1;
function setup() {

  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;

  y = new Array(200);

  speedSlider = createSlider(-.2, .2, .05,.01);
  speedSlider.parent('sketch-holder');
  speedSlider.position(20,20);
  speedSlider.class("sim-slider gray");
  speedSliderLabel = createP('&omega; = '+abs(speedSlider.value()));
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(20,speedSlider.y+10);
}

function draw() {
  background(255);
  speedSliderLabel.html('&omega; = '+abs(speedSlider.value()));
  //t = millis()/1000;
  translate(0,height/2);

  calcWave(1);
  renderLine(color(250,0,0),1);

  calcWave(-1);
  renderLine(color(0,0,250),1);

  calcSum(1);
  renderLine(color(0,0,0),2);




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
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  Math.sin(k * x + omega * t)*amplitude;
  }
}

function calcSum() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  Math.sin(k * x + omega * t)*amplitude + Math.sin(k * x - omega * t)*amplitude ;
  }

}




function renderLine(color_,weight_) {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(color_);
  strokeWeight(weight_);
  beginShape();
  for (var x = 0; x < y.length; x += 3) {
    curveVertex(map(x,0,y.length,0,width), -y[x]);
  }
  endShape();
  pop();
}
