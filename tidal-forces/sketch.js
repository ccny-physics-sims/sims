var aVector=[]
var G = 1;
var MassMoon = 1;
var mass = 1;

var r;
var howMany = 16;
var theta = [];
var rSlider;
var massMoonSlider;
var s;

let img;
let REarth;
function setup() {
  canvas=createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');

  imageMode(CENTER);
  centerx = width/3;
  centery = height/2;

  maxMoon = min(450,width/2)
  REarth = min(100,width/8)
    rSlider = createSlider(REarth+70, maxMoon, maxMoon, 1);
    rSlider.position(20,20);
    rSlider.parent('sketch-holder');
    rSlider.class("sim-slider");

    massMoonSlider = createSlider(10, 100, 50, 1);
    massMoonSlider.position(20,rSlider.y+80);
    massMoonSlider.parent('sketch-holder');
    massMoonSlider.class("sim-slider");

    diff  = createCheckbox('Differential Forces?', true);
    diff.parent('sketch-holder');
    diff.style('color','black')
    diff.position (20,massMoonSlider.y+60)


  startPoint = createVector(0, 0);
  for (var i = 0; i < howMany; i++) {
  aVector[i] = new Arrow(startPoint, startPoint);
  aVector[i].grab = false;
  aVector[i].draggable = false;
  aVector[i].color = color(250,10,10);
  aVector[i].width = 6

}

}

function draw() {
  background(255);
  push();
  noStroke();
  fill('black');
  textSize(18)

  text('Moon Position',20,rSlider.y+20,150,90);
  text('Moon Mass',20,massMoonSlider.y+20,150,90);
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
  fill(0)
  text('Earth',centerx-15,height*.7)
  text('Moon',centerx+r-15,height*.7)


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
