// line windowWidths scale off this base unit
var lineW = 3;
// set initial time and angle
var t = 0;
// time increment
var dt = .001;
//set initial radius/amplitude and frequency
var amp = 100;
var freq = 10;
// various vars
var x, y;
var timeStopped, oldFreq;
var toggleSineButton, showSine;
var toggleCosineButton, showCosine;
var running = true;
// for graphing the waves
var res = 45;
var noOfPoints = 90;
var xx = new Array(noOfPoints);
var yy = new Array(noOfPoints);
// text alignment business
var alignX = 10;
var alignY = 10;

// setup the stuffs
function setup() {
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder')
  createToggles();
  spawnSliders();
  textSize(16);
}

// constantly redrawing all the things
function draw() {
  background(255);
  //make end of lines not blocky
  strokeCap(ROUND);
  //circle business
  push();
  // center the unit circle
  translate(width / 2, height * .5);
  // get x and y coords for point on circle at a given time
  x = amp * cos(freq * t);
  y = amp * sin(freq * t);
  // draw the full circle
  drawCircle(amp);
  // draw the axes
  drawAxes();
  // decompose and draw the cos and sin lines + orbiting hypotenuse inside the circle
  drawDecomp(x, y);
  // calc and render the sine and cosine waves if requested
  strokeWeight(lineW - 1);
  if (showSine == true) {
    calcSineWave();
    renderSineWave();
    drawSineSpot(y, amp);
  }
  if (showCos == true) {
    calcCosWave();
    renderCosWave();
    drawCosSpot(x, amp);
  }
  pop();
  // increment the time and settings
  t += dt;
  updateSettings(x, y);
}

function drawCircle(amp) {
  noFill();
  fill(235);
  stroke('black');
  strokeWeight(1);
  ellipse(0, 0, amp * 2);
}

function drawAxes() {
  stroke('black');
  strokeWeight(1);
  line(0, windowHeight * 2, 0, -windowHeight * 2);
  line(windowWidth * 2, 0, -windowWidth * 2, 0);
}

function drawDecomp(x, y) {
  // cos
  if (showCos == true) {
    strokeWeight(lineW - 1);
    stroke('blue');
    line(0, y, x, y);
  }
  // sine
  if (showSine == true) {
    stroke('green');
    line(x, 0, x, y);
  }
  drawOrbital();
}

function drawOrbital(x, y) {
  push();
  fill('purple');
  stroke('purple');
  strokeWeight(lineW + 2);
  rotate(t * freq);
  line(0, 0, amp, 0);
  translate(amp, 0);
  ellipse(0, 0, 10, 10);
  pop();
}

function calcSineWave() {
  for (i = 0; i < (2 + noOfPoints); i++) {
    xx[i] = i * 5;
    yy[i] = amp * Math.sin(xx[i] / res + freq * t);
  }
}

function calcCosWave() {
  for (i = 0; i < (2 + noOfPoints); i++) {
    xx[i] = i * 5;
    yy[i] = amp * Math.cos(xx[i] / res + freq * t);
  }
}

function renderSineWave() {
  push();
  translate(amp, 1);
  noFill();
  stroke('green');
  beginShape();
  for (var i = -1; i < (2 + noOfPoints); i += 1) {
    curveVertex(xx[i], yy[i]);
  }
  endShape();
  pop();
}

function renderCosWave() {
  push();
  translate(1, amp);
  noFill();
  stroke('blue');
  beginShape();
  for (var i = -1; i < (2 + noOfPoints); i += 1) {
    curveVertex(yy[i], xx[i]);
  }
  endShape();
  pop();
}

function drawSineSpot(y, amp) {
  // draw sine-spot
  push();
  fill('green');
  ellipse(amp, y, lineW * 3);
  pop();
}

function drawCosSpot(x, amp) {
  //draw cos-spot
  push();
  fill('blue');
  stroke('blue');
  ellipse(x, amp, lineW * 3);
  pop();
}

function updateSettings(x, y) {
  amp = ampSlider.value();
  freq = -freqSlider.value();
  text("AMPLITUDE: " + amp, alignX, height - alignY * 14);
  text("FREQUENCY: " + Math.abs(freq), alignX, height - alignY * 8);
  //text("y(t) = A * sin(f*t)", width - 150, alignY * 3);
  // push();
  // textAlign(LEFT);
  // text("\n\n\t\t\t = " + amp + " * [sin(" + freq * -1 + "*" + t.toFixed(2) + ")]", width - 150, alignY * 3);
  // pop();

}

function spawnSliders() {
  push();
  ampSlider = createSlider(0, 200, amp);
  freqSlider = createSlider(0, 100, freq);
  ampSlider.position(20, height - alignY * 12);
  freqSlider.position(20, height - alignY * 6);
  freqSlider.mousePressed(turnonoff2);
  freqSlider.mouseReleased(turnonoff2);
  ampSlider.parent('sketch-holder');
  freqSlider.parent('sketch-holder');
  ampSlider.class("sim-slider  ");
  freqSlider.class("sim-slider ");
  pop();
}

function createToggles() {
  push();
  showSine = true;
  toggleSineButton = createButton('toggle sine');
  toggleSineButton.position(20, 20 * 1);
  toggleSineButton.mousePressed(toggleSine);
  toggleSineButton.class('sim-button')
  showCos = true;
  toggleCosineButton = createButton('toggle cosine');
  toggleCosineButton.class('sim-button')
  toggleCosineButton.position(20, toggleSineButton.y+50);
  toggleCosineButton.mousePressed(toggleCos);
  running = true;

  onoff = createButton('start');
  onoff.position(20, toggleCosineButton.y+50);
  onoff.mousePressed(turnonoff);
  onoff.class('sim-button')

  toggleSineButton.parent('sketch-holder');
  toggleCosineButton.parent('sketch-holder');
  onoff.parent('sketch-holder');
  pop();
}

function toggleSine() {
  if (showSine) {
    showSine = false;
  } else {
    showSine = true;
  }
}

function toggleCos() {
  if (showCos) {
    showCos = false;
  } else {
    showCos = true;
  }
}

var turnedOffByButton = false;

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
  if (!running) {
    running = true;
    turnedOffByButton = false;
    loop();
    onoff.html("stop");
    return
  }

  if (running) {
    running = false;
    turnedOffByButton = true;
    noLoop()
    onoff.html("start");
    return
  }
}

function turnonoff2() {
  if (running) {
    running = false;
    noLoop()
    onoff.html("start");
    return
  } else {
    if (turnedOffByButton !== true) {
      turnonoff()
    }
  }
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  ampSlider.position(alignX, windowHeight - alignY * 14);
  freqSlider.position(alignX, windowHeight - alignY * 8);
  toggleSineButton.position(alignX, alignY * 1);

  toggleCosineButton.position(alignX, alignY * 5);

  onoff.position(alignX, alignY * 9);
  updateSettings();
}
