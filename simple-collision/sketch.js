
    var Molecules;
  var Walls;
  var baseRad;
  var ballcolor = [];
  var MARGIN = 40;
  var running = false;
  function setup() {
    canvas = createCanvas(.8*windowWidth, .5*windowHeight);
    canvas.parent('sketch-holder')
    onoff = createButton("start");
    onoff.parent('sketch-holder');
    onoff.mouseClicked(turnonoff);
    onoff.position(50,30);
    onoff.class("sim-button")

    Molecules = new Group();
    Walls = new Group();

    var positions = {
        1: { x: 50, y: height/2},
        2: { x: width-50, y: height/2}
    }
    var velocities = {
        1: {x: 3,y:0},
        2: {x:-3,y:0}
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
      1: 20,
      2: 20
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
        if(s.position.x<5) {
          s.position.x = 5;
          s.velocity.x = abs(s.velocity.x);
        }

        if(s.position.x>width-5) {
          s.position.x = width-1-5;
          s.velocity.x = -abs(s.velocity.x);
          }

        if(s.position.y<0+5) {
          s.position.y = 1+5;
          s.velocity.y = abs(s.velocity.y);
        }

        if(s.position.y>height-5) {
          s.position.y = height-1-5;
          s.velocity.y = -abs(s.velocity.y);
          }
  }
drawSprites();
mol1velVector.origin = Molecules[0].position;
mol1velVector.target = p5.Vector.add(Molecules[0].position,p5.Vector.mult(Molecules[0].velocity,10));
mol1velVector.update();
mol1velVector.display();
mol2velVector.origin = Molecules[1].position;
mol2velVector.target = p5.Vector.add(Molecules[1].position,p5.Vector.mult(Molecules[1].velocity,10));
mol2velVector.update();
mol2velVector.display();

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
