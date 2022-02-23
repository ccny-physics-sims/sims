var orbiters=[];
var neworbiters = [];
var gravity = 10;
var totalMass;
var Trails = [];
var paths = [];
var whitish = 200;
let masses = [];
var colors = ['#F07B4F','#717FEB','#B3EB8F'];
var c=0;
var SolarSystem;
let dt = 0;


function preload() {
  bgstars = loadImage("assets/stars.jpg");
}
function setup(){
  frameRate(30);
  canvas = createCanvas(windowHeight, .9*windowHeight);
  canvas.parent('sketch-holder');
   imageMode(CENTER);

v1 = 9;
massRatio = 1000;
cursor(CROSS);
 SolarSystem = new GravSystem(orbiters);
colorMode(HSL, 360,100,100)
xpos = [0,0];
planeta = 150;
ypos = [-planeta,0];
massRatio = 100;
masses = [1,1*massRatio];

var xveltotal = sqrt(gravity*(masses[0]+masses[1])/planeta)

var yveltotal = 0
xvels = [xveltotal,-(masses[0]/masses[1])*xveltotal];
yvels = [-yveltotal,(masses[0]/masses[1])*yveltotal];
radii = [10,20]

omegaslider = createSlider(0,.08,0,.001);
omegaslider.style('width', '200px');

omegaslider.position(50,50);
omegaslider.class('sim-slider');
omegaslider.parent('sketch-holder');

omegasliderLabel = createP("Rotating Frame angular velocity: ");
omegasliderLabel.parent('sketch-holder');
omegasliderLabel.position(omegaslider.x,omegaslider.y+20);
omegasliderLabel.style("font-family","Times, serif")
omegasliderLabel.style("font-size","1.2em")
spawn2Bodies();

FVector1 = new NiceArrow(createVector(xpos[0],ypos[0]),createVector(1,1),"lightblue");

FVector1.width = 4;
FVector1.showComponents = false;

FVector2 = new NiceArrow(createVector(xpos[0],ypos[0]),createVector(1,1),"pink");

FVector2.width = 4;
FVector2.showComponents = false;

//
 }


function spawn2Bodies() {
  for (i = 0;i<2;i++)
 {

   orbiters.push(new Orbiter(createVector(xpos[i],ypos[i]),createVector(xvels[i],yvels[i]),createVector(0,0),masses[i], radii[i],colors[i]));
   paths.push(new Path(colors[i]));
}

}

function draw(){

background(0);
translate(width/2,height/2)
rotate(-omegaslider.value()*dt)
image(bgstars, 0, 0,width,width);

// for (l=0;l<orbiters.length;l++){
//   paths[l].update(l);
//   paths[l].display();
// }
for (i=0;i<orbiters.length;i++){
  orbiters[i].display();
}
let distance = orbiters[0].position.dist(orbiters[1].position);


  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
  }




FVector1.origin = orbiters[0].position;
FVector1.target = p5.Vector.add(p5.Vector.mult(orbiters[0].acceleration,orbiters[0].mass*1000),orbiters[0].position);
FVector1.display();

FVector2.origin = orbiters[0].position;
FVector2.target = p5.Vector.add(p5.Vector.mult(orbiters[0].acceleration.rotate(PI),omegaslider.value()*10000),orbiters[0].position);
if (omegaslider.value()>0){
FVector2.display();
}

  COM();
  dt = .1+dt;
}

  function NiceArrow(origin_, target_, colorA){

    this.origin = origin_.copy();
    this.target = target_.copy();
    this.tocolor = colorA;
    //control handles

    //this.color = "white";
    this.width = 20;


    //mouse old coordinates for transalation
    this.oldX = 0;
    this.oldY = 0;

  }


  NiceArrow.prototype.display = function(){

    push();
    fill(this.tocolor);
    noStroke();
    var d = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
    var w = this.width;
    translate(this.origin.x,this.origin.y);
    var angle = angCalc(this);
    rotate(angle);
    //draw OldArrow
    drawNiceArrow(w,d,this,this.tocolor);
    pop();//reset drawing state



  };





  function drawNiceArrow(thickness,length,OldArrow,colour){
    //draw the OldArrow itself
    translate(0,-thickness/2);
    fill(colour);
    rect(0, thickness/4, length-15, thickness/2);
    //line(length-8,-20,length,0);
    fill(colour);
    stroke(colour);
    strokeWeight(2)
    strokeJoin(ROUND);
    triangle(length-15, -2, length-15, 6, length+(thickness/2), 2);



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
