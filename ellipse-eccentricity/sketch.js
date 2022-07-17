
let a;
let b;
let f1Label;
let orbitPresetButton = []
let orbitColor = 'hsb(200,100%,50%)'
epresets = [0.0167,.0934,.2056,	0.4407,0.9671]
epresetsNames = ["Earth","Mars","Mercury","Eris","Halley's Comet"]
epresetsColors = ["RoyalBlue", "IndianRed", "LightSlateGray","SeaGreen","Sienna"]
function setup() {

  canvas = createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');

  frameRate(30);




  //create slider for adjusting the rate of the walks
  eccSlider = createSlider(0, .9999, 0,.0001);
  eccSlider.parent('sketch-holder');
  eccSlider.position(20, 50);
  eccSlider.style('width', width*.8+'px');
  eccSlider.class("sim-slider");
  eccSlider.input(sliderChange);
  eccSliderLabel = createP("Eccentricity: ");
  eccSliderLabel.parent('sketch-holder');
  eccSliderLabel.position(30,0);
  //let's start walking from the center of the canvas

  // earthLabel = createP('Earth')
  // earthLabel.style('font-size', '20px')
  // earthEccXPos = map(.0167,0,1,0,width*.8)
  // earthLabel.position(earthEccXPos, eccSlider.y+120)
  //
  // mercLabel = createP('Mercury')
  // mercLabel.style('font-size', '20px')
  // mercEccXPos = map(.2056,0,1,0,width*.8)
  // mercLabel.position(mercEccXPos, eccSlider.y+120)
  //
  // marsLabel = createP('Mars')
  // marsLabel.style('font-size', '20px')
  // marsEccXPos = map(.0934,0,1,0,width*.8)
  // marsLabel.position(marsEccXPos, eccSlider.y+120)
  //
  // halleyLabel = createP("Halley's Comet")
  // halleyLabel.style('font-size', '20px')
  // halleyEccXPos = map(0.9671,0,1,0,width*.8)
  // halleyLabel.position(halleyEccXPos, eccSlider.y+120)

  // onoff = createButton("Start");
  // onoff.parent('sketch-holder');
  // onoff.position(width*.8,20);
  // onoff.class("sim-button");
  // onoff.mousePressed(turnonoff);
  numberOfPoints = 300;
  x = new Array(numberOfPoints);
  y = new Array(numberOfPoints);

  a = max(150,width/5)
  b = max(150,width/5)
  f = sqrt(a**2-b**2)

  f1Label = createP("Sun")
  f1Label.style('font-size', '20px')
  f1Label.position((width/2)+f, height/2-0)



    centerLabel = createP("Center")
    centerLabel.style('font-size', '20px')
    centerLabel.position((width/2)+f-10, height/2+30)

    for (i = 0;i<5;i++){
      makeOrbitButtons(i)
    }
  noLoop()
}

function makeOrbitButtons(i) {
  pos = map(epresets[i],0,1,0,width*.8)
  orbitPresetButton[i] = createButton(epresetsNames[i]);
  orbitPresetButton[i].parent('sketch-holder');
  orbitPresetButton[i].position(pos+20,eccSlider.y+50);
  orbitPresetButton[i].class("sim-button");
  orbitPresetButton[i].class("small");
  if (width<400) {
  orbitPresetButton[i].style("transform","rotate(30deg)");
  }
  orbitPresetButton[i].style("background-color",epresetsColors[i]);
  orbitPresetButton[i].style("border", "1px solid #494949");
  orbitPresetButton[i].style("border-radius", ".3em");
  orbitPresetButton[i].style("color", "white");
  orbitPresetButton[i].mousePressed(function() { changePreset(i);});
}

function changePreset(i){
  console.log(i);

  eccSlider.value(epresets[i])
  orbitColor = epresetsColors[i]
  redraw()

}
function draw() {

  background(255);
  // rect(0,0,width*.4,50)
  // rect(width*.4,0,width*.4,50)
  // line(earthEccXPos,eccSlider.y+50,earthEccXPos,eccSlider.y+10)
  // line(eccSlider.x+mercEccXPos,eccSlider.y+50,eccSlider.x+mercEccXPos,eccSlider.y+10)
  // line(eccSlider.x+marsEccXPos,eccSlider.y+50,eccSlider.x+marsEccXPos,eccSlider.y+10)
  // line(eccSlider.x+halleyEccXPos,eccSlider.y+50,eccSlider.x+halleyEccXPos,eccSlider.y+10)
  e = eccSlider.value()
  b = sqrt((1-e**2)*a**2);
  f = sqrt(a**2-b**2)
  translate(width/2-f,height*.6)

  eccSliderLabel.html("Eccentricity: "+e.toFixed(4));
  f1Label.position((width/2)-10, height*.6+90)
  centerLabel.position((width/2)-f-10, height*.6+30)

  calcCurve()
  plotCurve()
  push()
  fill(0)
  circle(0,0,5)
  pop()
  push()
  fill('yellow')
  circle(f,0,10)
  circle(-f,0,10)
  pop()

  push()
  stroke(100)
  noFill()
  circle(0,0,2*a)
  pop()

}

function calcCurve() {
  for (var t = 0; t < numberOfPoints; t += 1) {

    //y[x] = amplitude * Math.sin(.01 * x*omega)
    y[t] = b*sin((TWO_PI/numberOfPoints)*t)
    x[t] = a*cos((TWO_PI/numberOfPoints)*t)
    //expFunct[t] = amplitude*Math.exp( (-b*t)/(2*m) )
  }

}



function plotCurve() {
  push();
  noFill();
  //stroke('hsb(200,100%,50%)');
  stroke(orbitColor)
  strokeWeight(1)
  beginShape();
  for (var t = 0; t < numberOfPoints; t += 1) {
    curveVertex(x[t], -y[t]);
  }
  endShape();
  pop();

}
function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
  if (!running) {
    running = true;
    turnedOffByButton = false;
    loop();
    onoff.html("stop");
    return
  }

  if (running) {
    running = false;
    turnedOffByButton = true;
    noLoop()
    onoff.html("start");
    return
  }
}

function sliderChange() {
  orbitColor = 'hsb(200,100%,50%)'
  redraw()
}
