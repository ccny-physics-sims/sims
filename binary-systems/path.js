var Path = function(color_){
    this.points = [];
    this.ticker = 0;
    this.color = color_;
}

Path.prototype.update = function(whichOrb){
  this.ticker++
  if (this.points.length>300){
    this.points.shift()
  }
  if(this.ticker % 1 == 0){
    //console.log(i)
    this.points.push(new createVector(orbiters[whichOrb].position.x,orbiters[whichOrb].position.y))
  }
}

Path.prototype.display = function(){
push()
noFill();
stroke(this.color);
strokeWeight(2);
beginShape();
for (i=0;i<this.points.length;i++)
  {
    curveVertex(this.points[i].x,this.points[i].y)
  }
endShape();
pop();
}
