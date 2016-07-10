aForceVector = [];

function setup() {
  createCanvas(800, 500);


  startPoint = createVector(width / 2, height / 2);
  vdisp = createVector(random(50, 150), random(-50, -150));
  vdisp2 = createVector(random(50, 150), random(50, 150));

  midPoint = p5.Vector.add(startPoint, vdisp)
  endPoint = p5.Vector.add(midPoint, vdisp2)

  aForceVector[0] = new Arrow(startPoint, midPoint);
  aForceVector[0].color = color(230,20,20);

  aForceVector[1] = new Arrow(midPoint, endPoint);
  aForceVector[1].color = color(20,20,230);

  theResultant = new Arrow(startPoint, endPoint);
  theResultant.color = color(230,20,230);
  theResultant.grab = 'false';
  theResultant.draggable = 'false';

}



function draw() {

  background(250);
  line(width/2,0,width/2,height)
  line(0,height/2,width,height/2)
  for (var i = 0; i < 2; i++) {
    aForceVector[i].display();
    aForceVector[i].update();
    if (aForceVector[i].isDragging == true){
      for (var j = 0; j < 2; j++){
        if (j != i){
          aForceVector[j].draggable = false;
          aForceVector[j].grab = false;
        }
      }
    }
    else {
      aForceVector[i].draggable = true;
      aForceVector[i].grab = true;
    }
  }

  var temp1 = aForceVector[0].target.copy();
  var temp2 = aForceVector[1].target.copy();
  temp1.sub(aForceVector[0].origin);
  temp2.sub(aForceVector[1].origin);
  temp1.add(temp2);
  theResultant.target.x = temp1.x + theResultant.origin.x;
  theResultant.target.y = temp1.y + theResultant.origin.y;
  theResultant.display();
  theResultant.update();


  //console.log(somethingIsDragging);
}
