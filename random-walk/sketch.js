
dispVectors = [];
landingPoints = [];
distancesFromCenter = [];

//how many vectors in your random walk
var howMany = 10;
//the maximum x-y components for each leg of the walk
var walkLength = 40;
//count the walks
var count = 1;

function setup() {

  canvas = createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');

  frameRate(25);




  //create slider for adjusting the rate of the walks
  rateSlider = createSlider(1, 100, 90);
  rateSlider.parent('sketch-holder');
  rateSlider.position(20, 60);
  rateSlider.style('width', '150px');
  rateSlider.class("sim-slider red");

  //let's start walking from the center of the canvas
  startPoint = createVector(width / 2, height / 2);

}



function draw() {

  background(255);

  //find average distance from center
  var total = 0;
  for(var i = 0; i < distancesFromCenter.length; i++) {
      total += distancesFromCenter[i];
  }
  var avg = total / distancesFromCenter.length

  //report interesting stats
  push();
  noStroke();
  fill('black');
  text('No. of walks: ' + count.toString(),20,20,100,20);
  text('Avg. distance: ' + (avg.toFixed(2)).toString(),20,40,150,90);
  pop();

  push();
  // make some circles for the background
  noStroke();
  fill(0,40);
  ellipse(width/2,height/2,200,200);
  fill(0,20);
  ellipse(width/2,height/2,400,400);
  fill(0,10);
  ellipse(width/2,height/2,600,600);
  //draw x-y axis
  stroke(30);
  //this draws the circle showing the average distance
  ellipse(width/2,height/2,2*avg,2*avg)
  drawAxes();
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
        thisStarts = startPoint;
      }
      //otherwise, it starts at the end of the last arrow
      else{
      thisStarts = dispVectors[i-1].target;
      }
      //make a random ending point
      endPoint = p5.Vector.add(thisStarts, createVector(random(-walkLength, walkLength), random(-walkLength, walkLength)) )
      dispVectors[i] = new Arrow(thisStarts, endPoint);
      dispVectors[i].color = color(random(50,100));
      dispVectors[i].grab = 'false';
      dispVectors[i].draggable = 'false';
      dispVectors[i].width=10;
    }
    //keep track of the final point on the walk
    landingPoints.push(endPoint);
    //keep track of the distances from the center
    distancesFromCenter.push(startPoint.dist(endPoint));
  }
  //update all the arrows
  for (var i = 0; i < howMany; i++) {
    dispVectors[i].display();
    dispVectors[i].update();
  }

  //let's keep the points displayed under 500 so things don't get too busy
  if (landingPoints.length > 500){
    landingPoints.shift();
  }

  //draw all the landingPoints
  for (i=0; i < landingPoints.length; i++)
  {
    push();
    noStroke();
    //make them fade based on age.
    fill(240,70,70,255*(1-(landingPoints.length-i)/500));
    //the landing points are little ellipses
    ellipse(landingPoints[i].x,landingPoints[i].y,5,5)
    pop();
  }


}
