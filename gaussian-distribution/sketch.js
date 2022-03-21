
let dispVectors = [];
let landingPoints = [];
let distancesFromCenter = [];
let distancesFromCenterInt = [];
let maxDistance = 300
let histo = new Array(maxDistance*2).fill(0);
let mean;
let standardDev;
let avg = [];
let running = false;

//how many vectors in your random walk
var howMany = 10;
//the maximum x-y components for each leg of the walk
var walkLength = 40;
//count the walks
var count = 0;

function setup() {

  canvas = createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');

  frameRate(30);




  //create slider for adjusting the rate of the walks
  rateSlider = createSlider(1, 100, 50);
  rateSlider.parent('sketch-holder');
  rateSlider.position(20, 60);
  rateSlider.style('width', '150px');
  rateSlider.class("sim-slider red");
  rateSliderLabel = createP("Rate");
  rateSliderLabel.parent('sketch-holder');
  rateSliderLabel.position(30,0);
  //let's start walking from the center of the canvas
  startPoint = createVector(width / 2, height / 2);
  mean = 0
  standardDev = 1
  colorMode(HSL);
  radio = createRadio();
  radio.parent('sketch-holder');
  radio.position(20,height*.2);
  radio.option(1, '1');
  radio.option(2, '2');
  radio.option(3, '3');
  //radio.style('width', '60px');
  radio.changed(refresh);
  n = radio.selected('1')
  textSize(20)

  onoff = createButton("Start");
  onoff.parent('sketch-holder');
  onoff.position(width*.8,20);
  onoff.class("sim-button");
  onoff.mousePressed(turnonoff);

  noLoop()
}



function draw() {

  background(255);

  //find average distance from center
  var total = 0;
  for(var i = 0; i < landingPoints.length; i++) {
      total += landingPoints[i];
  }




  push();
  // make some circles for the background
  noStroke();
  // fill(0,40);
  // ellipse(width/2,height/2,200,200);
  // fill(0,20);
  // ellipse(width/2,height/2,400,400);
  // fill(0,10);
  // ellipse(width/2,height/2,600,600);
  //draw x-y axis
  stroke(30);
  //this draws the circle showing the average distance
  ellipse(width/2,height/2,2*avg,2*avg)
  //drawAxes();
  line(width/2,height/2-20,width/2,height/2+20)
  line(0,height/2,width,height/2)
  pop()



  //change the rate of new walks based on the slider
  var rate = 101-rateSlider.value();
  //if we're on a walking frame
  if ((frameCount-1) % rate == 0 )
  {
    count++;
    // do the walk!
    for (var i = 0; i < howMany; i++) {
      //the first arrow starts at the center of the canvas
      if (i==0){
        thisStarts = 0;
      }
      //otherwise, it starts at the end of the last arrow
      //make a random ending point
      endPoint = 20*randomGaussian(mean, standardDev)
      //endPoint = 50*random(-1,1)

    }
    //keep track of the final point on the walk
    landingPoints.push(endPoint);
    //keep track of the distances from the center

    thisDistance = round(endPoint)
    distancesFromCenterInt.push(thisDistance);
    if(thisDistance < maxDistance){
    histo[thisDistance+maxDistance]++
    }

  }
  push()
//translate(0,-height/2)
fill(100)
noStroke()
for (x = 0; x < maxDistance*2; x++) {
  index = histo[x];

  y1=int(map(index, 0, max(histo), height, height-200));
  y2 = height/2
  xPos = map(x,0,maxDistance*2, width/2, width/2+maxDistance*2)
  if (abs(x-maxDistance) < standardDev*20) {
    fill(250,100,40)
  }
  else if (abs(x-maxDistance) < standardDev*20*2) {
    fill(250,100,60)
  }
  else {
    fill(250,100,80)
  }
  rect(xPos-maxDistance, y1, 3, y1);
}
pop()

  //update all the arrows
  // for (var i = 0; i < howMany; i++) {
  //   dispVectors[i].display();
  //   dispVectors[i].update();
  // }

  //let's keep the points displayed under 500 so things don't get too busy
  if (landingPoints.length > 500){
    landingPoints.shift();
  }
  avg.push(total / landingPoints.length)
  avgX = frameCount
  avgY = map(avg[frameCount-1],0,20,0,100)
  //report interesting stats

  push();
  translate(0,height*.5)
  noStroke();
  fill('black');
  text('Count: ' + count.toString(),20,20,120,100);
  text('Avg. distance: ' + avg[frameCount-1].toFixed(2).toString(),20,40,200,90);
  pop();

  translate(width/2,height/2)
  //ellipse(avgX,avgY,5)
  //draw all the landingPoints
  for (i=0; i < landingPoints.length; i++)
  {
    push();
    noStroke();
    //make them fade based on age.
    fill(240,70,70,255*(1-(landingPoints.length-i)/500));
    //the landing points are little ellipses
    ellipse(landingPoints[i],0,8)
    pop();
  }





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

function refresh(){
  dispVectors = [];
  landingPoints = [];
  distancesFromCenter = [];
  distancesFromCenterInt = [];
  histo = new Array(maxDistance*2).fill(0);
  standardDev = radio.value();

  //setup()


}
