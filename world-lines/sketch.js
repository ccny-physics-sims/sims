
let primeSpeed;
let counter = 0;
let c = 1;
let refSpeed = 0;
let systems = [];
let running = false;
let polySynth;
let numberOfLines = 11;

var pitches = [57,60,62,64,67,69,72,74,76,79,81,84]

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.9,30);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")

  colorMode(HSB, 100);

  vslider = createSlider(0,.99,.5,.01);
  vslider.style('width', '200px');
  vslider.input(vsliderChange);
  vslider.position(50,50);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  refvslider = createSlider(-.99,.99,0,.01);
  refvslider.style('width', '200px');
  refvslider.input(refvsliderChange);
  refvslider.position(50,vslider.y+50);
  refvslider.class('sim-slider');
  refvslider.parent('sketch-holder');





  frameRate(19);
  for (var i=0;i<numberOfLines;i++){
  systems.push(new EventGroup(0.0));
  systems[i].emit(10)
  systems[i].fillColor = color(0,100,100)
  }

  //noLoop()
}

function draw() {
  background(250);
  stroke(0)
strokeWeight(1)
  translate(width/2,height/2)
  //objPrimeSpeed = vslider.value();
  // obj2speed = 0.0;
  // makeObjPrime(10,objPrimeSpeed);
  // makeObj(10,obj2speed);

  refSpeed = refvslider.value()
  primeSpeed = vslider.value()
  stroke(0)
  noFill()

    for (var i=0;i<numberOfLines;i++){
      systems[i].update((( primeSpeed * (i-5) / 6 )  + refSpeed )/(1+primeSpeed*refSpeed/c**2))
      systems[i].show()
    }
    stroke(0)
    makeAxis();


if (running) {
if (counter<height/2){
  counter+=1;
}
  else {
    counter =0;
  }
}
  stroke(50)
  line(-width,-counter,width,-counter)
  rotate(HALF_PI/2)
  stroke('orange')
  strokeWeight(2)
  makeAxis()
  //console.log(counter);

}



function makeAxis() {
  line(0,-height,0,height)
  line(-width,0,width,0)
}

function turnonoff() {
  if (!running){
    running = true;

    loop();
  }
  else if (running) {
    running = false;
    noLoop();
  }
}

class EventGroup {
  constructor(speed) {
    this.speed = speed
    this.events = []
    this.fillColor = 0;
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
          event.show(this.fillColor);
        }
  }

}

class AnEvent {
  constructor(eventNo) {
    this.eventNo = eventNo;
    //this.speed = vslider.value()
  }
  update(speed) {
    this.speed = speed;
    this.gamma = 1/(sqrt(1-(this.speed**2)/(c**2)))
    this.xpos = 0
    this.time = this.eventNo*40
    this.xposPrime = this.gamma*(this.xpos+this.speed*this.time)
    this.timePrime = this.gamma*(this.eventNo*40-this.speed*this.xpos/(c**2))
    //console.log(this.speed)
  }
  show(theColor) {

    stroke(0,0,80)
    line(0,0,this.xposPrime,-this.timePrime)

    if (abs(this.timePrime-counter)<7){
      stroke(0)
      fill(255)

    }
    else {
      noStroke()
      fill(this.eventNo*10,100,80)
    }

    ellipse(this.xposPrime,-this.timePrime,7)
    //ellipse(0,0,10)

  }
}



function vsliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  primeSpeed = vslider.value()
  //redraw();
}

function refvsliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  refSpeed = refvslider.value()
  //redraw();
}
