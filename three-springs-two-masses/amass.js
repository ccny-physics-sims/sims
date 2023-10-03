var AMass = function(position, velocity, acceleration, mass, radius, color, interactions,springToShow){
this.position = position;
this.initialPos = position.copy();
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = radius
this.color = color;
this.interactions = interactions
this.springToShow = springToShow
this.c = 0
this.positionHistory = []
}

AMass.prototype.showx0 = function(){
line(this.initialPos.x,-20,this.initialPos.x,50)
}

AMass.prototype.display = function(){
  push();
  fill(this.color)
  if(this.color == 'black'){
    rect(this.position.x, this.position.y-50,10,100)
  }
  else {
  ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  }
  pop();
   this.c++
  // if(this.c % 5 == 0){
  //   Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  // }

  this.positionHistory.push(this.position.copy())

  if (this.positionHistory.length>100){
    this.positionHistory.shift()
  }
}

AMass.prototype.displaySpring = function () {
  if (this.springToShow != null){
  lengthOfSpring = p5.Vector.dist(this.position,masses[this.springToShow].position)
  //console.log(lengthOfSpring);

  push()
  noFill()
  translate(this.position.x,this.position.y)
  strokeWeight(2)
  //rotate()
  //rotate(PI-atan2((this.position.y-masses[this.springToShow].position.y),this.position.x-masses[this.springToShow].position.x))
    beginShape();

  for (var k = 0; k < lengthOfSpring; k++) {
    curveVertex(k, -transAmp * sin(2 * PI * noOfCoils *k / lengthOfSpring));
  }

  endShape();
  pop()
}
}
