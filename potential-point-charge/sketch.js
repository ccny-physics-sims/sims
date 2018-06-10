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
  rectMode(CENTER);
  plateDimensions = createVector(width*.75,height*.75)
frameRate(10)
  potentialReading = createP();
  potentialReading.position(width*.75,100);
  potentialReading.parent('sketch-holder');
  potentialReading.style("color", "#000");
  potentialReading.style("font-family", "Helvetica");
  potentialReading.style("padding: 20px")
  potentialReading.style("background: #aeaeae")
  potentialReading.style("font-size: 22pt")
  potentialReading.style("width: 170px")
  potentialReading.style("text-align:right")
  potentialReading.style("font-family: Monospace")
  potentialReading.html( "V: ")

  strokeCap(SQUARE);
  cursor("target.png",15,15);
  center = createVector(width/2,height/2)
}

function draw() {

  background(255);
  strength = 10;//fieldStrengthSlider.value();

  //highPot = color('hsb(160, 100%, 50%)');
  //highPot = color(250, 50, 50, map(strength,0,20,0,255));
  highPot = color('hsl(0, 80%, '+map(strength,0,20,100,60)+'%)');
  zeroPot = color(255, 255, 255);

  translate(width/2,height/2)


  drawGradient(0,0,highPot,zeroPot)
  drawFieldLines()

  posCharge(createVector(0,0));

  drawRulerLines();

  currentPos = createVector(mouseX,mouseY)
  positionincap = p5.Vector.dist(currentPos, center);
  potentialMeasurement = strength * 1/(positionincap);
  //console.log(positionincap)
  pot = potentialMeasurement.toFixed(4);
  potentialReading.html(pot+ " V");

noStroke()
fill(0)
  textAlign(CENTER)

  text('20 mm', 100,0 );
  text('40 mm', 200,0 );
  text('60 mm', 300,0 );

}

  function touchEnded() {

  }



function drawFieldLines(){
  //draw field lines
  push();
  stroke('red')
  strokeWeight(2)
  //translate(width/2,height/2)
  for (i=0;i<strength;i++) {
    rotate(2*PI/strength)
    line(0,0,0,height/2);
  }
  pop();
  //draw arrow to indicate direction

  push();

  fill('red');
  noStroke();
  for (i=0;i<strength;i++) {
  rotate(2*PI/strength)
  push()
  translate(0,150)
  triangle(0,0,5,-10,-5,-10)
  translate(0,200)
  triangle(0,0,5,-10,-5,-10)
  pop()
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

function drawGradient(x, y,c1,c2) {
  var radius = height;
  //noFill();
  strokeWeight(15);
  for (var i = radius; i > 0; i-=30) {
     var inter = map(i, 0, radius, 0, 1);
     var c = lerpColor(c1, c2, inter);
     noFill()
    stroke(c);
  //console.log(i)
    ellipse(x,y,i,i)
  }
}

function drawRulerLines(){
  push();
  stroke(150);
  strokeWeight(1);
  translate(0,0)
  for (var i =0;i<9;i++){
  ellipse(0,0,i*100)
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
