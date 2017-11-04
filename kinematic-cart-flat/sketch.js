
var forceSlider;
var triangleHeight, triangleBase;
var cart;
var initialHeight;
var projectile;
var drag;
var isDrag;
function preload() {
  cartImage = loadImage("cartImage.png");
}

function setup() {
  canvas=createCanvas(windowWidth , 400);
  canvas.parent('sketch-holder');
  isDrag = createCheckbox('drag', false);

  isDrag.style('width', '60px');
  isDrag.position(20,20);
  isDrag.parent('sketch-holder');
  textAlign(CENTER);


  initialHeight = height-40;
  triangleBase = 200;
  triangleHeight = 100;

  pos = createVector(0,initialHeight)
  vel = createVector(2,0);
  accel = createVector(0,0);

  cart = new KineticMass(pos,vel,accel,10,'red');
  //ball.outline = color('rgba(255, 0, 0, 1)');
  cart.limit = 2000;
  cart.tail = false;

  projectile = new KineticMass(pos,vel,accel,10,'red');
  projectile.tail = false;
  projectile.tailLength = 20;
}

function draw() {
  background(255);
  //rotate(.05)
  //translate(0,-100)
  //drawTriangle()
  push();
  fill(170);
  rect(0,0,100,50)
  pop();

  cart.wrapEdges();
  cart.update();
  //cart.display();
  image(cartImage, cart.position.x-25, cart.position.y-20,50,50);
  projectile.wrapEdges();
  projectile.update();
  projectile.display();

  if (projectile.position.y > cart.position.y+0 ){
    projectile.velocity.y = 0;
    projectile.acceleration = createVector(0,0);
    if (abs(projectile.position.x-cart.position.x) < 5 ){
    projectile.position.y = initialHeight;
    }
    else
    {
      projectile.position.y = initialHeight+26;
    }
    projectile.tailA = [];
    projectile.tail = false;
  }
  if (projectile.velocity.x < .1){
    projectile.velocity.x = 0;
  }
  if (abs(projectile.position.x-cart.position.x) < 1 && abs(projectile.position.y-initialHeight) < 10){
    projectile.velocity.x = cart.velocity.x;
  }

  push()
  stroke(80)
  line(cart.position.x,0,cart.position.x,height)
  pop();

  push();
  fill(200);
  noStroke();
  rect(0,initialHeight+30,width,height);
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
  projectile.velocity.y = -8*(height-mouseY)/height;
  if (isDrag.checked()){
    projectile.acceleration = createVector(-projectile.velocity.x*.01,.1);
  }
  else {
  projectile.acceleration = createVector(0,.1);
  }
}
