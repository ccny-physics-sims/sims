var Planet = function(distance_, diameter_) {
  this.distance = distance_;
  this.diameter = diameter_;
  this.theta = atan2(mouseY-height/2, mouseX-width/2);
  this.orbitspeed = 20/(Math.pow(distance_,1.5));
  //console.log(distance);
};



Planet.prototype.update = function() {
    // Increment the angle to rotate
    this.theta += this.orbitspeed;
  }

Planet.prototype.display = function() {
    // Before rotation and translation, the state of the matrix is saved with pushMatrix().
    push();
    // Rotate orbit
    rotate(this.theta);
    // translate out distance
    translate(this.distance,0);
    //console.log(distance)
    stroke(0);
    fill(175);
    ellipse(0,0,this.diameter,this.diameter);
    // Once the planet is drawn, the matrix is restored with popMatrix() so that the next planet is not affected.
    pop();
  }
