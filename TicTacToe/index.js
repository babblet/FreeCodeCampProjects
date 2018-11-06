var turn; //0 is you, 1 is computer
var turn_count = 0;
var player_marker; //set at start of game
var computer_marker; //set at start of game

function mark(tile){ //marks the tile with the tile id as argument
	let marker;
	if(turn == 0){
		marker = player_marker;
	} else if(turn == 1){
		marker = computer_marker;
	}
	if($("#tile" + tile).text() == ""){
		$("#tile" + tile).text(marker);
		turn_count++;
		if(check_three_in_row(marker) === true){
			if(turn == 0){
				$("#turn").text("You Won!");
				game_end();
			} else if (turn == 1){
				$("#turn").text("You Lost!");
				game_end();
			}
		} else if(turn_count == 9){
			$("#turn").text("Tie");
			game_end();
		} else if(turn == 0){
			ai_turn();
		} else if(turn == 1){
			player_turn();
		}
	}
}

function check_three_in_row(marker){ // Algorithm to check if there is 3 in a row
	let count = 0;
	for(let y = 0; y <= 6; y += 3){	// Check horizontaly
		for(let x = 1; x <= 3; x++){
			if($("#tile" + (x+y)).text() == marker){
				count++;
			} else {
				break;
			}
		}
		if(count == 3){
			return true;
		} else {
			count = 0;
		}
	}
	for(let x = 1; x <=3 ; x++){ // Check vertically
		for(let y = 0; y <= 6; y += 3){
			if($("#tile" + (x+y)).text() == marker){
				count++;
			} else {
				break;
			}
		}
		if(count == 3){
			return true;
		} else {
			count = 0;
		}
	}
	for(let i = 1; i <= 9; i += 4){	// Check diagonaly left to right.
		if($("#tile" + i).text() == marker){
			count++;
		} else {
			break;
		}
	}
	if(count == 3){
		return true;
	} else {
		count = 0;
	}
	for(let i = 3; i <= 7; i += 2){	// Check diagonaly right to left.
		if($("#tile" + i).text() == marker){
			count++;
		} else {
			break;
		}
	}
	if(count == 3){
		return true;
	} else {
		count = 0;
	}
	return false;
}

function ai_turn(){ // AI stuff
	function check_two_in_row(player){ // Check if a player has 2 in a row. Return the tile thats empty (spot).
		let spot, marker, count = 0;
		if(player == 0){
			marker = player_marker;
		} else if(player == 1){
			marker = computer_marker;
		}

		for(let y = 0; y <= 6; y += 3){ // Check horizontaly
			for(let x = 1; x <= 3; x++){
				if($("#tile" + (x+y)).text() != marker && $("#tile" + (x+y)).text() != ""){
					count = 0;
					break;
				} else if($("#tile" + (x+y)).text() == marker){
					count++;
				} else if ($("#tile" + (x+y)).text() == ""){
					spot = x+y;
				}
				if(count == 2 && x == 3){
					console.log("horizontal");
					return spot;
				} else if (x == 3){
					count = 0;
				}
			}
		}

		for(let x = 1; x <= 3; x++){ // Check vertically
			for(let y = 0; y <= 6; y += 3){
				console.log(x+y);
				if($("#tile" + (x+y)).text() != marker && $("#tile" + (x+y)).text() != ""){
					count = 0;
					break;
				} else if($("#tile" + (x+y)).text() == marker){
					count++;
				} else if ($("#tile" + (x+y)).text() == ""){
					spot = x+y;
				}
				if(count == 2 && y == 6){
					console.log("vertical");
					return spot;
				} else if (y == 6){
					count = 0;
				}
			}
		}

		for(let i = 1; i <= 9; i += 4){ // Check diagonaly left to right
			if($("#tile" + i).text() != marker && $("#tile" + i).text() != ""){
				count = 0;
				break;
			} else if($("#tile" + i).text() == marker){
				count ++;
			} else if($("#tile" + i).text() == ""){
				spot = i;
			}
			if(count == 2 && i == 9){
				console.log("left to right");
				return spot;
			} else if (i == 9 && count < 2){
				count = 0;
			}
		}

		for(let i = 3; i <= 7; i += 2){ // Check diagonaly right to left
			if($("#tile" + i).text() != marker && $("#tile" + i).text() != ""){
				count = 0;
				break;
			} else if($("#tile" + i).text() == marker){
				count ++;
			} else if($("#tile" + i).text() == ""){
				spot = i;
			}
			if(count == 2 && i == 7){
				console.log("right to left");
				return spot;
			} else if (i == 7 && count < 2){
				count = 0;
			}
		}
		return false;
	}

	function win(){	// Find winning move
		let tile = check_two_in_row(1);
		if(tile === false){
			block();
		} else {
			console.log("AI: Found win");
			mark(tile);
		}
	}

	function block(){ // Block winning move
		let tile = check_two_in_row(0);
		if(tile === false){
			play_corner();
		} else {
			console.log("AI: Found block");
			mark(tile);
		}
	}

	// function fork needed?
	// function fork(){
	//
	// }

	function play_middle(){ // Play middle
		if($("#tile5").text() == ""){
			console.log("AI: Found middle");
			mark("5");
		} else {
			play_side();
		}
	}

	function play_corner(){ // Play corner, if opponent is in corner, play opposite corner
		let tile;
		function check_block(i){
			if(i == 1 && ($("#tile7").text() == "" && $("#tile7").text() != computer_marker)){
				tile = 7;
				return true;   
			} else if(i == 7 && ($("#tile1").text() == "" && $("#tile1").text() != computer_marker)){
				tile = 1;
				return true;   
			} else if(i == 3 && ($("#tile9").text() == "" && $("#tile9").text() != computer_marker)){
				tile = 9;
				return true;   
			} else if(i == 9 && ($("#tile3").text() == "" && $("#tile3").text() != computer_marker)){
				tile = 3;
				return true;   
			} 
		}

		function check_opponent(){
			for(let i = 1;; i += 2){
				if($("#tile" + i).text() == player_marker){
					if(check_block(i) === true){
						console.log("AI: Found corner to block");
						return true;
					}
				} else if(i == 9){
					return false;
				}

				if(i == 3){
					i += 2;
				}
			}
		}

		function find_free_corner(){
			for(let i = 1; i <= 9; i += 2){
				if($("#tile" + i).text() == ""){
					tile = i;
					break;
				}

				if(i == 3){
					i += 2;
				}
			}
		}
		if($("#tile5").text() == ""){
			play_middle();
		} else if(check_opponent() !== true){
			find_free_corner();
			if(tile === undefined){
				play_side();
			} else {
				mark(tile);
			}
		} else {
			mark(tile);
		}
	}

	function play_side(){ // Play side
		let tile;
		for(let i = 2; i <= 8; i += 2){
			if($("#tile" + i).text() == ""){
				tile = i;
				break;
			}
		}

		if(tile === undefined){
			console.log("AI: ?");
		} else {
			console.log("AI: Found side")
			mark(tile);
		}
	}

	turn = 1;
	$("#turn").text("Computer");
	win();
}

function player_turn(){ // Set values for player
	turn = 0;
	$("#turn").text("You");
}

function game_end(){	// At game end, make all tiles reset game
	for(let tile = 1; tile <= 9; tile++){
		$("#tile" + tile).on("click", function(){
			game_reset();
		});
	}
}

function overlay(){ // Set play markers and create animations for overlay.
	for(let i = 1; i <= 2; i++){
		$("#overlay_option" + i).on("click", function(){
			if(i == 1){
				player_marker = $("#overlay_option" + 1).text();
				computer_marker = $("#overlay_option" + 2).text();
			} else if(i == 2){
				player_marker = $("#overlay_option" + 2).text();
				computer_marker = $("#overlay_option" + 1).text();
			}
			$("#overlay").css("margin-top", "-500px");
			$("#overlay").fadeTo(500, 0, function(){
				$("#overlay").empty();
				$("#overlay").hide();
			});
			game_reset();
		});
	}
}

function game_reset(){	// Resets game fully
	for(let tile = 1; tile <= 9; tile++){
		$("#tile" + tile).unbind("click");
		$("#tile" + tile).on("click", function(){
			mark(tile);
		});
	}
	for(let tile = 1; tile <= 9; tile++){
		$("#tile" + tile).text("");
	}

	turn_count = 0;
	player_turn();
}

$(document).ready(function(){
	$("#button_restart").on("click", function(){
		game_reset();
	});
	overlay(); //First function called
});
