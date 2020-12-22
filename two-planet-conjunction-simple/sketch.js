

let Slider;
let autoadvance = false;
let timeScale = 8;
let theTime = 0;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');

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
  earth = new OrbitingPlanet(planetSpacer*1,0);
  earth.planetColor = 'white'

  jupiter = new OrbitingPlanet(planetSpacer*2,0);
  jupiter.planetColor = 'orange'

  saturn = new OrbitingPlanet(planetSpacer*3,0);
  saturn.planetColor = 'yellow'

}

function draw(){

//reset the anomoly
  // if (B > 7*PI){B = 3*PI}

background(30)

//fill(255);

// if (autoadvance == true){
//   B += deltatime;
//   Slider.value(B)
// }
// else if (autoadvance == false){
//   B = Slider.value()
// }



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
jupiter.displayInSky()
saturn.displayInSky()
pop()

push()
translate(.75*width,.75*height)
noStroke()
fill(101,67,33,200)
rect(0,0,width/2, height/2)
pop()
push()
translate(.75*width, height/2)
stickFigure(20)
pop()

stroke('white')
strokeWeight(3)
line(width/2,0,width/2,height)

//make the orbit path
// push()
// fill(0,0,0,0)
// stroke(220);
// ellipse(+c,0,2*semimajor,2*semiminor)
// pop()

//make the sun
// push()
// noStroke()
// fill(240,200,40)
// translate(0,0)
// ellipse(0,0,40,40)
// pop()

//lable the sun
// push()
// fill(0)
// translate(0,0)
// text("Sun",-15,-30);
// pop()

//find the eccentric anomoly, by solving Kepler's equation, thanks to: http://www.jgiesen.de/kepler/kepler.html

// E = B + (eccentricity-(1/8)*Math.pow(eccentricity,3))*Math.sin(B)+(1/2)*Math.pow(eccentricity,2)*Math.sin(2*B)
// C = Math.cos(E)
// S = Math.sin(E)

// x-y position of the orbiter
//
// xpos = -semimajor*(C - eccentricity)
// ypos = semimajor*Math.sqrt(1-Math.pow(eccentricity,2))*S
//
// push()
// noStroke();
// translate(xpos,ypos);
// fill(0)


// push();
// //rotation about the planet's axis
// omega = 2*PI*(B*3/(4*PI))-PI/2;
// //rotate(-omega);
// circle(0,0,2)
// //image(mercuryImage,0,0);
// translate(0,-15)
// stickFigure(15);
// pop();

// shade the dark side
// push();
// fill(200);
// rotate(-E)
// fill(0,0,0,200)
// arc(0,0,30,30,PI/2,3*PI/2,CHORD)
// pop();

//pop();

//this part is used to figure out where the sun will be:

//Omega = Math.atan2(ypos,(-xpos));

// if (Omega < 0){Omega = Omega+2*PI}
//
// anglefromhorizon = -1*((Omega-(omega))+3*PI);
// anglefromhorizonReduced = anglefromhorizon % TWO_PI;
// degreesfromhorizonReduced = (degrees(anglefromhorizon) % 360);
// degreesfromnoon = anglefromhorizonReduced-90

//pop();

//Make the sky simulator
//push()
// sunx = 50*Math.cos(anglefromhorizonReduced)
// suny = 50*Math.sin(anglefromhorizonReduced)
//
// if (suny > 20 ) {
//   skyLight = 255
//   daystatus = 'day'
// }
// else if (suny <= -20 ) {
//   skyLight = 0
//   daystatus = 'night'
// }
// else if (suny > -20 && suny < 20){
//   skyLight = map(suny,-20,20,0,255)
//   if (sunx > 0 ){
//     daystatus = 'sunrise'
//   }
//   else if (sunx < 0 ){
//     daystatus = 'sunset'
//   }
// }
// daynight.html('Day/Night?')
// daynightstatus.html(daystatus)
// stroke(0)
// fill(skyLight)
// translate(90,daynight.y+115)
// rect(-60,-80,120,80)
// push()
// fill(240,200,40)
// noStroke()
// line(0,0,100,0)
//
//
// translate(-sunx,-suny)

// ellipse(0,0,20,20)
// pop()
// noStroke()
//
// fill(255)
// rect(-60,1,120,80)
// stickFigure(10)

// pop()

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
    stroke("white")
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

  displayInSky(){
    push()
    noStroke()
    fill(this.planetColor)
    this.skyx = width/8*Math.cos(this.anglefromhorizonReduced)
    this.skyy = width/8*Math.sin(this.anglefromhorizonReduced)
    translate(-this.skyx,-this.skyy)
    //translate(this.a*cos(this.rotation),0)
    circle(0,0,10)
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
