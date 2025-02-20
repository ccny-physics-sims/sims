const touch = matchMedia('(hover: none)').matches;


function preload() {
  accelLabel = loadImage("a.svg");
  velLabel = loadImage("v.svg");
}

function setup() {


  canvas = createCanvas(windowWidth,.9*windowHeight)
  canvas.parent('sketch-holder');



  velocity = createVector(.3,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);

  ball = new KineticMass(basePosition,velocity,acceleration,10,'rgb(255, 60, 0)');
  ball.tail = true;
  ball.outline = 'black';
  ball.tailFill = ball.color;
  ball.tailStroke = ball.color;
  ball.tailLength = 40;
  ball.tailSpacing = 10;


  center = createVector(width/2,height/2)
  velVec = new Arrow(basePosition,p5.Vector.add(center,ball.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;
  velVec.width = 10;

  accelVec = new Arrow(basePosition,p5.Vector.add(center,ball.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;
  accelVec.width = 10;


}

function draw() {
  background(225);
  ball.wrapEdges();
  //ball.giveItAnAcceleration(createVector(sin(frameCount/100)*cos(frameCount/80)*.005,-cos(frameCount/200)*.005));

  rectMode(CORNER);
  push();
  velVec.origin = ball.position;
  velVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.velocity,40));
  velVec.update();
  velVec.display();
  pop();
  image(velLabel,velVec.target.x,velVec.target.y);
  push();
  accelVec.origin = ball.position;
  accelVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.acceleration,10000));
  accelVec.update();
  accelVec.display();
  pop();
  image(accelLabel,accelVec.target.x,accelVec.target.y);
  if(keyIsDown(LEFT_ARROW)){
    ball.acceleration.x-=.0002;
  }
  if (keyIsDown(RIGHT_ARROW)){
    ball.acceleration.x+=.0002;
  }
  if (keyIsDown(UP_ARROW)){
    ball.acceleration.y-=.0002;
  }
  if (keyIsDown(DOWN_ARROW)){
    ball.acceleration.y+=.0002;
  }
  if (touch) {
      //Conditional script here
      accel.y = rotationX*.01;
      accel.x = rotationY*.01;
  }
  ball.update();
  ball.display();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
