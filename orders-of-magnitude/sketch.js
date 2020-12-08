let order;
let diameter = 10;
function setup() {
  canvas=createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');

  colorMode(HSB)

  orderSlider = createSlider(0,6,2,1)
  orderSlider.parent('sketch-holder')
  orderSlider.position(width*.1,height*.1)
  orderSlider.class('sim-slider')
  order = orderSlider.value();

  orderEq = createSpan('1 &times 10<sup>'+order+'<sup>')
  orderEq.parent('sketch-holder')
  orderEq.position(width*.56,height*.3)
  //orderEq.style('font-size','2em')

  orderEq1 = createSpan('diameter = 1 ')
  orderEq1.parent('sketch-holder')
  orderEq1.position(width*.25,height*.3+12)
  //orderEq1.style('font-size','2em')

  timesBiggerLabel = createSpan(1*pow(10,order)/10+'&times bigger')
  timesBiggerLabel.parent('sketch-holder')
  timesBiggerLabel.position(width*.56,height*.4)
  //timesBiggerLabel.style('font-size','2em')
  noStroke();

}

function draw() {
  background(255);
  order = orderSlider.value();
  orderEq.html('diameter = 1 &times 10<sup>'+(order-1)+'<sup>')
  //orderEq1.html()
  //orderEq.style('background',color(200,50,50))
  timesBigger = 1*pow(10,order)/10;
  timesBiggerLabel.html(timesBigger+'&times');
  //timesBiggerLabel.style('background',color(200,50,50))
  push()
  stroke(0)
  line(width/2,0,width/2,height)
  pop()
  translate(width/2,height/2)
  fill(100,50,50)
  xoffset = 1*pow(10,order)/2
  circle(xoffset,0,1*pow(10,order))

  fill(200,50,50)
  circle(-diameter/2,0,diameter)
  if (timesBigger>1){

  push()

  for (let i = 1; i<=min(timesBigger,100); i++) {
    if (i<timesBigger/2){shade = map(i,1,timesBigger/2,0,100)}
    else (shade = map(i,timesBigger/2,timesBigger,100,0))
    fill(0,0,shade)
    translate(diameter,0)
    circle(-diameter/2,0,diameter)
  }
  pop()
  }


}
