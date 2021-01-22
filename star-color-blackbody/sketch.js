let c = 299792458
let h = 6.62607004E-34
let kb = 1.38064852E-23
let temp;
let aSlider;
let xscaleT;
let radius = 100;
let effectiveT, starR,starG,starB;
let a = 0.4555;
let b = 0.4465;
let tempsA = [];
let closest;
function preload() {
  //table from https://arxiv.org/abs/2101.06254
  //Digital color codes of stars, Jan-Vincent Harre, René Heller
  table = loadTable("t2RGB-HarreHeller2021-arxiv210106254.csv", "csv", "header");
}

function setup() {
  canvas = createCanvas(windowWidth, .9*windowHeight);
  canvas.parent('sketch-holder');

  containerDiv = createDiv()
  containerDiv.parent('sketch-holder')
  //containerDiv.style('width', '500 px' )

  aSlider = createSlider(0,table.getRowCount()-1,30,1);
  aSlider.parent('sketch-holder')
  aSlider.size(width/3,0);
  background(250);
  frameRate(30);
  //lets make an array to fill
  aTextBox = createInput('');
  aTextBox.parent('sketch-holder');
  aTextBox.position(20,20);
  aTextBox.size(60)

  aTextBox.class('sim-textbox')
  //aTextBox.style('height','40px')
  aSlider.position(aTextBox.x, aTextBox.y+80)
aSlider.input(sliderChange);
aSlider.class("sim-slider");

aTextBox.value(aSlider.value());

button = createButton('Set T');
button.parent('sketch-holder');
button.position(aTextBox.x + aTextBox.width+30, aTextBox.y);
button.class('sim-button')
button.mousePressed(updateValue);

y = new Array(100);

xscaleT = y.length
row = table.getRow(aSlider.value());
temp = row.getNum('Temp')
sliderChange();

tempsA = getArrayOfTemps()


}

function getArrayOfTemps() {
  let vals = table.getColumn('Temp');
  return vals;
}



function draw() {
  background(255)
  //stroke(0)
  //move things to the middle
  row = table.getRow(aSlider.value());
  temp = row.getNum('Temp')

  fill(0)
  rect(width-height/3,0,height/3,height/3)
  push()
  translate(width-height/6,height/6)

  noFill()
  for (i = 1; i<radius; i++)
  {
    mu = sqrt(1-pow(i/radius,2))

    ldM = 1-a*(1-mu)-b*pow((1-mu),2)
    //console.log(ldM)
    stroke(starR*ldM,starG*ldM,starB*ldM)
    circle(0,0,i)
  }
  pop()






    lambdaStart = 370;
    lambdaEnd = 750;



        fill(color(starR,starG,starB));
        textAlign(CENTER);
        textSize(32);
        text(temp+' K', width-height/6, 50);

    fill(100)
    noStroke()
    textSize(18)
    text('2300 K', aSlider.x+30, aSlider.y+30)
    text('12000 K', aSlider.x+width/3-10, aSlider.y+30)
    translate(0, .9*height)
    //x axis
    stroke(1)
    line(0, 0, width, 0)

    //stroke('red')
    //calculate this points
    calcFunction();
    //display discrete points
    //noStroke();
    renderPoints();
    //display connected line
    //renderLine();

    peakLambda = .002897771955/temp*1E9;
    peakLambdaScaled = peakLambda*width/1000
    stroke(180)
    fill(0)
    //ellipse(peakLambdaScaled,0,30,30)
    line(peakLambdaScaled,0,peakLambdaScaled,-height/2)
    noStroke()
    textSize(24);
    text('Max = '+peakLambda.toFixed(0)+' nm',peakLambdaScaled,35 )

    noLoop()
}

function calcFunction() {
  //this function fills the aray with values
  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,1000)
    let lambda = (1+xscaled)*1E-9
    y[x] = 1.5E-12*(2*h*pow(c,2)/pow(lambda,5))*(1/(exp((h*c)/(lambda*kb*temp))-1))
  }

}

function renderPoints() {
  //this function puts ellipses at all the positions defined above.
  //noStroke()

  for (var x = 0; x < y.length; x += 1) {
    xscaled = map(x,0,y.length,0,1000)
    yscaled = map(y[x],0,max(y),0,height/2)
    xwindowScaled = map(xscaled,0,1000,0,width)
    //xscaled = map(x,0,1000,0,width)

    specColor = getRGB(xscaled)

    if (xscaled >= 370 && xscaled <= 750){
      fill(specColor);
      stroke(specColor)

    }
    else if (xscaled < 370){
      fill(255)
      stroke('violet')
    }
    else if (xscaled > 750){
      fill(255)
      stroke('red')
    }

    circle(xwindowScaled, -yscaled, 8);

  }

}

function renderLine() {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke('blue');

  beginShape();
  for (var x = 0; x < y.length; x += 3) {
    yscaled = map(y[x],0,max(y),0,height/2)
    xscaled = map(x,0,y.length,0,1000)
    xwindowScaled = map(xscaled,0,1000,0,width)
    curveVertex(xwindowScaled, -yscaled);
  }
  endShape();
  pop();
}

function updateValue(){
  goal = aTextBox.value()
  closest = tempsA.reduce(function(prev, curr) {
     return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
   });

  aTextBox.value(closest)
  row = table.findRow(closest,'Temp');

  aSlider.value(tempsA.indexOf(closest))
  redraw();

}

function sliderChange() {

effectiveT = String(aSlider.value());
// // calcFunction()
// // renderPoints();
// redraw();
//row = table.matchRow(new RegExp("2400"), 1);
row = table.getRow(aSlider.value());


aTextBox.value(row.getNum('Temp'));
starR = row.getNum('R')*255
starG = row.getNum('G')*255
starB = row.getNum('B')*255
  // calcFunction()
  // renderPoints();
  redraw();
}



function getRGB(Wavelength) {
    let Red;
    let Green;
    let Blue;
    if (Wavelength >= 380 && Wavelength<440)
    	{
        Red = -(Wavelength - 440) / (440 - 380);
        Green = 0.0;
        Blue = 1.0;
    	}
  		else if (Wavelength >= 440 && Wavelength<490)
      {
        Red = 0.0;
        Green = (Wavelength - 440) / (490 - 440);
        Blue = 1.0;
    	}
  		else if (Wavelength >= 490 && Wavelength<510)
      {
        Red = 0.0;
        Green = 1.0;
        Blue = -(Wavelength - 510) / (510 - 490);
  	  }
  		else if (Wavelength >= 510 && Wavelength<580)
      {
        Red = (Wavelength - 510) / (580 - 510);
        Green = 1.0;
        Blue = 0.0;
  	  }
  		else if(Wavelength >= 580 && Wavelength<645)
      {

        Red = 1.0;
        Green = -(Wavelength - 645) / (645 - 580);
        Blue = 0.0;
    	}
  		else if (Wavelength >= 645 && Wavelength<781)
      {
        Red = 1.0;
        Green = 0.0;
        Blue = 0.0;
    	}
  		else{

        Red = 0.0;
        Green = 0.0;
        Blue = 0.0;
    	};

    // Let the intensity fall off near the vision limits

    if((Wavelength >= 380) && (Wavelength<420)){
        factor = 0.3 + 0.7*(Wavelength - 380) / (420 - 380);
    }else if((Wavelength >= 420) && (Wavelength<701)){
        factor = 1.0;
    }else if((Wavelength >= 701) && (Wavelength<781)){
        factor = 0.3 + 0.7*(780 - Wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };
  return cc = color(Red*255*factor,Green*255*factor,Blue*255*factor)
}

// function touchMoved() {
//   // do some stuff
//   return false;
// }
