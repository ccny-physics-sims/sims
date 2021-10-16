
let primeSpeed;
let counter = 0;
let c = 1;
let refSpeed = 0;
let systems = [];
let hyperbolas = [];
let running = false;
let polySynth;
let numberOfLines = 5;
let numberOfEvents = 20;
let eventSpacing;
let sliders = [];
let sliderLabel = [];
let checkbox;
let soundonoff = true;

var pitches = [57,60,62,64,67,69,72,74,76,79,81,84]
var pentatonic_scale = ['C2','E2','G2','A3','C3','E3','G3','A4','C4','E4','G4','A5','C5','E5','G5','A6','C6','E6','G6','A7','C7'];
//var notes = ['A','B','C#','D','E','F#','G#']
//var notes = ['A','C#','E','A','E']
var notes = ['C5','E5','G5','C6','E6']

//var notes = ['A','C#','E','F']

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(20,20);
  onoff.class("sim-button slim");
  onoff.style("background", "#aeae")
  onoff.parent("sketch-holder");


  resetTime = createButton("Reset");
  resetTime.mouseClicked(resetCounter);
  resetTime.position(onoff.x,onoff.y+50);
  resetTime.class("sim-button slim");

  resetTime.parent("sketch-holder");

  checkbox = createCheckbox('Sound?', true);
  checkbox.changed(turnSoundOnOff);
  checkbox.parent("sketch-holder");
  checkbox.position(onoff.x,resetTime.y+50)

  checkboxC = createCheckbox('Relativisitic?', true);
  checkboxC.changed(changeSpeedofLight);
  checkboxC.parent("sketch-holder");
  checkboxC.position(onoff.x,checkbox.y+50)

  sliderWidth = str(min(200,.2*width))
  colorMode(HSB, 100);
  for (var i=0;i<numberOfLines;i++) {
    sliders[i] = createSlider(0,.99,.2*i,.01);
    sliders[i].style('width', '50');
    sliders[i].parent('sketch-holder');
    sliders[i].position(80,checkboxC.y+20+50*(i+1));
    sliders[i].class('sim-slider');
    sliders[i].input(sliderChange);
    sliders[i].size(sliderWidth,0)

    sliderLabel[i] = createP('v')
    sliderLabel[i].parent('sketch-holder');
    sliderLabel[i].position(10,sliders[i].y-18);

  }

  frameRate(20);

  polySynth = new p5.PolySynth();


  for (var i=0;i<numberOfLines;i++){
  systems.push(new EventGroup(0.0,i));
  systems[i].emit(numberOfEvents)
  systems[i].fillColor = color(0,100,100)
  }

  for (var i=0;i<numberOfEvents;i++){
  hyperbolas.push(new InvHyper(i));
  hyperbolas[i].calculateHyperbolas();
  }

  eventSpacing = (2*height/3)/numberOfEvents
  for (var i=0;i<numberOfLines;i++) {
    sliderLabel[i].html('v = '+sliders[i].value()+ '<i>c</i>');
  }


  //noLoop()
}

function draw() {
  background(250);
  stroke(0)
  strokeWeight(1)
  translate(width/2,2*height/3)
  //objPrimeSpeed = vslider.value();
  // obj2speed = 0.0;
  // makeObjPrime(10,objPrimeSpeed);
  // makeObj(10,obj2speed);

  refSpeed = 0
  //primeSpeed = vslider.value()
  stroke(0)
  noFill()

    for (var i=0;i<numberOfLines;i++){
      systems[i].update(sliders[i].value())
      systems[i].show()
    }
    stroke(0)
    makeAxis();


if (running) {
if (counter<2*height/3){
  counter+=1;
}
  else {
    counter =0;
  }
}


  stroke(50)
  line(0,-counter,width,-counter)
  if(c==1){
    for (var i=0;i<numberOfEvents;i++){
    hyperbolas[i].show();

    }
  rotate(HALF_PI/2)
  stroke('orange')
  strokeWeight(2)
  makeAxis()
}
  //console.log(counter);

}



function makeAxis() {
  line(0,-height,0,height)
  line(-width,0,width,0)
}
function resetCounter() {
  counter = 0;
}

function changeSpeedofLight() {
  if (c == 1) {
    c = 1000
  }
  else if (c==1000){
    c = 1
  }
}
function turnonoff() {
  if (!running){
    userStartAudio();
    running = true;
    onoff.html('stop')
    //loop();
  }
  else if (running) {
    running = false;
    onoff.html('start')
    //noLoop();
  }
}

class EventGroup {
  constructor(speed,systemNo) {
    this.speed = speed
    this.events = []
    this.fillColor = 0;
    this.systemNo = systemNo
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.events.push(new AnEvent(i, this.speed));
    }
  }
  update(primeSpeed) {
    for (let event of this.events) {
          event.update(primeSpeed);
        }
      }

  show() {
    for (let event of this.events) {
          event.show(this.fillColor,this.systemNo);
        }

  }

}

class AnEvent {
  constructor(eventNo) {
    this.eventNo = eventNo;
    this.played = false;
    //this.speed = vslider.value()
  }
  update(speed) {
    this.speed = speed;
    this.gamma = 1/(sqrt(1-(this.speed**2)/(c**2)))
    this.xpos = 0
    this.time = this.eventNo*eventSpacing
    this.xposPrime = this.gamma*(this.xpos+this.speed*this.time)
    this.timePrime = this.gamma*(this.eventNo*eventSpacing-this.speed*this.xpos/(c**2))
    //console.log(this.speed)
  }
  show(theColor,theSystem) {
    this.theSystemNo = theSystem
    stroke(0,0,80)
    line(0,0,this.xposPrime,-this.timePrime)
    fill(map(this.eventNo,0,numberOfEvents,0,100),100,80)
    noStroke()
    if (abs(this.timePrime-counter)<3 ){
      //stroke(0)
      //fill(255)
        ellipse(this.xposPrime,-this.timePrime,10)
      if (!this.played && soundonoff){
        //console.log('trigger')

        //let noteToPlay = notes[this.eventNo%7]+str(1+this.theSystemNo+Math.floor(this.eventNo/7))
        //let noteToPlay = notes[this.eventNo%notes.length]+str(3+Math.floor(this.eventNo/notes.length))
          let noteToPlay = notes[this.theSystemNo]
        //console.log(noteToPlay);
        polySynth.play(noteToPlay, .5, 0, .1);
        this.played = true
      }
      //this.played = false;
    }
    else {
      this.played = false
      noStroke()

      ellipse(this.xposPrime,-this.timePrime,7)
    }



  }
}

class InvHyper {
  constructor(eventNo) {
    this.yvalues = new Array(31);
    this.xvalues = new Array(31);
    this.eventNo = eventNo;

  }
  calculateHyperbolas() {
    for (var i = 0;i<this.yvalues.length;i++){
      this.xvalues[i] = i-this.yvalues.length/2
      this.yvalues[i] = sqrt(((this.xvalues[i])**2)+((this.eventNo+1)*23.22/40)**2)
    }
  }
  show() {
    noFill()
    stroke(map(this.eventNo,0,numberOfEvents,0,100),100,80,20)

    beginShape()
    for (var i = 0;i<this.yvalues.length;i++){
      //ellipse(this.xvalues[i],-this.yvalues[i],2)
      curveVertex(this.xvalues[i]*40,-this.yvalues[i]*40)
    }
    endShape()
  }
}

function turnSoundOnOff() {
  if (!soundonoff) {
    soundonoff = true;
  }
  else {
    soundonoff = false;
  }
}
function sliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  //primeSpeed = vslider.value()
  for (var i=0;i<numberOfLines;i++) {
    sliderLabel[i].html('v = '+sliders[i].value()+ '<i>c</i>');
  }
}

function refvsliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  refSpeed = refvslider.value()
  //redraw();
}
