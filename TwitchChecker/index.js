$(document).ready(function() {
	var lastSearch = "";
	var api_streams = "https://wind-bow.gomix.me/twitch-api/streams/";
	var api_channels = "https://wind-bow.gomix.me/twitch-api/channels/";
	var twitchStreamers = [{
		"name": "FreeCodeCamp",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png"
	}, {
		"name": "Sodapoppin",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/sodapoppin-profile_image-10049b6200f90c14-300x300.png"
	}, {
		"name": "Summit1G",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/summit1g-profile_image-87970af8826df799-300x300.png"
	}, {
		"name": "rafis0",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/rafis0-profile_image-e10592b5582b0c23-300x300.jpeg"
	}, {
		"name": "TeZoR99",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/tezor99-profile_image-f05dca3b636b305e-300x300.jpeg"
	}, {
		"name": "b0aty",
		"picture": "https://static-cdn.jtvnw.net/jtv_user_pictures/b0aty-profile_image-1f1b6c5fca2be1d2-300x300.png"
	}, {
		"name": "comster404",
		"picture": "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2FjTx%2FE49%2FjTxE49erc.png&f=1"
	}];

	function search(searchVar) {
		var streamerName = "";
		for (var id = 0; id < twitchStreamers.length; id++) {
			streamerName = $("#" + id.toString()).children(".streamerName").text().toLowerCase();
			if (streamerName.substr(0, searchVar.length) != searchVar) {
				$("#" + id.toString()).hide();
			} else {
				$("#" + id.toString()).show();
			}
		}
	}

	function checkSearchChanged() {
		if ($("#searchField").val() != lastSearch) {
			lastSearch = $("#searchField").val().toLowerCase();
			search(lastSearch);
		}
	}

	function checkStatus(streamerJson, id) {
		$.ajax({
			url: api_channels + twitchStreamers[id].name,
			dataType: "jsonp",
			success: function(json) {
				if (json.status == 404) {
					insertInfo(streamerJson, id, "Not Found");
				} else {
					insertInfo(streamerJson, id, "offline");
				}
			}
		});
	}

	function insertInfo(streamerJson, id, streamStatus) {
		var playing = "";
		var title = "";
		if (streamStatus == "online") {
			playing = "<span>Playing: " + streamerJson.stream.game + "</span><br>"
			title = "<span>" + streamerJson.stream.channel.status + "</span>"
		};
		$("#tabInfoContainer").append(
			"<div class=\"streamerContainer\" id=\"" + id + "\">" +
			"<a class=\"streamLink\"href=" + "https://www.twitch.tv/" + twitchStreamers[id].name + " target=\"_blank\">" +
			"<img class=\"streamerImage\" src=\"" + twitchStreamers[id].picture + "\"></img>" +
			"</a>" +
			"<span class=\"streamerName\">" + twitchStreamers[id].name + "</span><br>" +
			"<span>Status: </span>" +
			"<span class=\"streamerStatus\">" + streamStatus + "</span><br>" +
			playing +
			"<div class=\"streamerTitle\">" +
			title +
			"</div>" +
			"</div>"
		);
	};

	function insert(streamerName, streamerJson) {
		for (var id = 0; id < twitchStreamers.length; id++) {
			if (streamerName == twitchStreamers[id].name) {
				if (streamerJson.stream === null) {
					checkStatus(streamerJson, id);
				} else {
					insertInfo(streamerJson, id, "online");
				}
			}
		}
	}

	function getStreamers() {
		for (var id = 0; id < twitchStreamers.length; id++) {
			$.ajax({
				url: api_streams + twitchStreamers[id].name,
				dataType: "jsonp",
				success: function(json) {
					var name = json._links.self.split('/');
					var name = name[name.length - 1];
					insert(name, json);
				}
			});
		}
	}

	getStreamers();
	setInterval(checkSearchChanged, 200);

	$("#all").on("click", function(){
		for(var id = 0; id < twitchStreamers.length; id++){
			$("#" + id).show();
		} 
	});

	$("#online").on("click", function(){
		for(var id = 0; id < twitchStreamers.length; id++){
			if($("#" + id).children(".streamerStatus").text() != "online"){
				$("#" + id).hide();
			} else {
				$("#" + id).show();
			}
		}
	});

	$("#offline").on("click", function(){
		for(var id = 0; id < twitchStreamers.length; id++){
			if($("#" + id).children(".streamerStatus").text() != "offline"){
				$("#" + id).hide();
			} else {
				$("#" + id).show();
			}
		}
	});
});
