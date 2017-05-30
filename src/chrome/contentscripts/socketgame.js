var socketGame = function () {
	console.log("Socket game");
	
	var debug = true;
	
	//var ees = {};
	window.ees = {};
	
	ees.init = function () {
		console.log("Initializing");
		
		Game.started = true;
		Game.players = scope.user_list.slice();
		Game.players.splice(Game.players.indexOf(Game.host), 1);
		Game.turn = 0;
		
		Game.snakes = [
			{start: 18, end: 4},
			{start: 21, end: 15},
			{start: 34, end: 24},
		];
		Game.ladders = [
			{start: 2, end: 14},
			{start: 22, end: 16},
			{start: 32, end: 20},
		];
		Game.positions = [];
		Game.players.forEach(function (p) {
			if (p != Game.host) {
				Game.positions.push({name: p, pos: 0});
			}
		});
		
		$("#window").css({
			"background-image": "url('http://i.imgur.com/ladf1aw.gif')",
			"background-size": "cover",
			"width": "545px",
			"height": "545px",
			"margin": "auto"
		});
		
		$(".cmds").css({
			"width": "250px"
		});
		$(".cmds").html("");
		$("#speak_container").css({
			"text-align": "center"
		});
		$("#speak").css({
			"float": "none"
		});
		$("#statewrap").hide();
	};
	
	ees.process = function (event) {
		msgs = event.data;
		
		var cmd, data, res;
		try {
			msgs = JSON.parse(msgs);
		}
		catch (e) {
			//console.log(e);
			msgs = null;
		}
		
		if (msgs) {
			msgs.forEach(function (msg) {
				console.log(msg);
				cmd = msg[0];
				data = msg[1];

				switch (cmd) {
					case "move":
						//send("<", {msg: "Moved to coords " + data.coor.x + ", " + data.coor.y});
						//send("move", {pos: ['001', '001']});
						decode(data.coor.x, data.coor.y, data.user);
						break;
					case "<":

						break;
					case "leave":

						break;
					case "r":
						if (!Game.started) {
							init();
						}
						break;
				}
			});
		}
	};
	
	ees.sendMsg = function (msg) {
		send("<", {msg: msg});
	};
	
	ees.sendMove = function (x, y) {
		for (var i = 0, xlen = x.length; i < 3 - xlen; i++) {
			x = ("0" + x);
		}
			 
		for (var i = 0, ylen = y.length; i < 3 - ylen; i++) {
			y = ("0" + y);
		}
		
		send("move", {pos: [x, y]});
	};
	
	ees.getPos = function (name) {
		var pos;
		Game.positions.forEach(function (data) {
			if (name == data.name) {
				pos = data.pos;
			}
		});
		return pos;
	};
	
	ees.setPos = function (name, pos) {
		Game.positions.forEach(function (data) {
			if (name == data.name) {
				data.pos = parseInt(pos);
			}
		});
	};
	
	ees.getIndex = function (name) {
		var index;
		Game.players.forEach(function (n, i) {
			if (name == n) {
				index = i;
			}
		});
		return index;
	};
	
	ees.decode = function (x, y, sender) {
		x = String(x); //limit 525
		y = String(y); //limit 179
		
		for (var i = 0, xlen = x.length; i < 3 - xlen; i++) {
			x = ("0" + x);
		}
			 
		for (var i = 0, ylen = y.length; i < 3 - ylen; i++) {
			y = ("0" + y);
		}
		
		// x: 0    1     2    y: 0     1      2
		//   0-4  0-9   1-9     0-1   0-7    1-9  
		//
		// x[0]: Variable
		// x[1]: Variable
		// x[2]: Variable
		// 
		// y[0]: Client or host
		// y[1]: Msg code 1
		// y[2]: Msg code 2
		
		var msgCode = y[1] + y[2];
		
		switch (msgCode) {
			case "01":
				//roll dice
				if (y[0] == "0") {
					hostEval({cmd: "roll", sender: sender});
				}
				break;
			case "02":
				//move pos
				if (y[0] == "1") {
					clientEval({cmd: "move", pos: x[0] + x[1], user: Game.players[parseInt(x[2]) - 1], sender: sender});
				}
				break;
		};
	};
	
	ees.encode = function (data) {
		var x, y;
		
		switch (data.cmd) {
			case "roll":
				x = "001"; //Arbitrary
				y = "001"; //Code for roll from client
				sendMove(x, y);
				break;
			case "move":
				x = data.pos + String(data.user + 1); //9 player limit, position + player index
				y = "102"; //Code for move from host
				sendMove(x, y);
				break;
		}
	};
	
	ees.hostEval = function (data) {
		if (Game.isHost && Game.started) {
			switch (data.cmd) {
				case "roll":
					var roll = random(1, 6);
					var index = getIndex(data.sender);
					var newPos = parseInt(getPos(data.sender)) + roll;
					//check for snek/ladder
					//
					
					setPos(data.sender, newPos);
					encode({cmd: "move", pos: getPos(data.sender), user: index});
					break;
			};
		}
	};
	
	ees.clientEval = function (data) {
		if (!Game.isHost && data.sender == Game.host) {
			switch (data.cmd) {
				case "move":
					setPos(data.user, parseInt(data.pos));
					break;
			}
		}
	};
	
	ees.send = function (cmd, data) {
		if (sock) {
			sock.send(JSON.stringify([cmd, data]));
		}
	};
	
	var random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	WebSocket.prototype.send = function (original) {
		return function () {
			if (sock != this) {
				sock = this;
				
				sock.onmessage = function (original) {
					return function (event) {
						process(event);
						original.apply(this, arguments);
					};
				}(sock.onmessage);
			}
			original.apply(this, arguments);
		};
	}(WebSocket.prototype.send);
	
	ees.sock = null;
	ees.scope = $("#game-container").scope();
	ees.Game = {};
	
	sock = ees.sock;
	scope = ees.scope;
	Game = ees.Game;
	init = ees.init;
	process = ees.process;
	sendMsg = ees.sendMsg;
	sendMove = ees.sendMove;
	getPos = ees.getPos;
	setPos = ees.setPos;
	getIndex = ees.getIndex;
	decode = ees.decode;
	encode = ees.encode;
	hostEval = ees.hostEval;
	clientEval = ees.clientEval;
	send = ees.send;
	
	Game.name = "Snakes and Ladders";
	Game.started = false;
	Game.host = $("#game_title").text().split(" ")[1];
	Game.isHost = Game.host == scope.user;
	
	$("#game_title h5").text("Snakes and Ladders");
	$("#alive h2").text("Players");
	$(".gamesetup").hide();
	$("#lower-right").hide();
	$("#speak_container div, #speak_container a, #speak_container select").hide();
};



var special = $("#game_title:contains(ees-socket-game)").length;
if (special) {
	$("body").attr("eesgame", "snakesandladders");
	script = document.createElement("script");
	script.innerHTML = "(" + socketGame.toString() + ")()";
	document.body.appendChild(script);
}

//https://epicmafia.com/game/add/mafia?add_whisper=1&add_startday=1&add_lynch=0&add_mustact=0&add_dawn=0&add_sunset=0&add_noreveal=0&add_revealalign=0&add_lastwill=0&add_closedroles=0&add_anonymous=0&add_multiple=0&add_password=0&add_title=1&add_cam=0&game_title=ees-socket-game+The&setup%5B0%5D%5B118%5D=3&setup%5B0%5D%5B249%5D=1