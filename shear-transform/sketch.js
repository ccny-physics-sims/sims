
let primeSpeed;
let counter = 0;
let c = 10000;
let refSpeed = 0;
let running = true;
let origin;
let unitSpacing;
let primedSystemColor = "#4287f5"
function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  origin = createVector(width/2,height/2)







  shearslider = createSlider(0,1,0,.01);
  shearslider.style('width', '200px');
  shearslider.input(shearsliderChange);
  shearslider.position(50,30);
  shearslider.class('sim-slider');
  shearslider.parent('sketch-holder');


  vsliderLabel = createP("Shear X");
  vsliderLabel.parent('sketch-holder');
  vsliderLabel.position(shearslider.x,shearslider.y+10);
  vsliderLabel.style("font-family","Times, serif")
  vsliderLabel.style("font-size","1.2em")






  frameRate(19);





  unitSpacing = 30;
  rectMode(CENTER);

}

function draw() {
  background(250);
  //makeAxis();
line(0,height/2,width,height/2)
line(width/2,0,width/2,height)
  translate(origin.x,origin.y)
  c1 = color('rgba(0, 0, 255, .5)');
  fill(c1)
rect(0, 0, width/4, width/4);
  shearAmount = shearslider.value()
shearX(-shearAmount);
c2 = color('rgba(0, 100, 255, .5)');
fill(c2)
rect(0, 0, width/4,  width/4);

}




function shearsliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  shearAmount = shearslider.value()
  //redraw();
}
