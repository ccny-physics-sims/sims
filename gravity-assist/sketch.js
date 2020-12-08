var orbiters=[];
var gravity =1;
var totalMass;
var Trails = [];
var com;
var SolarSystem;
var centerx,centery;
var running = false;

function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');
  running = false;

  onoff = createButton("Start");
  onoff.parent('sketch-holder');
  onoff.position(20,20);
  onoff.class("sim-button");
  onoff.mousePressed(turnonoff);

  reset = createButton("Reset");
  reset.parent('sketch-holder');
  reset.position(20,onoff.y+50);
  reset.class("sim-button");
  reset.mousePressed(resetMasses);

  comCoord  = createCheckbox('Center Of Mass?', false);
  comCoord.parent('sketch-holder');
  comCoord.position (20,reset.y+50)
  comCoord.changed(resetMasses);


  vSat = 45;
  massRatio = 2;
  centerx = width/4;
  centery = height/2;

 SolarSystem = new GravSystem(orbiters);
mass1Pos = createVector(centerx-30,centery);
mass1Vel = createVector(vSat*1,0)


mass2Pos = createVector(centerx-80,centery+200);
mass2Vel = createVector(+vSat,-vSat);
mass1 =  orbiters.push(new Orbiter(mass1Pos,mass1Vel,createVector(0,0),100000, 'red',10));

mass2 = orbiters.push(new Orbiter(mass2Pos,mass2Vel,createVector(0,0),.000001, 'blue',3));
  COM();
  noLoop()

 }



function draw(){
background(255);
textSize(18)



  for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 32); // increase the divisor to increase accuracy and decrease simulation speed
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }
  text("Speed: "+(orbiters[1].velocity.mag().toFixed(1)),orbiters[1].position.x,orbiters[1].position.y-30)
  text("Speed: "+(orbiters[0].velocity.mag().toFixed(10)),orbiters[0].position.x,orbiters[0].position.y-30)
  COM();
COMDisplay();

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
  //displays the center of mass of the system
  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);

}

function COMDisplay() {
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
  if (!running) {
    running = true;
    turnedOffByButton = false;
    loop();
    onoff.html("stop");
    return
  }

  if (running) {
    running = false;
    turnedOffByButton = true;
    noLoop()
    onoff.html("start");
    return
  }
}

function resetMasses(){
  clear(0)
  Trails = [];
  orbiters = [];
  SolarSystem = new GravSystem(orbiters);
  mass1Pos = createVector(centerx-30,centery);
  mass1Vel = createVector(vSat*1,0)
  mass2Pos = createVector(centerx-80,centery+200);
  mass2Vel = createVector(+vSat,-vSat);
  mass1 =  orbiters.push(new Orbiter(mass1Pos,mass1Vel,createVector(0,0),100000, 'red',10));
  mass2 = orbiters.push(new Orbiter(mass2Pos,mass2Vel,createVector(0,0),.000001, 'blue',3));
  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }
  text("Speed: "+(orbiters[1].velocity.mag().toFixed(1)),orbiters[1].position.x,orbiters[1].position.y-30)
  text("Speed: "+(orbiters[0].velocity.mag().toFixed(10)),orbiters[0].position.x,orbiters[0].position.y-30)
  COM();
COMDisplay();
}

// function touchEnded() {
//   return false;
// }
