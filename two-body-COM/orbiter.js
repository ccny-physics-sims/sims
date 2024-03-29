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
  noStroke()
  fill(this.color,100,100)
  ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  pop();
  this.c++
  if(this.c % 2 == 0){
    Trails.push(new TrailDot(createVector(this.position.x, this.position.y),1000,this.color));
  }
}
