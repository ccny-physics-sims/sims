
//Buttons
var playButton;
//Boolean to toggle animation
var play;
var mass, springk, amplitude, mu;
function setup() {

  canvas = createCanvas(windowWidth*.8, 500);
  canvas.parent('sketch-holder');
  frameRate(30);
  play = true;

  //Create sliders and buttons
  playButton = createButton('pause');
  playButton.position(20,25);
  playButton.mousePressed(togglePlayButton);
  playButton.value = true;
  playButton.class("sim-button gray");
  playButton.parent('sketch-holder');


  //Spring(pos_, k_, m_, relaxedLength_, oscAmp_)
  springk = 30;
  mass=5;
  amplitude=.5;
  mu=0;
  spring = new Spring(createVector(width/4,height/2),springk,mass,250,amplitude,mu);

  //spring = new Spring(createVector(10,height/2),30,5,250,.5,0);
  spring.rotation =0;

  dispv = new Arrow(start = new createVector(0,0),end = new createVector(0,0));
  dispv.showComponents = false;
  dispv.grab = false;
  dispv.drag = false;
  dispv.origin = new p5.Vector(0,0);

  velv = new Arrow(start = new createVector(0,0),end = new createVector(0,0));
  velv.showComponents = false;
  velv.grab = false;
  velv.drag = false;

  accelv = new Arrow(start = new p5.Vector(0,0),end = new p5.Vector(0,0));
  accelv.showComponents = false;
  accelv.grab = false;
  accelv.drag = false;
}

function draw() {
background(255);



  spring.setPlay(play);

spring.update();
spring.display();
push();
stroke(180);
line(250+width/4,0,250+width/4,height)
pop();

push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,-50);
dispv.origin = spring.equilibrium;
dispv.target = spring.displacement;
dispv.color = color(20,20,230);
dispv.update();
dispv.display();
pop();


push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,-10);
velv.origin = spring.displacement;
velv.target = spring.velocity.mult(70).add(spring.displacement);
velv.color = color(36, 156, 58);
velv.display();
pop();

push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,+10);
accelv.origin = spring.displacement;
accelv.target = spring.acceleration.mult(20).add(spring.displacement);
accelv.color = color(230,20,230);
accelv.display();
pop();
}



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
