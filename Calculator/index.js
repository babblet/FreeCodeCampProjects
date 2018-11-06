var mainText = "0";
var smallText = "0";

function updateWindow(){
	if(mainText.length > 10 || smallText.length > 30){ // If mainText or smallText gets to big. print error.
		mainText = "Error";
		smallText = "Error : out of range";
	}
	$("#calculator_window_maintext").html(mainText); // updates text.
	$("#calculator_window_smalltext").html(smallText);
}

function buttonPress(id){
	var button = $(id).children("p").text();   //Get operator from html

	if((mainText == "0" && smallText == "0") || mainText == "Error"){  // Check if calculator is reseted or got error. Then empty strings
		mainText = "";
		smallText = "";
	}

	if(smallText.match(/=/) !== null){    // If equalsign found
		if(button.match(/[0-9.]/)){         // Start new calculation if new number typed
			mainText = "";
			smallText = "";
		}
		else if(button.match(/[/*\-+]/)){   // or start adding more to the sum
      smallText = smallText.substring(smallText.match(/=/).index + 1, smallText.length);
    }
  } 

  if(button == "AC"){ // All-clear
    mainText = "0";
    smallText = "0";
  } 
  else if(button == "CE"){ // Clear-entry
    if( !smallText.substring(0, smallText.length - mainText.length).match(/[+\-*/]$/) || (null !== smallText.match(/=/)) || smallText == "0"){
			smallText = "0";
			mainText = "0";
		} else {
			smallText = smallText.substring(0, smallText.length - mainText.length);
			mainText = "0";
		}
	}
	else if(button.match(/[+\-*/]/)){ // Operators
		if(smallText.match(/[+\-*/]$/)){ // If we find and operator in the end of the string, replace it
			mainText = button;
			smallText = smallText.substring(0, smallText.length - 1);
			smallText += button;
		} 
		else if (mainText == "" && smallText == "" && button != "-"){  //If nothing is already entried, set Text to 0 instead of operator. exepction "-"
			mainText = 0;
			smallText = 0;
		}
		else{
			mainText = button;
			smallText+= button;
		}
	}
	else if(button == "."){ // Decimal
		if(smallText.match(/[0-9]$/)){ //if last entry is a number, just add decimal
			mainText += ".";
			smallText += ".";
		} else if(smallText.match(/[+\-*/]$/) || smallText == ""){ //else add 0 infront
			mainText = "0.";
			smallText += "0.";
		}
	}
	else if(button.match(/[0-9]/)){ // Numbers
		if(mainText.match(/[+\-*/]/) || mainText == "0"){
			mainText = "";
		}
		if(smallText[smallText.length - 1] == "0" && smallText[smallText.length - 2].match(/[+\-ˆ/]/)){
			smallText = smallText.substring(0,smallText.length - 1);
		}
		mainText += button;
		smallText += button;
	}
	else if(button == "="){ // Equal
		mainText = eval(smallText).toString(); //Let eval() do the calculation.
		smallText += "=" + mainText;
	}

	updateWindow(); // Update window
}

$(document).ready(function() {
	$("#calculator_window_maintext").html(mainText);
	$("#calculator_window_smalltext").html(smallText);
});
