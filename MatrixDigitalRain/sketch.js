var streams = []; // Global variable to hold our streams

function setup() {
	// Function setup() called once upon setup
	createCanvas(window.innerWidth, window.innerHeight);
	background(0); // Setting background to be black
	var x = 0;
	for (let i = 0; i <= width / Character.size; i++) {
		var stream = new Stream();
		stream.generateCharacters(x, random(-1000, 0));
		streams.push(stream);
		x += Character.size;
	}
	textSize(Character.size);
}

function draw() {
	// Function draw() called repeatedly at 60 FPS as your sketch runs
	background(0, 150);
	streams.forEach(function(stream) {
		stream.render();
	});
}

class Character {
	// Represents single character in vertical stream
	static size = 26; // Size of the character in pixels

	constructor(x, y, speed, first) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.switchInterval = round(random(2, 20)); // Interval for switching one katakana to another
		this.value = this.setRandomKatakana();
		this.first = first // Lets character know if it is first in the stream
	}
	
	setRandomKatakana() {
		// Function to select random katakana from unicode block
		return String.fromCharCode(0x30A0 + round(random(0, 96)));
	}

	rain() {
		// Function to simulate rain effect
		this.y = this.y >= height ? 0 : this.y += this.speed;
	}
}

class Stream {
	// Class representing vertical stream of characters in matrix digital rain simulation
	constructor() {
		this.characters = [] // Array holding different characters in stream
		this.numberOfCharacters = round(random(5, 30)); // Each stream should know how many characters it has
		this.speed = random(5, 8) // Each stream should know how fast it's travelling
	}

	generateCharacters(x, y) {
		// Function to generate ccharacters for stream
		var first = round(random(0, 4)) == 1;
		for (let i = 0; i <= this.numberOfCharacters; i++) {
			const character = new Character(x, y, this.speed, first);
			this.characters.push(character);
			y -= Character.size;
			first = false;
		}
	}

	render() {
		// Function to display stream on the window
		this.characters.forEach(function(character) {
			if (character.first) {
				fill(180, 255, 180);
			} else {
				fill(0, 255, 70); // Setting symbol color 
			}
			text(character.value, character.x, character.y);
			character.rain();
			if (frameCount % character.switchInterval == 0) character.value = character.setRandomKatakana();
		});
	}
}
