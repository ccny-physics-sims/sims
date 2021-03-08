

function FBD(position_, howManyForces_) {

this.position = position_.copy();
this.howManyForces = howManyForces_;
this.mag = [];
this.direction = [];
v1 = [];

for(var i = 0; i < this.howManyForces; i++){

v1[i] = new Arrow(position_,p5.Vector.add(position_,createVector(0,this.mag[i])));
v1[i].grab = false;
v1[i].drag = false;
v1[i].color = color(230,40,40);

}

}

FBD.prototype.update = function(){

  for(var i = 0; i < this.howManyForces; i++){
    v1[i].target = createVector(0,this.mag[i]);
    v1[i].update();
  }

}

FBD.prototype.display = function(){

for(var i = 0; i < this.howManyForces; i++){
  v1[i].display();
}

push()
fill(10);
ellipse(this.position.x,this.position.y,20,20)
pop()

}
