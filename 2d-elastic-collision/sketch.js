
    var Molecules;
  var Walls;
  var baseRad;
  var ballcolor = [];
  var MARGIN = 40;
  var running = false;
  var positions = [];
  var velocities = [];
  function setup() {

    canvas = createCanvas(windowWidth, .90*windowHeight);
    canvas.parent('sketch-holder')
    onoff = createButton("start");
    onoff.parent('sketch-holder');
    onoff.mouseClicked(turnonoff);
    onoff.position(20,20);
    onoff.class("sim-button")

    reseter = createButton("Reset");
    reseter.parent('sketch-holder');
    reseter.mouseClicked(resetTheBalls);
    reseter.position(20,onoff.y+50);
    reseter.class("sim-button")
    //frameRate(5)
    Molecules = new Group();
    Walls = new Group();

     positions = {
        1: { x: 50, y: height/2+15},
        2: { x: width/2, y: height/2}

    }
     velocities = {
        1: {x: 3,y:0},
        2: {x:0,y:0}

    }
    var molColors = {
      1: 'red',
      2: 'blue'

    }

    var masses = {
      1: 1,
      2: 1

    }

    var radii = {
      1: 15,
      2: 15

    }


    for(var i=0; i<2; i++)
    {
      //ballcolor[i] = color(random(0,200));
    var mol = createSprite(positions[i+1]['x'],positions[i+1]['y']);
    mol.ballcolor = molColors[i+1];
    mol.radius = radii[i+1];
    mol.draw = function() { fill(this.ballcolor); ellipse(0,0,this.radius*2,this.radius*2);}
    mol.setCollider("circle", 0,0,radii[i+1]);
    mol.setSpeed(velocities[i+1]['x'],velocities[i+1]['y']);
    mol.scale = 1
    mol.mass= masses[i+1]
    Molecules.add(mol);
    }

    mol1velVector = new Arrow(Molecules[0].position,Molecules[0].position);
    mol1velVector.color = color('lightblue');
    mol1velVector.width = 15;
    mol1velVector.showComponents = false;
    mol1velVector.draggable = false;
    mol1velVector.grab = false;

    mol2velVector = new Arrow(Molecules[0].position,Molecules[0].position);
    mol2velVector.color = color('lightblue');
    mol2velVector.width = 15;
    mol2velVector.showComponents = false;
    mol2velVector.draggable = false;
    mol2velVector.grab = false;
    noLoop();


  }

    function draw() {
clear()
      background(0,0,0,0);

        Molecules.bounce(Molecules);
        for(var i=0; i<allSprites.length; i++) {
          var s = allSprites[i];
    if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
    if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
    if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
    if(s.position.y>height+MARGIN) s.position.y = -MARGIN;

  }
drawSprites();
mol1velVector.origin = Molecules[0].position;
mol1velVector.target = p5.Vector.add(Molecules[0].position,p5.Vector.mult(Molecules[0].velocity,30));
mol1velVector.update();
mol1velVector.display();
mol2velVector.origin = Molecules[1].position;
mol2velVector.target = p5.Vector.add(Molecules[1].position,p5.Vector.mult(Molecules[1].velocity,30));
mol2velVector.update();
mol2velVector.display();
push()
stroke(140)
line(0,height/2,width,height/2)
line(width/2,0,width/2,height)
pop()
      }

      function turnonoff() {
        // and of course it's nice to be able to stop it if things get crazy
          if (!running){
            running = true;
            loop();
            onoff.html("stop");
            return
          }

          if (running){
            running = false;
            noLoop()
            onoff.html("start");
            return
          }
        }
        function resetTheBalls(){
          //console.log('resetting');
           for(var i=0; i<2; i++) {
             var s = allSprites[0];
             s.remove();
           }
          // allSprites[0].remove();
          // allSprites[0].remove();
          //Molecules[1].remove();
          setup();
          running = false;

          onoff.html("start");

          // Molecules[0].position = createVector(positions[1]['x'],positions[1]['y']);
          // Molecules[1].position = createVector(positions[2]['x'],positions[2]['y']);
          // Molecules[0].velocity = createVector(velocities[1]['x'],velocities[1]['y']);
          // Molecules[1].velocity = createVector(velocities[2]['x'],velocities[2]['y']);


          //noLoop();
        }
