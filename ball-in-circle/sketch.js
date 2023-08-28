let m  = 2;
let leftWall;
let rightWall;
let deltaV0;
let time=0;
let deltaXLabel;
let running = false;
let circleRad;
let alpha;
let phi;
let v0;
let chordLength;
let doingIrrational = false;
let n = 1;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  //frameRate(30);
  textSize(24)
  circleRad = 300;
  alpha = HALF_PI;
  phi = (HALF_PI-alpha)/2;
  v0 = 2;
  posDrop = createVector(circleRad-1,0)
  velDrop = createVector(-v0*(cos(HALF_PI-alpha)),-v0*sin(HALF_PI-alpha));
  accel = createVector(0,0);
  particle = new ConfinedMass(posDrop,velDrop,accel,m,'CornflowerBlue');

  // reset = createButton("Start");
  // reset.parent('sketch-holder');
  // reset.mouseClicked(turnonoff);
  // reset.position(20,20);
  // reset.class("sim-button")

  irrational = createButton("Irrational");
  irrational.parent('sketch-holder');
  irrational.mouseClicked(resetAndMakeIrrational);
  irrational.position(20,20);
  irrational.class("sim-button")


  angleMode(RADIANS)
  pp = createSlider(1,5,0,1);
  pp.position(80,height*.12)
  pp.parent('sketch-holder')
  pp.class("sim-slider");
  pp.input(sliderChange);
  ppLabel = createP("p");
  ppLabel.position(pp.x-50,pp.y-50);
  ppLabel.parent('sketch-holder')
  ppLabel.style("font-family","Times")
  ppLabel.style("font-size","24pt")


  qq = createSlider(1,20,0,1);
  qq.position(80,pp.y+80)
  qq.parent('sketch-holder')
  qq.class("sim-slider");
  qq.input(sliderChange);
  qqLabel = createP("q");
  qqLabel.position(qq.x-50,qq.y-50);
  qqLabel.parent('sketch-holder')
  qqLabel.style("font-family","Times")
  qqLabel.style("font-size","24pt")




  eq1 = createP()
  eq1.parent('sketch-holder');
  eq1.position(80,qq.y+80)
  eq1.html("&alpha; = 2 &pi; "+pp.value()/qq.value())
  eq1.style("font-family","Times")
  eq1.style("font-size","24pt")

  eq2 = createP()
  eq2.parent('sketch-holder');
  eq2.position(80,eq1.y+50)
  eq2.html(qq.value()+"&alpha; = 2 &pi; "+pp.value())
  eq2.style("font-family","Times")
  eq2.style("font-size","24pt")

}


function draw() {


  translate(width/2,height/2)
  stroke(0)
  noFill()
  circle(0,0,circleRad*2)


  if (doingIrrational == true){
    strokeWeight(1)
    colorstring = 'hsba('+floor(random(0,360))+', 100%, 100%, .5)'
    let c = color(colorstring)
    stroke(c)
    alpha = TWO_PI*(1/sqrt(2))
    rotate(alpha*n)
    arc(0, 0, circleRad*2, circleRad*2, 0, TWO_PI-alpha, CHORD);
    n++
  }
  else {
    background(255)
    drawTheChords()
  }

}

function drawTheChords(){
  alpha = TWO_PI*pp.value()/qq.value()
  eq1.html("&alpha; = 2 &pi; "+pp.value()+"/"+qq.value())

  eq2.html(qq.value()+"&alpha; = 2 &pi; "+pp.value())


  stroke(150)
  strokeWeight(1)
  arc(0, 0, circleRad*2, circleRad*2, 0, TWO_PI-alpha, PIE);



  for (i = 0; i<qq.value();i++)
    {
      colorstring = 'hsb(0, 100%, 100%)'
      let c = color(colorstring)
      stroke(c)
    rotate(alpha)
    arc(0, 0, circleRad*2, circleRad*2, 0, TWO_PI-alpha, CHORD);

  }

  stroke(0)
  noFill()
  strokeWeight(2)
  circle(0,0,circleRad*2)
  noLoop()
}
function sliderChange() {
  clear()
  doingIrrational=false
  for (i=0; i<qq.value();i++){
  redraw()
}

}

function resetAndMakeIrrational() {
  clear()
  eq1.html("&alpha; = 2 &pi; 1/&#8730;2")
  eq2.html("")

  doingIrrational = true;
  loop()
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
  // this.position.x += this.avgXVel;
  // this.position.y += this.avgYVel;
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
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



this.bounceCircle = function () {
  if (p5.Vector.dist(this.position, createVector(0,0)) > circleRad)
    {
    this.velocity.rotate((PI-alpha))
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
