
var A;
var B;

var Slider;
var xPos,yPos;

var nicename = 'solar-vs-sidereal';


function preload() {
  //image based on from https://photojournal.jpl.nasa.gov/catalog/PIA16950
  //credit: NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington
  earthImage = loadImage('earth-polar-view.png');
}
function setup(){
canvas = createCanvas(windowWidth*.9,windowHeight*.9);
canvas.parent('sketch-holder');
frameRate(30);

  imageMode(CENTER)

  textSize(18)

  SliderLabel = createP("time advance");
  SliderLabel.parent('sketch-holder');
  SliderLabel.position(30,0);

  Slider = createSlider(0, 20, 0 ,.05);
  Slider.parent('sketch-holder');
  Slider.position(30,40);
  Slider.class("sim-slider");

//noSmooth();
//frameRate(15)

B = Slider.value()


solarDays = createP('Solar Days: 0');
solarDays.parent('sketch-holder');
solarDays.position(30,120)

siderealDays = createP('Sidereal Days: 0');
siderealDays.parent('sketch-holder');
siderealDays.position(30,150);
  addQmark('bottom-left')

}

function draw(){
background(255)
fill(255);
A = width/4;
B = Slider.value()*.01


translate(width/2,height/2)

push()
fill(0,0,0,0)
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

translate(-A*cos(B), A*sin(B));
fill(0)
text("Earth",-80,5);
line(0,0,400,0)

rotate(-B*32.42)

image(earthImage,0,0,30,30)
line(0,0,400,0)
pop();

solarDays.html('Sidereal Days: '+ (B*5*1.032).toFixed(2));
siderealDays.html('Solar Days: '+ (B*5).toFixed(2));

}




function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
