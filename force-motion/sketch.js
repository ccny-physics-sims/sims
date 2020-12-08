var whitish = 200;
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
let hasSensorPermission = !(DeviceOrientationEvent.requestPermission || DeviceMotionEvent.requestPermission);
const touch = matchMedia('(hover: none)').matches;
function begPermission(){
  if (DeviceOrientationEvent.requestPermission){
    DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {

        if (DeviceMotionEvent.requestPermission){
          DeviceMotionEvent.requestPermission()
          .then(response => {
            if (response == 'granted') {
              hasSensorPermission = true;
              window.ondevicemotion = function(event) {

                // devices such as iOS 13 doesn't have accleration,
                // instead they have accelerationIncludingGravity, producing inconsistent behavior.
                // here we patch it by canelling out the gravitational acclerration.
                // alternatively, we add the gravitational acceleration to android phones.
                if (!event.acceleration){

                  // compute gravitational acceleration's component on X Y Z axes based on gyroscope
                  // g = ~ 9.80665
                  let grav = TRFM(MULT(
                    ROTY(radians(rotationY)),
                    ROTX(radians(rotationX))
                  ),[0,0,-9.80665]);

                  accX =  (event.accelerationIncludingGravity.x+grav[0]);
                  accY =  (event.accelerationIncludingGravity.y+grav[1]);
                  accZ =  (event.accelerationIncludingGravity.z-grav[2]);

                  // p5 appears to be doubling the acceleration:
                  // https://github.com/processing/p5.js/blob/main/src/events/acceleration.js#L647
                  accX *= 2;
                  accY *= 2;
                  accZ *= 2;
                }

              }
            }
          })
          .catch(alert)
        }
      }
    })
    .catch(alert)
  }
}



function setup() {
frameRate(30);


canvas = createCanvas(windowWidth, windowHeight);
canvas.parent('sketch-holder')
//canvas = createCanvas(600,600);
pos = createVector(random(0,width),random(0,height))
vel = createVector(2,0);
accel = createVector(0,0);

ball = new Mass(pos,vel,accel,20,color(0,0));


velVector = new OldArrow(pos,vel);
velVector.color = color(whitish);
velVector.width = 4;
velVector.showComponents = false;

accelVector = new OldArrow(pos,accel);
accelVector.color = color(whitish);
accelVector.width = 4;
accelVector.showComponents = false;

}

function draw() {
//flicker
if (!hasSensorPermission){
   textSize(18);
   background(0);
   fill(255);
   noStroke();
   textAlign(CENTER);
   text("Tap the screen\nto request sensor permissions...",width/2,height/2);
   return;
 }

background(random(16,23));
//background('blue')
whitish = random(170,215);
translate(random(-1,1),random(-1,1))
//should we change acceleration?

  if(keyIsDown(LEFT_ARROW)){
    accel.x-=.002;
  }
  if (keyIsDown(RIGHT_ARROW)){
    accel.x+=.002;
  }
  if (keyIsDown(UP_ARROW)){
    accel.y-=.002;
  }
  if (keyIsDown(DOWN_ARROW)){
    accel.y+=.002;
  }
  if (touch) {
      //Conditional script here
      accel.y = rotationX*.01;
      accel.x = rotationY*.01;
  }




velVector.origin = ball.position;
velVector.target = p5.Vector.add(p5.Vector.mult(ball.velocity,20),ball.position);
if(p5.Vector.mag(ball.velocity)!=0){
velVector.display();
}

//let's make the acceleration vector a little neater
accel.x = Math.round(accel.x*1000)/1000
accel.y = Math.round(accel.y*1000)/1000
ball.acceleration = accel.copy();


accelVector.origin = ball.position;
accelVector.target = p5.Vector.add(p5.Vector.mult(ball.acceleration,1500),ball.position);

if(p5.Vector.mag(ball.acceleration)!=0){
accelVector.display();
}

ball.update();
ball.wrapEdges();
//display changes
ball.display();

}



function OldArrow(origin_, target_){

  this.origin = origin_.copy();
  this.target = target_.copy();

  //control handles

  this.color = whitish;
  this.width = 20;


  //mouse old coordinates for transalation
  this.oldX = 0;
  this.oldY = 0;

}


OldArrow.prototype.display = function(){

  push();
  fill(this.color);
  noStroke();
  var d = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
  var w = this.width;
  translate(this.origin.x,this.origin.y);
  var angle = angCalc(this);
  rotate(angle);
  //draw OldArrow
  drawOldArrow(w,d,this);
  pop();//reset drawing state



};





function drawOldArrow(thickness,length,OldArrow){
  //draw the OldArrow itself
  translate(0,-thickness/2);

  rect(0, thickness/4, length-15, thickness/2);
  //line(length-8,-20,length,0);
  noFill();
  stroke(whitish);
  strokeWeight(2)
  strokeJoin(ROUND);
  triangle(length-15, -2, length-15, 6, length+(thickness/2), 2);



}


function angCalc(OldArrow){
  //angleMode(DEGREES);
  return atan2(OldArrow.target.y-OldArrow.origin.y,OldArrow.target.x-OldArrow.origin.x);
};


function Mass(position, velocity, acceleration, m, color){
  this.position = new createVector(position.x, position.y);
  this.velocity = new createVector(velocity.x, velocity.y);
  this.acceleration = new createVector(acceleration.x, acceleration.y);
  this.limit = 20;
  this.mass = m;
  this.color = color;
  this.size = this.mass;
  this.outline = {strokeColor: whitish, weight: 3};
  this.history = [];
}


Mass.prototype.update = function(){
  this.outline = {strokeColor: whitish, weight: 3};



  this.velocity.add(this.acceleration);
  this.velocity.limit(this.limit);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  if (frameCount%10==0){
  var v = [this.position.x, this.position.y];
  this.history.push(v);
    if (this.history.length > 7) {
      this.history.splice(0, 1);
    }
  }
};


Mass.prototype.display = function(){
  push();
  fill(this.color);
  stroke(this.outline.strokeColor);
  strokeWeight(this.outline.weight)
  ellipse(this.position.x,this.position.y,this.size,this.size);
  pop();


  for (var i = 0; i < this.history.length; i++) {
  var pos = this.history[i];
  noStroke();
  fill(whitish);
  push();
  translate(pos[0],pos[1]);
  ellipse(0, 0, 3, 3);
  pop();
}

};

//Behaviors
Mass.prototype.wrapEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};

function touchEnded() {
  if (!hasSensorPermission){
    begPermission();
  }
  return false;
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}
