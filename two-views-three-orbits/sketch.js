let earth, earthH;
let timeScale = 10;
let autoadvance = false;
function setup() {
  canvas = createCanvas(windowWidth,windowHeight)
  canvas.parent('sketch-holder')
  frameRate(30)
  timeScale = map(width,500,1820,5,20)
  planetSpacer = width/20
  //start stop button
  onoff = createButton("PLAY");
  onoff.parent('sketch-holder')
  onoff.mouseClicked(timeadvancertoggle);
  onoff.position(30,30);
  onoff.class("sim-button blue");

  earth = new OrbitingPlanet(planetSpacer*1,10,'inner');
  earth.planetColor = 'white'
  earthH = new OrbitingPlanet(planetSpacer*1,10,'inner');
  earthH.planetColor = 'white'
  jupiter = new OrbitingPlanet(planetSpacer*2,10,'middle');
  jupiter.planetColor = 'white'
  jupiterH = new OrbitingPlanet(planetSpacer*2,10,'middle');
  jupiterH.planetColor = 'white'
  saturn = new OrbitingPlanet(planetSpacer*3,10,'outer');
  saturn.planetColor = 'white'
  saturnH = new OrbitingPlanet(planetSpacer*3,10,'outer');
  saturnH.planetColor = 'white'
  noLoop()
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

  constructor(a,r,label) {
    this.a = a;
    this.r = r;
    this.rotation = 0;
    this.rotSpeed = 1/sqrt(pow(a,3));
    this.label = label
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
    push()

    line(this.a*cos(this.rotation),20,this.a*cos(this.rotation),50)
    textAlign(CENTER);
    noStroke()
    fill('white')
    text(this.label,this.a*cos(this.rotation),70)
    pop()
  }


}

function timeadvancertoggle(){
  if (autoadvance == false){
  //deltatime = 1;
  onoff.html('PAUSE')
  autoadvance = true;
  loop()
  }
  else {
    //deltatime = 0;
    onoff.html('PLAY')
    autoadvance = false;
    noLoop();
  }
}
