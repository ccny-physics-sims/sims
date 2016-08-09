var n = 100;
var yvalues = [];
var xspacing = 1;
var wavelength = 300;
var k = 2*Math.PI/wavelength;
var amplitude = 20;
var strokeColor = new Array(n).fill(0);
var sinePoints = [];
function setup() {

  frameRate(30);
  canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');

  radio = createRadio();
  radio.parent('sketch-holder');
  radio.position(0,20);
  radio.option('n = 1', 1);
  radio.option('n = 2', 2);
  radio.option('n = 4', 4);
  radio.option('n = 10', 10);
  radio.option('n = 50', 50);
  //radio.style('width', '60px');
  radio.changed(refresh);
  radio.value(1);
  radio.class('sim-radio');
  textAlign(CENTER);
  noLoop();
  for (i=0;i<n;i++){
    strokeColor[i] = color(random(0,250),random(0,250),random(0,250),map(i,0,100,200,0));
  }

  yvalues = new Array(floor(width/xspacing));
  sumedFunction = new Array(floor(width/xspacing)).fill(0);
  //sumedFunction = new Array(floor(width/xspacing));
}

function draw() {
  background(255);
  n = radio.value();
  for (j=0; j<n ;j++) {
  jj = j+1
  drawSine(jj,strokeColor[j]);
}

  drawSum(n);

}

function drawSine(counter_,strokeColor_) {
    x = 0;

  for (var i = 0; i < yvalues.length; i++) {
    //yvalues[i] =(4 / Math.PI) * (1 / ((counter_*2)-1)) * Math.sin(((counter_*2)-1) * Math.PI * x / wavelength);
    yvalues[i] = 100*Math.sin(((2*counter_)-1) * x * k ) / (((2*counter_)-1));
    //sinePoints[counter_-1][i] = ;
    x+=xspacing;

  }
  //'sinePoints'+counter_ = yvalues;
  sinePoints[counter_-1] = yvalues.slice(0);
  //console.log('this'+counter_)
  push();
  noFill();
  stroke(strokeColor_);
  beginShape();
  for (var x = 0; x < yvalues.length; x++) {
    curveVertex(x*xspacing, height/2+yvalues[x]);
  }

  endShape();
  pop();

}

function drawSum(howMany) {
  sumedFunction.fill(0);

  for (j=0;j<howMany;j++){
    for (i=0; i < sumedFunction.length; i++){
      sumedFunction[i] = (sumedFunction[i] + sinePoints[j][i]);
    }
  }

  push();
  noFill();
  stroke(0);
  beginShape();
    for (var x = 0; x < sumedFunction.length; x++) {
      curveVertex(x*xspacing, height/2+(sumedFunction[x]));
    }
  endShape();
  pop();
//   push();
//   fill(0);
//   for (var x = 0; x < sumedFunction.length; x++) {
//
//   ellipse(x*xspacing, height/2+(10*sumedFunction[x]),2,2)
// }
//   pop();

}

function refresh(){
    redraw();
}
