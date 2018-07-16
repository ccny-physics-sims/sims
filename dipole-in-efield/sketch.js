var fieldLineSpacing;
var strength=20;
var dipoles = [];

function setup() {
  canvas = createCanvas(windowWidth*.95,windowHeight*.95)
  canvas.parent('sketch-holder');
  rectMode(CENTER);

  fieldStrengthSlider = createSlider(0,30,10, 1);
  fieldStrengthSlider.position(160,15);
  fieldStrengthSlider.parent('sketch-holder');
  fieldStrengthSlider.class("sim-slider blue");
  fieldStrengthSliderLabel = createP();
  fieldStrengthSliderLabel.position(30,20);
  fieldStrengthSliderLabel.parent('sketch-holder');
  fieldStrengthSliderLabel.style("color", "#ffffff");
  fieldStrengthSliderLabel.style("font-family", "Helvetica");
  fieldStrengthSliderLabel.html( 'E-Field Strength')

  dipoles.push(new Dipole(createVector(width/2,height/2),.8));

}

function draw() {
  background(255);

  strength = fieldStrengthSlider.value();
  fieldLineSpacing = width/strength;
  drawFieldLines()
  push();
  fill(150)
  rect(width/2,30,width,60)
  rect(width/2,height-30,width,60)
  pop()
  for (i = 0; i <dipoles.length; i++){
    a = dipoles[i];
    a.update();
    a.display();
  }
}

  function touchEnded() {
    if(mouseY>=100 && mouseX>=100){
    dipoles.push(new Dipole(createVector(mouseX,mouseY),random(-1.5,1.5)));
  }
  }

function drawFieldLines(){
  //draw field lines
  push();
  stroke('red')
  for (i=1;i<strength;i++) {
    line(i*fieldLineSpacing,0,i*fieldLineSpacing,height);
  }
  pop();
  //draw arrow to indicate direction
  push();
  fill('red');
  noStroke();
  for (i=1;i<strength;i++) {
  triangle(i*fieldLineSpacing,.2*height,i*fieldLineSpacing+5,10+.2*height,i*fieldLineSpacing-5,10+.2*height)
  triangle(i*fieldLineSpacing,.8*height,i*fieldLineSpacing+5,10+.8*height,i*fieldLineSpacing-5,10+.8*height)
  }
  pop();
}


//Dipole class

var Dipole = function(position,initialAngle) {
  this.acceleration = createVector(0, 0.0);
  //this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.velocity = createVector(0,0);
  this.position = position.copy();
  this.lifespan = 1000.0;
  this.rotAccel = 0;
  this.rotVel = 0;
  this.angle = initialAngle;
};

Dipole.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Dipole.prototype.update = function(){
  this.rotAccel = -.001*sin(this.angle)*strength;
  this.rotVel += this.rotAccel
  this.angle += this.rotVel;
  //this.velocity.add(this.acceleration);
  //this.position.add(this.velocity);

  //this.lifespan -= 2;
};

// Method to display
Dipole.prototype.display = function() {
  fill(200)
  push();
  noStroke()
  //console.log(this.position)
  translate(this.position.x,this.position.y)
  rotate(this.angle);
  rect(0,0,20,100,5)
  fill('red')
  ellipse(0,-40,15)
  fill('white')
  rect(0,-40,3,10)
  rect(0,-40,10,3)
  fill('black')
  ellipse(0,+40,15)
  fill('white')
  rect(0,+40,10,3)
  fill(230)
  rect(0,0,2,60)
  triangle(0,-30,5,-25,-5,-25)
  pop();
  //ellipse(this.position.x, this.position.y, 2,2);
};

// Is the particle still useful?
Dipole.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
  } else {
    return false;
  }
};
