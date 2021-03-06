var pointApplied_x;

function setup(){
  canvas=createCanvas(windowWidth,0.9*windowHeight);
  canvas.parent('sketch-holder');
  background('white');

//Create some vectors, arrows, and a slider
  center = createVector(150,275);
  pointApplied_x = createSlider(0,350,300,10);
  pointApplied_x.parent('sketch-holder');
  pointApplied_x.position(300,35);
  pointApplied_x.class("sim-slider gray");
  end = createVector(450,450);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);
  positionVector = new Arrow(center,pointApplied);
  force1 = new Arrow(positionVector.target,end);

}

function draw(){
  background('white');
  strokeWeight(1);
//Draw wrench and bolt
  fill('grey');
  rect(200,250,300,50);
  polygon(center.x,center.y,80,6);
  fill('white');
  noStroke();
  rect(70,250,110,50);
  fill('gray');
  stroke(1);
  polygon(center.x,center.y,28,6);
  fill('white');
  ellipse(center.x,center.y,30,30);
  line(85,250,180,250);
  line(85,300,180,300);
  line(180,250,180,300);

  line(center.x,center.y,center.x+100+pointApplied_x.value(),center.y);

  stroke(1);
  pointApplied = createVector(center.x+pointApplied_x.value(),center.y);

  positionVector = new Arrow(center,pointApplied);
  positionVector.color = color('blue');
  positionVector.width = 10;
  positionVector.showComponents = false;
  positionVector.draggable = false;
  positionVector.grab = false;

//save old value to use for compensating for slider change
  oldX = force1.origin.x;

  force1.origin.x = pointApplied.x;
  force1.color = color('red');
  force1.grab = true;
  force1.draggable = false;
  force1.showComponents = false;


//keeping integrity of force vector while enduring slider change
  if (force1.origin.x != oldX){
    dx = force1.origin.x - oldX;
    force1.target.x = force1.target.x + dx;
  };

  positionVector.update();
  force1.update();
  positionVector.display();
  force1.display();

  //calculate angle phi between position and force vector (limited to (-90,90)degrees)
  //so absolute value of x so that y value is used to give proper sign/sense for torque calculation
  phi = atan((force1.target.y-force1.origin.y)/abs(force1.target.x-force1.origin.x));
  force1mag = dist(force1.origin.x,force1.origin.y,force1.target.x,force1.target.y);

  //Calculate Torque
  torque = -1*sin(phi)*force1mag*pointApplied_x.value()/1000;
  //when pointApplied_x.val = 100 , take to be 10cm, divide by 1000 for N-m torque calculation

  push()
  noStroke();
  fill('black');
  textSize(18);
  text("Applied Force (F) = "+force1mag.toFixed(0)+" N",50,110);
  text("Torque = "+torque.toFixed(1)+" N-m",50,130);
  text("Position Vector (r) = "+(pointApplied_x.value()/10).toFixed(0)+" cm",50,50);
  text("F",force1.target.x+15,force1.target.y+15);
  fill('white')
  text("r",positionVector.target.x-75,positionVector.target.y+20);
  fill('black')
  if (phi != 0 ){
    text("\u03A6",pointApplied.x+20,pointApplied.y-5);
  } else if (phi==0 && force1.target.x < positionVector.target.x){
    text("\u03A6",pointApplied.x+20,pointApplied.y-5);
  };

//conditionals to properly display angle phi in degrees
//depending which of its own quadrants the force vector lies in
  if (torque < 0 && force1.target.x >= positionVector.target.x){
    text("Angle \u03A6 = "+abs((2*PI-phi)*180/PI).toFixed(2)+" degrees",50,80);
  } else if (torque < 0 && force1.target.x < positionVector.target.x){
    text("Angle \u03A6 = "+abs((phi+PI)*180/PI).toFixed(2)+" degrees",50,80);
  } else if (torque > 0 && force1.target.x >= positionVector.target.x){
    text("Angle \u03A6 = "+abs((phi)*180/PI).toFixed(2)+" degrees",50,80);
  } else if (torque > 0 && force1.target.x < positionVector.target.x){
    text("Angle \u03A6 = "+abs((phi+PI)*180/PI).toFixed(2)+" degrees",50,80);
  } else if (torque == 0 && force1.target.x > positionVector.target.x){
    text("Angle \u03A6 = "+0+" degrees",50,80);
  }  else if (torque == 0 && force1.target.x < positionVector.target.x){
  text("Angle \u03A6 = "+180+" degrees",50,80);
};
pop();
//draw torque vector into or out of page at center of nut/bolt
  if (torque < 0){
    strokeWeight(3);
    line(center.x-10,center.y-10,center.x+10,center.y+10);
    line(center.x-10,center.y+10,center.x+10,center.y-10);
    noFill();
    arc(center.x, center.y, 30, 30, 0, TWO_PI);

  } else if (torque > 0){
    strokeWeight(3);
    ellipse(center.x, center.y, 5, 5);
    noFill();
    arc(center.x, center.y, 30, 30, 0, TWO_PI);
  }

  //drawing angle phi
  noFill();
  stroke('purple');
  if (torque < 0 && force1.target.x >= positionVector.target.x){
    arc(pointApplied.x,pointApplied.y,75,75,phi,0);
  } else if (torque < 0 && force1.target.x < positionVector.target.x){
    arc(pointApplied.x,pointApplied.y,75,75,PI-phi,0);
  } else if (torque > 0 && force1.target.x >= positionVector.target.x){
    arc(pointApplied.x,pointApplied.y,75,75,phi,0);
  } else if (torque > 0 && force1.target.x < positionVector.target.x){
    arc(pointApplied.x,pointApplied.y,75,75,PI-phi,0);
  } else if (torque == 0 && force1.target.x <positionVector.target.x){
    arc(pointApplied.x,pointApplied.y,75,75,PI-phi,0);
  };

  stroke('black');


  // console.log(phi)
}

//taken from p5.js examples
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
