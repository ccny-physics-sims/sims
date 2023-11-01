var orbiters=[];
var neworbiters = [];
var gravity = 10;
var totalMass;
var Trails = [];
var paths = [];
var whitish = 200;
let masses = [];
var xveltotal = 4
var yveltotal = -0
let xvels = [];
let yvels = [];
let xpos = [];
let ypos = [];
// var xvels = [1,3,-2];
// var yvels = [-1,-3,1];
var colors = ['#2E6B9E','#EB241C','#EBE100'];
var c=0;
var SolarSystem;

let carrier; // this is the oscillator we will hear
let modulator;
let carrierBaseFreq = 200;
let modMaxFreq = 112;
let modMinFreq =20;
let modMaxDepth = 50;
let modMinDepth = 150;

function setup(){
  //frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');
  masses = [100,100,100];
  xvels = [-100/100,200/100,-100/100]
  yvels = [-173.205/100,0,173.205/100]
  origin = createVector(width/2,height/2)
  xpos = [origin.x+100,+origin.x-100,+origin.x]
  ypos = [origin.y,origin.y,origin.y-173.205]
v1 = 9;
massRatio = 1000;
cursor(CROSS);
 SolarSystem = new GravSystem(orbiters);
colorMode(HSL, 360,100,100)

spawnBodies();



 }


function spawnBodies() {
  for (i = 0;i<3;i++)
 {

   orbiters.push(new Orbiter(createVector(xpos[i],ypos[i]),createVector(xvels[i],yvels[i]),createVector(0,0),masses[i], colors[i]));
   paths.push(new Path(colors[i]));
}

}

function draw(){
background(240);
//translate(width/2,height/2)
for (l=0;l<orbiters.length;l++){
  paths[l].update(l);
  paths[l].display();
}
for (i=0;i<orbiters.length;i++){
  orbiters[i].display();
}
// let distance = orbiters[0].position.dist(orbiters[1].position);
// let modFreq = map(distance, 200, 0, modMinFreq, modMaxFreq);
// modulator.freq(modFreq);
//
// // change the amplitude of the modulator
// // negative amp reverses the sawtooth waveform, and sounds percussive
// //
// let modDepth = map(distance, 0, 200, modMinDepth, modMaxDepth);
// modulator.amp(modDepth);


  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
  }

  COM()
push()
stroke(9)
line(orbiters[0].position.x,orbiters[0].position.y,orbiters[1].position.x,orbiters[1].position.y)
line(orbiters[1].position.x,orbiters[1].position.y,orbiters[2].position.x,orbiters[2].position.y)
line(orbiters[2].position.x,orbiters[2].position.y,orbiters[0].position.x,orbiters[0].position.y)

pop()
}


  function angCalc(OldArrow){
    //angleMode(DEGREES);
    return atan2(OldArrow.target.y-OldArrow.origin.y,OldArrow.target.x-OldArrow.origin.x);
  };




  // for (var i = Trails.length-1; i >= 0; i--) {
  //   var p = Trails[i];
  //   p.run();
  //   if (p.isDead()) {
  //     //remove the TrailDot
  //     Trails.splice(i, 1);
  //   }
  // }



var Path = function(color_){
    this.points = [];
    this.sizes = [];
    this.ticker = 0;
    this.color = color_;
}

Path.prototype.update = function(whichOrb){
  this.ticker++
  if (this.points.length>200){
    this.points.shift()
  }
  if(this.ticker % 5 == 0){
    //console.log(i)
    if(orbiters[whichOrb].position.x>.001){
    this.points.push(new createVector(orbiters[whichOrb].position.x,orbiters[whichOrb].position.y))
    //this.sizes.push(randomGaussian(2,1))
  }
  }
}

Path.prototype.display = function(){

noFill()
//fill(this.color);
stroke(this.color);
strokeWeight(2);
beginShape();
for (i=0;i<this.points.length;i++)
  {
    //circle(this.points[i].x+random(-1,1),this.points[i].y+random(-1,1),3)
    circle(this.points[i].x,this.points[i].y,2)
    //curveVertex(this.points[i].x,this.points[i].y)

  }
endShape();

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
    resizeCanvas(windowHeight, windowHeight); // width and height system variables updated here
  }



function touchEnded(){

    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
      paths.splice(i,1);

    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }

  }
  setup();
    return false;
}
