var i=0;
var A;
var B;

var onoff;
var running = true;
var Slider;


var deltatime = 0;
var autoadvance = false;

function preload() {
  mercuryImage = loadImage('mercury-polar.png');
}

function setup(){
canvas = createCanvas(800, 600);
canvas.parent('sketch-holder');
//frameRate(30);
imageMode(CENTER);

  textSize(18)

  onoff = createButton("PLAY");
  onoff.parent('sketch-holder')
  onoff.mouseClicked(timeadvancertoggle);
  onoff.position(30,30);
  onoff.class("sim-button blue");

  SliderLabel = createP("manual orbit control");
  SliderLabel.parent('sketch-holder');
  SliderLabel.position(30,80);

  Slider = createSlider(0, 2, 0 ,.01);
  Slider.size(200,30);
  Slider.parent('sketch-holder');
  Slider.position(30,110);
  Slider.class("sim-slider");

  orbitCount = createP('Mercury Orbits: 0');
  orbitCount.parent('sketch-holder');
  orbitCount.position(30,150)

  rotationCount = createP('Mercury Rotations: 0');
  rotationCount.parent('sketch-holder');
  rotationCount.position(30,170);

  earthDayCount = createP('Earth Days: 0');
  earthDayCount.parent('sketch-holder');
  earthDayCount.position(30,210);
//noSmooth();
//frameRate(15)

B = Slider.value()


}

function draw(){


  if (B > 2){B = 0}

background(255)
fill(255);
A = width/4;
if (autoadvance == true){
  B += deltatime;
  Slider.value(B)
}
else if (autoadvance == false){
  B = Slider.value()
}

orbitCount.html('Mercury Orbits: '+B.toFixed(2))
rotationCount.html('Mercury Rotations: '+(B*3/2).toFixed(2))
earthDayCount.html('Earth Days: ' +(175.97*B/2).toFixed(0))


translate(width/2,height/2)

push()
fill(0,0,0,0)
stroke(220);
ellipse(0,0,2*A,2*A)
pop()

push()
fill(0)
text("Sun",-15,-30);
pop()

push()
noStroke()
fill(240,200,40)
ellipse(0,0,40,40)
pop()

push()
//rotate(-Slider.value()*.01)
//translate(width/4,0)
noStroke();
translate(-A*cos(2*Math.PI*B), A*sin(2*Math.PI*B));
fill(0)
//text("Mercury",-80,5);
//line(0,0,300,0)

//fill(230)
push();
rotate(-B*2*PI*3/2+PI/2)
image(mercuryImage,0,0);
translate(0,-15)
stickFigure(15);
pop();

push();
fill(200);
//ellipse(0,0,30,30)
rotate(-B*2*Math.PI)
fill(0,0,0,200)
arc(0,0,30,30,PI/2,3*PI/2,CHORD)
pop();

pop();


// push()
// daylight = map(B,0,2,255,0)
// fill(daylight)
// rect(0,0,50,50)
// pop()

}



function timeadvancertoggle(){
  if (deltatime == 0){
  deltatime = .003;
  onoff.html('PAUSE')
  autoadvance = true;
  }
  else {
    deltatime = 0;
    onoff.html('PLAY')
    autoadvance = false;
  }
}
function stickFigure(figureHeight){
  push()
  noFill()
  stroke(0)

ellipse(0,-figureHeight*(1+1/6),figureHeight/3,figureHeight/3)
torso = line(0,-figureHeight,0,-figureHeight/2)
lleg = line(0,-figureHeight/2,-figureHeight/4,0)
rleg = line(0,-figureHeight/2,+figureHeight/4,0)
larm = line(0,-figureHeight/1.2,-figureHeight/4,-figureHeight/1.4)
rarm = line(0,-figureHeight/1.2,figureHeight/4,-figureHeight/1.4)
pop()
}
function windowResized() {
    // Resize necessary elements to fit new window size
    //resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
