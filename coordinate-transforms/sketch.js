
let primeSpeed;
let counter = 0;
let c = 10000;
let refSpeed = 0;
let running = true;
let origin;
let unitSpacing;
let primedSystemColor = "#4287f5"
function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  origin = createVector(width/3,2*height/3)

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.9,30);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")





  vslider = createSlider(0,3,0,.01);
  vslider.style('width', '200px');
  vslider.input(vsliderChange);
  vslider.position(50,30);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  refvslider = createSlider(0,3,0,.01);
  refvslider.style('width', '200px');
  refvslider.input(refvsliderChange);
  refvslider.position(50,vslider.y+70);
  refvslider.class('sim-slider');
  refvslider.parent('sketch-holder');

  vsliderLabel = createP("Speed of Event Motion: ");
  vsliderLabel.parent('sketch-holder');
  vsliderLabel.position(vslider.x,vslider.y+10);
  vsliderLabel.style("font-family","Times, serif")
  vsliderLabel.style("font-size","1.2em")

  refvsliderLabel = createP("Speed of Moving Frame: ");
  refvsliderLabel.parent('sketch-holder');
  refvsliderLabel.position(refvslider.x,refvslider.y+10);
  refvsliderLabel.style("font-family","Times, serif")
  refvsliderLabel.style("font-size","1.2em")

  unprimetlabel = createP("t")
  unprimetlabel.parent('sketch-holder');
  unprimetlabel.position(origin.x-30,20)
  unprimetlabel.style("font-size","2em")
  unprimetlabel.style("font-style","italic")
  unprimetlabel.style("font-family","Times, serif")

  unprimeXlabel = createP("x")
  unprimeXlabel.parent('sketch-holder');
  unprimeXlabel.position(width-30,origin.y+20)
  unprimeXlabel.style("font-size","2em")
  unprimeXlabel.style("font-style","italic")
  unprimeXlabel.style("font-family","Times, serif")

  primetlabel = createP("t'")
  primetlabel.parent('sketch-holder');
  primetlabel.position(origin.x-20,20)
  primetlabel.style("font-size","2em")
  primetlabel.style("font-style","italic")
  primetlabel.style("color",primedSystemColor)
  primetlabel.style("font-family","Times, serif")

  primeXlabel = createP("x'")
  primeXlabel.parent('sketch-holder');
  primeXlabel.position(width-20,origin.y+20)
  primeXlabel.style("font-size","2em")
  primeXlabel.style("font-style","italic")
  primeXlabel.style("color",primedSystemColor)
  primeXlabel.style("font-family","Times, serif")

  frameRate(19);

  eventGroup1 = new EventGroup(vslider.value())
  eventGroup1.emit(21)
  eventGroup1.fillColor = color('hsl(160, 100%, 50%)');

  transFrame1 = new TranslatingReferenceFrame("#000")
  transFrame2 = new TranslatingReferenceFrame("#4287f5")
  //eventGroup1.update(vslider.value())

  // eventGroup2 = new EventGroup(vslider.value())
  // eventGroup2.emit(10)
  // eventGroup2.fillColor = color('hsl(20, 100%, 50%)');
  //
  // eventGroup3 = new EventGroup(vslider.value())
  // eventGroup3.emit(10)
  // eventGroup3.fillColor = color('hsl(160, 100%, 50%)');

  //noLoop();
  unitSpacing = 30;

}

function draw() {
  background(250);
  //makeAxis();

  translate(origin.x,origin.y)
  //line(-width/2,height/2,width/2,height/2)
  //line(width/2,0,width/2,height)
  //objPrimeSpeed = vslider.value();
  // obj2speed = 0.0;
  // makeObjPrime(10,objPrimeSpeed);
  // makeObj(10,obj2speed);
  primeSpeed = vslider.value()
  refSpeed = refvslider.value()
  stroke(0)
  noFill()
  vsliderLabel.html("Speed of Event Motion: "+primeSpeed+" <i>AU</i>")
  refvsliderLabel.html("Speed of Moving Frame: "+refSpeed+" <i>AU</i>")

  //primeXlabel.position(width-20,origin.y-map(vslider.value(),0,1,0,height))
  primeXlabel.position(width-60,origin.y-(width-origin.x)*atan2(vslider.value(),c)+20)
  primetlabel.position(-20+origin.x+refSpeed*550,50)
  eventGroup1.update(primeSpeed)
  eventGroup1.show(transFrame2.hexColor)

  transFrame2.update(refSpeed)
  transFrame2.show()


    transFrame1.update(0)
    transFrame1.show()
  // eventGroup2.update(0)
  // eventGroup2.show()
  //
  // eventGroup3.update(0.5*primeSpeed)
  // eventGroup3.show()
if (running) {
if (counter<height/2){
  counter+=2;
}
  else {
    counter =0;
  }
  line(-width,-counter,width,-counter)
  //console.log(counter);
}
}



function makeAxis() {
  push()
  translate(origin.x,origin.y)
  line(0,height/2,width,height/2)
  line(width/2,0,width/2,height)
  pop()
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

class TranslatingReferenceFrame {
  constructor(hexColor){
    this.hue = hue
    this.hexColor  = hexColor
    //this.speed = speed
  }

  update(speed){
    this.speed = speed
  }


  show(){
    //let lineColor = color('hsl('+this.hue+', 100%, 50%)')
    let lineColor = this.hexColor
    stroke(lineColor)
    let unit = 10
    let tickCount = 10
    let primedUnit = unit
    push()
    noFill()
    beginShape()
      for (var i = -50;i<50;i++){
      //ellipse(i*this.speed,-i*10,1)
      curveVertex(i*this.speed*unitSpacing,-i*unitSpacing);
      }
    endShape()
    fill(lineColor)
    noStroke()
    for (var i = 0;i<50;i++){

    rect(unitSpacing*i*this.speed-5,-i*unitSpacing-0.5,10,2)
    stroke(200,200,200,50)
    line(0,-i*unitSpacing,width,-i*unitSpacing)
    line(i*unitSpacing,0,i*unitSpacing,-height)
    }
    stroke(lineColor)
    beginShape()
      for (var i = -50;i<50;i++){
      //ellipse(i*20,0,3)
      curveVertex(-i*unitSpacing,0);
      }
    endShape()
    fill(lineColor)
    noStroke()
    for (var i = 0;i<50;i++){

    rect(i*unitSpacing,-5,1,10)
  }
    // push()
    // rotate(-atan2(this.speed,1))
    // line(-width,0,width,0)
    // for (var i=0;i<tickCount;i++){
    //   translate(primedUnit,0)
    //   line(0,-5,0,5)
    // }
    // pop()
    // push()
    // rotate(atan2(this.speed,1))
    // line(0,-height,0,height)
    // for (var i=0;i<tickCount;i++){
    //   translate(0,-primedUnit)
    //   line(-5,0,5,0)
    // }
     pop()
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
      this.events.push(new AnEvent(i, 30));
    }
  }
  update(primeSpeed,eventSpacing) {
    for (let event of this.events) {
          event.update(primeSpeed,eventSpacing);
        }
      }

  show(strokeColor) {
    this.strokeColor = strokeColor;
    for (let event of this.events) {
          event.show(this.fillColor,this.strokeColor);
        }
  }

}

class AnEvent {
  constructor(eventNo,eventSpacing) {
    this.eventNo = eventNo;
    this.eventSpacing = eventSpacing;
    //this.speed = vslider.value()
  }
  update(speed) {
    this.speed = speed;
    this.gamma = 1/(sqrt(1-(this.speed**2)/(c**2)))
    this.xpos = speed*this.time//-.002*this.time**2
    this.time = this.eventNo*this.eventSpacing
    this.xposPrime = this.xpos
    this.timePrime = this.time
    //this.xposPrime = this.gamma*(this.xpos+this.speed*this.time)
    //this.timePrime = this.gamma*(this.eventNo*1-this.speed*this.xpos/(c**2))
    //console.log(this.speed)
  }
  show(theColor,strokeColor) {

    if (abs(this.timePrime-counter)<10){
      fill('red')
    }
    else {
      noFill()
    }
    ellipse(this.xposPrime,-this.timePrime,10)
    stroke(strokeColor)
    line(this.xposPrime,-this.timePrime,this.xposPrime-refSpeed*this.time,0)
    line(this.xposPrime,-this.timePrime,refSpeed*this.time,-this.timePrime)

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
  refSpeed = vslider.value()
  //redraw();
}
