var orbiters=[];
var neworbiters = [];
var gravity = 2;
var totalMass;
var Trails = [];
//var c=0;
var SolarSystem;
var running = false;

function setup(){
  //frameRate(40);
  canvas = createCanvas(windowWidth*.9, windowHeight*.9);
  canvas.parent('sketch-holder');

massRatio =1000;

//Make a new GravSystem
//Orbiters is an array of things bodies
onoff = createButton("PLAY");
onoff.parent('sketch-holder')
onoff.mouseClicked(turnonoff);
onoff.position(30,30);
onoff.class("sim-button blue");
 SolarSystem = new GravSystem(orbiters);

//define a relationship between the radius and the mass
planeta = min(width/2,height/2)*.7
v1 = sqrt(gravity*massRatio/planeta)
//console.log(planeta)
r = planeta*Math.pow((100/(3*100*massRatio)),(1/3))
//console.log(r);
satV = v1*((planeta-r)/planeta)*1.01
satV2 = v1*((planeta+r)/planeta)*1.0165
//create the three orbiters
mass1 =  orbiters.push(new Orbiter(createVector(width/2,-planeta+height/2),createVector(v1,0),createVector(0,0),1,4, 'lightblue'));
mass2 = orbiters.push(new Orbiter(createVector(width/2,height/2),createVector(-v1/massRatio,0),createVector(0,0),1*massRatio,20, 'yellow'));
sat = orbiters.push(new Orbiter(createVector(width/2,-planeta+r+height/2),createVector(satV,0),createVector(0,0),.0001,2, 50));
// sat2 = orbiters.push(new Orbiter(createVector(width/2,-planeta-r+height/2),createVector(satV2,0),createVector(0,0),.0001,2, 50));
noLoop()
 }



function draw(){
background(255);

//the following solves the physics
  for (var k = 0; k < 8; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }

  COM();

  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the TrailDot
      Trails.splice(i, 1);
    }
  }

}


function COM(){

  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y,)
  line(com.x,com.y-5,com.x,com.y+5,)
  pop();
}




function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }
    }

function keyTyped(){
 if (key === 'c'){
    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
    }
    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }
  }
}
