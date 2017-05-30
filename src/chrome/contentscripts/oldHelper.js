scripts.helper.run = function () {
	console.log("Clippy!");
	
	var script = document.createElement("script");
	script.innerHTML = "\$('body').attr('data-username', window.user);";
	document.body.appendChild(script);
	
	var elm;
	var name = $('body').attr('data-username');
	clippy.load("Clippy", function (agent) {
		var gameTemplate = "\
			<b>Hello there! What would you like help with?</b><br><br>\
			<ul>\
				<li><a class='clink doneBub' data-action='role'>What is my role?</a></li>\
			</ul>";
		var lobbyTemplate = "\
			<b>Welcome to the central page of Epicmafia. Here are some quick actions:</b><br><br>\
			<ul>\
				<li><a href='/moderator'>Go to the list of mods</a></li>\
				<li><a class='clink doneBub' data-action='joinGame'>Join an unranked game</a></li>\
				<li><a href='/topic/81287'>Learn how to format lobby comments</a></li>\
			</ul>\
			";
		elm = document.getElementsByClassName("clippy")[0];
		bubble = document.getElementsByClassName("clippy-content")[0];
		agent.show();
		$(elm).dblclick(function () {
			if (window.location.pathname == "/game/new") {
				agent.speak("Here is where you can start games or create new mafia setups.");
			}
			else if (window.location.pathname.indexOf("/game/") != -1) {
				agent.speak(gameTemplate);
			}
			else if (window.location.pathname == "/lobby") {
				agent.speak(lobbyTemplate);
			}
		});
		
		$(".clippy-balloon").on("click", ".clink", function () {
			switch ($(this).attr("data-action")) {
				case "role":
					var role = $(".user_li[data-uname=" + name + "]").find(".roleimg").attr("class");
					if (role) {
						role = role.split(" ")[2].split("-")[1];
						agent.play("Writing");
						$.get("/role/" + role + "/info/roleid", function (data) {
							agent.stopCurrent();
							agent.speak(data);
						});
					}
					else {
						agent.speak("You don't have a role yet, silly.");
					}
					
					break;
				case "joinGame":
					$.get("https://epicmafia.com/game/find", function (data) {
						var games = JSON.parse(data[1]).data;
						var foundGame = false;
						for (var i in games) {
							if (games[i].image.length == 0 && games[i].gametype == "mafia" && !games[i].password && games[i].status_id == 0) {
								window.location = "https://epicmafia.com/game/" + games[i].id;
								foundGame = true;
								break;
							}
						}
						if (!foundGame) {
							agent.speak("No unranked games currently available.");
						}
					});
					break;
			}
		});
	});
};