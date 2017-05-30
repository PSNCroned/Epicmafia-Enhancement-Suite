scripts.emjack.run = function () {
	var special = ($("#game_title:contains(ees-socket-game)").length || $("body").attr("eesgame"));
	if (!special) {
		console.log("emjack");

		chrome.storage.local.get("emjack", function (data) {
			eval(data.emjack);
		});
	}
};