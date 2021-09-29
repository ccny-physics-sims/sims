var theta, lengthV, running;
let cartcolor = "#7092ff"
let polarcolor = "#ff443b"
function setup() {
  canvas = createCanvas(windowWidth, .9*windowHeight);
  canvas.parent('sketch-holder');

  speedSlider = createSlider(-10, 10, 5, .1);
  speedSlider.position(20,20);
  speedSlider.parent('sketch-holder');
  speedSlider.class("sim-slider red");

  speedSliderLabel = createP();
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(20,speedSlider.y+10);
  speedSliderLabel.html('Change the Speed of Rotation')

  // the length of the vector is 100!
  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,speedSlider.y+70);
  onoff.class("sim-button")
  //its startPoint (i.e. origin) is in the center of the canvas
  startPoint = createVector(width / 2, height / 2);
  //it will initially start
  vdisp = createVector(0, -lengthV);
  endPoint = p5.Vector.add(startPoint, vdisp)

  aVector = new Arrow(startPoint, endPoint);
  aVector.color = color('purple');
  aVector.grab = false;
  aVector.draggable = false;
  aVector.showComponents = false;
  aVector.width = 16;

  velVector = new Arrow(startPoint, endPoint);
  velVector.color = color('green');
  velVector.grab = false;
  velVector.draggable = false;
  velVector.showComponents = false;
  velVector.width = 16;
  theta = 0;
  noLoop()

  xlabel = createP('x')
  xlabel.parent('sketch-holder')
  xlabel.style('color',cartcolor)
  ylabel = createP('y')
  ylabel.parent('sketch-holder')
  ylabel.style('color',cartcolor)
  rlabel = createP('r')
  rlabel.parent('sketch-holder')
  rlabel.style('color',polarcolor)
  thetalabel = createP('&theta;')
  thetalabel.parent('sketch-holder')
  thetalabel.style('color',polarcolor)
  thetalabel.style('font-style','italic')
}



function draw() {

  background(255);
  speedRot = .5*speedSlider.value();
  lengthV = speedRot;
  radiusCircle = min(.4*width/2,100);
  //makes an x-y coordinate axis
  strokeWeight(1)

  stroke('gray');
  line(width/2,0,width/2,height);
  line(0,height/2,width,height/2);

  // sets a rotation in the CCW direction
  push();
  noFill();
  stroke('gray')
  ellipse(width / 2, height / 2, 4*radiusCircle, 4*radiusCircle);
  pop();
  push();
  fill('black');
  ellipse(width / 2, height / 2, 5, 5);
  pop()

  //both the origin and the endpoint are moving now, but the length stays the same.
  aVector.origin = p5.Vector.add(startPoint,createVector(2*radiusCircle*cos(theta),2*radiusCircle*sin(theta)));
  aVector.target = p5.Vector.add(startPoint,createVector((2*radiusCircle-6*pow(lengthV,2))*cos(theta),(2*radiusCircle-6*pow(lengthV,2))*sin(theta)));
  aVector.update();
  //aVector.display();


  velVector.origin = p5.Vector.add(startPoint,createVector(2*radiusCircle*cos(theta),2*radiusCircle*sin(theta)));
  velVector.target = p5.Vector.add(velVector.origin,createVector(-8*lengthV*sin(theta),8*lengthV*cos(theta)));
  velVector.update();
  //velVector.display();
  //just draw some other things

  push()
  fill('black')
  noStroke()
  ellipse((width / 2)+2*radiusCircle*cos(theta),(height / 2)+2*radiusCircle*sin(theta),10)
  pop()
  strokeWeight(2)
  push()
  translate(startPoint.x,startPoint.y)
  stroke(polarcolor)
  line(0,0,2*radiusCircle*cos(theta),2*radiusCircle*sin(theta))
  noFill()
  drawingContext.setLineDash([3, 3]);
  arc(0,0,50,50,theta,0)
  drawingContext.setLineDash([0]);

  stroke(cartcolor)
  line(2*radiusCircle*cos(theta),0,2*radiusCircle*cos(theta),2*radiusCircle*sin(theta))
  line(0,2*radiusCircle*sin(theta),2*radiusCircle*cos(theta),2*radiusCircle*sin(theta))
  pop()

  push()
  //translate(startPoint.x,startPoint.y)
  xlabel.position(startPoint.x+radiusCircle*cos(theta),startPoint.y+2*radiusCircle*sin(theta))
  ylabel.position(startPoint.x+2*radiusCircle*cos(theta)+10,startPoint.y+radiusCircle*sin(theta))
  rlabel.position(startPoint.x+radiusCircle*cos(theta),startPoint.y+radiusCircle*sin(theta)-40,)
  thetalabel.position(startPoint.x+25,startPoint.y-40,)

  pop()
  theta+=-speedRot/100;





  }

  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }
    }
