
let B;
let earthSemimajor ;
let marsSemimajor
let deltatime = 0;
let autoadvance = false;
let joiner;
let celestialSphereDiameter;
function setup(){
//  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  celestialSphereDiameter = min(width,height)*.8
  canvas.parent('sketch-holder')
  centerSpot = createVector(width/2,height/2)
  earthEccentricity = 0//0.016;
  marsEccentricity = 0//0.0935;
  earthSemimajor = .1* celestialSphereDiameter/2
  marsSemimajor = earthSemimajor*1.5240;
  SliderLabel = createP("manual orbit control");
  SliderLabel.parent('sketch-holder');
  SliderLabel.position(30,60);

  Slider = createSlider(-PI/2, 12*PI, -PI/2 ,.04);
  Slider.size(200,30);
  Slider.parent('sketch-holder');
  Slider.position(30,100);
  Slider.class("sim-slider");
  Slider.input(sliderChanged)

  onoff = createButton("PLAY");
  onoff.parent('sketch-holder')
  onoff.mouseClicked(timeadvancertoggle);
  onoff.position(30,30);
  onoff.class("sim-button blue");
  joiner = createVector(0,0)

  // MotionLabel = createP("Motion: ");
  // MotionLabel.parent('sketch-holder');
  // MotionLabel.position(30,Slider.y+30);
 }



function draw(){
background(230);
appangPre = atan2(joiner.y,joiner.x)
if (autoadvance == true){
  loop()
  B += deltatime;
  Slider.value(B)
}
else if (autoadvance == false){
  B = Slider.value()
  noLoop()
}
translate(centerSpot.x,centerSpot.y)
fill(220)
stroke(20)
strokeWeight(2)
circle(0,0,celestialSphereDiameter)
noFill()
stroke(color('hsla(215, 100%, 50%, 0.5)'))
circle(0,0,earthSemimajor*2)
stroke(color('hsla(23, 100%, 50%, 0.5)'))
circle(0,0,marsSemimajor*2)
strokeWeight(1)
noStroke()
fill('yellow')
ellipse(0,0,15)

//find the eccentric anomoly, by solving Kepler's equation, thanks to: http://www.jgiesen.de/kepler/kepler.html

EEarth = B + (earthEccentricity-(1/8)*Math.pow(earthEccentricity,3))*Math.sin(B)+(1/2)*Math.pow(earthEccentricity,2)*Math.sin(2*B)
CEarth = Math.cos(EEarth)
SEarth = Math.sin(EEarth)

EMars = B*.532 + (marsEccentricity-(1/8)*Math.pow(marsEccentricity,3))*Math.sin(B*.532)+(1/2)*Math.pow(marsEccentricity,2)*Math.sin(2*B*.532)
CMars = Math.cos(EMars)
SMars = Math.sin(EMars)
// x-y position of the orbiter

 xposEarth = earthSemimajor*(CEarth - earthEccentricity)
 yposEarth = -earthSemimajor*Math.sqrt(1-Math.pow(earthEccentricity,2))*SEarth
//xposEarth = earthSemimajor*Math.cos(B)
//yposEarth = -earthSemimajor*Math.sin(B)
push()
noStroke();
// translate(xposEarth,yposEarth);
fill(color('hsla(215, 100%, 50%, 1.0)'))
ellipse(xposEarth,yposEarth,10)
pop();

 xposMars = marsSemimajor*(CMars - marsEccentricity)
 yposMars = -marsSemimajor*Math.sqrt(1-Math.pow(marsEccentricity,2))*SMars
//xposMars = marsSemimajor*Math.cos(B*.531)
//yposMars = -marsSemimajor*Math.sin(B*.531)


lineStart = createVector(xposEarth,yposEarth)
lineEnd = createVector(xposMars,yposMars)
joiner = p5.Vector.sub(lineEnd,lineStart);
anglec = PI-B-joiner.heading()
unknownLength = lineStart.mag()*Math.cos(anglec)+sqrt((celestialSphereDiameter/2)**2 -lineStart.magSq()*(pow(sin(anglec),2) ))
//console.log(unknownLength)
joiner.setMag(unknownLength)
push()
translate(xposEarth,yposEarth);
stroke(0)
line(0,0,joiner.x,joiner.y)

pop()
push()
noStroke();
fill(color('hsla(23, 100%, 50%, 1.0)'))
ellipse(xposMars,yposMars,8)

pop();
for (i=0;i<24;i++){
push()
rotate(0.523599*i/2)
translate(celestialSphereDiameter/2,0)
//star(100,0,4,8,5)
//text(i,300,0)
stroke(20)
line(0,0,10,0)
//rect(0,-2,10,4)

pop()
}
//appang = atan2(joiner.y,joiner.x)
push()
//console.log(joiner.heading())
translate(xposEarth,yposEarth);


translate(joiner.x,joiner.y)
fill(color('hsla(23, 100%, 50%, 1.0)'))
noStroke()
ellipse(0,0,8)
pop()


//delAppang = appang-appangPre;

// if (delAppang > 0) {
//  MotionLabel.html("Motion: Retrograde")
// }
// else {
//   MotionLabel.html("Motion: Prograde")
// }
}

function sliderChanged() {

  redraw()

}
function timeadvancertoggle(){
  if (deltatime == 0){
  deltatime = .01;
  onoff.html('PAUSE')
  autoadvance = true;
  loop()
  }
  else {
    joiner = createVector(0,0)
    deltatime = 0;
    onoff.html('PLAY')
    autoadvance = false;
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
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
