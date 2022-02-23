//the orbiter class

var Orbiter = function(position, velocity, acceleration, mass, radius, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = radius
this.color = color;
this.c = 0
}

//diplay an orbiter by drawing an ellipse.

Orbiter.prototype.display = function(){
  push();
  fill(this.color)
  ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  pop();
  this.c++
  if(this.c % 5 == 0){
    Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  }
}
