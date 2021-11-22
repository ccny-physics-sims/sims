var orbiters=[];
var gravity =5;
var totalMass;
var Trails = [];
var COMTrails = [];
let origin;
var SolarSystem;
let running = true;

function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder')
  v1 = 1;
  massRatio = 5;
colorMode(HSB);
  origin = createVector(width/2,height/2)

 MakeMasses()

r1Vector = new Arrow(origin,orbiters[0].position);
r1Vector.color = color(353,100,80,.5);
r1Vector.width = 7;
r1Vector.showComponents = false;
r1Vector.draggable = false;
r1Vector.grab = false;

r2Vector = new Arrow(origin,orbiters[1].position);
r2Vector.color = color(320,100,80,.5);
r2Vector.width = 7;
r2Vector.showComponents = false;
r2Vector.draggable = false;
r2Vector.grab = false;

rVector = new Arrow(origin,orbiters[0].position);
rVector.color = color(217,100,100,.7);
rVector.width = 6;
rVector.showComponents = false;
rVector.draggable = false;
rVector.grab = false;

onoff = createButton("Pause");
onoff.parent('sketch-holder');
onoff.position(20,20);
onoff.class("sim-button");
onoff.mousePressed(turnonoff);

reset = createButton("Reset");
reset.parent('sketch-holder');
reset.position(20,onoff.y+50);
reset.class("sim-button");
reset.mousePressed(resetSketch);

diff  = createCheckbox('Center of Mass Frame?', false);
diff.parent('sketch-holder');
diff.style('color','black')
diff.position (20,reset.y+60)

showVectors  = createCheckbox('Show Vectors?', true);
showVectors.parent('sketch-holder');
showVectors.style('color','black')
showVectors.position (20,diff.y+40)
 }

function MakeMasses() {
  SolarSystem = new GravSystem(orbiters);

 mass1 = orbiters.push(new Orbiter(createVector(100,-200),createVector(v1,v1),createVector(0,0),100, 353));
 mass2 = orbiters.push(new Orbiter(createVector(200,-20),createVector(-v1,0),createVector(0,0),100*massRatio, 320));
}

function draw(){
background(255);

  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
  }
  COM();
    if (diff.checked()){
  origin = createVector(width/2-com.x,height/2-com.y)
}
else {
  origin = createVector(width/2,height/2)
}
translate(origin.x,origin.y)
  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }



  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the TrailDot
      Trails.splice(i, 1);
    }
  }

  for (var i = COMTrails.length-1; i >= 0; i--) {
    var p = COMTrails[i];
    p.run();
    if (p.isDead()) {
      //remove the TrailDot
      COMTrails.splice(i, 1);
    }
  }
push()
//translate(origin.x,origin.y)
line(-width/2,0,width/2,0)
line(0,-height/2,0,height/2)
pop()

push();
noFill(0)
stroke(211,37,71)
strokeWeight(1)
line(com.x-1000,com.y,com.x+1000,com.y)
line(com.x,com.y-1000,com.x,com.y+1000)
pop();

r1Vector.origin = createVector(0,0);
r1Vector.target = orbiters[0].position;
r1Vector.update();


r2Vector.origin = createVector(0,0);
r2Vector.target = orbiters[1].position;
r2Vector.update();


rVector.origin = orbiters[0].position;
rVector.target = orbiters[1].position;
rVector.update();


if (showVectors.checked()){
r1Vector.display();
r2Vector.display();
rVector.display();
}
distance = com.dist(createVector(0,0))
if (distance > width/2){
resetSketch()
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

  if(frameCount % 20 == 0){
    COMTrails.push(new TrailDot(createVector(com.x, com.y),1000,211));
  }


}


function resetSketch(){
  //clear(0)
  Trails = [];
  orbiters = [];
  COMTrails = []
  MakeMasses()
}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
  if (!running) {
    running = true;
    loop();
    onoff.html("Pause");
    return
  }

  if (running) {
    running = false;
    noLoop()
    onoff.html("Start");
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
