var orbiters=[];
var orbitersT=[];
var gravity = .001;
var totalMass;
var Trails = [];
let distance;
let littler;
let angularMomentum;
let angularMomentumScalar;
let plotScale = 1e-2
let xfac = 1
let uffy = []
let energy
let tooclose = false;
var SolarSystem;
function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder')
  speedSliderLabel = createP("Speed");
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(30,0);
  speedSlider = createSlider(0, 50,20 ,.1);
  speedSlider.parent('sketch-holder');
  speedSlider.position(30,20);
  speedSlider.class("sim-slider");
  speedSlider.size(150,50)
  speedSlider.input(launchOrbiter);

  angleSlider = createSlider(0, 360, 180 ,1);
  angleSlider.parent('sketch-holder');
  angleSlider.position(30,90);
  angleSlider.class("sim-slider");
  angleSlider.size(150,50)
  angleSlider.input(launchOrbiter);
  angleSliderLabel = createP("Direction");
  angleSliderLabel.parent('sketch-holder');
  angleSliderLabel.position(30,60);
  distanceSliderLabel = createP("Distance");
  distanceSliderLabel.parent('sketch-holder');
  distanceSliderLabel.position(30,140);
  distanceSlider = createSlider(50, height/2,height/4 ,0);
  distanceSlider.parent('sketch-holder');
  distanceSlider.position(30,160);
  distanceSlider.class("sim-slider");
  distanceSlider.size(150,50)
  distanceSlider.input(launchOrbiter);

  energyLabel = createP("<i>E</i>");
  energyLabel.parent('sketch-holder');
  energyLabel.style('font-family','Times, Serif')
  energyLabel.style('font-size','2em')

  ueffLabel = createP("<i>U<sub>eff</sub></i>");
  ueffLabel.parent('sketch-holder');
  ueffLabel.style('font-family','Times, Serif')
  ueffLabel.style('font-size','2em')
  ueffLabel.style('color','red')
  //energyLabel.position(30,140);

  h = distanceSlider.value()

  orbitCenter = createVector(width/2,height/2)

  aVector = new Arrow(createVector(orbitCenter.x,orbitCenter.y-h),createVector(0,0));
  aVector.color = color('gray');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;
  aVector.width=10;

  v1 = speedSlider.value();
  massRatio = 1000000;
  uffy = Array(800);



 SolarSystem = new GravSystem(orbiters);
 SolarSystem2 = new GravSystem(orbitersT);

mass1 = orbiters.push(new Orbiter(createVector(orbitCenter.x, orbitCenter.y),createVector(0,0),createVector(0,0),100*massRatio, random(50,200)));
mass2 =  orbiters.push(new Orbiter(createVector(orbitCenter.x+h, orbitCenter.y),createVector(0,v1),createVector(0,0),100, random(50,200)));

mass1T = orbitersT.push(new Orbiter(createVector(orbitCenter.x, orbitCenter.y),createVector(0,0),createVector(0,0),100*massRatio, random(50,200)));
mass2T =  orbitersT.push(new Orbiter(createVector(orbitCenter.x+h, orbitCenter.y),createVector(0,v1),createVector(0,0),100, random(50,200)));

reducedMass = (orbiters[0].mass*orbiters[1].mass)/(orbiters[0].mass+orbiters[1].mass)
orbiters[0].radius = 10;
orbiters[0].color = "#F2E566"
orbiters[1].color = "#5995D5"
distance = orbiters[0].position.dist(orbiters[1].position);
littler = p5.Vector.sub(orbiters[0].position, orbiters[1].position);
linearMomentum  = p5.Vector.mult(orbiters[1].velocity, orbiters[1].mass);
angularMomentum = p5.Vector.cross(littler,linearMomentum );
angularMomentumScalar = angularMomentum.magSq()
launchOrbiter()
//calcEffPot()
 }



function draw(){
background(255);

for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
    SolarSystem.do_physics(1.0 / 32); // increase the divisor to increase accuracy and decrease simulation speed
}
  h = distanceSlider.value()
distance = orbiters[0].position.dist(orbiters[1].position);

littler = p5.Vector.sub(orbiters[1].position, orbiters[0].position);
linearMomentum  = p5.Vector.mult(orbiters[1].velocity, orbiters[1].mass);
angularMomentum = p5.Vector.cross(littler,linearMomentum );
//angularMomentum = p5.Vector.cross(littler,p5.Vector.mult(orbiters[1].velocity, reducedMass))
angularMomentumScalar = angularMomentum.magSq()

aVector.origin.x = orbitCenter.x+h;
aVector.origin.y = orbitCenter.y;
aVector.target.x = orbitCenter.x+h+6*speedSlider.value()*sin(angleSlider.value()*Math.PI/180)
aVector.target.y = orbitCenter.y+6*speedSlider.value()*cos(angleSlider.value()*Math.PI/180)
aVector.update();
aVector.display();
xfac = 1
energy = 0.5*reducedMass*orbiters[1].velocity.magSq()+(((reducedMass*orbiters[1].velocity.mag())**2/(2*reducedMass*pow(xfac*distance,2)) - gravity*(orbiters[0].mass*orbiters[1].mass)/(xfac*distance)))

//energy = gravity*.5*reducedMass*orbiters[1].velocity.magSq()+((angularMomentum.magSq()/(2*reducedMass*pow(xfac*distance,2)) - gravity*(orbiters[0].mass*orbiters[1].mass)/(xfac*distance)))
//console.log(energy);
ueffLabel.position(width/2+120,50)

plotEffPot()

  orbitersT[1].displaytraj();


    orbiters[0].display();
    if (!tooclose){orbiters[1].display();}

  //uffy[x] = ((angularMomentumScalar/(2*orbiters[1].mass*pow(xfac*x,2)) - .01*(orbiters[0].mass*orbiters[1].mass)/(xfac*x)))

  //COM();
  if (!tooclose){
ellipse(width/2+distance,height/2-energy*plotScale,10)
}
if(tooclose){
  text('too close',width/2,height/2-20)
}

  //
  // text(distance.toFixed(2), width/2,height/2)
  // text(angularMomentumScalar.toFixed(2), width/2,height/2+50)
  // text(energy.toFixed(2), width/2,height/2+100)

  //text(littler.mag().toFixed(2), width/2,height/2+50)
  //console.log(distance)

}


function calcEffPot(){
  //console.log('calcEffPot');

  for (var x = 1; x < uffy.length; x += 1) {
    xfac = 1
    uffy[x] = ((angularMomentumScalar/(2*reducedMass*pow(xfac*x,2)) - gravity*(orbiters[0].mass*orbiters[1].mass)/(xfac*x)))
    //energy[x] = 0.5*orbiters[1].mass*orbiters[1].velocity.magSq()+uffy[2]
  }
}



function plotEffPot() {
  //console.log('plotEffPot');

  push();

  noFill();
  translate(width/2,height/2)
    if (!tooclose){
  stroke('red');
  strokeWeight(2)
  beginShape();
  for (var x = 0; x < uffy.length; x += 3) {
    xscaled = x//map(x,0,uffy.length,0,width/2)
    //yscaled = map(uffy[x],)
    //ellipse(xscaled,-uffy[x]*plotScale,2)
    curveVertex(xscaled, -uffy[x]*plotScale);
    //ellipse(xscaled,-energy[x]*1e-6,2)
  }
  endShape();
  stroke('blue')
  energyLabel.position(width/2-30,-energy*plotScale+height/2-50);
  push()
  drawingContext.setLineDash([5, 5]);
  line(0,-energy*plotScale,width/2,-energy*plotScale)
  pop()
  }
  // beginShape();
  // for (var x = 0; x < uffy.length; x += 5) {
  //   xscaled = map(x,0,uffy.length,0,width/2)
  //
  //   curveVertex(xscaled, -energy*plotScale);
  //   //ellipse(xscaled,-energy*plotScale,2)
  // }
  // endShape();
  stroke(100)
  strokeWeight(1)
  line(0,-height/2,0,height/2)
  line(0,0,width,0)
  pop();

}




function tracePath(){
  //trajectory = [];
  orbitersT[0].trajectory = []
  orbitersT[1].trajectory = []
  for (i=1;i<250;i++){
    for (var k = 0; k < 8; k++) { // increase the greater than value to increase simulation step rate
        SolarSystem2.do_traj(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
    }
    checkdistance = orbitersT[0].position.dist(orbitersT[1].position);
    tooclose = false;
    if (checkdistance < 30) {
      tooclose = true;

      break;
    }

    //console.log(checkdistance);
    //orbiters[1].buildTrajectory();

  }

  //plotEffPot()
  //orbitersT[1].displaytraj();
  //a.drawOrbiter();

}

function launchOrbiter(){
  //trajectory = [];
  //Orbiters = [];
  orbiters.pop();
  orbitersT.pop();
     // for ( i = Orbiters.length-1; i >= 0; i--){
     //   Orbiters.splice(i,1);
     // }
     // for ( i = Trails.length-1; i >= 0; i--){
     //   Trails.splice(i,1);
     // }
     //mass2 =  orbiters.push(new Orbiter(createVector(width/2,-200+height/2),createVector(v1,0),createVector(0,0),100, random(50,200)));

     orbiters.push(new Orbiter(createVector(orbitCenter.x+h, orbitCenter.y),createVector(speedSlider.value()*sin(angleSlider.value()*Math.PI/180),speedSlider.value()*cos(angleSlider.value()*Math.PI/180)), createVector(0,0), 100, '#5995D5' ));
     orbitersT.push(new Orbiter(createVector(orbitCenter.x+h, orbitCenter.y),createVector(speedSlider.value()*sin(angleSlider.value()*Math.PI/180),speedSlider.value()*cos(angleSlider.value()*Math.PI/180)), createVector(0,0), 100, '#5995D5' ));

  //orbiters.push(new Orbiter(orbitCenter.x, orbitCenter.y - h, speedSlider.value()*cos(angleSlider.value()*Math.PI/180), speedSlider.value()*sin(angleSlider.value()*Math.PI/180)));
  //a = orbiters[1];
  tracePath()
  calcEffPot()
  angleSliderLabel.html("Direction: "+str(angleSlider.value()-180))
}

function windowResized() {
    // Resize necessary elements to fit new window size
    // resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
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
