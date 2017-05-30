var settings = {};
var loaded = false;
var scripts = {
	console: {
		running: false,
		run: null,
		beforeLoad: false
	},
	compmatch: {
		running: false,
		run: null,
		beforeLoad: false
	},
	emnote: {
		running: false,
		run: null,
		beforeLoad: false
	},
	autorefresh: {
		running: false,
		run: null,
		beforeLoad: false
	},
	actionsearch: {
		running: false,
		run: null,
		beforeLoad: false
	},
	emjack: {
		running: false,
		run: null,
		beforeLoad: false
	},
	forumtracker: {
		running: false,
		run: null,
		beforeLoad: false
	},
	autoplay: {
		running: false,
		run: null,
		beforeLoad: false
	},
	hideBackground: {
		running: false,
		run: null,
		beforeLoad: true
	},
	betterUserpages: {
		running: false,
		run: null,
		beforeLoad: false
	},
	helper: {
		running: true,
		run: null,
		beforeLoad: false
	},
	scumhelp: {
		running: true,
		run: null,
		beforeLoad: false
	}
};


chrome.runtime.sendMessage({type: "init"});

//This is run by pageLoad.js when document_end is reached
var pageLoad = function () {
	loaded = true;
	runScripts();
};

console.log("=== Epicmafia Enhancement Suite ===");
console.log("The following scripts are running on this page:");


var runScripts = function () {
	for (var s in scripts) {
		if (!scripts[s].running && settings[s] && scripts[s].run != null) {
			if ((!loaded && scripts[s].beforeLoad) || loaded) {
				scripts[s].running = true;
				scripts[s].run();
			}
		}
	}
};

chrome.runtime.onMessage.addListener(function (res, sender, sRes) {
	switch (res.type) {
		case "setting":
			settings = res.val;
			runScripts();
			break;
		case "emjack":
			eval(res.data);
	}
});

var GM_setValue = function (key, data) {
	window.localStorage[key] = data;
};

var GM_getValue = function (key) {
	return window.localStorage[key];
};