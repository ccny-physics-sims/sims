var xspacing = 12;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 100.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var phaseSlider;
var phase;
var phaseLabel;
var img;
function preload() {
  img = loadImage("speaker.png");
}

function setup() {

  frameRate(10);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;

  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(200);

  phaseSlider = createSlider(0, TWO_PI, HALF_PI);
  phaseSlider.parent('sketch-holder');
  phaseSlider.elt.step = .01;
  phaseSlider.position(20,20);
  phaseSlider.class("sim-slider");
  phaseLabel = createP();
  phaseLabel.parent('sketch-holder');
  phaseLabel.position(20,phaseSlider.y+30);
  imageMode(CENTER)

}

function draw() {
  background(255);
  phase = phaseSlider.value();

  //translate(50,0)
  calcWave(0);
  renderWave(color(250,0,0),1);
  image(img, 90+180, height/2);


  calcWave(phase);
  renderWave(color(0,0,250),1);
  image(img, 90+180-phase*30, height/2);

  calcSum();
  renderWave(color(250,0,250),2);

  dx = (TWO_PI / period) * xspacing;

  phaseLabel.html('speaker seperation: '+ Math.round(phase/TWO_PI * 100) / 100 + '&lambda;');
  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();
}

function calcWave(phase_) {

  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x+phase_)*amplitude;
    x+=dx;
  }
}

function calcSum() {

  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = amplitude*(sin(x+phase)+sin(x));
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
