var planets = [];
var howMany = 1;



function setup() {
  frameRate(30);
  canvas=createCanvas(windowWidth ,windowHeight);
  canvas.parent('sketch-holder');

  smooth();
  noCursor();
  // The planet objects are initialized using the counter variable
  for (i = 0; i < howMany; i++ ) {
    console.log(i);
    planets[i] = new Planet(50 + i*30,(i+2)*3);
  }
}

function draw() {
  background(20);

  ellipse(mouseX, mouseY,5,5);


  // Drawing the Sun
  push();
  translate(width/2,height/2);
  stroke(0);
  fill('yellow');
  ellipse(0,0,20,20);

  // Drawing all Planets
  for (i = 0; i < planets.length; i++ ) {
    planets[i].update();
    planets[i].display();
  }
  pop();
}

function mouseClicked() {

  planets.push(new Planet(dist(mouseX,mouseY,width/2,height/2),random(5,12)));

  // prevent default
  return false;
}
