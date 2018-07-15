var b = .1;
var m = 200;
var k = .5;
var amplitude = 200;
var phi=0;
var omega;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(windowWidth);
  exp = new Array(windowWidth);

  dampingControl = createSlider(0,10,1,0);
  dampingControl.position(80,50)
  dampingControl.parent('sketch-holder')
  dampingControl.class("sim-slider");

  dampingControlLabel = createP("Damping");
  dampingControlLabel.position(80,20);
  dampingControlLabel.parent('sketch-holder')
  tauLabel = createP('&tau;');

}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, height / 2)
  //x axis
  line(0, 0, width, 0)
  line(0,-200,0,200)

  b = dampingControl.value()
  omega = Math.sqrt((k/m)-(Math.pow(b,2)/(4*Math.pow(m,2))))

  //calculate this points
  calcFunction();
  //display discrete points
  //renderPoints();
  //display connected line
  renderLine();
  showMaxAmplitude();
  showTau();

}

function calcFunction() {
  //this function fills the aray with values
  for (var t = 0; t < y.length; t += 1) {
    //y[x] = amplitude * Math.sin(.01 * x*omega)
    y[t] = amplitude*Math.exp( (-b*t)/(2*m) )* Math.cos(omega*t + phi)
    exp[t] = amplitude*Math.exp( (-b*t)/(2*m) )
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 5) {

    ellipse(x, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('hsb(200,100%,100%)');
  strokeWeight(2)
  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();

  push();
  noFill();
  stroke('hsb(200,50%,100%)');
  strokeWeight(1)
  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -exp[x]);
  }
  endShape();
  pop();


}
function showMaxAmplitude(){
  stroke(0)
  line(00,-amplitude,10,-amplitude)
  line(0,amplitude,10,amplitude)
  noStroke()
  text('A',-70,-abs(amplitude)+5)
  text('-A ',-70,abs(amplitude)+5)
  text('0.37A',-70,-.37*abs(amplitude)+5)
}

function showTau(){
  push();
  stroke(100)
  tau = 2*m/b
  line(tau,-.37*amplitude-30,tau,0)
  line(0,-.37*amplitude,tau+30,-.37*amplitude)

  pop();
  tauLabel.position(80+tau,height/2)

}
