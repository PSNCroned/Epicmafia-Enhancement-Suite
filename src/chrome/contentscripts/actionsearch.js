scripts.actionsearch.run = function () {
	console.log("ActionSearch");
	var script = document.createElement("script");
	script.innerHTML = "var findId=function(t,e){var a;$.get(\"https:\/\/epicmafia.com\/user\/search?q=\"+t,function(t){(t=t.data).length>0?(a=t[0].id,e(a)):(alert(\"User not found!\"),loadpage_actions(1))})},getModAct=function(t,e,a){var n,o=1,i=[],c=function(s){s=JSON.parse(s).data;for(n in s)s[n].user_id==t&&i.push(s[n]);++o<=e?getActionPage(o,c):a(i)},s=function(t){t=JSON.parse(t).data;for(n in t)i.push(t[n]);++o<=e?getActionPage(o,s):a(i)};t?getActionPage(o,c):getActionPage(o,s)},getByTarget=function(t,e,a,n){e=e.toLowerCase();var o=[];for(var i in a)-1==a[i].name.toLowerCase().indexOf(t)&&-1==a[i].name.toLowerCase().indexOf(e)||o.push(a[i]);n(o)},getActionPage=function(t,e){$.get(\"https:\/\/epicmafia.com\/action\/page?page=\"+t,function(t){e(t)})},setPage=function(t){$(\"#actionpages\").html(window.get_template(\"actions\")({data:t}))};$(\"#mod_actions h3\").html($(\"#mod_actions h3\").html()+\'<a id=\"searchModAct\" style=\"float: right; color: white; text-decoration: none; font-weight: normal;\">Advanced search \u00BB<\/a>\'),$(\"#mod_actions h3\").after(\'<div id=\"search\" style=\"display: none;\">\\t\\t\\t<form id=\"searchForm\" class=\"forum_default\">\\t\\t\\t\\t<div id=\"searchInput\" style=\"text-align: center; padding: 5px;\">\\t\\t\\t\\t\\t<input type=\"text\" id=\"pA\" placeholder=\"Any Mod\" style=\"width: 80px;\" autocomplete=\"off\" \/> did actions on <input type=\"text\" id=\"pB\" placeholder=\"Any User\" style=\"width: 80px;\" autocomplete=\"off\" \/> in the last <input type=\"text\" id=\"amt\" placeholder=\"amount\" value=\"10\" style=\"width: 80px; margin-top: 3px;\" autocomplete=\"off\" \/> pages.\\t\\t\\t\\t<\/div>\\t\\t\\t\\t<input type=\"submit\" value=\"Search\" class=\"redbutton\" style=\"display: block; font-size: 0.9em; margin: 5px auto 5px auto;\" \/>\\t\\t\\t\\t<a id=\"clearActions\" style=\"display: block; margin: auto; text-align: center; font-size: 13px; margin-bottom: 10px;\">Clear<\/a>\\t\\t\\t<\/form>\\t\\t<\/div>\'),$(\"#searchModAct\").click(function(){$(\"#search\").toggle()}),$(\"#searchForm\").submit(function(t){t.preventDefault(),$(\"#actionpages\").html(\'<img src=\"http:\/\/i.imgur.com\/1keL4Ac.gif\" id=\"loadingList\" width=\"25\" height=\"25\" style=\"display: block; margin: auto;\">\');var e=$(\"#pA\").val(),a=$(\"#pB\").val(),n=$(\"#amt\").val();e&&n?findId(e,function(t){getModAct(t,n,function(t){a?findId(a,function(e){getByTarget(e,a,t,function(t){setPage(t)})}):setPage(t)})}):n?getModAct(null,n,function(t){a?findId(a,function(e){getByTarget(e,a,t,function(t){setPage(t)})}):setPage(t)}):(alert(\"You must enter a page amount!\"),loadpage_actions(1))}),$(\"#clearActions\").click(function(){loadpage_actions(1)});";
	document.body.appendChild(script);
	//Needs to run in context of the page, but here is the uncompressed script
	/*
	var findId = function (name, cb) {
        var id;
        $.get("https://epicmafia.com/user/search?q=" + name, function (data) {
            data = data.data;
            if (data.length > 0) {
                id = data[0].id;
                cb(id);
            }
            else {
                alert("User not found!");
				loadpage_actions(1);
            }
        });
    };

    var getModAct = function (mod, amt, cb) {
        var page = 1;
        var list = [];
        var x;
        var cb1 = function (data) {
            data = JSON.parse(data).data;
            for (x in data) {
                if (data[x]["user_id"] == mod) {
                    list.push(data[x]);
                }
            }
            page ++;
            if (page <= amt) {
                getActionPage(page, cb1);
            }
            else {
                cb(list);
            }
        }
        var cb2 = function (data) {
            data = JSON.parse(data).data;
            for (x in data) {
                list.push(data[x]);
            }
            page ++;
            if (page <= amt) {
                getActionPage(page, cb2);
            }
            else {
                cb(list);
            }
        };

        if (mod) {
            getActionPage(page, cb1);
        }
        else {
            getActionPage(page, cb2);
        }
    };

    var getByTarget = function (id, name, list, cb) {
        name = name.toLowerCase();
        var newList = [];
        for (var x in list) {
            if (list[x].name.toLowerCase().indexOf(id) != -1 || list[x].name.toLowerCase().indexOf(name) != -1) {
                newList.push(list[x]);
            }
        }
        cb(newList);
    }

    var getActionPage = function (page, cb) {
        $.get("https://epicmafia.com/action/page?page=" + page, function (data) {
            cb(data);
        });
    };

    var setPage = function (list) {
        $("#actionpages").html(window.get_template("actions")({data: list}));
    }

    $("#mod_actions h3").html($("#mod_actions h3").html() + '<a id="searchModAct" style="float: right; color: white; text-decoration: none; font-weight: normal;">Advanced search »</a>');
	
    $("#mod_actions h3").after(
		'<div id="search" style="display: none;">\
			<form id="searchForm" class="forum_default">\
				<div id="searchInput" style="text-align: center; padding: 5px;">\
					<input type="text" id="pA" placeholder="Any Mod" style="width: 80px;" autocomplete="off" /> did actions on <input type="text" id="pB" placeholder="Any User" style="width: 80px;" autocomplete="off" /> in the last <input type="text" id="amt" placeholder="amount" value="10" style="width: 80px; margin-top: 3px;" autocomplete="off" /> pages.\
				</div>\
				<input type="submit" value="Search" class="redbutton" style="display: block; font-size: 0.9em; margin: 5px auto 5px auto;" />\
				<a id="clearActions" style="display: block; margin: auto; text-align: center; font-size: 13px; margin-bottom: 10px;">Clear</a>\
			</form>\
		</div>'
	);

    $("#searchModAct").click(function () {
        $("#search").toggle();
    });

    $("#searchForm").submit(function (e) {
        e.preventDefault();
        $("#actionpages").html('<img src="http://i.imgur.com/1keL4Ac.gif" id="loadingList" width="25" height="25" style="display: block; margin: auto;">');

        var pA = $("#pA").val();
        var pB = $("#pB").val();
        var amt = $("#amt").val();

        if (pA && amt) {
            findId(pA, function (id) {
                getModAct(id, amt, function (list) {
                    if (pB) {
                        findId(pB, function (id) {
                            getByTarget(id, pB, list, function (list) {
                                setPage(list);
                            });
                        });
                    }
                    else {
                        setPage(list);
                    }
                });
            });
        }
        else if (amt) {
            getModAct(null, amt, function (list) {
                if (pB) {
                    findId(pB, function (id) {
                        getByTarget(id, pB, list, function (list) {
                            setPage(list);
                        });
                    });
                }
                else {
                    setPage(list);
                }
            });
        }
        else {
            alert("You must enter a page amount!");
			loadpage_actions(1);
        }
    });

    $("#clearActions").click(function () {
        loadpage_actions(1);
    });
	*/
	//https://jscompress.com/
	//https://www.freeformatter.com/javascript-escape.html
};