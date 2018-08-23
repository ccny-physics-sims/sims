
var forceSlider;
var triangleHeight, triangleBase;
var cart;
var initialHeight;
var projectile;
var theta;
var g = .4;
var rampAccel;
var freeFallAccel;

function preload() {
  cartImage = loadImage("cartImage.png");
}

function setup() {
  canvas=createCanvas(windowWidth*.9 , 400);
  canvas.parent('sketch-holder');



  // angleSlider = createSlider(0, 30, 2, .1);
  // angleSlider.position(20,50);
  // angleSlider.parent('sketch-holder');
  // angleSlider.class("sim-slider red");

  initialHeight = height-40*2;
  triangleBase = 200;
  triangleHeight = 100;
  theta = 2*PI/180;
  pos = createVector(0,initialHeight)
  vel = createVector(0,0);
  accel = createVector(g*cos(theta)*sin(theta),g*sin(theta)*sin(theta));

  cart = new KineticMass(pos,vel,accel,20,'blue');
  //ball.outline = color('rgba(255, 0, 0, 1)');
  cart.limit = 50;
  cart.tail = false;

  projectile = new KineticMass(pos,vel,accel,10,'red');
  projectile.tail = false;
  projectile.tailLength = 20;
  projectile.limit = 50;
}

function draw() {
  background(255);


  //rotate(.05)
  //translate(0,-100)
  //drawTriangle()

  rampAccel = createVector(g*cos(theta)*sin(theta),g*sin(theta)*sin(theta))
  freeFallAccel = createVector(0,g);



  cart.acceleration = rampAccel.copy();

   if (cart.position.x > width){
     cart.velocity = createVector(0,0)
     cart.position = pos.copy();
   }
  cart.wrapEdges();
  cart.update();


  //cart.display();
  push();
  translate(cart.position.x, cart.position.y)
  rotate(theta);
  image(cartImage,-30,-20,60,60);
  pop();

  if (projectile.position.x > width){
    projectile.velocity = createVector(0,0)
    projectile.position = cart.position.copy();
  }
  projectile.wrapEdges();
  projectile.update();
  projectile.display();

  // if (projectile.position.y > cart.position.y+30){
  //   projectile.velocity.y = 0;
  //   projectile.position.y = initialHeight;
  //   projectile.tailA = [];
  //   projectile.tail = false;
  // }
  // if (projectile.velocity.x < .1){
  //   projectile.velocity.x = 0;
  // }

  if (projectile.velocity.y > 0 && abs(projectile.position.x-cart.position.x) < 5  && abs(projectile.position.y-cart.position.y) < 5){
    projectile.position = cart.position.copy();
    projectile.acceleration = cart.acceleration.copy();
    projectile.velocity = cart.velocity.copy();

  }

  push()
  rotate(theta);
  stroke(80)
  line(cart.position.x+10,0,cart.position.x+10,height)
  pop();

  push();
  rotate(theta);
  translate(0,height-40)
  fill(200);
  noStroke();
  rect(0,0,width,50);
  pop();
}

function drawTriangle() {
  push();
  fill(200);
  translate(width/2-triangleBase/2,height/2+80);
  triangle(0,0,triangleBase,0,triangleBase,-triangleHeight);
  pop();
}

function touchStarted(){

  if (mouseY > 50 && mouseX > 80){
    projectile.tail = true;
  launchABall();
  }
}

function launchABall() {
  launchSpeed = 13*(height-mouseY)/height
  projectile.velocity.add(createVector(launchSpeed*sin(theta),-launchSpeed*cos(theta)));
  projectile.acceleration = freeFallAccel;

}
