var coA,coB,coC;
function setup() {
  canvas = createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder')
  background(250);
  frameRate(30);
  //lets make an array to fill
  y = new Array(width);

  coB = max(900,width);
  //coB = width/4;
  textSize(18);
}


function draw() {
  background(250)
  stroke(0)
  //move things to the middle
  translate(0, height / 2)
  //x axis
  line(0, 0, width, 0)
  //y axis
  line(width/2, -height/2, width/2, height/2)

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
    //x = map(x,0,y.length,-y.length,y.length)
    xprime = x-y.length/2;
    y[x] = (coB*pow(xprime,2))*.00001;
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
  slope = (2*coB*pow(mouseX-width/2,1))*.00001;
  starty = mouseX*slope
  endy = -mouseX*slope
  yy = (mouseX-width/2+coB*pow(mouseX-width/2,2))*.00001;

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
  //line(mouseX,-height/2,mouseX,height/2)
  pop()
  rise = 140*sin(atan(slope));
  run = 140*cos(atan(slope));
  push()
  translate(mouseX,-yy+rise/2)
  line(-run/2,0,+run/2,0);
  push()
  noStroke()
  text('run: '+run.toFixed(0),-10,Math.sign(slope)*15)
  pop()
  pop()
  push()
  translate(mouseX+run/2,-yy)
  line(0,rise/2,0,-rise/2);
  push()
  noStroke()
  text('rise: '+rise.toFixed(0),5,0)
  pop()
  pop()
  push()
  noStroke()
  text('slope: '+(rise/run).toFixed(1),width/2,-height/2.3)
  pop()
}

function touchStarted() {
  // prevent default
  return false;
}
