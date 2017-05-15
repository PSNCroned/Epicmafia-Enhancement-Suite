var settings = {};

chrome.runtime.sendMessage({type: "popup"}, function (res) {
	settings = res.val;
	
	var elm;
	for (var s in settings) {
		elm = $("#" + s);
		if (elm.length > 0 && settings[s]) {
			elm.find("input").prop("checked", true);
		}
	};
	if (Object.keys(settings.topics).length > 0) {
		for (var t in settings.topics) {
			$("#ftrack").append("<div class='option'><a href='#'>" + t + "</a> <span class='close'></span></div>");
		}
		
		$(".option a").click(function () {
			chrome.tabs.create({url: "https://epicmafia.com/topic/" + $(this).text()});
		});
		
		$(".close").click(function () {
			chrome.runtime.sendMessage({type: "forum", action: "delete", tid: t});
			$(this).parent().remove();
			if ($("#ftrack").children().length == 0) {
				$("#ftrack").append("<div class='option'>None</div>");
			}
		});
	}
	else {
		$("#ftrack").append("<div class='option'>None</div>");
	}
});

$("input[type='checkbox']").click(function () {
	if ($(this).parent().attr("id") != "pmnotifs") {
		chrome.runtime.sendMessage({type: "set", key: $(this).parent().attr("id")});
	}
	else {
		chrome.runtime.sendMessage({type: "pmnotifs"});
	}
});

$(".optionLabel").click(function (e) {
	var box = $(this).parent().find("input");
	if (box.length > 0) {
		if (box.prop("checked")) {
			box.prop("checked", false);
		}
		else {
			box.prop("checked", true);
		}
		
		if ($(this).parent().attr("id") != "pmnotifs") {
			chrome.runtime.sendMessage({type: "set", key: $(this).parent().attr("id")});
		}
		else {
			chrome.runtime.sendMessage({type: "pmnotifs"});
		}
	}
});

$(".tab").click(function () {
	$(".container").hide();
	$("#" + $(this).attr("data-tab")).show();
	$(".tab").removeClass("sel");
	$(this).addClass("sel");
});

$("#help").click(function () {
	chrome.tabs.create({url: "html/help.html"});
});