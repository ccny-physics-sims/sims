
let primeSpeed;
let counter = 0;
let c = 1;
let refSpeed = 0;
let unprimedUnit = 30;
let primedUnit = 30;
let tickCount = 20;
let events = [];
let origin;
let primedSystemColor = "#146effff"

let numberOfEvents = 10;
let hyperbolas = [];
function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")
  origin = createVector(width/3,2*height/3)


  onoff = createButton("clear");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.9,30);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")

  undo = createButton("undo");
  undo.mouseClicked(undolast);
  undo.position(windowWidth*.95,30);
  undo.class("sim-button");
  undo.parent("sketch-holder")

  vslider = createSlider(-.99,.99,.0,.01);
  vslider.style('width', '220px');
  vslider.input(vsliderChange);
  vslider.position(50,20);
  vslider.class('sim-slider');
  vslider.parent('sketch-holder');

  vsliderLabel = createP("Speed of Primed System: ");
  vsliderLabel.parent('sketch-holder');
  vsliderLabel.position(vslider.x,vslider.y+2);
  vsliderLabel.style("font-family","Times, serif")
  vsliderLabel.style("font-size","1.2em")

  refvslider = createSlider(-.99,.99,0,.01);
  refvslider.style('width', '220px');
  refvslider.input(refvsliderChange);
  refvslider.position(50,vslider.y+50);
  refvslider.class('sim-slider');
  refvslider.parent('sketch-holder');

  refvsliderLabel = createP("Speed of Primed System: ");
  refvsliderLabel.parent('sketch-holder');
  refvsliderLabel.position(refvslider.x,refvslider.y+10);
  refvsliderLabel.style("font-family","Times, serif")
  refvsliderLabel.style("font-size","1.2em")

  instructionsLabel = createP("Click to add events &rarr; ");
  instructionsLabel.parent('sketch-holder');
  instructionsLabel.position(vslider.x,refvslider.y+50);
  instructionsLabel.style("font-family","Times, serif")
  instructionsLabel.style("font-size","1.2em")

  unprimetlabel = createP("ct")
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

  primetlabel = createP("ct'")
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

  frameRate(30);

  aPrimeAxis = new primeAxis(primedSystemColor);
  aRefAxis = new primeAxis("#000");
  refSpeed = refvslider.value()
  primeSpeed = vslider.value()
  primeSpeed = primeSpeed+refSpeed/(1+primeSpeed*refSpeed/c**2)

    for (var i=0;i<numberOfEvents;i++){
  hyperbolas.push(new InvHyper(i));
  hyperbolas[i].calculateHyperbolas();
  }

  eventSpacing = (2*height/3)/numberOfEvents
  //noLoop();
}

function draw() {
  background(250);
  //makeAxis();
  stroke(200)
  //primeSpeed = vslider.value()
  
  if (mouseY>100){
    line(width,mouseY,0,mouseY)
    line(mouseX,0,mouseX,height)

    push()
    translate(mouseX,mouseY)
    rotate(-atan2(primeSpeed,c)+PI)
    alpha = atan2(primeSpeed,c);
    betaA = HALF_PI-2*alpha;
    gamma = PI-this.alpha-betaA;
    timeLineLength = ((mouseX+mouseY*tan(alpha))*sin(gamma))/sin(betaA)
    stroke("#91b6f2ff")
    line(0,0,timeLineLength,0)
    
    rotate(PI)
    line(0,0,timeLineLength,0)
    pop()

    push()
    translate(mouseX,mouseY)
    rotate(-HALF_PI+alpha)
    rotate(PI)
    spaceLineLength = ((mouseY+mouseX*tan(alpha))*sin(gamma))/sin(betaA)
    stroke("#91b6f2ff")
    line(0,0,spaceLineLength,0)
    rotate(PI)
    line(0,0,spaceLineLength,0)
    pop()
    //line(mouseX,mouseY,mouseX*vslider.value(),origin.y)

}

vsliderLabel.html("Speed of Primed System: "+vslider.value()+" <i>c</i>")

refvsliderLabel.html("Speed of UnPrimed System: "+refvslider.value()+" <i>c</i>")

//primeXlabel.position(width-20,origin.y-map(vslider.value(),0,1,0,height))
primeXlabel.position(width-50,origin.y-(width-origin.x)*atan2(vslider.value(),c)-20)
primetlabel.position(-20+origin.x+(origin.y)*atan2(vslider.value(),c),50)
unprimetlabel.position(-20+origin.x+(origin.y)*atan2(refvslider.value(),c),50)
unprimeXlabel.position(width-50,origin.y-(width-origin.x)*atan2(refvslider.value(),c)-20)

//primetlabel.position(origin.x+map(vslider.value(),0,1,0,width),20)

  translate(origin.x,origin.y)

  stroke(0)
  aPrimeAxis.update((primeSpeed+refSpeed)/(1+primeSpeed*refSpeed/c**2))
  aPrimeAxis.show()

  aRefAxis.update(refSpeed)
  aRefAxis.show()


  noFill()


  //primeSpeed = vslider.value()
  for (let event of events) {

    event.show();
    event.update();
    event.lineToRef();
    event.lineToPrime();

  }
    for (var i=0;i<numberOfEvents;i++){
    hyperbolas[i].show();
    }
  //console.log(counter);
}


function mousePressed() {
  if (mouseY>100){
  events.push(new AnEvent(mouseX-origin.x, mouseY-origin.y,events.length+1));
}
}


// function makeAxis() {
//   stroke(0)
//   line(0,height/2,width,height/2)
//   line(width/2,0,width/2,height)
// }

function turnonoff() {
  events = []
  redraw()

}

function undolast() {
  events.pop();
  redraw()

}

class primeAxis {
  constructor(hexColor){
    this.hue = hue
    this.hexColor  = hexColor
  }

  update(speed){
    this.speed = speed
    this.beta = this.speed/c
  }


  show(){
    //let lineColor = color('hsl('+this.hue+', 100%, 50%)')
    let lineColor = this.hexColor
    stroke(lineColor)
    primedUnit = unprimedUnit*sqrt((1+this.beta**2)/(1-this.beta**2))
    push()
    rotate(-atan2(this.speed,1))
    line(-width,0,width,0)
    for (var i=0;i<tickCount;i++){
      translate(primedUnit,0)
      line(0,-5,0,5)
   
    }
    pop()
    push()
    rotate(atan2(this.speed,1))
    line(0,-height,0,height)
    for (var i=0;i<tickCount;i++){
      translate(0,-primedUnit)
      line(-5,0,5,0)
      push()
      fill(250)
      ellipse(0,0,17,17)
      rotate(i*.2)
      line(0,0,0,-6)
      pop()
      
    }
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
  constructor(x,y,count) {
    this.x = x;
    this.y = y;
    this.gamma = 1/(sqrt(1-(primeSpeed**2)/(c)))
    this.eventNo = count
  }
  update() {
    //this.beta = primeSpeed/c
    //this.gamma = 1/( sqrt(1 - (primeSpeed**2)/(c) ) )
    //primedUnit = unprimedUnit*sqrt((1+this.beta**2)/(1-this.beta**2))
  }

  show(theColor) {

    fill('red')

    push()
    noStroke()
        ellipse(this.x,this.y,10)
    text(this.eventNo,this.x,this.y-20)
    pop()
    //ellipse(0,0,10)
  }

  lineToRef() {
    stroke(0)
    // line(this.x,this.y,0,this.y)
    // line(this.x,this.y,this.x,0)

    push()
    translate(this.x,this.y)
    rotate(-atan2(refSpeed,c)+PI)
    this.alpha = atan2(refSpeed,c);
    this.betaA = HALF_PI-2*this.alpha;
    this.gamma = PI-this.alpha-this.betaA;
    this.timeLineLength = ((this.x+this.y*tan(this.alpha))*sin(this.gamma))/sin(this.betaA)
    line(0,0,this.timeLineLength,0)
    pop()

    push()
    translate(this.x,this.y)
    rotate(-HALF_PI+this.alpha)
    this.spaceLineLength = ((this.y+this.x*tan(this.alpha))*sin(this.gamma))/sin(this.betaA)
    line(0,0,this.spaceLineLength,0)
    pop()

  }

  lineToPrime() {
    stroke(primedSystemColor)
    
    push()
    translate(this.x,this.y)
    this.relvel = (primeSpeed+refSpeed)/(1+(primeSpeed*refSpeed)/c**2)
    rotate(-atan2(this.relvel,c)+PI)
    this.alpha = atan2(this.relvel,c);
    this.betaA = HALF_PI-2*this.alpha;
    this.gamma = PI-this.alpha-this.betaA;
    this.timeLineLength = ((this.x+this.y*tan(this.alpha))*sin(this.gamma))/sin(this.betaA)
    line(0,0,this.timeLineLength,0)
    pop()
    
    push()
    translate(this.x,this.y)
    rotate(-HALF_PI+this.alpha)
    this.spaceLineLength = ((this.y+this.x*tan(this.alpha))*sin(this.gamma))/sin(this.betaA)
    line(0,0,this.spaceLineLength,0)
    pop()

    //line(this.x,this.y,this.x,0)
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
      this.yvalues[i] = sqrt(((this.xvalues[i])**2)+((this.eventNo+1)*60/40)**2)
    }
  }
  show() {
    push()
    noFill()
    stroke(map(this.eventNo,0,numberOfEvents,0,100),100,80,20)
    strokeWeight(3)
    beginShape()
    for (var i = 0;i<this.yvalues.length;i++){
      //ellipse(this.xvalues[i],-this.yvalues[i],2)
      curveVertex(this.xvalues[i]*40,-this.yvalues[i]*40)
    }
    endShape()
    pop()
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
  //primeSpeed = vslider.value()
  //primeSpeed = primeSpeed+refSpeed/(1+primeSpeed*refSpeed); //vslider.value()
  vslider.value((primeSpeed+refSpeed)/(1+primeSpeed*refSpeed))
  //primeSpeed = vslider.value()
  //redraw();
}

