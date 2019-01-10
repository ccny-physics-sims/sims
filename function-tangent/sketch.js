var coA,coB,coC;
function setup() {
  canvas = createCanvas(500,.8*windowHeight);
  canvas.parent('sketch-holder')
  background(250);
  frameRate(30);
  //lets make an array to fill
  y = new Array(800);
  coA = pow(width,1.75)
  console.log(coA);
  coB = pow(width,1.02)
  console.log(coB)
  coC = pow(width,.005)
console.log(coC)
}


function draw() {
  background(250)
  stroke(0)
  //move things to the middle
  translate(0, height / 2)
  //x axis
  line(0, 0, width, 0)

  //calculate this points
  calcFunction();
  //display discrete points
  //renderPoints();
  //display connected line
  renderLine();

  renderTangent();

}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {

    y[x] = (coA*x-coB*pow(x,2)+coC*pow(x,3))*.00001;
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()

  for (var x = 0; x < y.length; x += 10) {
    fill(0);
    ellipse(x, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(color('hsl(0,100%,80%)'));

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    curveVertex(x, -y[x]);
  }
  endShape();
  pop();
}

function renderTangent() {
  startx = mouseX-50;
  endx = mouseX+50;
  slope = (coA-2*coB*pow(mouseX,1)+3*coC*pow(mouseX,2))*.00001;
  starty = mouseX*slope
  endy = -mouseX*slope
  yy = (mouseX+coA*mouseX-coB*pow(mouseX,2)+coC*pow(mouseX,3))*.00001;

  push()
  stroke('red')
  strokeWeight(3)
  translate(mouseX,-yy)
  toRot = atan2(mouseX*slope,mouseX)
  rotate(-toRot)
  line(-70,0,+70,0)
  pop()
  push()
  stroke('gray')
  line(mouseX,-height/2,mouseX,height/2)
  pop()
}
