scripts.actionsearch.run = function () {
	console.log("ActionSearch");
	var script = document.createElement("script");
	script.innerHTML = "var findId=function(a,b){var c;$.get(\"https:\/\/epicmafia.com\/user\/search?q=\"+a,function(a){a=a.data,a.length>0?(c=a[0].id,b(c)):alert(\"User not found!\")})},getModAct=function(a,b,c){var f,d=1,e=[],g=function(h){h=JSON.parse(h).data;for(f in h)h[f].user_id==a&&e.push(h[f]);d++,d<=b?getActionPage(d,g):c(e)},h=function(a){a=JSON.parse(a).data;for(f in a)e.push(a[f]);d++,d<=b?getActionPage(d,h):c(e)};a?getActionPage(d,g):getActionPage(d,h)},getByTarget=function(a,b,c,d){b=b.toLowerCase();var e=[];for(var f in c)c[f].name.toLowerCase().indexOf(a)==-1&&c[f].name.toLowerCase().indexOf(b)==-1||e.push(c[f]);d(e)},getActionPage=function(a,b){$.get(\"https:\/\/epicmafia.com\/action\/page?page=\"+a,function(a){b(a)})},setPage=function(a){$(\"#actionpages\").html(get_template(\"actions\")({data:a}))};$(\"#mod_actions h3\").html($(\"#mod_actions h3\").html()+\'<a id=\"searchModAct\" style=\"float: right; color: white; text-decoration: none; font-weight: normal;\">Advanced search \u00BB<\/a>\'),$(\"#mod_actions h3\").after(\'<div id=\"search\" style=\"display: none;\"><form id=\"searchForm\" class=\"forum_default\"><div id=\"searchInput\" style=\"text-align: center; padding: 5px;\"><input type=\"text\" id=\"pA\" placeholder=\"Player A\" style=\"width: 80px;\" autocomplete=\"off\" \/> did action on <input type=\"text\" id=\"pB\" placeholder=\"Player B\" style=\"width: 80px;\" autocomplete=\"off\" \/> in the last <input type=\"text\" id=\"amt\" placeholder=\"amount\" value=\"10\" style=\"width: 80px; margin-top: 3px;\" autocomplete=\"off\" \/> pages.<\/div><input type=\"submit\" value=\"Refine Search\" class=\"redbutton\" style=\"display: block; font-size: 0.9em; margin: 5px auto 5px auto;\" \/><a id=\"clearActions\" style=\"display: block; margin: auto; text-align: center; font-size: 13px;\">Clear<\/a><\/form><\/div>\'),$(\"#searchModAct\").click(function(){$(\"#search\").toggle()}),$(\"#searchForm\").submit(function(a){a.preventDefault(),$(\"#actionpages\").html(\'<img src=\"http:\/\/www.arabianbusiness.com\/skins\/ab.main\/gfx\/loading_spinner.gif\" id=\"loadingList\" width=\"50\" height=\"50\" style=\"display: block; margin: auto;\">\');var b=$(\"#pA\").val(),c=$(\"#pB\").val(),d=$(\"#amt\").val();b&&d?findId(b,function(a){getModAct(a,d,function(a){c?findId(c,function(b){getByTarget(b,c,a,function(a){setPage(a)})}):setPage(a)})}):d?getModAct(null,d,function(a){c?findId(c,function(b){getByTarget(b,c,a,function(a){setPage(a)})}):setPage(a)}):alert(\"You must enter a page amount!\")}),$(\"#clearActions\").click(function(){loadpage_actions(1)});";
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
    $("#mod_actions h3").after('<div id="search" style="display: none;"><form id="searchForm" class="forum_default"><div id="searchInput" style="text-align: center; padding: 5px;"><input type="text" id="pA" placeholder="Player A" style="width: 80px;" autocomplete="off" /> did action on <input type="text" id="pB" placeholder="Player B" style="width: 80px;" autocomplete="off" /> in the last <input type="text" id="amt" placeholder="amount" value="10" style="width: 80px; margin-top: 3px;" autocomplete="off" /> pages.</div><input type="submit" value="Refine Search" class="redbutton" style="display: block; font-size: 0.9em; margin: 5px auto 5px auto;" /><a id="clearActions" style="display: block; margin: auto; text-align: center; font-size: 13px;">Clear</a></form></div>');

    $("#searchModAct").click(function () {
        $("#search").toggle();
    });

    $("#searchForm").submit(function (e) {
        e.preventDefault();
        $("#actionpages").html('<img src="http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif" id="loadingList" width="50" height="50" style="display: block; margin: auto;">');

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
        }
    });

    $("#clearActions").click(function () {
        loadpage_actions(1);
    });
	*/
};