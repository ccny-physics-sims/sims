var systems;
var img;
var button;


function preload() {
  img = loadImage("candle.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  systems = [];
  frameRate(20);
  button = createButton('clear');
  button.position(5, 5);
  button.mousePressed(clearWaves);
  button.addClass('sim-button');
}

function draw() {
  background(250);

  image(img, width/2, height/4);

  for (i = 0; i < systems.length; i++) {
    systems[i].run();
    if (frameCount%50==0){
    systems[i].addWavelet();
  }
  }

}

function mousePressed() {
  if (mouseX >= 80){
  this.p = new WaveletSystem(createVector(mouseX, mouseY));
  systems.push(p);
  systems[i].addWavelet();
}
}
function touchStarted() {
  if (touchX >= 50){
  this.p = new WaveletSystem(createVector(touchX,touchY));
  systems.push(p);
  systems[i].addWavelet();
}
}

// A simple Wavelet class
var Wavelet = function(position) {

   this.position = position.copy();
   this.lifespan = 255.0;
  this.radx=0;
  this.rady=0;
};

Wavelet.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Wavelet.prototype.update = function(){

  this.radx += 1;
  this.rady += 1;
  this.lifespan -= 1;
};

// Method to display
Wavelet.prototype.display = function () {
  stroke(30, this.lifespan);
  strokeWeight(2);
  noFill();
  //fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, this.radx, this.rady);
};

// Is the Wavelet still useful?
Wavelet.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var WaveletSystem = function (position) {
  this.origin = position.copy();
  this.Wavelets = [];
};

WaveletSystem.prototype.addWavelet = function () {

  p = new Wavelet(this.origin);
  this.Wavelets.push(p);
};

WaveletSystem.prototype.run = function () {
  for (var i = this.Wavelets.length - 1; i >= 0; i--) {
    var p = this.Wavelets[i];
    p.run();
    if (p.isDead()) {
      this.Wavelets.splice(i, 1);
    }
  }
};

// A subclass of Wavelet
function clearWaves(){
  systems = [];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
