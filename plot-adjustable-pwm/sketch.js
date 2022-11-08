let amplitudel;
let timeCounter = 0;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  background(250);
  frameRate(30);
  textSize(18)
  //lets make an array to fill
  y = new Array(200);
  ampMax = min(200,height/4)
  dutyCycleControl = createSlider(0,100,50,0);
  dutyCycleControl.position(30,height*.05)
  dutyCycleControl.parent('sketch-holder')
  dutyCycleControl.class("sim-slider");
  //dutyCycleControl.input(sliderChange);

  dutyCycleControlLabel = createP("Duty Cycle");
  dutyCycleControlLabel.position(30,dutyCycleControl.y);
  dutyCycleControlLabel.parent('sketch-holder')


  omegaControl = createSlider(2,30,15,.1);
  omegaControl.position(30,height*.15)
  omegaControl.parent('sketch-holder')
  omegaControl.class("sim-slider");

  omegaControlLabel = createP("Frequency");
  omegaControlLabel.position(30,omegaControl.y);
  omegaControlLabel.parent('sketch-holder')
  amplitude = height/5
}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, height / 2)
  //x axis
  line(0, 0, width, 0)
  line(0,-ampMax*1.1,0,20)
  widthScale = y.length/width;

  dutyCycle = dutyCycleControl.value();
  dutyCycleControlLabel.html("Duty Cycle = "+dutyCycle.toFixed(0)+"%")
  omega = omegaControl.value();
  period = 2*PI/omega*100
  //calculate this points
  //calcFunction();
  //display discrete points
  //renderPoints();
  //display connected line
  for (i = 0;i<int(width/period);i++){
  renderLines(i);
  }
  renderAvg();
  //showMaxAmplitude();
  //showPeriod();
  noStroke()
  text('time',width*.8,20)
  text('Output',width/2-30,-height/3-30)
  push()
  stroke(0)
  strokeWeight(2)
  translate(timeCounter,0)
  line(0,-amplitude-20,0,0)
  pop()
  //console.log(frameCount%period);
  push()
  stroke(0)
  if(timeCounter%period < period*(dutyCycle/100)){
  fill('red')
  }
  else {
    fill('white')
  }
  
  circle(width/2,-height/3,40)
  pop()
  timeCounter += 1
  if(timeCounter > width*.9){
    timeCounter = 0;
  }
}

function renderAvg() {
  push()
  strokeWeight(2)
  stroke('darkorange')
  line(0,-amplitude*dutyCycle/100,width,-amplitude*dutyCycle/100)
  pop()
  push()
  noStroke()
  text('5 V',-70,-amplitude)
  text('V avg',-70,-amplitude*dutyCycle/100+5)
  text((5*(dutyCycle/100)).toFixed(2),-70,-amplitude*dutyCycle/100+20)
  pop()
}
function renderLines() {
  push()
  translate(i*period,0)
  strokeWeight(3)
  stroke('green')
  line(0,-amplitude,period*dutyCycle/100,-amplitude)
  if (0 < dutyCycle && dutyCycle < 100){
  line(period*dutyCycle/100,-amplitude,period*dutyCycle/100,0)
  }
  line(period*dutyCycle/100,0,period,0)
  if (0 < dutyCycle && dutyCycle < 100){
  line(period,0,period,-amplitude)
  }
  pop()
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    y[x] = amplitude * Math.sign(Math.sin(.01 * x*omega))
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  noStroke()
      fill(0);
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width)
    ellipse(xscaled, -y[x], 5, 5);
  }
}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('red');

  beginShape();
  for (var x = 0; x < y.length; x += 2) {
    xscaled = map(x,0,y.length,0,width)
    vertex(xscaled, -y[x]);
  }
  endShape();
  pop();
}
function showMaxAmplitude(){
  stroke(0)
  line(00,-amplitude,10,-amplitude)
  line(0,amplitude,10,amplitude)
  noStroke()
  text('A (max)',-70,-abs(amplitude)+5)
  text('-A ',-70,abs(amplitude)+5)
}

function showPeriod(){
  stroke(0)
  translate(0,-80)
  line(PI/(2*.01*omega*widthScale),0,PI/(2*.01*omega*widthScale),-30)
  line(5*PI/(2*.01*omega*widthScale),0,5*PI/(2*.01*omega*widthScale),-30)
  line(PI/(2*.01*omega*widthScale),-15,5*PI/(2*.01*omega*widthScale),-15)
  noStroke()
  text('T (period)',(PI/(2*.01*omega*widthScale)+5*PI/(2*.01*omega*widthScale))/2,-30)
}
