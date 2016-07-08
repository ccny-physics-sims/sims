var xspacing = 12;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 200.0;   // How many pixels before the wave repeats
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
  createCanvas(710, 400);
  w = width+12;

  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  phaseSlider = createSlider(0, TWO_PI, HALF_PI);
  phaseSlider.elt.step = .01;
  phaseSlider.position(300,50);
  phaseLabel = createP();
  phaseLabel.position(300,0);


}

function draw() {
  background(255);
  phase = phaseSlider.value();

  translate(50,0)
  calcWave(0);
  renderWave(color(250,0,0),1);
  image(img, 180, 170);


  calcWave(phase);
  renderWave(color(0,0,250),1);
  image(img, 175-phase*30, 170);

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
