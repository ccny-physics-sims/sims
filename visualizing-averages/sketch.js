let bigColor = 'red';
let littleColor = 'blue';
let avgColor = 'purple';

function setup() {
  // set canvas dimensions
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  // set default min, max, average, rectWidth, etc
  theMin = 100;
  theMax = 300;
  theAverage = (theMax + theMin) / 2;
  rectWidths = 100;
  fontSize = 16;
  textOffsetX = rectWidths / 2;
  textOffsetY = 10;
  // horizontal alignment of sliders
  sliderAlignment = width / 2 + 95;
  // vertical distance between sliders
  interdistanceY = -50;
  // create sliders and set default fontsize
  spawnSliders();
  textSize(fontSize);

}

function draw() {

  clear();
    labelSliders();
  //scoot the origin to the bottom of the canvas
  translate(width / 2 - rectWidths * 1.5, height * .95);
  // update values
  updateBars();
  //flip the bars so they grow bottom to top
  scale(1, -1);
  //draw the small fellow
  drawSmall();
  // label the small fellow
  push();
  labelSmall();
  pop();
  offset += rectWidths;
  //draw the average fellow
  drawAverage();
  // label the average fellow
  push();
  labelAverage();
  pop();
  offset += rectWidths;
  //draw the large fellow
  push();
  drawLarge();
  pop();
  // label the large fellow
  push();
  labelLarge();
  pop();
  //label the sliders

}

function Bar(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

function spawnSliders() {
  push();
  minSlider = createSlider(0, 450, theMin).class("sim-slider gray");;
  maxSlider = createSlider(0, 450, theMax).class("sim-slider gray");;
  //minSlider.class("sim-slider gray");
  //maxSlider.class("sim-slider gray");
  minSlider.parent('sketch-holder');
  minSlider.position(width/3, height*.1);
  minSlider.size(min(300,width/3),0)
  maxSlider.parent('sketch-holder');
  maxSlider.position(width/3, height * .2);
  maxSlider.size(min(300,width/3),0)
  pop();
}

function labelSliders() {
  push();
  //de flip so the text isn't upside down
  // scale(1, -1);
  fill(littleColor);
  text("a: " + theMin, width/3-50, height*.08);
  fill(bigColor);
  text("b: " + theMax, width/3-50, height*.18);
  fill(avgColor);
  text("average: (" + theMin + "+" + theMax + ")/2 = " + theAverage, width/3, height*.28);
  pop();
}

function updateBars() {
  offset = 0;
  theMin = minSlider.value();
  theMax = maxSlider.value();
  theAverage = (theMax + theMin) / 2;
  rectSmall = new Bar(rectWidths, theMin, littleColor);
  rectLarge = new Bar(rectWidths, theMax, bigColor);
  rectAverage = new Bar(rectWidths, theAverage, avgColor);
}

function drawSmall() {
  fill(rectSmall.color);
  rect(offset, 0, rectSmall.x, rectSmall.y);
}

function labelSmall() {
  push();
  scale(1, -1);
  fill('black');
  textAlign(CENTER);
  text("a", offset + textOffsetX, -(rectSmall.y + textOffsetY));
  pop();
}

function labelAverage() {
  push();
  scale(1, -1);
  fill('black');
  textAlign(CENTER);
  text("(min + max)", offset + textOffsetX, -(rectAverage.y + textOffsetY * 4));
  text("_________", offset + textOffsetX, -(rectAverage.y + textOffsetY * 3));
  text("2", offset + textOffsetX, -(rectAverage.y + textOffsetY * 1));
  pop();
}

function drawAverage() {
  fill(rectAverage.color);
  rect(offset, 0, rectAverage.x, rectAverage.y)
}

function drawLarge() {
  fill(rectLarge.color);
  rect(offset, 0, rectLarge.x, rectLarge.y)
}

function labelLarge() {
  push();
  scale(1, -1);
  fill('black');
  textAlign(CENTER);
  text("b", offset + textOffsetX, -(rectLarge.y + textOffsetY));
  pop();
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  sliderAlignment = windowWidth / 2 + 95;
  minSlider.position(sliderAlignment, windowHeight * .65);
  maxSlider.position(sliderAlignment, windowHeight * .8);
  labelSliders();
}
