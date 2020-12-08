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

  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;

  y = new Array(200);

 wavelengthSlider = createSlider(20, 200, 100,1);
 wavelengthSlider.parent('sketch-holder');
  wavelengthSlider.position(20,20);
  wavelengthSlider.class("sim-slider");
anLabel = createP('antinode');
anLabel.parent('sketch-holder');
nLabel = createP('node');
nLabel.parent('sketch-holder');

}

function draw() {
  background(255);
  wavelength = wavelengthSlider.value()
  k = 2*Math.PI/wavelength;
  //t = millis()/1000;
  line((1*wavelength*(width/y.length)),height/2,1*wavelength*(width/y.length),height-50)
  line((1.75*wavelength*(width/y.length)),height/2,1.75*wavelength*(width/y.length),height-50)

  // calcWave(1);
  // renderWave(color(250,200,200),1);
  //
  // calcWave(-1);
  // renderWave(color(200,200,250),1);

  calcWave();
  push()
  translate(0,height/2);
  renderLine();
  pop();

  anLabel.position( 1.75*wavelength*(width/y.length)-20 ,height-50)
  nLabel.position(1*wavelength*(width/y.length)-20  ,height-50)


  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();

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
  stroke(color('rgba(200,0,200,1)'));
  strokeWeight(2);
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    curveVertex(map(x,0,y.length,0,width), -y[x]);
  }
  endShape();
  pop();
}
