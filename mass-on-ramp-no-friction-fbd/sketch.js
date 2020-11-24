
var forceSlider;
var triangleHeight, triangleBase;

function setup() {
  canvas=createCanvas(.8*windowWidth,.7*windowHeight,);
  canvas.parent('sketch-holder');

  angleSlider = createSlider(0, 90, 30, 1);
  angleSlider.position(20,50);
  angleSlider.parent('sketch-holder');
  angleSlider.class("sim-slider red");

  angleSliderLabel = createP()
  angleSliderLabel.parent('sketch-holder');
  angleSliderLabel.position(20,80)
  angleSliderLabel.html('&theta; = '+angleSlider.value()+'º')

  box_fbd = new FBD(createVector(width/2,height/2+80),2,true);

  box_fbd.showLabels = true;
  box_fbd.showResultant = false;
  triangleBase = 300;
  triangleHeight = 100;

  thetaLabel = createP()
  thetaLabel.parent('sketch-holder');

  thetaLabel.html('&theta;')
  thetaLabel.position(20,100)

}

function draw() {
  background(255);
  theta = angleSlider.value()*PI/180;
  if (theta < 50*PI/180){
  triangleHeight = triangleBase*Math.tan(theta);
  triangleBase = 300;
  }
  else {
  triangleHeight = 300*Math.tan(50*PI/180);
  triangleBase = triangleHeight/Math.tan(theta);
  }
  drawTriangle()
  drawCoordinates();

  // push();
  // noStroke();
  // fill('black');
  // text('Ramp Angle: ' + round(angleSlider.value()) +  ' deg',20,30,150,90);
  // pop();

  translate(0,-triangleHeight/2);
  box_fbd.mag = [100,100*Math.cos(theta)];
  box_fbd.direction = [PI/2,(-PI/2-theta)]
  box_fbd.xoffsets = [0,0]
  box_fbd.yoffsets = [0,0]

  box_fbd.labels = ['weight','normal']

  box_fbd.update();
  box_fbd.display();

  angleSliderLabel.html('&theta; = '+angleSlider.value() +'º')
  thetaLabel.position(width/2-triangleBase/2+50,height/2+60)
}

function drawCoordinates() {
  push();
  textSize(14);
  translate(80,200);
  text("x",50*Math.cos(theta),-50*Math.sin(theta)-10);
  text("y",-50*Math.sin(theta),-50*Math.cos(theta)-10);
  push();
  stroke(0);

  rotate(-theta);
  line(0,0,50,0);
  line(50,0,40,6);
  line(50,0,40,-6);
  line(0,0,0,-50);
  line(0,-50,6,-40);
  line(0,-50,-6,-40);
  pop();
  pop();

}

function drawTriangle() {
  push();
  fill(200);
  translate(width/2-triangleBase/2,height/2+80);
  triangle(0,0,triangleBase,0,triangleBase,-triangleHeight);
  pop();
}
