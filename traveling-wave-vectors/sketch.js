var xspacing = 1;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var omega = 1;
var velVector;
var xpositions = [];
var aVector = [];
var t = 0;
var dt=1;

let wavelength, k;

let waveColor = "rgba(52, 155, 235,.5)";
function setup() {

  //frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = width+12;
  wavelength = min(400,width/3)
  k = 2*Math.PI/wavelength;
  
  noOfVectors = floor(10*width/wavelength)
  dx = (TWO_PI / wavelength) * xspacing;
  //yvalues = new Array(floor(w/xspacing));
    y = new Array(windowWidth);
    for (i=0;i<noOfVectors;i++){
    xpositions[i]=i*width/noOfVectors;
    }
    for (i=0;i<xpositions.length;i++){
      addAVector()
    }

    omegaSlider = createSlider(-5,5,0,.1)
    omegaSlider.parent('sketch-holder');
    omegaSlider.class("sim-slider gray");
    omegaSlider.position(20,20);

    omegaSliderLabel = createP();
    omegaSliderLabel.parent('sketch-holder');
    omegaSliderLabel.html('Change Wave Velocity');
    omegaSliderLabel.position(20,omegaSlider.y+10);


    waveSpeedVector = new Arrow(createVector(0,0),createVector(0,0));
    waveSpeedVector.color = waveColor;
    waveSpeedVector.width = 100;
    waveSpeedVector.showComponents = false;
    waveSpeedVector.draggable = false;
    waveSpeedVector.grab = false;
    waveSpeedVector.origin = createVector(width/2,height/3);

}

function draw() {
  background(255);

  // t = millis()/1000;
  t = t+dt*.01
  calcWave();
  push()
  translate(0,height/2);
  renderPoints();
  pop()
  
  dt = omegaSlider.value();
  for(i=0;i<xpositions.length;i++){
  updateVectors(i);
  }

  waveSpeedVector.target = p5.Vector.add(waveSpeedVector.origin,createVector((width/4)*omegaSlider.value()/5,0));
  waveSpeedVector.update()
  if(omegaSlider.value()!= 0){
  waveSpeedVector.display()
  }
  fill(0)
  textSize(24);
  text("Wave Velocity",width/2-70,height/3-60)
}

function addAVector(){
  aVector[i] = new Arrow(createVector(0,0),createVector(0,0));
  aVector[i].color = "rgb(60, 176, 85)";
  aVector[i].width = 10;
  aVector[i].showComponents = false;
  aVector[i].draggable = false;
  aVector[i].grab = false;
}

function updateVectors(i){
  
  xVec =  xpositions[i];
  yVec = -amplitude * sin(k*xVec - omega*t);
  aVector[i].origin = createVector(xVec,yVec);
  aVector[i].target = p5.Vector.add(aVector[i].origin,createVector(0,Math.sign(dt)*amplitude*Math.cos(k*xVec-omega*t)));
  push();
  translate(0,height/2);
  if(omegaSlider.value()!= 0){
  aVector[i].update();
  aVector[i].display();
  }
  pop();
}

function calcWave() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * sin(k*x - t);
  }

}




function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  //stroke(color("hsb(0,100,100)"))

      noStroke();
      // fill("rgba(0,0,0,.3)")
      // for (var x = 0; x < y.length; x += 4) {
      //   ellipse(x+3, -y[x]-3, 5);
      // }

      fill("rgb(52, 155, 235)")
      for (var x = 0; x < y.length; x += 5) {
      ellipse(x, -y[x], 6);
      
    
    }

}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(0);

  beginShape();
  for (var x = 0; x < y.length; x += 3) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}
