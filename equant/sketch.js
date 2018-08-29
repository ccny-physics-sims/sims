var i=0;
var A, Arate;
var B, Brate;
var equantD;
var onoff;
var running = true;
var BSlider, EquantSlider, BRateSlider;
var xPos,yPos;
var omega = 1;
//radius of deferent
var A = 200;
var B = 25;

var c;
var t = 0;
var Trails = [];


function setup(){
canvas = createCanvas(windowWidth*.9, windowHeight*.9);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(50,30);
  onoff.class("sim-button")


  EquantSliderLabel = createP("Equant");
  EquantSliderLabel.parent('sketch-holder');
  EquantSliderLabel.position(50,90);
  EquantSlider = createSlider(0, 100, 50 ,0);
  EquantSlider.parent('sketch-holder');
  EquantSlider.position(50,120);
  EquantSlider.class("sim-slider");

//noSmooth();
//frameRate(15)
equantD = EquantSlider.value();
}

function draw(){
background(255)
fill(255);
equantD = EquantSlider.value();
translate(width/2,height/2)
stroke(0);
// Draw deferent
ellipse(0,0,2*A,2*A)
// Draw center of deferent
push()
noStroke()
fill(0)
ellipse(0,0,5,5)
//draw Earth
fill('blue')
ellipse(-equantD,0,10,10)
fill(0)
stroke(0)
line(equantD-5,0,equantD+5,0)
line(equantD,5,equantD,-5)
//ellipse(equantD,0,5,5)
noFill()
stroke(150)
ellipse(equantD,0,2*B)
pop()



//xpos = -A*Math.cos(omega*t);
//ypos = A*Math.sin(omega*t);

xpos = A*Math.cos(omega*t-(Math.asin(Math.sin(omega*t)*equantD/A)))
ypos = -A*Math.sin(omega*t-(Math.asin(Math.sin(omega*t)*equantD/A)))

xposEq = B*Math.cos(omega*t);
yposEq = -B*Math.sin(omega*t);
push()
stroke(200)
line(equantD,0,xpos,ypos)
pop()

push()
fill('red')
ellipse(xpos,ypos,10)
pop()

push()
fill(130)
//ellipse(xposEq+equantD,yposEq,3)
pop()


t+=.01


// c++
// if(c % 5 == 0){
// Trails.push(new Particle(createVector(width/2+xPos/2, height/2-yPos/2+equantD)));
// }
// for (var j = Trails.length-1; j >= 0; j--) {
//   var p = Trails[j];
//   p.run();
//   if (p.isDead()) {
//     //remove the particle
//     Trails.splice(j, 1);
//   }
// }
//
//
// i++
//
// }

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
