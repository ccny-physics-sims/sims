var Orbiter = function(position, velocity, acceleration, mass, radius, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = radius;//Math.pow(mass,.333)*2
this.color = color;
this.c = 0
this.alive = true;
}

Orbiter.prototype.display = function(){
   push();
   noStroke();
   fill(this.color)
   //triangle(this.position.x, this.position.y, this.position.x+10, this.position.y, this.position.x-5, this.position.y+10)
   ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
   pop();
  //this.c++
  // if(this.c % 5 == 0){
  //   Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  // }


}
