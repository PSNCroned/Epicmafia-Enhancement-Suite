var script = document.createElement("script");
script.innerHTML = '\
	var scope;\
	switch (window.location.pathname) {\
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