//TrailDots class

var TrailDot = function(position, lifespan) {
  this.position = position.copy();
  this.lifespan = lifespan;
};

TrailDot.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
TrailDot.prototype.update = function(){
  this.lifespan -= 2;
};

// Method to display
TrailDot.prototype.display = function() {
  push();
  fill(0,0,0,255*this.lifespan/40);
  noStroke();
  ellipse(this.position.x, this.position.y, 1,1);
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
