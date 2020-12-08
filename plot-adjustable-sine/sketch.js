function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(200);
  ampMax = min(200,height/4)
  amplitudeControl = createSlider(-ampMax,ampMax,50,0);
  amplitudeControl.position(30,height*.05)
  amplitudeControl.parent('sketch-holder')
  amplitudeControl.class("sim-slider");

  amplitudeControlLabel = createP("Amplitude");
  amplitudeControlLabel.position(30,amplitudeControl.y);
  amplitudeControlLabel.parent('sketch-holder')


  omegaControl = createSlider(5,30,15,.1);
  omegaControl.position(30,height*.15)
  omegaControl.parent('sketch-holder')
  omegaControl.class("sim-slider");

  omegaControlLabel = createP("Omega");
  omegaControlLabel.position(30,omegaControl.y);
  omegaControlLabel.parent('sketch-holder')
}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, height / 2)
  //x axis
  line(0, 0, width, 0)
  line(0,-ampMax*1.1,0,ampMax*1.1)
  widthScale = y.length/width;
  amplitude = amplitudeControl.value();
  omega = omegaControl.value();
  //calculate this points
  calcFunction();
  //display discrete points
  renderPoints();
  //display connected line
  renderLine();

  showMaxAmplitude();
  showPeriod();
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * Math.sin(.01 * x*omega)
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width)
    ellipse(xscaled, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('red');

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width)
    curveVertex(xscaled, -y[x]);
  }
  endShape();
  pop();
}
function showMaxAmplitude(){
  stroke(0)
  line(00,-amplitude,10,-amplitude)
  line(0,amplitude,10,amplitude)
  noStroke()
  text('A (max)',-70,-abs(amplitude)+5)
  text('-A ',-70,abs(amplitude)+5)
}

function showPeriod(){
  stroke(0)
  translate(0,-80)
  line(PI/(2*.01*omega*widthScale),0,PI/(2*.01*omega*widthScale),-30)
  line(5*PI/(2*.01*omega*widthScale),0,5*PI/(2*.01*omega*widthScale),-30)
  line(PI/(2*.01*omega*widthScale),-15,5*PI/(2*.01*omega*widthScale),-15)
  noStroke()
  text('T (period)',(PI/(2*.01*omega*widthScale)+5*PI/(2*.01*omega*widthScale))/2,-30)
}
