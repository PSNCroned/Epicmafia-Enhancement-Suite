console.log("Speech Recognition");

var button = "<img src='" + chrome.runtime.getURL("icons/helper/mic_grey.png") + "' id='speechRecog' width='18' style='cursor: pointer; position: relative; top: 3px;' />";

$("#speak_button").before(button);


var startDictation = function () {
	document.activeElement.blur();
	$("#speechRecog").attr("src", chrome.runtime.getURL("icons/helper/mic.png"));
	
	var recog = new webkitSpeechRecognition();
	recog.continuous = false;
	recog.interimResults = true;
	recog.lang = "en-US";
	recog.start();

	recog.onresult = function (e) {
		$("#typebox").val(e.results[0][0].transcript);
	};

	recog.onend = function () {
		$("#speechRecog").attr("src", chrome.runtime.getURL("icons/helper/mic_grey.png"));
		$("#typebox")[0].focus();
	};

	recog.onerror = function () {
		recog.stop();
	};
};

$("#speechRecog").click(function () {
	startDictation();
});

$(document).on("keydown", function (e) {
	if (e.key == "s" && e.altKey) {
		startDictation();
	}
});