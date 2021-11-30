let ball;
let running = false;
let diskRadius = 200;
let omegaGlobal = 0.004;
let checkerBG;

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")
  frameRate(30)
  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.85,30);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")
  checkerBG = loadImage('checkerboard.jpg'); // Load the image
  imageMode(CENTER);
  reset = createButton("reset");
  reset.mouseClicked(resetSketch);
  reset.position(windowWidth*.85,80);
  reset.class("sim-button");
  reset.parent("sketch-holder")
  if (width >= height){
    toTranslate1 = createVector(-width/4,0)
    toTranslate2 = createVector(+width/4,0)
    diskRadius = width/6
   }
   else {
     toTranslate1 = createVector(0,-height/6)
     toTranslate2 = createVector(0,height/4)
     diskRadius = height/8
   }

  vslider = createSlider(0,3,(omegaGlobal*diskRadius)*sqrt(2),.01);
  vslider.style('width', '200px');
  vslider.input(changeV0);
  vslider.position(50,30);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  vsliderlabel = createP("Speed: "+vslider.value());
  vsliderlabel.parent('sketch-holder');
  vsliderlabel.position(vslider.x+200,vslider.y);

  thetaslider = createSlider(0,180,45,1);
  thetaslider.style('width', '200px');
  thetaslider.input(changeV0);
  thetaslider.position(vslider.x,vslider.y+50);
  thetaslider.class('sim-slider');
  thetaslider.parent('sketch-holder');

  thetasliderLabel = createP("Angle: "+thetaslider.value()+'&deg;')
  thetasliderLabel.parent('sketch-holder');
  thetasliderLabel.position(thetaslider.x+200,thetaslider.y);
  origin = createVector(0,0)
  origin2 = createVector(0,0)

makescene()

//noLoop()
}

function makescene() {

    pos = p5.Vector.add(origin, createVector(0,diskRadius));
    speed = omegaGlobal*diskRadius*1;
    velx = vslider.value()*cos(thetaslider.value()*PI/180)
    vely = -vslider.value()*sin(thetaslider.value()*PI/180)
    vel = createVector(velx,vely);
    accel = 0;

    ball = new KineticMass(pos,vel,accel,15,'RoyalBlue');
    ball.outline = 'RoyalBlue';
  //This will be the position vector
  posVector = new Arrow(origin,pos);
  posVector.color = color('LightSkyBlue');
  posVector.width = 10;
  //posVector.showComponents = true;
  posVector2 = new Arrow(origin2,pos);
  posVector2.color = color('LightSkyBlue');
  posVector2.width = 10;
  //And this will be the velocity vector
  velVector = new Arrow(pos,vel);
  velVector.color = color('MediumSeaGreen');
  velVector.width = 10;
  velVector.grab = false;
  velVector.draggable = false;
  velVector.showComponents = false;


  //velVector.showComponents = true;
  omegaVec = createVector(0,0,-omegaGlobal)

  ball2velrot = p5.Vector.sub(ball.velocity,omegaVec.cross(ball.position))
  ball2v0 = createVector(velx-speed,vely)
  ball2 = new KineticMass(p5.Vector.add(origin2, createVector(0,diskRadius)),ball2v0,accel,15,'RoyalBlue');
  ball2.outline = 'RoyalBlue';
  velVectorRot = new Arrow(ball2.position,ball2velrot);
  velVectorRot.color = color('MediumSeaGreen');
  velVectorRot.width = 10;
  velVectorRot.grab = false;
  velVectorRot.draggable = false;
  velVectorRot.showComponents = false;
  frame1 = new RotFrame(origin,omegaGlobal,ball);
  frame1.label = "Inertial Frame"
  frame2 = new RotFrame(origin2,.0,ball2);
  frame2.label = "Rotating Frame"
  push()
translate(toTranslate1.x,toTranslate1.y)
velVector.target = p5.Vector.add(p5.Vector.mult(createVector(velx,vely),50),ball.position);
  velVector.update();
  velVector.display();
pop()
push()
translate(toTranslate2.x,toTranslate2.y)
  velVectorRot.target = p5.Vector.add(p5.Vector.mult(createVector(ball2velrot.x,ball2velrot.y),50),ball2.position);
    velVectorRot.update();
    velVectorRot.display();
  pop()
}

function changeV0() {
  //clear()
  //background(250);
   velx = vslider.value()*cos(thetaslider.value()*PI/180)
   vely = -vslider.value()*sin(thetaslider.value()*PI/180)

   vsliderlabel.html('Speed: '+vslider.value())
   thetasliderLabel.html('Angle: '+thetaslider.value())

  // translate(-width/4,0)
  // velVector.target = p5.Vector.add(p5.Vector.mult(createVector(velx,vely),15),ball.position);
  //

  // console.log(velx);
  makescene()
}


function draw() {
  background(250);
  translate(width/2,height/2)
  push()
  translate(toTranslate1.x,toTranslate1.y)

  if (running){
frame1.update()
ball.update();
posVector.target = ball.position;
posVector.update();

velVector.origin = ball.position;
velVector.target = p5.Vector.add(p5.Vector.mult(ball.velocity,50),ball.position);
velVector.update();



}

frame1.display();

ball.display();
 posVector.display();
 velVector.display();
pop()
push()
translate(toTranslate2.x,toTranslate2.y)

if (running){
frame2.update()
ball2velrot = p5.Vector.sub(ball.velocity,omegaVec.cross(ball.position))
coria = p5.Vector.mult(omegaVec.cross(ball2.velocity),2);
centa = p5.Vector.mult(omegaVec.cross(omegaVec.cross(ball2.position)),1);
totala = p5.Vector.add(coria, centa);
ball2.acceleration = p5.Vector.mult(totala, -1)
ball2.update();
posVector2.target = ball2.position;
posVector2.update();
velVectorRot.origin = ball2.position;
velVectorRot.target = p5.Vector.add(p5.Vector.mult(createVector(ball2.velocity.x,ball2.velocity.y),50),ball2.position);
  velVectorRot.update();

}
frame2.display();
//noStroke()
ball2.display();

posVector2.display();
  velVectorRot.display();
pop()

  //omegaVec2 = createVector(0,0,0.01)
  //ball2.acceleration = createVector(,)

//update the position vector by setting its target to be equal to the balls position



//the velocity vector will start where the ball is (i.e ball.position) and point in the direction of the velocity


lengthr = posVector2.target.dist(posVector2.origin)

if (lengthr > 200){

}

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
    this.c = 0;
    this.label = 'frame'

  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.rotation = this.rotation + this.omega
    this.bgrotation = this.bgrotation + (this.omega - omegaGlobal)
    this.c++
    if(this.c % 5 == 0){
    this.trails1.push(createVector(this.balltotrace.position.x,this.balltotrace.position.y))
    }
    if (this.trails1.length>200){
      this.trails1.shift()
    }

    //this.trails2.push(createVector(ball2.position.x,ball2.position.y))

  }

  display() {

    push()
    translate(0,0)

     rotate(-this.bgrotation)

     image(checkerBG,0,0,diskRadius*2.5,diskRadius*2.5)
  //   for (let i = -5; i < 5; i++) {
  //   for (let j = -5; j < 5; j++) {
  //     if (j % 2 == 0) {
  //       if (i % 2 == 0) {
  //       	fill(50);
  //       }
  //       else {
  //         fill(230);
  //       }
  //     }
  //     else {
  //       if (i % 2 == 0) {
  //       	fill(230);
  //       }
  //       else {
  //         fill(50);
  //       }
  //     }
  //     rect(i * 50, j * 50, 50, 50);
  //     //fill('red')
  //     //text(i,i*50,j*50)
  //     //console.log(i, j);
  //   }
  // }
    pop()

    push()
    stroke(50);
    strokeWeight(2);
    fill(200,200,200,240);
    translate(this.position.x,this.position.y)
    rotate(-this.rotation)
    push()
    strokeWeight(4)
    stroke('red')
    circle(0, 0, this.radius*2);
    pop()

    line(0-this.radius,0,0+this.radius,0)
    line(0,0-this.radius,0,0+this.radius-30)
    translate(0,this.radius)
    stickFigure(20)
    pop()

    fill(this.balltotrace.color)
    noStroke()
    for(var i=0;i<this.trails1.length;i++){
      ellipse(this.trails1[i].x,this.trails1[i].y,3);
    }
    // for(var i=0;i<this.trails2.length;i++){
    //   ellipse(this.trails2[i].x,this.trails2[i].y,5);
    // }
    fill(0)
    text(this.label,-40,-diskRadius-60)

  }
}

function turnonoff() {
  if (!running){
    running = true;
    onoff.html('pause')
    //loop();
  }
  else if (running) {
    running = false;
    onoff.html('start')
    //noLoop();
  }
}

function resetSketch() {
  makescene()
  running = false;
  onoff.html('start')

  //setup()
  //draw()

}

function stickFigure(figureHeight){
  push()
  noFill()
  stroke(0)

ellipse(0,-figureHeight*(1+1/6),figureHeight/3,figureHeight/3)
torso = line(0,-figureHeight,0,-figureHeight/2)
lleg = line(0,-figureHeight/2,-figureHeight/4,0)
rleg = line(0,-figureHeight/2,+figureHeight/4,0)
larm = line(0,-figureHeight/1.2,-figureHeight/4,-figureHeight/1.4)
rarm = line(0,-figureHeight/1.2,figureHeight/4,-figureHeight/1.4)
pop()
}
