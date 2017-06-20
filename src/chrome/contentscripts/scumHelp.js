scripts.scumhelp.run = function () {
	console.log("Scum Help");
	
	var red = false;
	var green = false;

	$("body").keydown(function(e) {
		if (e.key == "r" && e.altKey) {
			red = true;
		}
		else if (e.key == "g" && e.altKey) {
			green = true;
		}
	});

	$("body").keyup(function(e) {
		if (e.key == "r") {
			red = false;
		}
		else if (e.key == "g") {
			green = false;
		}
	});
	
	$("body").on("click", ".msg", function () {
		if (red) {
			$(this).css({"background-color": "#ff6666"});
		}
		else if (green) {
			$(this).css({"background-color": "#b3ffb3"});
		}
		else {
			$(this).css({"background-color": "transparent"});
		}
		window.getSelection().removeAllRanges();
	});
};