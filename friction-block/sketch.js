function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  m = 3; // mass of block
  i = 30; // initial force applied
  	calcBlockDimensions();
  g = .98; //gravity
  ra = 0; // initial ramp angle
  clamp = 0.5;
  mus = .35;
  muk = .30;
  currentMu = mus;
  moving = false;
  mahdiv = createDiv('');
  spawnControls();
  init();
}

function draw() {
  clear();
  push();
  thetaRadians = rampSlider.value() * PI / 180;
  translate(windowWidth / 2, windowHeight / 2);
  rotate(thetaRadians);
  block.mass = massSlider.value();
  fstaticMax = mus * block.mass * g * Math.cos(thetaRadians);
  block.applyForce(netForce);
  block.update();
  block.display();
  block.wrapEdges();
  calcNetForce();
  stroke(0);
  line(-width, 0, width, 0);
  pop();
  displayStats();
}

function displayStats() {
  // unit adjustment
  ua = 10;
  stats = ("type: <span class=\"nums\">" + frictionMode + "</span><br>" +
    "mu: <span class=\"nums\">" + currentMu.toFixed(2) + "</span><br>" +
    // "distance: <span class=\"nums\">" + (block.distance / (ua)).toFixed(1) + " m</span><br>" +   "velocity: <span class=\"nums\">" + (block.velocity.x).toFixed(1) + " m/s </span><br>" +
    "mass: <span class=\"nums\">" + block.mass + " kg</span><br>push: <span class=\"nums\">" + shoveSlider.value() + " N</span><br>" +
    "angle: <span class=\"nums\">" + rampSlider.value().toFixed(1) + " &theta;</span><br>");
  mahdiv.html(stats);
  mahdiv.parent('stats-holder');
}

function spawnControls() {
  button1 = createButton('shove block');
  button1.mousePressed(shoveButton);
  button1.parent('button-holder');
  button1.class("sim-slider gray ");
  button2 = createButton('reset');
  button2.mousePressed(init);
  button2.parent('button-holder');
  button2.class("sim-slider gray ");
  massSlider = createSlider(1, 50, m);
  massSlider.parent('slider-holder');
  massSlider.class("sim-slider gray ");
  shoveSlider = createSlider(-80, 80, i);
  shoveSlider.parent('slider-holder');
  shoveSlider.class("sim-slider gray ");
  rampSlider = createSlider(0, 30, ra);
  rampSlider.parent('slider-holder');
  rampSlider.class("sim-slider gray ");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	calcBlockDimensions();
}

function calcBlockDimensions(){
	  blockDimensions = Math.sqrt(windowWidth + windowHeight) * 2
  w = blockDimensions; // width
  h = blockDimensions; // height
}

function shoveButton() {
  shoveMePlz = !shoveMePlz;
}

function init() {
  //block's initial motion
  pos = createVector(0, 0);
  vel = createVector(0, 0);
  accel = createVector(0, 0);
  netForce = createVector(0, 0);
  shoveMePlz = false;
  frictSign = 1;
  block = new KineticMass(pos, vel, accel, 10, 'red');
  block.mass = massSlider.value();
  shove = shoveSlider.value();
  moving = false;
  justShoved = false;
  currentMu = mus;
}

function calcNetForce() {
  // check if impulse has been applied to block
  if (shoveMePlz) {
    shove = shoveSlider.value();
    block.distance = 0;
    shoveMePlz = false;
  } else {
    shove = 0;
    justShoved = false;
  }
  // if it's not moving, see if it starts to move
  if (moving === false) {
    // check if block overcomes friction from being pushed
    if (Math.abs(shove) > fstaticMax) {
      moving = true;
      justShoved = true;
    }
    // check if block begins to slide from gravity      
    else if (Math.tan(thetaRadians) > mus) {
      moving = true;
    }
  }
  // if the block is moving, apply kinetic friction
  if (moving === true) {
    currentMu = muk;
    frictionMode = "kinetic";
    // adjust friction to oppose direction of movement
    if (block.velocity.x > 0) {
      frictSign = 1;
    } else {
      frictSign = -1;
    }
    // if it wasn't just shoved, include friction
    if (justShoved === false) {
      netForce = createVector((shove + block.mass * g * Math.sin(thetaRadians) - frictSign * muk * block.mass * g * Math.cos(thetaRadians)), 0);
    }
    // else, leave out the friction
    else {
      netForce = createVector((shove + block.mass * g * Math.sin(thetaRadians)), 0);
    }
  }
  else {
    currentMu = mus;
    frictionMode = "static";
    netForce = createVector(0, 0);
  }
  // keep the block from sliding backwards from friction when halted
  if (Math.abs(block.velocity.x) < clamp && justShoved === false) {
    moving = false;
    currentMu = mus;
    frictionMode = "static";
    block.velocity.mult(0);
  } else {
    moving = true;
  }
}

var KineticMass = function(position, velocity, acceleration, mass, kmFill, scaling) {
  this.position = new createVector(position.x, position.y);
  this.velocity = new createVector(velocity.x, velocity.y);
  this.acceleration = new createVector(acceleration.x, acceleration.y);
  this.previousVel = new createVector(0, 0);
  this.limit = 10000;
  this.mass = mass;
  this.color = kmFill;
  this.outline = 255;
  this.size = this.mass;
  this.distance = 0;

  this.update = function() {
    this.previousVel = this.velocity.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.limit);
    this.avgYVel = (this.previousVel.y + this.velocity.y) / 2;
    this.avgXVel = (this.previousVel.x + this.velocity.x) / 2;
    this.position.x += this.avgXVel;
    this.position.y += this.avgYVel;
    this.distance += this.avgXVel;
    this.acceleration.mult(0);
  };

  this.display = function() {
    fill(this.color);
    stroke(this.outline);
    rect(this.position.x - w/2, this.position.y - h, w, h);
  };
  this.giveItAnAcceleration = function(accel) {
    this.acceleration = (accel);
  };
  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acceleration = f;
  };
  //Behaviors
  this.wrapEdges = function() {
    if (this.position.x > width / 2) {
      this.position.x = -width / 2;
    } else if (this.position.x < -width / 2) {
      this.position.x = width / 2;
    }
  };
};
