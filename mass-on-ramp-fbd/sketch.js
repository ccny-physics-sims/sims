
var forceSlider;
var triangleHeight, triangleBase;

function setup() {
  canvas=createCanvas(400 , 400);
  canvas.parent('sketch-holder');

  angleSlider = createSlider(0, 30, 30, 1);
  angleSlider.position(20,50);
  angleSlider.parent('sketch-holder');
  angleSlider.class("sim-slider red");

  box_fbd = new FBD(createVector(width/2,height/2+80),3,true);

  box_fbd.showLabels = true;
  box_fbd.showResultant = false;
  triangleBase = 200;
  triangleHeight = 100;


}

function draw() {
  background(255);
  theta = angleSlider.value()*PI/180;
  triangleHeight = triangleBase*Math.tan(theta);
  drawTriangle()

  push();
  noStroke();
  fill('black');
  text('Ramp Angle: ' + round(angleSlider.value()) +  ' deg',20,30,150,90);
  pop();

  translate(0,-triangleHeight/2);
  box_fbd.mag = [100,100*Math.cos(theta),100*Math.sin(theta)];
  box_fbd.direction = [PI/2,PI+(PI/2-theta),-theta]
  box_fbd.xoffsets = [0,0,0]
  box_fbd.yoffsets = [0,0,0]
  box_fbd.labels = ['gravity','normal','static friction']

  box_fbd.update();
  box_fbd.display();


}

function drawTriangle() {
  push();
  fill(200);
  translate(width/2-triangleBase/2,height/2+80);
  triangle(0,0,triangleBase,0,triangleBase,-triangleHeight);
  pop();
}
