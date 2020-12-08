aForceVector = [];

function setup() {
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent("sketch-holder");

  startPoint = createVector(width / 2, height / 2);
  vdisp = createVector(random(50, 150), random(-50, -150));
  vdisp2 = createVector(random(50, 150), random(50, 150));

  midPoint = p5.Vector.add(startPoint, vdisp)
  endPoint = p5.Vector.add(midPoint, vdisp2)

  aForceVector[0] = new Arrow(startPoint, midPoint);
  aForceVector[0].color = color(230,20,20);
  aForceVector[0].showComponents = true;
}



function draw() {

  background(250);
  line(width/2,0,width/2,height)
  line(0,height/2,width,height/2)

    aForceVector[0].display();
    aForceVector[0].update();


}
