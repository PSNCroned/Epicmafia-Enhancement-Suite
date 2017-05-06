var app, cacheBustSuffix;
app = angular.module('myApp', ['ngRoute']);
app.config(['$compileProvider', (function(_this) {
    return function($compileProvider) {
        return $compileProvider.debugInfoEnabled(true);
    }
    ;
})(this)]);
cacheBustSuffix = Date.now();
app.config(['$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
        controller: 'InboxCtrl',
        templateUrl: '/javascripts/partials/message/inbox.html'
    }).when('/unread', {
        controller: 'InboxCtrl',
        templateUrl: '/javascripts/partials/message/inbox.html'
    }).when('/sent', {
        controller: 'InboxCtrl',
        templateUrl: '/javascripts/partials/message/inbox.html'
    }).when('/compose', {
        controller: 'ComposeCtrl',
        templateUrl: '/javascripts/partials/message/compose.html'
    }).when('/message/:message_id', {
        controller: 'MessageCtrl',
        templateUrl: '/javascripts/partials/message/message.html'
    }).otherwise({
        redirectTo: '/'
    });
}
]);
app.directive('ngBindHtmlUnsafe', [function() {
    return function(scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
        return scope.$watch(attr.ngBindHtmlUnsafe, function(value) {
            return element.html(value || '');
        });
    }
    ;
}
]);
app.controller('InboxCtrl', ['$scope', '$http', '$window', '$compile', '$location', function($scope, $http, $window, $compile, $location) {
    var filter_names;
    $scope.$parent.type = 'inbox';
    $scope.filtertype = 'all';
    $scope.pagenav = null;
    $scope.page = 1;
    $scope.page_loaded = false;
    $scope.loading = false;
    filter_names = {
        all: 'All messages',
        unread: 'Unread messages',
        sent: 'Sent messages'
    };
    $scope.numSelected = function() {
        var count;
        count = 0;
        angular.forEach($scope.messages, function(message) {
            return count += message.checked ? 1 : 0;
        });
        return count;
    }
    ;
    $scope.greaterThan = function(num, thres) {
        return num > thres;
    }
    ;
    $scope.deleteMessage = function(id) {
        $http({
            method: 'delete',
            url: "/message/" + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(o) {
            var old_messages;
            $window.errordisplay('.error', "Message deleted...");
            old_messages = $scope.messages;
            $scope.messages = [];
            return angular.forEach(old_messages, function(msg) {
                if (msg.id !== id) {
                    return $scope.messages.push(msg);
                }
            });
        });
        return false;
    }
    ;
    $scope.deleteAll = function() {
        var ids, j, len, m, ref;
        ids = [];
        ref = $scope.messages;
        for (j = 0,
        len = ref.length; j < len; j++) {
            m = ref[j];
            if (m.checked) {
                ids.push(m.id);
            }
        }
        return $http({
            method: 'delete',
            url: "/message",
            data: $.param({
                ids: ids
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(o) {
            $window.errordisplay('.error', "Messages deleted...");
            return $scope.loadMessages();
        });
    }
    ;
    $scope.currentPage = function(i) {
        return $scope.pagenav.current_page === i;
    }
    ;
    $scope.setFilter = function(filter) {
        $scope.filtertype = filter;
        $scope.filtername = filter_names[filter];
        $scope.page = 1;
        return $scope.loadMessages();
    }
    ;
    $scope.selectAll = function() {
        var j, len, m, ref, results;
        ref = $scope.messages;
        results = [];
        for (j = 0,
        len = ref.length; j < len; j++) {
            m = ref[j];
            results.push(m.checked = true);
        }
        return results;
    }
    ;
    $scope.deselectAll = function() {
        var j, len, m, ref, results;
        ref = $scope.messages;
        results = [];
        for (j = 0,
        len = ref.length; j < len; j++) {
            m = ref[j];
            results.push(m.checked = false);
        }
        return results;
    }
    ;
    $scope.setPage = function(page) {
        $scope.page = parseInt(page);
        return $scope.loadMessages();
    }
    ;
    $scope.loadMessages = function() {
        $scope.loading = true;
        return $http.get("/message/fetch/" + $scope.filtertype + "?page=" + $scope.page).success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            $scope.page_loaded = true;
            $scope.loading = false;
            if (status) {
                $scope.messages = msg.data;
                $scope.transformPagenav(msg.pagenav);
                $scope.pagenav = msg.pagenav;
				document.body.dispatchEvent(new Event("newScope"));
                return $scope.num_messages = msg.num;
            } else {
                return $window.errordisplay('.error', msg);
            }
        });
    }
    ;
    $scope.transformPagenav = function(pagenav) {
        var p;
        return pagenav.pagecounter = (function() {
            var j, len, ref, results;
            ref = pagenav.pagecounter;
            results = [];
            for (j = 0,
            len = ref.length; j < len; j++) {
                p = ref[j];
                results.push({
                    name: p,
                    isNumber: angular.isNumber(p)
                });
            }
            return results;
        })();
    }
    ;
    switch ($location.path()) {
    case '/sent':
        return $scope.setFilter('sent');
    case '/unread':
        return $scope.setFilter('unread');
    default:
        return $scope.setFilter('all');
    }
}
]);
app.controller('ComposeCtrl', ['$scope', '$http', '$window', '$routeParams', '$location', '$timeout', function($scope, $http, $window, $routeParams, $location, $timeout) {
    var bid, timeout;
    $scope.$parent.type = 'compose';
    $window.load_markdown();
    $scope.recipients = {};
    $scope.num_recipients = 0;
    $scope.message_send = false;
    $scope.search_results = [];
    timeout = null;
    $scope.add_recipient_pkg = function(pkg) {
        if (!$scope.recipients[pkg.id]) {
            $scope.num_recipients += 1;
            $scope.recipients[pkg.id] = {
                id: pkg.id,
                username: pkg.username,
                imgteeny: pkg.avatar
            };
            $scope.search_results = [];
            return $scope.recipient_name = '';
        }
    }
    ;
    $scope.add_recipient = function(id) {
        return $http.get("/user/" + id + "/mini_info").success((function(_this) {
            return function(o) {
                $scope.recipients[o.id] = o;
                return $scope.num_recipients += 1;
            }
            ;
        })(this));
    }
    ;
    $scope.delete_recipient = function(id) {
        if ($scope.recipients[id]) {
            delete $scope.recipients[id];
            return $scope.num_recipients -= 1;
        }
    }
    ;
    if ($routeParams.user) {
        $scope.add_recipient($routeParams.user);
    }
    if (bid = $routeParams.board) {
        $http.get("/board/" + bid + "/players").success(function(o) {
            var d, data, j, len, results, status;
            status = o[0],
            data = o[1];
            if (status) {
                results = [];
                for (j = 0,
                len = data.length; j < len; j++) {
                    d = data[j];
                    $scope.recipients[d.id] = d;
                    results.push($scope.num_recipients += 1);
                }
                return results;
            }
        });
    }
    $scope.findRecipient = function(time) {
        $timeout.cancel(timeout);
        return timeout = $timeout(function() {
            return $http.get("/user/search?q=" + $scope.recipient_name).success(function(o) {
                return $scope.search_results = o.data;
            });
        }, time);
    }
    ;
    if ($scope.recipient_name) {
        $scope.findRecipient(0);
    }
    $scope.submitMessage = function() {
        var k, v;
        $scope.sending_message = true;
        $http({
            method: 'POST',
            url: "/message",
            data: $.param({
                msg: $scope.msg,
                subject: $scope.subject,
                recipients: (function() {
                    var ref, results;
                    ref = $scope.recipients;
                    results = [];
                    for (k in ref) {
                        v = ref[k];
                        results.push(parseInt(k));
                    }
                    return results;
                })()
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(o) {
            var msg, status;
            status = o[0],
            msg = o[1];
            if (status) {
                $location.path('/');
                $window.errordisplay('.error', "You sent a message!");
            } else {
                $window.errordisplay('.error', msg);
            }
            return $scope.sending_message = false;
        });
        return false;
    }
    ;
    return $scope.change = function() {
        $scope.recipient_name = '';
        $scope.recipient_preview = null;
        return $scope.message_send = false;
    }
    ;
}
]);
app.controller('MessageCtrl', ['$scope', '$http', '$window', '$routeParams', '$location', function($scope, $http, $window, $routeParams, $location) {
    $scope.$parent.type = 'inbox';
    $scope.back = function() {
        return $window.history.back();
    }
    ;
    $scope.deleteMessage = function(id) {
        return $http({
            method: 'delete',
            url: "/message/" + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(o) {
            $window.errordisplay('.error', "Message deleted...");
            return $location.path('/');
        });
    }
    ;
    return $http.get("/message/" + $routeParams.message_id).success(function(o) {
        var msg, status;
        status = o[0],
        msg = o[1];
        if (status) {
            return $scope.message = msg;
        } else {
            return $window.errordisplay('.error', msg);
        }
    });
}
]);
