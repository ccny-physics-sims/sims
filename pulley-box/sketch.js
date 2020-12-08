

var running = false;


function setup(){
canvas = createCanvas(windowWidth, 0.9*windowHeight);
canvas.parent('sketch-holder');

  c = 0;
  // onoff = createButton("Release");
  // onoff.parent('sketch-holder');
  // onoff.mouseClicked(turnonoff);
  // onoff.position(50,30);
  // onoff.class("sim-button")
  sliderWidth = min(300,width/3)
  reseter = createButton("Go!");
  reseter.parent('sketch-holder');
  reseter.mouseClicked(resetTheBalls);
  reseter.position(20,20);
  reseter.class("sim-button")

  discMassSlider = createSlider(0, 50, 10, 1);
  discMassSlider.position(width*.01,height*.2);
  discMassSlider.parent('sketch-holder');
  discMassSlider.class("sim-slider");
  discMassSlider.size(sliderWidth,0)
  discMassSliderLabel = createP()
  discMassSliderLabel.position(10,height*.23);
  discMassSliderLabel.parent('sketch-holder');

  boxMassSlider = createSlider(1, 10, 1, 1);
  boxMassSlider.position(width*.01,height*.35);
  boxMassSlider.parent('sketch-holder');
  boxMassSlider.class("sim-slider");
  boxMassSlider.size(sliderWidth,0)
  boxMassSliderLabel = createP()
  boxMassSliderLabel.position(10,height*.38);
  boxMassSliderLabel.parent('sketch-holder');

  accelerationLabel = createP();
  accelerationLabel.position(10,height*.44);
  accelerationLabel.parent('sketch-holder');
  accelerationLabel.style('font-size', '1em')

  //speedRoller = 10;
  g = .1;
  startx = 2*width/3;
  starty = 200;
  massBox = boxMassSlider.value();
  massDisc = discMassSlider.value();
  pos = createVector(startx,starty);
  vel = createVector(0,0)
  accel = createVector(0,0)

  fallingBox = new KineticMass(pos,vel,accel,1,'red');
  fallingBox.outline = color('rgba(255, 0, 0, 1)');
  fallingBox.limit = 2000;
  fallingBox.tail = false;


  w = new wheel(startx-50,starty-50,100);
  w.rotate = true;
  w.cdecorate = false;
  w.vdecorate = false;
  w.rotation = true;
  w.translation = false;
  w.rimColor = color('rgba(0,0,0,1)');
  w.spokeColor = color('rgba(0,0,0,1)');
  w.wheelColor = color('rgba(0,0,0,.1)');
  w.rimThickness = map(massDisc,1,50,1,5)*.5;
  rectMode(CENTER)
  discMassSliderLabel.html("Mass of Pulley: "+massDisc.toFixed(0))
  boxMassSliderLabel.html("Mass of Box: "+massBox.toFixed(0))
  accelerationLabel.html("Acceleration: <span style='color: red'>"+(2*massBox/(2*massBox+massDisc)).toFixed(3)+" <i>g</i> </span>");
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
  accelerationLabel.html("Acceleration: <span style='color: red'>"+(2*massBox/(2*massBox+massDisc)).toFixed(3)+" <i>g</i> </span>");


  w.draw();
   //get speed from slider
  w.ang_speed += fallingBox.acceleration.y/50
  w.rimThickness = map(massDisc,1,50,1,5)*.5;
  stroke(0)
  strokeWeight(2)
  line(startx,starty-50,fallingBox.position.x,fallingBox.position.y)

  if (fallingBox.position.y >= (height-3-(10+massBox*2)/2)){
    fallingBox.velocity.y = 0;
    fallingBox.acceleration.y = 0;
    w.ang_speed = 0;
    //noLoop();
  }
  fallingBox.update()
  fallingBox.display()
  //fill('red')
  rect(fallingBox.position.x, fallingBox.position.y, 10+massBox*2,10+massBox*2)
};

//
// function windowResized() {
//     // Resize necessary elements to fit new window size
//      resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
//   }
function resetTheBalls(){
  loop()
  fallingBox.position.y = starty;
  fallingBox.acceleration.y = g*(2*massBox/(2*massBox+massDisc))
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
