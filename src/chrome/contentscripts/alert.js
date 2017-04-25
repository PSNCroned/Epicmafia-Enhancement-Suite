var script = document.createElement("script");
script.innerHTML = '\
	window.addEventListener("message", function (event) {\
		if (event.data.type == "alert") {\
			window.errordisplay(".errodisplay", event.data.text);\
		}\
	});\
';
document.body.appendChild(script);