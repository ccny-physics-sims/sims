
var Trails = [];
var running = false;


function setup(){
canvas = createCanvas(windowWidth*.9, windowHeight*.9);
canvas.parent('sketch-holder');

  c = 0;
  // onoff = createButton("Release");
  // onoff.parent('sketch-holder');
  // onoff.mouseClicked(turnonoff);
  // onoff.position(50,30);
  // onoff.class("sim-button")

  reseter = createButton("Go!");
  reseter.parent('sketch-holder');
  reseter.mouseClicked(resetTheBalls);
  reseter.position(20,30);
  reseter.class("sim-button")

  discMassSlider = createSlider(1, 500, 100, 1);
  discMassSlider.position(20,110);
  discMassSlider.parent('sketch-holder');
  discMassSlider.class("sim-slider red");
  discMassSliderLabel = createP()
  discMassSliderLabel.position(20,80)
  discMassSliderLabel.parent('sketch-holder');

  boxMassSlider = createSlider(1, 10, 1, 1);
  boxMassSlider.position(20,190);
  boxMassSlider.parent('sketch-holder');
  boxMassSlider.class("sim-slider red");
  boxMassSliderLabel = createP()
  boxMassSliderLabel.position(20,160)
  boxMassSliderLabel.parent('sketch-holder');

  accelerationLabel = createP();
  accelerationLabel.position(20,240);
  accelerationLabel.parent('sketch-holder');

  //speedRoller = 10;
  g = .5;
  startx = 2*width/3;
  starty = 200;
  massBox = boxMassSlider.value();
  massDisc = discMassSlider.value();
  pos = createVector(startx,starty);
  vel = createVector(0,0)
  accel = createVector(0,0)

  box = new KineticMass(pos,vel,accel,1,'red');
  box.outline = color('rgba(255, 0, 0, 1)');
  box.limit = 2000;
  box.tail = false;


  w = new wheel(startx-50,starty-50,100);
  w.rotate = true;
  w.cdecorate = false;
  w.vdecorate = false;
  w.rotation = true;
  w.translation = false;
  w.rimColor = color('rgba(0,0,0,1)');
  w.spokeColor = color('rgba(0,0,0,1)');
  w.wheelColor = color('rgba(0,0,0,.1)');
  rectMode(CENTER)
  //noLoop();
}

function draw(){
  background(255)
  stroke(0)
  strokeWeight(2)
  line(0,height-1,width,height-1)
  massBox = boxMassSlider.value();
  massDisc = discMassSlider.value();
  discMassSliderLabel.html("Mass of Pulley: "+massDisc.toFixed(0))
  boxMassSliderLabel.html("Mass of Box: "+massBox.toFixed(0))
  accelerationLabel.html("Acceleration: "+(2*massBox/(2*massBox+massDisc)).toFixed(3)+"g");


  w.draw();
   //get speed from slider
  w.ang_speed += box.acceleration.y/50
  stroke(0)
  strokeWeight(2)
  line(startx,starty-50,box.position.x,box.position.y)

  if (box.position.y>(height-16)){
    box.velocity.y = 0;
    box.acceleration.y = 0;
    w.ang_speed = 0;
    //noLoop();
  }
  box.update()
  box.display()
  //fill('red')
  rect(box.position.x, box.position.y, 20,20)
};


function windowResized() {
    // Resize necessary elements to fit new window size
     resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }
function resetTheBalls(){

  box.position.y = starty;
  box.acceleration.y = g*(2*massBox/(2*massBox+massDisc))
  //noLoop();
  //running = false;
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
