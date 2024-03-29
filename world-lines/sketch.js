
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



function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.9,30);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")

  colorMode(HSB, 100);

  vslider = createSlider(0,.99,.85,.01);
  vslider.style('width', '200px');
  vslider.input(vsliderChange);
  vslider.position(50,50);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  refvslider = createSlider(-.99,.99,.64,.01);
  refvslider.style('width', '200px');
  refvslider.input(refvsliderChange);
  refvslider.position(50,vslider.y+50);
  refvslider.class('sim-slider');
  refvslider.parent('sketch-holder');



  frameRate(20);




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

  refSpeed = refvslider.value()
  primeSpeed = vslider.value()
  stroke(0)
  noFill()

    for (var i=0;i<numberOfLines;i++){
      systems[i].update((( primeSpeed * (i-(numberOfLines-2)) / (numberOfLines-1) )  + refSpeed )/(1+primeSpeed*refSpeed/c**2))
      systems[i].show()
    }
    stroke(0)
    makeAxis();
    for (var i=0;i<numberOfEvents;i++){
    hyperbolas[i].show();

    }

if (running) {
if (counter<2*height/3){
  counter+=1;
}
  else {
    counter =0;
  }
}
  stroke(50)
  strokeWeight(1)
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
    //loop();
  }
  else if (running) {
    running = false;
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

    if (abs(this.timePrime-counter)<3 ){
      //stroke(0)
      //fill(255)
      ellipse(this.xposPrime,-this.timePrime,9)
      }
      //this.played = false;

    else {
      this.played = false
      noStroke()
      fill(map(this.eventNo,0,numberOfEvents,0,100),100,80)
      ellipse(this.xposPrime,-this.timePrime,7)
    }

    // if (abs(this.timePrime-counter)==1)
    // {
    //   console.log('triggered')
    //   //polySynth.play('C3', .5, 0, .2);
    //
    // }

    //ellipse(0,0,10)



  }
}

class InvHyper {
  constructor(eventNo) {
    this.yvalues = new Array(41);
    this.xvalues = new Array(41);
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
    strokeWeight(5)
    beginShape()
    for (var i = 0;i<this.yvalues.length;i++){
      //ellipse(this.xvalues[i],-this.yvalues[i],2)
      curveVertex(this.xvalues[i]*40,-this.yvalues[i]*40)
    }
    endShape()
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
