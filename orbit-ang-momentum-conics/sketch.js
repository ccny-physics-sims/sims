var planet;
var Orbiters = [];
var Trails = [];
//var VertzOfAreas = [];
var launch;
var speedSlider, angleSlider;
var mass;
var h;
var c;
var count;
let orbitCenter;

function setup(){
  canvas=createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');

  frameRate(30);
  planet = ellipse(width/2,height/2,40,40);

  mass = 400;
  h = height/4;
  c = 0;
  count = 0;



  launch = createButton("launch");
  launch.parent('sketch-holder');
  launch.mouseClicked(launchOrbiter);
  launch.position(width*.7,height*.05);
  launch.class("sim-button");
  speedSliderLabel = createP("Speed");
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(30,0);
  speedSlider = createSlider(0, 400,260 ,0);
  speedSlider.parent('sketch-holder');
  speedSlider.position(30,20);
  speedSlider.class("sim-slider");
  speedSlider.size(150,50)
  angleSliderLabel = createP("Direction");
  angleSliderLabel.parent('sketch-holder');
  angleSliderLabel.position(30,60);
  angleSlider = createSlider(0, 360, 0 ,0);
  angleSlider.parent('sketch-holder');
  angleSlider.position(30,90);
  angleSlider.class("sim-slider");
  angleSlider.size(150,50)

  distanceSliderLabel = createP("Distance");
  distanceSliderLabel.parent('sketch-holder');
  distanceSliderLabel.position(30,140);
  distanceSlider = createSlider(50, height/2,height/4 ,0);
  distanceSlider.parent('sketch-holder');
  distanceSlider.position(30,160);
  distanceSlider.class("sim-slider");
  distanceSlider.size(150,50)

  h = distanceSlider.value()

  orbitCenter = createVector(width/2,height*.6)

  aVector = new Arrow(createVector(orbitCenter.x,orbitCenter.y-h),createVector(0,0));
  aVector.color = color('red');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;
  aVector.width=10;
}



function draw(){
  count++;
  background(255);
  push();
  fill('yellow');
  stroke('black');
  planet = ellipse(orbitCenter.x,orbitCenter.y,20,20);
  pop();
  h = distanceSlider.value()

  aVector.origin.x = orbitCenter.x;
  aVector.origin.y = orbitCenter.y-h;
  aVector.target.x = orbitCenter.x+.5*speedSlider.value()*cos(angleSlider.value()*Math.PI/180)
  aVector.target.y = orbitCenter.y - h+.5*speedSlider.value()*sin(angleSlider.value()*Math.PI/180)
  aVector.update();
  aVector.display();

  fill(150);
  noStroke();
  //image(planet, width/2-60, height/2-60);
  for (i = Orbiters.length-1; i >= 0; i--){
    a = Orbiters[i];

    a.drawOrbiter();
    //a.drawAreas();

    dis = distance(a.position, orbitCenter);
    if ( dis < 5 || dis > 2000){
      Orbiters.splice(i,1);
    }
  }
  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the particle
      Trails.splice(i, 1);
    }
  }
}

function distance(pos, pos2){
  return sqrt(((pos.x-pos2.x)*(pos.x-pos2.x))+((pos.y-pos2.y)*(pos.y-pos2.y)));
}

 grav = function(pos){
   direction = createVector(orbitCenter.x - pos.x, orbitCenter.y - pos.y);
   direction.normalize();
   d = distance(pos, orbitCenter);
   direction.mult(4*mass/(d*d));
   return direction;
 }


  var Orbiter = function(px, py, vx, vy){
  this.position = createVector(px, py);
  this.velocity = createVector(vx/100, vy/100);
  this.VertzOfAreas = [];
  }

Orbiter.prototype.drawOrbiter = function(){
    this.gravity = grav(this.position);
    this.velgrav = this.velocity;
    this.velgrav.add(this.gravity);
    this.position.add(this.velgrav);

    ellipse(this.position.x, this.position.y, 10, 10);
      c++
      if(c % 5 == 0){
      Trails.push(new Particle(createVector(this.position.x, this.position.y)));
      }
  }

  Orbiter.prototype.drawAreas = function(){

      currentPos = this.position.copy();
      if(this.VertzOfAreas.length>20){
        this.VertzOfAreas.splice(0,1)
        this.VertzOfAreas.push(currentPos);
      }
      else{
        this.VertzOfAreas.push(currentPos);
      }

      if(this.VertzOfAreas.length>20){
      fill('blue');
      beginShape();
      vertex(orbitCenter.x,orbitCenter.y)

      for (i=0; i<this.VertzOfAreas.length; i++){
        vertex(this.VertzOfAreas[i].x,this.VertzOfAreas[i].y)
      }
      endShape(CLOSE);
      }


  }

function launchOrbiter(){

     for ( i = Orbiters.length-1; i >= 0; i--){
       Orbiters.splice(i,1);
     }
     for ( i = Trails.length-1; i >= 0; i--){
       Trails.splice(i,1);
     }

  Orbiters.push(new Orbiter(orbitCenter.x, orbitCenter.y - h, speedSlider.value()*cos(angleSlider.value()*Math.PI/180), speedSlider.value()*sin(angleSlider.value()*Math.PI/180)));


}

function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function keyTyped(){
 if (key === 'c'){
    for ( i = Orbiters.length-1; i >= 0; i--){
      Orbiters.splice(i,1);
    }
    for ( i = Trails.length-1; i >= 0; i--){
      Trails.splice(i,1);
    }
  }
}
