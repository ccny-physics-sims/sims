var radSlider; // these are sliders
var dx = 0;
var dtheta = 0;
var dy = 0;

function setup() {
canvas = createCanvas(600,400);
canvas.parent('sketch-holder');
radSlider = createSlider(2,300, 50);
radSlider.position(50,250);
radSlider.parent('sketch-holder')
}

function draw() {
  background(color('rgb(135, 207, 153)'));
  radCurv = radSlider.value();

  startLine = {x: 0, y: height-70};
  segment = {len: 200, dir: 0};
  strokeCap(SQUARE);
  paintRoad(30,color(150));
  paintRoad(2,color('yellow'));
  strokeWeight(1);
  drawCircle();
  moveCar();

}

function paintRoad(_weight,_color){
  push();
  noFill();
  noSmooth();
  strokeWeight(_weight);
  stroke(_color)
  translate(startLine.x,startLine.y)
  line(0,0,segment.len*Math.cos(segment.dir),segment.len*Math.sin(segment.dir))
  arc(segment.len,-radCurv,radCurv*2,radCurv*2,0,PI/2);
  translate(segment.len*Math.cos(segment.dir)+radCurv,segment.len*Math.sin(segment.dir)-radCurv);
  line(0,0,0,0-height-radCurv);
  pop();
}

function drawCircle() {
  push();
  noFill();
  noSmooth();
  strokeWeight(1);
  stroke(255)
  translate(startLine.x,startLine.y)
  ellipse(segment.len,-radCurv,radCurv*2,radCurv*2);
  //line(segment.len,-radCurv,segment.len,0)
  translate(segment.len,-radCurv)
  rotate(PI/4)
  stroke('blue')
  line(0,0,radCurv,0)
  textSize(20);
  fill(0);
  noStroke()
  text('Radius = '+radCurv,radCurv/3,-20)
  pop();
}

function moveCar() {
  //xpos = 0;
  //ypos = 0;
  push();
  fill(0);
  noStroke();

  carRadCurv = radCurv+8;
  quarterCirc = (PI*2*carRadCurv)/4;
  DelthetaRad = 1/carRadCurv


  if (dx >= 0 && dx < segment.len){
  translate(dx,startLine.y+8);
  }

  else if (dx >= segment.len && dx < segment.len + quarterCirc ){
    translate(segment.len,startLine.y+8);

    translate(carRadCurv*sin(dtheta), -carRadCurv*(1-Math.cos(dtheta)));
    //rotate(dx*PI/180);

    dtheta=dtheta+DelthetaRad;

  }

  else if (dx >= segment.len + quarterCirc && dx <= segment.len + quarterCirc + startLine.y - carRadCurv) {
    translate(segment.len+carRadCurv, startLine.y-carRadCurv+8);
    translate(0,-dy)
    dy++
  }

  else if(dx > segment.len + quarterCirc + startLine.y-2*carRadCurv){
    dx=0;
    dtheta=0;
    dy=0;
  }
  //console.log(dx)
  dx++

  ellipse(0,0,5,5);

  pop();




}
