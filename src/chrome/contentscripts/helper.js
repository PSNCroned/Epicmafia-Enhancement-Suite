scripts.helper.run = function () {
	//console.log("Thulu");
	var visible = true;
	var img = $("<img>");
	img.attr("src", "http://i.imgur.com/q6ydYw7.png");
	$("body").append(img);
	img.css({position: "fixed", top: "100px", right: "0px", height: "80px", cursor: "pointer"});
	img.click(function () {
		if (visible) {
			$(this).animate({right: "-45"}, 500);
			visible = false;
		}
		else {
			$(this).animate({right: "0"}, 500);
			visible = true;
		}
	});
};