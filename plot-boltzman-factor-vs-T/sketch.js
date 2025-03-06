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





  temperatureControl = createSlider(1,10,1,1);
  temperatureControl.position(30,70)
  temperatureControl.parent('sketch-holder')
  temperatureControl.class("sim-slider");
  temperatureControl.input(sliderChange);

  temperatureControlLabel = createP();
  temperatureControlLabel.position(30,temperatureControl.y+20);
  temperatureControlLabel.parent('sketch-holder')
  katex.render('\Energy',temperatureControlLabel.elt)




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
  translate(width/3, height / 2)
  //x axis
  line(0, 0, width*.5, 0)
  line(0,-ampMax*1.1,0,ampMax*1.1)
  widthScale = y.length/(width*.9);
  energy = ampMax;
  energyLevel = temperatureControl.value();
  //calculate this points
  calcFunction();
  //display discrete points
  renderPoints();
  //display connected line
  renderLine();
  text('Temperature ->',width/4,+50)
  push()
  rotate(-3.1415/2)
  text('Count',width/10,-20)
  pop()
  //showMaxAmplitude();
  //showPeriod();
  //showXTicks();
  noLoop()
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = 100*exp((-energyLevel*1) / (kBoltzman*(x*200)))
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width*.5)
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
    xscaled = map(x,0,y.length,0,width*.5)
    curveVertex(xscaled, -y[x]);
  }
  endShape();
  pop();
}






function sliderChange() {
  redraw()
}
