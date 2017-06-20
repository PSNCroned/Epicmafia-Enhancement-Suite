scripts.console.run = function () {
	console.log("emConsole");
	
	if(!window.jQuery) {
	   var script = document.createElement('script');
	   script.type = "text/javascript";
	   script.src = "https://code.jquery.com/jquery-latest.js";
	   document.head.appendChild(script);
	}

	var save = function () {
		localStorage.emconsole = JSON.stringify(app);
	};
	
	var lobbyList = {"main":1,"sandbox":5,"games":6,"survivor":27,"competitive":3,"danganmafia":12,"outcast":69,"vidya":13,"snkmafia":42,"mafiastuck":56,"banneduserlobby":25,"undertale":236,"reverse":93,"stevenuniversemafia":197,"hetamafia":72,"bakerswag":102,"sportsanimemafia":100,"chrismclean":39,"colormafia":55,"personamafia":91,"talesofmafia":31,"multifandommafia":117,"phoenixwrightmafia":66,"nokillmafioso":11,"bakerswag2":103,"hsmafia":229,"videogames":44,"overwatchmafia":307,"bakerswag3":104,"bakerswag4":105,"vancy":9,"rwbymafia":132,"chronic":26,"fireemblem":187,"drgmafia":292,"illuminati":166,"open":40,"multiversemadness":176,"kagemafia":65,"test":20,"sparta":183,"naruto":124,"dailymafia":54,"herecomesdatmaf":323,"newdanganmafia":97,"hivecity":246,"crunk":142,"avalon":171,"anonymous":16,"whatmafia":144,"wearegods":34,"unlimitedbrettworks":8,"happyspermfamily":61,"testing":59,"coolkidsonly":113,"madokamafia":75,"mogekomafia":134,"ducksquad":165,"klkmafia":64,"squad":313,"undertalemafia":232,"bokunoheroacademia":290,"icepc":133,"shuutoku":121,"kino":80,"ghost":149,"teammafia":135,"dangerzone":322,"bisamafia":58,"enstars":325,"hipstermafia":128,"gold":17,"dogeteam":212,"mixmatchmafia":138,"customrolesonly":15,"adventure":60,"aamafia":52,"karaluchy":248,"angle":319,"mafiables":157,"xtraining":51,"liarsdice":119,"osomatsusan":258,"helix":158,"thenagilobby":77,"sumafia":283,"blastoise":200,"utdinnergames":268,"nihility":267,"takis":280,"cirnolobby":95,"ryuunobu":341,"doubtacademy":76,"mentors":244,"2roomsandaboom":71,"gaymes":130,"ttmlobby":328,"implyingmaf":249,"despairmafia":85,"lovebox":275,"tdwiki":298,"bbandvivor":28,"evolpz":340,"abyss":357,"emundertale":250,"ddmafia":203,"zeal":29,"yakuzapalooza":94,"hunterxhunter":287,"stickers":123,"chito":141,"pimpdown":277,"memeteam":336,"chickennugger":112,"rvbmafia":126,"memesus":216,"mutualpeak":79,"pointfarm":146,"amazon":182,"mentoring":74,"ygomafia":289,"fredbox":281,"idolhell":301,"spooky":218,"adblock":265,"pmdmaf":222,"points":192,"podsawesomelobby":155,"undertalecasual":284,"wolfpack":57,"talesofeggbear":78,"christianminglelobby":83,"vocamafia":161,"goatmafia":211,"stayout":33,"cittamafia":50,"elites":140,"funlobby":326,"sandbaax":327,"fusion":317,"maxifun":172,"mafiascum":184,"unnamedlobby":266,"splashpad":344,"bangarang":348,"gliese":101,"anarchy":304,"exalted":247,"noter":342,"plllobby123":109,"eiyumafia":168,"best":195,"ewangslayers":167,"family":217,"lukageo":306,"space":353,"sforestmafia":36,"pokemon":81,"dissentmafia":309,"treehouse":324,"duffs":227,"pancake":230,"secretlobby":82,"cute":339,"supremememes":352,"mainstreet":170,"epicmafiaidol":150,"superkent":233,"murderboat":329,"thechosen":169,"wifom":190,"bebop":320,"superkicks":338,"dysfunctional":199,"project":175,"happypeople":125,"party":207,"sloths":86,"sammmie":351,"definitely":343,"mechtesting":99,"jjbamafia":148,"supersmashcampus":174,"ryslig":206,"lobbyyy":213,"kodachrome":315,"lowresazamamafia":337,"socialism":347,"loll":178,"ijustwantedtomakeone":179,"aphforum":181,"fuckboys":220,"semesterofdesolation":164,"finalfantasymafiosos":173,"hazyville":332,"wishlist":186,"morgmafia":205,"mafianmoseby":271,"trophy":24,"remnantmafia":185,"anythinggoes":208,"scholomance":177,"macklelobby":234,"6duck":84,"kyuupiikei":241,"bikinibottom":257,"cahniverse":272,"cius":288,"didijusthearhope":310,"shittyyugiohmafia":269,"kingdomheartsmafia":295,"sodplus":300,"undermafia":335,"topsecret":89,"sonicthehedgehog":252,"earthbound":273,"tokens":274,"terubearufunhouse":354,"windylobby":253,"memers":152,"sokoisanerd":163,"theantivoid":308,"dogelobby":254,"utopia":270,"chillmafia":209,"nerdyassplurkmafia":215,"southpark":228,"main1":98,"mafiamatsu":356,"liam":256,"betmen":262,"farmlobby":264,"iwannabethemafia":30,"idolmafia":293,"super":346,"laboratorium":107,"underlook":291,"herogarbage":70,"lgbt":350,"ultimate":122,"dapperjim":180,"yoloswag":259,"greymistlake":260,"scream":261,"doubtacademymafia":321,"lulzsec":358,"epic":193,"mafiatama":210,"litterbox":286,"lukageo2":312,"maln":154,"ictwitmaf":131,"magimafia":162,"whocares":214,"showbymafia":294,"bulletdimension":303,"private":305,"voltronmafia":311,"usagi":330,"bananahammock":334,"smbx":188,"deathvalley":243,"spike":255,"carbon":202,"spicysinners":263,"platinum":18,"geomafia":318,"johnbatman":345,"junk":219,"diamond":19,"hello":47,"gerk":62,"gayrights":331,"feministrt":106,"thefiverlobbyists":115,"ghostsnfools":224,"cyanandco":41,"shslmafia":120,"wang":242,"tacobox":314,"deadnigger":191,"round100bronze":145,"gayexplosion":194,"dome":333,"asylum":349,"losttrophy":143,"michaelcerafanclub":189,"friendsmafia":196,"murderbox":282,"galaxycauldronmafia":302,"matsu":355,"laboratory":316};
	
	var gotoKeys = {
		mods: "/moderator",
		home: "/home",
		round: "/round",
		reports: "/report",
		report: "/report",
		pm: "/message",
		pms: "/message",
		msg: "/message",
		message: "/message",
		family: "/family",
		forum: "/forum",
		forums: "/forum",
		f: "/forum",
		learn: "/role",
		roles: "/role",
		role: "/role",
		settings: "/user/edit",
		set: "/user/edit",
		family: "/family",
		fam: "/family",
		buy: "/addon",
		addon: "/addon",
		alts: "/user/alternates",
		alt: "/user/alternates",
		alternates: "/user/alternates",
		alternate: "/user/alternates",
		create: "/game/new",
		creategame: "/game/new",
		new: "/game/new",
		host: "/game/new",
		newgame: "/game/new",
		fame: "/score/fame",
		halloffame: "/score/fame",
		achieve: "/score/achieve",
		achievers: "/score/achieve",
		familyfame: "/score/family",
		famfame: "/score/family",
		setupfame: "/score/setup",
		honor: "/score/honorrole",
		honorrole: "/score/honorrole",
		alltime: "/score/alltime",
	};
	
	var localStorage = window.localStorage;
	var app = localStorage.emconsole;
	var history = JSON.parse(localStorage.eesConsoleHistory || "[]");
	var historyIndex = -1;
	var tempConsVal = "";
	if (app) {
		app = JSON.parse(app);
		
		//Check if they have the full lobby list
		if (Object.keys(app.lobbies).length < Object.keys(lobbyList).length) {
			console.log("new lobbies!");
			for (var key in lobbyList) {
				if (!(key in app.lobbies)) {
					app.lobbies[key] = lobbyList[key];
				}
			}
			save();
		}
		
		//Check if they have the full goto list
		for (var key in gotoKeys) {
			if (!app.goto[key]) {
				app.goto[key] = gotoKeys[key];
			}
		}
		
		if (app.goto.reports == "/reports") {
			app.goto.reports = "/report";
			save();
		}
		
		
	}
	else {
		app = {
			show: "none",
			goto: gotoKeys,
			lobbies: lobbyList,
			custom: {
				commands: {}
			}
		};
		save();
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
		* = optional<br>\
		Multiple commands can be separated by a semicolon to run them in succession.\
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
				<b>[foreward, fwd]</b> - Navigate foreward in history\
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
				<b>[up, u] [amount]</b> - Scroll up partially, amount is a multiple of 500px and defaults to 1\
			</li>\
			<li>\
				<b>[down, d] [amount]</b> - Scroll down partially, amount is a multiple of 500px and defaults to 1\
			</li>\
			<li>\
				<b>pm</b> - Do stuff with private messages\
				<ul>\
					<li><i>pm [send, s] [name, id] message</i> - Send a pm directly from the console</li>\
					<li><i>pm [open, o] [keyword, index]</i> - Open a pm by index or keyword visible from the inbox page. Also works remotely.</li>\
					<li><i>pm [comp, c]</i> - Go to the pm composition page</li>\
					<li><i>pm [inbox, all, i , a]</i> - Go to your inbox</li>\
					<li><i>pm [unread, u]</i> - Go to your unread messages</li>\
					<li><i>pm [sent, st]</i> - Go to your sent messages</li>\
					<li><i>pm [next, n]</i> - Go to the next page of messages</li>\
					<li><i>pm [prev, pr]</i> - Go to the previous page of messages</li>\
					<li><i>pm [first, f]</i> - Go to the first page of messages</li>\
					<li><i>pm [last, l]</i> - Go to the last page of messages</li>\
					<li><i>pm [page, p] page#</i> - Go to the specified page of messages</li>\
				</ul>\
			</li>\
			<li>\
				<b>set</b> - Customize the console\
				<ul>\
					<li><i>set cmd [newCommand] [oldCommand]</i> - Make/edit a custom command that mimics a preexisting one</li>\
					<li><i>set goto [key] [url]</i> - Make/edit a goto key</li>\
					<li><i>set lobby [key] [lobby name]</i> - Adds or edits a lobby key</li>\
					<li><i>set delete [command]</i> - Deletes a custom command</li>\
					<li><i>set delete goto [key]</i> - Deletes a goto key</li>\
					<li><i>set delete lobby [key]</i> - Deletes a lobby key</li>\
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
				<b>[friend, fr]</b> - Send a friend request to the user of the user page you're viewing\
			</li>\
			<li>\
				<b>join *[index]</b> - Join game by index in game list (index does not count unjoinable games). Not specifying an index joins the first open game.\
			</li>\
			<li>\
				<b>wait [time]</b> - Waits the specified amount of miliseconds between two commands running in succession.\
			</li>\
			<li>\
				<b>[macro, m]</b> - Make easy-to-access command combos\
				<ul>\
					<li><i>m [edit, e] [name]</i> - Opens a popup where you can edit the given macro</li>\
					<li><i>m [run, r] [name]</i> - Run the given macro</li>\
				</ul>\
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
	
	var macroModal = document.createElement("div");
	macroModal.innerHTML = "\
		<div id='macroModal' style='display: none; position: fixed; top: 0px; width: 100%; height: 100%; z-index: 1000;'>\
			<div style='margin: auto; width: 1000px; background-color: white; position: relative; top: 50%; transform: translateY(-50%); padding: 20px; box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);'>\
				<div class='modal-header' style='margin: auto; width: 1000px; text-align: center; font-size: 35px; padding: 10px;'>\
					<h4>Editing Macro \"<span id='macroName'></span>\"</h4>\
				</div>\
				<div class='modal-body' style='margin: auto; width: 1000px; text-align: center; padding-bottom: 10px;'>\
					<input type='text' id='macroInput' style='width: 500px; font-size: 20px; border: 1px solid #444; padding: 2px;' />\
				</div>\
				<div class='modal-footer' style='margin: auto; width: 1000px; text-align: center;'>\
					<button id='cancelMacro' style='font-size: 20px; padding: 5px; border: 1px solid #444; cursor: pointer;'>Cancel</button>\
					<button id='saveMacro' style='font-size: 20px; padding: 5px; border: 1px solid #444; cursor: pointer;'>Save</button>\
				</div>\
			</div>\
		</div>";

	var process = function (cmd) {
		if (cmd[cmd.length - 1] == ";") {
			cmd.replace(";", "");
		}
		var combo = cmd.toLowerCase().trim().split(";");
		if (combo.length == 1) {
			var shouldSave = true;
			var args = cmd.toLowerCase().trim().split(" ");
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
						checkCombos();
						break;
					case "goto":
					case "go":
						switch (args[1]) {
							case "lobby":
							case "l":
								if (noFlairs.length > 2) {
									var hasScope = $("#lobby_container").length > 0;
									if (!parseInt(args[2])) {
										if (hasScope && !hasFlair(flairs, "-t")) {
											rScript("scope.goto_lobby(" + app.lobbies[args[2]] + ");");
											checkCombos();
										}
										else {
											gotoPage("/lobby#?id=" + app.lobbies[args[2]], hasFlair(flairs, "-t"));
										}
									}
									else {
										if (hasScope && !hasFlair(flairs, "-t")) {
											rScript("scope.goto_lobby(" + args[2] + ");");
											checkCombos();
										}
										else {
											gotoPage("/lobby#?id=" + args[2], hasFlair(flairs, "-t"));
										}
									}
								}
								else {
									gotoPage("/lobby", hasFlair(flairs, "-t"));
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
						checkCombos();
						break;
					case "bottom":
					case "bot":
						window.scrollTo(0,document.body.scrollHeight);
						checkCombos();
						break;
					case "up":
					case "u":
						window.scroll(0, window.scrollY - (500 * (parseInt(args[1]) || 1)));
						checkCombos();
						break;
					case "down":
					case "d":
						window.scroll(0, window.scrollY + (500 * (parseInt(args[1]) || 1)));
						checkCombos();
						break;
					case "pm":
						switch (args[1]) {
							case "send":
							case "s":
								var msg = "";
								for (var i = 3; i < preservedCase.length; i++) {
									msg += (preservedCase[i] + " ");
								}

								if (!parseInt(args[2])) {
									getId(args[2], function (id) {
										$.post("/message", {msg: msg, subject: "", "recipients[]": id}, function (data) {
											sAlert(data[1]);
											checkCombos();
										});
									});
								}
								else {
									$.post("/message", {msg: msg, subject: "", "recipients[]": args[2]}, function (data) {
										sAlert(data[1]);
										checkCombos();
									});
								}
								break;

							case "open":
							case "o":
								var messages = [];

								var cb = function (messages) {
									if (parseInt(args[2])) {
										if (window.location.pathname == "/message" && !hasFlair(flairs, "-t")) {
											messages[args[2] - 1][0].click();
											checkCombos();
										}
										else {
											gotoPage(messages[args[2] - 1].attr("href"), hasFlair(flairs, "-t"));
										}
									}
									else {
										var search = "";
										for (var i = 2; i < noFlairs.length; i++) {
											search += (noFlairs[i] + " ");
										}
										for (var i in messages) {
											if (messages[i].text().toLowerCase().indexOf(search.trim()) != -1) {
												if (!hasFlair(flairs, "-t")) {
													messages[i][0].click();
													checkCombos();
													break;
												}
												else {
													gotoPage("/message" + messages[i].attr("href"), hasFlair(flairs, "-t"));
												}
											}
										}
									}
								};

								if ($("#messages_table").length) {
									$(".message").each(function () {
										if (!$(this).hasClass("ng-hide")) {
											messages.push($(this));
										}
									});
									cb(messages);
								}
								else {
									$.get("/message/fetch/all", function (data) {
										var a, i;
										data = data[1].data;

										for (i in data) {
											a = document.createElement("a");
											a.href = "/message#/message/" + data[i].id;
											a.textContent = data[i].subject || data[i].msg;
											messages.push($(a));
										}
										cb(messages);
									});
								}
								break;
							case "inbox":
							case "i":
							case "all":
							case "a":
								if (!hasFlair(flairs, "-t") && window.location.pathname == "/message") {
									$("#message_controls a")[0].click();
									checkCombos();
								}
								else {
									gotoPage("/message", hasFlair(flairs, "-t"));
								}
								break;
							case "compose":
							case "comp":
							case "c":
								if (!hasFlair(flairs, "-t") && window.location.pathname == "/message") {
									$("#message_controls a")[1].click();
									checkCombos();
								}
								else {
									gotoPage("/message#/compose", hasFlair(flairs, "-t"));
								}
								break;
							case "unread":
							case "u":
								if ($("#message_filters").length && !hasFlair(flairs, "-t")) {
									$("#message_filters a:contains(Unread)")[0].click();
									checkCombos();
								}
								else {
									gotoPage("/message#/unread", hasFlair(flairs, "-t"));
								}
								break;
							case "sent":
							case "st":
								if ($("#message_filters").length && !hasFlair(flairs, "-t")) {
									$("#message_filters a:contains(Sent)")[0].click();
									checkCombos();
								}
								else {
									gotoPage("/message#/sent", hasFlair(flairs, "-t"));
								}
								break;
							case "next":
							case "n":
								if ($(".pagenav").length && window.location.pathname == "/message") {
									rScript("if (scope.page < scope.pagenav.total_pages) {scope.setPage(scope.page + 1)}");
								}
								checkCombos();
								break;
							case "prev":
							case "pr":
								if ($(".pagenav").length && window.location.pathname == "/message") {
									rScript("if (scope.page > 1) {scope.setPage(scope.page - 1)}");
								}
								checkCombos();
								break;
							case "page":
							case "p":
								rScript("var p = " + args[2] + "; if (p > 0 && p <= scope.pagenav.total_pages) {scope.setPage(p)}");
								checkCombos();
								break;
							case "last":
							case "l":
								rScript("scope.setPage(scope.pagenav.total_pages)");
								checkCombos();
								break;
							case "first":
							case "f":
								rScript("scope.setPage(1)");
								checkCombos();
								break;
						}
						break;
					case "set":
						switch(args[1]) {
							case "cmd":
								app.custom.commands[args[2]] = args[3];
								sAlert(args[2] + " now performs the same action as " + args[3]);
								break;
							case "delete":
								switch (args[2]) {
									case "goto":
										delete app.goto[args[3]];
										sAlert("Deleted custom navigation: " + args[3]);
										break;
									case "lobby":
										delete app.lobbies[args[3]];
									default:
										delete app.custom.commands[args[2]];
										sAlert("Deleted custom command: " + args[2]);
								}
								break;
							case "goto":
							case "go":
								app.goto[args[2]] = args[3];
								sAlert("You can now use 'go " + args[2] + "'");
								break;
							case "lobby":
							case "l":
								if (parseInt(args[3])) {
									app.lobbies[args[2]] = parseInt(args[3]);
									sAlert("You can now use 'go lobby " + args[2] + "'");
								}
								else {
									if (app.lobbies[args[3]]) {
										app.lobbies[args[2]] = app.lobbies[args[3]];
										sAlert("You can now use 'go lobby " + args[2] + "'");
									}
									else {
										sAlert("Lobby '" + args[3] + "' not found!");
									}

								}
								break;
						}
						checkCombos();
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
											checkCombos();
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
										checkCombos();
									}
								}
								else {
									sAlert("You can only use this command on a forum page!");
									checkCombos();
								}
						}
						break;
					case "poke":
						if ($(".poke_back").length) {
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
						}
						checkCombos();
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
						checkCombos();
						break;
					case "friend":
					case "fr":
						var id = $("[data-title='Game Statistics']").attr("href").split("/")[2];
						$.post("https://epicmafia.com/friend/request", {userid: id}, function (data) {
							if (data.status) {
								sAlert('Friend reqeust sent!');
							}
							else {
								sAlert(data.msg);
							}
							checkCombos();
						});
						break;
					case "join":
						var open = [];
						$.get("https://epicmafia.com/game/find", function (data) {
							var games = JSON.parse(data[1]).data;
							for (var i in games) {
								if (games[i].gametype == "mafia" && !games[i].password && games[i].status_id == 0) {
									open.push(games[i]);
								}
							}

							if (open.length > 0) {
								if (noFlairs.length > 1) {
									if (open[args[1] - 1]) {
										gotoPage("https://epicmafia.com/game/" + open[args[1] - 1].id, hasFlair(flairs, "-t"));
									}
									else {
										sAlert("Unable to join that game!");
										checkCombos();
									}
								}
								else {
									gotoPage("https://epicmafia.com/game/" + open[0].id, hasFlair(flairs, "-t"));
								}
							}
							else {
								sAlert("No open games!");
								checkCombos();
							}
						});
						break;
					case "wait":
						setTimeout(function () {
							checkCombos();
						}, args[1]);
						break;
					case "macro":
					case "m":
						switch (args[1]) {
							case "edit":
							case "e":
								if (!app.custom.macros) {
									app.custom.macros = {};
								}
								editMacro(args[2]);
								break;
							case "run":
							case "r":
								if (app.custom.macros) {
									if (app.custom.macros[args[2]]) {
										process(app.custom.macros[args[2]]);
									}
									else {
										sAlert("Macro " + args[2] + " does not exist!");
									}
								}
								else {
									app.custom.macros = {};
									sAlert("Macro " + args[2] + " does not exist!");
								}
								break;
						}
						break;
					default:
						if (app.custom.commands[args[0]]) {
							args[0] = app.custom.commands[args[0]];
							process(args.join(" "));
						}
						else {
							sAlert(args[0] + " is not a known command!");
							checkCombos();
						}
				}
			}
			catch (e) {
				checkCombos();
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
		}
		else {
			setCombos(combo.slice(1, combo.length));
			process(combo[0]);
		}
	};
	
	var sAlert = function (msg) {
		window.postMessage({type: 'alert', text: msg}, "https://epicmafia.com");
	};
	
	var rScript = function (scr) {
		window.postMessage({type: 'run', text: scr}, "https://epicmafia.com");
	};
	
	var setCombos = function (arr) {
		localStorage.eescombos = arr.join(";");
	};
	
	var checkCombos = function () {
		var combo = localStorage.eescombos || "";
		if (combo) {
			combo = combo.split(";");
		}
		else {
			combo = [];
		}
		if (combo.length) {
			setCombos(combo.slice(1, combo.length));
			process(combo[0]);
		}
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
		console.log(err);
	};
	
	var editMacro = function (id) {
		$("#macroName").text(id);
		$("#macroInput").val(app.custom.macros[id]);
		$("#macroModal").show();
		$("body").css({
			filter: "blur(5px)"
		});
		document.getElementById("macroInput").focus();
	};
	
	var closeMacro = function () {
		$("#macroName").text("");
		$("#macroInput").val("");
		$("#macroModal").hide();
		$("body").css({
			filter: "blur(0px)"
		});
		cons.focus();
	};
	
	var saveMacro = function () {
		app.custom.macros[$("#macroName").text()] = $("#macroInput").val();
		sAlert("Macro '" + $("#macroName").text() + "' saved!");
		save();
	};
	
	var showHistory = function () {
		if (historyIndex > -1) {
			cons.value = history[historyIndex];
		}
		else {
			cons.value = tempConsVal;
		}
	};
	
	var saveHistory = function () {
		localStorage.eesConsoleHistory = JSON.stringify(history);
	};

	container.id = "console";
	container.style.cssText = containerCSS;
	cons.id = "consoleInput";
	cons.style.cssText = consoleCSS;

	container.appendChild(cons);
	document.body.appendChild(container);
	document.body.parentNode.insertBefore(macroModal, document.body.nextSibling);
	
	document.getElementById("cancelMacro").addEventListener("click", function () {
		closeMacro();
	});
	
	document.getElementById("saveMacro").addEventListener("click", function () {
		saveMacro();
		closeMacro();
	});

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
			if ($("#macroModal").is(":visible")) {
				closeMacro();
			}
			else {
				container.style.display = "none";
				app.show = "none";
				save();
			}
		}
		else if (e.which == 13 && container.style.display == "block" && document.activeElement.id == "consoleInput") {
			//enter on console
			process(cons.value);
			history.unshift(cons.value);
			if (history.length > 50) {
				history.pop();
			}
			saveHistory();
			historyIndex = -1;
			cons.value = "";
		}
		else if (e.which == 13 && document.activeElement.id == "macroInput") {
			//enter on macro edit
			saveMacro();
			closeMacro();
		}
		else if (e.which == 192 && app.show == "block") {
			//~
			if (!$("#macroModal").is(":visible")) {
				e.preventDefault();
				cons.focus();
			}
		}
		else if (e.which == 38 && document.activeElement.id == "consoleInput") {
			//Up
			if (historyIndex < history.length - 1) {
				if (historyIndex == -1) tempConsVal = cons.value;
				historyIndex ++;
				showHistory();
			}
		}
		else if (e.which == 40 && document.activeElement.id == "consoleInput") {
			//Down
			if (historyIndex > -1) {
				historyIndex --;
				showHistory();
			}
		}
	};

	cons.focus();
	checkCombos();
};