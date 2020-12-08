let thetaSpacing = .1;
let n=1;
let omega = 1;
let waveColor;
let spacing;

function setup() {
angleMode(RADIANS)
  frameRate(20);
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');



  rvalues = new Array(floor(TWO_PI/thetaSpacing)+4);

  nSlider = createSlider(1, 9, 1,1);
  nSlider.parent('sketch-holder');

  nSlider.position(20,20);
  nSlider.class("sim-slider gray");

  text1 = createP();
  text1.parent('sketch-holder');
  text1.position(20,height*.9);
  text1.html('Current energy level')

  nLabel = createP();
  nLabel.parent('sketch-holder');
  nLabel.position(20,nSlider.y+10);
  nLabel.html('integer change')

  halfSlider = createSlider(0, 1, 0,.1);
  halfSlider.parent('sketch-holder');
  halfSlider.position(20,nSlider.y+80);
  halfSlider.class("sim-slider gray");

  halfLabel = createP();
  halfLabel.parent('sketch-holder');
  halfLabel.position(20,halfSlider.y+10);
  halfLabel.html('fractional change ')


  dtheta = thetaSpacing;
  spacing = min(width,height)/10
}

function draw() {
  clear();
  background(255);

  radius = spacing*(n/2);
  //t = millis()/1000;
  t = frameCount/10;

  half = halfSlider.value();
    n = nSlider.value()+half;
    if (Number.isInteger(n)){
      waveColor = color(0,0,250)
    }
    else {
      waveColor = color(250,0,0)
    }

  //dtheta = .1;

  calcWave(0);
  renderWave(waveColor,3);

  for (i = 0;i<10;i++){
  push();
  stroke(150,150,250)
  noFill();
  ellipse(width/2,height/2,spacing*(i),spacing*(i))
  pop()
  }


  text1.html('Current energy level: n = '+ n);
  //halfLabel.html(half)
}

function calcWave(phase_) {
theta = 0
  //var theta = theta;

  for (var i = 0; i < rvalues.length; i++) {
    //rvalues[i] = radius+(10*(Math.sin((n)*theta+omega*t)+Math.sin((n)*theta-omega*t)));//sin(x+phase_)*amplitude;
    rvalues[i] = radius+10*Math.sin(n*theta)*Math.cos(omega*t)
    theta+=dtheta;
  }
}

function renderWave(color_,weight_) {
  theta=0;
  push()
  noFill();
  stroke(color_);
  strokeWeight(weight_)
  translate(width/2,height/2)
  beginShape();
  for (var x = 0; x < rvalues.length; x++) {
    curveVertex(rvalues[x]*Math.cos(theta), rvalues[x]*Math.sin(theta));
    theta+=dtheta;
  }
  endShape();
  pop()

}
