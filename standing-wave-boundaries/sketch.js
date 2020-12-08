               // Width of entire wave
var amplitude = 75.0; // Height of wave
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var omega = 1;
var t = 0;
var dt = .05;
let wavelength, k;
function setup() {

  frameRate(25);
  canvas = createCanvas(windowWidth,.9*windowHeight);
  canvas.parent('sketch-holder');

  wavelength = width/2
  k = 2*Math.PI/wavelength;
  y = new Array(400);
  xbound = width;
  initwavelength = width/8;
 wavelengthSlider = createSlider(width/10, width/2, width/4 , 1);
 wavelengthSlider.parent('sketch-holder');
  wavelengthSlider.position(20,20);
  wavelengthSlider.class("sim-slider");

// nLabel = createP('node');
// nLabel.parent('sketch-holder');

}

function draw() {
  background(255)
  wavelength = wavelengthSlider.value()
  k = 2*Math.PI/wavelength;
  //t = millis()/1000;
  push()
  //translate(5,0)
  line((2*wavelength+15),height/2,2*wavelength+15,height-20)
  pop()


  if ((xbound)%(wavelength/2)  < 3)
  {waveColor =  color('rgba(200,0,200,1)') }
  else {
    waveColor =  color('rgba(200,0,200,.1)')
  }

  calcWave();
  push()
  translate(10,height/2);
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
  line(xbound-5,height,xbound-5,0)
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
  curveVertex(0,0);
  for (var x = 0  ; x < y.length; x += 1) {
    //ellipse(x,-y[x],2)
    curveVertex(map(x,0,y.length,0,width), -y[x]);
  }
  endShape();
  pop();
}
