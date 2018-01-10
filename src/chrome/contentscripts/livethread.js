var scanner, latest;
var live = false;
var unseen = 0;
var autoScroll = false;
var onTab = true;

var goLiveButton = "<button class='goLive' style='font-family: Arial; font-size: 18px; background-color: #f44242; color: white; border: 0px; padding: 5px; border-radius: 2px; cursor: pointer;'>Live</button>";

$(".views").append(goLiveButton);
$("#create_post").after(goLiveButton);

$(".goLive").last().css({
	"margin-left": "35px",
	"margin-top": "10px"
});

$(".goLive").click(function () {
	if (live) {
		stopLive();
	}
	else {
		startLive();
	}
});

var startLive = function () {
	$(".goLive").text("Stop");
	$(".goLive").css("background-color", "#af2b2b");
	$("#create_post").hide();
	$(".pagenav").remove();
	live = true;

	if ($(".post").length) {
		latest = parseInt($(".post").last().attr("id").split("_")[1]);
	}
	else {
		latest = 0;
	}
	
	var form = $("<form id='liveSubmit' class='form'></form>");
	var textarea = $("<textarea style='width: 350px; height: 200px;' placeholder='Type your reply here!'></textarea>");
	var submit = $("<input type='submit' class='red' value='Post!' style='margin-left: 35px;'>");
	
	form.append(textarea).append(submit);
	$("#create_post .lt-create-post").find("img").clone().prependTo(form).css({
		"float": "left",
		"border": "1px solid #ccc",
		"margin-right": "3px"
	});
	$(".goLive").last().before(form);
	
	form.submit(function (e) {
		e.preventDefault();
		
		var ajaxPost = "$.post('/post', {\
							topic_id: window.location.pathname.split('/')[2],\
							msg: $('#liveSubmit textarea').val()\
						});\
						$('#liveSubmit textarea').val('');";
		
		window.postMessage({type: 'run', text: ajaxPost}, "https://epicmafia.com");
	});
	
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

var stopLive = function () {
	clearInterval(scanner);
	
	$(".goLive").text("Live");
	$("#create_post").show();
	$(".goLive").css("background-color", "#f44242");
	
	live = false;
	$.get(window.location.pathname + "?_pjax=#posts", function (res) {
		$("#posts").html(res);
	});
	
	$("#liveSubmit").remove();
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