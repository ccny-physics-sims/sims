var d = 0.0;
var a=0.0;
var l=0.0;
var y;
var theta=0.0;
var int0 = 0.0;
var x = 0.0 ;
var slider;
const controlSpacing = 40

function setup() {
canvas = createCanvas(windowWidth*.8, .7*windowHeight);
canvas.parent('sketch-holder');
noFill();
frameRate(30);



LightWavelength = createElement('p', 'Wavelength');
LightWavelength.position(20, 20+controlSpacing*0);
LightWavelength.parent('sketch-holder');

slider1 = createSlider(200,1000,400,10);
slider1.parent('sketch-holder');
slider1.position(190, controlSpacing);
slider1.class("sim-slider gray");


DistanceBTNSlits = createElement('p', 'Distance between slits');
DistanceBTNSlits.parent('sketch-holder');
DistanceBTNSlits.position(20,20+controlSpacing*1);
slider2 = createSlider(10000,50000,100);
slider2.parent('sketch-holder');
slider2.position(190,controlSpacing*2 );
slider2.value(50000);
slider2.class("sim-slider gray");

SlitWidth = createElement('p', 'Slit Width');
SlitWidth.parent('sketch-holder');
SlitWidth.position(20,20+controlSpacing*2);
slider3 = createSlider(1,16000,10);
slider3.parent('sketch-holder');
slider3.position(190, controlSpacing*3);
slider3.value(8000);
slider3.class("sim-slider gray");

CentralMaximum = createElement('p', 'Central Maximum');
CentralMaximum.position(20, 20+controlSpacing*3);
CentralMaximum.parent('sketch-holder');
slider4 = createSlider(0,1,.5,.01);
slider4.parent('sketch-holder');
slider4.position(190, controlSpacing*4);

slider4.class("sim-slider gray");

 y = new Array(700);


 diffraction = createCheckbox('include diffraction', false);
 diffraction.parent('sketch-holder');
 diffraction.position(width*.7,80)
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
renderFringes();

if(diffraction.checked()==true){
calcSS()
renderEnv();
}

}

function calcDS(){
  for (var x = 0 ; x < y.length; x+=1){
      theta = map(x,0,y.length,-.05,.05)
      if(diffraction.checked()==true){
      y[x] = height/2* int0 * Math.pow(Math.cos(PI*d*Math.sin(theta)/l),2)*Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)
      }
      else if (diffraction.checked()==false){
        y[x] = height/2* int0 * Math.pow(Math.cos(PI*d*Math.sin(theta)/l),2)
      }
    }

}
function calcSS(){
  for (var x = 0 ; x < y.length; x+=1){
      theta = map(x,0,y.length,-.05,.05)

      y[x] = height/2 * int0 * Math.pow(Math.sin(PI*a*Math.sin(theta)/l)/(PI*a*Math.sin(theta)/l),2)


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

function renderEnv() {
push();
noFill();
strokeWeight(2);
stroke(100)
beginShape();
for (var j = 0; j< y.length; j++){
  jScaled = map(j,0,y.length,0,width)
  curveVertex(jScaled,height*.8-y[j])
}
endShape();
pop();
}
