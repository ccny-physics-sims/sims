function preload() {
  carImage = loadImage("car");
}
function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  //frameRate(25);


  //create slider for adjusting the accleration
  accelSlider = createSlider(-100, 100, 0);
  accelSlider.parent('sketch-holder');
  accelSlider.position(20, 40);
  accelSlider.style('width', '150px');
  accelSlider.class("sim-slider gray");


  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(0,250);

  bg = new movingBackground('cityStreet',basePosition,velocity,acceleration);

  center = createVector(width/2,height/2)
  velVec = new Arrow(center,p5.Vector.add(center,bg.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;

  accelVec = new Arrow(center,p5.Vector.add(center,bg.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;

imageMode(CENTER);

genbutton = createButton("STOP");
genbutton.mouseClicked(stopTheCar);
genbutton.position(200,30);
genbutton.class("sim-button blue");
}

function draw() {
  background('white');

  bg.acceleration = createVector(-accelSlider.value()/1000,0);

   bg.update();
   bg.display();

   text('Change Acceleration: ',20,30,150,20);


  rectMode(CORNER);
  push();
  noStroke();
  fill('black');
  translate(0,70);
  push();

  text('Velocity: ' + round(-bg.velocity.x*10)/10,center.x,center.y-30,150,20);
  pop();

  velVec.target = p5.Vector.add(center,p5.Vector.mult(bg.velocity,-4));
  velVec.update();
  velVec.display();
  pop();
  push();
  translate(0,130);
  push();
  noStroke();
  fill('black');
  text('Acceleration: ' + accelSlider.value()/10,center.x,center.y-30,100,20);
  pop();
  accelVec.target = p5.Vector.add(center,p5.Vector.mult(bg.acceleration,-600));
  accelVec.update();
  accelVec.display();
  pop();

  image(carImage, center.x, center.y, 200, 200);


  //ellipse(center.x,center.y,10,10);

}
function stopTheCar() {
  accelSlider.value(0);
  bg.velocity.x = 0;
  bg.velocity.y = 0;
}
