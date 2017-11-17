function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(windowWidth);

  amplitudeControl = createSlider(-200,200,50,0);
  amplitudeControl.position(80,50)
  amplitudeControl.parent('sketch-holder')
  amplitudeControl.class("sim-slider");
  amplitudeControlLabel = createP("Amplitude");
  amplitudeControlLabel.position(50,20);
  amplitudeControlLabel.parent('sketch-holder')


  omegaControl = createSlider(1,4,2,.01);
  omegaControl.position(400,50)
  omegaControl.parent('sketch-holder')
  omegaControl.class("sim-slider");
  omegaControlLabel = createP("Omega");
  omegaControlLabel.position(400,20);
  omegaControlLabel.parent('sketch-holder')
}


function draw() {
  background(250)
  stroke(0)
  //move things to the middle
  translate(80, height / 2)
  //x axis
  line(0, 0, width, 0)
  line(0,-200,0,200)

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
  for (var x = 0; x < y.length; x += 10) {

    ellipse(x, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('red');

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -y[x]);
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
  text('A (min)',-70,abs(amplitude)+5)
}

function showPeriod(){
  stroke(0)
  translate(0,-80)
  line(PI/(2*.01*omega),0,PI/(2*.01*omega),-30)
  line(5*PI/(2*.01*omega),0,5*PI/(2*.01*omega),-30)
  line(PI/(2*.01*omega),-15,5*PI/(2*.01*omega),-15)
  noStroke()
  text('T (period)',-30+(PI/(2*.01*omega)+5*PI/(2*.01*omega))/2,-30)
}
