var orbiters=[];
var gravity =5;
var totalMass;
var Trails = [];
let controlSpacing = 10;
var SolarSystem;
let running = false;
let paths = [];
let body = [];
let massSlider = [];
let massTextBox = [];
let velxBox = [];
let velyBox = [];
let aBox = [];
let initialMasses = [10000,100,1];
let initialDistances = [0,300,310];
let initialVels = [[0,0],[0,-12],[0,-18]];


function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder')
  sliderWidth = min(width/3,100)
  v1x = 0;
  v1y = -12;
  massRatio = 2;
  //console.log(initialMasses[1]);
  // radio = createRadio();
  // radio.parent('sketch-holder');
  // radio.position(0,height-50);
  // radio.option(2, '2');
  // radio.option(3, '3');
  // radio.option(4, '4');
  //   //radio.style('width', '60px');
  // radio.changed(refresh);
  // n = radio.selected('1')
  makeTableHeaders();
  makeParameterControls(1,40);
  makeParameterControls(2,90);
  makeParameterControls(3,140);
  createGravSystem()
  onoff = createButton("Run");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width-70,20);
  onoff.class("sim-button")

  setParamsButton = createButton("Set Parameters");
  setParamsButton.parent('sketch-holder');
  setParamsButton.mouseClicked(setParams);
  setParamsButton.position(width-150,70);
  setParamsButton.class("sim-button")

  noLoop()
 }


function createGravSystem() {
  SolarSystem = new GravSystem(orbiters);
  mass1 = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[1].value()),height/2),createVector(Number(velxBox[1].value()),Number(velyBox[1].value())),createVector(0,0),massSlider[1].value(), 'gold'));
  paths.push(new Path('gold'));
  mass2 = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[2].value()),height/2),createVector(Number(velxBox[2].value()),Number(velyBox[2].value())),createVector(0,0),massSlider[2].value(), 'red'));
  paths.push(new Path('red'));

  mass3 = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[3].value()),height/2),createVector(Number(velxBox[3].value()),Number(velyBox[3].value())),createVector(0,0),massSlider[3].value(), 'blue'));
  paths.push(new Path('blue'));


}
function makeTableHeaders(){
  mass1 = createElement('p', 'Mass');
  mass1.position(sliderWidth+50, controlSpacing-20);
  mass1.parent('sketch-holder');

  vx = createElement('p', 'V<sub>x</sub>');
  vx.position(sliderWidth+190, controlSpacing-20);
  vx.parent('sketch-holder');

  vy = createElement('p', 'V<sub>y</sub>');
  vy.position(sliderWidth+240, controlSpacing-20);
  vy.parent('sketch-holder');

  aColHead = createElement('p', 'a');
  aColHead.position(sliderWidth+300, controlSpacing-20);
  aColHead.parent('sketch-holder');
}

function makeParameterControls(bodyNo,yheight) {



  body[bodyNo] = createElement('p', 'Body '+bodyNo);
  body[bodyNo].position(0, controlSpacing+yheight);
  body[bodyNo].parent('sketch-holder');



  massSlider[bodyNo] = createSlider(1,10000,initialMasses[bodyNo-1],1);
  massSlider[bodyNo].parent('sketch-holder');
  massSlider[bodyNo].position(controlSpacing+50, body[bodyNo].y+20);
  massSlider[bodyNo].class("sim-slider");
  massSlider[bodyNo].size(sliderWidth,0)
  massSlider[bodyNo].input(function () {massTextBox[bodyNo].value(massSlider[bodyNo].value());});

  massTextBox[bodyNo] = createInput('');
  massTextBox[bodyNo].parent('sketch-holder');
  massTextBox[bodyNo].position(massSlider[bodyNo].x+sliderWidth+10,body[bodyNo].y);
  massTextBox[bodyNo].size(80)
  massTextBox[bodyNo].class('sim-textbox')
  massTextBox[bodyNo].value(massSlider[bodyNo].value());
  //massTextBox[bodyNo].input(function(){alert();})

  velxBox[bodyNo] = createInput('');
  velxBox[bodyNo].parent('sketch-holder');
  velxBox[bodyNo].position(massTextBox[bodyNo].x+sliderWidth+10,body[bodyNo].y);
  velxBox[bodyNo].size(30)
  velxBox[bodyNo].class('sim-textbox')
  velxBox[bodyNo].value(initialVels[bodyNo-1][0]);

  velyBox[bodyNo] = createInput('');
  velyBox[bodyNo].parent('sketch-holder');
  velyBox[bodyNo].position(velxBox[bodyNo].x+50,body[bodyNo].y);
  velyBox[bodyNo].size(30)
  velyBox[bodyNo].class('sim-textbox')
  velyBox[bodyNo].value(initialVels[bodyNo-1][1]);

  aBox[bodyNo] = createInput('');
  aBox[bodyNo].parent('sketch-holder');
  aBox[bodyNo].position(velyBox[bodyNo].x+50,body[bodyNo].y);
  aBox[bodyNo].size(50)
  aBox[bodyNo].class('sim-textbox')
  aBox[bodyNo].value(initialDistances[bodyNo-1]);
}

function draw(){
background(255);

  for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }

  //COM();
  for (l=0;l<orbiters.length;l++){
   paths[l].update(l);
   paths[l].display();
 }
  // for (var i = Trails.length-1; i >= 0; i--) {
  //   var p = Trails[i];
  //   p.run();
  //   if (p.isDead()) {
  //     //remove the TrailDot
  //     Trails.splice(i, 1);
  //   }
  // }

}


function COM(){
  //displays the center of mass of the system
  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y)
  line(com.x,com.y-5,com.x,com.y+5)
  pop();
}




function windowResized() {
    // Resize necessary elements to fit new window size
    // resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

function keyTyped(){
 if (key === 'c'){
    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
    }
    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }
  }
}

function refresh(){
    //redraw();
}

function setParams(){
  for ( i = orbiters.length-1; i >= 0; i--){
    orbiters.splice(i,1);
    paths.splice(i,1);
    massSlider[i+1].value(Number(massTextBox[i+1].value()))


  }
  //massSlider[1].value(Number(massTextBox[1].value()))
  createGravSystem();
  redraw();

}

function sliderChange() {
  masstextBox.value(mass1Slider.value());
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
