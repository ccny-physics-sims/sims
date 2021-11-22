var Orbiter = function(position, velocity, acceleration, mass, color){
this.position = position;
this.velocity = velocity;
this.acceleration = acceleration;
this.mass = mass;
this.radius = Math.pow(mass,.333)
this.color = color;
this.c = 0
this.trajectory = []
}

Orbiter.prototype.buildTrajectory = function(){
  newPosition = this.position.copy()
  this.trajectory.push(newPosition)
}

Orbiter.prototype.displaytraj = function(){
  // push();
  // fill(this.color)
  // //ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  // pop();
  push()
  noFill()
  stroke("#EBB8F1")
  strokeWeight(2)
  beginShape()
  for (i=0;i<this.trajectory.length;i+=2){
    //ellipse(this.trajectory[i].x, this.trajectory[i].y, this.radius*1, this.radius*1)
    curveVertex(this.trajectory[i].x, this.trajectory[i].y)
  }
  endShape()
  pop()

}

Orbiter.prototype.display = function(){
  push();
  fill(this.color)
  noStroke()
  ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2)
  pop();

  // this.c++
  // if(this.c % 5 == 0){
  //   Trails.push(new TrailDot(createVector(this.position.x, this.position.y),500));
  // }
}
