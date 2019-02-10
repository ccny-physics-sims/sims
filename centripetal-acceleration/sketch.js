var theta, lengthV, running;

function setup() {
  canvas = createCanvas(800, 500);
  canvas.parent('sketch-holder');

  speedSlider = createSlider(-10, 10, 1, .1);
  speedSlider.position(50,70);
  speedSlider.parent('sketch-holder');
  speedSlider.class("sim-slider red");
  // the length of the vector is 100!
  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(50,30);
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
  aVector.width = 15;

  velVector = new Arrow(startPoint, endPoint);
  velVector.color = color('green');
  velVector.grab = false;
  velVector.draggable = false;
  velVector.showComponents = false;
  velVector.width = 15;
  theta = 0;
  noLoop()
}



function draw() {

  background(250);
  speedRot = .5*speedSlider.value();
  lengthV = speedRot;
  radiusCircle = 100;
  //makes an x-y coordinate axis
  stroke('gray');
  line(width/2,0,width/2,height);
  line(0,height/2,width,height/2);

  // sets a rotation in the CCW direction
  push();
  noFill();
  stroke('black')
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
  aVector.display();


  velVector.origin = p5.Vector.add(startPoint,createVector(2*radiusCircle*cos(theta),2*radiusCircle*sin(theta)));
  velVector.target = p5.Vector.add(velVector.origin,createVector(-8*lengthV*sin(theta),8*lengthV*cos(theta)));
  velVector.update();
  velVector.display();
  //just draw some other things

  push()
  fill('black')
  noStroke()
  ellipse((width / 2)+2*radiusCircle*cos(theta),(height / 2)+2*radiusCircle*sin(theta),10)
  pop()
  theta+=speedRot/100;
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
