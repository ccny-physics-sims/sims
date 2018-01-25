//Global variables
var pend_length=150
var g = .2
var omega
var x_axis_1, x_axis_2, x_axis_3

//boolean variables
var running
var paused
var n1, n2, n3

//buttons and slider variable
var start_btn
var pause_btn
var reset_btn
var resume_btn
var n1_btn;//To select IC's which will excite the first normal mode
var n2_btn;//To select IC's which will excite second normal mode
var n3_btn;
/*var slider1;
var slider2;
var slider3;*/

function setup() {
  
  x_axis_1 = 90
  x_axis_2 = 270
  x_axis_3 = 450
  
  n1 = false
  n2 = false
  n3 = false
  
  createCanvas(windowWidth,windowHeight);
  
  //Sliders to control initial conditions
  /*slider1=createSlider(-22.5,22.5,0,.1);//
  slider1.position(175,60);
  slider2=createSlider(-22.5,22.5,0,.1);
  slider2.position(175,210);
  slider3=createSlider(-22.5,22.5,0,.1);
  slider3.position(175,360);*/
  
  //First normal mode button
  n1_btn=createButton("First Normal Mode");
  n1_btn.position(50,40);
  n1_btn.mouseClicked(N1);
  
  n2_btn=createButton("Second Normal Mode");
  n2_btn.position(50,70);
  n2_btn.mouseClicked(N2);
  
  n3_btn=createButton("Third Normal Mode");
  n3_btn.position(50,100);
  n3_btn.mouseClicked(N3);
  
  //Start button
  start_btn= createButton("Start");
  start_btn.position(50,180);
  start_btn.mouseClicked(start);//Calls start function on click event
  
  //Pause button
  pause_btn=createButton("Pause");
  pause_btn.position(50,210);
  pause_btn.mouseClicked(pause);//Calls pause function on click event
  
  //Resume button
  resume_btn=createButton("Resume");
  resume_btn.position(50,240);
  resume_btn.mouseClicked(resume);//
  
  //Reset button
  reset_btn=createButton("Reset");
  reset_btn.position(50,270);
  reset_btn.mouseClicked(reset);//Calls reset function on click event
  
  reset();
}

function draw() {
  
background(255);

makePretty() //Labels and stuff

framePlots()

if(n1||n2||n3){
  renderWaves(omega,1,600)
}

  //Start not pressed
  if(running==false){
     /*p1.angle1=radians(slider1.value());
     p1.angle2=radians(slider2.value());
     p1.angle3=radians(slider3.value());*/
     
     if(n1){
       p1.angle3=radians(22.5)
       p1.angle2=radians(22.5*.792113)
       p1.angle1=radians(22.5*.61307)
     }
     else if(n2){
       p1.angle3=radians(22.5)
       p1.angle2=radians(-22.5*.14714)
       p1.angle1=radians(-22.5*.416993)
     }
     else if(n3){
       p1.angle3=radians(-22.5*.466206)
       p1.angle2=radians(22.5)
       p1.angle1=radians(-22.5*.607913)
     }
     p1.display();
  }
  
  //Start was pressed
  else {
    
    if(paused==false)
    {
       p1.go();
    }
       
    else if(paused==true)
    {
       p1.display();
    }
  }
  
} 
 
//Triple pendulum with equal lengths and equal masses
function Triple_Pendulum(origin_, r_,theta10_,theta20_,theta30_) {
  // Fill all variables
  this.origin = origin_.copy();
  this.position1 = createVector();
  this.position2= createVector();
  this.position3= createVector();
  this.r = r_;
  this.angle1 = theta10_;
  this.angle2= theta20_;
  this.angle3= theta30_;
  this.aVelocity1 = 0.0;
  this.aVelocity2 = 0.0;
  this.aVelocity3 = 0.0;
  this.aAcceleration1 = 0.0;
  this.aAcceleration2 = 0.0;
  this.aAcceleration3 = 0.0;
  this.ballr = 25.0;      // Arbitrary ball radius

  this.go = function() {
    this.update();
    this.display();
  }

  // Function to update position
  this.update = function() {
    //var g= .2;    // Arbitrary constant  
    
    //Coupled oscillator equations of motion for small angles
    this.aAcceleration1 = -3*(g/this.r)*this.angle1 + 2*(g/this.r)*this.angle2;
    this.aAcceleration2 = 3*(g/this.r)*this.angle1 - 4*(g/this.r)*this.angle2+(g/this.r)*this.angle3;//Small angle approximation
    this.aAcceleration3 = 2*(g/this.r)*this.angle2 -2*(g/this.r)*this.angle3;
    
    //Increment velocity and position
    this.aVelocity1 += (this.aAcceleration1);  
    this.aVelocity2 += (this.aAcceleration2);
    this.aVelocity3 += (this.aAcceleration3);
    this.angle1 += (this.aVelocity1); 
    this.angle2 += (this.aVelocity2);
    this.angle3 += (this.aVelocity3);
  }

  this.display = function() {
    this.position1.set(this.r*sin(this.angle1), this.r*cos(this.angle1), 0);         // Polar to cartesian conversion
    this.position1.add(this.origin);                                               // Make sure the position is relative to the pendulum's origin
    this.position2.set(this.r*sin(this.angle2), this.r*cos(this.angle2), 0);
    this.position2.add(this.position1); //position of mass 2 is relative position of mass 1
    this.position3.set(this.r*sin(this.angle3), this.r*cos(this.angle3), 0);
    this.position3.add(this.position2);
    
    stroke(0);
    strokeWeight(1);
    
    // Draw the arms
    line(this.origin.x, this.origin.y, this.position1.x, this.position1.y);
    line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
    line(this.position2.x, this.position2.y, this.position3.x, this.position3.y);
    ellipseMode(CENTER);
    fill(127);
    
    // Draw the balls
    ellipse(this.position1.x, this.position1.y, this.ballr, this.ballr);
    ellipse(this.position2.x, this.position2.y, this.ballr, this.ballr);
    ellipse(this.position3.x, this.position3.y, this.ballr, this.ballr);
    
  }
}

function start(){
  running=true;
  return
}

function pause(){
  if(running==true){
    paused=true;
  }
  return
  //if sim not running pressing pause shouldnt do anything
}

function resume(){
  if(paused==true){
    paused=false;
  }
  //if sim isn't paused pressing resume doesn't do anything
  return
}

function reset(){
  n1 = n2 = n3 = false
  running = paused = false;
  p1 = new Triple_Pendulum(createVector(425,10),pend_length,0,0,0);
  /*slider1.value(0);
  slider2.value(0);
  slider3.value(0);*/
  i = 0;
  
  return
}

//Normal mode 1 (equal lengths and masses)
function N1(){
  if(running==false){
    n1 = true
    n2 = false
    n3 = false
    omega = sqrt(g/pend_length)
  }
    
  else{
    return
  }
  
  /*slider3.value(22.5);
  slider2.value(22.5*.792113);
  slider1.value(22.5*.613037);*/
}



function N2(){
  if(running==false){
    n1 = false
    n2 = true
    n3 = false
    omega = sqrt(g/pend_length)*1.5
  }
    
  else{
    return
  }
  /*slider3.value(22.5);
  slider2.value(-22.5*.14714);
  slider1.value(-22.5*.416993);*/
}

function N3(){
 if(running==false){
    n1 = false
    n2 = false
    n3 = true
    omega = sqrt(g/pend_length)*2.2
  }
    
  else{
    return
  }
  /*slider3.value(-22.5*.466206);
  slider2.value(22.5);
  slider1.value(-22.5*.607913);*/
}

function renderWaves(omega_,x_spacing_,wave_width_){
    var N = floor(wave_width_/x_spacing_)
    var y = new Array(N)
    var d_theta = omega_*x_spacing_
    var A1,A2,A3
    if (n1){
      A1=22.5*.613037
      A2=22.5*.792113
      A3=22.5
    }
    else if(n2){
      A1=-22.5*.416993
      A2=-22.5*.14714
      A3=22.5
    }
    else{
      /*slider3.value(-22.5*.466206);
  slider2.value(22.5);
  slider1.value(-22.5*.607913);*/
      A1=-22.5*.607913
      A2=22.5
      A3=-22.5*.466206
    }
    //=============================================================
    beginShape()
    push()
    for( var i=0; i<=N; i++ ) {
      noFill()
      curveVertex(i*x_spacing_+600,x_axis_1-2*(A1)*cos(i*d_theta))
      pop()
    }
    endShape()
  
    beginShape()
    push()
    for( var i=0; i<=N; i++ ) {
      noFill()
      curveVertex(i*x_spacing_+600,x_axis_2-2*(A2)*cos(i*d_theta))
      pop()
    }
    endShape()
  
    beginShape()
    push()
    for( var i=0; i<=N; i++ ) {
      noFill()
      curveVertex(i*x_spacing_+600,x_axis_3-2*(A3)*cos(i*d_theta))
      pop()
    }
    endShape()
}

function framePlots(){
  
push()
  noStroke()
  fill(250)
  rect(600,15,600,150)
  rect(600,195,600,150)
  rect(600,375,600,150)
pop()

push()
  fill('black')
  textSize(14)
  text("Time",1200,x_axis_1+5)
  text("Time",1200,x_axis_2+5)
  text("Time",1200,x_axis_3+5)
  text("Angle 1",585,10)
  text("Angle 2",585,190)
  text("Angle 3",585,370)
pop()

push()
  line(600,x_axis_1,1200,x_axis_1)
  line(600,15,600,165)
  line(600,x_axis_2,1200,x_axis_2)
  line(600,195,600,345)
  line(600,x_axis_3,1200,x_axis_3)
  line(600,375,600,525)
pop()
}

function makePretty(){

push()
  fill('black')
  rect(395,10,60,5)
pop()
  
push()
  fill(240)
  rect(40,10,215,125)
pop()

push()
  fill('black')
  textSize(18)
  text("Select Initial Conditions:",50,30)
pop()

push()
  fill(240)
  rect(40,150,215,150)
pop()

push()
  fill('black')
  textSize(18)
  text("Run Simulation:",50,170)
pop()
}