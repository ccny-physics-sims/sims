var Orbiter = function(position, velocity, acceleration, mass, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = Math.pow(mass,.333)
this.color = color;
this.c = 0
}

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
