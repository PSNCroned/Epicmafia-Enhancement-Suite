scripts.emjack.run = function () {
	console.log("emjack");
	var script = document.createElement("script");
	chrome.storage.local.get("emjack", function (data) {
		script.innerHTML = data.emjack;
		document.body.appendChild(script);
	});
};