let tick1
let tick2


function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  sliderWidth = min(300,width/3)
  //lets make an array to fill
  y = new Array(200);
  ampMax = min(200,height/4)
  amplitudeControl = createSlider(0,ampMax,ampMax/2,0);
  amplitudeControl.position(30,height*.05)
  amplitudeControl.parent('sketch-holder')
  amplitudeControl.class("sim-slider");
  amplitudeControl.input(sliderChange);
  amplitudeControl.size(sliderWidth,0)

  amplitudeControlLabel = createP("Amplitude");
  amplitudeControlLabel.position(30,amplitudeControl.y);
  amplitudeControlLabel.parent('sketch-holder')




  omegaControl = createSlider(5,30,15,.1);
  omegaControl.position(30,amplitudeControl.y+70)
  omegaControl.parent('sketch-holder')
  omegaControl.class("sim-slider");
  omegaControl.input(sliderChange);
  omegaControl.size(sliderWidth,0)
  omegaControlLabel = createP();
  omegaControlLabel.position(30,omegaControl.y);
  omegaControlLabel.parent('sketch-holder')
  katex.render('\\omega',omegaControlLabel.elt)


  phiControl = createSlider(-2*PI,+2*PI,0,PI*.1);
  phiControl.position(30,omegaControl.y+70)
  phiControl.parent('sketch-holder')
  phiControl.class("sim-slider");
  phiControl.input(sliderChange);
  phiControl.size(sliderWidth,0)

  phiControlLabel = createP();
  phiControlLabel.position(30,phiControl.y);
  phiControlLabel.parent('sketch-holder')

  katex.render('\\phi ='+phiControl.value().toFixed(2),phiControlLabel.elt)

  let posEq = createP()
  posEq.style('font-size', '20px')
  posEq.position(width/2,omegaControl.y+40 )
  katex.render('x(t) = C \\cos \\left(\\omega t + \\phi \\right) ',posEq.elt)

  tick1 = createP()
  tick1.style('font-size', '20px')
  katex.render('2 \\pi  ',tick1.elt)


    tick2 = createP()
    tick2.style('font-size', '20px')
    katex.render('4 \\pi  ',tick2.elt)

    horizAxisLabel = createP()
    horizAxisLabel.style('font-size', '20px')
    horizAxisLabel.position(.8*width,height/2+80)
    katex.render('\\omega t ',horizAxisLabel.elt)

    noLoop()
}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, 2*height / 3)
  //x axis
  line(0, 0, width*.9, 0)
  line(0,-ampMax*1.1,0,ampMax*1.1)
  widthScale = y.length/(width*.9);
  amplitude = amplitudeControl.value();
  omega = omegaControl.value();
  phi = phiControl.value();
  //calculate this points
  calcFunction();
  //display discrete points
  renderPoints();
  //display connected line
  renderLine();

  showMaxAmplitude();
  //showPeriod();
  showXTicks();
  //noLoop()
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * Math.cos(.01 * x*omega+phi)
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  push()
  noStroke()
      fill('red');
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width*.9)
    ellipse(xscaled, -y[x], 5, 5);
  }
  pop()
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
  line(0,-amplitude,10,-amplitude)
  line(0,amplitude,10,amplitude)
  noStroke()
  text('C',-40,-abs(amplitude)+5)
  text('-C ',-40,abs(amplitude)+5)
}

function showPeriod(){
  stroke(0)
  translate(0,-80)
  line(PI/(2*.01*omega*widthScale),0,PI/(2*.01*omega*widthScale),-30)
  line(5*PI/(2*.01*omega*widthScale),0,5*PI/(2*.01*omega*widthScale),-30)
  line(PI/(2*.01*omega*widthScale),-15,5*PI/(2*.01*omega*widthScale),-15)
  noStroke()
  text('T (period)',(PI/(2*.01*omega*widthScale)+5*PI/(2*.01*omega*widthScale))/2,-30)
}

function showXTicks(){
  stroke(0)
  translate(0,-80)
  line(TWO_PI/(.01*omega*widthScale),70,TWO_PI/(.01*omega*widthScale),80)
  line(2*TWO_PI/(.01*omega*widthScale),70,2*TWO_PI/(.01*omega*widthScale),80)
  noStroke()
  //text('2',(PI/(2*.01*omega*widthScale)+5*PI/(2*.01*omega*widthScale))/2,-30)
  tick1.position(TWO_PI/(.01*omega*widthScale)+65,2*height/3+80)
  tick2.position(2*TWO_PI/(.01*omega*widthScale)+65,2*height/3+80)
}

function sliderChange() {
  katex.render('\\phi ='+phiControl.value().toFixed(2),phiControlLabel.elt)

  redraw()
}
