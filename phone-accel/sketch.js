
var ay = 0;


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
  createCanvas(windowWidth, windowHeight);



y_accel = new Arrow(createVector(width/2,height/2),createVector(width/2,(height/2)-50))
y_accel.color= color(230,20,20);
y_accel.drag=false;
y_accel.grab=false;
y_accel.wdth = 100;

}

function draw() {
  if (!hasSensorPermission){
     textSize(18);
     background(0);
     fill(255);
     noStroke();
     textAlign(CENTER);
     text("Tap the screen\nto request sensor permissions...",width/2,height/2);
     return;
   }

   ay = rotationY;

  // if (window.DeviceMotionEvent != undefined) {
  // 	window.ondevicemotion = function(e) {
  // 		ay = event.acceleration.y * 5;
  //   }
  // }

  background(250);
  y_accel.target.y = (height/2) + ay*3;
  y_accel.update();
  y_accel.display();


}

function touchEnded() {
  if (!hasSensorPermission){
    begPermission();
  }
  return false;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
