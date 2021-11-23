
let n1 = 1;
let n2 = 1;
let hitting = false;

function setup() {
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent("sketch-holder")


  origin = createVector(width/2,height/2)
  sliderWidth = min(150,.2*width)

  // onoff = createButton("clear");
  // onoff.mouseClicked(turnonoff);
  // onoff.position(windowWidth*.9,30);
  // onoff.class("sim-button");
  // onoff.parent("sketch-holder")

  n1slider = createSlider(1,3,1,.01);
  n1slider.style('width', '200px');
  //n1slider.input(vsliderChange);
  n1slider.position(20,50);
  n1slider.class('sim-slider');
  n1slider.parent('sketch-holder');
  n1slider.size(sliderWidth,0)

  n1sliderLabel = createP("Index of Refraction, n<sub>1</sub> = ");
  n1sliderLabel.parent('sketch-holder');
  n1sliderLabel.position(n1slider.x,n1slider.y+20);
  n1sliderLabel.style("font-family","Times, serif")
  n1sliderLabel.style("font-size","1.2em")

  n2slider = createSlider(1,3,1.5,.01);
  n2slider.style('width', '200px');
  //n2slider.input(vsliderChange);
  n2slider.position(n1slider.x,n1slider.y+100);
  n2slider.class('sim-slider');
  n2slider.parent('sketch-holder');
  n2slider.size(sliderWidth,0)


  n2sliderLabel = createP("Index of Refraction, n<sub>2</sub> =  ");
  n2sliderLabel.parent('sketch-holder');
  n2sliderLabel.position(n1slider.x,n2slider.y+20);
  n2sliderLabel.style("font-family","Times, serif")
  n2sliderLabel.style("font-size","1.2em")

  frameRate(30);
  lineStart = createVector(0,0)
  sourceCoords = createVector(.25*width,.25*height)
}

function draw() {
  background(250);
  rectMode(CORNER);
  n1sliderLabel.html("Index of Refraction: n<sub>1</sub> = "+n1slider.value())
  n2sliderLabel.html("Index of Refraction: n<sub>2</sub> = "+n2slider.value())
  //translate(origin.x,origin.y)

  n1 = n1slider.value()
  n2 = n2slider.value()
  fill(map(n2,1,3,255,100))
  noStroke()
  rect(0,height/2,width,height/2)
  fill(map(n1,1,3,255,100))
  rect(0,0,width,origin.y)

  stroke('red')
  if(mouseX-sourceCoords.x<20 && mouseY-sourceCoords.y < 20){
    cursor(HAND)
    hitting = true
  }
  else {
    cursor(ARROW)
    hitting = false
  }


  push()
  stroke(80)
  line(0,origin.y,width,origin.y)
  drawingContext.setLineDash([5, 5]);
  line(origin.x,0,origin.x,height)
  pop()

  push()
  strokeWeight(2)
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'red';
  lineStart.x = sourceCoords.x
  lineStart.y = sourceCoords.y
  line(lineStart.x,lineStart.y,origin.x,origin.y)
  theta = atan2(origin.x-sourceCoords.x,origin.y-sourceCoords.y)
  //console.log(theta)
  if (sourceCoords.y<origin.y){
  //line(origin.x,origin.y,width/2,height)

  if(abs(sin(theta)*n1/n2) <= 1){
    phi = asin(sin(theta)*n1/n2)
    line(origin.x,origin.y,origin.x+tan(phi)*height/2,height)
  }
  else {
    phi = theta
    push()
    stroke('pink')
    strokeWeight(1)
    drawingContext.shadowColor = 'red';
    translate(origin.x,origin.y)
    if (sourceCoords.x<origin.x){
    rotate(theta-PI/2)
    }
    else {
      rotate(theta-PI/2)
    }
    line(0,0,width,0)

    pop()
  }
  }

  else {
    if(abs(sin(theta)*n2/n1) <= 1){
    phi = asin(sin(theta)*n2/n1)
    line(origin.x,origin.y,origin.x+tan(phi)*height/2,0)
    }
    else {
      phi = theta
      push()
      stroke('pink')
      strokeWeight(1)
      drawingContext.shadowColor = 'red';
      translate(origin.x,origin.y)
      if (sourceCoords.x<origin.x){
      rotate(theta-PI/2)
      }
      else {
        rotate(theta-PI/2)
      }
      line(0,0,width,0)

      pop()
    }
  }
  pop()
  push()
  noStroke()
  rectMode(CENTER);
  translate(sourceCoords.x,sourceCoords.y)
  rotate(atan2(origin.y-sourceCoords.y,origin.x-sourceCoords.x))
  fill(0)
  rect(0,0,30,16)
  //fill(0)
  quad(15, 8, 25, 12, 25, -12, 15, -8);
  pop()
}


function mouseDragged() {
  if (mouseX > sliderWidth+50 || mouseY > n2slider.y+50) {
    if(hitting){
  sourceCoords.x = mouseX
  sourceCoords.y = mouseY
  return false;
  }
}

}



function turnonoff() {

  redraw()

}
