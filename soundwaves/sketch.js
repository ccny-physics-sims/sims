var molecules = []; // array of Jitter objects
var wavelength;
var amplitude;
var angularfrequency;
var waveconstant;
var vslider=1;
var k = 0;
function setup() {

  frameRate(20);
  createCanvas(700, 200);
  wavelength = .2*width;
  amplitude = .15*wavelength;
  angularfrequency = TWO_PI;
  waveconstant = TWO_PI/wavelength;
  vslider = createSlider(1, 2, 1);
   vslider.elt.step = .01;
  vslider.position(width/2, height-30);
  vslider.parent('sketch-holder')
  //noLoop();
  // Create objects
  loop();
  running = false;
  for (var i=0; i<700; i++) {
    molecules.push(new Waver(180));
  }
  // Create a few dark ones for visibility
  for (var i=0; i<10; i++) {
    molecules.push(new Waver(color(20,20,20)));
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
  translate(amplitude*Math.sin(-vslider.value()*angularfrequency*(k-25)*.01),0);
  rect(20,0,10,height);
  rect(-30,-5+height/2,50,10);
  pop();
}

// Jitter class
function Waver(fill_) {
  var j = 0;
  this.x = 30+Math.random() * width;
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

// function mousePressed(){
//   if (!running){
//     running = true;
//     loop();
//     return
//   }
//
//   if (running){
//     running = false;
//     noLoop()
//     return
//   }
//

//}
