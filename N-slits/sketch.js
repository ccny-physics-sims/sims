var d = 0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;
var slider;
var N = 0;

function setup() {
canvas=createCanvas(windowWidth*.95, 500);
canvas.parent('sketch-holder');
noFill();

LightWavelength = createElement('z2', 'Wavelength');
LightWavelength.position(20, 40);
LightWavelength.parent('sketch-holder');
slider1 = createSlider(400,700,10);
slider1.parent('sketch-holder');
slider1.value(600);
slider1.position(200, 20);
slider1.class("sim-slider gray");

DistanceBTNSlits = createElement('z2', 'Distance between slits');
DistanceBTNSlits.parent('sketch-holder');
DistanceBTNSlits.position(20,80);
slider2 = createSlider(10000,20000,100);
slider2.parent('sketch-holder');
slider2.position(200,60 );
slider2.value(1500);
slider2.class("sim-slider gray");

CentralMaximum = createElement('z2', 'Central Maximum');
CentralMaximum.parent('sketch-holder');
CentralMaximum.position(20, 120);
slider4 = createSlider(0,5,5);
slider4.parent('sketch-holder');
slider4.position(200, 100);
slider4.value(3);
slider4.class("sim-slider gray");

NSlits = createElement('z2','N-slits');
NSlits.parent('sketch-holder');
NSlits.position(20,160);
slider5 = createSlider(2,20,1);
slider5.parent('sketch-holder');
slider5.position(200,140);
slider5.value(8);
slider5.class("sim-slider gray");

 y = new Array(2000);
}

function draw() {

background(255);
noFill();

l = slider1.value();
int0 = slider4.value();
d = slider2.value();
N = slider5.value();
calcPlot();
renderFunction();
}

function calcPlot(){
  for (var x= 0 ; x< y.length; x+=1){
    theta = map(x,0,y.length,-.1,.1)
    y[x] = int0*Math.pow(Math.sin(N*Math.PI*d*Math.sin(theta)/l),2)/(Math.pow(Math.sin(Math.PI*d*Math.sin(theta)/l),2))
    //constrain(y[x],0,200);
}
//constrain(y[x],0,200);
}
function renderFunction() {
push();
noFill();
strokeWeight(2);
hue = round(map(l,350,700,330,0));
c = color('hsb('+hue+', 100%, 100%)');
stroke(c)

beginShape();
for (var j = 0; j< y.length; j++){
  curveVertex(j/2,height/1.2-y[j])
}
endShape();
pop();
}
