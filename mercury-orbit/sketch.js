var i=0;
var A;
var B;

var onoff;
var running = true;
var Slider;


var deltatime = 0;
var autoadvance = false;

var semimajor = 57.91*3;
var eccentricity = .2056;
var semiminor = semimajor*Math.sqrt(1-Math.pow(eccentricity,2))
var c = Math.sqrt(Math.pow(semimajor,2)-Math.pow(semiminor,2));

var skyLight = 0;
var daystatus = 'sunrise';
function preload() {
  mercuryImage = loadImage('mercury-polar.png');
}

function setup(){
canvas = createCanvas(800, 600);
canvas.parent('sketch-holder');
//frameRate(15);
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

  Slider = createSlider(3*PI, 7*PI, 0 ,.04);
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

  daynight = createP('Day/Night? ');
  daynight.parent('sketch-holder');
  daynight.position(30,280)

  daynightstatus = createDiv('Day/Night? ');
  daynightstatus.parent('sketch-holder');
  daynightstatus.position(60,320)
  daynightstatus.attribute('align', 'center');
  daynightstatus.style('text-align: center');
  daynightstatus.style('color: #42b3f4;')
  // angleOfSun = createP('Angle: 0');
  // angleOfSun.parent('sketch-holder');
  // angleOfSun.position(30,250);
  //noSmooth();
  //frameRate(15)

  B = Slider.value()


}

function draw(){


  if (B > 7*PI){B = 3*PI}

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

orbitCount.html('Mercury Orbits: '+map(B,3*PI,7*PI,0,2).toFixed(2))
rotationCount.html('Mercury Rotations: '+map(B,3*PI,7*PI,0,3).toFixed(2))
earthDayCount.html('Earth Days: ' +(175.97*(B-3*PI)/(4*PI)).toFixed(0))
push()

translate(width/2,height/2)

push()
fill(0,0,0,0)
stroke(220);
ellipse(+c,0,2*semimajor,2*semiminor)
pop()

push()
fill(0)
translate(0,0)
text("Sun",-15,-30);
pop()

push()
noStroke()
fill(240,200,40)
translate(0,0)
ellipse(0,0,40,40)

E = B + (eccentricity-(1/8)*Math.pow(eccentricity,3))*Math.sin(B)+(1/2)*Math.pow(eccentricity,2)*Math.sin(2*B)
C = Math.cos(E)
S = Math.sin(E)
pop()

//xpos = -semimajor*cos(2*Math.PI*B);
//ypos = semiminor*sin(2*Math.PI*B);

xpos = -semimajor*(C - eccentricity)
ypos = semimajor*Math.sqrt(1-Math.pow(eccentricity,2))*S
push()
//rotate(-Slider.value()*.01)
//translate(width/4,0)
noStroke();
translate(xpos,ypos);
fill(0)
//text("Mercury",-80,5);
//line(0,0,300,0)

//fill(230)
push();
//omega = B*2*PI*3/2-PI/2;
omega = 2*PI*(B*3/(4*PI))-PI/2;
//omega = 2*PI*B*
rotate(-omega);
image(mercuryImage,0,0);
translate(0,-15)
stickFigure(15);
pop();

push();
fill(200);
//ellipse(0,0,30,30)
rotate(-E)
fill(0,0,0,200)
arc(0,0,30,30,PI/2,3*PI/2,CHORD)
pop();

pop();


// push()
// daylight = map(B,0,2,255,0)
// fill(daylight)
// rect(0,0,50,50)
// pop()
Omega = Math.atan2(ypos,(-xpos));
//omega = omega+HALF_PI
//omega = omega-4*PI;
if (Omega < 0){Omega = Omega+2*PI}
//console.log('Omega: '+Omega);
//Omega = Math.atan(ypos/(xpos-c))
//if (abs(omega)>TWO_PI){omega = omega+TWO_PI}
//console.log('omega: '+omega);
anglefromhorizon = -1*((Omega-(omega))+3*PI);
anglefromhorizonReduced = anglefromhorizon % TWO_PI;
degreesfromhorizonReduced = (degrees(anglefromhorizon) % 360);
degreesfromnoon = anglefromhorizonReduced-90

//if (anglefromhorizon>HALF_PI) {anglefromhorizon = anglefromhorizon-TWO_PI}
//angleOfSun.html(degrees(anglefromnoon).toFixed(2))
// angleOfSun.html(degrees(anglefromhorizon).toFixed(2)+' <br>  Omega (reduced): '+(degrees(anglefromhorizon) % 360).toFixed(2) +' <br>  Omega: '+Omega.toFixed(2)+' <br>  omega: '+(omega-4*PI).toFixed(2))


pop();

push()
sunx = 50*Math.cos(anglefromhorizonReduced)
suny = 50*Math.sin(anglefromhorizonReduced)

if (suny > 20 ) {
  skyLight = 255
  daystatus = 'day'
}
else if (suny <= -20 ) {
  skyLight = 0
  daystatus = 'night'
}
else if (suny > -20 && suny < 20){
  skyLight = map(suny,-20,20,0,255)
  if (sunx > 0 ){
    daystatus = 'sunrise'
  }
  else if (sunx < 0 ){
    daystatus = 'sunset'
  }
}
daynight.html('Day/Night?')
daynightstatus.html(daystatus)

fill(skyLight)
translate(70,400)
rect(-60,-80,120,80)
push()
fill(240,200,40)
noStroke()
line(0,0,100,0)
//rotate(anglefromhorizonReduced)

translate(-sunx,-suny)

ellipse(0,0,20,20)
pop()
noStroke()

fill(255)
rect(-60,1,120,80)
stickFigure(10)

pop()

}



function timeadvancertoggle(){
  if (deltatime == 0){
  deltatime = .01;
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
  stroke(160,160,250)

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
