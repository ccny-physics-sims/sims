let earth, earthH;
let timeScale = 10;
function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.parent('sketch-holder')
  planetSpacer = width/20
  // sliderTime = createSlider(0,1000,400,10);
  // sliderTime.parent('sketch-holder');
  // sliderTime.position(100, 100);
  // sliderTime.class("sim-slider");
  earth = new OrbitingPlanet(planetSpacer*1,10);
  earth.planetColor = 'white'
  earthH = new OrbitingPlanet(planetSpacer*1,10);
  earthH.planetColor = 'white'
  jupiter = new OrbitingPlanet(planetSpacer*2,10);
  jupiter.planetColor = 'white'
  jupiterH = new OrbitingPlanet(planetSpacer*2,10);
  jupiterH.planetColor = 'white'
  saturn = new OrbitingPlanet(planetSpacer*3,10);
  saturn.planetColor = 'white'
  saturnH = new OrbitingPlanet(planetSpacer*3,10);
  saturnH.planetColor = 'white'
}

function draw() {

  background(30);
  stroke('white')
  strokeWeight(3)
  line(width/2,0,width/2,height)
  stroke('gray')
  strokeWeight(2)
  line(.6*width,height/2,.9*width,height/2)
  translate(width/4,height/2)
  makeSun()


  earth.update()
  earth.display()
  jupiter.update()
  jupiter.display()
  saturn.update()
  saturn.display()

  translate(width/2,0)
  earthH.update()
  earthH.displayHorizontal()
  jupiterH.update()
  jupiterH.displayHorizontal()
  saturnH.update()
  saturnH.displayHorizontal()

}

function makeSun(){
  push()
  noStroke()
  fill('yellow')
  circle(0,0,3)
  pop()
}


class OrbitingPlanet {

  constructor(a,r) {
    this.a = a;
    this.r = r;
    this.rotation = 0;
    this.rotSpeed = 1/sqrt(pow(a,3));
  }

  run() {
    this.update();
    this.display();
  }


  update() {
    this.rotation += this.rotSpeed*timeScale;
  }


  display() {
    push()
    noFill()
    strokeWeight(2)
    stroke("gray")
    circle(0,0,this.a*2)
    pop()
    push()
    stroke(255)
    noStroke()
    fill(this.planetColor)
    rotate(this.rotation)
    translate(this.a,0)
    circle(0,0,this.r)
    pop()

  }

  displayHorizontal(){
    push()
    noStroke()
    fill(this.planetColor)
    translate(this.a*cos(this.rotation),0)
    circle(0,0,this.r)
    pop()
  }


}
