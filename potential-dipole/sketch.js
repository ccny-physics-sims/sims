var fieldLineSpacing;
var strength=20;
var dipoles = [];
var Y_AXIS = 1;
var X_AXIS = 2;
var b1, b2, c1, c2;
var plateWidth = 50;
var yoffset = 100;
var xoffset = 20;
var resolution = 50;
// var voltages;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.parent('sketch-holder');
  noOfHorizBoxes = width/resolution;
  noOfVertBoxes = height/resolution;
  colorMode(HSL)
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
  //cursor("target.png",15,15);
  cursor(HAND)
  center = createVector(width/2,height/2)
  posChargePosition = createVector(width/2,height/2-40)
  negChargePosition = createVector(width/2,height/2+40)
  voltages = createArray(width, height);
}

function draw() {
  posChargePosition = createVector(mouseX,mouseY)
  background(255);
  strength = 10;//fieldStrengthSlider.value();

  //highPot = color('hsb(160, 100%, 50%)');
  //highPot = color(250, 50, 50, map(strength,0,20,0,255));
  highPot = color('hsl(0, 80%, '+map(strength,0,20,100,60)+'%)');
  zeroPot = color('hsl(200, 80%, 100%)');
  lowPot = color('hsl(200, 80%, '+map(strength,0,20,100,60)+'%)');
  //translate(width/2,height/2)


noStroke()
drawPotential();

  posCharge(posChargePosition);
  negCharge(negChargePosition);



  currentPos = createVector(mouseX,mouseY)
  positionincap = p5.Vector.dist(currentPos, center);
  potentialMeasurement = strength * 1/(positionincap);
  //console.log(positionincap)
  pot = potentialMeasurement.toFixed(4);
  potentialReading.html(pot+ " V");




}

function drawPotential(){
  //
  // maxf = voltages.reduce(function(max, arr) {
  //     return max >= arr[0] ? max : arr[0];
  // }, -Infinity);

for (var i=0; i<noOfHorizBoxes;i++){
for (var j=0; j<noOfVertBoxes;j++)
{
  rplus = p5.Vector.dist(createVector(i*resolution,j*resolution), posChargePosition)/100;
  rneg = p5.Vector.dist(createVector(i*resolution,j*resolution), negChargePosition)/100;
  voltages[i][j] = (rneg-rplus)/(rplus*rneg);

  if(voltages[i][j] > 0){
    potColor = lerpColor(zeroPot,highPot,pow(map(voltages[i][j],0,1,0,1),.2))
  //fill(color('hsl(0,80%,'+map(voltages[i][j],0,10,100,60)+'%)'))

  }
  else if (voltages[i][j] < 0){
    potColor = lerpColor(zeroPot,lowPot,pow(map(abs(voltages[i][j]),0,1,0,1),.2))

//    fill(color('hsl(200,80%,'+map(voltages[i][j],0,-1,100,60)+'%)'))
  }

  fill(potColor)
  rect(i*resolution,j*resolution,resolution,resolution)
   fill(0)
  text(voltages[i][j].toFixed(3),i*resolution,j*resolution-10)
  }


  //fill()



}





}

function isEpsilon(number){
  return Math.abs(number) < 1e-10;
}

  function touchEnded() {

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

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
