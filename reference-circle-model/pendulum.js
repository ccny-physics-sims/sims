function Pendulum(origin_, length_, theta0) {
  // Fill all variables
  this.origin = origin_.copy();
  this.position = createVector();
  this.L = length_;
  this.angle = theta0;
  this.aVelocity = 0.0;
  this.aAcceleration = 0.0;
  this.ballr = 25.0;      // Arbitrary ball radius
  this.littleg = gravity;
  this.go = function() {
    this.update();
    this.display();
  }

  // Function to update position
  this.update = function() {
    this.aAcceleration = (-1 * this.littleg / this.L) * (this.angle);  // Calculate acceleration (see:
    this.aVelocity += (this.aAcceleration);                            // Increment velocity
    this.angle += (this.aVelocity);                                    // Increment angle
  }

  this.display = function() {
    this.position.set(this.L*sin(this.angle), this.L*cos(this.angle), 0);         // Polar to cartesian conversion
    this.position.add(this.origin);                                               // Make sure the position is relative to the pendulum's origin

    stroke(0);
    strokeWeight(1);
    // Draw the arm
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);
    // Draw the ball
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
    rect(this.origin.x-30,this.origin.y-5,60,10)
  }
}
