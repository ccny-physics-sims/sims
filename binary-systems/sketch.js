let orbiters=[];
var gravity =10;
var totalMass;
var Trails = [];
let controlSpacing = 10;
let SolarSystem;
let running = false;
let mass = [];
let paths = [];
let body = [];
let massSlider = [];
let massTextBox = [];
let velxBox = [];
let velyBox = [];
let aBox = [];

let Presets = [];

let BIN1Params=[];
BIN1Params["masses"] =  [3000,3000];
BIN1Params["distance"] = [-50,50];
BIN1Params["velocities"] = [[0,12.1],[0,-12.1]];
BIN1Params["noOfBodies"] = 2;
BIN1Params["colors"] = ['red','blue',];

let BIN2Params=[];
BIN2Params["masses"] =  [3000,1000];
BIN2Params["distance"] = [-50,50];
BIN2Params["velocities"] = [[0,12/3],[0,-12]];
BIN2Params["noOfBodies"] = 2;
BIN2Params["colors"] = ['red','blue',];

let BIN3Params=[];
BIN3Params["masses"] =  [10000,100];
BIN3Params["distance"] = [-50,100];
BIN3Params["velocities"] = [[0,20/100],[0,-20]];
BIN3Params["noOfBodies"] = 2;
BIN3Params["colors"] = ['orange','blue',];

let BIN4Params=[];
BIN4Params["masses"] =  [1000,1000];
BIN4Params["distance"] = [-50,50];
BIN4Params["velocities"] = [[2,8],[-2,-8]];
BIN4Params["noOfBodies"] = 2;
BIN4Params["colors"] = ['orange','blue',];

Presets["BIN1"] = BIN1Params;
Presets["BIN2"] = BIN2Params;
Presets["BIN3"] = BIN3Params;
Presets["BIN4"] = BIN4Params;


let presetToLoad = "BIN1";


let initialSystem = "BIN1";

function setup(){
  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder')
  sliderWidth = min(width/3,100)
  v1x = 0;
  v1y = -12;
  massRatio = 2;
  //console.log(initialMasses[1]);
  //makeNoOfBodySelector('2')
  noOfBodies = 2;
  //makeTableHeaders();
  makeTableHeaders()

  for (i=1;i<=2;i++){
  makeAParameterControl(i,50*i,initialSystem)
  }
  makeButtons()
  makePresetSelector();

  // makeParameterControls(1,40);
  // makeParameterControls(2,90);
  // makeParameterControls(3,140);


  createGravSystem(noOfBodies)


  noLoop()
 }


function createGravSystem(howManyOrbiters) {

  SolarSystem = new GravSystem(orbiters);
  for (i=1;i<=howManyOrbiters;i++){
  mass[i] = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[i].value()),height/2),createVector(Number(velxBox[i].value()),Number(velyBox[i].value())),createVector(0,0),massSlider[i].value(), Presets[presetToLoad]["colors"][i-1]));
  paths.push(new Path(Presets[presetToLoad]["colors"][i-1]));
  }
  // mass2 = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[2].value()),height/2),createVector(Number(velxBox[2].value()),Number(velyBox[2].value())),createVector(0,0),massSlider[2].value(), 'red'));
  // paths.push(new Path('red'));
  //
  // mass3 = orbiters.push(new Orbiter(createVector(width/2+Number(aBox[3].value()),height/2),createVector(Number(velxBox[3].value()),Number(velyBox[3].value())),createVector(0,0),massSlider[3].value(), 'blue'));
  // paths.push(new Path('blue'));
}


function makeTableHeaders(){
  mass1 = createElement('p', 'Mass');
  mass1.position(sliderWidth+50, controlSpacing-20);
  mass1.parent('sketch-holder');


  vx = createElement('p', 'V<sub>x</sub>');
  vx.position(sliderWidth+130, controlSpacing-20);
  vx.parent('sketch-holder');

  vy = createElement('p', 'V<sub>y</sub>');
  vy.position(sliderWidth+170, controlSpacing-20);
  vy.parent('sketch-holder');

  aColHead = createElement('p', 'a');
  aColHead.position(sliderWidth+230, controlSpacing-20);
  aColHead.parent('sketch-holder');
}

function makeButtons() {
  onoff = createButton("Run");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(20,height-100);
  onoff.class("sim-button")
  onoff.style("padding",".5em")

  setParamsButton = createButton("Set Parameters");
  setParamsButton.parent('sketch-holder');
  setParamsButton.mouseClicked(setParams);
  setParamsButton.position(20,height-50);
  setParamsButton.class("sim-button")
  setParamsButton.style("padding",".5em")

}

function makePresetSelector() {


  systemSelection = createSelect();
systemSelection.position(10, 10);
systemSelection.option('Binary 1','BIN1');
systemSelection.option('Binary 2','BIN2');
systemSelection.option('Binary 3','BIN3');
systemSelection.option('Binary 4','BIN4');
systemSelection.changed(loadNewSystem);
systemSelection.parent('sketch-holder');
systemSelection.position(20,170);

systemSelectionLabel = createElement('p', 'Choose a Preset');
systemSelectionLabel.parent('sketch-holder')
systemSelectionLabel.position(systemSelection.x,systemSelection.y-40)
}

// function makeNoOfBodySelector(selectedNumber){
//   noOfBodiesRadio = createRadio();
//   noOfBodiesRadio.parent('sketch-holder');
//   noOfBodiesRadio.position(0,height-50);
//   noOfBodiesRadio.option(2,'2');
//     // radio.style('width', '60px');
//   noOfBodiesRadio.changed(function()
//   {if (noOfBodies < Number(noOfBodiesRadio.value()))
//     {addABody(noOfBodies,Number(noOfBodiesRadio.value() ) );
//     noOfBodies =  Number(noOfBodiesRadio.value() );
//     presetToLoad = "NS"+noOfBodiesRadio.value();
//     setParams();}
//     else {
//             removeAParameterControl(noOfBodies)
//       noOfBodies =  Number(noOfBodiesRadio.value() );
//       setParams()
//
//     }
//   } );
//   noOfBodiesRadio.selected(selectedNumber)
//
//   noOfBodiesRadioLabel = createElement('p', 'Number of Bodies');
//   noOfBodiesRadioLabel.parent('sketch-holder')
//   noOfBodiesRadioLabel.position(noOfBodiesRadio.x,noOfBodiesRadio.y-40)
// }

function addABody(lastExistingBodyNo,newBodyNo){
  for (i=noOfBodies+1;i<=newBodyNo;i++)
  makeAParameterControl(i,50*i,"NS"+newBodyNo.toString())
}
function loadNewSystem(){

  //makeControls(Presets[systemSelection.value()]['noOfBodies'])
   orbiters = []
   paths = []

  //makeButtons()
  count = Presets[systemSelection.value()]['noOfBodies'];
  removeParameterControls()
  noOfBodies = count;

  makeTableHeaders()
  //makeNoOfBodySelector(count.toString());
  presetToLoad = systemSelection.value();
  for (i=1;i<=count;i++){
  makeAParameterControl(i,50*i,systemSelection.value())
  }
  //noOfBodiesRadio.value(count.toString());
  //noOfBodiesRadio.selected(count.toString());
  setParams()
  running = false;
  noLoop()
  onoff.html("start");

}

function makeControls(count){
  //removeElements()
  //removeParameterControls()
  makeTableHeaders()
  //makeButtons()
  for (i=1;i<=count;i++){
  makeAParameterControl(i,40*i,initialSystem)
  }
}

function removeAParameterControl(whichOne){

  body[whichOne].remove()
  massSlider[whichOne].remove()
  massTextBox[whichOne].remove()
  velxBox[whichOne].remove()
  velyBox[whichOne].remove()
  aBox[whichOne].remove()

}

function removeParameterControls(){
  for (i=1;i<=noOfBodies;i++){
  body[i].remove()
  massSlider[i].remove()
  massTextBox[i].remove()
  velxBox[i].remove()
  velyBox[i].remove()
  aBox[i].remove()
}
}

function makeAParameterControl(bodyNo,yheight,presetAbbreviation) {

  body[bodyNo] = createElement('p', 'M '+bodyNo);
  body[bodyNo].position(5, controlSpacing+yheight-30);
  body[bodyNo].parent('sketch-holder');
  body[bodyNo].style('color', Presets[presetToLoad]["colors"][bodyNo-1]);
  body[bodyNo].style('font-weight','bold')

  massSlider[bodyNo] = createSlider(1,10000,Presets[presetAbbreviation]["masses"][bodyNo-1],1);
  massSlider[bodyNo].parent('sketch-holder');
  massSlider[bodyNo].position(controlSpacing+20, body[bodyNo].y+20);
  massSlider[bodyNo].class("sim-slider");
  massSlider[bodyNo].size(sliderWidth,0)
  massSlider[bodyNo].input(function () {massTextBox[bodyNo].value(massSlider[bodyNo].value());});

  massTextBox[bodyNo] = createInput('');
  massTextBox[bodyNo].parent('sketch-holder');
  massTextBox[bodyNo].position(massSlider[bodyNo].x+sliderWidth+10,body[bodyNo].y+10);
  massTextBox[bodyNo].size(60)
  massTextBox[bodyNo].class('sim-textbox')
  massTextBox[bodyNo].value(massSlider[bodyNo].value());
  //massTextBox[bodyNo].input(function(){alert();})

  velxBox[bodyNo] = createInput('');
  velxBox[bodyNo].parent('sketch-holder');
  velxBox[bodyNo].position(massTextBox[bodyNo].x+80+0,body[bodyNo].y+10);
  velxBox[bodyNo].size(30)
  velxBox[bodyNo].class('sim-textbox')
  if (Presets[presetAbbreviation]["velocities"][bodyNo-1] === undefined){
    velxValue = 0;
  }
  else {
    velxValue = Presets[presetAbbreviation]["velocities"][bodyNo-1][0];
  }
  velxBox[bodyNo].value(velxValue);

  velyBox[bodyNo] = createInput('');
  velyBox[bodyNo].parent('sketch-holder');
  velyBox[bodyNo].position(velxBox[bodyNo].x+40,body[bodyNo].y+10);
  velyBox[bodyNo].size(30)
  velyBox[bodyNo].class('sim-textbox')
  if (Presets[presetAbbreviation]["velocities"][bodyNo-1] === undefined){
    velyValue = 0;
  }
  else {
    velyValue = Presets[presetAbbreviation]["velocities"][bodyNo-1][1];
  }
  velyBox[bodyNo].value(velyValue);

  aBox[bodyNo] = createInput('');
  aBox[bodyNo].parent('sketch-holder');
  aBox[bodyNo].position(velyBox[bodyNo].x+40,body[bodyNo].y+10);
  aBox[bodyNo].size(50)
  aBox[bodyNo].class('sim-textbox')
  if (Presets[presetAbbreviation]["distance"][bodyNo-1] === undefined){
    aBoxValue = 0;
  }
  else {
    aBoxValue = Presets[presetAbbreviation]["distance"][bodyNo-1];
  }
  aBox[bodyNo].value(aBoxValue);
}

function draw(){
background(255);
translate(width/5,0)
  for (var k = 0; k < 2; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }

  COM();
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
  for (i = 1;i<=orbiters.length;i++){
    massSlider[i].value(massTextBox[i].value());
  }
  for ( i = orbiters.length-1; i >= 0; i--){
    orbiters.splice(i,1);
    paths.splice(i,1);
    //massSlider[i+1].value(Number(massTextBox[i+1].value()))
  }
    orbiters = [];
    path = [];
   orbiters.length = 0
   paths.length = 0
  //massSlider[1].value(Number(massTextBox[1].value()))
  createGravSystem(noOfBodies);
  redraw();

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
