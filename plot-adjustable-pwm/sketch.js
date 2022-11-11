let amplitudel;
let timeCounter = 0;
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  sliderWidth = min(width/3,200)
  sliderVertSpace = min(height*.15,100)
  background(250);
  frameRate(30);
  textSize(18)

  ampMax = min(200,height/4)
  dutyCycleControl = createSlider(0,100,50,0);
  dutyCycleControl.position(30,height*.05)
  dutyCycleControl.parent('sketch-holder')
  dutyCycleControl.class("sim-slider");
  dutyCycleControl.size(sliderWidth,0)


  dutyCycleControlLabel = createP("Duty Cycle");
  dutyCycleControlLabel.position(30,dutyCycleControl.y+10);
  dutyCycleControlLabel.parent('sketch-holder')


  omegaControl = createSlider(2,30,15,.1);
  omegaControl.position(30,dutyCycleControl.y+sliderVertSpace)
  omegaControl.parent('sketch-holder')
  omegaControl.class("sim-slider");
  omegaControl.size(sliderWidth,0)

  omegaControlLabel = createP("Frequency");
  omegaControlLabel.position(30,omegaControl.y+10);
  omegaControlLabel.parent('sketch-holder')
  amplitude = height/5
}


function draw() {
  background(255)
  stroke(0)
  //move things to the middle
  translate(80, height / 1.7)
  //x axis
  line(0, 0, width, 0)
  line(0,-ampMax*1.1,0,20)
  //widthScale = y.length/width;

  dutyCycle = dutyCycleControl.value();
  dutyCycleControlLabel.html("Duty Cycle = "+dutyCycle.toFixed(0)+"%")
  omega = omegaControl.value();
  period = 2*PI/omega*100

  for (i = 0;i<int(width/period);i++){
  renderLines(i);
  }
  renderAvg();

  noStroke()
  text('time',width*.8,20)
  text('Output',2*width/3-25,-height/2.5+40)
  push()
  stroke(0)
  strokeWeight(2)
  translate(timeCounter,0)
  line(0,-amplitude-20,0,0)
  pop()

  push()
  stroke(0)
  if(timeCounter%period < period*(dutyCycle/100)){
  fill('red')
  }
  else {
    fill('white')
  }
  
  circle(2*width/3,-height/2.5,40)
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

