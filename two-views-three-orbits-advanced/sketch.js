

let Slider;
let autoadvance = false;
let timeScale = 8;
let theTime = 0;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  frameRate(30)
  planetSpacer = max(width/20,height/20);

  rectMode(CENTER);
  textSize(18)
  // semimajor = semimajor * windowWidth/300
  // semiminor = semimajor * Math.sqrt(1-Math.pow(eccentricity,2))
  // c = Math.sqrt(Math.pow(semimajor,2)-Math.pow(semiminor,2));
  //start stop button
  onoff = createButton("PLAY");
  onoff.parent('sketch-holder')
  onoff.mouseClicked(timeadvancertoggle);
  onoff.position(30,30);
  onoff.class("sim-button blue");

  //orbit control slider
  SliderLabel = createP("manual orbit control");
  SliderLabel.parent('sketch-holder');
  SliderLabel.position(30,60);
  SliderLabel.style('color','white')

  Slider = createSlider(-200, 10000, -200 ,1);
  Slider.size(200,30);
  Slider.parent('sketch-holder');
  Slider.position(30,100);
  Slider.class("sim-slider");



  //B = Slider.value()
  earth = new OrbitingPlanet(planetSpacer*1,.1);
  earth.inclination = .02
  earth.planetColor = 'white'

  jupiter = new OrbitingPlanet(planetSpacer*2,.2);
  jupiter.planetColor = 'orange'
  jupiter.inclination = -.05

  saturn = new OrbitingPlanet(planetSpacer*3,.15);
  saturn.planetColor = 'yellow'
  saturn.inclination = .08

}

function draw(){

background(30)



push()
//move it all to the center
translate(width/4,height/2)
earth.update()
earth.display()
saturn.update()
saturn.display()
jupiter.update()
jupiter.display()
translate(width/2,0)
earth.displaySideView()
jupiter.displaySideView()
saturn.displaySideView()
pop()


stroke('white')
strokeWeight(3)
line(width/2,0,width/2,height)

}



function timeadvancertoggle(){
  if (autoadvance == false){
  //deltatime = 1;
  onoff.html('PAUSE')
  autoadvance = true;
  }
  else {
    //deltatime = 0;
    onoff.html('PLAY')
    autoadvance = false;
  }
}

class OrbitingPlanet {

  constructor(semimajor,eccentricity) {
    this.a = semimajor;
    //this.B = Slider.value()*1/sqrt(pow(this.a,3))

    this.e = eccentricity;
    //semimajor = semimajor * windowWidth/300
    this.semiminor = this.a * Math.sqrt(1-Math.pow(this.e,2))
    this.c = Math.sqrt(Math.pow(this.a,2)-Math.pow(this.semiminor,2));

    //this.E = 0;
    //this.rotation = 0;
    //this.rotSpeed = 1/sqrt(pow(a,3));
  }

  // run() {
  //   this.update();
  //   this.display();
  // }


  update() {
    if (autoadvance == true){
      theTime += 1;
      Slider.value(theTime)
    }
    else if (autoadvance == false){
      theTime = Slider.value()
    }
    this.B = theTime*1/sqrt(pow(this.a,3))*timeScale;
    //this.B = Slider.value()*1/sqrt(pow(this.a,3))*timeScale;
    this.E = this.B + (this.e-(1/8)*Math.pow(this.e,3))*Math.sin(this.B)+(1/2)*Math.pow(this.e,2)*Math.sin(2*this.B)
    this.C = Math.cos(this.E)
    this.S = Math.sin(this.E)
    this.xpos = -this.a*(this.C - this.e)
    this.ypos = this.a*Math.sqrt(1-Math.pow(this.e,2))*this.S
    this.Omega = Math.atan2(this.ypos,(-this.xpos));
    //this.omega = 2*PI*(this.B*3/(4*PI))-PI/2;
    this.omega = 0
    //if (this.Omega < 0){this.Omega = this.Omega+2*PI}

    this.anglefromhorizon = 1*((this.Omega-(this.omega))+PI/2);
    this.anglefromhorizonReduced = this.anglefromhorizon % TWO_PI;

    //if (this.B > 7*PI){this.B = 3*PI}
    //this.rotation += this.rotSpeed*timeScale;
  }


  display() {
    push()
    noFill()
    strokeWeight(2)
    stroke(this.planetColor)
    ellipse(this.c,0,2*this.a,2*this.semiminor)
    pop()
    push()
    stroke(255)
    noStroke()
    fill(this.planetColor)
    translate(this.xpos,this.ypos);
    circle(0,0,10)
    pop()

  }

  displaySideView(){
    push()
    noStroke()
    fill(this.planetColor)
    // this.skyx = width/8*Math.cos(this.anglefromhorizonReduced)
    // this.skyy = width/8*Math.sin(this.anglefromhorizonReduced)
    rotate(this.inclination)

    translate(-this.xpos,0)
    //translate(this.a*cos(this.rotation),0)
    circle(0,0,10)
    pop()

    push()
    rotate(this.inclination)
    strokeWeight(2)
    stroke(this.planetColor)
    translate(-this.c,0)
    line(-this.a,0,this.a,0)
    pop()
  }


}


function stickFigure(figureHeight){
  push()
  noFill()
  strokeWeight(1)
  stroke(160,160,250)

ellipse(0,-figureHeight*(1+1/6),figureHeight/3,figureHeight/3)
torso = line(0,-figureHeight,0,-figureHeight/2)
lleg = line(0,-figureHeight/2,-figureHeight/4,0)
rleg = line(0,-figureHeight/2,+figureHeight/4,0)
larm = line(0,-figureHeight/1.2,-figureHeight/4,-figureHeight/1.4)
rarm = line(0,-figureHeight/1.2,figureHeight/4,-figureHeight/1.4)
pop()
}

function windowResized() {
  resizeCanvas(windowWidth*.9, windowHeight*.9);
  semimajor = 57.91 * windowWidth/300;
  semiminor = semimajor * Math.sqrt(1-Math.pow(eccentricity,2))
  c = Math.sqrt(Math.pow(semimajor,2)-Math.pow(semiminor,2));
}
