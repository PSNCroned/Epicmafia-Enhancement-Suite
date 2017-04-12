scripts.emjack.run = function () {
	console.log("emjack");
	
	chrome.storage.local.get("emjack", function (data) {
		eval(data.emjack);
	});
};