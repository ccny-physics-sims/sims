var xspacing = 2;    // Distance between each horizontal location - smaller values improve resolution
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 30.0; // Height of wave
var period = 20.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;        // Using an array to store height values for the wave
var phaseSlider;
var phase;
var phaseLabel;

function setup() {

  frameRate(10);
  canvas = createCanvas(710, 450);
  canvas.parent('sketch-holder');
  w = width+xspacing;

  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  phaseSlider = createSlider(0, .2, 0);
  phaseSlider.parent('sketch-holder');
  phaseSlider.elt.step = .001;
  phaseSlider.position(300,30);
  phaseSlider.class("sim-slider gray");
  phaseLabel = createP();
  phaseLabel.position(300,0);
  phaseLabel.parent('sketch-holder');

}

function draw() {
  background(255);
  delfreq = phaseSlider.value();

  dx = (TWO_PI / period) * xspacing;

  //calc the points for the un-changed wave
  calcWave(0);
  //show the plot!
  renderWave(color(250,0,0),1,100);

  //calc the points for the modified wave
  calcWave(delfreq);
  //show the plot
  renderWave(color(0,0,250),1,200);

  //calc the sum
  calcSum();
  //show the sum
  renderWave(color(250,0,250),2,350);


  //make some labels and lines
  phaseLabel.html('frequency difference: '+ delfreq);
  push();
  strokeWeight(1);
  stroke(50);
  line(0,200/2,width,200/2);
  line(0,400/2,width,400/2);
  line(0,700/2,width,700/2);
  pop();
}

function calcWave(delfreq_) {

  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin((1+delfreq_)*x)*amplitude;
    x+=dx;
  }
}

function calcSum() {

  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = amplitude*(sin((1+delfreq)*x)+sin(x));
    x+=dx;
  }
}

function renderWave(color_,weight_,ypos_) {


  noFill();
  stroke(color_);
  strokeWeight(weight_)
  beginShape();
  for (var x = 0; x < yvalues.length; x++) {
    curveVertex(x*xspacing, ypos_+yvalues[x]);
  }
  endShape();
}
