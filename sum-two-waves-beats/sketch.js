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
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+xspacing;

  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  phaseSlider = createSlider(0, .2, 0, .001);
  phaseSlider.parent('sketch-holder');
  phaseSlider.position(20,20);
  phaseSlider.class("sim-slider gray");
  phaseLabel = createP();
  phaseLabel.position(20,phaseSlider+20);
  phaseLabel.parent('sketch-holder');

}

function draw() {
  background(255);
  delfreq = phaseSlider.value();

  dx = (TWO_PI / period) * xspacing;

  //calc the points for the un-changed wave
  calcWave(0);
  //show the plot!
  push()
  translate(0,height*.3)
  renderWave(color(250,0,0),1,0);
  pop(0)
  //calc the points for the modified wave
  calcWave(delfreq);
  //show the plot
  push()
  translate(0,height*.5)
  renderWave(color(0,0,250),1,0);
  pop()
  //calc the sum
  calcSum();
  //show the sum
  push()
  translate(0,height*.7)
  renderWave(color(250,0,250),2,0);
  pop()

  //make some labels and lines
  phaseLabel.html('frequency difference: '+ delfreq);
  push();
  strokeWeight(1);
  stroke(50);
  line(0,height*.3,width,height*.3);
  line(0,height*.5,width,height*.5);
  line(0,height*.7,width,height*.7);
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
