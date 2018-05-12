var xspacing = 1 //Why?
var Re //Store values of REAL part of wavefunction
var Im //Store values of IMAGINARY part of wavefunction
var p //Store values of Mag(Psi)^2
var theta // theta = wt (intialized to zero when init() function is called)
var wavelength1 //Wavelength depends on E-V
var wavelength2 //Wavelength2 should be longer in region2 if E-V is smaller
var dx1 //The amount by which the argument of cos(kx+-wt) increases (for a fixed time) from one point to the next in region 1
var dx2 //Region 2
var omega  //Needs to be changed when E changes
var A_I = 1 //Amplitude of incident wave
var A_R
var A_T
var E //Total energy of incident particle
var V0 //Height of potential barrier
var E_slider //Controls value of E
var V_slider
var ground // y coordinate of line marking V = 0
var x_axis //y coordinate of x-axis for plot
var optionsRadio;



function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');

  frameRate(30)//60 too fast??

  //Sliders and checkboxes
  E_slider = createSlider(0+4,280,150+126/2 ,1)
  E_slider.class("sim-slider gray ");
  V_slider = createSlider(0,300,150,1)
  V_slider.class("sim-slider gray ");
  //E_slider = createSlider(1,100,100,1)
  //V_slider = createSlider(0,100,0,1)


  optionsRadio = createRadio();
  optionsRadio.position(.1*width, .9* height);
  optionsRadio.option('Re [Psi]', 'Re');
  optionsRadio.option('Im [Psi]', 'Im');
  optionsRadio.option('P |Psi|^2', 'P');
  optionsRadio.value('Re');
  optionsRadio.class("sim-radio");
  //optionsRadio.changed(switchMethodofTransportation);
  leftEq = createP('&Psi;(x,t) = (A<sub>I</sub> e<sup>k<sub>1</sub>x</sup>  + A<sub>R</sub> e<sup>-k<sub>1</sub>x</sup> )e<sup>-i (E / &hbar;) t</sup> ');
  leftEq.style('font-style: italic ;  font-size: 14pt;')
  leftEq.position(.1*width,height/2+10);
  rightEq = createP('&Psi;(x,t) = (A<sub>T</sub> e<sup>k<sub>2</sub>x</sup>  )e<sup>-i (E / &hbar;) t</sup> ');
  rightEq.position(.7*width,height/2+10);
  rightEq.style('font-style: italic; font-size: 14pt;');
  init()

  reset()

}

function draw() {

  background(255)



  if (E_slider.value()==E && V_slider.value()==V0){ //Sliders haven't changed
    calcWave()
    renderWave()
    DrawStuff()//Title,labels,frames,axis,etc.
  }

  else { //Slider changed so init() function is called
    E = E_slider.value()
    V0 = V_slider.value()
    reset()
    calcWave()
    renderWave()
    DrawStuff()

  }


}

//Calculates the wave at all x locations for a given value of wt
function calcWave(){
  wavelength1 = 400/sqrt(E)

  if(E>V0){
    wavelength2 = 400/sqrt(E-V0)
  }
  else{
    wavelength2 = 400/sqrt(V0-E)
  }

  dx1 = ( (TWO_PI) / wavelength1 ) * xspacing
  dx2 = ( (TWO_PI) / wavelength2 ) * xspacing

  A_R = ( (wavelength2 - wavelength1) / (wavelength1 + wavelength2) ) * A_I
  A_T = ( 2*(wavelength2) / (wavelength1 + wavelength2) ) * A_I

  theta += .01 * omega

  var x0 = -floor(N/2)

  for ( var i=0; i<N ; i++ ){
    if (i<=floor(N/2)){

        Re[i] = A_I*cos(-theta+(i+x0)*dx1)+A_R*cos(-theta-(i+x0)*dx1)
        Im[i] = A_I*sin(-theta+i*dx1)+A_R*sin(-theta-i*dx1)
        p[i] = (sq(A_I)+sq(A_R))+(2*A_I*A_R)*(sq(cos(i*dx1))-sq(sin(i*dx1)))

    }

    if (i>floor(N/2)){

      if (E<V0){
        //Decaying exponential
        Re[i] = A_T*Math.exp(-(i+x0)*dx2)
        Im[i] = 0
        p[i] = sq(A_T*Math.exp(-(i+x0)*dx2))
      }

      else{
        //Plane Wave
        Re[i] = A_T*cos(-theta+(i+x0)*dx2)
        Im[i] = A_T*sin(-theta+(i+x0)*dx2)
        p[i] = sq(A_T)

      }
    }

  }
}


function renderWave() {

push()
  noFill()
  strokeWeight(2)
  val = optionsRadio.value();
  beginShape()
    if (val == 'Re'){
      stroke('red')
      for (var x = 0; x < N; x+=1) {
      curveVertex(x*xspacing, x_axis-40*Re[x])
      }
    }
    else if (val == 'Im'){
      stroke('blue')
      for (var x = 0; x < N; x+=1) {
      curveVertex(x*xspacing, x_axis-40*Im[x])
      }
    }
    else if (val == 'P'){
      for (var x = 0; x < N; x+=1) {
      curveVertex(x*xspacing, x_axis-40*p[x])
      }
    }
  endShape()
pop()
}

function reset(){
  omega=.1*E
  theta = 0
}

function DrawStuff() {
  //Make top half grey
  push();
   noStroke();
   fill(240)
   rect(0,0,width,ground)
  pop()

  push()
    textSize(20)
    text("1-D Quantum Scattering",width/2-100,20)
  pop()





  //Axis to graph wavefunction and probability density
  push()
   stroke(10)
   strokeWeight(1)
   line(0,x_axis,width,x_axis)//x-axis
   line(width/2,ground+10,width/2,height-10)//y-axis
  pop()

  //Arrows and labels to show incident, reflected, and transmitted wavefunctions
  /*arrow_A.update()
  arrow_A.display()
  arrow_B.update()
  arrow_B.display()
  arrow_C.update()
  arrow_C.display()*/


  //Draw potential and horizontal line to indicate energy
  push();
   stroke(51);
   strokeWeight(4);
   line(0,ground, width/2, ground) //Line to mark potential for x<0 V=0
   line(width/2,ground,width/2,ground-V0) //Vertical line to show height change of potential barrier at x=0
   line(width/2,ground-V0,width,ground-V0) //Horizontal line showing height of pontetal after x=0
   stroke('green')
   line(0,ground-E,width,ground-E)
  pop();

  //Label V0
  push()
   fill('black')
   textSize(16)
   text('V0',width/2-25,ground-(V0+3))
  pop()

  //Label Energy line
  push()
   fill('green')
   textSize(16)
   text('E',10,ground-E-5)
  pop()
}



function init(){

//var cnv = createCanvas(windowWidth,windowHeight);//Address resizing issue later

  //Initialize variables
  N = floor(width/xspacing) //Num points to calculate value of wavefunction
  ground = height/2 //V=0
  x_axis = .75*height

  //Create arrays to store values of wavefunction at N poi
  Re = new Array(N) //Real part of Psi
  Im = new Array(N) //Imaginary part of Psi
  p = new Array(N) //Psi^2


  E_slider.position(.3*width, .33*height)
  E = E_slider.value()
  V_slider.position(.6*width,.33*height)
  V0 = V_slider.value()

}

function windowResized() {
  init()
  reset()
  resizeCanvas(windowWidth, windowHeight)
  optionsRadio.position(.1*width, .9* height);

}
