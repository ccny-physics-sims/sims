let ball;
let running = false;
let diskRadius = 200;
let omegaGlobal = 0.002;

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")
  //frameRate(10)


  vslider = createSlider(0,.2,0,.01);
  vslider.style('width', '200px');
  vslider.input(changeRot);
  vslider.position(50,30);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  origin = createVector(0,0)



  pos = p5.Vector.add(origin, createVector(100,-100));



lengthV = p5.Vector.dist(origin,createVector(100,-100))

//This will be the position vector
posVector = new Arrow(origin,createVector(100,-100));
posVector.color = color('Blue');
posVector.width = 10;
posVector.grab = false;
posVector.draggable = false;
posVector.showComponents = false;

posVector0 = new Arrow(origin,createVector(100,-100));
posVector0.color = color('RoyalBlue');
posVector0.width = 10;
posVector0.grab = false;
posVector0.draggable = false;
posVector0.showComponents = false;

dPosVector = new Arrow(posVector0.target,posVector.target);
dPosVector.color = color('Red');
dPosVector.width = 10;
dPosVector.grab = false;
dPosVector.draggable = false;
dPosVector.showComponents = false;


frame1 = new RotFrame(origin,omegaGlobal,ball);


noLoop()
}


function draw() {
  background(250);
//
  push()
translate(width/2,height/2)
frame1.run()
posVector0.update();
posVector0.display();
//rotate(-vslider.value())
//posVector.target = createVector(lengthV*cos(vslider.value()),lengthV*sin(vslider.value()))
posVector.target = createVector(lengthV*cos(atan(1)+vslider.value()),-lengthV*sin(atan(1)+vslider.value()))

posVector.update();
posVector.display();

 dPosVector.target = posVector.target.copy()
 dPosVector.update();
 dPosVector.display();

pop()


}

class RotFrame {
  constructor(position,omega,balltotrace) {
    this.omega = omega;
    this.position = position.copy();
    this.rotation = 0;
    this.bgrotation = 0;
    this.radius = diskRadius;
    this.trails1 = [];
    this.trails2 = [];
    this.balltotrace = balltotrace

  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.rotation = vslider.value()


  }

  display() {

    push()
    stroke(50);
    strokeWeight(2);
    fill(200,200,200,240);
    //translate(this.position.x,this.position.y)
    rotate(-this.rotation)
    circle(0, 0, this.radius*2);
    line(0-this.radius,0,0+this.radius,0)
    line(0,0-this.radius,0,0+this.radius)

    pop()

    // for(var i=0;i<this.trails2.length;i++){
    //   ellipse(this.trails2[i].x,this.trails2[i].y,5);
    // }



  }
}

function changeRot(){

  draw()
}

function turnonoff() {
  if (!running){
    running = true;
    loop();
  }
  else if (running) {
    running = false;
    noLoop();
  }
}

function resetSketch() {
  setup()
  draw()

}
