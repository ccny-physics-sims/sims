//COnstants
//SDF = 0.7;
SDF = 1;

///////////////////////////////////////
//Raft object
///////////////////////////////////////
function Raft(position){
  this.pos = createVector(position.x,position.y);
  this.catHandler = [];
  this.vel = createVector(0,0);
  this.mass = 10;

  //adding arrow to raft.
  this.target = this.vel.copy();
  this.target.add(this.pos);
  //this.target.normalize();
  this.arrow = new Arrow(this.pos,this.target);
  this.arrow.grab = false;
  this.arrow.drag = false;
  this.showComponents = true;
  this.showAngle = true;

}
Raft.prototype.update = function(){


  this.arrow.origin.x = this.pos.x;
  this.arrow.origin.y = this.pos.y;
  this.pos.add(p5.Vector.mult(this.vel,SDF));
  this.arrow.target = this.arrow.origin.copy();
  this.arrow.target.add(p5.Vector.mult(this.vel,50));
  //bounds checking
  if(this.pos.x < 0){
    this.pos.x = width;
  }
  if(this.pos.x > width){
    this.pos.x = 0;
  }

  if(this.pos.y < 0){
    this.pos.y = height;
  }
  if(this.pos.y > height){
    this.pos.y = 0;
  }
};
Raft.prototype.throwCat = function(v,catmass){
  var cat1 = new Cat(this.pos,v,catmass);
  this.catHandler.push(cat1);
  var temp = createVector((cat1.mass*cat1.vel.x)/(this.mass+cat1.mass),(cat1.mass*cat1.vel.y)/(this.mass+cat1.mass));
  temp.mult(-1);
  this.vel.add(temp);

  //temp.normalize();
  //temp.mult(10);
  //var arrow1 = new Arrow(cat1.pos,temp);
  //this.arrowHandler.push(arrow1);
};
Raft.prototype.draw = function(){

  push();
  //draw the boat
  fill(255,112,1);
  ellipse(this.pos.x,this.pos.y,100,100);
  fill(229,100,1);
  stroke(255);
  strokeWeight(3);
  ellipse(this.pos.x,this.pos.y,75,75);

  imageMode(CENTER);
  image(cat_img,this.pos.x,this.pos.y,64,48);
  pop();

  fill(100,3,200,200);
  noStroke();
  this.arrow.update();
//  this.arrow.display();

  //draw cats
  push();
  for(var i = 0; i<this.catHandler.length;i++){

    this.catHandler[i].update();
    this.catHandler[i].draw();
  }
  pop();
};

///////////////////////////////////////
//Cat object
///////////////////////////////////////


function Cat(p,v,_catmass){
  this.pos = createVector(p.x,p.y);
  this.vel = createVector(v.x,v.y);
  this.mass = _catmass;
  this.dead = false;

  //adding arrow to cat.
  this.target = this.vel.copy();
  this.target.add(this.pos);
  //this.target.normalize();
  this.arrow = new Arrow(this.pos,this.target);
  this.arrow.grab = false;
  this.arrow.drag = false;
  this.showComponents = true;
  this.showAngle = true;


}
Cat.prototype.update = function(){
  this.arrow.origin.x = this.pos.x;
  this.arrow.origin.y = this.pos.y;
  this.pos.add(p5.Vector.mult(this.vel,SDF));
  this.arrow.target = this.arrow.origin.copy();
  this.arrow.target.add(p5.Vector.mult(this.vel,20));

  this.arrow.xlabel = Math.round(this.vel.x).toString();
  this.arrow.ylabel = Math.round(this.vel.y).toString();

  //kills cats outside of boundary
  if(this.pos.y < 0 || this.pos.y > height || this.pos.x < 0 || this.pos.x > width){
    this.dead = true;
  }


};
Cat.prototype.draw = function(){
  if(this.dead == false){
    /*fill(0);
    stroke(255);
    ellipse(this.pos.x,this.pos.y,20,40); // draws the body
    triangle(this.pos.x,this.pos.y-25,this.pos.x,this.pos.y-15,this.pos.x-17,this.pos.y-35); // left ear
    ellipse(this.pos.x,this.pos.y-20,15,15); //draws the head
    */
    imageMode(CENTER);
    image(cat_img,this.pos.x,this.pos.y,64*this.mass/10,48*this.mass/10);

    fill(100,200,3,200);
    noStroke();
    this.arrow.update();
    this.arrow.display();


  }
};
