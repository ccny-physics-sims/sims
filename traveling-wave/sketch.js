var xspacing = 10;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 100;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var k = 2*Math.PI/wavelength;
var omega = 2;

function setup() {

  //frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;

  dx = (TWO_PI / wavelength) * xspacing;
  //yvalues = new Array(floor(w/xspacing));
    y = new Array(windowWidth);

}

function draw() {
  background(255);

  t = millis()/1000;

  calcWave();
  push()
  translate(0,height/2);
  renderPoints();

  //renderLine()
  pop()

  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();

  push();
  fill('blue');
  noStroke();
  ellipse(wavelength*10,-amplitude*Math.sin(omega*t)+height/2,10)
  pop();

  push()
  stroke(100)
  translate(3.0*Math.round((width/2)/3.0),0)
  line(0,0,0,height)
  pop();
}

function calcWave() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * Math.sin(k*x - omega*t);
  }

}




function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  //stroke(color("hsb(0,100,100)"))

  stroke('red')
  fill('pink')
  x =3.0*Math.round((width/2)/3.0);
      ellipse(x, -y[x], 9);
      //fill(color('hsb(0,100,100)'));
      //stroke(59)
      noStroke();
      fill(100)
      for (var x = 0; x < y.length; x += 3) {
      ellipse(x, -y[x], 4);
    }
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
