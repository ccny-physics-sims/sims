let img;
let radius = 100;
let G = 6.674E-11;
let Rearth = 6378000;
let Mearth = 5.972E24;
let Mobject = 100;
let pixperm = radius/Rearth;
let testmassPos;
function preload() {
  img = loadImage('earth.png');
}

function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  imageMode(CENTER);
  //lets make an array to fill
  y = new Array(400);

  amplitudeControl = createSlider(0,6378*5,0,0);
  amplitudeControl.position(30,height*.05)
  amplitudeControl.parent('sketch-holder')
  amplitudeControl.class("sim-slider");

  amplitudeControl.input(sliderChange);

  distanceValue = createElement('p', 'Distance');
  distanceValue.position(30,amplitudeControl.y+120)

  forceValue = createElement('p', 'Force');
  forceValue.position(30,distanceValue.y+40)

}


function draw() {
  background(255)
  //stroke(0)
  //move things to the middle
  push()
  translate(width/2, height / 4)
  image(img, 0, 0, radius*2,radius*2);
  noStroke();
  fill('red')
  testmassPos = amplitudeControl.value()*(pixperm*1000)
  circle(testmassPos,0,10)
  pop()
  distanceValue.html('Distance: '+amplitudeControl.value().toFixed(0)+' km')
  h = amplitudeControl.value()
  if (h > Rearth/1000){
  force =(G*Mearth*Mobject)/(pow(h*1000,2))
  }
  else {
  force =(G*Mearth*Mobject)*(h*1000)/(pow(Rearth,3))
  }
  forceValue.html('Force on 100kg mass: '+force.toFixed(0)+ ' N')

  calcFunction();
  //display discrete points
  //renderPoints();
  //display connected line
  translate(width/2, height / 2)
  renderLine();
  noLoop();
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    if (x/pixperm > Rearth ){
    y[x] = 4*(G*Mearth*Mobject)/(pow(Rearth+(x/pixperm),2))
    }
    else
    {
      y[x] = (G*Mearth*Mobject)*(x/pixperm)/(pow(Rearth,3))
    }
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width/3)
    ellipse(xscaled, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push()
  strokeWeight(1)
  stroke('black')
  translate(0,0)
  line(0,0,0,-120)
  line(0,0,width/3,0)
  ymax = (G*Mearth*Mobject)/(pow(Rearth+(0/pixperm),2))

  for (i = 1; i<12; i++){
    ii = map(i,0,10,0,ymax)
    iii = map(ii,0,ymax,0,100)
    line(-2,-iii,2,-iii)

  }
  strokeWeight(3)
  line(-3,-50,3,-50)
  line(-3,-100,3,-100)
  stroke('gray')
  strokeWeight(1)

  line(testmassPos,0,testmassPos,-200)
  pop();

  push();

  noFill();
  stroke('red');
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    //xscaled = map(x,0,y.length,100,width/3)

    yscaled = map(y[x],0,ymax,0,100)
    curveVertex(x, -yscaled);
  }
  endShape();
  pop();
}

function sliderChange() {


  redraw();
}
