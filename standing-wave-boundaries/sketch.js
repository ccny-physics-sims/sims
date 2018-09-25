var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 100;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 1;
var t = 0;
var dt = .05;
function setup() {

  frameRate(25);
  canvas = createCanvas(.9*windowWidth,.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;

  y = new Array(floor(width));
  xbound = floor(width*.7);
  initwavelength = floor((xbound-5)/2);
 wavelengthSlider = createSlider(150, width*2, initwavelength , 1);
 wavelengthSlider.parent('sketch-holder');
  wavelengthSlider.position(300,50);
  wavelengthSlider.class("sim-slider gray");

// nLabel = createP('node');
// nLabel.parent('sketch-holder');

}

function draw() {
  background(255)
  wavelength = wavelengthSlider.value()
  k = 2*Math.PI/wavelength;
  //t = millis()/1000;
  push()
  translate(5,0)
  line((1*wavelength),height/2,1*wavelength,height-20)
  pop()


  if ((xbound-5)%(wavelength/2)  < 3)
  {waveColor =  color('rgba(200,0,200,1)') }
  else {
    waveColor =  color('rgba(200,0,200,.1)')
  }

  calcWave();
  push()
  translate(5,height/2);
  renderLine();
  pop();

  //nLabel.position(1*wavelength-40+5  ,height-50)
  textSize(18);
  text('node',1*wavelength-45+5  ,height-50)

  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();

  push()
  strokeWeight(3)
  line(5,height,5,0)
  line(xbound,height,xbound,0)
  pop()
  push()
  noStroke()
  fill(255)
  rect(xbound+2,0,width-xbound,height)
  pop()
  t = t+dt;

}

function calcWave() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  Math.sin(k * x + omega * t)*amplitude + Math.sin(k * x - omega * t)*amplitude ;
  }

}





function renderLine() {
  //this function puts a line through all the positions defined above.

  push();

  noFill();
  stroke(waveColor);
  strokeWeight(3);
  beginShape();
  for (var x = -4; x < y.length+4; x += 4) {
    //ellipse(x,-y[x],2)
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}
