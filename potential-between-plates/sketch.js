var fieldLineSpacing;
var strength=20;
var dipoles = [];
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var plateWidth = 50;
var yoffset = 100;
var xoffset = 20;
function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.parent('sketch-holder');
  frameRate(10);
  rectMode(CENTER);
  plateDimensions = createVector(width*.75,height*.75)

  potentialReading = createP();
  potentialReading.position(width*.8,100);
  potentialReading.parent('sketch-holder');
  potentialReading.style("color", "#000");
  potentialReading.style("font-family", "Helvetica");
  potentialReading.style("padding: 20px")
  potentialReading.style("background: #aeaeae")
  potentialReading.style("font-size: 22pt")
  potentialReading.style("width: 130px")
  potentialReading.style("text-align:right")
  potentialReading.style("font-family: Monospace")
  potentialReading.html( "V: ")

  strokeCap(SQUARE);
  cursor("target.png",15,15);

}

function draw() {

  background(255);
  strength = 7;//fieldStrengthSlider.value();
  fieldLineSpacing = plateDimensions.y/strength;

  //highPot = color('hsb(160, 100%, 50%)');
  //highPot = color(250, 50, 50, map(strength,0,20,0,255));
  highPot = color('hsl(0, 80%, '+map(strength,0,20,100,60)+'%)');
  zeroPot = color(255, 255, 255);

  translate(xoffset,yoffset)

  setGradient(plateWidth , 0, plateDimensions.x-2*plateWidth, plateDimensions.y+0, zeroPot, highPot, X_AXIS);

  drawFieldLines()
  drawPlates()

  drawCharges()
  drawRulerLines();
  positionincap = (mouseX-plateWidth-xoffset)/(plateDimensions.x-2*plateWidth)
  potentialMeasurement = strength * positionincap;
  if (mouseX < plateDimensions.x+xoffset){
  if (positionincap < 0){
    pot = "0.00"
  }

  else if (positionincap < 1){
    pot = potentialMeasurement.toFixed(2)
//potentialReading.html("V: "+potentialMeasurement.toFixed(2)+" Volts");
  }

  else if (positionincap > 1){
    pot = strength.toFixed(2)
  }
  potentialReading.html(pot+" V" );
}
  else if (mouseX > plateDimensions.x){
    potentialReading.html("--.-- V");
  }

  textAlign(CENTER)
  text('0 mm', plateWidth, -5);
  text('50 mm', plateWidth+.5*(plateDimensions.x-2*plateWidth), -5);
  text('100 mm', plateWidth+1*(plateDimensions.x-2*plateWidth), -5);

}

  function touchEnded() {

  }

  function drawPlates(){
    push();
    fill(150)
    noStroke()
    rect(plateWidth/2,plateDimensions.y/2,plateWidth,plateDimensions.y)
    rect(plateDimensions.x-plateWidth/2,plateDimensions.y/2,plateWidth,plateDimensions.y)
    pop()
  }
function drawCharges(){
  push();
  translate(0,plateDimensions.y/(strength+1))

  for (i=0;i<strength;i++) {
    negCharge(createVector(plateWidth/2,i*fieldLineSpacing));
    posCharge(createVector(plateDimensions.x-plateWidth/2,i*fieldLineSpacing));
  }
  pop();
}
function drawFieldLines(){
  //draw field lines
  push();
  stroke('red')
  strokeWeight(2)
  translate(0,plateDimensions.y/(strength+1))
  for (i=0;i<strength;i++) {
    line(0,i*fieldLineSpacing,plateDimensions.x,i*fieldLineSpacing);
  }
  pop();
  //draw arrow to indicate direction
  push();
  translate(0,plateDimensions.y/(strength+1))

  fill('red');
  noStroke();
  for (i=0;i<strength;i++) {
  triangle(.25*plateDimensions.x,i*fieldLineSpacing,10+.25*plateDimensions.x,i*fieldLineSpacing+5,10+.25*plateDimensions.x,i*fieldLineSpacing-5)
  triangle(.5*plateDimensions.x,i*fieldLineSpacing,10+.5*plateDimensions.x,i*fieldLineSpacing+5,10+.5*plateDimensions.x,i*fieldLineSpacing-5)
  triangle(.75*plateDimensions.x,i*fieldLineSpacing,10+.75*plateDimensions.x,i*fieldLineSpacing+5,10+.75*plateDimensions.x,i*fieldLineSpacing-5)

  }
  pop();
}

posCharge = function(position){
  this.position = position;
  push();
  noStroke();
  translate(this.position.x,this.position.y)
  fill('red')
  ellipse(0,0,20)
  fill('white')
  rect(0,0,3,10)
  rect(0,0,10,3)
  pop();
}
negCharge = function(position){
  this.position = position;
  push();
  noStroke();
  translate(this.position.x,this.position.y)
  fill('black')
  ellipse(0,0,20)
  fill('white')
  rect(0,0,10,3)
  pop();
}


function setGradient(x, y, w, h, c1, c2, axis) {
  push();
  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }

  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i+=10) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      strokeWeight(10)
      stroke(c);
      line(i, y, i, y+h);
    }
  }
  pop();
}

function drawRulerLines(){
  push();
  stroke(150);
  strokeWeight(1);
  translate(plateWidth,0)
  for (i =0;i<10;i++){
  line(i*(plateDimensions.x-2*plateWidth)/10, 0,i*(plateDimensions.x-2*plateWidth)/10,plateDimensions.y)
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
