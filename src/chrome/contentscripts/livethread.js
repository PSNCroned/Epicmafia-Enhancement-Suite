var scanner, latest;
var live = false;
var unseen = 0;
var autoScroll = false;
var onTab = true;

$(".views").append("<button id='goLive' style='font-family: Arial; font-size: 18px; background-color: #f44242; color: white; border: 0px; padding: 5px; border-radius: 2px; cursor: pointer;'>Live</button>");


$("#goLive").click(function () {
	if (live) {
		stopLive($(this));
	}
	else {
		startLive($(this));
	}
});

var startLive = function (button) {
	button.text("Stop");
	button.css("background-color", "#af2b2b");
	$("#create_post").hide();
	$(".pagenav").remove();
	live = true;

	if ($(".post").length) {
		latest = parseInt($(".post").last().attr("id").split("_")[1]);
	}
	else {
		latest = 0;
	}

	scanner = setInterval(function () {
		$.get(window.location.pathname + "?_pjax=#posts", function (res) {
			var page = $("<div></div>");
			var id;

			page.html(res);
			page.find(".post").each(function () {
				id = $(this).attr("id").split("_")[1];
				if (id > latest) {
					latest = id;
					$(this).find(".created_at").remove();
					$(this).find(".user_thumb").prepend('<div class="redcirc" style=" width: 10px; height: 10px; background-color: red;  border-radius: 100px; position: relative; left: -5px; top: -5px; z-index: 1;"></div>');
					unseen++;
					$(this).find(".user_thumb img").css({
						position: "relative",
						top: "-10px"
					});
					$("#posts_inner").append($(this));
					checkCirlces();
					updateTitle();
				}
			});
			if (autoScroll) {
				window.scrollTo(0, document.body.scrollHeight);
			}
		});
	}, 2000);
};

var stopLive = function (button) {
	clearInterval(scanner);
	button.text("Live");
	$("#create_post").show();
	button.css("background-color", "#f44242");
	live = false;
	$.get(window.location.pathname + "?_pjax=#posts", function (res) {
		$("#posts").html(res);
	});
};

var updateTitle = function () {
	if (unseen) {
		document.title = "Epicmafia - Forum (" + unseen + ")";
	}
	else {
		document.title = "Epicmafia - Forum";
	}
};

var isElementInViewport = function (el) {
    var rect = el.getBoundingClientRect();

    return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

var checkCirlces = function () {
	setTimeout(function () {
		$(".redcirc").each(function () {
			if (isElementInViewport($(this)[0]) && onTab) {
				$(this).fadeOut(function () {
					$(this).parent().find("img").css("top", "0px");
					$(this).remove();
					unseen--;
					updateTitle();
				});
			}
		});
	}, 1000);
};

$(window).on('DOMContentLoaded load resize scroll click', function () {
	checkCirlces();
});

$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		autoScroll = true;
	}
	else {
		autoScroll = false;
	}
});

$(window).focus(function() {
    onTab = true;
});

$(window).blur(function() {
    onTab = false;
});