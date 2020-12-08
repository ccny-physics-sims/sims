var theta, lengthV;

function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  // the length of the vector is 100!
  lengthV = 100;
  //its startPoint (i.e. origin) is in the center of the canvas
  startPoint = createVector(width / 2, height / 2);
  //it will initially start
  vdisp = createVector(0, -lengthV);
  endPoint = p5.Vector.add(startPoint, vdisp)

  aVector = new Arrow(startPoint, endPoint);
  aVector.color = color('green');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;
  aVector.width = 12;
  dtheta = .01;
  theta = 0;
}



function draw() {

  background(250);

  //makes an x-y coordinate axis
  stroke('gray');
  line(width/2,0,width/2,height);
  line(0,height/2,width,height/2);

  // sets a rotation in the CCW direction
  theta = theta - dtheta;

  //both the origin and the endpoint are moving now, but the length stays the same.
  aVector.origin = p5.Vector.add(startPoint,createVector(2*lengthV*cos(theta),2*lengthV*sin(theta)));
  aVector.target = p5.Vector.add(aVector.origin,createVector(lengthV*sin(theta),-lengthV*cos(theta)));
  aVector.update();
  aVector.display();

  //just draw some other things
  push();
  noFill();
  stroke('black')
  ellipse(width / 2, height / 2, 4*lengthV, 4*lengthV);
  pop();
  push();
  fill('black');
  ellipse(width / 2, height / 2, 5, 5);
  pop()

  push();
  fill('black');
  translate(width/2,height/2)
  rotate(theta)
  translate(2*lengthV,0)
  ellipse(0,0,15)
  pop();
  }
