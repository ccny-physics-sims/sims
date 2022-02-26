
function preload() {
  //image based on from https://photojournal.jpl.nasa.gov/catalog/PIA16950
  //credit: NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington
  earthImage = loadImage('earth-polar-view.png');
}

function setup() {

  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  imageMode(CENTER)
  sliderWidth = min(300,width/3)



  Slider = createSlider(0, PI, 0 ,.05);
  Slider.position(50,height*.85);
  Slider.parent('sketch-holder')
  Slider.class("sim-slider gray");
  Slider.size(sliderWidth,0)
  Slider.input(sliderChanged)


  SliderLabel = createP("Time");
  SliderLabel.position(10,Slider.y-20);
  SliderLabel.parent('sketch-holder')

AA = min(width/3,height/3)
  ASlider = createSlider(20, AA, 100 ,1);
  ASlider.position(50,height*.95);
  ASlider.parent('sketch-holder')
  ASlider.class("sim-slider gray");
  ASlider.size(sliderWidth,0)
  ASlider.input(sliderChanged)


  ASliderLabel = createP("AU");
  ASliderLabel.position(20,ASlider.y-20);
  ASliderLabel.parent('sketch-holder')
  noLoop()
}

function draw() {
  background(255);
  fill(255);
  A = ASlider.value()
  B = Slider.value()
strokeWeight(1)
  drawingContext.setLineDash([]);
  translate(width/5,height/2)
  sunPos = createVector(0,0)
  push()
  stroke('lightblue')
  fill(0,0,0,0)
  ellipse(0,0,2*A,2*A)
  pop()
  push()
  fill(0)
  noStroke()
  text("Sun",-30,-5);
  pop()
  push()
  noStroke()
  fill(240,200,40)
  ellipse(sunPos.x,sunPos.y,20,20)
  pop()

  push()
  //rotate(-Slider.value()*.01)
  //translate(width/4,0)
  fill(0)
  noStroke()
  text("1 AU",-40,A/2);
  earthPos = createVector(A*sin(B), A*cos(B))
  translate(earthPos);

  text("Earth",-40,5);
starLinex = .6*width;
  image(earthImage,0,0,15,15)
  pop();
  stroke(0)
  starPos = createVector(width/3,0)
  line(sunPos.x,sunPos.y,starLinex,0)
  stroke(150)
  line(sunPos.x,sunPos.y,0,A)
  line(sunPos.x,sunPos.y,0,-A)
  fill(0)

  v3 = p5.Vector.sub(starPos,createVector(0,0));
  //v3.setMag(500)
  stroke(0)

  line(earthPos.x,earthPos.y,starPos.x,starPos.y)
  star2(starPos.x,0,10,5,5,'red')
  star2(starLinex,-height*.1,10,5,5,'yellow')
  star2(starLinex,-height*.2,10,5,5,'lightgreen')
  star2(starLinex,0,10,5,5,'lightblue')
  star2(starLinex,height*.1,10,5,5,'orange')
  star2(starLinex,height*.2,10,5,5,'purple')
  drawingContext.setLineDash([2, 2]);

  //line(starPos.x,starPos.y,width/2,0)
  line(starPos.x,starPos.y,starLinex,(starLinex-starPos.x)*tan(atan2(-earthPos.y,starPos.x-earthPos.x)))
  star2(starLinex,(starLinex-starPos.x)*tan(atan2(-earthPos.y,starPos.x-earthPos.x)),10,5,5,'pink')
  fill(0)
  noStroke()
  text("d",starPos.x/2,-5);

  text("p",starPos.x+40,30*sin(atan2(-earthPos.y,starPos.x))+5);
  drawingContext.setLineDash([]);

  makeEyepiece(min(150,width/3))

  //drawArrow(earthPos, starPos, 'red');
}

function makeEyepiece(circleDia){
  fill(0)
  translate(width/4,-height/3)
  text("Sky View",-25,-circleDia/1.8)
  circle(0,0,circleDia)
  star(0,0,8,4,5,'lightblue')
  star(circleDia*.2,0,8,4,5,'orange')
  star(circleDia*.4,0,8,4,5,'purple')
  star(-circleDia*.2,0,8,4,5,'yellow')
  star(-circleDia*.4,0,8,4,5,'lightgreen')
  redStarx = 2*(circleDia/height)*(starLinex-starPos.x)*tan(atan2(-earthPos.y,starPos.x-earthPos.x))
  if (abs(redStarx) < circleDia/2){
  star(redStarx,0,8,4,5,'red')
}
stroke(255)
  for (let i = 0;i<13;i++){
    line(10*(i-6),8,10*(i-6),2)
  }
  strokeWeight(4)
  stroke(150)
  noFill()
  circle(0,0,circleDia)


}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function star2(x, y, radius1, radius2, npoints,color) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  fill(color)
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints,color) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  fill(color)
  circle(x,y,radius1)
  // beginShape();
  // for (let a = 0; a < TWO_PI; a += angle) {
  //   let sx = x + cos(a) * radius2;
  //   let sy = y + sin(a) * radius2;
  //   vertex(sx, sy);
  //   sx = x + cos(a + halfAngle) * radius1;
  //   sy = y + sin(a + halfAngle) * radius1;
  //   vertex(sx, sy);
  // }
  // endShape(CLOSE);
}

function sliderChanged() {

  redraw()

}
