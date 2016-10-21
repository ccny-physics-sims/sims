/*  Ray Diagram for a Thin Convex Lens (in p5.js)
    by Blake Rayvid <https://github.com/brayvid> */

var lensCenter;     // p5 Vector object
var focalLength;    // p5 Vector object

var objectArrow;    // science.js Arrow object
var imageArrow;     // science.js Arrow object

var focusChanging;  // boolean

var t;  // integer

function preload() {
    lens = loadImage("img/lens.svg");
    eye = loadImage("img/eye.png");
    candle = loadImage("img/candle.svg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);

    imageMode(CENTER);

    // new Slider object
    focalSlider = createSlider(100, 1000, 182);
    var sliderWidth = (round(0.15*(width+height/2))+20).toString()+"px"; // desired length of slider
    focalSlider.position(width/2+60, height/4-50);
    focalSlider.style('width', sliderWidth);
    focalSlider.class("sim-slider blue"); // sims-styles.css

    // Callback functions for slider touch events
    focalSlider.touchStarted(function(){
        if(focusChanging == false){
            focusChanging = true;
        }
    });
    focalSlider.touchEnded(function(){
        if(focusChanging == true){
            focusChanging = false;
        }
    });

    lensCenter = createVector(width/2, height/2);
    focalLength = createVector(focalSlider.value(), 0);

    // object will get a semirandom position
    var objectInitialOrigin = createVector(round(width/4),lensCenter.y);
    var objectInitialTarget = createVector(round(random(85,width/4)), round(random(100, height/2-100)));

    // create arrows - these are never displayed, only used to keep track of location
    objectArrow = new Arrow(objectInitialOrigin, objectInitialTarget);
    objectArrow.draggable = false;
    objectArrow.grab = true;

    imageArrow = new Arrow(objectArrow.origin, objectArrow.target);
    imageArrow.draggable = false;
    imageArrow.grab = false;

    t = 0; // how many times has draw executed
}


function draw() {
    // Draw the environment
    background(255);
    push();
    stroke('rgba(0,0,0,0.3)');
    line(lensCenter.x-1, height/14, lensCenter.x-1, 13 * height/14);
    pop();

    // Get current slider value
    focalLength.set(round(focalSlider.value()/2), 0);

    // Lens gets stretched based on focalSlider value
    image(lens, width/2, height/2, (width/30)/(.005 * focalSlider.value()), 6 * height/7);
    image(eye, width - 25, height/2, width/8, width/8);
    push();
    noFill();
    stroke(0);
    line(0, height/2, width - 50, height/2);
    pop();

    // Some tasks get their own functions
    drawFocalPoints();
    updateArrows();
    drawRays();
    displayValues();

    t++;
 }

function drawFocalPoints() {
    // Right side
    push();
    strokeWeight(2);
    line(lensCenter.x + focalLength.x, lensCenter.y - 10, lensCenter.x + focalLength.x, lensCenter.y + 10);
    // Left side
    line(lensCenter.x - focalLength.x, lensCenter.y - 10, lensCenter.x - focalLength.x, lensCenter.y + 10);
    pop();
}

function updateArrows() {
    // Always fix arrows to the horizontal axis
    if(!focusChanging){
        objectArrow.update();
        objectArrow.origin.set(objectArrow.target.x, lensCenter.y);
    }
    imageArrow.origin.set(imageArrow.target.x, lensCenter.y);

    // Recalculate image position
    imageArrow.target = newImagePosition(focalLength.x, lensCenter.x - objectArrow.target.x, lensCenter.y - objectArrow.target.y);
    imageArrow.update();

    // Getting near the focal length attracts the object
    if(abs(objectArrow.target.x - (lensCenter.x-focalLength.x)) < 3 && !keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && t%2==0){
        objectArrow.target.x = lensCenter.x - focalLength.x;
    }

    // Keyboard arrows can control the object location
    if(t%2==0){
     if (keyIsDown(LEFT_ARROW)){
         objectArrow.target.x -= 2;
     }
      if (keyIsDown(RIGHT_ARROW)){
       objectArrow.target.x += 2;
        }

      if (keyIsDown(UP_ARROW)){
        objectArrow.target.y -= 2;
         }
      if (keyIsDown(DOWN_ARROW)){
        objectArrow.target.y += 2;
        }
    }

    // Draw candles
    push();
    translate(objectArrow.target.x,(objectArrow.target.y+lensCenter.y)/2);
    if(objectArrow.target.y > lensCenter.y){rotate(PI);}
    image(candle,0,0,(lensCenter.y-objectArrow.target.y)/5,lensCenter.y-objectArrow.target.y); // Object
    pop();
    push();
    translate(imageArrow.target.x,(imageArrow.target.y+lensCenter.y)/2);
    // Determine orientation for image
    if(imageArrow.target.x < lensCenter.x && lensCenter.x-focalLength.x>objectArrow.target.x){
        rotate(PI); // flip 180 deg.
    }
    if(imageArrow.target.y > lensCenter.y  && ! lensCenter.x-focalLength.x<objectArrow.target.x){
        rotate(PI); // flip 180 deg.
    }
    image(candle,0,0,(lensCenter.y-imageArrow.target.y)/5,lensCenter.y-imageArrow.target.y); // Image
    pop();
}

function drawRays() {
    push();
    stroke(0);
    strokeWeight(1);

    // Solid lines through lens center and focal point
    if (lensCenter.x - objectArrow.target.x - focalLength.x > 0.6) {
        imageArrow.color = color('rgba(200,0,50,0.95)');
        line(objectArrow.target.x, objectArrow.target.y, imageArrow.target.x, imageArrow.target.y);
        line(objectArrow.target.x, objectArrow.target.y, lensCenter.x, objectArrow.target.y);
        line(lensCenter.x, objectArrow.target.y, imageArrow.target.x, imageArrow.target.y);
    }

    // Dotted lines to virtual image
    if (lensCenter.x - objectArrow.target.x < focalLength.x && objectArrow.target.x < lensCenter.x) {
        imageArrow.color = color('rgba(200,0,0,0.2)');
        for (var i = 0; i <= round(dist(imageArrow.target.x,imageArrow.target.y,objectArrow.target.y,objectArrow.target.y)); i=i+10) {
            var x = lerp(imageArrow.target.x, objectArrow.target.x, i/round(dist(imageArrow.target.x,imageArrow.target.y,objectArrow.target.y,objectArrow.target.y)));
            var y = lerp(imageArrow.target.y, objectArrow.target.y, i/round(dist(imageArrow.target.x,imageArrow.target.y,objectArrow.target.y,objectArrow.target.y)));
            ellipse(x, y, 1, 1);
        }
        line(objectArrow.target.x,objectArrow.target.y,lensCenter.x,lensCenter.y);
        line(objectArrow.target.x,objectArrow.target.y,lensCenter.x,objectArrow.target.y);
        line(lensCenter.x,objectArrow.target.y,lensCenter.x+focalLength.x,lensCenter.y);
        for (var i = 0; i <= round(dist(imageArrow.target.x,imageArrow.target.y,lensCenter.x,objectArrow.target.y)); i=i+10) {
            var x = lerp(imageArrow.target.x, lensCenter.x, i/round(dist(imageArrow.target.x,imageArrow.target.y,lensCenter.x,objectArrow.target.y)));
            var y = lerp(imageArrow.target.y, objectArrow.target.y, i/round(dist(imageArrow.target.x,imageArrow.target.y,lensCenter.x,objectArrow.target.y)));
            ellipse(x, y, 1, 1);
        }
    }
    pop();
}

function displayValues() {
        // Constrain is used frequently to keep the labels on-screen.

        textAlign(CENTER);

        // Boundaries
        push();
        noStroke();
        fill(0);
        var leftBorder = 40;
        var rightBorder = width - 40;
        var topBorder = 40;
        var bottomBorder = height - 40;
        pop();

        // Focal length label
        push();
        textSize(16);
        fill(0);
        // text('F = ', lensCenter.x+focalLength.x-15, lensCenter.y + 40);
        text("f = " + focalLength.x + " m", constrain(lensCenter.x+focalLength.x,leftBorder,rightBorder-20), lensCenter.y + 40);
        // text("f", lensCenter.x-focalLength.x, lensCenter.y + 40);
        // text(focalLength.x, focalSlider.position.x, lensCenter.y);
        pop();


        // Candle labels and values
        push();
        stroke(255);
        strokeWeight(3);
        if (objectArrow.target.y <= lensCenter.y) {
            //object above or at axis
            text('Object height', constrain(objectArrow.target.x,leftBorder,rightBorder), constrain(objectArrow.target.y-30,topBorder,bottomBorder));
            text((lensCenter.y-objectArrow.target.y) + " m", constrain(objectArrow.target.x,leftBorder,rightBorder), constrain(objectArrow.target.y-10,topBorder+20,bottomBorder-20)); // object height
            text('Object distance', constrain(objectArrow.target.x,leftBorder,rightBorder), lensCenter.y+15);
            text(round(lensCenter.x-objectArrow.target.x,0,150,0,100) + " m", constrain(objectArrow.target.x,leftBorder,rightBorder), lensCenter.y+35); // object distance

        }else {
            // object below axis
            text('Object height', constrain(objectArrow.target.x,leftBorder,rightBorder), constrain(objectArrow.target.y+50,topBorder,bottomBorder+10));
            text((lensCenter.y-objectArrow.target.y)+ " m", constrain(objectArrow.target.x,leftBorder,rightBorder), constrain(objectArrow.target.y+30,topBorder+20,bottomBorder-10)); // image height
            text('Object distance', constrain(objectArrow.target.x, leftBorder,rightBorder), lensCenter.y-15);
            text(round(lensCenter.x-objectArrow.target.x) + " m", objectArrow.target.x, lensCenter.y-35); // image distance
        }

        if (imageArrow.target.y < lensCenter.y && abs(lensCenter.x-objectArrow.target.x-focalLength.x)>0.6) {
            // image on top
            text('Image height', constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(imageArrow.target.y - 50, topBorder, bottomBorder));
            text(round(lensCenter.y - imageArrow.target.y) + " m", constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(imageArrow.target.y - 30, topBorder + 20, bottomBorder));
            text('Image distance', constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(lensCenter.y+20,lensCenter.y+60,bottomBorder));
            text(-1*abs(round(lensCenter.x - imageArrow.target.x))+" m", constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(lensCenter.y+40,lensCenter.y+80,bottomBorder));
        }else if(imageArrow.target.y > lensCenter.y && abs(lensCenter.x-objectArrow.target.x-focalLength.x)>0.6){
            // image on bottom
            text('Image height', constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(imageArrow.target.y + 30, lensCenter.y+60, bottomBorder - 20));
            text(round(lensCenter.y - imageArrow.target.y) +" m", constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(imageArrow.target.y + 50, lensCenter.y+80, bottomBorder));
            text('Image distance', constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(lensCenter.y-25, topBorder, bottomBorder)-30);
            text(-1*round(lensCenter.x - imageArrow.target.x) + " m", constrain(imageArrow.target.x, leftBorder, rightBorder), constrain(lensCenter.y, topBorder + 20, bottomBorder - 20)-30);
        }else{
            // image at infinity
            pop();
            push();
            textSize(16);
            fill('rgba(200,50,50,0.7)');
            text('NO IMAGE', lensCenter.x,lensCenter.y+6);
            pop();
        }
        pop();

        // Bottom display
        push();
        stroke(255);
        strokeWeight(3);
        textAlign(CENTER);
        text('Object distance',lensCenter.x-55,height-50);
        text('Focal length',lensCenter.x+48,height-50);

        // test object distance and focal length for equality
        if(lensCenter.x-objectArrow.target.x + 0.5 < focalLength.x && objectArrow.target.x < lensCenter.x){
            text('<',lensCenter.x,height-50);
        }else if(lensCenter.x-objectArrow.target.x  - 0.5 > focalLength.x && objectArrow.target.x < lensCenter.x){
            text('>',lensCenter.x,height-50);
        }else if(abs(lensCenter.x-objectArrow.target.x-focalLength.x)<0.6){
            text('=',lensCenter.x,height-50);
        }

        // Magnification
        text('Magnification: ', lensCenter.x-20, height - 30);
        if(abs(lensCenter.x-objectArrow.target.x-focalLength.x)>0.6){
            // mag is a string
            var mag = round(10*(abs(imageArrow.target.y-imageArrow.origin.y)/abs(objectArrow.origin.y-objectArrow.target.y)))/10 + " x";
            text(mag,lensCenter.x+40,height-30);
        }else{
            text('Infinite',lensCenter.x+40,height-30);
        }

        // Real or virtual image
        if(objectArrow.target.x < lensCenter.x-focalLength.x){
            text('Real image',lensCenter.x,height-10);
        }else if(objectArrow.target.x > lensCenter.x-focalLength.x){
            text('Virtual image',lensCenter.x,height-10);
        }
        pop();
}

function newImagePosition(f, o, oh) {
    // Thin lens formulas:
    // Parameters: focal length, object distance, object height
    // Solve equation 1 for image distance
    // Solve equation 2 for image height

    // Ensure denominator is not 0
    if (abs(f-o) > 0.01) {
        var x = o * f/(o - f);
    } else {
        var x = 999999; // Arbitrarily large number if denom = 0
    }

    // Ensure denominator is not 0
    if (o != 0) {
        var y = x * oh/o;
    } else {
        var y = 999999; // Arbitrarily large number if denom = 0
    }

    // a p5 Vector
    return createVector(lensCenter.x + x, lensCenter.y + y);
}

// Built into p5
function mouseDragged(){
    // Only allow object on left side of lens
    if(dist(mouseX,mouseY,lensCenter.x,lensCenter.y)>1 && mouseX < lensCenter.x && mouseY != lensCenter.y && !focusChanging){
        objectArrow.target.x = mouseX;
        objectArrow.target.y = mouseY;
    }
}

// Built into p5
function mousePressed(){
    // Only allow object on left side of lens
    if(dist(mouseX,mouseY,lensCenter.x,lensCenter.y)>1 && mouseX < lensCenter.x && mouseY != lensCenter.y && !focusChanging){
        objectArrow.target.x = mouseX;
        objectArrow.target.y = mouseY;
    }
}

// Built into p5
function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here

    var sliderWidth = (round(0.15*(width+height/2))+20).toString()+"px"; // Slider changes size to fit window
    focalSlider.position(width/2+60, height/4-50);
    focalSlider.style('width', sliderWidth);

    // Keep lens centered
    lensCenter.x = width/2;
    lensCenter.y = height/2;
    image(lens, lensCenter.x, lensCenter.y);
}
