var molecules = []; // array of Jitter objects
var wavelength;
var amplitude;
var angularfrequency;
var waveconstant;
var k = 0;
var tubelength = 500;
var canvas;
var modeslider;
var modeSliderLabel;
var onoff;

function setup() {
  frameRate(25);
    onoff = createButton("start");
    onoff.mouseClicked(turnonoff);
    onoff.position(200,290);
    onoff.class("sim-button")

    t1=createP('closed');
    t1.position(80,10);
    t2=createP('open');
    t2.position(580,10);


  canvas = createCanvas(700, 400);
  canvas.parent('sketch-holder');
  modeslider = createSlider(1,8,1);
  modeslider.class("sim-slider")
  modeslider.position(400,300);
  modeSliderLabel = createP();
  modeSliderLabel.position(420,270);
  wavelength = (4*tubelength)/(modeslider.value()*2-1);

  amplitude = .1*wavelength;
  angularfrequency = 2*PI;
  waveconstant = TWO_PI/wavelength;
  //noLoop();
  // Create objects
  noLoop();
  running = false;
  for (var i=0; i<1000; i++) {
    molecules.push(new Waver(20));
  }
  // Create a few red ones for visilibity
  for (var i=0; i<10; i++) {
    molecules.push(new Waver(color(255, 10, 10)));
  }
  fill(204,227,242);




}

function draw() {
  translate(0,50)

wavelength = (4*tubelength)/(modeslider.value()*2-1);

modeSliderLabel.html('mode: '+modeslider.value());
  amplitude = .15*wavelength;
  angularfrequency = 2*PI*modeslider.value();
  waveconstant = TWO_PI/wavelength;
  background(255);

  fill(120)
  rect(0,0,width,200)
  fill(240)
  rect(100,0,tubelength,200);


  for (var i=0; i<molecules.length; i++) {
    //molecules[i].jitter();
    molecules[i].undulate();
    molecules[i].display();

  }
}

// Jitter class
function Waver(fill_) {
  var j = 0;
  this.originalx = random(-500,tubelength+200);
  //this.originalx = this.x
  this.y = random(200);
  this.diameter = random(4, 8);
  this.speed = .4;

  this.jitter = function() {

    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.undulate = function(){
    //j will be the timekeeper here
    j++;
    // this function adds a sinusoidally varying amount to the x position

    //this.x = this.originalx + amplitude*sin(waveconstant*this.originalx)*cos(angularfrequency*j*.01);

    this.x = this.originalx + amplitude*sin(waveconstant*this.originalx)*cos(angularfrequency*j*.01);




  }

  this.display = function() {
    if (this.x > 0 && this.x < tubelength){
    push();
    fill(fill_);
    noStroke();
    translate(this.x+100, this.y);
    ellipse(0, 0, this.diameter, this.diameter);
    pop();
    }
    else {
        push();
        noFill();
        if (this.x<100){
        noStroke();
        }
        if (this.x>tubelength){
          //stroke(255);
        stroke(120*(0+(this.x-tubelength)/(100)));

        }
        translate(this.x+100, this.y);
        ellipse(0, 0, this.diameter, this.diameter);
        pop();
    }

  };
}



function turnonoff() {
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
