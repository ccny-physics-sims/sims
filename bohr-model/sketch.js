 var thetaSpacing = .1;
 var n=1;
 var omega = 1;


function setup() {
angleMode(RADIANS)
  frameRate(20);
  canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');



  rvalues = new Array(floor(TWO_PI/thetaSpacing)+4);

  nSlider = createSlider(1, 9, 1);
  nSlider.elt.step =1;
  nSlider.position(400,50);
  nSlider.class("sim-slider gray");

  text1 = createP();
  text1.position(400,0);
  text1.parent('sketch-holder')
  text1.html('Current energy level')

  nLabel = createP();
  nLabel.position(550,47);
  nLabel.parent('sketch-holder');
  nLabel.html('&larr; integer change')

  halfSlider = createSlider(0, 1, 0);
  halfSlider.elt.step =.1;
  halfSlider.position(400,100);
  halfSlider.class("sim-slider gray");

  halfLabel = createP();
  halfLabel.position(550,97);
  halfLabel.parent('sketch-holder');
  halfLabel.html('&larr; fractional change ')


  dtheta = thetaSpacing;
}

function draw() {
  clear();
  background(0,0,0,0);
radius = 50*(n/2);
  //t = millis()/1000;
  t = frameCount/10;

  half = halfSlider.value();
    n = nSlider.value()+half;

  //dtheta = .1;

  calcWave(0);
  renderWave(color(250,0,0),2);

  for (i = 0;i<10;i++){
  push();
  stroke(250,150,150)
  noFill();
  ellipse(width/2,height/2,50*(i),50*(i))
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
