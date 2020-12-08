var img;
var offsetx = 0;
var offsety = 0;
var easing = 0.05;
var dx,dy;
var img2x,img2y;
var expScale = 1.03;
var newX = 0;
var newY = 0;
function preload() {
  deepfield = loadImage("hubbleDF1.jpg");
  deepfieldalpha = loadImage("hubbleDF1-alpha.png");

}


function setup() {
  canvas = createCanvas(windowWidth,.9*windowHeight)
  //canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  imageMode(CENTER);
  centerx=width/2;
  centery=height/2;
  offsetx=0;
  offsety=0;
  newX = centerx;
  newY = centery;
  //cursor(MOVE);
  frameRate(30);

  expSlider = createSlider(0,7, 2, .1);
  expSlider.position(width/2,.05*height);
  expSlider.parent('sketch-holder');
  expSlider.class("sim-slider");
  expSlider.changed(moveUniverse);
  expSliderLabel = createP();
  expSliderLabel.position(30,10);
  expSliderLabel.parent('sketch-holder');
  expSliderLabel.style("color", "#ffffff");
  expSliderLabel.style("font-family", "Helvetica");

  descriptionText = createP();
  descriptionText.position(30,.91*windowHeight)
  descriptionText.parent('sketch-holder');
  descriptionText.html('Data from the Hubble Space Telescope')
  descriptionText.style("color", "#aaaaaa");
  descriptionText.style("font-family", "Helvetica");
}

function draw() {
  background(0)
  expScale =   1+.01* expSlider.value();
  push();

  expSliderLabel.html('Expansion: '+expScale )
  pop();
  translate(centerx,centery);


if ( mouseX > centerx-deepfieldalpha.width/2 &&
    mouseX < centerx+deepfieldalpha.width/2  &&
    mouseY < centery+deepfieldalpha.height/2 &&
    mouseY > centery-deepfieldalpha.height/2
  ){
  cursor(CROSS)}
  else (
    cursor(ARROW)
  )


  image(deepfield, 0, 0);  // Display at full opacity
//var dx = (mouseX-deepfield.width/2) - offset;
// offsetx += dx * easing;
// offsety += dy * easing;
//tint(255, 127);  // Display at half opacity

offsetx=(centerx-newX)*(expScale - 1);
offsety=(centery-newY)*(expScale - 1);;

image(deepfieldalpha, offsetx, offsety, deepfieldalpha.width*expScale, deepfieldalpha.height*expScale);

// fill('white')
// text(mouseY,0,0)
}

function touchEnded() {
  //ellipse(mouseX, mouseY, 5, 5);
  // prevent default
  if (mouseY > 100){
  moveUniverse()
  }
  return false;
}

function moveUniverse() {
  if ( mouseX > centerx-deepfieldalpha.width/2 &&
      mouseX < centerx+deepfieldalpha.width/2  &&
      mouseY < centery+deepfieldalpha.height/2 &&
      mouseY > centery-deepfieldalpha.height/2
    ){
      newX = mouseX;
      newY = mouseY;
  }
}
