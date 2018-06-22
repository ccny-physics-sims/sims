var a=0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;
var slider;

function setup() {
createCanvas(800, 800);
fill(255, 0, 0);

LightWavelength = createElement('p', 'Wavelength');
LightWavelength.position(20, 35);
slider1 = createSlider(200,1000,100);
slider1.value(12);
slider1.position(150, 30);
slider1.class("sim-slider gray");

SlitWidth = createElement('p', 'Slit Width');
SlitWidth.position(20,75);
slider3 = createSlider(1,1000,10);
slider3.position(150, 70);
slider3.value(50);
slider3.class("sim-slider gray");

CentralMaximum = createElement('p', 'Central Maximum');
CentralMaximum.position(20, 115);
slider4 = createSlider(0,255,10);
slider4.position(150, 110);
slider4.value(140);
slider4.class("sim-slider gray");

 y = new Array(700);
}

function draw() {

background(255);
noFill();

l = slider1.value();
a = slider3.value();
int0 = slider4.value();

calcPlot();
renderFunction();
}

function calcPlot(){
    for (var x= 0 ; x< y.length; x+=1){
          theta = map(x,0,y.length,-PI/2,PI/2)
          y[x] = int0*Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)
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
  curveVertex(j,height/2-y[j])
}
endShape();
pop();
}
