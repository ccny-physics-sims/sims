function setup(){
	createCanvas(800,1000);
	test = new Graph(300,300,0,5,-400,400,5);
	test.showBorder = true;
	test.set_offset(20,30);
	
	frameRate(FR);
	test2 = new Graph(300, 300, 0,8,0,1000,5);
	test2.set_offset(20,330);
	test2.showBorder = true;
	
	
	parr = [new Point(0,0)];
	parr2 = [new Point(0,0)];
	w = new Point(81,240);
	
	plot3 = new Plot([],0,0,255,1);
	plot3.pointSize = 0;
	
	
	plot4 = new Plot(parr2,0,255,0,1);
	plot4.pointSize = 0;
	
	plot5= new Plot([w],0,255,2,1);
	plot5.pointSize = 30;
	
	test.addPlot(plot3);
	test.addPlot(plot5);
	test2.addPlot(plot4);
	
	test.xlabel = "time (s)";
	test.ylabel = "y";
	test.title = "y_pos vs. time"
	test.showLegend = true;	

	test2.title = "x_pos vs. time";
	test2.xlabel = "time (s)";
	test2.ylabel = "x";
	yvel = .5;
	ypos = 140;
	yacc = .2;
	xpos = 500;
	//test.plots[0].tpRecord(ypos,test);
	//test2.plots[0].tpRecord(xpos,test2);
	
}
function draw(){
	//test code
	background(100);	
	
	test.drawBg(color(255),color(0));
	test.plotAll();
	
	test2.drawBg();
	test2.plotAll();
	
	fill(0);
	ellipse(xpos++, ypos,30,30);
	if(ypos >= 320){
		yacc =-.5;
		if(yvel != 0) yvel /= 3;
	}
	if(ypos <= 80){
		 yacc = .5;
		 if(yvel != 0) yvel /= 3;
	}
	if(xpos > width) xpos = 500;
	ypos += yvel;
	yvel += yacc;
	
	//rect(100,30,400,400);
	//ellipse(test.plots[1].data[0].x,test.plots[1].data[0].y,20,20);
	
	fill(0,0,0,30);
	stroke(0,0,0,75);
	//ellipse(test.origin.x,test.origin.y,20,20); // origin test
	//ellipse(test.bl_pix.x,test.bl_pix.y,20,20); //bl test
	//ellipse(test.tr_pix.x, test.tr_pix.y, 20,20); //tr test
	 
	test.plots[0].tpRecord(ypos,test);
	test2.plots[0].tpRecord(xpos,test2);
}
function mouseDragged(){
	//test.plots[0].getUser();	
}
