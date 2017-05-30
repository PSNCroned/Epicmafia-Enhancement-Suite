scripts.helper.run = function () {
	console.log("Clippy!");
	
	var script = document.createElement("script");
	script.innerHTML = "\$('body').attr('data-username', window.user);";
	document.body.appendChild(script);
	
	var elm;
	var session = Math.floor(Math.random() * 1000000000000).toString(26);
	var contexts = [];
	var visible = true;
	
	var help = "\
		<h2><b>I'm here to help.</b></h2><br><br>\
		<ul>\
			<li>\
				My name is Clippy and I'm an intelligent assistant designed to help you out on Epicmafia.\
			</li>\
			<li>\
				I understand simple English statements like 'what is my role?' or 'join a ranked game'.<br><br>\
			</li>\
			<li>\
				<b>Things I can do:</b><br>\
				- Send friend requests<br>\
				- Join games by rank type and index<br>\
				- Host games<br>\
				- Look up your role or a role by name<br><br>\
				More features coming soon!\
			</li>\
		</ul>";
	
	var showTemplate = function (agent, head) {
		var template = "\
			<b>" + head + "</b><br><br>\
			<ul>\
				<li>\
					<form class='aiForm' style='border: 1px solid #999; background-color: white;'>\
						<input type='text' class='aiQuery' style='border: 0; display: inline-block; height: 20px;' />\
						<img src='" + chrome.runtime.getURL("icons/helper/mic_grey.png") + "' class='helpSpeech' width='20' style='float: right; cursor: pointer;' />\
					</form>\
				</li>\
			</ul>";
		agent.speak(template);
	};
	
	var interpret = function (agent, data) {
		console.log(data);
		agent.stopCurrent();
		
		if (data.fulfillment.speech) {
			agent.speak(data.fulfillment.speech);
		}
		else {
			switch (data.metadata.intentName) {
				case "get.role":
					var role = data.parameters.role;
					if (role) {
						$.get("/role/" + role.toLowerCase() + "/info/roleid", function (data) {
							if (data) {
								agent.speak(data);
							}
							else {
								agent.speak("I don't know of any role by that name! If searching for a role that has two words in its name just use the first word.");
							}
						});
					}
					else {
						var path = window.location.pathname.split("/");
						if (path[1] == "game" && parseInt(path[2])) {
							role = $(".user_li[data-uname=" + $('body').attr('data-username') + "]").find(".roleimg").attr("class");
							if (role) {
								role = role.split(" ")[2].split("-")[1];
								$.get("/role/" + role + "/info/roleid", function (data) {
									agent.speak(data);
								});
							}
							else {
								agent.speak("You don't have a role yet, silly.");
							}
						}
						else {
							agent.speak("You don't have a role because you're not in a game. Let's join one!");
						}
					}
					break;
				case "friend.request":
					var name = data.parameters.username;
					var id;
					if (name) {
						$.get("https://epicmafia.com/user/search?q=" + name, function (data) {
							if (data.data.length) {
								id = data.data[0].id;
								$.post("https://epicmafia.com/friend/request", {userid: id}, function (data) {
									if (data.status) {
										agent.speak('Friend reqeust sent to ' + name + '!');
									}
									else {
										agent.speak(data.msg);
									}
								});
							}
							else {
								agent.speak("I could not find a user by the name of " + name + "!");
							}
						});
					}
					else {
						id = $("[data-title='Game Statistics']").attr("href")
						if (id) {
							id = id.split("/")[2];
							$.post("https://epicmafia.com/friend/request", {userid: id}, function (data) {
								if (data.status) {
									agent.speak('Friend reqeust sent to ' + name + '!');
								}
								else {
									agent.speak(data.msg);
								}
							});
						}
						else {
							showTemplate(agent, "Who do you want to send a friend request to?");
							contexts.push("friend");
						}
					}
					break;
				case "join.game":
					var type = data.parameters.type || "any";
					var order = parseInt(data.parameters.order);
					
					type = (type == "unranked" ? undefined : type);
					
					$.get("https://epicmafia.com/game/find", function (data) {
						var games = JSON.parse(data[1]).data;
						var matchedGames = [];
						var foundGame = false;
						for (var i in games) {
							if (games[i].gametype == "mafia" && !games[i].password && games[i].status_id == 0 && (games[i].image[0] == type || type == "any")) {
								matchedGames.push(games[i].id);
							}
						}
						if (matchedGames.length) {
							type = !type ? "unrakned" : type;
							if (order) {
								if (order <= matchedGames.length) {
									window.location = "https://epicmafia.com/game/" + matchedGames[order - 1];
								}
								else {
									agent.speak("There are only " + matchedGames.length + " of type " + type);
								}
							}
							else {
								window.location = "https://epicmafia.com/game/" + matchedGames[0];
							}
						}
						else {
							contexts.push("joinFail");
							showTemplate(agent, "No matching games available. Would you like to host one?");
						}
					});
					break;
				case "joinFail.hostQuestion":
					contexts.push("setupName");
					showTemplate(agent, "What setup would you like to host?");
					break;
				case "joinFail.hostSetup":
					var setup = data.parameters.setup;
					var type = data.parameters.type || "0";
					type = (type == "lives" ? "1" : type);
					type = (type == "goldlives" ? "2" : type);
					
					if (parseInt(setup)) {
						$.get("https://epicmafia.com/game/add/mafia?setupid=" + setup + "&ranked=" + type, function (data) {
							if (data[0]) {
								window.location = "/game/" + data[1].table;
							}
							else {
								agent.speak(data[1].msg);
							}
						});
					}
					else {
						$.get("https://epicmafia.com/setup/find?type=best&title=" + setup, function (data) {
							setup = data[1].data[0].id;
							$.get("https://epicmafia.com/game/add/mafia?setupid=" + setup + "&ranked=" + type, function (data) {
								if (data[0]) {
									window.location = "/game/" + data[1].table;
								}
								else {
									agent.speak(data[1].msg);
								}
							});
						});
					}
					break;
				case "specify.friend":
					var name = data.parameters.name;
					$.get("https://epicmafia.com/user/search?q=" + name, function (data) {
						if (data.data.length) {
							id = data.data[0].id;
							$.post("https://epicmafia.com/friend/request", {userid: id}, function (data) {
								if (data.status) {
									agent.speak('Friend reqeust sent to ' + name + '!');
								}
								else {
									agent.speak(data.msg);
								}
							});
						}
						else {
							agent.speak("I could not find a user by the name of " + name + "!");
						}
					});
					break;
				case "host.game":
					var setup = data.parameters.setup;
					var type = data.parameters.type || "0";
					if (setup) {
						type = (type == "lives" ? "1" : type);
						type = (type == "goldlives" ? "2" : type);

						if (parseInt(setup)) {
							$.get("https://epicmafia.com/game/add/mafia?setupid=" + setup + "&ranked=" + type, function (data) {
								if (data[0]) {
									window.location = "/game/" + data[1].table;
								}
								else {
									agent.speak(data[1].msg);
								}
							});
						}
						else {
							$.get("https://epicmafia.com/setup/find?type=best&title=" + setup, function (data) {
								setup = data[1].data[0].id;
								$.get("https://epicmafia.com/game/add/mafia?setupid=" + setup + "&ranked=" + type, function (data) {
									if (data[0]) {
										window.location = "/game/" + data[1].table;
									}
									else {
										agent.speak(data[1].msg);
									}
								});
							});
						}
					}
					else {
						contexts.push("setupName");
						showTemplate(agent, "What setup would you like to host?");
					}
					break;
				case "nothing":
					showTemplate(agent, "Okay, what else can I help you with?");
					break;
				case "help":
					agent.speak(help);
					break;
			}
		}
	};
	
	var startDictation = function () {
		$(".helpSpeech").attr("src", chrome.runtime.getURL("icons/helper/mic.png"));
		
		var recog = new webkitSpeechRecognition();
		recog.continuous = false;
		recog.interimResults = true;
		recog.lang = "en-US";
		recog.start();
		
		recog.onresult = function (e) {
			$(".aiQuery").val(e.results[0][0].transcript);
		};
		
		recog.onend = function () {
			setTimeout(function () {
				$(".aiForm").submit();
			}, 250);
		};
		
		recog.onerror = function () {
			recog.stop();
		};
	};
	
	clippy.load("Clippy", function (agent) {
		elm = document.getElementsByClassName("clippy")[0];
		bubble = document.getElementsByClassName("clippy-content")[0];
		
		if (!window.localStorage.clippyVis) {
			window.localStorage.clippyVis = 1;
		}
		if (parseInt(window.localStorage.clippyVis)) {
			agent.show();
			if (!window.localStorage.clippyFirstTime) {
				showTemplate(agent, "In the future, double click me to open this bubble, and use <i>alt + c</i> to hide or show me. Anyway, what can I help you with?");
				window.localStorage.clippyFirstTime = 1;
			}
		}
		
		$(elm).dblclick(function () {
			showTemplate(agent, "Hello there! What can I help you with?");
		});
		
		$(".clippy-balloon").on("submit", ".aiForm", function (e) {
			e.preventDefault();
			
			agent.play("Writing");
			
			var query = $(this).find(".aiQuery").val();
			$(this).find(".aiQuery").val("");
			
			$.ajax({
				type: "POST",
				url: "https://api.api.ai/v1/query?v=20150910",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					"Authorization": "Bearer a6d259b8930449c3a0f211787d746870"
				},
				data: JSON.stringify({
					query: query,
					lang: "en",
					sessionId: session,
					contexts: contexts
				}),
				success: function (data) {
					contexts = [];
					interpret(agent, data.result);
				},
				error: function (err) {
					contexts = [];
					console.log("Error: " + err);
				}
			});
		});
		
		$(".clippy-balloon").on("click", ".helpSpeech", function () {
			startDictation();
		});
		
		$(document).on("keydown", function (e) {
			if (e.key == "c" && e.altKey) {
				if (parseInt(window.localStorage.clippyVis)) {
					agent.hide();
					window.localStorage.clippyVis = 0;
				}
				else {
					agent.show();
					window.localStorage.clippyVis = 1;
				}
			}
		});
	});
	
	$("body").on("clearContext", function () {
		contexts = [];
	});
};