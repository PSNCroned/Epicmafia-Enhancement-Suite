scripts.hideBackground.run = function () {
	console.log("Hide backgrounds");
	$("head").append("<style>body {background-image: url(https://epicmafia.com/images/scatter.png) !important; background-repeat: repeat !important;}</style>");
};