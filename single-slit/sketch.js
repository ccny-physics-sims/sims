var a=0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;


const controlSpacing = 40

function setup() {
canvas = createCanvas(windowWidth, 0.9*windowHeight);
canvas.parent('sketch-holder');
fill(255, 0, 0);
sliderWidth = min(width/3,200)

LightWavelength = createElement('p', 'Wavelength');
LightWavelength.parent('sketch-holder');
LightWavelength.position(20, 20+controlSpacing*0);

slider1 = createSlider(200,1000,300);
slider1.parent('sketch-holder');
//slider1.value(200);
slider1.position(150, controlSpacing*1);
slider1.class("sim-slider gray");
slider1.size(sliderWidth,0)

SlitWidth = createElement('p', 'Slit Width');
SlitWidth.position(20,20+controlSpacing*1);
SlitWidth.parent('sketch-holder');
slider3 = createSlider(1,1000,600);
slider3.parent('sketch-holder');
slider3.position(150, controlSpacing*2);
//slider3.value(50);
slider3.class("sim-slider gray");
slider3.size(sliderWidth,0)

CentralMaximum = createElement('p', 'Central Maximum');
CentralMaximum.parent('sketch-holder');
CentralMaximum.position(20, 20+controlSpacing*2);
slider4 = createSlider(0,1,.5,.01);
slider4.parent('sketch-holder');
slider4.position(150, controlSpacing*3);
slider4.class("sim-slider gray");
slider4.size(sliderWidth,0)

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
renderFringes();

stroke(100)
line(0,height*.8,width,height*.8)
}

function calcPlot(){
    for (var x= 0 ; x< y.length; x+=1){
          theta = map(x,0,y.length,-PI/2,PI/2)

          y[x] = height/2*int0*Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)
          }

}

function renderFringes() {
  push()
  hueFromLambda = round(map(l,200,1000,280,0));


  for (var j = 0; j< y.length; j++){
    theta = map(j,0,y.length,-PI/2,PI/2)
    alphaFromInt = map(y[j],0,height/2*int0,0,1)
    c = color('hsba('+hueFromLambda+', 100%, 100%,' + alphaFromInt*2 + ')');

    stroke(c)
    strokeWeight(2)
    jScaled = map(j,0,y.length,0,width)
    line(jScaled,height*.9,jScaled,height*.85)

    //curveVertex(jScaled,height*.8-y[j])
  }

  pop()
  if(int0 != 0){
  stroke(color('hsba('+hueFromLambda+', 100%, 100%,' + 1 + ')'));
  strokeWeight(2)
  line(width/2,height*.9,width/2,height*.85)
}

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
