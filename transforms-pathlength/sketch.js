
let primeSpeed;
let counter = 0;
let c = 10000;
let refSpeed = 0;
let running = true;
let origin;
let unitSpacing;
let primedSystemColor = "#4287f5"
let unprimedUnit = 30;
let tickCount = 20;

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")

  origin = createVector(width/2,height/2)







  angleSlider = createSlider(0,PI/2,0,.01);
  angleSlider.style('width', '200px');
  angleSlider.input(sliderChange);
  angleSlider.position(50,30);
  angleSlider.class('sim-slider');
  angleSlider.parent('sketch-holder');



  angleSlidersliderLabel = createP("Rotate Z");
  angleSlidersliderLabel.parent('sketch-holder');
  angleSlidersliderLabel.position(angleSlider.x,angleSlider.y+10);
  angleSlidersliderLabel.style("font-family","Times, serif")
  angleSlidersliderLabel.style("font-size","1.2em")

  // xSlider = createSlider(0,width/2,0,.01);
  // xSlider.style('width', '200px');
  // xSlider.input(sliderChange);
  // xSlider.position(angleSlider.x,angleSlider.y+100);
  // xSlider.class('sim-slider');
  // xSlider.parent('sketch-holder');
  //
  // ySlider = createSlider(0,width/2,0,.01);
  // ySlider.style('width', '200px');
  // ySlider.input(sliderChange);
  // ySlider.position(xSlider.x,xSlider.y+100);
  // ySlider.class('sim-slider');
  // ySlider.parent('sketch-holder');

  aRefAxis = new primeAxis("#000");

  aPrimeAxis = new primeAxis(primedSystemColor);

  startPoint = createVector(0,0);
  endPoint = createVector(width/9,-width/4)

  rVector = new Arrow(startPoint,endPoint);
  rVector.color = color('red');
  rVector.width = 10;
  rVector.showComponents = false;
  rVector.draggable = false;
  rVector.grab = false;

  frameRate(19);





  unitSpacing = 30;

}

function draw() {
  background(250);
  //makeAxis();
  rotAngle = angleSlider.value()
  translate(origin.x,origin.y)
  rVector.origin = startPoint
  rVector.target = endPoint
 rVector.update();
 rVector.display();
 noFill()
 stroke("red")
  circle(0,0,endPoint.mag()*2)
stroke(0)

  line(0,endPoint.y,endPoint.x,endPoint.y)
  line(endPoint.x,0,endPoint.x,endPoint.y)

  aRefAxis.update(0)
  aRefAxis.show()
  stroke(primedSystemColor)
  //primeOrigin = createVector(xSlider.value(),ySlider.value())
  //translate(primeOrigin.x,primeOrigin.y)
  r = endPoint.mag()
  gamma = atan2(endPoint.x,endPoint.y);

  delta = gamma-rotAngle;
    // r2 = p5.Vector.add(endPoint, primeOrigin);
    // r2Mag = r2.mag()
   newr = r*cos(delta)

  line(newr*sin(rotAngle),newr*cos(rotAngle),endPoint.x,endPoint.y)
  newr = r*sin(delta)

  line(newr*cos(rotAngle),-newr*sin(rotAngle),endPoint.x,endPoint.y)

  //line(endPoint.x,0,endPoint.x,endPoint.y)

    rotate(-rotAngle)
    aPrimeAxis.update()
    aPrimeAxis.show()


}

class primeAxis {
  constructor(hexColor){
    this.hue = hue
    this.hexColor  = hexColor
  }

  update(speed){

  }


  show(){
    //let lineColor = color('hsl('+this.hue+', 100%, 50%)')
    let lineColor = this.hexColor
    stroke(lineColor)

    push()
    line(-width,0,width,0)
    for (var i=-tickCount;i<tickCount;i++){

      line(i*unprimedUnit,-5,i*unprimedUnit,5)
    }
    pop()
    push()

    line(0,-height,0,height)
    for (var i=-tickCount;i<tickCount;i++){

      line(-5,i*unprimedUnit,5,i*unprimedUnit)
    }
    pop()
  }


}



function sliderChange() {
  //objPrimeSpeed = vslider.value();
  //makeObjPrime(10,objPrimeSpeed);
  //rotAngle = angleSlider.value()
  //redraw();
}
