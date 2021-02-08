
let tailA = [];
var running = false;
let onoff;


let img;
function preload() {
  img = loadImage('ground.png');
}

function setup(){
canvas = createCanvas(windowWidth, windowHeight*.9);
canvas.parent('sketch-holder');

frameRate(30);
  c = 0;
  onoff = createButton("Release");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,20);
  onoff.class("sim-button")
  cursor(CROSS);
  posDrop = createVector(.5*width,.2*height)
  velDrop = createVector(0,0);
  accel = createVector(0,0);

  //what is gravity?
  gravity = createVector(0,1);

  //make the ball! It is an instance of the mover object
  ballDrop = new KineticMass(posDrop,velDrop,accel,20,'darkorange');
  ballDrop.tail = false;
  ballDrop.outline = 'black';
  ballDrop.tailStroke = 'darkorange';
  ballDrop.tailFill = 'darkorange';
  ballDrop.bottomBounce = 100;

  ballDrop.tailLength = 25;
  ballDrop.tailSpacing = 10;



  velVectorDrop = new Arrow(posDrop,velDrop);
  velVectorDrop.color = color('green');
  velVectorDrop.width = 10;
  velVectorDrop.showComponents = false;
  velVectorDrop.draggable = false;
  velVectorDrop.grab = false;

  accelVectorDrop = new Arrow(posDrop,accel);
  accelVectorDrop.color = color('purple');
  accelVectorDrop.width = 10;
  accelVectorDrop.showComponents = false;
  accelVectorDrop.draggable = false;
  accelVectorDrop.grab = false;

//noSmooth();
//frameRate(15)
noLoop();
}

function draw(){
  background('#d3edf8')
  image(img, 0, height*.9);
  //cursor(CROSS)
  push()
  fill('peru')
  noStroke();
  //rect(10,height-10,width,10)
  pop()
  ballDrop.applyForce(gravity);
  //update the position
  if((frameCount-1)%ballDrop.tailSpacing==0 && tailA.length < ballDrop.tailLength){
  tailA.push(ballDrop.position.copy());
  }
  push();
    for(var i = 0; i < tailA.length; i++){
      stroke('rgba('+red(color(ballDrop.tailStroke))+','+green(color(ballDrop.tailStroke))+','+blue(color(ballDrop.tailStroke))+','+1+')');
      fill('rgba('+red(color(ballDrop.tailFill))+','+green(color(ballDrop.tailFill))+','+blue(color(ballDrop.tailFill))+','+.5+')');
      ellipse(tailA[i].x,tailA[i].y,7,7);
      stroke('gray')
      //line(mouseX-150,mouseY,mouseX+150,mouseY)
    }
    pop();

  if (mouseY > height*.1) {
    stroke('#aaa')
    line(mouseX-150,mouseY,mouseX+150,mouseY)
    push()
    noStroke()
    fill(0)
    text('y = '+(height-mouseY).toFixed(0), mouseX+10,mouseY-10)
    pop()
  }






  if (ballDrop.position.y > height+40) {
    //resetTheBalls();
    onoff.html('Reset')
    ballDrop.velocity = createVector(0,0)
    ballDrop.acceleration = createVector(0,0)
    //line(0,mouseY,width,mouseY)
  }
  else {
    ballDrop.update();
  }
  ballDrop.display();
};


function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function resetTheBalls(){
  //console.log('resetting');
  ballDrop.position = posDrop.copy();
  ballDrop.velocity = velDrop.copy();
  tailA = [];
}
  function turnonoff() {
    // and of course it's nice to be able to stop it if things get crazy
      if (!running){
        running = true;
        loop();
        onoff.html("stop");
        return
      }
      if (running && ballDrop.position.y > height+20){
          resetTheBalls()

      }

      if (running){
        running = false;
        noLoop()
        onoff.html("start");
        return
      }


    }

    // function touchStarted() {
    //
    //   return false;
    // }
