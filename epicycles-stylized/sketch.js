var i=0;
var A, Arate;
var B, Brate;

var onoff;
var running = true;
var EpicycleSlider, BRateSlider;
var xPos,yPos;
var c;

var Trails = [];
function preload() {
  //image based on from https://photojournal.jpl.nasa.gov/catalog/PIA16950
  //credit: NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington
  earthImage = loadImage('earth-polar-view.png');
  quartzImage = loadImage('quartz.png');
}

function setup(){
canvas = createCanvas(windowWidth, windowHeight);
canvas.parent('sketch-holder');
imageMode(CENTER)
frameRate(30);
  c = 0;
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width/2,30);
  onoff.class("sim-button")

  EpicycleSliderLabel = createP("Epicycle Radius");
  EpicycleSliderLabel.parent('sketch-holder');
  EpicycleSliderLabel.position(50,20);
  EpicycleSliderLabel.style('color: white;');
  EpicycleSlider = createSlider(0, 40, 30 ,0);
  EpicycleSlider.parent('sketch-holder');
  EpicycleSlider.position(50,50);
  EpicycleSlider.class("sim-slider");

  BRateSliderLabel = createP("Speed");
  BRateSliderLabel.parent('sketch-holder');
  BRateSliderLabel.position(50,90);
  BRateSliderLabel.style('color: white;');
  BRateSlider = createSlider(1, 3, 2.8 ,0);
  BRateSlider.parent('sketch-holder');
  BRateSlider.position(50,120);
  BRateSlider.class("sim-slider");
//noSmooth();
//frameRate(15)
A = width/4;
B = EpicycleSlider.value()*.01*A
Arate = .01;
Brate = Arate*BRateSlider.value();

}

function draw(){
background(0)
fill(0);
B = EpicycleSlider.value()*.01*A
Brate = Arate*BRateSlider.value();
//
stroke(255);
fill(255)
//ellipse(width/2,height/2,A+B)
//ellipse(width/2,height/2,20,20)


push();

translate(width/2,height/2)
rotate(-Arate*i);
image(quartzImage,0,0,A+B,A+B)

fill(0)
ellipse(0,0,A-B)

translate(0,-A/2)

fill(0);
stroke(255);
push();
noStroke()

fill(color('rgba(250, 200, 200, 1)'));
ellipse(0,0,B,B)
pop();

rotate(-Brate*i);
translate(0,-B/2);
push();
fill('red');
noStroke()
ellipse(0,0,10,10);
pop();

pop();
// pop();


push();
stroke(255)
translate(width/2,height/2);

//rotate(-.01*i);
xPos = A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i);
yPos = A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i);
gamma = Math.atan2(A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i),A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i));
// rotate(gamma);
// line(0,0,0,-300)
pop();

push();

translate(width/2,height/2);
image(earthImage,0,0,30,30)

//ellipse(xPos/2,-yPos/2,30,30)
pop();






c++
if(c % 5 == 0){
Trails.push(new Particle(createVector(width/2+xPos/2, height/2-yPos/2)));
}
for (var j = Trails.length-1; j >= 0; j--) {
  var p = Trails[j];
  p.run();
  if (p.isDead()) {
    //remove the particle
    Trails.splice(j, 1);
  }
}


i++
}


//particles class




var Particle = function(position) {
  this.acceleration = createVector(0, 0.0);
  //this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.velocity = createVector(0,0);
  this.position = position.copy();
  this.lifespan = 1000.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  push()
  noStroke()
  fill(100, this.lifespan);
  ellipse(this.position.x, this.position.y, 3);
  pop()
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
  } else {
    return false;
  }
};


function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
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
