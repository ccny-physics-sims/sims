//TrailDots class

var TrailDot = function(position, lifespan) {
  this.position = position.copy();
  this.lifespan = lifespan;
  this.originalLife = lifespan
};

TrailDot.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
TrailDot.prototype.update = function(){
  this.lifespan -= 1;
};

// Method to display
TrailDot.prototype.display = function() {
  push();
  fill(0,0,0,255*this.lifespan/this.originalLife);
  noStroke();
  ellipse(this.position.x, this.position.y, 2,2);
  pop();
};

// Is the TrailDot still useful?
TrailDot.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
  } else {
    return false;
  }
};
