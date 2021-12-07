
var SpringSystem = function(theBodies) {
 this.theBodies = theBodies;
 this.equilLength = 200;

}

SpringSystem.prototype.compute_forces = function() {
    for (var i = 0; i < this.theBodies.length; i++) {
        var p = this.theBodies[i];
        var howManyInteractions = this.theBodies[i].interactions.length;
        //console.log(howManyInteractions)
        p.acceleration.set(0);

        for (var j = 0; j < howManyInteractions; j++) {
            var p2 = masses[this.theBodies[i].interactions[j]];
          //  console.log(this.theBodies[i].interactions);
          //  console.log(p,p2);
            //console.log(p2.color);
            //var d = p5.Vector.sub(p.position, p2.position);
            //var delx = (p.position.x - p2.position.x)-200
            var delx = abs(p.position.x - p2.position.x)-gravSystemWidth/3;
            var signx = Math.sign(p.position.x - p2.position.x)
            var dely = abs(p.position.y - p2.position.y);
            var signy = Math.sign(p.position.y - p2.position.y)
            //console.log(delx)
          //   var norm = Math.sqrt(1 + d.magSq());
          //   var mag = gravity / (norm * norm * norm);
          // //var norm = d.mag();
          //   p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)));
          //   p2.acceleration.add(p5.Vector.mult(d,(mag * p.mass)));
          //var mag = .00000010;
           //kmag = .2;
            // p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)));
            // p2.acceleration.add(p5.Vector.mult(d,(mag * p.mass)));

            p.acceleration.sub(p5.Vector.mult(createVector(delx*signx,dely*signy),(kmag/p.mass)));
            //p2.acceleration.add(p5.Vector.mult(createVector(delx*sign,0),(mag/p2.mass)));
            //console.log(mag);

        }
    }

}







SpringSystem.prototype.do_physics = function(dt) {
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




}
