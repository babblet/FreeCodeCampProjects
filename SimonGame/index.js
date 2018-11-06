// Order of the given colors, gets value in game_reset
var order = [];
// Current order when playing, gets value in game_reset
var current_order = [];
// Current level, gets value in game_reset
var level;
// Max level
var max_level = 20;
// Speed of game in ms. graduatly gets smaller for each level
var start_speed = 1300;
// Strict mode
var strict = false;
// State, gets value in game_reset
var allow_click = true;
// holds the audio objects
var audio;
// Sounds
var sound_list = [
	["#button_green", 	"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"],
	["#button_red",		"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"],
	["#button_yellow",	"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"],
	["#button_blue",	"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]
]

function animate(style, times, button){
	let list = [
		["#button_green","rgb(0,250,0)"],
		["#button_red","rgb(250,0,0)"],
		["#button_yellow","rgb(250,250,0)"],
		["#button_blue","rgb(0,0,250)"],
	]

	if(style == "blink"){
		// Blick animation
		for(let i = 0; i < times; i++){
			for(let i in list){
				let old_color = $(list[i][0]).css("backgroundColor");
				$(list[i][0]).animate({"background-color": list[i][1]}, 150);
				$(list[i][0]).animate({"background-color": old_color}, 150);
			}
		}
	} else if(style == "single"){
		for(let i = 0; i < times; i++){
			let old_color = $(button).css("backgroundColor");
			let color;
			for(let j in list){
				if(button == list[j][0]){
					color = list[j][1];
				}
			}
			$(button).animate({"background-color": color}, 150);
			$(button).animate({"background-color": old_color}, 150);
		}
	}
}

function strict_change(){
	if(strict == false){
		strict = true;
		$("#button_strict_light").animate({"background-color": "red"}, 250);
	} else if(strict == true){
		strict = false;
		$("#button_strict_light").animate({"background-color": "black"}, 250);
	}		
	game_reset();
}

function click(button){
	let list = [
		"#button_green",
		"#button_red",
		"#button_yellow",
		"#button_blue"
	]
	if (button == "#button_strict_switch"){
		strict_change();
	}
	if(allow_click){
		if(button == "#button_start_switch"){
			game_start();
		} else if(order.length > 0){
			for(let i in list){
				if(button == list[i]){
					condition = check_right_click(button);
					if(condition){
						play_sound(button);
						animate("single",1,button);
						if(current_order.length == order.length){
							if(level == max_level){
								win();
							} else {
								next_level();
							}
						}
					} else if(strict && !condition){
						game_reset();
					} else {
						current_order = [];
						animate("blink",2);
						allow_click = false;
						show_order();
					}
				}
			}
		}
	}
}

// Check if click was the right one
function check_right_click(button){
	current_order.push(button);
	let i = current_order.length - 1;
	if(current_order[i] == order[i]){
		return true;
	} else {
		return false;
	}
}

// Set counter to value
function counter(value){
	$("#counter_text").html(value);
}

// Handels and plays the sound of each button.
function play_sound(button){
	for(let i in sound_list){
		if(sound_list[i][0] == button){
			audio = new Audio(sound_list[i][1]);
		}
	}
	audio.play();
}

// Shows the order att the speed set at the beginning.
function show_order(){
	speed = start_speed - (5 * level);
	let i = 0;
	let interval_id;
	let list = {
		"#button_green"		: "rgb(0,250,0)",
		"#button_red"		: "rgb(250,0,0)",
		"#button_yellow"	: "rgb(250,250,0)",
		"#button_blue"		: "rgb(0,0,250)"	
	}
	if(interval_id == undefined){
		interval_id = setInterval(function(){
			let old_color = $(order[i]).css("backgroundColor");

			if(i < level){
				play_sound(order[i]);
			}

			$(order[i]).animate({"background-color": list[order[i]]}, 150);
			$(order[i]).animate({"background-color": old_color}, 150);

			i += 1;
			if(i > level || i == 20){
				clearInterval(interval_id);
				if(i == 20){
					setTimeout(speed*2);
				} else {
					setTimeout(speed);
				}
				animate("blink",1);
				allow_click = true;
			} 
		}, speed);
	}
}

function win(){
	$("#counter_text").html("!!");
	animate("blink", 5);
	game_reset();
}

function game_start(){
	game_reset();
	next_level();
}

function next_level(){
	allow_click = false;
	level++;
	current_order = [];
	counter(level);
	add_order();
	show_order();
}

function game_reset(){
	order = [];
	current_order = [];
	level = 0;
	counter("--");
	allow_click = true;
	animate("blink",3);
}

// Gives new color to order
function add_order(){
	let button = [
		"#button_green",
		"#button_red",
		"#button_yellow",
		"#button_blue"
	]
	let random_num = Math.floor(Math.random() * 4);
	order.push(button[random_num])
	console.log(order);
}

$(document).ready(function(){
	let button = [
		"#button_green",
		"#button_red",
		"#button_yellow",
		"#button_blue",
		"#button_start_switch",
		"#button_strict_switch"
	];

	//Make buttons ready
	for(let b in button){
		$(button[b]).on("click", function(){
			click(button[b]);
		});
	}
});

