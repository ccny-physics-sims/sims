
let primeSpeed;
let counter = 0;
let c = 1;
let v = 0;
let running = true;
let origin;
let unitSpacing;
let primedSystemColor = "#4287f5"

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  origin = createVector(width/2,height/2)

  vslider = createSlider(-180,180,0,1);
  vslider.style('width', '200px');
  vslider.input(vsliderChange);
  vslider.position(50,30);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  vsliderLabel = createP("Rotation Angle: ");
  vsliderLabel.parent('sketch-holder');
  vsliderLabel.position(vslider.x,vslider.y+10);
  vsliderLabel.style("font-family","Times, serif")
  vsliderLabel.style("font-size","1.2em")
   
  frameRate(19);

  unitSpacing = 30;
  rectMode(CENTER);

  thetaDEG = vslider.value();
  noLoop();
}

function draw() {
  background(250);
  //makeAxis();
  
  thetaDEG = vslider.value();
  theta = thetaDEG*Math.PI/180;
  vsliderLabel.html("Rotation Angle: "+thetaDEG+" &deg;")
  line(0,height/2,width,height/2)
  line(width/2,0,width/2,height)
  translate(origin.x,origin.y)
  c1 = color('rgba(255, 251, 0, 1)');
  fill(c1)
  rect(0, 0, width/4, width/4);
  applyMatrix(Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta),0, 0);
  c2 = color('rgba(255, 0, 0, 0.5)');
  fill(c2)
  rect(0, 0, width/4,  width/4);
  
  
}




function vsliderChange() {
  //vAmount = vslider.value()
  redraw();
}
