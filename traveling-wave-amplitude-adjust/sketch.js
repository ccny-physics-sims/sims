var xspacing = 10;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 100;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 2;

function setup() {

  frameRate(30);
  canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  w = width+12;



  y = new Array(windowWidth);
    cursor(CROSS)

    amplitudeAdjust = createSlider(0,200,50,1);
    amplitudeAdjust.position(100,35);
    amplitudeAdjust.class("sim-slider gray");
    amplitudeAdjustLabel = createP();
    amplitudeAdjustLabel.position(100,5)

}

function draw() {
  background(255);

  t = millis()/1000;
  amplitudeAdjustLabel.html("Amplitude: "+amplitudeAdjust.value() )
  calcWave();
  push()
  translate(0,height/2);
  renderPoints();

  renderLine()
  pop()

  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();


  push()
  stroke(100)
  translate(width/2,0)
  line(0,0,0,height)
  pop();
}

function calcWave() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitudeAdjust.value() * Math.sin(k*x - omega*t);
  }

}




function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  //stroke(color("hsb(0,100,100)"))
  stroke('red')
  fill('pink')
      //fill(color('hsb(0,100,100)'));
      //stroke(59)
      x = width/2
      ellipse(x, -y[x], 9);

}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(0);

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}
