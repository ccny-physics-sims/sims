
var GravSystem = function(theBodies) {
 this.theBodies = theBodies;

}

GravSystem.prototype.compute_forces = function() {
    for (var i = 0; i < this.theBodies.length; i++) {
        var p = this.theBodies[i];

        p.acceleration.set(0);

        for (var j = 0; j < i; j++) {
            var p2 = orbiters[j];

            var d = p5.Vector.sub(p.position, p2.position);
            var norm = Math.sqrt(5 + d.magSq());
            var mag = gravity / (norm * norm * norm);

            p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)));
            p2.acceleration.add(p5.Vector.mult(d,(mag * p.mass)));
            //console.log(mag);

        }
    }

}

GravSystem.prototype.do_collisions = function() {
    for (var i = 0; i < this.theBodies.length; i++) {
        var p = orbiters[i];
        for (var j = 0; j < i; j++) {
            var p2 = orbiters[j];

             if (this.checkCollision(p, p2)) {

               newMass = p.mass + p2.mass;
               aMom = p5.Vector.mult(p.velocity,p.mass);
               bMom = p5.Vector.mult(p2.velocity,p2.mass);
               newMomentum = p5.Vector.add(aMom,bMom);
               Thiscom = p5.Vector.div(p5.Vector.add(p5.Vector.mult(p.position,p.mass),p5.Vector.mult(p2.position,p2.mass)),newMass)
               newVel = p5.Vector.div(newMomentum,newMass);

               orbiters.splice(i,1);

               orbiters[j].mass=newMass;
               orbiters[j].velocity = newVel;
               orbiters[j].position = Thiscom;
               orbiters[j].radius = Math.pow(newMass,.333);



             }
        }

    }
}

GravSystem.prototype.checkCollision = function(a,b){
  var d = p5.Vector.sub(a.position,b.position)
  var r = a.radius + b.radius
  if (d.magSq() < r*r){
    return true;
  }
  else{
    return false;
  }
}

function collideEm(a,b,i,j){

newMass = a.mass + b.mass;
aMom = p5.Vector.mult(a.velocity,a.mass);
bMom = p5.Vector.mult(b.velocity,b.mass);
newMomentum = p5.Vector.add(aMom,bMom);
Thiscom = p5.Vector.div(p5.Vector.add(p5.Vector.mult(a.position,a.mass),p5.Vector.mult(b.position,b.mass)),newMass)
newVel = p5.Vector.div(newMomentum,newMass);

this.theBodies.splice(j,1);
this.theBodies.splice(i,1);
this.theBodies.push(new TrailDot(Thiscom, newVel, createVector(0,0), newMass));


}


GravSystem.prototype.do_physics = function(dt) {
    for (var i1 = 0; i1 < this.theBodies.length; i1++) {
        var p1 = this.theBodies[i1];
        p1.position.add(p5.Vector.mult(p1.velocity, 0.5 * dt));
        //console.log(dt);
        }

    this.compute_forces();

    for (var i2 = 0; i2 < this.theBodies.length; i2++) {
        var p2 = this.theBodies[i2];
        p2.velocity.add(p5.Vector.mult(p2.acceleration,dt));
        //p2.velocity.set(createVector(1,1))
    }

    for (var i3 = 0; i3 < this.theBodies.length; i3++) {
        var p3 = this.theBodies[i3];
        p3.position.add(p5.Vector.mult(p3.velocity,0.5 * dt));
    }

    //this.do_collisions();


}
