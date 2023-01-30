
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
canvas = createCanvas(windowWidth,0.9*windowHeight);
canvas.parent('sketch-holder');
frameRate(30);

  imageMode(CENTER)

  textSize(18)



  Slider = createSlider(0, 20, 0 ,.05);
  Slider.parent('sketch-holder');
  Slider.position(30,40);
  Slider.class("sim-slider");
  SliderLabel = createP("Time Advance");
  SliderLabel.parent('sketch-holder');
  SliderLabel.position(30,Slider.y-50);

//noSmooth();
//frameRate(15)

B = Slider.value()


solarDays = createP('Solar Days: 0');
solarDays.parent('sketch-holder');
solarDays.position(20,Slider.y+40)

siderealDays = createP('Sidereal Days: 0');
siderealDays.parent('sketch-holder');
siderealDays.position(20,solarDays.y+30);

}

function draw(){
background(255)
fill(255);
A = min(width/4,height/4)*.6;
B = Slider.value()*.01


translate(width/2*.5,height/2)
push()
fill(0)
text("Far Star",1.0*width/2,-30);
star2(1.0*width/2,10,30,15,5,'orange')
pop()

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
stroke(150)
line(0,0,width,0)

rotate(-B*32.42)

image(earthImage,0,0,30,30)
stroke(10)
line(0,0,width,0)
noStroke()
fill('blue')
text("Line of Sight",30,-10);
pop();

solarDays.html('Sidereal Days: '+ (B*5*1.032).toFixed(2));
siderealDays.html('Solar Days: '+ (B*5).toFixed(2));

}

function star2(x, y, radius1, radius2, npoints,color) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  fill(color)
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
