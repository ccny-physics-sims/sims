var molecules = []; // array of molecules
var wavelength;
var amplitude;
var angularfrequency;
var waveconstant;
var slider;
var k = 0;

function setup() {
  frameRate(20);

  canvas = createCanvas(Math.min(400, windowWidth),Math.min(400, windowHeight));
  canvas.parent('sketch-holder');
  wavelength = .2*width;
  amplitude = .3*wavelength;
  angularfrequency = TWO_PI;
  waveconstant = TWO_PI/wavelength;
  //noLoop();
  // Create objects
  //noLoop();
  running = true;
  noStroke();
  for (var i=0; i<700; i++) {
    molecules.push(new Waver(150));
  }
  // Create a few red ones for visilibity
  for (var i=0; i<10; i++) {
     molecules.push(new Waver(color(230,40,40)));
   }
  fill(100);


}

function draw() {

  background(255);

  for (var i=0; i<molecules.length; i++) {

    molecules[i].undulate();
    molecules[i].display();

  }

}

// Jitter class
function Waver(fill_) {
  var j = 0;
  // the initial random value of x is stored for later
  this.x =random(width);
  this.originalx = this.x;
  // same for y
  this.y = random(height);
  this.originaly = this.y;
  // convert from cartesian to polar
  this.r = sqrt(sq(this.x-width/2)+sq(this.y-height/2));
  this.originalr = this.r;
  // this is the other dimension of the polar coordinates
  this.phi = atan2(this.x-width/2,this.y-height/2);
  // make em look kinda random
  this.diameter = random(3, 6);
  // this will set the amount of jitter
  this.speed = .5;

  // here is the jittering function
  this.jitter = function() {
  // a little x and y motion is added to each particle
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.undulate = function(){
    //j will be the timekeeper here
    j++;

    // this function adds a sinusoidally varying amount to the x position
    // we have to do it in the radial direction first, then convert back to the cartesian coordinates
    // if you look at the argument you will see it is just the equation for a traveling wave.

    this.r = this.originalr + amplitude*sin(waveconstant*this.originalr - angularfrequency*j*.01);
    this.x = (width/2)+this.r*cos(this.phi) + random(-this.speed, this.speed);;
    this.y = (height/2)+this.r*sin(this.phi)+ random(-this.speed, this.speed);;

  }

  this.display = function() {
    //this function updates each of the particles at every frame
    push();
    fill(fill_);
    translate(this.x, this.y);
    ellipse(0, 0, this.diameter, this.diameter);
    pop();
  };
}

// maybe you want to stop it during the motion. Just press the canvas to start/stop
function touchStarted(){
  if (!running){
    running = true;
    loop();
    return
  }

  if (running){
    running = false;
    noLoop()
    return
  }


}
