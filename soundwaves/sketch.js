var molecules = []; // array of Jitter objects
var wavelength;
var amplitude;
var angularfrequency;
var waveconstant;
var vslider=1;
var k = 0;
function setup() {

  frameRate(20);
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');
  wavelength = .2*width;
  amplitude = .15*wavelength;
  angularfrequency = TWO_PI;
  waveconstant = TWO_PI/wavelength;
  vslider = createSlider(1, 2, 1,.01);
  vslider.parent('sketch-holder');
  vslider.position(width/2-100, height-30);

  vslider.class("sim-slider");
  //noLoop();
  // Create objects
  loop();
  running = false;
  for (var i=0; i<900; i++) {
    molecules.push(new Waver(180));
  }
  // Create a few dark ones for visibility
  for (var i=0; i<10; i++) {
    molecules.push(new Waver(color(240,20,20)));
  }
  fill(100);


}

function draw() {

  //background(173,216,230);
  background(255,255,255);
  for (var i=0; i<molecules.length; i++) {
    molecules[i].jitter();
    molecules[i].undulate();
    molecules[i].display();
    // push();
    // fill(100);
    // noStroke();
    // translate(molecules[i].x, molecules[i].y);
    // ellipse(0, 0, molecules[i].diameter, molecules[i].diameter);
    // pop();

  }
  push();
  k++
  noStroke();
  translate(60+amplitude*Math.sin(-vslider.value()*angularfrequency*(k-25)*.01),0);
  rect(0,0,10,height);
  rect(-30,-5+height/2,30,10);
  pop();
}

// Jitter class
function Waver(fill_) {
  var j = 0;
  this.x = 80+(Math.random() * (width-80));
  this.originalx = this.x
  this.y = Math.random()*height;
  this.diameter = Math.random()*(6-3)+3;
  this.speed = 1;

  this.jitter = function() {

    this.x += Math.random() * ( this.speed + this.speed) -this.speed;
    this.y += Math.random() * ( this.speed + this.speed) -this.speed;
  };

  this.undulate = function(){
    //j will be the timekeeper here
    j++;
    // this function adds a sinusoidally varying amount to the x position
    this.x = this.originalx + amplitude*Math.sin((vslider.value())*waveconstant*this.originalx - (vslider.value())*angularfrequency*j*.01);

  }

  this.display = function() {
    push();
    fill(fill_);
    noStroke();
    translate(this.x, this.y);
    ellipse(0, 0, this.diameter, this.diameter);
    pop();
  };
}
