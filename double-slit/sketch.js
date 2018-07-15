var d = 0.0;
var a=0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;
var slider;

function setup() {
canvas = createCanvas(800, 600);
canvas.parent('sketch-holder');
noFill();
frameRate(30);
LightWavelength = createElement('p', 'Wavelength');
LightWavelength.position(20, 15);
LightWavelength.parent('sketch-holder');
slider1 = createSlider(200,1000,10);
slider1.parent('sketch-holder');
slider1.value(400);
slider1.position(190, 15);
slider1.class("sim-slider gray");


DistanceBTNSlits = createElement('p', 'Distance between slits');
DistanceBTNSlits.parent('sketch-holder');
DistanceBTNSlits.position(20,55);
slider2 = createSlider(10000,50000,100);
slider2.parent('sketch-holder');
slider2.position(190,55 );
slider2.value(50000);
slider2.class("sim-slider gray");

SlitWidth = createElement('p', 'Slit Width');
SlitWidth.parent('sketch-holder');
SlitWidth.position(20,95);
slider3 = createSlider(1,16000,10);
slider3.parent('sketch-holder');
slider3.position(190, 95);
slider3.value(8000);
slider3.class("sim-slider gray");

CentralMaximum = createElement('p', 'Central Maximum');
CentralMaximum.position(20, 135);
CentralMaximum.parent('sketch-holder');
slider4 = createSlider(0,200,10);
slider4.parent('sketch-holder');
slider4.position(190, 135);
slider4.value(140);
slider4.class("sim-slider gray");

 y = new Array(width*2);


 diffraction = createCheckbox('include diffraction', false);
 diffraction.parent('sketch-holder');
 diffraction.position(400,80)
}

function draw() {

background(255);
//stroke (255,0,0);
noFill();

l = slider1.value();
a = slider3.value();
int0 = slider4.value();
d = slider2.value();

calcDS();

//translate(width/2,0)
renderFunction();

if(diffraction.checked()==true){
calcSS()
renderEnv();
}

}

function calcDS(){
  for (var x = 0 ; x < y.length; x+=1){
      theta = map(x,0,y.length/2,-.05,.05)
      if(diffraction.checked()==true){
      y[x] = int0 * Math.pow(Math.cos(PI*d*Math.sin(theta)/l),2)*Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)
      }
      else if (diffraction.checked()==false){
        y[x] = int0 * Math.pow(Math.cos(PI*d*Math.sin(theta)/l),2)
      }
    }

}
function calcSS(){
  for (var x = 0 ; x < y.length; x+=1){
      theta = map(x,0,y.length/2,-.05,.05)

      y[x] = int0 * Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)


    }

}
function renderFunction() {
push();
noFill();
strokeWeight(2);
hue = round(map(l,200,1000,280,0));
c = color('hsb('+hue+', 100%, 100%)');
stroke(c)
beginShape();
for (var j = 0; j< y.length; j++){
  curveVertex(j,height/1.5-y[j])
}
endShape();
pop();
}

function renderEnv() {
push();
noFill();
strokeWeight(2);
stroke(100)
beginShape();
for (var j = 0; j< y.length; j++){
  curveVertex(j,height/1.5-y[j])
}
endShape();
pop();
}
gi
