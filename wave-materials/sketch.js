var xspacing = 5;    // how far between each point
var w;                // width of the wave
var theta = 0;      // initial angle (omega * t = theta)
var amplitude = 7.5; // amplitude
var wavelength = 100.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var running = false; //
var wavelengthSlider; // these are sliders
var omegaSlider;
var amplitudeSlider;
var angularvelocity = 2;
var equation;
var ampSliderLabel; //these are labels
var omegaSliderLabel;
var wavelengthSliderLabel;
var onoff;


function setup() {

  frameRate(30);
  canvas = createCanvas(windowWidth*.95, 400);
  canvas.parent('sketch-holder');
  //these are all for the labels and sliders
  onoff = createButton("start");
  onoff.parent('sketch-holder')
  onoff.mouseClicked(turnonoff);
  onoff.position(width-100,30);
  onoff.class("sim-button")
  equation = createP("<p>n = 1</p>");
  equation.parent('sketch-holder')
  equation.position(width*3/4, 70);
  equation1 = createP("<p>n = 1</p>");
  equation1.parent('sketch-holder')
  equation1.position(width*1/4, 70);

  omegaSliderLabel = createP("Frequency");
  omegaSliderLabel.position(50,0);
  omegaSliderLabel.parent('sketch-holder')
  iorSliderLabel = createP("Index of Refraction");
  iorSliderLabel.parent('sketch-holder')
  iorSliderLabel.position(50,50);
  iorSlider = createSlider(1, 3, 1);
  iorSlider.parent('sketch-holder');
  iorSlider.elt.step=0.1;
  iorSlider.position(200,40);
  iorSlider.class("sim-slider");
  iorSlider.size(width/5,30)
  omegaSlider = createSlider(-20, 20, 4);
  omegaSlider.parent('sketch-holder');
  omegaSlider.position(200,00);
  omegaSlider.class("sim-slider");
  omegaSlider.size(width/5,30)

  w = width;

  dx = (TWO_PI / wavelength) * xspacing;
  // how many points are we going to need.
  yvalues = new Array(floor(w/xspacing));

  noLoop();
}

function draw() {
  background(255);
  // these lines are just to frame the plot
  push();
  fill(240);
  noStroke();
  rect(0,100,width/2, height-200);
  fill(240-20*(iorSlider.value()-1));
  rect(width/2,100,width, height-200);
  pop();

  push();
  stroke(200);
  line(0,height/2, width, height/2);

  line(width/2,100,width/2,height-100);
  pop();

  // get the values from the sliders
  amplitude = 8;
  angularvelocity = omegaSlider.value();

  dx = (TWO_PI / (10*iorSlider.value())) * xspacing;
  // calculate all the points
  calcWave();
  // display the wave
  renderWave();
  // these rest of the draw function updates the equation of the wave
  if(omegaSlider.value()>=0){
    sign = "-";
  }
  if(omegaSlider.value()<0){
    sign = "+";
  }
  omega = Math.abs(omegaSlider.value());
  equation.html("<p>n = "+iorSlider.value()+"</p>");
}

function calcWave() {
  // Increment theta. The angular velocity sets how fast this happens.

  theta -= .01*angularvelocity;

  // For every x value, calculate a y value with sine function
  var x = theta;
  var lastone;
  for (var i = 0; i < yvalues.length; i++) {
    dx = (TWO_PI / wavelength) * xspacing;
    yvalues[i] = sin(x)*amplitude*10;
    if (i<yvalues.length/2){
    x+=dx;
    }

    if (i>=yvalues.length/2){
    x+=iorSlider.value()*dx;
    }

  }

}

function renderWave() {
  noStroke();
  push();
  noFill();
  stroke(80);
    beginShape();
    for (var x = 0; x < yvalues.length; x+=1) {
      curveVertex(x*xspacing, height/2+yvalues[x]);
    }
    endShape();
    pop();
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
