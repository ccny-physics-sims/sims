var pendLength = 205;

var gravity;
var theta0 = Math.PI/12;
var circRad = pendLength*Math.sin(theta0)
var omega;
var rotAngle = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  //y = new Array(windowWidth);

  // amplitudeControl = createSlider(-200,200,50,0);
  // amplitudeControl.position(80,50)
  // amplitudeControl.parent('sketch-holder')
  // amplitudeControl.class("sim-slider");
  // amplitudeControlLabel = createP("Amplitude");
  // amplitudeControlLabel.position(50,20);
  // amplitudeControlLabel.parent('sketch-holder')
  //
  //
  // gControl = createSlider(.01,1,.2,.01);
  // gControl.position(400,50)
  // gControl.parent('sketch-holder')
  // gControl.class("sim-slider");
  // gControlLabel = createP("Omega");
  // gControlLabel.position(400,20);
  // gControlLabel.parent('sketch-holder')
  gravity = .2
  p = new Pendulum(createVector(0,0),pendLength,theta0);

}


function draw() {
  background(250)
  stroke(0)
  //move things to the middle
  translate(width/2, height / 6)
  //x axis
  // line(0, 0, width, 0)
  // line(0,-200,0,200)
  //gravity = gControl.value();
  p.littleg = gravity;
  omega = Math.sqrt(gravity/pendLength);

  p.update();
  p.go();
  translate(0,300)
  noFill()
  stroke(150)
  line(0,-height,0,0)
  stroke('blue')

    ellipse(0,0,circRad*2)
    line(circRad*Math.cos(omega*frameCount),-120,circRad*Math.cos(omega*frameCount),circRad*Math.sin(omega*frameCount))
    rotAngle += omega
    rotate(rotAngle)
    translate(circRad,0)

    fill('blue')
    noStroke()
    ellipse(0,0,10)
    stroke('blue')
    line(-circRad,0,0,0)



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
  text('-A ',-70,abs(amplitude)+5)
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
