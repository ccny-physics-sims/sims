var capture;
var enumeratorPromise;

function setup() {
  canvas = createCanvas(390*2, 240*2);
  canvas.parent('sketch-holder')
  enumeratorPromise = navigator.mediaDevices.enumerateDevices();

  var constraints = {
    video: {
        optional: [{ maxFrameRate: 20 }]
    },
    audio: false
  };
  capture = createCapture(constraints, function(stream) {
    //console.log(stream);
  });
    capture.hide()
}

function draw() {
  background(255);
  image(capture, 0, 0, 320*2, 240*2);


}
