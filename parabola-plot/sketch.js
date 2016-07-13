var xspacing;
var howmanypoints = 40;    // how far between each point

var dx;
var x = 0;            // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var cSlider; // these are sliders
var aSlider;
var bSlider;

var equation; // this is the function

var aSliderLabel; //these are labels
var bSliderLabel;
var cSliderLabel;

var a=1;
var b=1;
var c=1;


function setup() {

  frameRate(10);
  canvas = createCanvas(700, 500);
  canvas.parent('sketch-holder');

  //these are all for the labels and sliders
  // onoff = createButton("stop");
  // onoff.mouseClicked(turnonoff);
  // onoff.position(650,30);
  // onoff.class("pure-button")
  equation = createP("y  = ");
  equation.position(50, 20);
  equation.parent('sketch-holder')

  cSlider = createSlider(-40, 40, 0);
  cSlider.position(50,80);
  cSlider.parent('sketch-holder')
  bSlider = createSlider(-20, 20, 1);
  bSlider.position(50,120);
  bSlider.parent('sketch-holder')
  aSlider = createSlider(-2, 2, 1);
  aSlider.elt.step = 0.1;
  aSlider.position(50,160);
  aSlider.parent('sketch-holder')

  cSliderLabel = createP("c");
  cSliderLabel.position(30,64);
  cSliderLabel.parent('sketch-holder')
  bSliderLabel = createP("b");
  bSliderLabel.position(30,104);
  bSliderLabel.parent('sketch-holder')
  aSliderLabel = createP("a");
  aSliderLabel.position(30,144);
  aSliderLabel.parent('sketch-holder')





  w = width;
  xspacing = width/howmanypoints;
  dx = xspacing/20;

  // a small segment of the 'rope'

  // how many points are we going to need.
  yvalues = new Array(floor(w/xspacing));
  //console.log(yvalues.length)
  //noLoop();
}

function draw() {
  background(255);
  // these lines are just to frame the plot

  push();
  stroke(0);
  line(0,height/2, width, height/2);
  line(width/2,50,width/2,height-50)
  pop();
  // get the values from the sliders
  a = aSlider.value();
  b = bSlider.value();
  c = cSlider.value();

  //dx = .10;

  // calculate all the points
  calcWave();
  // display the wave
  renderFunction();
  // these rest of the draw function updates the equation of the wave

  omega = Math.abs(bSlider.value());
  equation.html("<p>y = "+
  getsign(cSlider.value()) +" " + abs(cSlider.value()) +
  " " + getsign(bSlider.value()) + " " + abs(bSlider.value()) + "t" +
  " " + getsign(aSlider.value()) + " "+ abs(aSlider.value()) + "t<sup>2</sup></p>");


}
function getsign(ofwhat_){
  if(ofwhat_>=0){
   return "+";
  }
  if(ofwhat_<0){
    return "-";
  }
}
function calcWave() {

x = -(dx/2)*howmanypoints;

  // For every x value, calculate a y value with sine function


  for (var i = 0; i < yvalues.length; i++) {
    //the parabola:
    yvalues[i] = -1*(c*2 + b * x + a * pow(x,2));
    x+=dx;
  }
}

function renderFunction() {
  noStroke();
  // these are the balls
  for (var x = 2; x < yvalues.length-3; x+=1) {
    //
    //else {fill(0);}
    fill(0);
    ellipse(x*xspacing, height/2+yvalues[x], 5, 5);
  }
  // and this is the line plot superimposed
  push();
  noFill();
  stroke(80);
  if (a == 0){stroke(240,20,20)}
    beginShape();
    for (var x = 0; x < yvalues.length; x+=2) {
      curveVertex(x*xspacing, height/2+yvalues[x]);
    }
    endShape();
    pop();
}
