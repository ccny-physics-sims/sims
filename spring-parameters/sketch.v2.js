//Buttons
var playButton;
//Boolean to toggle animation
var play;

//Sliders
var mSlider, kSlider, aSlider, muSlider;
//Slider defined variables
var mass, springk, amplitude, mu;
//calculated variables
var vel, acc;

var spring;

function setup() {
  //Create Canvas
  var mycanvas = createCanvas(600, 350);
  mycanvas.parent('sketch-holder');
  mycanvas.position(0,0);
  textSize(15);
  noStroke();

  //Set default variables
  mass = 11;
  springk = 6;
  amplitude = 2;
  mu=0;
  play = true;

  //Create sliders and buttons
  playButton = createButton('pause');
  playButton.position(20,25);
  playButton.mousePressed(togglePlayButton);
  playButton.value = true;
  playButton.class("sim-button gray");
  playButton.parent('sketch-holder');


  mSlider = createSlider(1, 21, mass);
  mSlider.position(20, height-40);
  mSlider.mousePressed(stopAn);
  mSlider.mouseReleased(startAn);
  mSlider.class("sim-slider gray");
  mSlider.parent('sketch-holder');
  kSlider = createSlider(1, 11, springk);
  kSlider.position(165, height-40);
  kSlider.mousePressed(stopAn);
  kSlider.mouseReleased(startAn);
  kSlider.class("sim-slider gray");
  kSlider.parent('sketch-holder');
  aSlider = createSlider(-10, 10, amplitude);
  aSlider.position(310, height-40);
  aSlider.mousePressed(stopAn);
  aSlider.mouseReleased(startAn);
  aSlider.class("sim-slider gray");
  aSlider.parent('sketch-holder');
  muSlider = createSlider(0, 10, mu);
  muSlider.position(455, height-40);
  muSlider.mousePressed(stopAn);
  muSlider.mouseReleased(startAn);
  muSlider.class("sim-slider gray");
  muSlider.parent('sketch-holder');

  //Create a default Spring
  spring = new Spring(createVector(20,height/2),springk,mass,308,amplitude/10,mu);

}

function draw() {
  push();
  //bacground rect
  fill(130,160,50);
  rect(0,0,width,height);
  //blue sky rect
  fill(131,214,342);
  rect(0,0,width,height/2+35);
  //spring base rect
  fill(150);
  rect(0,height/2-35,40,70);
  pop();

  //draw slider labels
  text("Mass: "+mass+" kg", 20, 305);
  text("Spring K: "+springk+" N/m", 165, 305);
  text("Amplitude: "+(amplitude/2)+" m", 310, 305);
  text("Damping: "+ mu +" ",455,305);

  //Draw number lines
  push();
  fill(255);
  stroke(255);
  line(67,height/2+50,590,height/2+50);
  for(var i=0;i<=1;i+=.1){
    var xpos = lerp(67,590,i);
    stroke(255);
    line(xpos,height/2+45,xpos,height/2+55);
    noStroke();
    text(round(i*10-5),xpos-4,height/2+70);
  }
  pop();


  //Update variables and reset if any changed
  if (updateVars()){
    spring = new Spring(createVector(20,height/2),springk,mass,308,amplitude/10,mu);
  }

  //Update spring
  spring.setPlay(play);
  spring.update();

  //draw spring
  spring.display();

  //calculate vel and acc
  vel = round(amplitude*spring.velocity.x/.01)/100;
  acc = round(amplitude*spring.acceleration.x/.01)/100;
  //type vel and acc
  push();
  fill(0);
  text("Velocity: "+vel+" m/s", 175, 40);
  text("Acceleration: "+acc+" m/(s^2)", 325, 40);
  pop();
}

function updateVars(){
  //updates slider variables and returns true if changed
  var hasChanged = false;
  if (amplitude != aSlider.value() || mass != mSlider.value() || springk != kSlider.value() || mu != muSlider.value()/10){
    hasChanged = true;
  }

  mass = mSlider.value();
  springk = kSlider.value();
  amplitude = aSlider.value();
  mu = muSlider.value()/10;

  return hasChanged;
}

//Functions for controlling the animation
function togglePlayButton(){
  playButton.value = !playButton.value;
  play = !play;
  if (play) {
    playButton.html("pause");
  }
  if (!play){
    playButton.html("play");

  }
}
function stopAn(){
  play = false;


}
function startAn() {
  if (playButton.value){
    play = true;
  }

}
