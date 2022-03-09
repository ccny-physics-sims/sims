let tick1
let tick2
let kBoltzman = 8.617E-5;

function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(200);
  ampMax = min(200,height/4)





  temperatureControl = createSlider(10000,1000000,10000,1);
  temperatureControl.position(30,70)
  temperatureControl.parent('sketch-holder')
  temperatureControl.class("sim-slider");
  temperatureControl.input(sliderChange);

  temperatureControlLabel = createP();
  temperatureControlLabel.position(30,temperatureControl.y+20);
  temperatureControlLabel.parent('sketch-holder')
  katex.render('\T',temperatureControlLabel.elt)




  let posEq = createP()
  posEq.style('font-size', '20px')
  posEq.position(width/2,temperatureControl.y+40 )
  katex.render('e^{\\left(-E/kT\\right)} ',posEq.elt)

  // tick1 = createP()
  // tick1.style('font-size', '20px')
  // katex.render('2 \\pi  ',tick1.elt)
  //
  //
  //   tick2 = createP()
  //   tick2.style('font-size', '20px')
  //   katex.render('4 \\pi  ',tick2.elt)

    // horizAxisLabel = createP()
    // horizAxisLabel.style('font-size', '20px')
    // horizAxisLabel.position(.8*width,height/2+80)
    // katex.render('\\omega t ',horizAxisLabel.elt)
}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, height / 2)
  //x axis
  line(0, 0, width*.9, 0)
  line(0,-ampMax*1.1,0,ampMax*1.1)
  widthScale = y.length/(width*.9);
  energy = ampMax;
  temperature = temperatureControl.value();
  //calculate this points
  calcFunction();
  //display discrete points
  renderPoints();
  //display connected line
  renderLine();

  //showMaxAmplitude();
  //showPeriod();
  //showXTicks();
  noLoop()
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = 100*exp((-x*1) / (kBoltzman*temperature))
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width*.9)
    ellipse(xscaled, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('red');

  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width*.9)
    curveVertex(xscaled, -y[x]);
  }
  endShape();
  pop();
}
function showMaxAmplitude(){
  stroke(0)
  line(0,-energy,10,-energy)
  line(0,energy,10,energy)
  noStroke()
  text('C',-40,-abs(energy)+5)
  text('-C ',-40,abs(energy)+5)
}

function showPeriod(){
  stroke(0)
  translate(0,-80)
  line(PI/(2*.01*temperature*widthScale),0,PI/(2*.01*temperature*widthScale),-30)
  line(5*PI/(2*.01*temperature*widthScale),0,5*PI/(2*.01*temperature*widthScale),-30)
  line(PI/(2*.01*temperature*widthScale),-15,5*PI/(2*.01*temperature*widthScale),-15)
  noStroke()
  text('T (period)',(PI/(2*temperature*widthScale)+5*PI/(2*.01*temperature*widthScale))/2,-30)
}

function showXTicks(){
  stroke(0)
  translate(0,-80)
  line(TWO_PI/(.01*temperature*widthScale),70,TWO_PI/(.01*temperature*widthScale),80)
  line(2*TWO_PI/(.01*temperature*widthScale),70,2*TWO_PI/(.01*temperature*widthScale),80)
  noStroke()
  //text('2',(PI/(2*.01*omega*widthScale)+5*PI/(2*.01*omega*widthScale))/2,-30)
  tick1.position(TWO_PI/(.01*temperature*widthScale)+65,height/2+80)
  tick2.position(2*TWO_PI/(.01*temperature*widthScale)+65,height/2+80)
}

function sliderChange() {
  redraw()
}
