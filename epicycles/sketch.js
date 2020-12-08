var i=0;
var A, Arate;
var B, Brate;
var equantD;
var onoff;
var running = true;
var BSlider, EquantSlider, BRateSlider;
var xPos,yPos;
var c;
let sliderWidth;

var Trails = [];


function setup(){
canvas = createCanvas(windowWidth, windowHeight*.9);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.class("sim-button")

  sliderWidth = min(200,width/4)

  BSlider = createSlider(0, 100, 50 ,0);
  BSlider.parent('sketch-holder');
  BSlider.position(20,20);
  BSlider.class("sim-slider");
  BSlider.size(sliderWidth,0)

  BSliderLabel = createP("Epicycle Radius");
  BSliderLabel.parent('sketch-holder');
  BSliderLabel.position(20,BSlider.y+10);


  EquantSlider = createSlider(0, 50, 0 ,0);
  EquantSlider.parent('sketch-holder');
  EquantSlider.position(20,100);
  EquantSlider.class("sim-slider");
  EquantSlider.size(sliderWidth,0)

  EquantSliderLabel = createP("Equant");
  EquantSliderLabel.parent('sketch-holder');
  EquantSliderLabel.position(20,EquantSlider.y+10);



  BRateSlider = createSlider(1, 3, 2.1 ,0);
  BRateSlider.parent('sketch-holder');
  BRateSlider.position(20,180);
  BRateSlider.class("sim-slider");
  BRateSlider.size(sliderWidth,0)

  BRateSliderLabel = createP("Speed");
  BRateSliderLabel.parent('sketch-holder');
  BRateSliderLabel.position(20,BRateSlider.y+10);

  onoff.position(20,BRateSlider.y+80);

  clear = createButton("clear");
  clear.parent('sketch-holder');
  clear.mouseClicked(clearDots);
  clear.class("sim-button")
  clear.position(20,onoff.y+50);
//noSmooth();
//frameRate(15)
A = width/4;
B = BSlider.value()*.01*A
Arate = .01;
Brate = Arate*BRateSlider.value();
equantD = EquantSlider.value();


}

function draw(){
background(150)
fill(255);
push()
fill('white')
circle(width/2,height/2,min(width,height))
pop()
B = BSlider.value()*.01*A
equantD = EquantSlider.value();
Brate = Arate*BRateSlider.value();

stroke(0);
ellipse(width/2,height/2-equantD,A,A)
noStroke()
fill('green')
ellipse(width/2,height/2,10,10)
push();

translate(width/2,height/2-equantD)
rotate(-Arate*i);
translate(0,-A/2)

//
// fill(0);
// stroke(0);




push();
fill(color('rgba(250, 0, 0, .1)'));
stroke('pink')
ellipse(0,0,B,B)
pop();

rotate(-Brate*i);
translate(0,-B/2);
push();
noStroke();
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
line(0,0,0,-width/2)
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
  fill(color(250,0,0));
  noStroke();
  circle(this.position.x, this.position.y, 4);
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

  function clearDots() {
    // and of course it's nice to be able to stop it if things get crazy
    Trails = [];
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
