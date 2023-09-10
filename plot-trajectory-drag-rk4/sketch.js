let g = 9.8;
let quadDragConst;
let linDragConst;
let vx0
let vy0

let x0 = 0
let y0 = 0

let X,Y;

let Xpos = []
let Ypos = []

let Xvel = []
let Yvel = []

let n = 100;
let h = .1;

let savedXpos = false;
let savedYpos = false;

let theta = 45
let thetaRad = theta*3.1415926/180
let range

let img;
function preload() {
  img = loadImage('ground.png');
}

function setup() {

    canvas = createCanvas(windowWidth, windowHeight*.9);
    canvas.parent('sketch-holder');
    frameRate(30);
    sliderWidth = min(300,width/3)

    saveButton = createButton("Save Trajectory");
    saveButton.parent('sketch-holder');
    saveButton.position(.75*width,30);
    saveButton.class("sim-button")
    saveButton.mouseClicked(saveTrajectory);
    
    lineardampingControl = createSlider(0,1,0,0);
    lineardampingControl.position(40,height*.05)
    lineardampingControl.parent('sketch-holder')
    lineardampingControl.class("sim-slider");
    lineardampingControl.input(sliderChange);
    lineardampingControl.size(sliderWidth,0)
    lineardampingControlLabel = createP("Linear Damping (b = "+lineardampingControl.value().toFixed(4)+")");
    lineardampingControlLabel.position(lineardampingControl.x,lineardampingControl.y+10);
    lineardampingControlLabel.parent('sketch-holder')


    quaddampingControl = createSlider(0,.02,0,0);
    quaddampingControl.position(lineardampingControl.x,lineardampingControl.y+60)
    quaddampingControl.parent('sketch-holder')
    quaddampingControl.class("sim-slider");
    quaddampingControl.input(sliderChange);
    quaddampingControl.size(sliderWidth,0)
    quaddampingControlLabel = createP("Quadratic Damping (c = 0)");
    quaddampingControlLabel.position(lineardampingControl.x,quaddampingControl.y+10);
    quaddampingControlLabel.parent('sketch-holder')

    // massControl = createSlider(.1,10,1,0);
    // massControl.position(80,quaddampingControl.y+60)
    // massControl.parent('sketch-holder')
    // massControl.class("sim-slider");
    // massControl.input(sliderChange);
    // massControlLabel = createP("Mass (m = 1)");
    // massControlLabel.position(80,massControl.y+10);
    // massControlLabel.parent('sketch-holder')
  
    thetaControl = createSlider(0,90,theta,.1);
    thetaControl.position(lineardampingControl.x,quaddampingControl.y+60)
    thetaControl.parent('sketch-holder')
    thetaControl.class("sim-slider");
    thetaControl.input(sliderChange);
    thetaControl.size(sliderWidth,0)
    thetaControlLabel = createP("Theta = 45");
    thetaControlLabel.position(lineardampingControl.x,thetaControl.y+10);
    thetaControlLabel.parent('sketch-holder')

    v_0 = sqrt(width*.8*g/sin(2*abs(theta*PI/180)));
    vx0 = v_0*cos(theta)
    vy0 = v_0*sin(theta)
    quadDragConst = quaddampingControl.value()
    linDragConst = lineardampingControl.value()
    noLoop()
}

function draw() {
    background('#d3edf8')
    image(img, 0, height*.9);
    translate(width*.1, .95*height)
    vx = v_0*cos(thetaRad)
    vy = v_0*sin(thetaRad)
    x = x0
    y = y0

    Xpos = []
    Ypos = []

    Ypos.push(y)
    Xpos.push(x)
    while ((y+.001) > y0) {
    //for (i = 1; i<n; i++) {
    //console.log(y);

    Y = solveY(y,vx,vy,h)
    X = solveX(x,vx,vy,h)
    


    x = X.x
    y = Y.y

    vx = X.vx
    vy = Y.vy
    

    Xpos.push(x)
    Ypos.push(y)

    Xvel.push(vx)
    Yvel.push(vy)
    }
    
    push()
    fill('blue')
    noStroke()
    for (i=0;i<Xpos.length;i++) {
    ellipse(Xpos[i], -Ypos[i], 4, 4);
    }
    pop()
    if (savedXpos) {
    plotSavedTrajectory()
    }
    range = Xpos.pop()
    line(range,y0,range,y0-100)
    //text('range = '+range.toFixed(2),range-50,y0-120)
    text('range',range-15,y0-120)
}

function ODEy0(vy) {
    return vy
}

function ODEy1(vx,vy) {
    return -quadDragConst * vy*sqrt(vx * vx + vy * vy) - linDragConst*vy - g
}

function solveY(y,vx,vy,h) {
  l1 = h * ODEy0(vy) ;
  k1 = h * ODEy1(vx, vy)

	l2 = h * ODEy0(vy + k1 / 2.0);
	k2 = h * ODEy1(vx, vy + k1 / 2.0) ;

	l3 = h * ODEy0(vy + k2 / 2.0) ;
	k3 = h * ODEy1(vx, vy + k2 / 2.0) ;

	l4 = h * ODEy0(vy + k3);
	k4 = h * ODEy1(vx, vy + k3);

  y += (l1 / 6.0 + l2 / 3.0 + l3 / 3.0 + l4 / 6.0);
	vy += (k1 / 6.0 + k2 / 3.0 + k3 / 3.0 + k4 / 6.0);
    
    return {
        y, vy
      };

}

function ODEx0(vx) {
	return vx;
}

function ODEx1(vx, vy) {
	return -quadDragConst * vx * sqrt(vx * vx + vy * vy) - linDragConst* vx
}

function solveX(x, vx, vy,  h) {

	l1 = h * ODEx0(vx);
	k1 = h * ODEx1(vx, vy);

	l2 = h * ODEx0(vx + k1 / 2.0);
	k2 = h * ODEx1(vx + k1 / 2.0, vy);

	l3 = h * ODEx0(vx + k2 / 2.0)
	k3 = h * ODEx1(vx + k2 / 2.0, vy)

	l4 = h * ODEx0(vx + k3);
	k4 = h * ODEx1(vx + k3, vy);

	x += (l1 / 6.0 + l2 / 3.0 + l3 / 3.0 + l4 / 6.0);
	vx += (k1 / 6.0 + k2 / 3.0 + k3 / 3.0 + k4 / 6.0);

	return {
        x, vx
      };
}

function sliderChange() {
    lineardampingControlLabel.html("Linear Damping (b = "+lineardampingControl.value().toFixed(5)+")")
    quaddampingControlLabel.html("Quadratic Damping (c = "+quaddampingControl.value().toFixed(5)+")")
    //massControlLabel.html("Mass (m = "+massControl.value().toFixed(2)+")")
    thetaControlLabel.html("Theta = "+thetaControl.value().toFixed(1)+")")
  
    quadDragConst = quaddampingControl.value()
    linDragConst = lineardampingControl.value()
    theta = thetaControl.value()
    thetaRad = thetaControl.value()*PI/180

    Xvel = []
    Yvel = []
    redraw()

  }

  function saveTrajectory(){
    savedXpos = Xpos
    savedYpos = Ypos
    savedLinDrag = linDragConst;
    savedQuadDrag = quadDragConst;
    savedTheta = theta;
    //plotSavedTrajectory()
    redraw()
  }

  function plotSavedTrajectory() {
    push()
    fill('red')
    noStroke()
    for (i=0;i<savedXpos.length;i++) {
    ellipse(savedXpos[i], -savedYpos[i], 3, 3);
    }
 
    halfway = floor(savedXpos.length/2)
    text('b = '+savedLinDrag.toFixed(4),5+savedXpos[halfway],-savedYpos[halfway]-35)
    text('c = '+savedQuadDrag.toFixed(4),5+savedXpos[halfway],-savedYpos[halfway]-20)
    text('theta = '+savedTheta.toFixed(2)+' deg',5+savedXpos[halfway],-savedYpos[halfway]-5)
    pop()
  }