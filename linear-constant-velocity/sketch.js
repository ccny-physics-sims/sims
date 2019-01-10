function preload() {
  carImage = loadImage("car.png");
}

function setup(){
  running = true;
  canvas = createCanvas(.9*windowWidth,200);
  canvas.parent('sketch-holder');
  //frameRate(20);

  onoff = createButton("Pause");
  onoff.parent('sketch-holder')
  onoff.position(width-100,10);
  onoff.class("sim-button blue slim");
  onoff.mousePressed(turnonoff);
  pos = createVector(0,height/2)
  vel = createVector(3,0);
  accel = createVector(0,0);
  car = new KineticMass(pos,vel,accel,20,'gray');


}

function draw(){
  background(255);
  car.update();
  car.wrapEdges();
  //car.display();
  image(carImage, car.position.x-50, car.position.y);
}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
  if (!running) {
    running = true;
    turnedOffByButton = false;
    loop();
    onoff.html("stop");
    return
  }

  if (running) {
    running = false;
    turnedOffByButton = true;
    noLoop()
    onoff.html("start");
    return
  }
}
