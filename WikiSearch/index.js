$(document).ready(function(){
	
	function searchFocus(){
		$("#search-field").css("width", "50%");
		$("#search-field").attr("placeholder", "");
	}
	
	function clear(){
		$("#mainBox").css("margin-top", "150px");
		$("#search-field").css("width","65px");
		$("#search-field").attr("placeholder", "Search");
		$("#search-field").val("");
		$(".search-result-box").fadeTo(1000, 0, function(){
			$("#search-result").empty();
		});
		$("#clearButton").hide();
	}

	$("#clearButton").hide();
	$("#clearButton").on("click", function(){
		clear();
	});
	$("#search-field").focus(function(){
		searchFocus();
	});
	$("form").submit(function(){
		$.ajax({
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + $("#search-field").val() + "&namespace=0&limit=10",
			dataType: "jsonp",
			success: function(search){
				$("#search-result").empty();
				$("#clearButton").show();
				$("#mainBox").css("margin-top", "0px");
				if($("#search-result").val() == ""){
					for(var i = 0; i < search[1].length; i++){
						$("#search-result").append("<div class=\"search-result-box\">" +
							"<a href=\"" + search[3][i]+ "\" target=\"_blank\">" +
							"<h3>" + search[1][i]+ "</h3>" +
							"<p>" + search[2][i] + "</p>" +
							"</a>" +
							"</div>"
						);
					}
					$(".search-result-box").fadeTo(1000, 1);
				}
			}
		});
		return false;  
	});
});
