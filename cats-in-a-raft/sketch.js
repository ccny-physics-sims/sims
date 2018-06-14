//stuff that still needs work
//-optimizing the program to run most efficiently
//-fixing the scaling and axis values for the cat and raft vectors (make them real)


function setup(){
  canvas = createCanvas(800,600);
  canvas.parent("sketch-holder");

  cat_img = loadImage("mrTibbles.png");
  imageMode(CORNER);

  v1 = createVector(width/2,height/2);
  v2 = createVector(random(-100,100),random(-100,100));
  v2.normalize();
  v2.mult(2);
  b1 = new Raft(v1);
  //b1.throwCat(v2);

  catslider = createSlider(1,40,10);
  catslider.position(20,500);
  catslider.class("sim-slider gray");
  catslider.parent
  raftslider = createSlider(5,150,10);
  raftslider.position(20,550);
  raftslider.class("sim-slider gray");
  raftslider.parent

  // handlers for trails left by cats so you can see where they have been
  trailTimer_MAX = 10;
  trailTimer = trailTimer_MAX;
  trailHandler = [];
};
function draw(){
  background(color(167, 210, 228));
  point(width/2,height/2);
  //draw grid
  // stroke(100);
  // var inc = 30;
  // for (var i = 0; i <width;i++){
  //   line(i*inc,0,i*inc,height);
  // }
  // for (var i = 0; i <height;i++){
  //   line(0,i*inc,width,i*inc);
  // }
  if(trailTimer > 0){

    trailTimer--;
  }
  else{
    trailTimer = trailTimer_MAX;
    for(var i = 0; i < b1.catHandler.length;i++){
      if(b1.catHandler[i].dead == false){
        trailHandler.push(b1.catHandler[i].pos.copy());
      }

    }
  }
  for(var i = 0; i < trailHandler.length; i++){
    fill(255,0,0,150)
    ellipse(trailHandler[i].x,trailHandler[i].y,5,5)
  }
  //keeps the trailHandler's length managable
  var hCut = 30;
  if(trailHandler.length > hCut){
    trailHandler = trailHandler.slice(-1 * hCut);
  }

  b1.update();
  b1.draw();
  b1.mass = raftslider.value();




  //labels for sliders
  push();
  noStroke();
  fill(0);
  text("Mass of Cats",150,500);
  text("Mass of Raft",150,550);
  //text value of slider
  text(raftslider.value().toString(),100,550);
  text(catslider.value().toString(),100,500);
  pop();
};
function touchStarted(){
  var s = createVector(mouseX-b1.pos.x,mouseY-b1.pos.y);
  s.normalize();
  s.mult(random(2,5));
  b1.throwCat(s,catslider.value());
  if(b1.throwCat[b1.throwCat.length-1]){
    b1.throwCat[b1.throwCat.length-1].mass = catslider.value();
  }
  return false;

};
function main(){

}
