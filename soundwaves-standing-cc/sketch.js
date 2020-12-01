var molecules = []; // array of Jitter objects
var wavelength;
var amplitude;
var angularfrequency;
var waveconstant;
var k = 0;
let tubelength;
var canvas;
var modeslider;
var modeSliderLabel;
var onoff;

function setup() {
  //frameRate(25);


  canvas = createCanvas(windowWidth*.8, windowHeight*.7);
  canvas.parent('sketch-holder');

tubelength = width*.8

  modeslider = createSlider(1,8,1);
  modeslider.parent('sketch-holder');
  modeslider.class("sim-slider")
  modeslider.position(width/2,.75*height);
  modeSliderLabel = createP();
  modeSliderLabel.parent('sketch-holder');
  modeSliderLabel.position(width/2,.65*height);

  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width/3,.72*height);
  onoff.class("sim-button")

  t1=createP('closed');
  t1.parent('sketch-holder');
  t1.position(50,height/4);
  t1.style('color','black')
  t1.style('font-size','2em')

  t2=createP('closed');
  t2.parent('sketch-holder');
  t2.position(width-100,height/4);
  t2.style('color','black')
  t2.style('font-size','2em')


  wavelength = (2*tubelength)/modeslider.value();

  amplitude = .15*wavelength;
  angularfrequency = .1*PI;
  waveconstant = TWO_PI/wavelength;
  //noLoop();
  // Create objects
  noLoop();
  running = false;
  for (var i=0; i<500; i++) {
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
wavelength = 2*tubelength/modeslider.value();
modeSliderLabel.html('mode: '+modeslider.value())
  amplitude = .15*wavelength;
  angularfrequency = 2*PI*modeslider.value();
  waveconstant = TWO_PI/wavelength;
  background(255);
  translate(0,height/4)
  fill(120)
  rect(0,0,width,200)
  fill(240)
  rect(width*.1,0,tubelength,200);

  for (var i=0; i<molecules.length; i++) {
    //molecules[i].jitter();
    molecules[i].undulate();
    molecules[i].display();

  }
}

// Jitter class
function Waver(fill_) {
  var j = 0;
  this.originalx = random(00,tubelength);
  //this.originalx = this.x
  this.y = random(200);
  this.diameter = random(4, 8);
  this.speed = .1;

  this.jitter = function() {

    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.undulate = function(){
    //j will be the timekeeper here
    j++;
    // this function adds a sinusoidally varying amount to the x position

    //this.x = this.originalx + amplitude*sin(waveconstant*this.originalx)*cos(angularfrequency*j*.01);

    this.x = this.originalx + amplitude*sin(waveconstant*this.originalx+0*wavelength/4)*cos(angularfrequency*j*.003);




  }

  this.display = function() {
    if (this.x > 0 && this.x < tubelength){
    push();
    fill(fill_);
    noStroke();
    translate(this.x+width*.1, this.y);
    ellipse(0, 0, this.diameter, this.diameter);
    pop();
    }
    else {
        push();
        noFill();
        translate(this.x+100, this.y);
        //ellipse(0, 0, this.diameter, this.diameter);
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
