var script = document.createElement("script");
script.innerHTML = '\
	var scope;\
	switch (window.location.pathname.split("/")[1]) {\
		case "/lobby":\
			scope = $("#lobby_container").scope();\
			break;\
		case "/message":\
			/*\
			Event triggered by scope.loadMessages() in message.js\
			*/\
			$("body").on("newScope", function () {\
				scope = $(".grid22.ng-scope").scope();\
			});\
			break;\
		case "game":\
			scope = $("#game-container").scope();\
			\
			if (scope) {\
				scope.settings = JSON.parse(window.localStorage.mafiaGameSettings || "{\\"fullscreen\\": false, \\"timestamp\\": false, \\"voting\\": false, \\"acronym\\": false,  \\"muting\\": false, \\"emoticons\\": false, \\"mutemusic\\": false, \\"speechfilter\\": false, \\"mutedeathsounds\\": false}");\
				\
				$("body").on("mafiaGameSettings", function () {\
					window.localStorage.mafiaGameSettings = JSON.stringify(scope.settings);\
				});\
			}\
			break;\
	}\
	window.addEventListener("message", function (event) {\
		switch (event.data.type) {\
			case "alert":\
				window.errordisplay(".errodisplay", event.data.text);\
				break;\
			case "run":\
				eval(event.data.text);\
				break;\
		}\
	});\
';
document.body.appendChild(script);