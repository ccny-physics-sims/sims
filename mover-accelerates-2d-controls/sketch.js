//const touch = matchMedia('(hover: none)').matches;

let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);

let joystick_center_x;
let joystick_center_y;
let joystick_radius;
let p;
let running = true;

function preload() {
  accelLabel = loadImage("a.svg");
  velLabel = loadImage("v.svg");
}


function setup() {


  canvas = createCanvas(windowWidth,.9*windowHeight)
  canvas.parent('sketch-holder');

  makeButtons()
 

  velocity = createVector(.3,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);

  ball = new KineticMass(basePosition,velocity,acceleration,10,'rgb(255, 60, 0)');
  ball.tail = true;
  ball.outline = 'black';
  ball.tailFill = ball.color;
  ball.tailStroke = ball.color;
  ball.tailLength = 80;
  ball.tailSpacing = 10;


  center = createVector(width/2,height/2)
  velVec = new Arrow(basePosition,p5.Vector.add(center,ball.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;
  velVec.width = 10;

  accelVec = new Arrow(basePosition,p5.Vector.add(center,ball.acceleration))
  accelVec.color="purple";
  accelVec.grab = true;
  accelVec.draggable = false;
  accelVec.showComponents = false;
  accelVec.width = 10;


  joystick_center_x = width / 2;
  joystick_center_y = (height / 4) * 3.3;
  joystick_radius = height / 7;
  p = createP('');
  if (isMobileDevice){
  p.html('press here to <br> change acceleration')
  p.position(joystick_center_x-64, ((height / 4) * 3.5));
  p.style('color','#f58a42')
  // p.style('border', 'thin solid black')
  // p.style('padding', '5px')
  // p.style('background','#d1e8ff')

  }
  else
  { 
    p.position(width*.03, ((height / 4) * 3.8));
    p.html('Use the arrow keys to change the acceleration <br> Spacebar Pauses motion <br>Drag the tip of the acceleration vector while paused to change its magnitude and direction')
    p.style('border', 'thin solid black')
    p.style('padding', '5px')
    p.style('background','#d1e8ff')
  }
  p.style('align', 'center');
  //p.style('color', 'black');
  
}

function draw() {
  background(240);
  ball.wrapEdges();
  //ball.giveItAnAcceleration(createVector(sin(frameCount/100)*cos(frameCount/80)*.005,-cos(frameCount/200)*.005));

  rectMode(CORNER);
  push();
  velVec.origin = ball.position;
  velVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.velocity,40));
  velVec.update();
  velVec.display();
  pop();
  image(velLabel,velVec.target.x,velVec.target.y);
  push();
  accelVec.origin = ball.position;
  accelVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.acceleration,10000));
  accelVec.update();
  accelVec.display();
  pop();
  image(accelLabel,accelVec.target.x,accelVec.target.y);
  if(keyIsDown(LEFT_ARROW)){
    ball.acceleration.x-=.0002;
  }
  if (keyIsDown(RIGHT_ARROW)){
    ball.acceleration.x+=.0002;
  }
  if (keyIsDown(UP_ARROW)){
    ball.acceleration.y-=.0002;
  }
  if (keyIsDown(DOWN_ARROW)){
    ball.acceleration.y+=.0002;
  }
  // if (touch) {
  //     //Conditional script here
  //     accel.y = rotationX*.01;
  //     accel.x = rotationY*.01;
  // }

  if (accelVec.isDragging == true){
    ball.acceleration.x = (accelVec.target.x-accelVec.origin.x)/10000
    ball.acceleration.y = (accelVec.target.y-accelVec.origin.y)/10000
  }
  
     

  if (isMobileDevice){
  push();
  translate(joystick_center_x, joystick_center_y);
  rotate(QUARTER_PI);
  stroke(150)
  strokeWeight(3);
  line(-joystick_radius, 0, joystick_radius, 0);
  rotate(HALF_PI);
  line(-joystick_radius, 0, joystick_radius, 0);
  noFill();
  circle(0, 0, joystick_radius * 2);
  fill(0)
  
  pop();
  push()
  noStroke()
  fill('red')
  // textAlign(CENTER);
  // text('press here to change acceleration',joystick_center_x, joystick_center_y+50)
  pop()
  if (touches.length == 1 || touches.length == 2) {
    for (let touch of touches) {
      aTouch(touch.x, touch.y);
    }
  }
  }

  if (running) {
  ball.update();
  }
  ball.display();
 
  
}

function makeButtons() {
  onoff = createButton("Stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(toggleMotion);
  onoff.position(width*.03,.04*height);
  onoff.class("sim-button")
  onoff.style("padding",".5em")

  resetMover = createButton("Reset");
  resetMover.parent('sketch-holder');
  resetMover.mouseClicked(resetSketch);
  resetMover.position(onoff.x,onoff.y+50);
  resetMover.class("sim-button")
  resetMover.style("padding",".5em")

  // setParamsButton = createButton("Set Parameters");
  // setParamsButton.parent('sketch-holder');
  // setParamsButton.mouseClicked(setParams);
  // setParamsButton.position(20,height-50);
  // setParamsButton.class("sim-button")
  // setParamsButton.style("padding",".5em")

}

function keyReleased() {
  if (keyCode === 32) {
    //background(255)
    //noLoop()
    toggleMotion()
};
}

function aTouch(touch_x, touch_y) {
  let deg;
  p.html('')
  // calculate joystick rotation degrees
  push();
  translate(joystick_center_x, joystick_center_y);
  deg = floor(degrees(atan2(touch_y - joystick_center_y, touch_x - joystick_center_x)));
  pop();

  if (dist(joystick_center_x, joystick_center_y, touch_x, touch_y) < joystick_radius) {
    if (deg > -135 && deg < -45) {
      //sprite_y--;
      ball.acceleration.y -=.0002;
      fill(180)
      arc(joystick_center_x, joystick_center_y, joystick_radius*2, joystick_radius*2, 5*PI/4, 7*PI/4);

      //moving_vertically = true;
    } else if (deg < 135 && deg > 45) {
      ball.acceleration.y +=.0002;
      fill(180)
      arc(joystick_center_x, joystick_center_y, joystick_radius*2, joystick_radius*2, PI/4, 3*PI/4);

      //moving_vertically = true;
    } else if (deg > -45 && deg < 45) {
      ball.acceleration.x +=.0002;
      fill(180)
      arc(joystick_center_x, joystick_center_y, joystick_radius*2, joystick_radius*2, -PI/4, PI/4);
    } else if (deg < -135 || deg > 135) {
      ball.acceleration.x -=.0002;
      fill(180)
      arc(joystick_center_x, joystick_center_y, joystick_radius*2, joystick_radius*2, 3*PI/4, 5*PI/4);

    }

    // draw joystick
    // push();
    // fill("black");
    // rectMode(CENTER);
    // rect(touch_x, touch_y, 20, 20);
    // line(joystick_center_x, joystick_center_y, touch_x, touch_y);
    // pop();
  } else {
    
  }
 
}

function toggleMotion() {
  if (running == true) {
    running = false;
    onoff.html("Start");
  }
  else if (running == false) {
    running = true;
    onoff.html("Stop");
  }
}
  
function resetSketch() {
  setup()
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
