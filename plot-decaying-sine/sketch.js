var b = .2;
var m = 200;
var k = 8;
var amplitude = 200;
var phi=0;
var omega;

function setup() {
  canvas = createCanvas(.8*windowWidth, .7*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(300);
  expFunct = new Array(300);

  dampingControl = createSlider(0,30,5,0);
  dampingControl.position(80,height*.12)
  dampingControl.parent('sketch-holder')
  dampingControl.class("sim-slider");

  dampingControlLabel = createP("Damping");
  dampingControlLabel.position(80,20);
  dampingControlLabel.parent('sketch-holder')

  tauLabel = createP('&tau;');
  tauLabel.style('font-size', '2em')

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
    expFunct[t] = amplitude*Math.exp( (-b*t)/(2*m) )
  }

}



function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('hsb(200,100%,100%)');
  strokeWeight(2)
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width)
    curveVertex(xscaled, -y[x]);
  }
  endShape();
  pop();

  push();
  //noFill();
  fill('hsba(200,40%,100%,.2)')
  noStroke()
  //stroke('hsb(200,50%,100%)');
  //strokeWeight(1)
  beginShape();
  curveVertex(0,-amplitude)
  //curveVertex(0,amplitude-50)
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width)
    curveVertex(xscaled, -expFunct[x]);
  }
  curveVertex(xscaled,expFunct[y.length-1])
  for (var x = y.length-1; x > 0; x -= 2) {
    xscaled = map(x,0,y.length,0,width)
    curveVertex(xscaled, expFunct[x]);
  }
  curveVertex(0,amplitude)
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
  tau = (2*m/b)*width/y.length
  line(tau,-.37*amplitude-30,tau,0)
  line(0,-.37*amplitude,tau+30,-.37*amplitude)
  pop();

  tauLabel.position(tau+200,height/2)

}
