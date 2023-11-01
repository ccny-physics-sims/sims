
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
            var norm = Math.sqrt(1+ d.magSq());
            var mag = gravity / (norm * norm * norm);

            if(p.alive){p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)))};
            if(p2.alive){p2.acceleration.add(p5.Vector.mult(d,(mag * p.mass)))};

            //console.log(mag);

        }
    }

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
