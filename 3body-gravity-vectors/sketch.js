var orbiters=[];
var neworbiters = [];
var gravity = 8.5;
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
  //frameRate(20);
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder');
  masses = Array.from({length: 3}, () => Math.floor(random(50,250)));
  xvels = [0,0,0]
  yvels = [0,0,0]
  xpos = Array.from({length: 3}, () => Math.floor(random(width*.2,width*.8)));
  ypos = Array.from({length: 3}, () => Math.floor(random(height*.2, height*.8)));
v1 = 9;
massRatio = 1000;
cursor(CROSS);
 SolarSystem = new GravSystem(orbiters);
colorMode(HSL, 360,100,100)

spawnBodies();

FVector1 = new NiceArrow(createVector(xpos[0],ypos[0]),createVector(1,1));
FVector1.color = color('black');
FVector1.width = 4;
FVector1.showComponents = false;

FVector2 = new NiceArrow(createVector(xpos[1],ypos[1]),createVector(1,1));
FVector2.color = color('black');
FVector2.width = 4;
FVector2.showComponents = false;

FVector3 = new NiceArrow(createVector(xpos[2],ypos[2]),createVector(1,1));
FVector3.color = color('black');
FVector3.width = 4;
FVector3.showComponents = false;

// carrier = new p5.Oscillator('sine');
//   carrier.amp(1); // set amplitude
//   carrier.freq(carrierBaseFreq); // set frequency
//   carrier.start(); // start oscillating
//
//   // try changing the type to 'square', 'sine' or 'triangle'
//   modulator = new p5.Oscillator('sawtooth');
//   modulator.start();
//
//   // add the modulator's output to modulate the carrier's frequency
//   modulator.disconnect();
//   carrier.freq(modulator);
//
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




FVector1.origin = orbiters[0].position;
FVector1.target = p5.Vector.add(p5.Vector.mult(orbiters[0].acceleration,orbiters[0].mass),orbiters[0].position);
FVector1.display();

FVector2.origin = orbiters[1].position;
FVector2.target = p5.Vector.add(p5.Vector.mult(orbiters[1].acceleration,orbiters[1].mass),orbiters[1].position);
FVector2.display();


FVector3.origin = orbiters[2].position;
FVector3.target = p5.Vector.add(p5.Vector.mult(orbiters[2].acceleration,orbiters[2].mass),orbiters[2].position);
FVector3.display();
  COM();
}

  function NiceArrow(origin_, target_){

    this.origin = origin_.copy();
    this.target = target_.copy();

    //control handles

    this.color = 20;
    this.width = 20;


    //mouse old coordinates for transalation
    this.oldX = 0;
    this.oldY = 0;

  }


  NiceArrow.prototype.display = function(){

    push();
    fill(this.color);
    noStroke();
    var d = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
    var w = this.width;
    translate(this.origin.x,this.origin.y);
    var angle = angCalc(this);
    rotate(angle);
    //draw OldArrow
    drawNiceArrow(w,d,this);
    pop();//reset drawing state



  };





  function drawNiceArrow(thickness,length,OldArrow){
    //draw the OldArrow itself
    translate(0,-thickness/2);

    rect(0, thickness/4, length-10, thickness/2);
    //line(length-8,-20,length,0);
    fill(0);
    stroke(0);
    strokeWeight(2)
    strokeJoin(ROUND);

    triangle(length-10, -2, length-10, 6, length+(thickness/2), 2);



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
  if (this.points.length>1000){
    this.points.shift()
  }
  if(this.ticker % 2 == 0){
    //console.log(i)
    if(orbiters[whichOrb].position.x>.001){
    this.points.push(new createVector(orbiters[whichOrb].position.x,orbiters[whichOrb].position.y))
    this.sizes.push(randomGaussian(2,1))
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
    //circle(this.points[i].x,this.points[i].y,this.sizes[i])
    curveVertex(this.points[i].x,this.points[i].y)
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
