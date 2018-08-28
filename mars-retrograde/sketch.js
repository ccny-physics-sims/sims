let data;
var RA, Dec;
var count = 0;
// preload table data
function preload() {
    data = loadTable(
      'mars-data.csv',
			'csv',
			'header');

    desert = loadImage('desert-at-night.jpg');
}

// using a p5js table object, return an object having
// the values of the given column, plus the minimum value
// and maximum value from that column
function colValsMinMax(tab, colName) {
  let vals = data.getColumn(colName);
  let obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent('sketch-holder');
  // how many rows?
  console.log(data.getRowCount());
  // what are the columns?
  console.log(data.columns);


  stroke(255);

  // fetch values and min/max for pm2.5
   RA = colValsMinMax(data, "RA");
  console.log(RA.min);
  console.log(RA.max);

  // fetch values and min/max for wind speed
   Dec = colValsMinMax(data, "Dec");
  console.log(Dec.min);
  console.log(Dec.max);

  // noprotect
  stroke(255, 128, 128);
  fill(255, 128, 128);

}


function draw() {
    background(50);
    image(desert,0,0,width,height)
    if (count >= data.getRowCount()){count = 1;}
    if (frameCount%10 ==0 ){
      count += 1;
    }
    for (var i = 0; i < count; i++) {


      let xpos = map(RA.values[i], RA.min, RA.max, 100, width-100);
      let ypos = map(Dec.values[i], Dec.min, Dec.max, height-500, 0);


      ellipse(xpos, ypos,5);
    }
}
