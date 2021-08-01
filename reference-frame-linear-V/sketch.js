
let tailA = [];
var running = false;
let onoff;

function preload() {
  trainImage = loadImage("img/train-car.png");
}


function setup(){
canvas = createCanvas(windowWidth, windowHeight*.9);
canvas.parent('sketch-holder');

frameRate(30);

// VelSlider = createSlider(-3, 3, 0 ,.05);
// VelSlider.parent('sketch-holder');
// VelSlider.position(30,100);
// VelSlider.class("sim-slider");
// VelSliderLabel = createP("X velocity");
// VelSliderLabel.parent('sketch-holder');
// VelSliderLabel.position(30,VelSlider.y-50);


  c = 0;
  onoff = createButton("Start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,20);
  onoff.class("sim-button")
  cursor(CROSS);
  imageMode(CENTER);

  posDrop = createVector(.1*width,.3*height)
  velDrop = createVector(1,0);
  accel = createVector(0,0);

  //what is gravity?
  gravity = createVector(0,1);

  //make the ball! It is an instance of the mover object
  ballDrop = new KineticMass(posDrop,velDrop,accel,10,'gray');
  ballDrop.tail = true;
  ballDrop.outline = 'black';
  ballDrop.tailStroke = 'blue';
  ballDrop.tailFill = 'blue';
  ballDrop.bottomBounce = height/2-50;

  ballDrop.tailLength = 10;
  ballDrop.tailSpacing = 5;
  //ballDrop.bounceEdges = true;


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
  // ballDrop.velocity.x = VelSlider.value();
  push()
  line(0,height/2,width,height/2)
  pop()
  //cursor(CROSS)
  push()
  fill('peru')
  noStroke();
  //rect(10,height-10,width,10)
  pop()
  // VelSliderLabel.html("X velocity = "+VelSlider.value());


  ballDrop.applyForce(gravity);
  //update the position
  if((frameCount-1)%ballDrop.tailSpacing==0){
  tailA.push(ballDrop.position.copy());
  }

  if(tailA.length > ballDrop.tailLength){
      tailA = tailA.slice(-1 * ballDrop.tailLength);
    }







ballDrop.wrapEdgesBounceFloor();
ballDrop.update();

image(trainImage, ballDrop.position.x, height/2-125,500,250);
push();
  for(var i = 0; i < tailA.length; i++){
    stroke(255,0,0,map(i,0,tailA.length,0,255))
    fill(255,0,0,map(i,0,tailA.length,0,255))

    ellipse(ballDrop.position.x,tailA[i].y,3,3);

    //line(mouseX-150,mouseY,mouseX+150,mouseY)
  }
  pop();
ballDrop.display();
push()
translate(ballDrop.position.x-50,height/2-50)
stickFigure(50, 'red');
pop()

push()
translate(.1*width,height/2)

stickFigure(50, 'blue');
pop()

push()
fill('BurlyWood')
rect(0,height/2,width,height)
pop()
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
    function stickFigure(figureHeight, figureStrokeColor){
      push()
      noFill()
      stroke(figureStrokeColor)
      strokeWeight(3)
      fill(255)
    ellipse(0,-figureHeight*(1+1/6),figureHeight/3,figureHeight/3)
    torso = line(0,-figureHeight,0,-figureHeight/2)
    lleg = line(0,-figureHeight/2,-figureHeight/4,0)
    rleg = line(0,-figureHeight/2,+figureHeight/4,0)
    larm = line(0,-figureHeight/1.2,-figureHeight/4,-figureHeight/1.4)
    rarm = line(0,-figureHeight/1.2,figureHeight/4,-figureHeight/1.4)
    pop()
    }
