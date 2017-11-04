var i=0;
var A, Arate;
var B, Brate;
var equantD;
var onoff;
var running = true;
var BSlider, EquantSlider, BRateSlider;
var xPos,yPos;
var c;

var Trails = [];


function setup(){
createCanvas(800, 800);
frameRate(30);
  c = 0;

  textSize(18)

  BSliderLabel = createP("time advance");
  BSliderLabel.position(50,0);
  BSlider = createSlider(0, 20, 0 ,0);
  BSlider.position(50,40);
  BSlider.class("sim-slider");

//noSmooth();
//frameRate(15)

B = BSlider.value()
Arate = .01;

}

function draw(){
background(255)
fill(255);
A = width/4;
B = BSlider.value()*.01


translate(width/2,height/2)

push()
fill(0,0,0,0)
ellipse(0,0,2*A,2*A)
pop()
push()
fill(0)
text("Sun",-15,-30);
pop()
push()
fill(250,250,40)
ellipse(0,0,40,40)
pop()

push()
//rotate(-BSlider.value()*.01)
//translate(width/4,0)

translate(-A*cos(B), A*sin(B));
fill(0)
text("Earth",-80,5);
line(0,0,300,0)
fill(20,200,20);
ellipse(0,0,30,30)
rotate(-B*32.42)
line(0,0,400,0)
pop();





c++
if(c % 5 == 0){
//Trails.push(new Particle(createVector(width/2+xPos/2, height/2-yPos/2+equantD)));
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
  fill(80, this.lifespan);
  ellipse(this.position.x, this.position.y, 2,2);
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
    //resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
