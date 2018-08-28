var i=0;
var A, Arate;
var B, Brate;

var onoff;
var running = true;
var EpicycleSlider, BRateSlider;
var xPos,yPos;
var c;

var Trails = [];
function preload() {
  //image based on from https://photojournal.jpl.nasa.gov/catalog/PIA16950
  //credit: NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington
  earthImage = loadImage('earth-polar-view.png');
  quartzImage = loadImage('quartz.png');
}

function setup(){
canvas = createCanvas(windowWidth, windowHeight);
canvas.parent('sketch-holder');
imageMode(CENTER)
frameRate(30);
  c = 0;
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width/2,30);
  onoff.class("sim-button")
  //
  // EpicycleSliderLabel = createP("Epicycle Radius");
  // EpicycleSliderLabel.parent('sketch-holder');
  // EpicycleSliderLabel.position(50,10);
  // EpicycleSlider = createSlider(0, 40, 10 ,0);
  // EpicycleSlider.parent('sketch-holder');
  // EpicycleSlider.position(50,40);
  // EpicycleSlider.class("sim-slider");

  // BRateSliderLabel = createP("Speed");
  // BRateSliderLabel.parent('sketch-holder');
  // BRateSliderLabel.position(50,80);
  // BRateSlider = createSlider(1, 3, 2.1 ,0);
  // BRateSlider.parent('sketch-holder');
  // BRateSlider.position(50,110);
  // BRateSlider.class("sim-slider");
//noSmooth();
//frameRate(15)
// A = width/4;
// B = EpicycleSlider.value()*.01*A
// Arate = .01;
// Brate = Arate*BRateSlider.value();

}

function draw(){
background(0)
fill(0);
// B = EpicycleSlider.value()*.01*A
// Brate = Arate*BRateSlider.value();
baseSpeed = .006
orb(385,42,120,baseSpeed*.2,14)
orb(310,32,50,baseSpeed*.4,12)
orb(246,30,2,baseSpeed*.8,10)
sunorb(172,42,baseSpeed*2)
orb(105,22,200,baseSpeed*3,2)

//earth
push();
translate(width/2,height/2);
image(earthImage,0,0,30,30)
pop();







i++
}


var sunorb = function(orbwidth,orbradius,orbspeed){
  A = orbwidth;
  B = orbradius;
  Arate = orbspeed;
  push()
  translate(width/2,height/2)
  push()
  rotate(-Arate*i)
  image(quartzImage,0,0,A+B,A+B)
  fill(0)
  ellipse(0,0,A-B)
  pop()

  push();
  rotate(-Arate*i);
  translate(0,-A/2)
  noStroke()
  fill(color('hsla(49, 100%, 80%, .7)'));
  ellipse(0,0,B/2,B/2)
  pop();
  pop();
}


var orb = function(orbwidth,orbradius,planetHue,orbspeed,epicycleSpeed){
  A = orbwidth;
  B = orbradius;
  Arate = orbspeed;
  Brate = epicycleSpeed*Arate;
  push()
  translate(width/2,height/2)
  //orb itself
  //stroke(255);

  //ellipse(0,0,A+B)
  rotate(-Arate*i)
  image(quartzImage,0,0,A+B,A+B)
  fill(0)
  ellipse(0,0,A-B)



  push();


  rotate(-Arate*i);
  translate(0,-A/2)


  fill(0);
  stroke(255);




  push();
  stroke(color('hsla('+planetHue+', 100%, 70%, 1)'));

  fill(color('hsla('+planetHue+', 100%, 70%, .5)'));
  ellipse(0,0,B,B)
  pop();

  rotate(-Brate*i);
  translate(0,-B/2);
  push();
  fill(color('hsla('+planetHue+', 100%, 50%, 1)'));
  stroke(0)
  ellipse(0,4,10,10);
  pop();

  pop();
  // pop();


  push();
  stroke(255)


  //rotate(-.01*i);
  xPos = A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i);
  yPos = A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i);
  gamma = Math.atan2(A*Math.sin(-Arate*i)+B*Math.sin(-(Brate+Arate)*i),A*Math.cos(-Arate*i)+B*Math.cos(-(Brate+Arate)*i));
  // rotate(gamma);
  // line(0,0,0,-300)
  pop();
  pop()
}

function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }
    }
