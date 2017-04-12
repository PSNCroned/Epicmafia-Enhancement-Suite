$("div.roleimg").each(function () {
	if (!$(this).hasClass("tt")) {
        var role = $(this).attr("class").trim().split(" ")[1].split("-")[1];
		if (role != "unkown") {
			$(this).addClass("tt");
			$(this).attr("data-type", "roleinfo");
			$(this).attr("data-roleid", role);
			$(this).attr("data-delay", "0");
		}
	}
	else {
		$(this).data("delay", "0");
	}
});