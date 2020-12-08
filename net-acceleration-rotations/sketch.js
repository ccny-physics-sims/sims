var theta, lengthV;
var on = true;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  // the length of the vector is 100!
  lengthV = min(width/8,100);
  //its startPoint (i.e. origin) is in the center of the canvas
  startPoint = createVector(width / 2, height / 2);
  //it will initially start
  vdisp = createVector(0, -lengthV);
  endPoint = p5.Vector.add(startPoint, vdisp)

  aVector = new Arrow(startPoint, endPoint);
  aVector.color = color(220,20,250);
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;
  aVector.width = 12;
  aVectorLabel = createP();
  aVectorLabel.parent('sketch-holder');
  aVectorLabel.html('a<sub>T</sub>');

  aCentVector = new Arrow(startPoint, endPoint);
  aCentVector.color = color(220,20,250);
  aCentVector.grab = false;
  aCentVector.draggable = false;
  aCentVector.showComponents = false;
  aCentVector.width = 12;
  aCentVectorLabel = createP();
  aCentVectorLabel.parent('sketch-holder');
  aCentVectorLabel.html('a<sub>c</sub>');

  aResultantVector = new Arrow(startPoint, endPoint);
  aResultantVector.color = color(250,150,250);
  aResultantVector.grab = false;
  aResultantVector.draggable = false;
  aResultantVector.showComponents = false;
  aResultantVector.width = 12;
  aResultantVectorLabel = createP();
  aResultantVectorLabel.parent('sketch-holder');

  dtheta = 0;
  theta = 0;
  alpha = .00005;

  btn_pause = createButton('Pause');
  btn_pause.position(20,20);
  btn_pause.mouseClicked(ptoggle);
  btn_pause.parent('sketch-holder');
  btn_pause.class("sim-button");
}



function draw() {

  background(250);

  //makes an x-y coordinate axis
  stroke('gray');
  line(width/2,0,width/2,height);
  line(0,height/2,width,height/2);
  if (dtheta > .05){alpha = -.00005}
  else if (dtheta< -.05){alpha = .00005}
  // sets a rotation in the CCW direction
  dtheta= dtheta+alpha
  theta = theta - dtheta;
  dir = Math.sign(alpha);
  //both the origin and the endpoint are moving now, but the length stays the same.
  aVector.origin = p5.Vector.add(startPoint,createVector(2*lengthV*cos(theta),2*lengthV*sin(theta)));
  aVector.target = p5.Vector.add(aVector.origin,createVector(dir*60*sin(theta),-dir*60*cos(theta)));
  aVector.update();
  aVector.display();

  aVectorLabel.position(aVector.target.x,aVector.target.y);


  aCentVector.origin = p5.Vector.add(startPoint,createVector(2*lengthV*cos(theta),2*lengthV*sin(theta)));
  aCentVector.target = p5.Vector.add(aVector.origin,createVector(-30000*Math.pow(dtheta, 2)*cos(theta),-30000*Math.pow(dtheta, 2)*sin(theta)));
  aCentVector.update();
  aCentVector.display();
  aCentVectorLabel.position(aCentVector.target.x,aCentVector.target.y);

  aResultantVector.origin = p5.Vector.add(startPoint,createVector(2*lengthV*cos(theta),2*lengthV*sin(theta)));

  aResultantVector.target = p5.Vector.add(aVector.origin,p5.Vector.add(createVector(dir*60*sin(theta),-dir*60*cos(theta)),createVector(-30000*Math.pow(dtheta, 2)*cos(theta),-30000*Math.pow(dtheta, 2)*sin(theta))));
  aResultantVector.update();
  aResultantVector.display();
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

  function ptoggle(){
      if(on == true){
          on = false;
          noLoop();
          btn_pause.html('Play');
      }
      else{
          on = true;
          loop();
          btn_pause.html('Pause');
      }
  }
