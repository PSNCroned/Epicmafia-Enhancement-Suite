//The actual custom Clippy code
console.log("Clippy!");
var elm;
clippy.load("Clippy", function (agent) {
	elm = document.getElementsByClassName("clippy")[0];
	agent.moveTo(100, 100);
});