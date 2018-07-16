var Orbiter = function(position, velocity, acceleration, mass, color,radius){
this.position = position;

this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
//this.radius = Math.pow(mass,.333)/5
this.radius = radius;
this.color = color;
this.c = 0
}

Orbiter.prototype.display = function(){
  if (comCoord.checked()){
    this.position.sub(com).add(createVector(centerx,centery));
  }
  else {
    
  }
  push();
  fill(this.color)
  ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  pop();
  this.c++
  if(this.c % 1 == 0){
    Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  }
}
