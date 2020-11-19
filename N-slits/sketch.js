var d = 0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;
var N = 0;
const controlSpacing = 40

function setup() {
canvas=createCanvas(windowWidth*.8, .7*windowHeight);
canvas.parent('sketch-holder');
noFill();

LightWavelength = createElement('p', 'Wavelength');
LightWavelength.position(20, 20+controlSpacing*0);
LightWavelength.parent('sketch-holder');
slider1 = createSlider(200,1000,400,10);
slider1.parent('sketch-holder');
slider1.position(200, controlSpacing);
slider1.class("sim-slider gray");

DistanceBTNSlits = createElement('p', 'Distance between slits');
DistanceBTNSlits.parent('sketch-holder');
DistanceBTNSlits.position(20,20+controlSpacing*1);
slider2 = createSlider(10000,20000,100);
slider2.parent('sketch-holder');
slider2.position(200,controlSpacing*2 );
slider2.value(1500);
slider2.class("sim-slider gray");

CentralMaximum = createElement('p', 'Central Maximum');
CentralMaximum.parent('sketch-holder');
CentralMaximum.position(20, 20+controlSpacing*2);
slider4 = createSlider(0,1,.5,.01);
slider4.parent('sketch-holder');
slider4.position(200, controlSpacing*3);
slider4.class("sim-slider gray");

NSlits = createElement('p','N-slits');
NSlits.parent('sketch-holder');
NSlits.position(20,20+controlSpacing*3);
slider5 = createSlider(2,20,8,1);
slider5.parent('sketch-holder');
slider5.position(200,controlSpacing*4);
slider5.class("sim-slider gray");

 y = new Array(2200);
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
renderFringes();
}

function calcPlot(){
  for (var x= 0 ; x< y.length; x+=1){
    theta = map(x,0,y.length,-.1,.1)
    y[x] = height/2*int0*.01*Math.pow(Math.sin(N*Math.PI*d*Math.sin(theta)/l),2)/(Math.pow(Math.sin(Math.PI*d*Math.sin(theta)/l),2))
    //constrain(y[x],0,200);
}
//constrain(y[x],0,200);
}
function renderFunction() {
push();
noFill();
strokeWeight(2);
hueFromLambda = round(map(l,200,1000,280,0));
c = color('hsb('+hueFromLambda+', 100%, 100%)');
stroke(c)

beginShape();
for (var j = 0; j< y.length; j++){
  jScaled = map(j,0,y.length,0,width)
  curveVertex(jScaled,height*.8-y[j])
}
endShape();
pop();
}

function renderFringes() {
  push()
  hueFromLambda = round(map(l,200,1000,280,0));


  for (var j = 0; j< y.length; j++){
    theta = map(j,0,y.length,-PI/2,PI/2)
    alphaFromInt = map(y[j],0,height/2*int0,0,1)
    c = color('hsba('+hueFromLambda+', 100%, 100%,' + alphaFromInt*2 + ')');

    stroke(c)
    strokeWeight(1)
    jScaled = map(j,0,y.length,0,width)
    line(jScaled,height,jScaled,height*.9)

    //curveVertex(jScaled,height*.8-y[j])
  }

  pop()
  if(int0 != 0){
  stroke(color('hsba('+hueFromLambda+', 100%, 100%,' + 1 + ')'));
  line(width/2,height,width/2,height*.9)
  }
}
