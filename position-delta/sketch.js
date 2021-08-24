let m  = 20;
let leftWall;
let rightWall;
let deltaV0;
let time=0;
let deltaXLabel;
let running = false;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  //frameRate(30);
  textSize(18)
  posDrop = createVector(.5*width,.5*height)
  velDrop = createVector(5,0);
  accel = createVector(0,0);
  particle = new ConfinedMass(posDrop,velDrop,accel,m,'CornflowerBlue');

  onoff = createButton("Start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,20);
  onoff.class("sim-button")

  reset = createButton("Reset");
  reset.parent('sketch-holder');
  reset.mouseClicked(resetTheBalls);
  reset.position(20,onoff.y+50);
  reset.class("sim-button")

  leftWall = width*.33;
  rightWall = width*.33;

  deltaXLabel = createP()
  deltaXLabel.style('font-size', '20px')
  deltaXLabel.position(posDrop.x, posDrop.y)
  katex.render('\\\Delta x',deltaXLabel.elt)
  noLoop();
}


function draw() {

  background(255)
  particle.bounceEdges()
  particle.update()


noStroke()
fill('gray')
rect(leftWall-10,0,10,height)
rect(width-rightWall,0,10,height)
fill('red')

deltaV0 = 1;
deltaXwidth = deltaV0*time
rect(particle.position.x-deltaXwidth*.5,particle.position.y-2.5,deltaXwidth,5)
rect(particle.position.x-deltaXwidth*.5,particle.position.y-7.5,5,15)
rect(particle.position.x-5+deltaXwidth*.5,particle.position.y-7.5,5,15)

time += 0.2
fill(100)
rect(0,0,leftWall,height)
rect(width-rightWall,0,rightWall,height)

deltaXLabel.position(particle.position.x-10, particle.position.y)
  particle.display()

}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
    if (!running){
      running = true;
      loop();
      onoff.html("stop");
      return
    }

    if (running){
      running = false;
      noLoop()

      onoff.html("start");
      return
    }




  }

  function resetTheBalls() {
    particle.position = posDrop.copy();
    particle.velocity = velDrop.copy();
    time = 0;
    redraw();
  }


var ConfinedMass = function(position, velocity, acceleration, mass, kmFill){
  this.position = new createVector(position.x, position.y);
  this.velocity = new createVector(velocity.x, velocity.y);
  this.acceleration = new createVector(acceleration.x, acceleration.y);
  this.previousVel = new createVector(0,0);
  this.limit = 10000;
  this.mass = mass;
  //how does the mass look
  this.color = kmFill
  this.outline = 255;
  //size is proportional to mass
  this.size = this.mass;

  // tail properties
  this.tail = false;
  this.tailFill  = kmFill;
  this.tailStroke = kmFill;

  this.tailA = [];


  this.tailLength = 70;
  this.tailSpacing = 5;

  this.bottomBounce = height;
  this.bounceLoss = 1;

this.update = function(){
  if(this.tail === true && (frameCount-1)%this.tailSpacing==0){
    this.tailA.push(this.position.copy());
  }
  this.previousVel = this.velocity.copy();
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.limit);
  this.avgYVel = (this.previousVel.y+this.velocity.y)/2;
  this.avgXVel = (this.previousVel.x+this.velocity.x)/2;
  this.position.x += this.avgXVel;
  this.position.y += this.avgYVel;
  //this.acceleration.mult(0);


  if(this.tailA.length > this.tailLength){
    this.tailA = this.tailA.slice(-1 * this.tailLength);
  }

  //handles angular momentum
  this.aVelocity += this.aAcceleration;
  this.angle += this.aVelocity;
};

this.display = function(){

  fill(this.color);
  stroke(this.outline);
  ellipse(this.position.x,this.position.y,this.size,this.size);

  if(this.tail === true){
    push();
    for(var i = 0; i < this.tailA.length; i++){
      stroke('rgba('+red(color(this.tailStroke))+','+green(color(this.tailStroke))+','+blue(color(this.tailStroke))+','+map(i,0,this.tailA.length,0,1)+')');
      fill('rgba('+red(color(this.tailFill))+','+green(color(this.tailFill))+','+blue(color(this.tailFill))+','+map(i,0,this.tailA.length,0,1)+')');
      ellipse(this.tailA[i].x,this.tailA[i].y,3,3);
    }
    pop();
  }


};

this.giveItAnAcceleration = function(accel){
  this.acceleration = (accel);
}

this.applyForce = function(force){
  var f = force.copy();
  f.div(this.mass);
  this.acceleration = f;
};
//Behaviors
this.wrapEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};
this.wrapEdgesBounceFloor = function(){
  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }
  if(this.position.y > this.bottomBounce-this.size/2){
    overiny = this.position.y-this.bottomBounce+this.size/2;
    vatheight = Math.sqrt(Math.pow(this.velocity.y,2)-2*this.acceleration.y*overiny);
    this.position.y = this.bottomBounce-this.size/2;
    this.velocity.y = -1*vatheight*this.bounceLoss;
  }
}
this.bounceEdges = function(){
  if(this.position.x < leftWall+this.size/2){
    overinx = this.position.x-this.size/2;
    vatwidth = Math.sqrt(Math.pow(this.velocity.x,2)-2*this.acceleration.x*overinx);
    this.velocity.x = 1*vatwidth;
    this.position.x = leftWall+this.size/2;

  }
  if(this.position.x > width-this.size/2-rightWall){
    overinx = this.position.x-width+this.size/2;
    vatwidth = Math.sqrt(Math.pow(this.velocity.x,2)-2*this.acceleration.x*overinx);
    this.position.x = width-this.size/2-rightWall;
    this.velocity.x = -1*vatwidth;
  }

  if(this.position.y < 0+this.size/2){
    overiny = this.position.y-this.size/2;
    vatheight = Math.sqrt(Math.pow(this.velocity.y,2)-2*this.acceleration.y*overiny);
    this.velocity.y = 1*vatheight;
    this.position.y = 0+this.size/2;

  }
  if(this.position.y > this.bottomBounce-this.size/2){
    overiny = this.position.y-this.bottomBounce+this.size/2;
    vatheight = Math.sqrt(Math.pow(this.velocity.y,2)-2*this.acceleration.y*overiny);
    this.position.y = this.bottomBounce-this.size/2;
    this.velocity.y = -1*vatheight*this.bounceLoss;
  }
};

this.towardMouse = function(a){
  var mouse = new Vector(mouseX,mouseY);
  var dir = Vector.sub(mouse,this.position);
  dir.normalize();
  dir.mult(a);
  this.acceleration = dir;
};

}


ConfinedMass.prototype.get = function(){
  var bob = new KineticMass(this.position,this.velocity,this.acceleration);
  return bob;
};
ConfinedMass.get = function(m){
  var bob = new KineticMass(m.position, m.velocity, m.acceleration);
  return bob;
};
