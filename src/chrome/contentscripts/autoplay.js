scripts.autoplay.run = function () {
	console.log("Anti-autoplay");
	if ($('#embed iframe').length > 0) {
		$('#embed iframe')[0].src = $('#embed iframe')[0].src.replace('autoplay=1', 'autoplay=0');
	}
};