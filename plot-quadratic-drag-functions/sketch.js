var b = .2;
var m = 1;
var k = 8;
let amplitude;
var phi=0;
var omega;
let v0 = 2
let vscale = 100;
let graph2offset = 300;
let xmax;
let vterm;
let g = 9.8;
let Cdrag=0.5;
let rho = 1.29;
let r = 0.1;
let A = r*r;
let vtermLabel;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  amplitude = min(200,height/4)
  y = new Array(300);
  v = new Array(300);
  yff = new Array(300);
  vff = new Array(300);
  expFunct = new Array(300);

  massControl = createSlider(.1,100,1,.1);
  massControl.position(80,height*.12)
  massControl.parent('sketch-holder')
  massControl.class("sim-slider");
  massControl.input(sliderChange);
  massControlLabel = createP("Mass");
  massControlLabel.position(80,20);
  massControlLabel.parent('sketch-holder')


//   let velEq = createP()
// velEq.style('font-size', '20px')
// velEq.position(.8*width, height/2-0)
// katex.render('v(t) = v_0e^{-t/\\tau} ',velEq.elt)

let velEqlabel = createP('Velocity')
velEqlabel.style('font-size', '20px')
velEqlabel.style('font-family', 'KaTeX-Main')
velEqlabel.style('transform','rotate(-90deg)')
velEqlabel.position(-10,height/2)

let timelabel = createP('Time (t)')
timelabel.style('font-size', '20px')
timelabel.style('font-family', 'KaTeX-Main')
//timelabel.style('transform','rotate(-90deg)')
timelabel.position(width/2,height/2+graph2offset+100)
// let posEq = createP()
// posEq.style('font-size', '20px')
// posEq.position(.8*width, height/2+graph2offset)
// katex.render('x(t) = v_0 \\tau \\left(1-e^{-t/\\tau}\\right) ',posEq.elt)

let posEqlabel = createP('Position')
posEqlabel.style('font-size', '20px')
posEqlabel.style('font-family', 'KaTeX-Main')
posEqlabel.position(-10, height/2+graph2offset)
posEqlabel.style('transform','rotate(-90deg)')

vtermLabel = createP('v<sub>T</sub>')
vtermLabel.style('font-size', '20px')
vtermLabel.position(0,0)
vtermLabel.style('font-family', 'KaTeX-Main')




}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle

  translate(80, height / 2)
  //x axis
  line(0, 0, width, 0)
  line(0,-graph2offset,0,40)
  line(0, graph2offset, width, graph2offset)
  line(0,graph2offset-250,0,graph2offset+50)


  m = massControl.value()
  tau = m/b
  amplitude = v0*tau
  vterm = sqrt((2*m*g)/(Cdrag*rho*A))
    //calculate this points

     push();
     stroke(100)
    // //line(tau,-.37*100*v0-30,tau,0)
     line(0,-vterm,width-100,-vterm)
     pop();
    // //text('Terminal V',-70,-vterm)
    vtermLabel.position(50,height/2-vterm+70)

  calcFunction();
  //display discrete points
  //renderPoints();
  //display connected line
  renderLine();
  massControlLabel.html('mass: '+m+' kg')


  noLoop()

}

function calcFunction() {
  //this function fills the aray with values
  for (var t = 0; t < y.length; t += 1) {

    tt = t*.1
    y[t] = 0.1*((vterm*vterm)/g) * Math.log(Math.cosh(g* tt/vterm))
    yff[t] = 0.1*0.5*g*tt*tt
    v[t] = vterm*Math.tanh(g*tt/vterm)
    vff[t] = g*tt
  }

}



function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('hsb(200,100%,50%)');
  strokeWeight(2)
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width-100)
    curveVertex(xscaled, -y[x]+graph2offset);
  }
  endShape();
  pop();

  push();
  noFill();
  stroke('hsb(200,100%,80%)');
  strokeWeight(1)
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,width-100)
    curveVertex(xscaled, -yff[x]+graph2offset);
  }
  endShape();
  pop();


  push();
  noFill();
  stroke('hsb(100,100%,50%)');
  strokeWeight(2)
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,v.length,0,width-100)
    curveVertex(xscaled, -v[x]);
  }
  endShape();
  pop();

  push();
  noFill();
  stroke('hsb(100,100%,80%)');
  strokeWeight(1)
  beginShape();
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,v.length,0,width-100)
    curveVertex(xscaled, -vff[x]);
  }
  endShape();
  pop();


}


function showTermV(){


}

function sliderChange() {
  redraw()
}
