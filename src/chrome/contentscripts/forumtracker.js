scripts.forumtracker.run = function () {
	console.log("ForumTracker");
	var tid = parseInt(window.location.pathname.split("/")[2]);
	
	$("#threadmaker").append("<div id='trackBox' class='mini_vote' style='cursor: pointer;'><input type='checkBox' style='cursor: pointer;' /> <div id='trackLabel' style='cursor: pointer; display: inline;'>Track</div></div>");

	if (settings.topics[tid]) {
		$("#trackBox input").prop('checked', true);
	}

	$("#trackBox input[type='checkbox']").click(function () {
		if ($(this).prop("checked")) {
			chrome.runtime.sendMessage({type: "forum", action: "create", tid: tid, pid: parseInt($("#posts_inner .post").last().attr("id").split("_")[1])});
		}
		else {
			chrome.runtime.sendMessage({type: "forum", action: "delete", tid: tid});
		}
		//return false;
	});
	
	$("#trackLabel").click(function () {
		var box = $(this).parent().find("input");
		if (!box.prop('checked')) {
			box.prop("checked", true);
			chrome.runtime.sendMessage({type: "forum", action: "create", tid: tid, pid: parseInt($("#posts_inner .post").last().attr("id").split("_")[1])});
		}
		else {
			box.prop("checked", false);
			chrome.runtime.sendMessage({type: "forum", action: "delete", tid: tid});
		}
	});
};