scripts.betterUserpages.run = function () {
	console.log("Better Userpages");
	
    var id = $("[data-title='Player profile']").attr("href").split("/")[2];
    
    //Questions
    $.get("https://epicmafia.com/question?user_id=" + id, function (data) {
        var unans = data[1].num_unanswered;
        var total = data[1].data.length;
        $("#questions").find("h3").html($("#questions").find("h3").text() + "</br></br>" + unans + " hidden, " + total + " visible");
    });
    
    //Cycling by user id
    var change = 1;
    var curId = parseInt(id);
    var timesRan = 0;
    var running = false;
    var search = function () {
        if (timesRan < 10) {
            $.ajax({
                url: "https://epicmafia.com/vote/find/user/" + curId,
                dataType: "html",
                type: "post",
                success: function () {
                    window.location = "https://epicmafia.com/user/" + curId;
                },
                error: function () {
                    curId += change;
                    timesRan ++;
                    search();
                }
            });
        }
        else {
            running = false;
            alert("This is the newest user!");
        }
    };
    $("#usertitle").html('<a href="#" class="cycle left"><</a> ' + $("#usertitle").text() + ' <a href="#" class="cycle right">></a> ');
    $(".cycle").click(function () {
        if (!running) {
            running = true;
            curId = parseInt(id);
            change = 1;
            if ($(this).hasClass("left")) {
                change *= -1;
            }
            timesRan = 0;
            curId += change;
            search();
        }
    });
	
	/**
	 * Created by Jordan on 3/29/2017.
	 */

	var profileLink = document.getElementsByClassName("lcontrols sel")[0].children[0].href;
	var profileNumber = profileLink.replace("https://epicmafia.com/user/","");

	var deathSoundLink = "https://epicmafia.com/uploads/deathsounds/" + profileNumber + ".ogg";

	var userbox = document.getElementById("finduserbox");

	var constructSpan=document.createElement("span");
	constructSpan.className="lcontrols";

	var constructAnchor=document.createElement("a");
	constructAnchor.href=deathSoundLink;

	var constructI=document.createElement("i");
	constructI.className="icon-music";
	constructI.innterHTML="::before";

	constructAnchor.appendChild(constructI);
	constructSpan.appendChild(constructAnchor);
	userbox.appendChild(constructSpan);
};