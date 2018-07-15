var aVector=[]
var G = 1;
var MassMoon = 1;
var mass = 1;
var REarth = 100;
var r;
var howMany = 16;
var theta = [];
var rSlider;
var massMoonSlider;
var s;
function setup() {
  canvas=createCanvas(windowWidth, 500);
  canvas.parent('sketch-holder');
  centerx = width/4;
  centery = height/2;

  diff  = createCheckbox('Differential?', false);
  diff.parent('sketch-holder');
  diff.position (20,120)
    rSlider = createSlider(REarth+70, 450, 450, 1);
    rSlider.position(20,20);
    rSlider.parent('sketch-holder');
    rSlider.class("sim-slider red");

    massMoonSlider = createSlider(10, 100, 100, 1);
    massMoonSlider.position(20,70);
    massMoonSlider.parent('sketch-holder');
    massMoonSlider.class("sim-slider blue");
  startPoint = createVector(0, 0);
  for (var i = 0; i < howMany; i++) {
  aVector[i] = new Arrow(startPoint, startPoint);
  aVector[i].grab = false;
  aVector[i].draggable = false;
  aVector[i].color = color(0,0,0);
  aVector[i].width = 6

}

}

function draw() {
  background(255);
  push();
  noStroke();
  fill('black');
  text('Moon Position',20,10,150,90);
  text('Moon Mass',20,60,150,90);
  pop();
  MassMoon = massMoonSlider.value();
  r = rSlider.value();
  noStroke();
    if (diff.checked()){
  fill(100,150,250)
  ellipse(centerx,centery,REarth*2+(MassMoon/100)*(200000000/Math.pow(r,3)),REarth*2-(MassMoon/100)*(7000000/Math.pow(r,3)))
}
  fill(200)
  ellipse(centerx,centery,REarth*2,REarth*2-(MassMoon/100)*(7000000/Math.pow(r,3)))

  ellipse(centerx+r,centery,REarth*2*(MassMoon/100)*.27,REarth*2*(MassMoon/100)*.27)


  translate(centerx,centery)
  for (var i = 0; i< howMany; i++) {
  theta[i] = PI*(2/16)*i;
  startPoint = createVector(REarth*cos(theta[i]),REarth*sin(theta[i]))
  aVector[i].origin = startPoint;
  if (diff.checked()){
  delf = createVector(2*cos(theta[i])/(Math.pow(r,3)),-sin(theta[i])/(Math.pow(r,3)))
  delf.mult(800000*MassMoon)
  }
  else{
    s = Math.sqrt(Math.pow(REarth*sin(theta[i]),2)+Math.pow(r-REarth*cos(theta[i]),2))
    delf = createVector(((r-REarth*cos(theta[i]))/s)/(Math.pow(s,1)),-(REarth*sin(theta[i])/s)/(Math.pow(s,1)))
    delf.mult(100*MassMoon)
  }
  aVector[i].target = p5.Vector.add(startPoint,delf)

  aVector[i].update();
  aVector[i].display();
}


}
