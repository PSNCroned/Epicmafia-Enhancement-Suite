var settings = {};
var notifs = {}; 

function sendToTabs (data) {
	chrome.tabs.query({}, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			chrome.tabs.sendMessage(tabs[i].id, data);
			console.log("sent msg to tab: " + data.type);
		}
	});
}

function sendSettings () {
	sendToTabs({type: "setting", val: settings});
}

function saveSettings (cb) {
	chrome.storage.sync.set({ees: settings}, cb);
}

function setting (key, val, cb) {
	settings[key] = val;
	saveSettings(cb);
	sendSettings();
}

function init () {
	if (Date.now() - settings.lastEmjack > 86400000) {
		$.get("https://greasyfork.org/en/scripts/4503-emjack/code", function (data) {
			var div = $("<div></div>");
			div.html(data);
			data = div.find("pre").text();
			chrome.storage.local.set({"emjack": data}, function () {
				settings.lastEmjack = Date.now();
				saveSettings();
				console.log("Saved emjack");
			});
		});
	}
	else {
		console.log("No need to update emjack");
	}
}

chrome.storage.sync.get("ees", function (data) {
	var template = {
		"console": true,
		"compmatch": true,
		"emnote": true,
		"autorefresh": false,
		"actionsearch": true,
		"emjack": true,
		"forumtracker": true,
		"autoplay": true,
		"hideBackground": false,
		"betterUserpages": true,
		"helper": false,
		"lastEmjack": 0,
		"lastPm": 0,
		"topics": {}
	};
	
	if (data.ees) {
		delete data.ees.undefined; 
	}
	
	if (!data.ees) {
		settings = template;
		saveSettings();
	}
	else if (Object.keys(data.ees).length < Object.keys(template).length) {
		console.log("missing keys");
		settings = data.ees;
		for (var key in template) {
			if (!(key in settings)) {
				console.log("missing key is " + key);
				settings[key] = template[key];
			}
		}
		saveSettings();
	}
	else {
		settings = data.ees;
	}
	
	init();
	sendSettings();
	console.log(settings);
});

chrome.runtime.onMessage.addListener(function (res, sender, sRes) {
	switch (res.type) {
		case "init":
			chrome.pageAction.show(sender.tab.id);
			chrome.tabs.sendMessage(sender.tab.id, {type: "setting", val: settings});
			break;
		case "set":
			setting(res.key, !settings[res.key]);
			break;
		case "clear":
			chrome.storage.sync.clear();
			console.log("Chrome storage cleared");
			break;
		case "forum":
			switch (res.action) {
				case "create":
					settings.topics[res.tid] = res.pid;
					saveSettings();
					sendSettings();
					break;
				case "delete":
					delete settings.topics[res.tid];
					saveSettings();
					sendSettings();
					break;
			}
			break;
		case "close":
			chrome.tabs.remove(sender.tab.id);
			break;
		case "popup":
			sRes({type: "setting", val: settings});
			break;
	}
	return true;
});

var tenSecInt = setInterval(function () {
	//PM Check
	$.get("https://epicmafia.com/message/fetch/unread", function (data) {
		var pms = data[1].data;
		var newStart;
		
		for (var i in pms) {
			if (pms[i].id > settings.lastPm && !pms[i].opened) {
				console.log("New pm!");
				(function (pmId) {
					chrome.notifications.create(pmId, {type: "basic", iconUrl: "icons/notif.png", title: "New PM from " + pms[i].sender_username, message: pms[i].subject || (pms[i].msg.substring(0, 60) + "...")}, function (id) {
						notifs[id] = {
							type: "newpm",
							pmId: pmId
						};
					});
				})(String(pms[i].id));
				if (!newStart) {
					newStart = pms[i].id;
				}
			}
		}
		console.log("Newstart: " + newStart);
		if (newStart) {
			settings.lastPm = newStart;
			saveSettings();
		}
		
		//Forum Check
		var tids = Object.keys(settings.topics);
		if (tids.length > 0) {
			forumCheck(tids, 0);
		}
	});
}, 10000);

var forumCheck = function (ids, i) {
	var tid = ids[i];
	var title = "";
	var msg = "";
	console.log("Scanning " + tid);
	$.get("https://epicmafia.com/topic/" + tid, function(page){
		var lastPost;
		var div = $("<div></div>");
		div.html(page);
		if (div.find("#posts_inner")[0]) {
			if (div.find("#posts_inner .post")[0]) {
				lastPost = parseInt(div.find("#posts_inner .post").last().attr("id").split("_")[1]);
			}
			else {
				lastPost = 0;
			}
			
			if (lastPost > settings.topics[tid]) {
				//new posts
				div.find(".numposts").remove();
				div.find("#posts_inner .post .bubble_msg").last().find("fieldset").remove();
				title = div.find(".topic-title").text();
				author = div.find("#posts_inner .post [data-type='userinfo']").last().text();
				msg = div.find("#posts_inner .post .bubble_msg").last().text();
				chrome.notifications.create(tid, {type: "basic", iconUrl: "icons/notif.png", title: "New post in '" + title + "'", message: author + ": " + msg.substring(0, 60) + "..."}, function (id) {
					notifs[id] = {
						type: "forum",
						tid: tid,
						pid: lastPost
					};
				});
				settings.topics[tid] = lastPost;
				saveSettings();
			}
		}
		else {
			//topic doesn't exist
			delete settings.topics[tid];
			saveSettings();
		}
		
		if (i < ids.length - 1) {
			forumCheck(ids, i + 1);
		}
	});
};

chrome.notifications.onClicked.addListener(function (id) {
	switch (notifs[id].type) {
		case "newpm":
			chrome.tabs.create({url: "https://epicmafia.com/message#/message/" + notifs[id].pmId});
			chrome.notifications.clear(id);
			delete notifs[id];
			break;
		case "forum":
			chrome.tabs.create({url: "https://epicmafia.com/post/" + notifs[id].pid + "/goto_page"});
			chrome.notifications.clear(id);
			delete notifs[id];
			break;
	}
});

chrome.notifications.onClosed.addListener(function (id) {
	delete notifs[id];
});


// ================= Fixing Lucid's Broken Crap ===================
// He has a bug in his code in which switching lobbies using the url 
// causes the lobby script to break. If you ever notice the lobby
// you're in has the wrong background, that's why. This redirect to
// a local version of the lobby script fixes that. I also reopen
// access to angular debugging so scripts can better interact with
// the page.

chrome.webRequest.onBeforeRequest.addListener(function (data) {
	if (data.url.indexOf("lobby_index") != -1) {
		return {redirectUrl: chrome.runtime.getURL("/libs/lobby.js")};
	}
	else if (data.url.indexOf("message") != -1) {
		return {redirectUrl: chrome.runtime.getURL("/libs/message.js")};
	}
	else {
		return {redirectUrl: data.url}
	}
}, {
	urls: [
		"*://epicmafia.com/javascripts/m/lobby_index.js*",
		"*://epicmafia.com/javascripts/app/message.js*"
	]
}, ["blocking"]);