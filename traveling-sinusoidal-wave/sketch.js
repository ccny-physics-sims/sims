var xspacing = 8;    // how far between each point
var w;                // width of the wave
var theta = 0;      // initial angle (omega * t = theta)
var amplitude = 7.5; // amplitude
var wavelength = 200.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
var running = true; //
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
  canvas=createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  sliderWidth = min(300,width/3)
  //these are all for the labels and sliders
  onoff = createButton("stop");
  onoff.parent('sketch-holder');
  onoff.mouseClicked(turnonoff);
  onoff.position(width-80,20);
  onoff.class("sim-button")
  equation = createP("y  = sin( k x + &omega; t)");
  equation.parent('sketch-holder');
  equation.position(20, .8*height);
  equation.style("font-family: Times, serif; background: #e4e4e4; width: 220px; text-align: center; padding: 5px 10px ; border:thin solid black; border-radius: 5px;");
  amplitudeSlider = createSlider(0, 10, 7.5,0.1);
  amplitudeSlider.parent('sketch-holder');
  amplitudeSlider.position(20,20);
  amplitudeSlider.class("sim-slider");
  amplitudeSlider.size(sliderWidth,0)

  ampSliderLabel = createP("Amplitude");
  ampSliderLabel.parent('sketch-holder');
  ampSliderLabel.position(20,amplitudeSlider.y);

  omegaSlider = createSlider(-10, 10, 2);
  omegaSlider.parent('sketch-holder');
  omegaSlider.position(20,amplitudeSlider.y+60);
  omegaSlider.class("sim-slider");
  omegaSlider.size(sliderWidth,0)

  omegaSliderLabel = createP("Angular Frequency");
  omegaSliderLabel.parent('sketch-holder');
  omegaSliderLabel.position(20,omegaSlider.y);

  wavelengthSlider = createSlider(10, 80, 25);
  wavelengthSlider.parent('sketch-holder');
  wavelengthSlider.position(20,omegaSlider.y+60);
  wavelengthSlider.class("sim-slider");
  wavelengthSlider.size(sliderWidth,0)

  wavelengthSliderLabel = createP("Wavelength");
  wavelengthSliderLabel.parent('sketch-holder');
  wavelengthSliderLabel.position(20,wavelengthSlider.y);



  //

  w = width;
  // a small segment of the 'rope'
  dx = (TWO_PI / wavelength) * xspacing;
  // how many points are we going to need.
  yvalues = new Array(floor(w/xspacing));

  //noLoop();
}

function draw() {
  background(255);
  // these lines are just to frame the plot
  translate(0,30);
  push();
  stroke(40);
  line(0,height/2, width, height/2);
  line(2*xspacing,50,2*xspacing,height-50)
  pop();
  // get the values from the sliders
  amplitude = amplitudeSlider.value();
  angularvelocity = omegaSlider.value();

  dx = (TWO_PI / (10*wavelengthSlider.value())) * xspacing;
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
  equation.html("<p><i>y</i>  = "+amplitudeSlider.value()+" sin[ (2&pi; / "+wavelengthSlider.value()+") <i>x</i> "+sign+" "+ omega+" <i>t</i> ]</p>");
}

function calcWave() {
  // Increment theta. The angular velocity sets how fast this happens.

  theta -= .01*angularvelocity;

  // For every x value, calculate a y value with sine function
  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = Math.sin(x)*amplitude*10;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  // these are the balls
  for (var x = 2; x < yvalues.length-2; x+=2) {
    if (x == 20){fill(230,40,40);}
    else {fill(0);}
    ellipse(x*xspacing, height/2+yvalues[x], 5, 5);
  }
  // and this is the line plot superimposed
  push();
  noFill();
  stroke(80);
    beginShape();
    for (var x = 0; x < yvalues.length; x+=2) {
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
