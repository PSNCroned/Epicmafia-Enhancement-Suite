scripts.console.run = function () {
	console.log("emConsole");
	
	if(!window.jQuery) {
	   var script = document.createElement('script');
	   script.type = "text/javascript";
	   script.src = "https://code.jquery.com/jquery-latest.js";
	   document.head.appendChild(script);
	}

	var localStorage = window.localStorage;
	var app = localStorage.emconsole;
	if (app) {
		app = JSON.parse(app);
	}
	else {
		app = {
			show: "none",
			goto: {
				mods: "/moderator",
				home: "/home",
				round: "/round",
				reports: "/reports",
				pm: "/message",
				pms: "/message",
				msg: "/message",
				message: "/message",
				family: "/family",
				forum: "/forum",
				forums: "/forum",
				f: "/forum"
			},
			lobbies: {
				main: 1,
				sandbox: 5,
				sbox: 5,
				games: 6,
				survivor: 27,
				vivor: 27
			},
			custom: {
				commands: {}
			}
		};
	}

	var containerCSS = "\
		position: fixed;\
		width: 100%;\
		padding: 3px;\
		text-align: center;\
		bottom: 0px;\
		display: " + app.show + ";\
		z-index: 100;\
	";
	var consoleCSS = "\
		width: 50%;\
		height: 20px;\
		-webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);\
		-moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);\
		box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);\
	";
	var container = document.createElement("div");
	var cons = document.createElement("input");

	var helpPage = "\
		<h1>EM Console Commands</h1>\
		* = optional\
		<ul>\
			<li>\
				<b>help</b> - Show this page\
			</li>\
			<li>\
				<b>[goto, go]</b> - Navigate to the specified page\
				<ul>\
					<li><i>go mods</i></li>\
					<li><i>go home</i></li>\
					<li><i>go round</i></li>\
					<li><i>go reports</i></li>\
					<li><i>go family</i></li>\
					<li><i>go [pm, pms, msg, message]</i></li>\
					<li><i>go [f, forum, forums]</i></li>\
					<li><i>go [lobby, l] *[name, id]</i></li>\
					<li><i>go [user, u] *[name, id]</i></li>\
				</ul>\
			</li>\
			<li>\
				<b>[back, b]</b> - Navigate back in history\
			</li>\
			<li>\
				<b>[foreward, fwd, fr]</b> - Navigate foreward in history\
			</li>\
			<li>\
				<b>[refresh, re, r]</b> - Refresh the page\
			</li>\
			<li>\
				<b>top</b> - Scroll to top of page\
			</li>\
			<li>\
				<b>[bottom, bot]</b> - Scroll to bottom of page\
			</li>\
			<li>\
				<b>[up, u]</b> - Scroll up partially\
			</li>\
			<li>\
				<b>[down, d]</b> - Scroll down partially\
			</li>\
			<li>\
				<b>pm</b> - Send a private message\
				<ul>\
					<li><i>pm [name, id] message</i></li>\
				</ul>\
			</li>\
			<li>\
				<b>set</b> - Customize the console\
				<ul>\
					<li><i>set cmd [newCommand] [oldCommand]</i> - Make/edit a custom command that mimics a preexisting one</li>\
					<li><i>set goto [key] [url]</i> - Make/edit a goto key</li>\
					<li><i>set delete [command]</i> - Deletes a custom command</li>\
					<li><i>set delete goto [key]</i> - Deletes a goto key</li>\
				</ul>\
			</li>\
			<li>\
				<b>[forum, f]</b> - Navigate the forums\
				<ul>\
					<li><i>f [next, n]</i> - Go to next page</li>\
					<li><i>f [prev, pr]</i> - Go to previous page</li>\
					<li><i>f [first, f]</i> - Go to first page</li>\
					<li><i>f [last, l]</i> - Go to last page</li>\
					<li><i>f [page, p] page#</i> - Go to specific page</li>\
					<li><i>f [recent, re] index</i> - Go to specific thread from recent topics in lobby</li>\
					<li><i>f go [search]</i> - Go to the subforum whose name contains the provided search. Searches in subforums for your current lobby.</li>\
					<li><i>f [topic, t] [search]</i> - Go to the topic whose title contains the provided search. Only works while viewing a list of topics.</li>\
				</ul>\
			</li>\
			<li>\
				<b>poke</b> - Return all pokes from user page\
			</li>\
			<li>\
				<b>alt</b> - Switch to an alt\
				<ul>\
					<li><i>alt [name, partialName]</i></li>\
				</ul>\
			</li>\
			<li>\
				<b>friend</b> - Send a friend request to the user of the user page you're viewing\
			</li>\
		</ul>\
		\
		<b>Flairs</b><br>\
		Add these to the end of your commands to modify their behavior.<br>\
		i.e. <i>go lobby main -t</i> : Opens main lobby in a new tab\
		<ul>\
			<li>\
				<b>-t</b>: Opens in a new tab (if applicable)\
			</li>\
		</ul>\
	";

	var process = function (cmd) {
		var shouldSave = true;
		var args = cmd.toLowerCase().split(" ");
		var preservedCase = cmd.split(" ");
		var flairs = [];
		var noFlairs = [];
		for (var i in args) {
			if (args[i].indexOf("-") == 0) {
				flairs.push(args[i]);
			}
			else {
				noFlairs.push(args[i]);
			}
		}
		
		try {
			switch (args[0]) {
				case "help":
					window.open().document.body.innerHTML += helpPage;
					break;
				case "goto":
				case "go":
					switch (args[1]) {
						case "lobby":
						case "l":
							if (noFlairs.length > 2) {
								var lobbyButton;
								if (!parseInt(args[2])) {
									lobbyButton = document.querySelectorAll("[ng-click='goto_lobby(" + app.lobbies[args[2]] + ")']");
									if (window.location.pathname == "/lobby" && lobbyButton.length && !hasFlair(flairs, "-t")) {
										lobbyButton[0].click();
									}
									else {
										gotoPage("/lobby#?id=" + app.lobbies[args[2]], hasFlair(flairs, "-t"));
									}
								}
								else {
									lobbyButton = document.querySelectorAll("[ng-click='goto_lobby(" + args[2] + ")']");
									if (window.location.pathname == "/lobby" && lobbyButton.length && !hasFlair(flairs, "-t")) {
										lobbyButton[0].click();
									}
									else {
										gotoPage("/lobby#?id=" + args[2], hasFlair(flairs, "-t"));
									}
								}
							}
							else {
								gotoPage("/lobby", hasFlair(flairs, "-t"));
							}
							
							if (window.location.pathname == "/lobby") {
								window.location.reload();
							}
							break;
						case "user":
						case "u":
							if (noFlairs.length > 2) {
								if (!parseInt(args[2])) {
									getId(args[2], function (id) {
										if (id) {
											gotoPage("/user/" + id, hasFlair(flairs, "-t"));
										}
									});
								}
								else {
									gotoPage("/user/" + args[2], hasFlair(flairs, "-t"));
								}
							}
							else {
								gotoPage("/user", hasFlair(flairs, "-t"));
							}
							break;
						default:
							if (app.goto[args[1]]) {
								gotoPage(app.goto[args[1]], hasFlair(flairs, "-t"));
							}
					}
					break;
				case "back":
				case "b":
					window.history.back();
				case "forward":
				case "fwd":
				case "fr":
					window.history.forward();
					break;
				case "reset":
					shouldSave = false;
					localStorage.removeItem("emconsole");
					window.location.reload();
					break;
				case "refresh":
				case "re":
				case "r":
					window.location.reload();
					break;
				case "top":
					window.scrollTo(0, 0);
					break;
				case "bottom":
				case "bot":
					window.scrollTo(0,document.body.scrollHeight);
					break;
				case "up":
				case "u":
					window.scroll(0, window.scrollY - 500);
					break;
				case "down":
				case "d":
					window.scroll(0, window.scrollY + 500);
					break;
				case "pm":
					var msg = "";
					for (var i = 2; i < preservedCase.length; i++) {
						msg += (preservedCase[i] + " ");
					}
					
					if (!parseInt(args[1])) {
						getId(args[1], function (id) {
							$.post("/message", {msg: msg, subject: "", "recipients[]": id}, function (data) {
								sAlert(data[1]);
							});
						});
					}
					else {
						$.post("/message", {msg: msg, subject: "", "recipients[]": args[1]}, function (data) {
							sAlert(data[1]);
						});
					}
					break;
				case "set":
					switch(args[1]) {
						case "cmd":
							app.custom.commands[args[2]] = args[3];
							break;
						case "delete":
							switch (args[2]) {
								case "goto":
									delete app.goto[args[3]];
									break;
								default:
									delete app.custom.commands[args[2]];
							}
							break;
						case "goto":
						case "go":
							app.goto[args[2]] = args[3];
							break;
					}
					break;
				case "forum":
				case "f":
					var curButton = document.getElementsByClassName("selected")[0];
					switch(args[1]) {
						case "next":
						case "n":
							gotoPage(curButton.nextSibling.childNodes[0].href, hasFlair(flairs, "-t"));
							break;
						case "prev":
						case "pr":
							gotoPage(curButton.previousSibling.childNodes[0].href, hasFlair(flairs, "-t"));
							break;
						case "last":
						case "l":
							gotoPage(document.getElementsByClassName("pagenav")[0].childNodes[document.getElementsByClassName("pagenav")[0].childNodes.length - 1].childNodes[0].href, hasFlair(flairs, "-t"));
							break;
						case "first":
						case "f":
							gotoPage(document.getElementsByClassName("pagenav")[0].childNodes[0].childNodes[0].href, hasFlair(flairs, "-t"));
							break;
						case "page":
						case "p":
							gotoPage("/topic/" + window.location.pathname.split("/")[2] + "?page=" + args[2], hasFlair(flairs, "-t"));
							break;
						case "recent":
						case "re":
							gotoPage(document.getElementsByClassName("recent_topic")[args[2] - 1].childNodes[1].childNodes[0].href, hasFlair(flairs, "-t"));
							break;
						case "go":
							if (("complaints").indexOf(args[2]) != -1) {
								gotoPage("https://epicmafia.com/forum/27", hasFlair(flairs, "-t"));
							}
							else if (("bug reports").indexOf(args[2]) != -1) {
								gotoPage("https://epicmafia.com/forum/24", hasFlair(flairs, "-t"));
							}
							else {
								var cycleForums = function (forums) {
									var foundForum = false;
									
									forums.each(function () {
										if ($(this).text().toLowerCase().indexOf(args[2]) != -1) {
											foundForum = true;
											gotoPage($(this).attr("href"), hasFlair(flairs, "-t"));
										}
									});
									
									if (!foundForum) {
										sAlert("Forum not found!");
									}
								};
								
								if (window.location.pathname == "/forum" || window.location.pathname.indexOf("/forum/lobby") ==0) {
									cycleForums($(".forum_title"));
								}
								else {
									var div = $("<div></div>");
									$.get("/forum", function (data) {
										div.html(data);
										cycleForums(div.find(".forum_title"));
									});
								}
							}
							break;
						case "topic":
						case "t":
							if (window.location.pathname.indexOf("/forum") == 0) {
								var search = "";
								for (var i = 2; i < noFlairs.length; i++) {
									search += (noFlairs[i] + " ");
								}
								var foundTopic = false;
								$(".forum_recent_link a").each(function () {
									if ($(this).text().toLowerCase().indexOf(search.trim()) != -1) {
										foundTopic = true;
										gotoPage($(this).attr("href"), hasFlair(flairs, "-t"));
									}
								});
								$(".topic-title").each(function () {
									if ($(this).text().toLowerCase().indexOf(search.trim()) != -1) {
										foundTopic = true;
										gotoPage($(this).attr("href"), hasFlair(flairs, "-t"));
									}
								});
								if (!foundTopic) {
									sAlert("Matching topic not found!");
								}
							}
							else {
								sAlert("You can only use this command on a forum page!");
							}
					}
					break;
				case "poke":
					sAlert("Returning all pokes...");
					var pokes = [];
					var i = 0;
					var poke = function () {
						$.get(pokes[i], function () {
							i ++;
							if (i < pokes.length) {
								poke();
							}
							else {
								window.location.reload();
							}
						});
					};
					
					$(".poke_back").each(function() {
						pokes.push($(this).attr("href"));
					});
					poke();
					break;
				case "alt":
					$.get("/user/alts", function (data) {
						data = data.alts;
						if (parseInt(args[1])) {
							gotoPage("/user/load/" + data[args[1]].id, hasFlair(flairs, "-t"));
						}
						else {
							for (var i in data) {
								if (data[i].username.toLowerCase().indexOf(args[1]) != -1) {
									gotoPage("/user/load/" + data[i].id, hasFlair(flairs, "-t"));
								}
							}
						}
					});
					break;
				case "close":
					chrome.runtime.sendMessage({type: "close"});
					break;
				case "ees":
					switch (args[1]) {
						case "set":
							chrome.runtime.sendMessage({type: "set", key: args[2]});
							break;
						case "clear":
							chrome.runtime.sendMessage({type: "clear"});
							break;
					}
					break;
				case "friend":
					var id = $("[data-title='Game Statistics']").attr("href").split("/")[2];
					$.post("https://epicmafia.com/friend/request", {userid: id}, function (data) {
						if (data.status) {
							sAlert('Friend reqeust sent!');
						}
						else {
							sAlert(data.msg);
						}
					});
					break;
				default:
					if (app.custom.commands[args[0]]) {
						args[0] = app.custom.commands[args[0]];
						process(args.join(" "));
					}
					else {
						sAlert(args[0] + " is not a known command!");
					}
			}
		}
		catch (e) {
			/*
			try {
				sAlert(String(e));
			}
			catch (e2) {
				console.log(e2);
			}
			*/
		}
		
		if (shouldSave) {
			save();
		}
	};

	var save = function () {
		localStorage.emconsole = JSON.stringify(app);
	};
	
	var sAlert = function (msg) {
		window.postMessage({type: 'alert', text: msg}, "https://epicmafia.com");
	};
	
	var hasFlair = function (arr, f) {
		for (var i in arr) {
			if (arr[i] == f) return true;
		}
		return false;
	};
	
	var gotoPage = function (url, newTab) {
		if (newTab) {
			window.open(url);
		}
		else {
			window.location = url;
		}
	};

	var getId = function (name, cb) {
		var id;
		$.get("https://epicmafia.com/user/search?q=" + name, function (data) {
			data = data.data;
			if (data.length > 0) {
				id = data[0].id;
				cb(id);
			}
			else {
				cb(false);
			}
		});
	};

	var error = function (err) {
		//
		console.log(err);
	};

	container.id = "console";
	container.style.cssText = containerCSS;
	cons.style.cssText = consoleCSS;

	container.appendChild(cons);
	document.body.appendChild(container);

	document.onkeydown = function (e) {
		if (e.which == 192 && e.ctrlKey) {
			if (container.style.display == "none") {
				container.style.display = "block";
				cons.focus();
				app.show = "block";
				save();
			}
			else {
				container.style.display = "none";
				app.show = "none";
				save();
			}
		}
		else if (e.which == 27) {
			//escape
			container.style.display = "none";
			app.show = "none";
			save();
		}
		else if (e.which == 13 && container.style.display == "block") {
			//enter
			process(cons.value);
			cons.value = "";
		}
		else if (e.which == 192 && app.show == "block") {
			//~
			e.preventDefault();
			cons.focus();
		}
	};

	cons.focus();
};