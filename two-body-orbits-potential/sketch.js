var orbiters=[];
var gravity = 50;
var totalMass;
var Trails = [];
let resolution = 20;
let lowPot, zeroPot;
var SolarSystem;
let com;

function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder')

  massRatio = 5;
  noOfHorizBoxes = width/resolution;
  noOfVertBoxes = height/resolution;

 SolarSystem = new GravSystem(orbiters);
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
 //sat = orbiters.push(new Orbiter(createVector(width/2,-planeta+r+height/2),createVector(satV,0),createVector(0,0),.0001,2, 50));

center = createVector(width/2,height/2)
body1Position = mass1.position
body2Position = mass2.position
//gpots = createArray(width, height);
gpots = Array(int(width)).fill().map(() => Array(int(height)).fill(0));
lowPot = color('hsl(200, 100%, 50%)');
zeroPot = color('hsl(200, 100%, 100%)');
xy=createVector(0,0)
 }



function draw(){
background(255);
noStroke()


for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
    SolarSystem.do_physics(1.0 / 4); // increase the divisor to increase accuracy and decrease simulation speed
}
COM();
drawPotential();
  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }



  // for (var i = Trails.length-1; i >= 0; i--) {
  //   var p = Trails[i];
  //   p.run();
  //   if (p.isDead()) {
  //     //remove the TrailDot
  //     Trails.splice(i, 1);
  //   }
  // }


}

function drawPotential(){
  //
  // maxf = voltages.reduce(function(max, arr) {
  //     return max >= arr[0] ? max : arr[0];
  // }, -Infinity);

for (var i=0; i<noOfHorizBoxes;i++){
for (var j=0; j<noOfVertBoxes;j++)
{

  r1 = p5.Vector.dist(createVector(i*resolution,j*resolution), orbiters[0].position)/50;
  r2 = p5.Vector.dist(createVector(i*resolution,j*resolution), orbiters[1].position)/50;
  xy.set(i*resolution,j*resolution)
  rp = createVector(xy.x-com.x,xy.y-com.y)
  //gpots[i][j] = -(r2+r1*5)/(r1*r2*5);
  gpots[i][j] = .2*(-1/r1 - (1*massRatio)/r2)
  // if(gpots[i][j] > 0){
  //   potColor = lerpColor(zeroPot,highPot,pow(map(gpots[i][j],0,1,0,1),.2))
  //fill(color('hsl(0,80%,'+map(voltages[i][j],0,10,100,60)+'%)'))



    potColor = lerpColor(zeroPot,lowPot,pow(map(abs(gpots[i][j]),0,1,0,1),1))




  fill(potColor)
  rect(i*resolution-resolution/2,j*resolution-resolution/2,resolution,resolution)
   fill(0)
  //text(voltages[i][j].toFixed(3),i*resolution,j*resolution-10)
  }


  //fill()



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
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y)
  line(com.x,com.y-5,com.x,com.y+5)
  pop();
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

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
