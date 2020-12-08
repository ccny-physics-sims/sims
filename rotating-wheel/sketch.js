
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

    w.arrowDecorations[0] = {type: 'velocity', location_radial: 1, rimPos: 0 };
    w.arrowDecorations[1] = {type: 'velocity', location_radial: .5, rimPos: 0 };
    w.arrowDecorations[2] = {type: 'velocity', location_radial: 1, rimPos: HALF_PI };
    w.arrowDecorations[3] = {type: 'velocity', location_radial: .5, rimPos: HALF_PI };
    w.arrowDecorations[4] = {type: 'velocity', location_radial: 1, rimPos: PI };
    w.arrowDecorations[5] = {type: 'velocity', location_radial: .5, rimPos: PI };
    w.arrowDecorations[6] = {type: 'velocity', location_radial: 1, rimPos: 3*HALF_PI };
    w.arrowDecorations[7] = {type: 'velocity', location_radial: .5, rimPos: 3*HALF_PI };
    w.addDecorations(w.arrowDecorations);
    //angleMode(DEGREES);


    on = true;


    //create controls for sketch
    rotate_speed = createSlider(-2,2,1,.1);
    rotate_speed.position(width/3,50)
    rotate_speed.parent('sketch-holder')
    rotate_speed.class("sim-slider");
    rotate_speed.size(200,0)

    btn_pause = createButton('Pause');
    btn_pause.position(20,20);
    btn_pause.mouseClicked(ptoggle);
    btn_pause.parent('sketch-holder');
    btn_pause.class("sim-button");



}
function draw(){
    background(255);
    //drawAxes();

    //draw text for controls
    text('Rotation Speed',width/3,40);


    w.draw();
    //get speed from slider
    w.ang_speed = rotate_speed.value()/30;


}
function ptoggle(){
    if(on == true){
        on = false;
        noLoop();
        btn_pause.html('Play');
    }
    else{
        on = true;
        loop();
        btn_pause.html('Pause');
    }
}
