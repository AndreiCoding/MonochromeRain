class Drip {
	constructor(x, z) {
		this.size = 5;
		this.pos = createVector(x, height);
		this.v = createVector(random(this.size * -1, this.size), random(this.size * -1, 0));
		this.alpha = 400;
		this.z = z;
	}

	show = function() {
		//noStroke();
		//fill(255, this.alpha)
		strokeWeight(map(this.z, 0, 100, 0, 2));
		stroke(water[0], water[1], water[2], constrain(this.alpha, 0, 255));
		line(this.pos.x, this.pos.y, this.pos.x + this.v.x, this.pos.y + this.v.y);
	}

	move = function() {
		this.v.add(0, 0.2);
		this.pos.add(this.v);
		this.alpha -= 30;
	}
}

function splash(x, z, l) {
	for (k=0; k<l; k++) {
		drips.push(new Drip(x, z));
	}
}

function Drop (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	if (z < 50) {
		z = 2 * z;
	}
	this.yvelocity = random(0.1, 0.6);
	this.yaccel =map(z, 50, 100, 0.2, 0.1);
	this.length = map(z, 50, 100, 20, 4);
	this.thick = map(z, 50, 100, 3, 1);
	//this.particles = new Array();
	//for (i=0; i<5; i++) {
	//	this.particles.push(new createVector(random(-2, 2), random(-2, 0)));
	//}

	this.set = function() {
		if (this.y > height) {
			splash(this.x, this.z, 5);
			//console.log("huh");
			this.x = random(width);
			this.y = random(-1000, -50);
			this.yvelocity = random(0,1, 1.5);
			//this.yaccel =map(z, 0, 100, 0.8, 0.1);
			//this.length = map(z, 0, 100, 20, 4);
			//this.thick = map(z, 0, 100, 3, 1);
			
		}
		//splash(100, 1);

	}

	this.fall = function() {
		this.y += this.yvelocity;
		this.yvelocity += this.yaccel;
	}

	this.show = function() {
		stroke(water);
		strokeWeight(this.thick);
  		line(this.x, this.y, this.x, this.y+this.length);
	}
}


function setup() {
  //frameRate(20);
  colorMode(HSB);
  hue;
  console.log(frameRate());
  createCanvas(1920, 1080);
  //background(13, 23, 38);
  hueSlide = createSlider(0, 360, 220);
  hueSlide.position(20, 20);
  
  //background(bgColour);
  drips = new Array();
  drops = new Array();
  for (i=0; i<200; i++) {
  	drops.push(new Drop(random(0, width), random(-1000, -50), random(0, 100)));
  }
  console.log(drops);
}

function draw() {
	hue = hueSlide.value();
	//hue = (millis()/100) % 360;
	water = color((hue), 30, 100);
  	bgColour = color(hue, 70, 15);
	background(bgColour);
	//console.log(frameRate());
	//splash(random(width), 5);
	for (j=drips.length-1; j>=0; j--) {
		drips[j].show();
		drips[j].move();
		if (drips[j].alpha < 0) {
			drips.splice(j, 1);
		}		
	}

	for (i=0; i<drops.length; i++) {
		//console.log(drops[i].z);
		drops[i].fall();
		drops[i].show();
		drops[i].set();

	}
	//console.log(drips.length);
	
	//console.log(drips.length + " after");
}




