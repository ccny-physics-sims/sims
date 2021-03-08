
var ay = 0;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);



y_accel = new Arrow(createVector(width/2,height/2),createVector(width/2,(height/2)-50))
y_accel.color= color(230,20,20);
y_accel.drag=false;
y_accel.grab=false;
y_accel.wdth = 100;

}

function draw() {
  if (window.DeviceMotionEvent != undefined) {
  	window.ondevicemotion = function(e) {
  		ay = event.acceleration.y * 5;
    }
  }

  background(250);
  y_accel.target.y = (height/2) + ay*3;
  y_accel.update();
  y_accel.display();


}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
