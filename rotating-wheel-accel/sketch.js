rotate_speed = 0;
function setup(){
    canvas = createCanvas(windowWidth,0.9*windowHeight);
    canvas.parent('sketch-holder');
    w = new wheel(width/2,height/2,200);
    w.rotate = true;
    angleMode(RADIANS);
    w.cdecorate = false;
    w.vdecorate = false;
    w.rotation = true;
    w.translation = false;
    w.rimColor = color('rgba(0,0,0,1)');
    w.spokeColor = color('rgba(0,0,0,1)');
    w.wheelColor = color('rgba(0,0,0,.1)');
    rotationSign = createP();
    rotationSign.style('font-size', '1.5em')
    rotationSign.position(width/3-20, 10);
    rotationSign.parent('sketch-holder')
    accelSign = createP();
    accelSign.style('font-size', '1.5em')
    accelSign.position(width/3-20, 50);
    accelSign.parent('sketch-holder')
    // w.arrowDecorations[0] = {type: 'velocity', location_radial: 1, rimPos: 0 };
    // w.arrowDecorations[1] = {type: 'velocity', location_radial: .5, rimPos: 0 };
    // w.arrowDecorations[2] = {type: 'velocity', location_radial: 1, rimPos: HALF_PI };
    // w.arrowDecorations[3] = {type: 'velocity', location_radial: .5, rimPos: HALF_PI };
    // w.arrowDecorations[4] = {type: 'velocity', location_radial: 1, rimPos: PI };
    // w.arrowDecorations[5] = {type: 'velocity', location_radial: .5, rimPos: PI };
    // w.arrowDecorations[6] = {type: 'velocity', location_radial: 1, rimPos: 3*HALF_PI };
    // w.arrowDecorations[7] = {type: 'velocity', location_radial: .5, rimPos: 3*HALF_PI };
    // w.addDecorations(w.arrowDecorations);
    //angleMode(DEGREES);


    on = false;
    noLoop();

    //create controls for sketch
    // rotate_speed = createSlider(-2,2,1,.1);
    // rotate_speed.position(width/3,50)
    // rotate_speed.parent('sketch-holder')
    // rotate_speed.class("sim-slider");

    btn_pause = createButton('Start');
    btn_pause.position(20,20);
    btn_pause.mouseClicked(ptoggle);
    btn_pause.parent('sketch-holder');
    btn_pause.class("sim-button");



}
function draw(){
    background(255);
    //drawAxes();
    rotate_speed_0 = rotate_speed
    rotate_speed = -sin(frameCount*.005);
    //draw text for controls
    if (rotate_speed > 0){
      signOmega = '-';
    }
    else{
      signOmega ='+';
    }
    rotationSign.html('Rotation Speed (&omega;): '+signOmega);
    //text(Math.sign(sin(frameCount*.005)),width/3,80);
    if (rotate_speed-rotate_speed_0 > 0){
      signAlpha = '-';
    }
    else {
      signAlpha = '+';
    }
    accelSign.html('Angular Accel. (&alpha;): '+signAlpha);
    w.draw();
    //get speed from slider
    w.ang_speed = rotate_speed/20;


}
function ptoggle(){
    if(on == true){
        on = false;
        noLoop();
        btn_pause.html('Start');
    }
    else{
        on = true;
        loop();
        btn_pause.html('Pause');
    }
}
