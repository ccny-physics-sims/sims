let step = 0.01;
let amount = 0;
let connectors = [[135,152],[152,154],[154,192],[192,142],[142,129],[118,142],[40,154]]
let graphSize = 500
let RAscale = [];
let DECscale = [];
let starColorA = [];
let Mvscale = [];
let Teffscale = [];
let running = false;
function preload() {
    data = loadTable(
      'data/orionstars-position-2.csv',
			'csv',
			'header');
    colortable = loadTable("t2RGB-HarreHeller2021-arxiv210106254.csv", "csv", "header");

}

function setup() {
  // shaders require WEBGL mode to work
  canvas = createCanvas(windowWidth, .9*windowHeight);
  canvas.parent('sketch-holder');
  noStroke();
  textSize(20)
  frameRate(30)
  // RunOnce = createButton("Run");
  // RunOnce.parent('sketch-holder');
  // RunOnce.mouseClicked(autoslidetoggle);
  // RunOnce.position(20,height-100);
  // RunOnce.class("sim-button")
  // RunOnce.style("padding",".5em")


  aSlider = createSlider(0,1,0,.01);
  aSlider.parent('sketch-holder')
  aSlider.size(width/3,0);
  aSlider.input(sliderChange);
  aSlider.class("sim-slider");
  aSlider.position(width/2-width/(3*2),40)

  aSliderLabel = createP("Drag the Slider ");
  aSliderLabel.parent('sketch-holder');
  aSliderLabel.position(aSlider.x,aSlider.y+20);
  aSliderLabel.style("font-family","Helvetica, sans-serif")
  aSliderLabel.style("font-size","1.2em")
  aSliderLabel.style("color","white")


  RA = colValsMinMax(data, "ra");
console.log('RAmin: '+RA.min);
console.log('RAmax: '+RA.max);



StarNo = colValsMinMax(data, "no");
console.log('Star No min: '+StarNo.min);
console.log('Star No max: '+StarNo.max);

DEC = colValsMinMax(data, "dec");
console.log('DECmin: '+DEC.min);
console.log('DECmax: '+DEC.max);

V = colValsMinMax(data, "V");
console.log(V.min);
console.log(V.max);

Mv = colValsMinMax(data, "Mv");
console.log('MvMin: '+Mv.min);
console.log('MvMax: '+Mv.max);

Teff = colValsMinMax(data, "Teff");
console.log(Teff.min);
console.log(Teff.max);

Tlist = colValsMinMax(colortable, "Temp");
//console.log(Tlist.min);
//console.log(Tlist.max);
  counts = getArrayOfTemps()
for (i = 0; i<data.getRowCount();i++){
  RAscale[i] = map(RA.values[i],RA.min,RA.max,0,graphSize)
  DECscale[i] = map(DEC.values[i],DEC.min,DEC.max,0,graphSize)
  teff = Teff.values[i];

  var closest = counts.reduce(function(prev, curr) {
    return (Math.abs(curr - teff) < Math.abs(prev - teff) ? curr : prev);
  });
  Teffscale[i]  = map(teff,Teff.max,Teff.min,0,graphSize)
  row = colortable.findRow(closest,'Temp');
  //console.log(row)
  starR = row.getNum('R')*255
  starG = row.getNum('G')*255
  starB = row.getNum('B')*255
  starColorA[i] = [starR, starG, starB]
  Mvscale[i] = map(Mv.values[i],Mv.min,Mv.max,graphSize,0)
  noLoop()
}


}

function draw() {
  background(0)
  fill(255)
  translate(.3*width,.8*height)
  count = data.getRowCount();
  fill(255)
  // if (count >= data.getRowCount()){count = 1;}
  // if (frameCount%10 ==0 ){
  //   count += 1;
  // }

  //console.log(counts);




  for (var i = 0; i < count; i++) {

    //let xpos = map(AZ.values[i], AZ.min, AZ.max, 100, width-100);
    // //let ypos = map(EL.values[i], EL.min, EL.max, height-500, 100);
    //  xpos = RA.values[i]*10
    //  ypos = DEC.values[i]*10
     //console.log(xpos, ypos)
    // let xpos = map(AZ.values[i], AZ.min, AZ.max, 100, width-100);
    // let ypos = map(EL.values[i], EL.min, EL.max, height-500, 0);
    //row = colortable.getRow(Teff.values[i]);
    goal = Teff.values[i];

  var closest = counts.reduce(function(prev, curr) {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  });
  //console.log(goal);
  //console.log(closest)
// row = colortable.findRow(closest,'Temp');
// //console.log(row)
// starR = row.getNum('R')*255
// starG = row.getNum('G')*255
// starB = row.getNum('B')*255
noStroke()
fill(starColorA[i][0],starColorA[i][1],starColorA[i][2])
    //starRad = min(8,10/(pow(Mv.values[i],.5)))
    xposHR = Teffscale[i]
    yposHR = Mvscale[i]
    posHR = createVector(-xposHR,yposHR)
    //console.log(xposHR);

    //ellipse(xposHR, -yposHR,starRad);

    starRad = min(9,9/(pow(V.values[i],.8)))
    xpos = RAscale[i]
    ypos = DECscale[i]
    pos = createVector(xpos-graphSize,ypos)
  //   drawingContext.shadowOffsetX = 0;
  // drawingContext.shadowOffsetY = 0;
  // drawingContext.shadowBlur = 10;
  // drawingContext.shadowColor = color('rgb('+starColorA[i][0]+','+starColorA[i][1]+','+starColorA[i][2]+')');
    graphPoint = p5.Vector.lerp(pos, posHR, amount)
    //ellipse(-posHR.x, -posHR.y,starRad);
    ellipse(-graphPoint.x, -graphPoint.y,starRad);
  //   if(V.values[i]<3.5){
  //   text(i,-graphPoint.x, -graphPoint.y)
  // }
  }
    //amount = 0.5*(sin(-HALF_PI+frameCount*step)+1)
    amount = aSlider.value()
    noFill()
    stroke(200)
  rect(0,0,graphSize,-graphSize)
  //noLoop()
  //stroke(150*cos(frameCount*step))
  stroke(150*(-1*(amount-1)))
  //console.log(StarNo.values.indexOf('135'))
  for (i = 0;i<connectors.length;i++){
    whichStar = StarNo.values.indexOf(connectors[i][0].toString())
    
    startx = map(RA.values[whichStar],RA.min,RA.max,0,graphSize)-graphSize
    starty = map(DEC.values[whichStar],DEC.min,DEC.max,0,graphSize)
    whichStar = StarNo.values.indexOf(connectors[i][1].toString())
    endx = map(RA.values[whichStar],RA.min,RA.max,0,graphSize)-graphSize
    endy = map(DEC.values[whichStar],DEC.min,DEC.max,0,graphSize)
    line(-startx,-starty,-endx,-endy)
  }
  noStroke()
  //fill(200*cos(frameCount*step))
  fill(200*(-1*(amount-1)))
  text('RA',graphSize/2-10,+30)
  rotate(-PI/2)
  text('DEC',graphSize/2,-20)
  fill(200*amount)
  rotate(HALF_PI)
  text('Temperature (cooler ->)',graphSize/2-100,+50)
  rotate(-PI/2)
  text('Absolute Magnitude (brighter ->)',graphSize/4,-40)

  //saveCanvas('HR'+frameCount, 'png');

}

function getArrayOfTemps() {
  let vals = colortable.getColumn('Temp');
  return vals;
}

function colValsMinMaxMap(tab, colName, ) {
  let vals = data.getColumn(colName);
  let obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

function colValsMinMax(tab, colName) {
  let vals = data.getColumn(colName);
  let obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

function sliderChange() {

  amount = aSlider.value()
  redraw();
}


