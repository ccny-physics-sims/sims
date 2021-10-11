
let unit;
let origin;
let alpha;
let hyperbolaFill = 'rgba(48, 138, 255, 0.34)';
let hyperbolaStroke = 'rgba(48, 138, 255, 0.9)';
let circleFill = 'rgba(231, 27, 67, 0.34)';
let circleStroke = 'rgba(231, 27, 67, 0.9)';
let checkbox;
let labelsOn = false;

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")
  origin = createVector(width/2,height/2)


  unit = min(250,width/3)

  vslider = createSlider(0,6.28,1,.01);
  vslider.style('width', '200px');
  vslider.input(vsliderChange);
  vslider.position(50,50);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  vsliderLabel = createP("Speed of Primed System: ");
  vsliderLabel.parent('sketch-holder');
  vsliderLabel.position(vslider.x,vslider.y+20);
  vsliderLabel.style("font-family","Times, serif")
  vsliderLabel.style("font-size","1.2em")

  checkbox = createCheckbox('Labels?', false);
  checkbox.changed(showLabels);
  checkbox.parent("sketch-holder")
  checkbox.position(vslider.x,vslider.y+100)
  checkbox.class("")



  frameRate(30);

  coshLabel = createP("<i>cosh(&alpha;)</i>");
  coshLabel.parent('sketch-holder');
  coshLabel.hide();

  sinhLabel = createP("<i>sinh(&alpha;)</i>");
  sinhLabel.parent('sketch-holder');
  sinhLabel.hide();

  cosLabel = createP("<i>cos(&alpha;)</i>");
  cosLabel.parent('sketch-holder');
  cosLabel.hide();

  sinLabel = createP("<i>sin(&alpha;)</i>");
  sinLabel.parent('sketch-holder');
  sinLabel.hide();
  noLoop();
}

function draw() {
  background(250);
  //makeAxis();
  stroke(200)
  fill(255)
  vsliderLabel.html("Angle : "+vslider.value())

  alpha = vslider.value();
  translate(origin.x,origin.y)
  stroke(0)
  strokeWeight(2)
  fillHyperbolicAngle()

  makeHyperbola()
  ellipse(unit*cosh(alpha),-unit*sinh(alpha),5)

  stroke(circleStroke)
  noFill()
  ellipse(0,0,unit*2)
  fill(circleFill)



  strokeWeight(2)
  arc(0,0,2*unit,2*unit,-alpha,0)
  fill(250)




  makeAxis()
  stroke(circleStroke)
  strokeWeight(2)
  push()
  rotate(-alpha)
  line(0,0,unit,0)
  pop()
  ellipse(unit*cos(alpha),-unit*sin(alpha),5)
  //console.log(counter);
  push()
  drawingContext.setLineDash([3, 3]);
  stroke(50)
  strokeWeight(1)
  line(unit*cosh(alpha),0,unit*cosh(alpha),-unit*sinh(alpha))
  line(0,-unit*sinh(alpha),unit*cosh(alpha),-unit*sinh(alpha))
  line(unit*cos(alpha),0,unit*cos(alpha),-unit*sin(alpha))
  line(0,-unit*sin(alpha),unit*cos(alpha),-unit*sin(alpha))
  pop()


  if (labelsOn==true){
    coshLabel.show()
    coshLabel.position(origin.x+unit*cosh(alpha)/2,-40+origin.y-unit*sinh(alpha))
    cosLabel.show()
    cosLabel.position(origin.x+unit*cos(alpha)/2,-40+origin.y-unit*sin(alpha))
    sinhLabel.show()
    sinhLabel.position(10+origin.x+unit*cosh(alpha),-30+origin.y-unit*sinh(alpha)/2)
    sinLabel.show()
    sinLabel.position(10+origin.x+unit*cos(alpha),-30+origin.y-unit*sin(alpha)/2)
  }
  else {
    coshLabel.hide()
    cosLabel.hide()
    sinhLabel.hide()
    sinLabel.hide()
  }
}
function mousePressed() {

}

function fillHyperbolicAngle(){
  fill(hyperbolaFill)
  stroke(hyperbolaStroke)

  beginShape()
  let i = 0;
  let y = 0;
  vertex(0,0)
  vertex(unit,0)
  vertex(unit*cosh(alpha),-unit*sinh(alpha))
  // while (i<500) {
  //   //console.log(i);
  //   dx=i*0.01
  //   //console.log(dx);
  //   i=i+1;
  //   y = -sqrt((unit*dx)**2-unit**2)
  //   vertex(unit*dx,y)
  //   ellipse(unit*dx,y,4)
  //   //console.log(y);
  //   if (abs(y)>=(unit*sinh(alpha))){
  //     break;
  //   }
  // }
  vertex(0,0)
endShape()
//console.log('bye');
}
function makeHyperbola() {
  fill(250)
stroke(hyperbolaStroke)
  beginShape();
  for (let i=0;i<300;i++)
  {
    dx = i*0.02
    vertex(unit*dx, -sqrt((unit*dx)**2-unit**2));
    //ellipse(unit*dx, -sqrt((unit*dx)**2-unit**2),5)
  }
vertex(unit*cosh(13),-unit*sinh(13));
  endShape();
  beginShape();
  for (let i=0;i<300;i++)
  {
    dx = i*0.02
    vertex(unit*dx, +sqrt((unit*dx)**2-unit**2));
    //ellipse(unit*dx, -sqrt((unit*dx)**2-unit**2),5)
  }
  vertex(unit*cosh(13),-unit*sinh(13));
  endShape();
}

function sinh(x) {
return (exp(x)-exp(-x))/2
}

function cosh(x){
return (exp(x)+exp(-x))/2
}
function makeAxis() {
  stroke(0)
  strokeWeight(1)
  //translate(origin.x,origin.y)
  line(-width/2,0,width/2,0)
  line(0,-height/2,0,height/2)
  for (let i=-4;i<4;i++){
  line(i*unit,-10,i*unit,10)
  line(-10,-i*unit,10,-i*unit)
  }
}





function showLabels() {

  if (this.checked()) {
    labelsOn = true;
  } else {
    labelsOn = false;
  }
  redraw();
}


function vsliderChange() {

  redraw();
}
