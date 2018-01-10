var acceptedImageTypes, app, indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
            return i
    }
    return -1
}
;
app = angular.module("choosefile", []);
acceptedImageTypes = ["image/png", "image/jpeg", "image/gif"];
app.directive("fileread", function() {
    return {
        link: function(scope, element, attributes) {
            return element.bind("change", function(changeEvent) {
                var reader;
                reader = new FileReader;
                reader.onload = function(loadEvent) {
                    return scope.$apply(function() {
                        return scope.$parent.file_preview = loadEvent.target.result
                    })
                }
                ;
                return scope.$apply(function() {
                    console.log(changeEvent.target.files[0]);
                    scope.$parent.new_file = changeEvent.target.files[0];
                    return reader.readAsDataURL(scope.$parent.new_file)
                })
            })
        }
    }
});
app.directive("choosefile", function() {
    return {
        restrict: "A",
        scope: {
            callback: "&",
            upload: "@"
        },
        link: function(scope, el, attr) {
            return el.bind("change", function(event) {
                var file, files, formData, k, reader, ref, ref1, v, xhr;
                files = this.files;
                file = files[0];
                if (ref = file.type,
                indexOf.call(acceptedImageTypes, ref) < 0) {
                    return
                }
                formData = new FormData;
                formData.append("file", "", document.body.getAttribute("data-filename"));
                ref1 = scope.file_data || {};
                for (k in ref1) {
                    v = ref1[k];
                    formData.append(k, v)
                }
                reader = new FileReader;
                if (attr.preview) {
                    reader.onload = function(event) {
                        var image;
                        image = new Image;
                        image.src = event.target.result;
                        image.width = 50;
                        return el.siblings(".image_preview").append(image)
                    }
                }
                reader.readAsDataURL(file);
                xhr = new XMLHttpRequest;
                xhr.open("POST", scope.upload);
                xhr.onload = function() {
                    var data, ref2, status;
                    if (xhr.status === 200) {
                        ref2 = $.parseJSON(xhr.response),
                        status = ref2[0],
                        data = ref2[1];
                        if (status) {
                            return scope.callback({
                                data: data
                            })
                        } else {
                            return window.errordisplay(".error", data)
                        }
                    }
                }
                ;
                return xhr.send(formData)
            })
        }
    }
});
var app, clone;
clone = function(obj) {
    var i, key;
    if (obj == null || typeof obj !== "object") {
        return obj
    }
    i = new obj.constructor;
    for (key in obj) {
        i[key] = clone(obj[key])
    }
    return i
}
;
app = angular.module("myApp", ["choosefile"]);
app.config(["$compileProvider", function(_this) {
    return function($compileProvider) {
        return $compileProvider.debugInfoEnabled(false)
    }
}(this)]);
app.directive("ngBindHtmlUnsafe", [function() {
    return function(scope, element, attr) {
        element.addClass("ng-binding").data("$binding", attr.ngBindHtmlUnsafe);
        return scope.$watch(attr.ngBindHtmlUnsafe, function(value) {
            return element.html(value || "")
        })
    }
}
]);
app.controller("RoleCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.loading = true;
    $scope.is_mine = window.is_mine;
    $scope.edit = false;
    $http.get("/role/" + window.role_id + "/descr").success(function(o) {
        var arr, m, msg, status;
        status = o[0],
        msg = o[1];
        if (status) {
            arr = msg && msg.length > 0 ? function() {
                var j, len, ref, results;
                ref = msg.split("\n");
                results = [];
                for (j = 0,
                len = ref.length; j < len; j++) {
                    m = ref[j];
                    results.push({
                        text: m
                    })
                }
                return results
            }() : [];
            $scope.role_descr = clone(arr);
            $scope.role_descr_edit = clone(arr);
            return $scope.loading = false
        }
    });
    $scope.save_role_descr = function() {
        var descr;
        descr = function() {
            var j, len, ref, results;
            ref = $scope.role_descr_edit;
            results = [];
            for (j = 0,
            len = ref.length; j < len; j++) {
                descr = ref[j];
                results.push(descr.text)
            }
            return results
        }().join("\n");
        return $http({
            url: "/role/" + window.role_id + "/edit/descr",
            method: "get",
            params: {
                descr: descr
            }
        }).success(function(o) {
            $scope.edit = false;
            return $scope.role_descr = clone($scope.role_descr_edit)
        })
    }
    ;
    $scope.remove_descr = function(index) {
        return $scope.role_descr_edit.splice(index, 1)
    }
    ;
    $scope.edit_role_descr = function() {
        return $scope.edit = true
    }
    ;
    return $scope.keypress = function($event) {
        var keycode;
        keycode = $event.keyCode;
        if (keycode === 13) {
            $event.preventDefault();
            if ($scope.new_descr.length > 0) {
                $scope.role_descr_edit.push({
                    text: $scope.new_descr
                });
                return $scope.new_descr = ""
            }
        }
    }
}
]);
app.controller("RoleCreateCtrl", ["$scope", "$window", "$http", function($scope, $window, $http) {
    var dm;
    $scope.logic_accepted = window.logic_accepted;
    $scope.role_id = window.role_id;
    $scope.has_avatar = window.has_avatar;
    $scope.roleid = window.roleid;
    $scope.activated = window.activated;
    $scope.permanent = window.permanent;
    $scope.admin = window.admin;
    $scope.deathmessages = function() {
        var j, len, ref, results;
        ref = window.deathmessages;
        results = [];
        for (j = 0,
        len = ref.length; j < len; j++) {
            dm = ref[j];
            results.push({
                msg: dm
            })
        }
        return results
    }();
    $scope.max_reactions = 3;
    $scope.max_meetings = 3;
    $http.get("/role/create/choices").success(function(o) {
        $scope.alignments = o.alignments;
        $scope.alignments_with_third = o.alignments_with_third;
        $scope.roles = o.roles;
        $scope.roles_with_self = angular.copy(o.roles);
        $scope.roles_with_self.unshift({
            text: "! this role",
            value: "@self"
        });
        $scope.roles_with_noone = angular.copy(o.roles);
        $scope.roles_with_noone.unshift({
            text: "! default",
            value: null
        });
        $scope.items = o.items;
        $scope.meetingtargets = o.meetingtargets;
        $scope.meetingtypes = o.meetingtypes;
        $scope.actions = o.actions;
        $scope.actions_with_none = angular.copy(o.actions);
        $scope.actions_with_none["*"] = "! any action";
        $scope.action_details = o.action_details;
        $scope.item_details = o.item_details;
        return $scope.wins = o.wins
    });
    $scope.remove_deathmessage = function(index) {
        $scope.deathmessages.splice(index, 1);
        $scope.submit_deathmessages();
        return false
    }
    ;
    $scope.add_deathmessage = function() {
        var matches, msg;
        if (!($scope.deathmessages.length < 5)) {
            return
        }
        msg = $scope.input_deathmessage;
        matches = msg.match(/(^|\W)\(name\)(\W|\.|$)/i);
        if (!matches) {
            return
        }
        $scope.deathmessages.push({
            msg: $scope.input_deathmessage
        });
        $scope.input_deathmessage = "";
        $scope.submit_deathmessages();
        return false
    }
    ;
    $scope.submit_deathmessages = function() {
        var m;
        return $http({
            method: "POST",
            url: "/role/" + $scope.role_id + "/deathmessages",
            data: $.param({
                deathmessages: function() {
                    var j, len, ref, results;
                    ref = $scope.deathmessages;
                    results = [];
                    for (j = 0,
                    len = ref.length; j < len; j++) {
                        m = ref[j];
                        results.push(m.msg)
                    }
                    return results
                }()
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(o) {
            var data, status;
            status = o[0],
            data = o[1];
            if (status) {
                $scope.deathmessages_accepted = 1;
                $window.errordisplay(".roleerror", "You updated this role's death messages");
                return $scope.deathmessages = function() {
                    var j, len, results;
                    results = [];
                    for (j = 0,
                    len = data.length; j < len; j++) {
                        dm = data[j];
                        results.push({
                            msg: dm
                        })
                    }
                    return results
                }()
            } else {
                return $window.errordisplay(".roleerror", data)
            }
        })
    }
    ;
    $scope.addReaction = function() {
        var base;
        if (!(($scope.logic.role.reactions || []).length < $scope.max_reactions)) {
            return
        }
        (base = $scope.logic.role).reactions || (base.reactions = []);
        return $scope.logic.role.reactions.push({
            customize: {}
        })
    }
    ;
    $scope.removeReaction = function(ind) {
        return $scope.logic.role.reactions.splice(ind, 1)
    }
    ;
    $scope.addMeeting = function() {
        var base;
        if (!(($scope.logic.meetings || []).length < $scope.max_meetings)) {
            return
        }
        (base = $scope.logic).meetings || (base.meetings = []);
        return $scope.logic.meetings.push({})
    }
    ;
    $scope.removeMeeting = function(ind) {
        return $scope.logic.meetings.splice(ind, 1)
    }
    ;
    $scope.addAction = function(ind, action) {
        var acts, base;
        (base = $scope.logic.meetings[ind]).actions || (base.actions = []);
        acts = $scope.logic.meetings[ind].actions;
        if (acts.length < 5) {
            return acts.push({
                type: action,
                customize: {}
            })
        }
    }
    ;
    $scope.deleteAction = function(ind1, ind2) {
        return $scope.logic.meetings[ind1].actions.splice(ind2, 1)
    }
    ;
    $scope.addItem = function(item) {
        if (item == null) {
            item = ""
        }
        if (item === "") {
            return
        }
        if (!$scope.logic.role) {
            $scope.logic.role = {}
        }
        if (!$scope.logic.role.items) {
            $scope.logic.role.items = []
        }
        if ($scope.logic.role.items.length < 5 && $scope.logic.role.items.indexOf(item) === -1) {
            return $scope.logic.role.items.push({
                type: item,
                attributes: {}
            })
        }
    }
    ;
    $scope.deleteItem = function(index) {
        return $scope.logic.role.items.splice(index, 1)
    }
    ;
    $scope.getLogic = function() {
        return $http.get("/role/" + $scope.role_id + "/logic").success(function(o) {
            $scope.logic = o;
            if (!$scope.logic.role) {
                $scope.logic.role = {}
            }
            if (!$scope.logic.role.react) {
                $scope.logic.role.react = {
                    reaction: null,
                    customize: {},
                    action: null
                }
            }
            if ($scope.logic.role.react && !$scope.logic.role.react.customize) {
                $scope.logic.role.react.customize = {}
            }
            if ($scope.activated && !$scope.admin) {
                return $("#role_creation input, #role_creation select, #role_creation button").prop("disabled", true)
            }
        })
    }
    ;
    $scope.getLogic();
    $scope.submitLogic = function() {
        return $http({
            method: "POST",
            url: "/role/" + $scope.role_id + "/logic",
            data: $.param({
                logic: angular.toJson($scope.logic)
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            if (status) {
                $scope.logic_accepted = 1;
                return $window.errordisplay(".roleerror", "You updated the role logic!")
            } else {
                return $window.errordisplay(".roleerror", msg)
            }
        })
    }
    ;
    $scope.iconCallback = function(data) {
        window.errordisplay(".roleerror", data.msg);
        $(".role-custom-img").attr("src", data.url + "?" + +new Date);
        $scope.has_avatar = true;
        angular.element("#role-avatar-upload").val(null)
    }
    ;
    $scope.deactivate = function() {
        return $http.put("/role/" + $scope.role_id + "/deactivate").success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            if (status) {
                $scope.activated = false;
                return $window.errordisplay(".roleerror", "You deactivated this role!")
            } else {
                return $window.errordisplay(".roleerror", msg)
            }
        })
    }
    ;
    $scope.permanent_activate = function() {
        if (confirm("Are you sure you want to permanently activate this role. You will no longer be able to edit the role after this step.")) {
            $http.put("/role/" + $scope.role_id + "/permanent_activate").success(function(o) {
                var msg, status;
                status = o[0],
                msg = o[1];
                if (status) {
                    $scope.permanent = true
                }
                return $window.errordisplay(".roleerror", msg)
            })
        }
        return false
    }
    ;
    return $scope.activate = function() {
        return $http.put("/role/" + $scope.role_id + "/activate").success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            if (status) {
                $scope.activated = true;
                return $window.errordisplay(".roleerror", "You activated this role!")
            } else {
                return $window.errordisplay(".roleerror", msg)
            }
        })
    }
}
]);
var load_image, loadpage_fanart, loadpage_roleicon;
$(function() {
    var id;
    id = $("#role_id").val();
    $(".tab").click(function() {
        id = $(this).data("i");
        $(".tab-body > *").hide();
        $(".tab-header > *").removeClass("sel");
        $("#rolestats_" + id).show();
        $(this).addClass("sel");
        return false
    });
    $(".favorite").click(function() {
        var self;
        self = this;
        $.getJSON("/role/" + id + "/favorite", function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            if (status) {
                if (msg) {
                    $(self).addClass("fav_on");
                    $(self).removeClass("icon-star-empty");
                    return $(self).addClass("icon-star")
                } else {
                    $(self).removeClass("fav_on");
                    $(self).removeClass("icon-star");
                    return $(self).addClass("icon-star-empty")
                }
            } else {
                return window.errordisplay(".error", msg)
            }
        });
        return false
    });
    $("#show_form_roleicon").click(function() {
        $("#upload_roleicon_container").toggle();
        $(this).fadeOut();
        return false
    });
    $("#show_form_fanart").click(function() {
        $("#upload_fanart_container").toggle();
        $(this).fadeOut();
        return false
    });
    window.fetch_template("fanart.html", "fanart", function() {
        return loadpage_fanart(id, 1)
    });
    window.fetch_template("roleicon.html", "roleicon", function() {
        return loadpage_roleicon(id, 1)
    });
    $(document).on("click", "[id^=fanart_select_]", function(e) {
        var fid;
        fid = $(this).attr("id").split("_")[2];
        load_image($("#fanart_originalimg_" + fid).val());
        window.loadvote("#vote_picture", "fanart", fid);
        window.loadcommentpage(".commentbox-rt", 1, "fanart", fid);
        return e.preventDefault()
    });
    return $(document).on("click", "[id^=roleicon_select_]", function(e) {
        var riid, src;
        riid = $(this).attr("id").split("_")[2];
        src = $(this).find("img").attr("src");
        load_image(src);
        window.loadvote("#vote_picture", "roleicon", riid);
        window.loadcommentpage(".commentbox-rt", 1, "roleicon", riid);
        return e.preventDefault()
    })
});
load_image = function(src) {
    var img, show_fanart;
    $("#fanart_image").hide();
    show_fanart = function() {}
    ;
    img = $("<img class='hide' src='" + src + "'/>").one("load", function() {
        $(this).show();
        return $("#fanart_image").css("display", "inline-block")
    }).each(function() {
        if (this.complete) {
            return $(this).load()
        }
    });
    return $("#fanart_image").html(img)
}
;
loadpage_fanart = function(id, page) {
    return loadpage("#fanart_page", "/fanart/page", page, {
        roleid: id
    }, function(o) {
        var tmpl;
        tmpl = window.get_template("fanart");
        return o.pagenav + tmpl(o)
    })
}
;
loadpage_roleicon = function(id, page) {
    return loadpage("#roleicon_page", "/roleicon/page", page, {
        roleid: id
    }, function(o) {
        var tmpl;
        tmpl = window.get_template("roleicon");
        return o.pagenav + tmpl(o)
    })
}
;
console.log("HELLO");