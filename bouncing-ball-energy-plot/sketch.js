var running = false;  //the simulation **shouldn't** run until "start" is pressed
var onoff;
var plot;
var points = [];

function setup()  {
  canvas=createCanvas(windowWidth*.9,windowHeight*.9);
  canvas.parent('sketch-holder');
  // Make a new Pendulum with an origin location and armlength
  startPoint = createVector(3*width / 4, height / 2-10);
  vdisp = createVector(random(50, 100), random(-80, -20));

  pos = createVector(width/2,200);
  vel = createVector(0,0);
  accel = createVector(0,0);
  //make the ball! It is an instance of the Mass object
  ball = new KineticMass(p5.Vector.add(pos, createVector(10,0)),vel,accel,15,0);
  gravity = createVector(0,2)
  ball.bottomBounce = 500;
  // for (var i = 0; i < 100; i++) {
  //   points[i] = new GPoint(i, 10);
  // }

  //labels for the graphs

  //create the start/stop button
  onoff = createButton("start");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(50,50);
  onoff.class("sim-button gray");

  plot = new GPlot(this);
  plot.setPos(25, 25);

  // Set the plot title and the axis labels



  noLoop();


}

function draw() {
  background(255);


  ball.applyForce(gravity);
ball.update();
//make the ball bounce
ball.bounceEdges();
//display changes
ball.display();
//console.log(ball.velocity.y)
 push()
 noStroke();
 translate(width/10,450)
 push()
 fill('blue')
 PE = map(ball.position.y,200,500,0,100)
 rect(0,0,50,-(100-PE))
 text('Potential',0,20)
 pop()
 push()
 fill('red')
 translate(100,0)
 KE = map(Math.pow(ball.velocity.y,2),0,77.44,0,100)
 rect(0,00,50,-KE)
 text('Kinetic',0,20)
 pop()
 pop()

 push()
 fill(200)
 rect(0,500,width,10)
 pop()
 points.push(new GPoint(frameCount,100-PE));
 plot.setPoints(points);
 plot.getXAxis().setAxisLabelText("time");
 plot.getYAxis().setAxisLabelText("Potential Energy");
 plot.setTitleText("Potential vs. Time");
 plot.setPointColor(color(100, 100, 255, 50));
 // Draw it!
 plot.defaultDraw();
 if (points.length > 1000){
   points = [];
   //plot.setPoints([]);
 }
}






//turn the simulation on and off
function turnonoff() {
  if (running) {
    running = false;
    noLoop();
    onoff.html("start");
    return
  }

  if (!running){
    running = true;
    loop();
    onoff.html("stop");
    return
  }
}
