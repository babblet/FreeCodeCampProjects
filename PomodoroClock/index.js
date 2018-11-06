var icons = {play : "<img src=\"https://image.flaticon.com/icons/svg/60/60813.svg\" id=\"state_button_icon_play\" ></img>",
	pause: "<img src=\"https://image.flaticon.com/icons/svg/61/61219.svg\" id=\"state_button_icon_pause\" ></img>"}

var state = "pause";
var work_time = 25;
var break_time = 5;
var interval_id = 0;

function clock_countdown(type_of_countdown){  //argument = work or break countdown, clock depends on the states
	if(interval_id == 0){ //then we can start a new countdown
		if(type_of_countdown == "work"){
			var time_minutes = work_time;
		} else if(type_of_countdown == "break"){
			var time_minutes = break_time;
		}
		var time_seconds = 0;
		var total_time_in_begining = time_minutes*60; //used for the overlay animations
		var total_time = time_minutes*60; //used for the overlay animations, gets smaller for every second.

		interval_id = setInterval(function(){ // the main countdown
			if(time_seconds == 0 && state == "play"){
				time_minutes--;
				time_seconds = 59;
				total_time--;
			} else if (state == "play"){
				time_seconds--;
				total_time--;
			}

			$("#clock_seconds").text(time_seconds);
			$("#clock_minutes").text(time_minutes);
			if(type_of_countdown == "work"){
				$("#overlay").css("margin-top", (300 * (total_time/total_time_in_begining)) + "px"); 
			} else if(type_of_countdown == "break"){
				$("#overlay").css("margin-top", (300 * ((total_time_in_begining-total_time)/total_time_in_begining)) + "px") 
			}
			if(time_seconds < 10){
				$("#clock_seconds").text("0" + time_seconds);
			}
			if(time_minutes < 10){
				$("#clock_minutes").text("0" + time_minutes);
			}
			if(time_minutes == 0 && time_seconds == 0){ //change to break countdown
				if(type_of_countdown == "work"){
					window.alert("Break!");
					break_countdown();   
				} else if(type_of_countdown == "break"){
					window.alert("Break is over!");
					clock_reset();
				}
			}
		}, 1000); 
	} 
}

function work_countdown(){
	$("#overlay").css("background-color", "#42416d")
	clearInterval(interval_id);
	interval_id = 0;
	clock_countdown("work");
}

function break_countdown(){
	$("#overlay").css("background-color", "red");
	clearInterval(interval_id);
	interval_id = 0;
	clock_countdown("break");
}

function change_option(id, mod){              //changes the buttons values
	if($(id).text() == 60 && mod == 1){
		$(id).text("1");
	} else if($(id).text() == 1 && mod == -1){
		$(id).text("60");
	} else {
		$(id).text(+$(id).text() + +mod);
	}
	clock_reset();
}

function clock_reset(){   //reset clock fully
	state = "pause";
	clearInterval(interval_id);
	interval_id = 0;
	work_time = $("#work_show_text").text();
	break_time = $("#break_show_text").text();
	if(work_time < 10){                               
		$("#clock_minutes").text("0" + work_time);      
	} else {
		$("#clock_minutes").text(work_time);
	}
	$("#clock_seconds").text("00");
	$("#work_show_text").text(work_time);
	$("#break_show_text").text(break_time);
	$("#state_button").html(icons.play);
	$("#overlay").css("margin-top", "300px");
	$("#overlay").css("background-color", "#42416d")
}
$(document).ready(function(){
	$("#clock_minutes").text(work_time);      //set clock and buttons to defualt values
	$("#clock_seconds").text("00");
	$("#work_show_text").text(work_time);
	$("#break_show_text").text(break_time);
	$("#state_button").html(icons.play);
	$("#overlay").css("margin-top", "300px");

	$("#state_button").on("click", function(){      //make buttons ready for clicks
		if(state == "pause"){
			$("#state_button").html(icons.pause);       //if state == pause, change state to play, starts the countdown of the clock
			state = "play";
			clock_countdown("work");
		} else if(state == "play"){
			$("#state_button").html(icons.play);        //if state == play, change state to pause
			state = "pause";
		}
	});

	$("#work_up").on("click", function(){           //button modifiers.
		change_option("#work_show_text", 1);
	});
	$("#work_down").on("click", function(){
		change_option("#work_show_text", -1)
	});
	$("#break_up").on("click", function(){
		change_option("#break_show_text", 1)
	});
	$("#break_down").on("click", function(){
		change_option("#break_show_text", -1)
	});
});
