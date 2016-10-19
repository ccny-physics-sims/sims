var xarray = [];
var yarray = [];
ground = 451;
var goUpButton;

var img;
function preload() {
  elevatorCab = loadImage("elevator-cab.svg");
  building = loadImage("building-outline.svg");

}

function setup() {
  running = true;
  canvas = createCanvas(600,1000);
  frameRate(20);
  onoff = createButton("Pause");
  onoff.position(width-100,50);
  onoff.class("sim-button blue slim");
  onoff.mousePressed(turnonoff);
  goUpButton = createButton("GO UP");
  goUpButton.position(width-100,20);
  goUpButton.class("sim-button blue slim");

  goDownButton = createButton("GO DOWN");
  goDownButton.position(width-100,80);
  goDownButton.class("sim-button blue slim");

  pos = createVector(width-150,ground)
  vel = createVector(0,0);
  accel = createVector(0,0);
  //make the ball! It is an instance of the mover object
  ball = new KineticMass(pos,vel,accel,1,'red');
  ball.outline = color('rgba(255, 0, 0, 1)');
  ball.limit = 2000;
  ball.tail = false;

  //frameRate(20);
  ball.display();


  goUpButton.mousePressed(goUp);
  goDownButton.mousePressed(goDown);


  positionGraph = new Graph(250,250,0,5,-350,350,8);
	positionGraph.showBorder = false;
	positionGraph.set_offset(20,00);

  positionPlot = new Plot([],0,0,200,1);
  positionPlot.pointSize = 1;

  velGraph = new Graph(250,250,0,5,-10,10,8);
	velGraph.showBorder = false;
	velGraph.set_offset(20,250);

  velPlot = new Plot([],0,200,0,1);
  velPlot.pointSize = 1;

  accelGraph = new Graph(250,250,0,5,-.5,.5,8);
	accelGraph.showBorder = false;
	accelGraph.set_offset(20,500);

  accelPlot = new Plot([],200,0,200,1);
  accelPlot.pointSize = 1;


  positionGraph.addPlot(positionPlot);
  velGraph.addPlot(velPlot);
  accelGraph.addPlot(accelPlot);

  motion1 = new upMotion(ball);
  motion1.goingUp = false;

  positionGraph.xlabel = "";
  positionGraph.ylabel = "y";
  positionGraph.title = "y vs. time"
  velGraph.xlabel = "";
  velGraph.ylabel = "y-velocity";
  velGraph.title = "v vs. time"
  accelGraph.xlabel = "time (s)";
  accelGraph.ylabel = "y-acceleration";
  accelGraph.title = "a vs. time"
}

function draw() {
  //console.log(ball.velocity.y)
  background(255);



  motion1.advanceInTime();

  ball.update();
  ball.display();

  positionGraph.drawBg(color(255),color(0));
  positionGraph.plotAll();
  //now during the draw function call these three functions
  positionGraph.plots[0].tpRecord((ground-ball.position.y),positionGraph);
  velGraph.drawBg(color(255),color(0));
	velGraph.plotAll();
  //now during the draw function call these three functions
	velGraph.plots[0].tpRecord(-ball.velocity.y,velGraph);

  accelGraph.drawBg(color(255),color(0));
	accelGraph.plotAll();
  //now during the draw function call these three functions
	accelGraph.plots[0].tpRecord(-ball.acceleration.y,accelGraph);

  image(building, width/2+30, 10);
  image(elevatorCab, ball.position.x-50, ball.position.y-100);

}
function goUp(){
  if (ball.velocity.mag() < 0.001) {
  motion1.goingUp = true;
  motion1.t0 = frameCount
  }

}
function goDown(){
  if (ball.velocity.mag() < 0.001) {
  motion1.goingDown = true;
  motion1.t0 = frameCount
}
}
var upMotion = function(whatsMoving) {
    this.who = whatsMoving;
    this.t0 = frameCount;
    this.goingUp = false;

    this.advanceInTime = function() {

      if(this.goingUp == true){
      t=frameCount-this.t0;
      if(t < 10){
      this.who.acceleration.y = -.3;
      }
      if(t > 10 ){this.who.acceleration.y = 0;}
      if(t > 50 ){this.who.acceleration.y = +.3;}
      if(t > 60 ){this.who.acceleration.y = 0;}
      if(t > 61){this.goingUp = false;}
      }
      if(this.goingDown == true){
      t=frameCount-this.t0;
      if(t < 10){
      this.who.acceleration.y = +.3;
      }
      if(t > 10 ){this.who.acceleration.y = 0;}
      if(t > 50 ){this.who.acceleration.y = -.3;}
      if(t > 60 ){this.who.acceleration.y = 0;}
      if(t > 61){this.goingDown = false;}
      }
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
