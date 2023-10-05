let k1 = .1;
let k2 = .1;
let k3 = .1;
let masses=[];
let transAmp = 10;
let noOfCoils = 5;
let graphScale;
let graphYOffset = 120;
let running = false;
let kmag = .2
let mass1color = "rgb(60, 118, 176)"
let mass2color = "rgb(176, 64, 60)"
function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent("sketch-holder")
  background(250);
  frameRate(30)
  //choose random vectors for the balls initial motion
  //pos = createVector(width/2,height/2);

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(windowWidth*.8,10);
  onoff.class("sim-button");
  onoff.parent("sketch-holder")
  sliderWidth = min(width/3,200)
  aSlider = createSlider(.1,2,1,.01);
  aSlider.parent('sketch-holder')
  aSlider.size(sliderWidth,0);
  aSlider.position(20,20)
  aSlider.input(sliderChange);
  aSlider.class("sim-slider");
  aSliderLabel = createP("k = "+aSlider.value());
  aSliderLabel.parent("sketch-holder")
  aSliderLabel.position(aSlider.x,aSlider.y+10)

  radio = createRadio();
  radio.parent('sketch-holder');
  radio.class('sim-radio')
  radio.position(aSlider.x,aSlider.y+50);
  radio.option("1", 'Normal Mode 1 <br/>');
  radio.option("2", 'Normal Mode 2 <br/>');
  radio.option("3", 'Random');
  radio.selected("1");
  radio.changed(refresh);


  //gravity = createVector(0,0)
  //frameRate(1)
  //oLoop()
  oscSystemWidth = min(width*.9,600)

  graphScale = createVector(oscSystemWidth,100)


  createSystem()
  noLoop()
}

function createSystem() {
  startPos1 = createVector((1/3)*oscSystemWidth,0)
  startPos2 = createVector((2/3)*oscSystemWidth,0)
  if (radio.value() == "1"){
  vel1 = createVector(10,0);
  vel2 = createVector(10,0);
  }
  if (radio.value() == "2"){
  vel1 = createVector(-10,0);
  vel2 = createVector(10,0);
  }
  if (radio.value() == "3"){
  vel1 = createVector(1,0);
  vel2 = createVector(10,0);

  }

  accel = createVector(0,0);
   OscillatorSystem = new SpringSystem(masses);
  //make the ball! It is an instance of the Mass object
  wallL_0 = masses.push(new AMass(createVector(0,0),createVector(0,0),createVector(0,0),1e10,30,'black',[1],1 ));
  ball1_1 = masses.push(new AMass(startPos1,vel1,createVector(0,0),1,15,mass2color,[0,2],2 ));
  ball2_2 = masses.push(new AMass(startPos2,vel2,createVector(0,0),1,15,mass1color,[1,3],3 ));
  wallR_3 = masses.push(new AMass(createVector(oscSystemWidth,0),createVector(0,0),createVector(0,0),1e10,30,'black',[2],null ));
}
function draw() {
  background(255)
  translate(width/2-oscSystemWidth/2,height/2.5)
  //background(250);
  //update the position
  for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
      OscillatorSystem.do_physics(1.0 / 8); // increase the divisor to increase accuracy and decrease simulation speed
  }
  masses[1].showx0()
  masses[2].showx0()
  for (i=0;i<masses.length;i++){
  masses[i].displaySpring();
}
  for (i=0;i<masses.length;i++){
    masses[i].display();

      // for (var j = 0; j< masses[i].interactions.length;j++){
      //   //console.log('hi');
      //   var toConnectTo = masses[i].interactions[j];
      //   //console.log(toConnectTo);
      //
      //
      //   line(masses[i].position.x,masses[i].position.y,masses[toConnectTo].position.x,masses[toConnectTo].position.y)
      // }
  }

push()
noFill()
translate(0,200)
line(0,0,graphScale.x,0)
line(0,graphYOffset,graphScale.x,graphYOffset)
line(0,-graphScale.y/2,0,graphScale.y/2)
line(0,graphYOffset-graphScale.y/2,0,graphYOffset+graphScale.y/2)
stroke(masses[1].color)
strokeWeight(2)
beginShape()
  for(i=0;i<masses[1].positionHistory.length;i++){
    curveVertex(4*i,-2*(masses[1].positionHistory[i].x-(1/3)*oscSystemWidth),2)
  }
  endShape()
  stroke(masses[2].color)
  beginShape()
  for(i=0;i<masses[1].positionHistory.length;i++){

curveVertex(4*i,-2*(masses[2].positionHistory[i].x-(2/3)*oscSystemWidth)+graphYOffset,2)
}
  endShape()
  pop()




  }

  function refresh() {
    masses = []
    //console.log(radio.value())
    createSystem()
  }

function sliderChange() {
  kmag = aSlider.value()
  aSliderLabel.html("k = "+kmag)
}
  function turnonoff() {
    if (!running){
      running = true;
      onoff.html('pause')
      loop();
    }
    else if (running) {
      running = false;
      onoff.html('start')
      noLoop();
    }
  }
