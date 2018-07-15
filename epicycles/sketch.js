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
canvas = createCanvas(windowWidth, windowHeight);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width/2,30);
  onoff.class("sim-button")

  BSliderLabel = createP("Epicycle Radius");
  BSliderLabel.parent('sketch-holder');
  BSliderLabel.position(50,10);
  BSlider = createSlider(0, 100, 50 ,0);
  BSlider.parent('sketch-holder');
  BSlider.position(50,40);
  BSlider.class("sim-slider");
  EquantSliderLabel = createP("Equant");
  EquantSliderLabel.parent('sketch-holder');
  EquantSliderLabel.position(50,90);
  EquantSlider = createSlider(0, 50, 0 ,0);
  EquantSlider.parent('sketch-holder');
  EquantSlider.position(50,120);
  EquantSlider.class("sim-slider");
  BRateSliderLabel = createP("Speed");
  BRateSliderLabel.parent('sketch-holder');
  BRateSliderLabel.position(50,170);
  BRateSlider = createSlider(1, 3, 2.1 ,0);
  BRateSlider.parent('sketch-holder');
  BRateSlider.position(50,200);
  BRateSlider.class("sim-slider");
//noSmooth();
//frameRate(15)
A = width/4;
B = BSlider.value()*.01*A
Arate = .01;
Brate = Arate*BRateSlider.value();
equantD = EquantSlider.value();
}

function draw(){
background(255)
fill(255);
B = BSlider.value()*.01*A
equantD = EquantSlider.value();
Brate = Arate*BRateSlider.value();

stroke(0);
ellipse(width/2,height/2-equantD,A,A)
ellipse(width/2,height/2,20,20)


push();

translate(width/2,height/2-equantD)
rotate(-Arate*i);
translate(0,-A/2)


fill(0);
stroke(0);




push();
fill(color('rgba(0, 0, 0, 0)'));
ellipse(0,0,B,B)
pop();

rotate(-Brate*i);
translate(0,-B/2);
push();
fill('red');
ellipse(0,0,10,10);
pop();

pop();
// pop();


push();
stroke(0)
translate(width/2,height/2);

//rotate(-.01*i);
xPos = A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i);
yPos = A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i)+2*equantD;
gamma = Math.atan2(A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i),A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i)+2*equantD);
rotate(gamma);
line(0,0,0,-300)
pop();

push();
translate(width/2,height/2);
//ellipse(xPos/2,-yPos/2,30,30)
pop();

stroke(150);
translate(0,-equantD);
line(width/2-A/2-40,height/2,width/2+A/2+40,height/2);
line(width/2,height/2-A/2-40,width/2,height/2+A/2+40);




c++
if(c % 5 == 0){
Trails.push(new Particle(createVector(width/2+xPos/2, height/2-yPos/2+equantD)));
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
