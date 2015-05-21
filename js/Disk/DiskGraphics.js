enchant();
var graphic;
var disk;
var DISKSIZE = 300;
var ring, diskhead,chart,img;
var nextRotation;
function startEnchant(){
	graphic = new Core($(window).width(),$(window).height());
	graphic.fps = 30;
	graphic.preload("img/disc.png", "img/BlueScreen.jpg", "img/tmp.png");

	graphic.onload = function(){
		disk = new Sprite(DISKSIZE, DISKSIZE)
		disk.image = graphic.assets["img/disc.png"];
		graphic.rootScene.addChild(disk)//(diskScene);
		
		disk.y = 50;
		disk.x = 50;

		diskhead = new Sprite(200,114);
		diskhead.rotate(265 + (58 * getStartPosition()/4000.0) -diskhead.rotation,20)
		diskhead.image = graphic.assets["img/tmp.png"]
		diskhead.y = 200;
		diskhead.x = 200;
		nextRotation = diskhead.rotation;


		graphic.rootScene.addChild(diskhead)

		createChart()
		//tempFunc();


		return disk;
	}
	graphic.start()
}

function calcRadius(track){//200 to 250 (in the inner ring), outter = 350
	return (350 - 250) * track / 4000.0 + 50;
}

function addRing(track, last){ 	

	// var context = ring.getContext('2d');
	// context.beginPath();
	// context.arc(150, 150, calcRadius(track), 0, Math.PI * 2,false);
	// context.strokeStyle = "blue";
	// context.lineWidth = 2;

	// //context.closePath();
	// context.stroke();

	if(ring != undefined) ring.remove();
	var surface = new Surface(DISKSIZE,DISKSIZE);
	ring = new Sprite(DISKSIZE,DISKSIZE);

	surface.context.lineWidth = 2
	surface.context.strokeStyle = last ? "#00FF00" : "blue";
	surface.context.beginPath();

	surface.context.arc(150, 150, calcRadius(track), 90 * Math.PI / 180.01, 450 * Math.PI / 180.01,false);
	//surface.context.closePath()
	surface.context.stroke()
	ring.image = surface;

	ring.y = 50
	ring.x = 50
	graphic.rootScene.addChild(ring)
}

function moveArm(track){
	shakeArm()
	var location = 10 * (track/4000.0) +  (350 - 250) * track / 4000.0;
	console.log("track", track)
	diskhead.remove()
	graphic.rootScene.addChild(diskhead)
	diskhead.tl.rotateBy(265 + (58 * track/4000.0) -diskhead.rotation,10)

	//diskhead.tl.moveTo(200+ Math.round(location),diskhead.y,10);
}

function shakeArm(){
	diskhead.tl.rotateBy(1,1);
	diskhead.tl.rotateBy(-2,1);
	diskhead.tl.rotateBy(1,1);


}

//==============chart animation==============
var temp, tempctx;
function tempFunc(){
	temp = $('<canvas width="300" height="300" style="height:300px;width:300px;margin-left:450px;margin-top:450px" img="/img/BlueScreen.jpg"></canvas>')[0]
	$("#enchant-stage").append(temp)
	var img = new Image()
	img.src = "img/BlueScreen.jpg"
	console.log('ya')
	tempctx = temp.getContext('2d');

	tempctx.drawImage(img, 0,0)

	tempctx.lineWidth = 2;
	tempctx.strokeStyle = "blue";
	tempctx.beginPath()
	tempctx.arc(100,100, 100, 0, 360);
	tempctx.stroke()
}

function createChart(){//
	chart = $('<canvas width="620" height="350" style="margin-left:450px; margin-top:50px;"></canvas>')

	img = new Image();
	img.src = "img/chart.jpg";
	var ctx = chart[0].getContext('2d');
	img.onload = function(){ctx.drawImage(img,0,0);}
	
	$("#enchant-stage").append(chart)
	$("#enchant-stage").append($("<label style='margin-left:66%;'>Track Number</label>"))

	prevX = 10 + chart[0].width * getStartPosition / 4100.0;
}

function drawGraph(track,y,total){
	var x = 16 + chart[0].width * track / 4250.0,

	y = chart[0].height / (total + 2) * (y + 1);
	draw(x,y, track)
}

var prevX, prevY = 10;
function draw(x,y, track) {
	var ctx = chart[0].getContext('2d');
	ctx.lineWidth = 2
	ctx.strokeStyle = "blue"
	ctx.beginPath();
	ctx.moveTo(prevX,prevY);

	ctx.lineTo(x,y);
	if(prevX < x)
		ctx.fillText(JSON.stringify(track),x + 24,y - 5);
	else
		ctx.fillText(JSON.stringify(track),x - 24,y - 5);


	ctx.stroke();
	ctx.strokeStyle = "blue"
	ctx.arc(x,y,2,0,360);
	ctx.lineWidth = 2

	ctx.fill();

	prevX = x;
	prevY = y;
}

//==============Animation Control=============

function animateDisk(x,tracks){
	console.log("trackasdfas", tracks);
	setTimeout(function(){
		console.log(x, tracks[x], tracks.length)
		addRing(tracks[x], x == tracks.length - 1)
		moveArm(tracks[x])
		drawGraph(tracks[x],x,tracks.length)
		if (x < tracks.length - 1)
			animateDisk(x + 1,tracks)
		else
			yesNext();
	},500)
}

function resetGraphics(){
	//diskhead.rotate(265 + (58 * getStartPosition()/4000.0) -diskhead.rotation,20)
	draw(x,0);
	if(ring != undefined) ring.remove();
	var ctx = chart[0].getContext('2d');
	var ctx = chart[0].getContext('2d')
	ctx.clearRect(0,0,chart[0].width,chart[0].height)
	ctx.drawImage(img,0,0);

	//ctx.moveTo()
	var x = 10 + chart[0].width * getStartPosition() / 4100.0;
}

$(document).ready(function(){
     $('html').click(function(event){
         console.log("mouse click X:"+event.pageX+" Y:"+event.pageY);
     });
     $('html').keyup(function(event){
         console.log("keyboard event: key pressed "+event.keyCode);
     });
 });